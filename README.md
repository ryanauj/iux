# iux

A showcase of UI components and UX flows along a **classic → cutting-edge**
variant axis, with any of a set of named visual **palettes** (Flat,
Material, Neubrutalism, Glassmorphism, Neumorphism, Claymorphism,
Skeuomorphism, Tron, Editorial, AAA) applied to any of them.

**Live at:** `https://<owner>.github.io/iux/` _(once Pages is enabled)_

## Status

Spec phase. The repo currently ships a placeholder landing page and
three source-of-truth documents that constrain everything downstream:

- [`FINALIZED-PALETTES.md`](./FINALIZED-PALETTES.md) — the 10 named
  palettes mapped to 7 rendering engines, with a11y tags.
- [`FINALIZED-COMPONENTS.md`](./FINALIZED-COMPONENTS.md) — the three
  tiers of components, each with a 3-4 rung functional ladder.
- [`tokens/00-token-contract.md`](./tokens/00-token-contract.md) and
  [`tokens/semantic.contract.ts`](./tokens/semantic.contract.ts) — the
  single seam between components and palettes. Components consume only
  these slots; palettes redefine only these slots; no raw values
  downstream.

Component and palette implementations land in future sessions.

## Develop locally

```sh
npm install
npm run dev
```

Other scripts:

- `npm run typecheck` — strict TypeScript check (covers `src/` and `tokens/`)
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the production build locally

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds and publishes to
GitHub Pages. First-time setup: repo Settings → Pages → Source = GitHub
Actions.

The Vite `base` is set to `/iux/` to match the repo subpath. Custom
domain later? Switch `base` to `'/'` in `vite.config.ts`.
