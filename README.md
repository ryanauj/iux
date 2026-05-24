# iux

A showcase of UI components and UX flows along a **classic → cutting-edge**
variant axis, with any of a set of named visual **palettes** (Flat,
Material, Neubrutalism, Glassmorphism, Neumorphism, Claymorphism,
Skeuomorphism, Tron, Editorial, AAA, CRT / Phosphor, Pixel-art, Sketch,
Cardstock, Cel-shaded, Aurora, Terminal-TUI) applied to any of them.

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

## Pixel-art engine

The Pixel-art engine (palettes 25–26: NES, Game Boy) is the largest-
scope addition since CRT. Unlike CRT it doesn't just remap tokens —
it changes rendering assumptions across the board:

- **Integer-pixel grid.** `effect.pixelGrid` sets the snap step
  (`'8px'`); every `space.*` and `radius.*` value in the pixel palettes
  is an integer multiple of that step. Engine-root CSS in
  `src/styles.css` sets `image-rendering: pixelated` and disables font
  smoothing on the palette subtree.
- **Bundled pixel font.** `typography.family.pixel` carries a Press
  Start 2P stack (SIL OFL 1.1, loaded via Google Fonts `@import` at
  the top of `src/styles.css`). Every `role.*` in the pixel palettes
  routes through this slot; every non-pixel palette aliases
  `family.pixel` to its `ui` stack so the slot isn't load-bearing for
  them.
- **No anti-aliased corners.** Every `radius.*` slot — including
  `pill` and `full` — is `'0'`. Components asking for circles render
  as squares; that contrast is teaching content (see
  `palettes/pixel-art-nes.README.md` "What thrives vs degrades").
- **`steps(1, end)` easings.** Sprites don't ease, they snap. Every
  `motion.easing.*` slot is `steps(1, end)`; durations tick at NTSC
  frame multiples (32ms, 64ms, 128ms).

### Components that thrive vs degrade

`palettes/pixel-art-nes.README.md` carries the full list, but the
short version:

- **Thrive:** Button, Toggle, Checkbox, Stepper, Toast, Modal,
  Drawer, Tabs, Pagination, Segmented, Bento, Kanban-style Card
  grids, Table. Anything that composes through `space.*` and reads
  text through `role.*` lands cleanly on the grid.
- **Degrade (by design):** Spatial canvas (fractional positions land
  off-grid), Bezier editor (sub-pixel control points, anti-aliased
  curve), Slider with continuous fractional positioning, multi-line
  text at narrow widths (bitmap glyphs at fixed cell widths produce
  cramped wrapping). These are not bugs to fix — the contrast is the
  point of shipping the palette.

### `prefers-reduced-motion`

Honored at the engine level (in `src/styles.css`'s existing
`@media (prefers-reduced-motion: reduce)` block): every per-palette
duration collapses to `instant`, `--motion-decay` follows. The engine
paints no decorative motion (no scanline drift, no sprite-style
animation loop), so there is nothing additional to disable.

## Sketch / Hand-drawn engine

The Sketch engine (palette 27: Hand-drawn / Marker) is the second
engine after Pixel-art that changes more than colour and typography —
it changes how every edge in the document is rendered:

- **Wobbly borders via SVG filter at root.** A single
  `feTurbulence` + `feDisplacementMap` filter (defined in
  `index.html` as `#iux-sketch-wobble`) is applied at
  `.palette-root[data-palette^='sketch']` in `src/styles.css`. Every
  border, glyph outline, focus ring, and shadow stroke under the
  palette picks up the same micro-jitter, so neighbouring controls
  read as drawn by the same hand. We chose the SVG-filter route over
  a rough.js-style per-component renderer because the filter stays
  inside the engine seam — no component changes required. The
  trade-off (`filter` on the palette root creates a stacking context
  for `position: fixed` children) is already handled by the
  showcase's inline-overlay scoping.
- **Slight color bleed on fills.** The same filter chain ends with a
  small `feGaussianBlur` (stdDeviation ≈ 0.35) so every edge softens
  by a half-pixel — the visual equivalent of marker ink seeping into
  paper fibre. `elevation.*` shadows are tinted toward ink-blue
  rather than black so cast shadows read as "the page is lifted off
  notebook paper."
