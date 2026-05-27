# Cel-shaded (Shonen)

> Saturated shonen-anime triad on the cel-shaded engine — cream paper field, orange/blue/black triad, a 3px ink outline on every edge, and hard-offset two-tone block shadows for shading.

**Engine:** `cel-shaded` · **A11y:** `pass`

## Summary

Cel-shaded (Shonen) is the canonical register of the `cel-shaded` engine. Every surface reads as a flat-fill cel bounded by a 3px ink outline (`effect.outline.color = #0a0a0a`, `effect.outline.width = 3px`), and `elevation.*` paints two-tone block shadows — single darker offset shapes with no blur (`effect.shadowStyle = hard`). The palette is the protagonist's triad: `#f97316` orange primary, `#3b82f6` sky-blue info, `#fef6e4` cream cel-field. Display uses Archivo Black uppercased; body is Inter 500 — the 400-weight gap between titles and dialog is the cel-frame hierarchy.

## Origin

Cel-animated shonen anime — the boys-adventure register codified by Toei, Sunrise, and Pierrot from the 1980s onward (Dragon Ball, Naruto, One Piece). The aesthetic resolves character against background with a hard ink line and shades with a single offset darker shape. This palette is the engine-level revival of that grammar, ported to a token contract.

## Signatures

- **Hard 3px ink outline on every raised surface and control** — `effect.outline.color = #0a0a0a` and `effect.outline.width = 3px` — the engine block paints a literal `outline:` halo around interactive controls (Button, Toggle, Checkbox, TextInput) plus the same ink at every `color.border.*` slot. The outline is on at rest, not just on hover; it is the load-bearing cel affordance.
- **Hard-offset two-tone block shadow on `elevation.*` (`effect.shadowStyle = hard`)** — `elevation.low` is `3px 3px 0 #0a0a0a` — one ink-black offset shape, zero blur, zero spread. Scales to `8px 8px 0 #0a0a0a, 0 24px 48px rgba(10,10,10,0.35)` at `overlay`. The two-tone shadow is the cel-animation shading convention rendered in CSS.
- **Saturated shonen triad: orange primary `#f97316`, blue info `#3b82f6`, cream `#fef6e4`** — Tailwind orange-500 carries `primary` (the protagonist's chakra accent); sky-blue carries `info` and the focus ring; cream `#fef6e4` is the cel field. Every `intent.*.border` is ink so intent fill changes never change the outline.
- **Archivo Black display uppercased over Inter body (weight 900 vs 500)** — `typography.family.display` is `"Archivo Black", "Bebas Neue", "Helvetica Neue", Arial Black, sans-serif` at weight 900 with `textTransform: uppercase` on `display` / `title` / `heading` / `label`. Body is Inter at 500. The 400-weight gap is the chapter-title-vs-dialog hierarchy.
- **Shonen-blue focus ring (`#1d4ed8`) escalates by color, not thickness** — `effect.focusRing` is `{ width: 3px, offset: 2px, color: #1d4ed8, style: solid }`. The default outline is already 3px ink; focus swaps to blue rather than thickening — so even users with reduced color sensitivity see the boundary change.

## Anti-signatures

- Soft gaussian drop shadows (`effect.shadowStyle = soft` is what every non-cel palette uses)
- A transparent or zero-width outline on raised surfaces — defeats the cel affordance
- Pastel pinks / lavenders in `primary` / `info` (that would be the Shojo sister, not Shonen)
- Round humanist display like Poppins or Quicksand — Shonen wants the condensed grotesque weight
- Mixed-hue shadow colors — the shadow stays pure ink so it reads as "the cel below," not as ambient lighting

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.outline.color` | `#0a0a0a` | `#0a0a0a` — the ink line painted on every interactive control. Every non-cel-shaded palette returns `transparent`. |
| `effect.outline.width` | `3px` | `3px` — the cel outline weight. Every non-cel-shaded palette returns `0`. |
| `effect.shadowStyle` | `hard` | `hard` — documents that `elevation.*` paints two-tone block shadows. Every non-cel-shaded palette returns `soft`. |
| `elevation.low.boxShadow` | `3px 3px 0 #0a0a0a` | `3px 3px 0 #0a0a0a` — single offset ink shape, no blur, no spread. The CSS equivalent of cel-frame shading. |
| `color.intent.primary.bg` | `#f97316` | `#f97316` — Tailwind orange-500, the shonen protagonist's accent. |
| `typography.family.display` | `"Archivo Black", "Bebas Neue", "Helvetica Neue", Arial Black, sans-serif` | Archivo Black stack — the shonen-logo weight at 900. |

## Often confused with

### vs [Cel-shaded (Shojo)](./cel-shaded-shojo.md)

Shojo is the sister palette on the identical engine — same 3px ink outline, same hard-offset shadows, same `shadowStyle: hard`. The difference is purely the color story: Shojo swaps the orange/blue triad for pink (`#ec4899`) and lavender (`#7c3aed`) on a blush field, and the display family softens to round humanist Poppins. Shonen (this palette) commits to saturated primaries and condensed-grotesque Archivo Black.

### vs [80s Memphis](./memphis-80s.md)

Memphis-80s uses the flat engine and paints hard `1c1c1c` offset shadows too, but every intent is a different saturated primary and decoration comes from squiggle/confetti motifs in the engine. Cel-shaded-shonen renders ink outlines via the dedicated `effect.outline.*` tokens and stays inside the cel-animation grammar — no Memphis confetti.

### vs [Pixel Art (NES)](./pixel-art-nes.md)

Pixel-art-NES uses `effect.pixelGrid` and an 8-bit color clamp; corners are pixel-stepped, type is bitmap. Cel-shaded-shonen uses CSS-native outlines and shadows at full sub-pixel precision and runs proportional Archivo Black / Inter rather than a bitmap face.

## Where it thrives

- Cards, Modals, Drawers, Toasts — the engine's canonical surfaces; outline + offset shadow reads as physical cardstock
- Buttons, Toggles, Checkboxes — the outline reads as a precise click target; press shrinks the shadow
- Tabs / Segmented / Pagination / Stepper — series-of-options controls read as a clean cel-strip
- Bento layouts — each cell becomes a distinct cel with its own ink boundary

## Where it degrades

- Tables with dense rows — every row's ink boundary is too much line at row density
- DiffView with character-level highlight — outlines overlap with chunk highlights and read busy
- BezierEditor / SpatialCanvas — sub-pixel positioning fights the hard ink edge

## Recall aliases

`cel-shaded shonen`, `cel shaded shonen`, `shonen`, `cel-shaded`, `cel shaded`, `anime`, `shounen`, `manga`

## Long-form notes

<details>
<summary>From <code>palettes/cel-shaded-shonen.README.md</code></summary>

# Cel-shaded (Shonen)

Saturated orange / blue / black register, the classic shonen anime color
triad. Cream paper field, vibrant orange primary, ink-black outlines on
every card edge and every interactive control, two-tone block shadows
where shading exists. Display family is Archivo Black; body is Inter at
weight 500. The brief: "flat fills bounded by a hard ink line, plus one
darker shape for shading."

Anchored on the new `cel-shaded` engine that exercises three contract
slots no previous engine touched:

- `effect.outline.color` — the hard ink outline color. Set to `'#0a0a0a'`
  here; every non-cel-shaded palette returns `'transparent'`.
- `effect.outline.width` — the outline width. Set to `'3px'` here;
  every non-cel-shaded palette returns `'0'`.
- `effect.shadowStyle` — `'soft' | 'hard'`. Set to `'hard'` here; every
  non-cel-shaded palette returns `'soft'`. The signal documents that
  `elevation.*` paints two-tone block shadows rather than diffuse
  drop shadows.

The three vars emit as `--outline-color`, `--outline-width`, and
`--shadow-style`.

## How the cel boundary is delivered

Two redundant paths, by design:

1. **Through existing token slots.** The palette sets every
   `color.border.*` slot to ink (`#0a0a0a`) and `borderWidth.thick` to
   `'3px'`. Components that already read `--border-width-thick` +
   `--color-border-default` (Card, Modal, Drawer, Toast) render the
   outline naturally via their own `border:` rule. Buttons consume
   `--border-width-thin` + `--color-intent-*-border`; every intent's
   border is also ink, so buttons get the same outline at the thinner
   weight.
2. **Through the engine block in `src/styles.css`.** The block adds a
   literal `outline:` halo on a curated list of interactive controls
   (Button, Toggle, Checkbox, TextInput, Select, Segmented, Tabs,
   Tooltip, Pagination, Stepper) using `--outline-color` /
   `--outline-width`. This is the GUARANTEE: even if a future
   component is added that doesn't read a border token, the engine
   still paints the ink line on it. The outline is independent of
   `box-shadow` and doesn't push layout, so the cel boundary stays at
   the geometric edge of every control.

Why two paths? Because the cel outline is the load-bearing affordance
of the engine. The brief says "always present — this is what makes it
cel-shaded, not just flat." A single-path delivery would create gaps
the moment a component swaps which border token it reads; layering
both delivers the outline through whichever channel the component
exposes.

## Two-tone shading via `elevation.*`

Every `elevation.*` slot is a hard-offset block shadow:

```
flat:    none
low:     3px 3px 0 #0a0a0a
medium:  5px 5px 0 #0a0a0a
high:    7px 7px 0 #0a0a0a
overlay: 8px 8px 0 #0a0a0a, 0 24px 48px rgba(10,10,10,0.35)
```

This is the brief's "two-tone shading" — one darker shape, hard edge,
no blur. A real cel-animated frame draws shading as a single offset
darker region; box-shadow with zero blur and zero spread is the CSS
equivalent. The `overlay` slot adds a secondary diffuse drop for
modal-class surfaces, mirroring the Memphis 80s convention — a modal
sits high enough above the page that a hint of ambient depth is
warranted.

The ink-black shadow color is intentional. A "matching tone but
darker" shadow (a darker orange under an orange button) reads as a
gradient, which fights the cel look. Pure ink keeps every shadow
reading as "the cel below."

## Saturated palette

The shonen color triad in concrete tokens:

- `intent.primary.bg = #f97316` — Tailwind orange-500, the protagonist's
  scarf / jacket / chakra accent.
- `intent.info.bg = #3b82f6` — sky blue, the hero's aura / sky-frame.
- `intent.success.bg = #22c55e` — chakra / health green.
- `intent.warning.bg = #fbbf24` — alert / power-up gold.
- `intent.danger.bg = #ef4444` — battle-damage red.
- `intent.neutral.bg = #fef6e4` — the cream cel field.

`color.surface.base = #fef6e4` (cream paper), `color.content.primary
= #0a0a0a` (ink). Body text on the base sits at ~17.5:1 — AAA at every
body size.

## Typography — weight contrast

The brief: "heavy display sans for headings, crisp sans for body."
Concretely:

- `family.display = Archivo Black` (or Bebas Neue / Helvetica Neue
  Black as fallback) — 900 weight, condensed grotesque, the shonen
  logo weight. Used for `display` / `title` / `heading` roles
  uppercased.
- `family.ui = Inter` (or system) at weight 500 for `body`, weight 700
  for `subheading` / `label`. Crisp humanist, legible at every size.
- `family.mono = JetBrains Mono` for `code`.

The 400-weight gap between display (900) and body (500) is the visual
hierarchy — chapter titles read as title cards, body reads as dialog.

## The counter-intuitive a11y note

**Cel-shaded LOOKS the most cartoonish of the engines, but it scores
WELL on usability tests.** That's not a contradiction; it's the
teaching argument the engine exists to make.

Three concrete reasons:

1. **Every interactive control has an unambiguous boundary at all
   times.** The ink outline is on by default, not just on hover or
   focus. A user scanning the page can identify every clickable
   region instantly — no "is this a button or a label" guessing. The
   outline is the same width and color regardless of intent fill, so
   the click-target shape is the read.
2. **Hover/focus changes the outline color, not just the fill.** Most
   palettes communicate state by darkening the background and trust
   the contrast change to read. Cel-shaded changes the OUTLINE on
   focus — the focus ring is shonen-blue rather than ink — which
   means even users with reduced color sensitivity can see the focus
   move (the boundary changes contrast against the surface, not just
   the fill).
3. **Elevation stays visible without motion.** The hard-offset block
   shadow is a static visual; under `prefers-reduced-motion` the hover
   transitions collapse to instant but the shadow itself is the same.
   Compare to soft drop shadows (Material), where the elevation
   *change* on hover is the affordance — reduce motion and the
   affordance vanishes.

The Task board and Note outliner are the canonical test apps for
this:

- **Task board.** Kanban cards under cel-shaded read as physical
  pieces of card stock — ink outline on every card, hard offset
  shadow making the card "stick up" off the column. Dragging a card
  doesn't need to "lift" with motion because the outline + offset
  shadow already say "this is above the column." Drop targets are
  unambiguous because every column has its own ink boundary.
- **Note outliner.** Block-level controls in the gutter (toggle
  done, collapse subtree) get ink outlines from the engine block.
  Indentation reads cleanly because the ink line on every bullet
  separates it from the line above, the way a manga panel separates
  one beat from the next. Slash-command modal opens with the
  overlay-elevation block shadow — the modal "lands" on the page as
  a panel, which matches the slash-command-as-interruption mental
  model.

The "cartoonish = unusable" assumption is wrong because the
cartoonish thing in cel animation is also the load-bearing
affordance: the ink outline that separates character from
background IS the readability cue. Borrow the affordance, you
inherit the usability.

## A11y

`pass`. Body text contrast on the cream base clears AAA at default
sizes. Intent fills are constrained by the saturated palette but stay
within AA bounds:

- `intent.primary.bg` orange (`#f97316`) + black content ≈ 8.5:1 — AAA.
- `intent.warning.bg` gold (`#fbbf24`) + black content ≈ 11:1 — AAA.
- `intent.success.bg` green (`#22c55e`) + black content ≈ 6.9:1 — AAA.
- `intent.danger.bg` red (`#ef4444`) + cream content ≈ 4.7:1 — AA.
- `intent.info.bg` blue (`#3b82f6`) + cream content ≈ 5.3:1 — AA.
- `intent.neutral.bg` cream + black content ≈ 17:1 — AAA.

Focus ring is shonen-blue at 3px, contrasted against the orange/black
intent palette so focus is always visible regardless of which fill
the component carries.

The engine's `forced-colors` behavior follows the same pattern every
shadow-based palette ships with — Windows High Contrast Mode forces
`box-shadow: none` so the two-tone shading disappears entirely; the
outline survives because it's painted via `outline:` and `border:`,
both of which `forced-colors` preserves.

## What thrives vs degrades

Components that **thrive** under Cel-shaded:

- **Card, Modal, Drawer, Toast** — the engine's load-bearing surfaces.
  The ink outline + hard offset shadow is the perfect cel-card
  affordance. Cards under the kanban-style Task board read as
  physical objects.
- **Button, Toggle, Checkbox** — primary controls. The outline reads
  as a precise click target; the two-tone elevation makes pressed
  state unambiguous (the shadow shrinks under `:active`).
- **Tabs, Segmented, Pagination, Stepper** — series-of-options
  controls. The outline on every option creates a clean cel-strip
  shape; the active option flips fill to the intent color while
  keeping the same ink boundary.
- **Tooltip, EmptyState** — illustration-adjacent components. A
  tooltip is a small cel pop-up; an empty-state panel reads as a
  manga "no message" frame.
- **Sidebar, Bento** — block-fill layouts. The ink boundary turns
  each bento cell into a distinct cel, which is exactly the
  metaphor a bento layout is built around.

Components that **degrade** under Cel-shaded (intentional contrast —
do not fork to "fix"):

- **Table with dense rows** — the ink boundary on every row is too
  much line at row density. Use row spacing of `--space-3` or larger
  to recover, or accept the look. The engine is built for low-density
  panels and card-style layouts, not data grids.
- **DiffView with character-level highlight** — the outline on every
  diff chunk overlaps with the chunk's own colored highlight,
  producing visually busy strokes. Multi-line block diffs survive
  cleanly.
- **VirtualList / long scrolling columns** — same row-density problem
  as Table.
- **SpatialCanvas, BezierEditor** — fractional-pixel positioning
  fights the hard ink boundary; corners look quantized at sub-pixel
  shifts.

The thrives / degrades split is the same teaching argument the
Cardstock, Sketch, and Pixel-art engines make: a component that
survives Cel-shaded survives every "structure-as-affordance" engine,
because the cel boundary is the cleanest test of the
border-and-elevation-as-load-bearing-tokens rule.

## `prefers-reduced-motion`

Honored at the engine level. The reduced-motion block in
`src/styles.css`:

1. Collapses every per-palette duration to `instant` (the standard
   engine-level handler every palette inherits). No press-bounce, no
   hover transition — the state changes snap.
2. Disables the hover-revealed speed-line motif
   (`iux-cel-speedlines--hover:hover`). The static speed-line motif
   (`iux-cel-speedlines`) stays on because it's decoration, not
   motion.

The engine paints no other decorative motion (no scanline drift, no
glow pulse, no marker wobble, no sprite loop), so there is nothing
additional to disable. Users with reduced-motion preferences see the
same cel-shaded aesthetic — ink outlines, two-tone shadows, saturated
fills — just with state transitions that fire instantly.

</details>

---

_Generated from `palettes/cel-shaded-shonen.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
