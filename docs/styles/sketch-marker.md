# Hand-drawn (Marker)

> The notebook-margin register — ink-blue body on cream paper, red-marker focus, every edge wobbled by a root-level SVG turbulence filter and every glyph rendered in Patrick Hand / Caveat marker faces.

**Engine:** `sketch` · **A11y:** `experimental`

## Summary

Hand-drawn (Marker) is the canonical palette of the `sketch` engine. The load-bearing visual is the root-level SVG turbulence + displacement filter (`#iux-sketch-wobble`) that recasts every border, glyph outline, focus ring, and shadow stroke as a hand-drawn approximation — its amplitude is documented as `effect.strokeVariance = '1.4px'`. Type runs through `typography.family.hand` (`Patrick Hand` body, Caveat for `display` / `title`); `surface.base` is cream `#fbf6e9` and `content.primary` is `#1a2548` ballpoint-ink blue. Elevation is ink-blue-tinted hard-then-soft shadow stacks so cards read as "page lifted off notebook paper" rather than glass.

## Origin

Felt-tip marker on cream notebook paper — the lo-fi sketching register of designer Moleskines, Sharpie whiteboards, and rough.js-era browser experiments. The aesthetic predates digital UI by decades and resurfaced as a deliberate counterpoint to crisp flat-design surfaces. This palette is the engine-level revival, delivered via a single SVG filter rather than per-component rough.js canvases.

## Signatures

- **Sub-pixel wobble on every stroke (`effect.strokeVariance = 1.4px`)** — The palette root carries an SVG turbulence + displacement filter (`#iux-sketch-wobble`) tuned to ≈1.4px displacement amplitude. Borders, glyph outlines, focus rings, and shadow edges all inherit the same jitter field — buttons sitting next to inputs sitting next to cards share a CONSISTENT hand. Every non-sketch palette returns `'0'`, which collapses the engine rule to a no-op.
- **Marker typography at every role (`typography.family.hand`)** — Patrick Hand fine-tip carries `body` / `heading` / `subheading` / `label` / `caption` / `code` at weight 400; Caveat brush-marker carries `display` / `title` at weight 700. Body size is bumped to 1.15rem to compensate for Patrick Hand's ~0.55em x-height. Every non-sketch palette aliases `family.hand` to its `ui` stack.
- **Ink-blue body on cream notebook field (`#1a2548` on `#fbf6e9`)** — `content.primary` is `#1a2548` — what a ballpoint actually looks like on cream paper, not digital `#2563eb`. `surface.base` is `#fbf6e9` notebook cream. `content.muted` lifts to pencil-grey `#8a8676`. Five-marker intent palette: navy, red, green, mustard, teal.
- **Red-marker focus loop (`focusRing.color = #b3261e`, 3px width, 3px offset)** — `effect.focusRing` is `{ width: 3px, offset: 3px, color: #b3261e, style: solid }`. The displacement filter turns the crisp red ring into a hand-drawn loop around the focused element — reads as a deliberate "circled" affordance against the cream field. Width and offset both 50% above the AAA 2/2 floor to compensate for jitter eating sub-pixel edge contrast.
- **Ink-blue-tinted elevation rather than neutral cast shadow** — `elevation.low = 1px 2px 0 rgba(26, 37, 72, 0.35)`, scaling through `medium`/`high`/`overlay` with the same navy-ink tint. Reads as "shadow as a slightly darker patch of ink leaking around the edge" rather than as light-cast shadow.
- **Intent borders one luminance step darker than their fills** — Every `intent.*.border` is darker than the `intent.*.bg`. After the displacement pass this reads as 'marker outline traced first, ink filled second' — i.e. how a real sketch is built up in layers. The visual cue is the same trick a cel-animated frame uses, but rendered through wobble rather than through a hard ink halo.

## Anti-signatures