- **Bundled marker font.** `typography.family.hand` carries a
  Caveat (display) / Patrick Hand (body) stack (both SIL OFL 1.1,
  loaded via Google Fonts `@import` at the top of `src/styles.css`).
  Every non-sketch palette aliases `family.hand` to its `ui` stack so
  the slot stays defined without being load-bearing.
- **Radius tokens are advisory.** The palette still sets `radius.sm`
  / `radius.md` / `radius.lg`; the displacement pass recasts every
  corner as a hand-drawn approximation. A `radius.md` of `'8px'`
  reads more rounded than `radius.none`, but neither corner is
  geometrically circular once the filter runs.

### Components that thrive vs degrade

`palettes/sketch-marker.README.md` carries the full list, but the
short version:

- **Thrive:** Card, Modal, Drawer, Toast (raised surfaces — the
  heavier-wobble filter sells the "drawn frame on paper" effect),
  Button, Toggle, Checkbox, Stepper, Sidebar, Tabs, Segmented,
  Pagination, EmptyState, Tooltip. Anything that paints a border or
  reads text through `role.*` lands cleanly under the wobble.
- **Degrade (by design):** Table with dense rows (adjacent borders
  read as merged), DiffView with character-level highlight
  (sub-character jitter), VirtualList (repaint cost per scroll),
  BezierEditor, SpatialCanvas, Slider with continuous fractional
  positioning. These are not bugs to fix — the contrast is the point
  of shipping the palette.

### `prefers-reduced-motion`

Honored at the engine level the same way every other palette is: the
existing reduced-motion block collapses every duration to `instant`.
The Sketch engine paints **no decorative motion** — the displacement
field is static (no scanline drift, no glow pulse), so there is
nothing additional to disable. Users with reduced-motion preferences
see the same drawn-edge aesthetic, just with state transitions that
fire instantly.

## Cardstock engine

The Cardstock engine (palette 37: Cardstock / Layered) is the
gentlest of the engine-additions. Unlike Sketch / Pixel-art it doesn't
change rendering assumptions; the cardstock metaphor is delivered
through the existing `elevation.*` slot, layered with a new pair of
engine-only signal tokens:

- **Paired-shadow elevation.** Each `elevation.*` slot is a deliberate
  stack: an `inset -Npx -Npx 0 rgba(slate, α)` cut-edge along the
  bottom/right (the "thickness" of the cardstock), plus a `0 Mpx 0
  rgba(slate, β)` zero-blur close drop shadow (the "gap" to the layer
  below). No diffuse blooms, no glow, no rim lighting. Cards float
  above cards quietly. The Cardstock palette tints shadows toward
  slate ink rather than black so cast shadows don't crush the
  paper-warm field.
- **New engine-only tokens.** `effect.paperEdgeColor` /
  `effect.paperEdgeWidth` exposed as `--paper-edge-color` /
  `--paper-edge-width`. They document the same cut-edge value baked
  into `elevation.*`, so future paper-aware components (a custom
  `Divider` that draws a cut-edge between sections, a `PageBreak` that
  fakes torn paper) can read the engine's intended edge directly. On
  every non-cardstock palette they resolve to `'transparent'` / `'0'`,
  making any future rule that references them a no-op.
- **Type sits ON the paper.** `typography.family.ui` /
  `family.display` route to `system-ui` — a clean modern sans treated
  as ink. No hand-drawn font, no deboss / emboss. Role scale matches
  Flat / Classic.
- **`--radius` tokens behave naturally.** Cards can have round
  corners, like cardstock cut with shears. `radius.sm` / `md` / `lg`
  are on a real scale (4 / 8 / 14px); `pill` and `full` work the same
  way they do under Flat.

### Components that thrive vs degrade

`palettes/cardstock-layered.README.md` carries the full list, but the
short version:

- **Thrive:** Card, Modal, Drawer, Toast (the load-bearing raised
  surfaces — modal panels in particular read perfectly because the
  `overlay` elevation slot has the heaviest inset and the longest
  drop), Button, Toggle, Checkbox, Bento, Sidebar, Tabs, Segmented,
  Pagination, Stepper, EmptyState, Tooltip. Anything that consumes
  `--elevation-*` and reads text through `role.*` lands cleanly.
