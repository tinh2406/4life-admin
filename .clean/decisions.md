# Architectural Decisions

## 1. Verify Command & Baseline
- Package manager: `bun` (based on `bun.lockb` present in repo).
- Build command: `bun run build` (`tsc && vite build`). Baseline status: PASS (0 errors, 5.69s).
- Lint command: `bun run lint` (`eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0`). Baseline status: FAIL with 78 problems (29 errors, 49 warnings).
- Test command: None detected in project.

## 2. Layering & Architecture Choice
- Target Architecture: Feature-based architecture (`src/features/*`), tailored for React + Vite + TypeScript single-page admin panel.
- Pure Clean Architecture (domain-driven with enterprise Use Cases, Repositories, Port/Adapter boilerplate) is explicitly rejected as overengineering for this project scale (Admin SPA consuming standard REST/SignalR APIs).
- Clean Code principles strictly applied: Separation of Concerns (UI vs. Query/Mutation hooks vs. API client), Unidirectional Data Flow, Elimination of Circular Dependencies, Elimination of direct state mutations during render, and safe error propagation.

## 3. Boundary & Responsibility Contracts
- `src/services/api/` (or `src/shared/api/`): HTTP client infrastructure (Axios with interceptors, SignalR client), configured via environment variables.
- `src/features/<feature>/`: Feature modules (e.g. `auth`, `users`, `request-mod`, `amenities`, `locations`, `dashboard`). Each feature encapsulates its own `api/`, `hooks/`, `components/`, and `types/`.
- `src/components/`: Shared presentational UI components only. Must NOT import from features or manage feature-specific business logic.
- `src/context/` / `src/store/`: Eliminating god contexts (`FilterContext`, global `StatisticsContext`) in favor of localized feature state or URL search params.
