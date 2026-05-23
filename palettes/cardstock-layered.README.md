# Cardstock (Layered)

The "cut paper stack" register. Cream paper field, slate ink body type,
dusty rose focus accent, muted-pastel intent palette (sage / cream /
deeper sage / butter / dusty rose / slate-blue). Every raised surface
reads as a piece of cut cardstock laid over the page — a clean edge
(not torn), a slight darker rule along bottom/right suggesting the
thickness of the stock, and a tight close shadow filling the gap to
the layer below.

Anchored on a new `cardstock` engine that exercises two contract slots
no previous engine touched:

- `effect.paperEdgeColor` — the cut-edge darker rule color. Set to
  `'rgba(45, 53, 67, 0.18)'` here; every non-cardstock palette returns
  `'transparent'`, which means any rule that references the var paints
  nothing.
- `effect.paperEdgeWidth` — the thickness of that rule. Set to `'1px'`
  here; every non-cardstock palette returns `'0'`, so any rule that
  multiplies / divides this collapses to a no-op.

The two vars are emitted as `--paper-edge-color` and `--paper-edge-width`.

## Cardstock implementation: tokens, not engine CSS

The brief offered two routes for "every surface reads as cardstock":
an engine block in `src/styles.css` that re-paints `box-shadow` on
every raised-surface class, or baking the cut-edge into the palette's
own `elevation.*` shadow strings. **We chose the elevation-baked
route.** Three reasons:

1. **It stays inside the token contract.** The cardstock metaphor is
   delivered entirely through `elevation.*` (paired inset + outset
   shadow) and `color.border.*` (the cut edge). No new component
   styles, no engine-scoped overrides of `iux-card` / `iux-modal__panel`
   / `iux-drawer__panel`, no risk of fighting a component's own
   `box-shadow` rule. The same shadow stack works on every existing
   component that consumes `--elevation-*` — Card, Modal, Drawer,
   Toast, Tooltip, Sidebar, Tabs, Segmented, Pagination, Bento, etc.
2. **The `--paper-edge-*` vars carry intent, not delivery.** They
   document the engine's intended cut-edge color and width as
   first-class semantic tokens, so future paper-aware components (a
   custom `Divider` that wants to draw a cut-edge between sections, a
   `PageBreak` that fakes torn paper, an annotation layer that draws
   on top of cards) can read the engine's intended edge directly
   without re-deriving it from the `box-shadow` string. The slot
   pattern matches `effect.strokeVariance` and `effect.pixelGrid`:
   the engine delivers its visual via something else (an SVG filter,
   a CSS rule on the root, a baked shadow string), and the slot
   records the intent for components that haven't been written yet.
3. **It's about an order of magnitude lighter on render.** Box-shadow
   is GPU-cheap; the paired-shadow stack costs roughly the same as
   the existing Flat / Material `elevation.*` stack. An engine block
   that targeted every raised-surface class with its own `box-shadow`
   override would still cost the same shadow paint, plus the
   specificity fight every time a component upgraded its own elevation
   on hover.

The trade-off: the cardstock effect is bounded by which components
consume `--elevation-*`. A control that paints its own surface fill
without an elevation token (a custom `Avatar` ring, an
illustration-only `EmptyState` body) renders flat. The single
engine-block override the brief still earns is the
`prefers-reduced-motion` clamp — we collapse `--elevation-medium` /
`--elevation-high` back to `--elevation-low` so hover-lifts
(`iux-card--interactive:hover { box-shadow: var(--elevation-medium) }`)
become no-ops without changing the card surface fill or its border.

## The paired-shadow stack, slot by slot

Each `elevation.*` slot is a deliberate pair:

```
flat:    none
low:     inset -1px -1px 0 rgba(45,53,67,0.18), 0 1px 0 rgba(45,53,67,0.08)
medium:  inset -1px -1px 0 rgba(45,53,67,0.20), 0 2px 0 rgba(45,53,67,0.10)
high:    inset -1px -1px 0 rgba(45,53,67,0.22), 0 4px 0 rgba(45,53,67,0.12)
overlay: inset -2px -2px 0 rgba(45,53,67,0.24), 0 8px 0 rgba(45,53,67,0.14)
```

The pattern is:

- **`inset -N -N 0 rgba(slate, α)`** — the cut-edge rule, painted
  INSIDE the surface along the bottom/right. The width grows from 1px
  (low/medium/high) to 2px (overlay), and the alpha grows with
  elevation, so higher layers read as slightly thicker pieces of stock.
- **`0 M 0 rgba(slate, β)`** — a tight zero-blur drop shadow offset
  down by M px. No blur, no spread; a real piece of cardstock casts a
  hard close shadow on the surface it sits on, not a diffuse halo.

Shadows are tinted toward slate ink (`rgba(45, 53, 67, …)`) rather
than pure black — the paper-warm field crushes black shadows visually.
No glow, no diffuse shadows, no rim lighting. The brief said "elevation
is real but quiet"; this is what quiet looks like on cardstock.

