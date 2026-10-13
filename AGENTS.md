# PBL6 Admin FE — Agent Guidelines

## 1. Stack & Commands
- **Runtime & Package Manager**: `bun` (fallback: `npm` / `vite`)
- **Framework**: React 18 + Vite 5 + TypeScript 5
- **UI & Styling**: MUI v5 (`@mui/material`), `@emotion/react`, `@emotion/styled`
- **State Management**: React Query (server cache), Redux Toolkit (auth state only)
- **Realtime**: `@microsoft/signalr`

### Verification Commands
```bash
bun run dev      # Start Vite local development server
bun run build    # Typecheck (tsc) and production build
bun run lint     # ESLint code quality check
```

---

## 2. Project Architecture (Feature-Based)

```
src/
├── app/                  # Composition root: routing, lazy routes, top-level providers
│   ├── App.tsx           # Router and declarative route guards
│   └── providers/        # ReduxProvider, etc.
├── features/             # Self-contained domain & business slices
│   ├── auth/             # Authentication & user profile flow
│   ├── amenities/        # Amenities management (list, CRUD, modal)
│   ├── locations/        # Locations management (list, CRUD, modal)
│   ├── users/            # Users management & detail view
│   ├── request-mod/      # Moderator approval requests flow
│   └── dashboard/        # Metrics, growth reports, and charts
│       # Inside each feature:
│       ├── api/          # Cohesive API service functions
│       ├── types.ts      # Domain & DTO types
│       └── components/   # Feature-specific UI components
├── services/             # Infrastructure layer (external I/O, no JSX)
│   ├── http/client.ts    # Centralized Axios client with JWT request/response interceptors
│   ├── realtime/         # SignalR hub connections with automatic reconnect
│   └── api/upload.ts     # Upload image service
├── components/           # Shared presentational UI components only (dumb/stateless)
│   ├── DataTable.tsx     # Generic table with MUI Table
│   ├── Breadcrumbs.tsx
│   ├── Loading.tsx
│   ├── NotFound.tsx
│   └── ...
├── shared/               # Cross-cutting reusable utilities & hooks
│   └── hooks/            # useInfiniteScroll.ts, etc.
├── assets/               # Static assets (images, SVGs)
├── theme/ / assets/theme # MUI theme customizations, design tokens
└── context/              # Contexts (scoped ephemeral state only)
```

---

## 3. Layer Rules & Dependency Direction

1. **The Dependency Rule**: Source dependencies must point only inward (`domain -> infrastructure -> store/context -> components -> features -> app`).
2. **Feature Isolation**: Features must not import private sub-components of other features. Shared models live in `src/type/` or `src/features/users/types.ts`.
3. **Presentational Components**: `src/components/*` must remain reusable and presentational. Never hardcode feature-specific filter logic or domain state inside shared components.
4. **No Direct HTTP in Components**: Components must call feature API services or React Query hooks, never raw `axios.post(...)`.
5. **No Token Mutation**: Token authorization is handled centrally via `services/http/client.ts` request interceptors. Do not set `axiosInstance.defaults.headers.Authorization` manually.

---

## 4. Code Standards & Anti-Patterns to Avoid

### Immutability & State
- **NEVER mutate state in render phase**: Do not use `delete state.key` or mutate props/state during rendering.
- **NEVER mutate state directly**: Always use immutable updates (e.g. `setState(prev => { const next = { ...prev }; delete next[id]; return next; })`).

### Hooks & Lifecycle
- **No Ref in Effect Dependencies**: Do not place `ref.current` inside `useEffect` dependency arrays (`[boxRef.current]` is an anti-pattern). Use `useInfiniteScroll` or standard event listeners.
- **Proper Debouncing**: Use `useRef` for timer IDs (`useRef<ReturnType<typeof setTimeout> | null>(null)`), never `useState<any>()` to store timer IDs. Always use `clearTimeout`, not `clearInterval`.
- **Fast Refresh**: Always export named components or function declarations (e.g. `export default memo(ComponentName);`). Avoid anonymous default arrow function exports (`export default () => ...`).

### Error Handling & API
- **NEVER swallow errors**: Do not write empty `catch (error) {}` or return `undefined` from API services. Let errors propagate so React Query / caller can handle toast notifications correctly.
- **No Control Flow by Exception**: Do not use `try/catch` for regular branching (e.g., checking if a file is uploaded vs URL string; use `instanceof File` or `typeof icon === "string"` instead).

### Performance & Bundling
- **Route-level Code Splitting**: Keep all routes lazy-loaded with `React.lazy()` and `<Suspense fallback={<Loading />}>`.
- **Environment Variables**: Always read backend URLs through `import.meta.env.VITE_*` with sensible fallbacks, never hardcoded IP or domain strings.
