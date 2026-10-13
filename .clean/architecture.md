# Architecture: PBL6 Admin Frontend

Declared layers for boundary checking. Inner layers must never import outer layers.

```clean-architecture
layer domain         = src/type/**, src/utils/**
layer infrastructure = src/constants/AxiosInstance.ts
layer store          = src/store/**
layer context        = src/context/**
layer components     = src/components/**, src/layouts/**
layer features       = src/pages/**
layer main           = src/main.tsx, src/App.tsx
```

## Layer Direction Rules
1. `domain` imports nothing from external libraries or UI.
2. `infrastructure` (HTTP client, SignalR) imports nothing from UI or features.
3. `store` (Redux) holds global state, never imports UI components (`src/components/**`).
4. `features` / `pages` consume components, domain types, store, and context.
5. `main` composes everything.