- **Degrade (by design):** Table with dense rows (each row is a
  cardstock layer; rendering 20 of them in a column reads as a
  noisy striped pattern, not a stack of papers), DiffView with
  character-level highlight (the inset cut-edge overlaps with the
  highlight), VirtualList / long scrolling columns (same row-density
  problem), SpatialCanvas, BezierEditor (the spatial register fights
  the flat paper metaphor). These are not bugs to fix — the contrast
  is the point of shipping the palette.

### `prefers-reduced-motion`

Honored at the engine level. The reduced-motion block in
`src/styles.css` adds a Cardstock-specific override that collapses
`--elevation-medium` and `--elevation-high` back to `--elevation-low`.
The hover state on `iux-card--interactive` (which swaps
`--iux-card-elevation` from `low` to `medium`) still fires, but the
shadow values are now identical, so the visible "lift" disappears —
no card lift animation under reduced motion. The engine paints no
other decorative motion, so the standard duration-flattening already
covers the rest. Users with reduced-motion preferences see the same
layered-paper aesthetic, just without the hover-elevation cue.

## Cel-shaded / Anime engine

The Cel-shaded engine (palettes 38–39: Shonen, Shojo) is the engine
that inverts the usual "stylized = less usable" assumption. It looks
the most cartoonish of any engine in the showcase — saturated flat
fills, heavy display type, hard ink outlines on every interactive
control — and that's exactly why it scores **well** on usability
tests. The thing that makes it look cel-animated (the always-present
ink line that separates character from background) is the same thing
that makes every click target unambiguous.

The engine exercises three contract slots no previous engine touched:

- `effect.outline.color` and `effect.outline.width` — the hard ink
  outline recipe. Set to `'#0a0a0a'` / `'3px'` on cel-shaded
  palettes; `'transparent'` / `'0'` everywhere else. The vars emit
  as `--outline-color` and `--outline-width`.
- `effect.shadowStyle` — `'soft' | 'hard'`. Set to `'hard'` on
  cel-shaded palettes; `'soft'` everywhere else. The slot is an
  engine-only signal documenting whether the engine paints
  gradient / blurred shadows or two-tone cel-shading. The var emits
  as `--shadow-style`.

### How the cel boundary is delivered

Two redundant paths, by design:

- **Through existing token slots.** Every `color.border.*` slot is
  set to ink (`#0a0a0a`), and `borderWidth.thick` is set to the
  outline width (`3px`). Components that already read
  `--border-width-thick` + `--color-border-default` (Card, Modal,
  Drawer, Toast) render the outline naturally via their own
  `border:` rule. Buttons consume `--border-width-thin` +
  `--color-intent-*-border`; every intent's border is also ink, so
  buttons get the same outline at the thinner weight.
- **Through the engine block in `src/styles.css`.** The block adds
  a literal `outline:` halo on a curated list of interactive
  controls (Button, Toggle, Checkbox, TextInput, Select, Segmented,
  Tabs, Tooltip, Pagination, Stepper) using `--outline-color` /
  `--outline-width`. This is the guarantee — even if a future
  component is added that doesn't read a border token, the engine
  still paints the ink line on it.

Why two paths? The cel outline is the load-bearing affordance of the
engine. A single-path delivery would create gaps the moment a
component swaps which border token it reads; layering both delivers
the outline through whichever channel the component exposes.

### Two-tone shading via `elevation.*`

Every `elevation.*` slot is a hard-offset block shadow (e.g.
`3px 3px 0 #0a0a0a` for `low`). One darker shape, hard edge, no blur
— the CSS equivalent of how a cel-animated frame draws shading as a
single offset darker region. The ink-black shadow color is
intentional: a "matching tone but darker" shadow would read as a
gradient, fighting the cel look.

### Counter-intuitive a11y note

**Cel-shaded scores well on usability tests despite looking the most
cartoonish.** Three concrete reasons:

1. **Every interactive control has an unambiguous boundary at all
   times.** The ink outline is on by default, not just on hover or
   focus. Users can identify every clickable region instantly — no
   "is this a button or a label" guessing. The outline is the same
   width and color regardless of intent fill, so the click-target
   shape is the read.
2. **Hover / focus changes the outline color, not just the fill.**
   Most palettes communicate state by darkening the background and
   trust the contrast change to read. Cel-shaded changes the
   OUTLINE on focus (shonen-blue / shojo-lavender) — even users
   with reduced color sensitivity see the boundary change against
   the surface.
