# iux

A showcase of UI components and UX flows along a **classic → cutting-edge**
variant axis, with any of a set of named visual **palettes** (Flat,
Material, Neubrutalism, Glassmorphism, Neumorphism, Claymorphism,
Skeuomorphism, Tron, Editorial, AAA, CRT / Phosphor) applied to any of them.

**Live at:** <https://ryanauj.github.io/iux/>

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

## Shareable URLs

Every story-picker setting is reflected in the URL query string, so the
page restores after reload and any view can be shared by copying the
location bar. Defaults are omitted from the URL to keep links tidy.

| Param      | Values                                                  | Default        |
| ---------- | ------------------------------------------------------- | -------------- |
| `view`     | `per-component`, `per-palette`                          | `per-component`|
| `component`| any component id (e.g. `button`, `toast`, `modal`)      | `button`       |
| `variant`  | `all` or a variant of the active component              | `all`          |
| `palette`  | `all` or a palette id (e.g. `material`, `tron-dark-neon`)| `flat-classic`|
| `chrome`   | palette id used to paint the page chrome                | `flat-classic` |
| `showcase` | palette id for the per-palette view                     | `flat-classic` |
| `layout`   | `feed`, `deck`, `grid` (per-palette layouts)            | `feed`         |
| `motion`   | `1`, `2`, `3`, `5` (motion-duration multiplier)         | `2`            |
| `controls` | `button`, `strip` (floating controls style)             | `button`       |

Example: `?view=per-palette&showcase=material&layout=grid&motion=3`

## Contract gaps revealed by CRT

Adding the CRT / Phosphor engine was the highest-leverage palette
change in the repo because it is the first engine to need
non-trivial values from three slots — `effect.overlay`, `effect.glow`,
and `motion.decay` — that no previous palette exercised. Several
existing components don't yet read the new slots, which is
intentional: these are the gaps the CRT engine surfaces, and each is
a teaching example of the contract's "components consume only slots,
palettes redefine slots, the engine fills the join" rule.

The gaps a CRT-applied review uncovers:

1. **`Button.css` — focus-ring style mismatch.**
   `Button.css:138-142` reads `outline-style: var(--effect-focus-ring-style)`.
   Under CRT (and under Tron) that value is `'glow'`, which is **not a
   valid CSS `outline-style` keyword** — the browser silently falls back
   to the previous outline-style and the focus ring becomes effectively
   invisible. The engine compensates with a `:focus-visible { box-shadow }`
   halo on `.palette-root` (see `src/styles.css`), but the longer-term
   fix is to treat focus rendering as an engine concern, not a
   component-level `outline-*` recipe. Same issue exists in any
   component that copies the same `outline-style: var(...)` block (most
   focusable controls — Toggle, Checkbox, Select, etc.).
2. **No component reads `--motion-decay`.**
   The whole point of the CRT engine is the phosphor-decay regime where
   state transitions linger past their main duration. Today only the
   engine-level `.palette-root :focus-visible` rule in `src/styles.css`
   uses `var(--motion-decay)`. Components like Button (`Button.css:50-53`),
   Modal, Drawer, Toast, Tooltip, Sidebar set their own
   `transition-duration: var(--motion-duration-*)` and never append
   `var(--motion-decay)`. Result: decay is visible on focus halos but
   invisible on most state transitions until components opt in. The
   slot exists; the consumers don't.
3. **`paletteToCssVars.ts` — engine-level effects need engine-level CSS.**
   `--effect-overlay-image` and `--effect-glow-*` only do anything because
   `src/styles.css` reads them at the palette root. Components don't read
   `--effect-overlay-image` (correctly — overlays are an engine concern).
   The pattern works, but it formalizes a new category of token —
   "engine-only, not for component CSS" — that the contract document
   should call out explicitly once a second engine-only token lands.
4. **`color.intent.*` has no monochrome mode.**
   CRT collapses all six intents onto a single phosphor color (you can
   see it in `palettes/crt-phosphor-green.ts` — every `intent.*.bg` is
   a different alpha of `rgba(125, 255, 138, …)`). Forms that depend on
   color-coded state — Toast variants, Alert intents, intent-driven
   Button fills — look almost identical under CRT. That isn't a
   contract gap so much as a known constraint of monochrome aesthetics,
   but it's worth flagging: relying on intent color alone for affordance
   fails the CRT palettes by design.

The first two are real componentry follow-ups. The third is a
documentation follow-up. The fourth is an a11y caveat that earns the
`experimental` tag.

> **Rule:** a component that survives CRT survives anything. If a
> control reads only token slots, opts into `--motion-decay`, treats
> focus as an engine-painted halo rather than an `outline-*` recipe,
> and doesn't lean on `intent.*` color alone for state, it works
> identically across all 17 palettes.