- Crisp vector-aliased edges — defeats the wobble that the engine exists to deliver
- A geometric sans like Inter, Segoe UI, or system-ui on body — the marker font is load-bearing
- Hard offset block shadows in pure ink — that's Cel-shaded / Memphis, not Sketch
- Engine overlays on top of paper texture (scanlines, glass frost, neon glow)
- Pure-black (`#000`) shadow color — Sketch tints toward ink-blue navy

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.strokeVariance` | `1.6px` | `1.4px` — the wobble amplitude the root-level SVG filter applies to every stroke. Every non-sketch palette returns `0`. |
| `typography.family.hand` | `"Patrick Hand", "Bradley Hand", "Comic Sans MS", cursive` | `"Patrick Hand", "Bradley Hand", "Comic Sans MS", cursive` — the marker stack that body / label / caption / code all route through. |
| `typography.family.display` | `"Caveat", "Bradley Hand", "Marker Felt", cursive` | `"Caveat", "Bradley Hand", "Marker Felt", cursive` — the brush-marker face for `display` / `title`. |
| `color.surface.base` | `#fbf6e9` | `#fbf6e9` notebook cream — the paper field. |
| `color.content.primary` | `#1a2548` | `#1a2548` ballpoint ink — what a real pen looks like on cream paper. |
| `effect.focusRing.color` | `#b3261e` | `#b3261e` red marker — the displacement filter turns the ring into a hand-drawn loop. |
| `elevation.low.boxShadow` | `1px 2px 0 rgba(26, 37, 72, 0.35)` | `1px 2px 0 rgba(26, 37, 72, 0.35)` — ink-blue-tinted, not neutral black. Reads as ink leaking around the edge. |

## Often confused with

### vs [Cel-shaded (Shonen)](./cel-shaded-shonen.md)

Both register as "hand-drawn cartoon," but Cel-shaded uses a HARD 3px ink outline plus `shadowStyle: hard` two-tone offset shadows — clean cels with crisp edges. Sketch (this palette) uses an SVG turbulence filter to `wobble` every edge and ships marker fonts at every role. Cel-shaded edges are pixel-perfect; sketch edges are never pixel-perfect because the filter displaces them every frame.

### vs [Risograph](./risograph.md)

Risograph also lives in lo-fi paper register but its load-bearing tokens are misregistration offsets, paper-grain texture, and limited-ink overlays — a print process simulation. Sketch-marker simulates the act of drawing: wobbled strokes, marker fonts, and a red-pen focus loop. Different stage of the same notebook.

### vs [Blueprint](./blueprint.md)

Blueprint is the technical-drafting register — cyan grid on dark navy field, thin precise hairlines, drafting rules. Sketch-marker is the unstructured-notebook register — cream field, marker glyphs, intentionally imprecise wobbled lines. Blueprint is a finished drawing; Sketch is the doodle next to it.

## Where it thrives

- Cards, Modals, Drawers, Toasts — strong-wobble filter on raised surfaces sells the "drawn frame on paper" effect
- Buttons, Toggles, Checkboxes, Stepper — focusable controls with the red-marker focus loop
- Sidebar / Tabs / Segmented / Pagination — hairline dividers become hand-drawn separators for free
- EmptyState / Tooltip — Caveat at display size reads as a friendly hand-lettered headline

## Where it degrades

- Tables with dense rows — adjacent row borders pick up the same turbulence field and briefly read as merged
- DiffView with character-level highlight — single-character diffs jitter loose under the displacement pass
- VirtualList / long-scroll — root-level `filter:` costs a repaint every scroll position
- BezierEditor / SpatialCanvas / continuous Slider — sub-pixel control points fight the engine wobble

## Recall aliases

`sketch`, `sketch marker`, `hand-drawn`, `hand drawn`, `marker`, `patrick hand`, `caveat`, `notebook`, `doodle`

## Long-form notes

<details>
<summary>From <code>palettes/sketch-marker.README.md</code></summary>

# Hand-drawn (Marker)

The notebook-margin register. Cream paper field, ink-blue body type,
red-marker accent for focus and link, five-marker intent palette
(navy / red / green / mustard / teal). Every edge is visibly **drawn**
rather than crisp — borders, glyph outlines, focus rings, and shadow
strokes all carry a sub-pixel wobble.

Anchored on a new `sketch` engine that exercises two contract slots
no previous engine touched:

- `effect.strokeVariance` — the wobble amount, in CSS px. Set to
  `'1.6px'` here; the engine references a fixed-strength SVG turbulence
  + displacement filter at the palette root (defined in `index.html`)
  tuned to ≈ this value. Every non-sketch palette returns `'0'`, which
  the engine CSS reads as "no wobble" — the rule is a no-op.