3. **Elevation stays visible without motion.** The hard-offset
   block shadow is a static visual; under `prefers-reduced-motion`
   the hover transitions collapse to instant but the shadow itself
   is the same. Compare to soft drop shadows (Material), where the
   elevation *change* on hover is the affordance — reduce motion
   and the affordance vanishes.

The **Task board** (kanban cards) and **Note outliner** (block-level
gutter controls) are the canonical test apps for this. Cards under
cel-shaded read as physical pieces of card stock — the ink outline +
offset shadow already say "this is above the column," so dragging
doesn't need to "lift" with motion. Outliner block-level controls
(toggle done, collapse subtree) get ink outlines from the engine
block; indentation reads cleanly because the ink line on every bullet
separates it from the line above, the way a manga panel separates one
beat from the next.

The "cartoonish = unusable" assumption is wrong because the
cartoonish thing in cel animation is also the load-bearing
affordance: the ink outline that separates character from background
IS the readability cue. Borrow the affordance, you inherit the
usability.

### Speed-line motif

Available as a decoration utility — `iux-cel-speedlines` paints a
static diagonal hatch as decoration on any surface; the hover variant
`iux-cel-speedlines--hover` reveals the hatch on hover. **Default off
on most surfaces** — the brief is explicit that speed lines should
be used sparingly, so neither the engine block nor either palette
paints them automatically. Components opt in by adding the utility
class to specific elements that want the "this responds" cue.

The hover-revealed variant is disabled under
`prefers-reduced-motion`; the static variant stays on because it's
decoration, not motion (mirroring how the CRT scanline overlay is
treated).

### Components that thrive vs degrade

`palettes/cel-shaded-shonen.README.md` carries the full list, but the
short version:

- **Thrive:** Card, Modal, Drawer, Toast (the engine's load-bearing
  surfaces — ink outline + offset shadow is the perfect cel-card
  affordance), Button, Toggle, Checkbox, Tabs, Segmented,
  Pagination, Stepper, Tooltip, EmptyState, Sidebar, Bento.
  Anything that consumes border / elevation tokens and reads text
  through `role.*` lands cleanly.
- **Degrade (by design):** Table with dense rows, DiffView with
  character-level highlight, VirtualList / long scrolling columns
  (ink boundary on every row is too much line at row density),
  SpatialCanvas, BezierEditor (fractional-pixel positioning fights
  the hard ink boundary).

### `prefers-reduced-motion`

Honored at the engine level. The reduced-motion block in
`src/styles.css`:

1. Collapses every per-palette duration to `instant` (the standard
   engine-level handler every palette inherits) — no press-bounce,
   no hover transition.
2. Disables the hover-revealed speed-line motif. The static
   speed-line motif stays on because it's decoration, not motion.

The engine paints no other decorative motion, so the standard
duration-flattening already covers the rest. Users with
reduced-motion preferences see the same cel-shaded aesthetic — ink
outlines, two-tone shadows, saturated fills — just with state
transitions that fire instantly.



## Terminal-TUI engine

The Terminal-TUI engine (palette 41: Terminal / TUI) is the most
architecturally distinctive engine in iux — it treats the character
grid as a design token. Layout snaps to integer character cells
(`1ch` wide, `1lh` tall), raised surfaces paint their outlines as
real box-drawing characters (`┌─┐│└─┘`) instead of CSS borders, and
monochrome warm-white is the rule with semantic color (red errors,
amber warnings, green success, blue links) reserved strictly for
state. The engine shares DNA with CRT / Phosphor — same mono-on-dark
roots — but solves a different problem: CRT is nostalgic
(scanlines, glow, phosphor decay), TUI is functional (cells,
characters, density).

The engine exercises three contract slots no previous engine
touched:

- `effect.gridUnitX` and `effect.gridUnitY` — the character-cell
  grid units. Set to `'1ch'` / `'1lh'` on TUI; `'0'` everywhere
  else (any rule that multiplies / divides them collapses to a
  no-op on non-TUI palettes). Emit as `--grid-unit-x` and
  `--grid-unit-y`.
