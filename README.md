# iux

A collection of small, self-contained example apps — each running against
an in-browser fake server (MSW). Public, static, no backend. Deployed to
GitHub Pages on every push to `main`.

**Live at:** `https://<owner>.github.io/iux/` _(once Pages is enabled)_

## Demos

- **TODO with suggestions** (`#/todo`) — type-ahead suggestions, optimistic
  add, filter tabs.

More demos drop in over time. Each gets its own folder under
`src/demos/<id>/` and one line in `src/demos.ts`.

## How the fake server works

`msw` registers a service worker at boot (`src/main.tsx`). Every demo's
HTTP handlers are aggregated in `src/server/handlers.ts`. State lives in
a small `DemoStore<T>` per demo (`src/server/store.ts`) which optionally
persists to `localStorage`.

Each demo exposes a UI toggle (top right) to opt into persisting state
across reloads. When off, every reload starts from scratch — easy to
share or screenshot. When on, the store mirrors writes to localStorage
under `iux.demo.<id>.state`. The toggle itself is stored in
`iux.demo.<id>.persist`. There's also a per-demo "reset demo" button.

## Add a demo

1. Create `src/demos/<id>/` with at minimum:
   - `index.tsx` — default export is the demo component
   - `handlers.ts` — MSW handlers; export `<id>Handlers`
2. Add the demo's handlers to `src/server/handlers.ts`.
3. Register the demo in `src/demos.ts` (id, name, blurb, features,
   `Component`, and `controls` for the persist/reset shell).
4. `npm test` to confirm the registry checks pass.

Conventions:
- API paths use a wildcard prefix in handlers: `*/api/<id>/...` so they
  match regardless of the deployed base path.
- Client `fetch` calls go through `${import.meta.env.BASE_URL}api/...`.
- Handler endpoints to surface for the shell's controls:
  `GET .../<id>` should return `{ persisted }`, and the demo should
  support `POST .../<id>/persist` and `POST .../<id>/reset`.

## Develop locally

```sh
npm install
npm run dev
```

Other scripts:

- `npm run typecheck` — strict TypeScript check
- `npm test` — vitest run (pure-logic + registry tests)
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the production build locally

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds and publishes to
GitHub Pages. First-time setup: repo Settings → Pages → Source = GitHub
Actions.

The Vite `base` is set to `/iux/` to match the repo subpath, including
the service-worker URL. Custom domain later? Switch `base` to `'/'` in
`vite.config.ts`.