- `typography.family.hand` — the bundled marker-font stack. Routed
  through every `role.*` except `display` / `title` (which use the
  brush-marker Caveat face). Every non-sketch palette aliases this to
  its `ui` stack so the slot stays defined without being load-bearing.

## Hand-drawn implementation: SVG filter, not rough.js

The brief offered two routes for "every line feels drawn": an SVG
filter applied at the palette root, or per-component rough.js-style
rendering. **We chose the SVG-filter route.** Three reasons:

1. **It stays inside the engine seam.** The filter is referenced from
   `src/styles.css` under the `data-palette^='sketch'` scope — no
   component touches it. Every existing border, radius, and shadow
   inherits the hand-drawn feel for free, without a per-component opt-in
   or a `rough.js` canvas mount. That matches the contract's "engines
   redefine slots, components consume only slots" rule. A rough.js
   approach would force every focusable control, every card, every
   form field to opt in via its own `<canvas>` / `<svg>` overlay.
2. **The wobble matches across controls without coordination.** A
   single turbulence field driving displacement gives buttons sitting
   next to inputs sitting next to cards a *consistent* jitter signature
   — they look like they were drawn by the same hand. Rough.js
   produces independent random shapes per component; neighbouring
   controls visibly fight each other.
3. **It's about an order of magnitude lighter on render.** One SVG
   filter pass at the root costs roughly the same as the existing
   palette `text-shadow` (CRT-engine bloom) — the GPU runs the
   turbulence + displacement shader once per repaint. A rough.js path
   for every border in the showcase generates dozens of new SVG paths
   per render and re-rasterises them every state change.

### Tuning the filter so it reads as a hand, not as noise

The filter is applied to the *whole* palette subtree, so its
parameters have to flatter borders **and** stay kind to the text
underneath them. Two settings carry that balance (see the annotated
`<defs>` in `index.html`):

- **`numOctaves="1"`.** A second octave layers high-frequency noise
  over the gentle wave. On a border that reads as fraying; on glyphs it
  reads as the whole word vibrating. One octave gives a single
  confident sweep per edge.
- **low `baseFrequency` (~0.01).** The noise feature size is large
  relative to a button or card, so each edge picks up one or two long
  curves instead of a dozen tiny wiggles. Higher frequencies read as
  "rough," not as a hand.

There is no trailing `feGaussianBlur`: any blur in a whole-subtree
filter also defocuses body copy. The displacement scale (`1.6` at the
root, `2.2` on raised surfaces) does the hand-drawn work on its own.

The trade-off: `filter: url(...)` on `.palette-root` creates a stacking
context, so `position: fixed` children become anchored to the filtered
ancestor rather than the viewport. The showcase's existing
inline-overlay scoping (see `src/styles.css`'s
`.stories__cell:has(.iux-modal__scrim--inline)`) already handles this
— modals and drawers stay scoped to their containing cell. Apps that
mount a sketch palette at the page root rather than per-cell get the
expected full-viewport overlay behaviour.

## Marker fonts

- **Caveat** by Pablo Impallari & Rodrigo Fuenzalida, **SIL OFL 1.1**
  (open-source, embedding-safe). Brush-marker display face. Used for
  `role.display` and `role.title`. Three weights (400/600/700).
- **Patrick Hand** by Patrick Wagesreiter, **SIL OFL 1.1**. Fine-tip
  handwritten face that stays legible at body size. Used for every
  other role (`heading`, `subheading`, `body`, `label`, `caption`,
  `code`).

Both fonts are loaded via Google Fonts `@import` at the top of
`src/styles.css` with `display=block` so descendant glyphs don't flash
a system fallback before the WOFF lands. To vendor locally, drop the
two WOFF2 files into `public/fonts/` and swap the `@import` for
`@font-face` rules — the token strings (`"Caveat"` / `"Patrick Hand"`)
stay the same.

## Slight color bleed

The "bleed" effect comes from two layered tricks:

1. `intent.*.border` is set one luminance step darker than
   `intent.*.bg` on every intent. After the displacement pass this
   reads as "the marker outline was drawn first, the ink filled
   second" — i.e. how a real sketch is built up in layers.
2. `elevation.*` shadows are tinted toward ink-blue rather than black
   (`rgba(26, 37, 72, …)`), so the shadow under a card reads as a
   slightly darker patch of ink leaking around the edge rather than a
   neutral cast shadow.

