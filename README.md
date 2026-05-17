# iux — Style Gallery

A pure-frontend, read-only catalog of curated themes, component variants,
and layouts. Public, static, no auth, no backend. The source of truth is a
single TypeScript file, [`src/catalog.ts`](src/catalog.ts) — adding an entry
is a PR that edits it.

**Live at:** `https://<owner>.github.io/iux/` _(once Pages is enabled)_

## Add an entry

1. Edit `src/catalog.ts` — add a new `ThemeEntry`, `ComponentEntry`, or
   `LayoutEntry` to the appropriate array.
2. Run `npm test` to make sure the new entry passes the catalog checks
   (unique id, real `usage_notes`, non-empty `snippet`, allowed kind).
3. Open a PR.

Snippets are **opaque text**. They get rendered inside a `<pre>` with a copy
button — they are not parsed and they don't drive the live preview. Treat
the snippet as what a consumer will paste and adapt to their own codebase;
treat `config` as what powers the in-page preview. The two describe
different layers and can drift on purpose.

## Develop locally

```sh
npm install
npm run dev
```

Other scripts:

- `npm run typecheck` — strict TypeScript check
- `npm test` — vitest run over the catalog assertions
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the production build locally

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds and publishes to
GitHub Pages. First-time setup: repo Settings → Pages → Source = GitHub
Actions.

The Vite `base` is set to `/iux/` to match the repo subpath. If a custom
domain is added later, switch `base` to `/'` in `vite.config.ts`.

## License

MIT