- `effect.borderStyle` — `'css' | 'character'`. Set to
  `'character'` on TUI; `'css'` on every other palette. **The
  most load-bearing contract addition in the engine.** Components
  read it via container style queries
  (`@container palette style(--border-style: character)`) to
  switch from CSS borders to box-drawing-character outlines.
  Forcing every palette to declare its rendering mode (`'css'`
  is the explicit opt-out) makes the slot's absence audit-able.
  Emits as `--border-style`.

### The teaching note

**Design tokens can redefine the unit of layout itself.** Most
palettes re-tune existing slots: `space.*` widens (Editorial),
`radius.*` snaps to zero (Neubrutalism), `elevation.*` collapses
(Flat / Classic). Terminal-TUI changes which UNIT a component
composes against. The same `space.*` scale, but expressed in `ch`
and `lh` rather than `px`. The same `border:` rule, but rendered
through `┌─┐│└─┘` rather than through a CSS stroke. That's what the
contract was built for — and it's the headline lesson of the whole
project.

### How the character border is delivered

Two pieces work together:

1. **Component markup gains four corner glyph spans.** Card, Modal,
   and Table each render four `<span class="iux-X__corner …"
   aria-hidden="true">` elements containing the literal corner
   characters `┌` / `┐` / `└` / `┘`. They're rendered on every
   palette but hidden by default (`display: none`).
2. **Component CSS branches on `--border-style` via a `@container`
   style query.** Inside Card.css / Modal.css / Table.css, a block
   reads:
   ```css
   @container palette style(--border-style: character) {
     .iux-X { border-color: transparent; border-radius: 0; }
     .iux-X__corner { display: block; }
   }
   ```
   The `palette` container is declared on `.palette-root` in
   `src/styles.css`. Under TUI the standard CSS border becomes
   transparent and the four corner glyphs become visible; the four
   1px CSS edge lines that remain align with the corners because
   `─` / `│` render as 1px lines in any modern monospace face.

This delivery pattern keeps the engine inside the contract seam:
the token `--border-style: character` is the **trigger**, the
component CSS is the **renderer**, and the engine block in
`src/styles.css` provides the **environment** (the named
`container-name: palette` declaration, plus an `ss01` /
`calt` font-feature pin that tightens box-drawing alignment in
the bundled monos).

### Components that thrive vs degrade vs are excluded

`palettes/terminal-tui.README.md` carries the full list, but the
short version:

- **Thrive:** Card, Modal, Table (the components that received
  character rendering this session — Expense log and Note outliner
  apps will look astonishing here), Button, Toggle, Checkbox,
  Tabs, Segmented, Pagination, Stepper, Tooltip, EmptyState,
  Sidebar, Bento, Toast. Anything composing through standard
  `space.*` / `border.*` / `intent.*` lands cleanly on the cell
  grid.
- **Degrade gracefully (by design):** Habit / streak tracker — the
  calendar heat-map grid IS character-grid-shaped, lucky alignment;
  the intensity gradient collapses to "filled vs not" under TUI's
  monochrome-with-semantic-color rule, but the structure is intact.
  Recipe runner and Settings playground both work but trade some
  visual polish for density.
- **Excluded (graceful "not supported" message):** Diagram /
  Spatial canvas. The component renders fractional-pixel positions
  with bezier-curve edges; the character grid can't express either
  without ASCII-art approximations that fight every other
  affordance. The engine block paints a graceful
  `┌─ TUI not supported … ─┐` overlay scoped to
  `.iux-spatial-canvas` rather than force-rendering. Not every
  engine has to work everywhere — the contract gives us a clean
  way to declare it.

### Browser support

The character-border rendering depends on **CSS container style
queries** (`@container <name> style(--var: <value>)`), supported in
Chrome 111+ (March 2023), Safari 18+ (Sep 2024), Firefox 128+
(Jul 2024). On older browsers the `@container style()` block is
ignored and the TUI palette falls back to its standard CSS-border
rendering — still mono-on-dark-on-grid, just without the
box-drawing corners.

### `prefers-reduced-motion`

Trivial under TUI. The engine paints no decorative motion (no
scanline drift, no glow pulse, no atmospheric gradient, no card
lift, no marker wobble). The existing engine-level reduced-motion
block in `src/styles.css` already covers component state
transitions by collapsing every per-palette duration to `instant`.
Users with reduced-motion preferences see the same character-grid
aesthetic without any visual difference except the state-transition
speed.