## Type sits ON the paper

`typography.family.ui` / `family.display` route to `system-ui` — a
clean modern sans treated as ink. There is no hand-drawn font, no
deboss / emboss, no paper-like type texture. The brief is explicit:
type is ink on the paper, not styled like paper itself. The role scale
matches Flat / Classic so every existing text composition lands the
same way.

The page itself is the only surface that gets a paper *colour*
(`#f5f0e2` — a warm cream); ink (`#2d3543`) sits on it at ~12:1
contrast (AAA at every body size, AAA at every label/caption size).

## A11y

`experimental`. Two reasons:

1. **Muted-pastel intent backgrounds with white-cream content can be
   borderline AA.** The `intent.primary.bg` sage (`#6b8a6b`) with
   `intent.primary.content` cream (`#fbf7ec`) clears AA at ~4.6:1 —
   passes for body text but sits below AAA. `intent.neutral.bg` cream
   on slate-ink content is fine; the colored intents are the
   constraint. The cardstock register is what creates the constraint
   (muted pastels are the point); a future "Cardstock High-Contrast"
   register could bump intent saturation if needed.
2. **The inset cut-edge can read as a recessed shadow in
   high-contrast OS modes.** Windows High Contrast Mode forces
   `box-shadow: none`, so the cardstock thickness disappears entirely
   — every surface reads as flat. The `--border-width-thick` of 2px
   stays, so cards still have a visible outline; they just lose the
   cardstock cue. This is the same `forced-colors` behaviour every
   shadow-based palette ships with.

## What thrives vs degrades

Components that **thrive** under Cardstock:

- **Card, Modal, Drawer, Toast** — the engine's load-bearing surfaces.
  Each is a raised piece of cardstock laid over the page or another
  card. Modal panels in particular read perfectly: the overlay
  elevation slot has the heaviest inset (2px cut-edge) and the
  longest drop (8px), so a modal opening reads as a thick piece of
  cardstock falling onto the page. Drawer panels get the same overlay
  shadow stack — they're a piece of cardstock sliding in from the
  edge. Toast notifications inherit the low-elevation stack so they
  read as a small card landing briefly on the desk.
- **Bento, Sidebar, Tabs, Segmented, Pagination, Stepper** — block
  fills with cut edges. The cardstock metaphor turns the standard
  "section / sub-section" composition into a literal stack of papers,
  which is the metaphor most of these components were drawn around
  anyway.
- **EmptyState, Tooltip** — illustration-adjacent components. A
  tooltip is a small piece of paper that pops up; an empty-state
  panel reads as a notepad page.
- **Button, Toggle, Checkbox** — primary controls. The inset cut-edge
  on `elevation.low` reads as the thickness of a button pressed into
  cardstock. The 2px `--border-width-thick` is the visible cut.

Components that **degrade** under Cardstock (intentional contrast — do
not fork to "fix"):

- **Table with dense rows** — the metaphor falls apart at row
  density. Each row is technically a piece of cardstock; rendering
  20 cardstock layers in a column doesn't read as a stack of papers,
  it reads as a striped pattern with visual noise from the repeated
  cut edges. Use row spacing of `--space-3` or larger to recover, or
  accept the look. The Cardstock register is built for low-density
  panels and form-style layouts, not data grids.
- **DiffView with character-level highlight** — the inset edge on
  every diff chunk overlaps with the chunk's own colored highlight,
  producing a "two darker rules along bottom/right of every span"
  effect that's visually busy. Multi-line block diffs survive
  cleanly.
- **VirtualList / long scrolling columns** — same row-density
  problem as Table; the stacked cut edges read as noise at scale.
- **SpatialCanvas, BezierEditor** — the spatial register fights the
  flat paper metaphor. These compositions assume a depth model that
  isn't "layers of paper"; the cardstock cut-edge on every panel
  reads as wrong even though it's technically applied correctly.

The point is the same as the Pixel-art and Sketch engines: every
"thrives" component above survives **without code changes**. The
"degrades" list is the contrast that makes the contract teaching
material — a component that survives Cardstock survives every quiet-
elevation engine, because Cardstock is the cleanest test of the
elevation-as-load-bearing-token rule.

## `prefers-reduced-motion`

Honored at the engine level. The reduced-motion block in
`src/styles.css`:

1. Collapses every per-palette duration to `instant` (the standard
   engine-level handler every palette inherits).
2. Adds a Cardstock-specific override: `--elevation-medium` and
   `--elevation-high` collapse to `--elevation-low` under the
   cardstock palette. The hover state on `iux-card--interactive`
   (which swaps `--iux-card-elevation` from `low` to `medium`) still
   fires, but the shadow values are now identical, so the visible
   "lift" disappears. No card lift animation under reduced motion —
   exactly what the engine brief asks for.

The engine paints no decorative motion (no scanline drift, no glow
pulse, no marker wobble), so there is nothing additional to disable.
Users with reduced-motion preferences see the same layered-paper
aesthetic, just without the hover-elevation cue.