> **No filter blur.** An earlier build ended the SVG filter chain with
> a small `feGaussianBlur` for a "marker bleed" softening. Because the
> filter is applied to the whole palette subtree, that blur also
> softened every glyph of body copy — the dominant cause of the engine
> rendering "rough." The blur was removed; the bleed is now carried by
> the border/fill luminance step above, which leaves text crisp.

## A11y

`experimental`. Three reasons:

1. **Body text is handwritten.** Patrick Hand at 1.15rem on a
   `#fbf6e9` field with `#1a2548` ink clears WCAG AA contrast (~12:1).
   The single low-frequency displacement (and the dropped blur) keeps
   glyphs crisp and lets whole words drift together rather than
   jittering apart, but a handwritten face still reads as more
   effortful than a system font over long paragraphs. The body-size
   bump to 1.15rem buys back most of that margin.
2. **Focus ring is hand-drawn.** The displacement filter recasts the
   3px solid red ring as a wobbly red loop around the focused
   element. It's *more* visible than a crisp ring against the cream
   field, but keyboard users tracking focus across rapid tabs may
   read the loop as decoration. The 3px width and 3px offset are both
   above the AAA minimum (2px / 2px) to compensate.
3. **Filter performance.** SVG filters with `feTurbulence` repaint
   on every layout change. The filter is therefore scoped to a curated
   list of small UI-primitive classes (see the engine block in
   `src/styles.css`) rather than the palette root — each control is its
   own small filter region, so a hover/focus/scroll repaint only
   re-rasterizes the control that changed instead of the whole page.
   An earlier build hung the filter on `.palette-root`, which made the
   entire scrolling subtree (every chart, table, and list included) one
   giant filter region and was visibly sluggish on long pages. The
   displacement field itself is static (no `<animate>`), and
   `prefers-reduced-motion` already collapses every duration to
   `instant`, so this is a GPU-load caveat, not a vestibular one. The
   cost of the scoped filter is that free-floating body copy and layout
   chrome outside the listed primitives render crisp rather than drawn.

## What thrives vs degrades

Components that **thrive** under Sketch:

- **Card, Modal, Drawer, Toast** — the strong-wobble filter on raised
  surfaces sells the "drawn frame on paper" effect. The reason we
  scope `#iux-sketch-wobble-strong` specifically to these classes is
  precisely that they're where the eye lingers longest.
- **Button, Toggle, Checkbox, Stepper** — the brief's focusable
  controls. Marker glyphs at 1.15rem on a red-marker focus loop is
  the look.
- **Sidebar, Tabs, Segmented, Pagination** — block fills with drawn
  separators. The displacement turns flat hairline borders into hand-
  drawn dividers without per-component code.
- **EmptyState, Loading, Tooltip** — illustration-adjacent components.
  Caveat at `display` size reads as a friendly hand-lettered headline.

Components that **degrade** under Sketch (intentional contrast — do
not fork to "fix"):

- **Table with dense rows** — every row's borders pick up the same
  turbulence field, so adjacent rows can briefly read as visually
  merged. Use larger row spacing or accept the look.
- **DiffView with character-level highlight** — the displacement pass
  jitters character boundaries, so single-character diffs read as
  loose. Multi-character diffs (word / line level) survive cleanly.
- **VirtualList / long-scroll columns** — these roots are deliberately
  left off the wobble list: a per-scroll-position filter repaint over a
  long list compounds badly. Under the scoped engine they render crisp
  (fast); only the small controls inside them pick up the wobble. If you
  want the list chrome itself drawn, add its class to the engine list in
  `src/styles.css` — but expect the old long-scroll cost back.
- **BezierEditor** — sub-pixel control points run through the
  displacement filter; the curve renders with a hand-drawn wobble that
  fights the precision the editor needs. Acceptable for a teaching
  showcase; not a production posture.
- **SpatialCanvas, Slider with continuous positioning** — same family
  of "fractional positions get jitter" as BezierEditor. The wobble is
  the engine working as intended.

The point is the same as the Pixel-art and CRT engines: every
component above survives without code changes. The "degrades" list is
the contrast that makes the contract teaching material — a component
that survives Sketch survives every engine, because Sketch is the
loudest test of the no-component-touches-the-engine rule.

</details>

---

_Generated from `palettes/sketch-marker.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
