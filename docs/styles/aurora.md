# Aurora

> Deep midnight base with a slowly drifting multi-radial atmosphere — surfaces demarcated by light density (`surfaceBy: 'luminance'`), not by borders, with a 48-second drift loop that never reaches the same composition twice.

**Engine:** `aurora` · **A11y:** `experimental`

## Summary

Aurora is the only palette in the codebase on the `aurora` engine and the only one that sets `effect.surfaceBy = 'luminance'`. The signature surface model is light density: `surface.base` is near-black `#0a0e1a`, `raised` is `rgba(255,255,255, 0.05)`, and the engine paints a four-radial atmospheric gradient (deep purple, atmospheric green, teal, secondary purple wash) at the palette root that slowly drifts across a 200% canvas on a 48-second `alternate` loop. Cards read as brighter regions of the same atmosphere — every `elevation.*` slot is a paired outer-purple-glow + inner-white-lift stack (no hard offset shadows), borders sit at recessive `0.05 / 0.10 / 0.18` alphas, and the focus border holds full-chroma purple `#a78bfa` so keyboard focus stays visible regardless of the luminance mode.

## Origin

Original to the iux design system. Aurora was introduced as the first atmospheric engine — a deliberate contrast to every prior palette's "surfaces are demarcated by a stroke" assumption. The aesthetic borrows from astrophotography of the aurora borealis and from ambient screensavers (Apple Aerial, Windows DreamScene) rather than from any product chrome lineage. The drifting gradient and the `surfaceBy: 'luminance'` contract addition were designed together — neither makes sense without the other.

## Signatures

- **Four-radial drifting `effect.atmosphereGradient`** — The engine paints `radial-gradient(at 22% 28%, rgba(91,63,216,0.42), transparent 55%), radial-gradient(at 78% 38%, rgba(14,128,96,0.38), transparent 60%), radial-gradient(at 50% 80%, rgba(32,112,144,0.40), transparent 58%), radial-gradient(at 12% 88%, rgba(167,139,250,0.30), transparent 52%)` at the palette root on a 200% canvas, and slowly drifts `background-position` over a 48s `alternate` `ease-in-out` loop. The composition is *designed* never to repeat within a viewing session.
- **`effect.surfaceBy: 'luminance'` — surfaces by light density, not by borders** — Aurora is the only palette in the codebase that sets `surfaceBy: 'luminance'`; every other palette declares `'border'`. The slot is the most load-bearing contract distinction in the engine: a raised card here is *not* a different opaque fill, it's a translucent luminance lift over the same atmosphere. The engine block paints a soft outer white halo via `--luminance-center` plus a `backdrop-filter` blur so the edge dissolves into the gradient instead of cutting it.
- **`effect.luminanceCenter` = `rgba(255,255,255, 0.08)`** — A translucent near-white tint that the engine paints as the soft outer glow around raised surfaces and intensifies on hover (to `0.10`) and focus (to `0.14`). The slot is `'transparent'` on every other palette in the codebase — Aurora is the only one to put it to work. The var inherits down the tree, so nested raised surfaces pick up the same luminance unless they override locally.
- **Paired outer-purple-glow + inner-white-lift elevation (no hard offset shadows)** — `elevation.low` is `0 0 24px 2px rgba(167,139,250,0.10), inset 0 0 20px rgba(255,255,255,0.03)`, scaling to `0 0 80px 10px rgba(167,139,250,0.22), inset 0 0 32px rgba(255,255,255,0.06), 0 16px 48px rgba(5,8,16,0.55)` at `overlay`. The cardstock metaphor is explicitly "a brighter patch of atmosphere," not "paper above paper" — there are no hard offset shadows at any tier.
- **Heavy backdrop blur (`blur(28px)` at lg) on a near-black host** — `effect.backdropBlur.sm/md/lg` is `blur(8px) / blur(16px) / blur(28px)` — heavier than classic Glassmorphism. The blur is mandatory: raised surfaces need to soften the gradient underneath so they read as luminance centers rather than as sharp window cuts onto the unblurred atmosphere.
- **Cool-tinted near-white type (`#e8f0f4`) and atmospheric-teal link** — `content.primary` is `#e8f0f4` (luminance ≈ 0.85, picks up the teal register), stepping down to `#a8b8c8` and `#6a7a8a` for secondary / muted within the same cool family. `content.link` is `#8be9d6` — atmospheric teal, picked out of the gradient itself, so calls-to-action match the palette rather than fight it.

## Anti-signatures

- Any opaque `surface.raised` fill (defeats the luminance surface model — cards would punch holes in the atmosphere)
- Hard offset shadows on `elevation.*` (the metaphor is brighter atmosphere, not paper-above-paper)
- Full-chroma 1px outlines on non-focus borders (the recessive `0.05–0.18` white tints are the contract)
- `atmosphereGradient: 'none'` (every other palette sets this — Aurora is the only one that paints the gradient at the engine root)
- A saturated chromatic `surface.base` like Glassmorphism's indigo or Aero's Vista-blue (Aurora's floor is near-neutral midnight so the gradient supplies all chroma)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.surfaceBy` | `luminance` | `'luminance'` — the only palette in the codebase that sets this. Records that surfaces are demarcated by light density, not by strokes. |
| `effect.atmosphereGradient` | `radial-gradient(at 22% 28%, rgba(91, 63, 216, 0.42), transparent 55%), radial-gradient(at 78% 38%, rgba(14, 128, 96, 0.38), transparent 60%), radial-gradient(at 50% 80%, rgba(32, 112, 144, 0.40), transparent 58%), radial-gradient(at 12% 88%, rgba(167, 139, 250, 0.30), transparent 52%)` | Four-radial stack of purple / green / teal / secondary-purple luminance centers — the engine paints and slowly drifts this at the palette root over a 48s loop. |
| `effect.luminanceCenter` | `rgba(255, 255, 255, 0.08)` | `rgba(255,255,255, 0.08)` — the translucent near-white glow the engine paints around raised surfaces. `'transparent'` on every other palette. |
| `color.surface.base` | `#0a0e1a` | Near-black midnight `#0a0e1a` — the floor the atmospheric gradient paints over and the colour that shows through gradient gaps. |
| `color.surface.raised` | `rgba(255, 255, 255, 0.05)` | Very low-alpha white `rgba(255,255,255,0.05)` — a translucent luminance lift, not an opaque fill. Reads as a brighter fog patch in the same atmosphere. |
| `elevation.overlay.boxShadow` | `0 0 80px 10px rgba(167, 139, 250, 0.22), inset 0 0 32px rgba(255, 255, 255, 0.06), 0 16px 48px rgba(5, 8, 16, 0.55)` | Paired purple outer glow + white inner lift + ink-black drop — `0 0 80px 10px rgba(167,139,250,0.22), inset 0 0 32px rgba(255,255,255,0.06), 0 16px 48px rgba(5,8,16,0.55)`. No hard offsets at any tier. |
| `effect.backdropBlur.lg` | `blur(28px)` | `blur(28px)` — mandatory to soften the gradient under raised surfaces so they read as luminance centers, not as sharp cuts. |
| `color.border.focus` | `#a78bfa` | Full-chroma purple `#a78bfa` — focus stays at full saturation regardless of the recessive `0.05–0.18` non-focus border alphas. |

## Often confused with

### vs [Liquid Glass (Dark)](./liquid-glass-dark.md)

Liquid Glass Dark also rides on a near-black host (`#0f1218`) with translucent panels, but it's a `glassmorphism`-engine palette with `surfaceBy: 'border'`: surfaces are demarcated by sky-cyan refraction-tinted hairlines and the host is *static* near-neutral black. Aurora is on the `aurora` engine with `surfaceBy: 'luminance'`, a four-radial drifting chromatic gradient at the root, paired-glow elevation with no hard offsets, and recessive white borders. Same darkness floor, completely different surface model.

### vs [Tron / Dark-Neon](./tron-dark-neon.md)

Tron Dark Neon is a flat-engine dark register where the chrome comes from full-chroma neon outlines on opaque surfaces. Aurora has no neon outlines at all — chroma lives in the atmospheric gradient itself, not in component strokes, and surfaces are translucent luminance lifts rather than bordered opaque panels.

### vs [Vaporwave](./vaporwave.md)

Vaporwave is a synthwave gradient register — magenta / cyan, often with CRT scanlines and chromatic aberration overlays. Aurora is atmospheric astrophotography — purple / green / teal centers on midnight, no scanlines, slow 48s drift rather than a static loud composition, and the `surfaceBy: 'luminance'` model where Vaporwave keeps standard bordered surfaces.

### vs [Glassmorphism](./glassmorphism.md)

Classic Glassmorphism commits to a saturated indigo *static* host with hairline-white borders, top-only inset highlight elevation, and `surfaceBy: 'border'`. Aurora replaces the static host with a drifting four-radial atmosphere, replaces the strokes with recessive white tints, and replaces the inset+outer shadow recipe with a paired purple-glow + white-lift stack — `surfaceBy: 'luminance'` end to end.

## Where it thrives

- Card, Modal, Drawer, Toast — translucent fill + heavy backdrop blur + luminance halo produces the "fog patch in the atmosphere" effect at every elevation tier
- Tabs, Segmented, Pagination — `aria-selected="true"` triggers the engine's luminance + purple-inset selection cue and lights up unambiguously
- Task board (kanban cards) — card-level luminance halo plus the engine's selection treatment reads cleanly through drag-and-drop
- Tooltip, Popover, Spotlight — small luminance lifts in the atmosphere; the heavy blur reads perfectly at small sizes
- Note outliner current-line indicator — the inset purple-accent rule doesn't shift layout, so keyboard navigation reads cleanly

## Where it degrades

- Dense Tables and VirtualList — luminance lifts don't separate rows the way zebra stripes or hard borders do; the README flags this as the engine's intentional contrast point. Each row IS a piece of the atmosphere and resting rows blend
- DiffView with character-level highlight — the inset purple selection rule overlaps with the chunk's own coloured highlight; block diffs survive, character diffs do not
- CommandPalette / NLBar input affordance — the cursor in a field loses visual weight against the atmospheric background; only the recessive `border.default` at `rgba(255,255,255,0.10)` rescues it
- Browsers without `backdrop-filter` — surfaces still read as translucent luminance lifts, but the edge-dissolution into the gradient is lost

## Recall aliases

`aurora`, `aurora borealis`, `atmosphere`, `atmospheric`, `northern lights`

## Long-form notes

<details>
<summary>From <code>palettes/aurora.README.md</code></summary>

# Aurora

A deep midnight base with a very slowly drifting atmospheric gradient.
Green / purple / teal luminance centers ride a multi-radial-gradient
stack that loops over 48 seconds, never reaching the same composition
twice within a viewing session. Surfaces are demarcated by **light
density**, not by borders: cards appear as brighter regions of the same
atmosphere, type is high-luminance near-white with a slight cool
chromatic tint that picks up the teal in the atmosphere, and
interactive elements bend the luminance toward themselves on hover /
focus.

Anchored on a new `aurora` engine that exercises three contract slots
no previous engine touched:

- `effect.atmosphereGradient` — the animated background; static
  fallback elsewhere. `'none'` on every other palette, so any engine
  CSS that references the var paints nothing.
- `effect.luminanceCenter` — per-surface; default = inherit from
  parent. `'transparent'` on every other palette, so any engine CSS
  that references the var paints nothing.
- `effect.surfaceBy` — `'border'` everywhere except Aurora, which
  sets `'luminance'`. The slot fundamentally changes how surfaces are
  demarcated and is the most load-bearing contract addition in this
  palette session — every existing palette had to declare it as
  `'border'` and a future second atmospheric engine could plug into
  the same slot by setting `'luminance'`.

The three vars are emitted as `--effect-atmosphere-gradient`,
`--luminance-center`, and `--surface-by`.

## Why surfaces by light density

The brief offered two routes for "raised surfaces against an
atmospheric background": treat raised as a different opaque color
(the route every previous palette takes — `--color-surface-raised`
resolves to a real fill), or treat raised as a translucent luminance
lift on top of the atmosphere. **We chose the luminance route.** Three
reasons:

1. **The atmosphere is the load-bearing visual.** A solid raised fill
   would PUNCH HOLES in the gradient — every card would be a window
   onto a non-aurora surface, and the engine's defining metaphor
   ("the whole UI is one drifting atmospheric mass") would collapse
   into "cards float over a video background." Translucent fills
   keep the atmosphere visible through every surface, with the
   luminance halo and backdrop blur doing the surface-demarcation
   work.
2. **`surfaceBy` is a real contract distinction.** Every other palette
   demarcates surfaces with a stroke; this is the FIRST engine where
   a stroke is the wrong primitive. The slot records that distinction
   as a first-class semantic token so future components (a custom
   `Separator` that wants to switch from a hairline rule to a
   luminance gradient, an annotation layer that needs to know whether
   to draw a hard edge) can read the engine's intended surface model
   directly.
3. **Borders aren't disabled, they're recessive.** Components reading
   `--color-border-*` still get a faint white tint (`0.05` to `0.18`
   alpha) so any structural cue they need lands at a low-alpha
   weight. The luminance centers do the actual surface-demarcation
   work; the borders are still THERE, they just don't fight the
   atmosphere for visual weight.

The trade-off: a control that paints a hard `1px` outline with full
chroma (Cel-shaded-style, Neubrutalism-style) would look out of place
under Aurora — but no component does that, because the contract
forbids per-component color literals. Every component reads
`--color-border-*`, which Aurora has tuned to the right opacity.

## The atmospheric gradient

```
radial-gradient(at 22% 28%, rgba(91, 63, 216, 0.42), transparent 55%),
radial-gradient(at 78% 38%, rgba(14, 128, 96, 0.38), transparent 60%),
radial-gradient(at 50% 80%, rgba(32, 112, 144, 0.40), transparent 58%),
radial-gradient(at 12% 88%, rgba(167, 139, 250, 0.30), transparent 52%)
```

Four luminance centers anchored at different positions: deep purple
upper-left, atmospheric green mid-right, teal lower-band, and a
secondary lighter purple wash in the lower-left. The composition is
painted on a 200% canvas (`background-size: 200% 200%`) and slowly
drifted via `background-position` keyframes:

```
0%   → 0% 0%
25%  → 30% 60%
50%  → 70% 30%
75%  → 40% 80%
100% → 100% 50%
```

48-second loop, `ease-in-out` easing, `alternate` direction. The
result is a continuous slow drift that reveals different gradient
regions over time without ever exposing a hard tile boundary or
reaching the same composition twice in a session.

## `prefers-reduced-motion` — designed static fallback

The brief is non-negotiable: under `prefers-reduced-motion`, the
gradient must COMPLETELY freeze, and the static composition that
remains must be designed — not "the moment the animation stopped."
The engine block honors this:

```css
@media (prefers-reduced-motion: reduce) {
  .palette-root[data-palette^='aurora'] {
    animation: none;
    background-position: 30% 40%;
  }
}
```

`30% 40%` is the intentionally-composed static position: the deep
purple luminance center sits in the upper-left, the green center
sits mid-right, the teal center sits in the lower band, and the
secondary purple wash sits in the lower-left. The composition reads
as "the atmosphere is at rest," not as "the animation paused at
frame 1." This is the aesthetic the brief calls "must be acceptable
as a fallback."

The luminance halo on raised surfaces, the backdrop blur on cards,
the hover / focus brightening, and the selection state ALL stay
under reduced motion — they're decoration, not motion. Users with
reduced-motion preferences see the same aurora aesthetic, just
without the slow drift.

## Contrast envelope — verified against the brightest state

The aesthetic risk under any atmospheric engine is that the gradient
brightens unpredictably and text loses contrast against the
brightest spot. Aurora handles this by capping every luminance
center BELOW the threshold that would lift the effective background
luminance into the text-contrast zone:

| Layer | Color | Luminance | Notes |
|---|---|---|---|
| Base | `#0a0e1a` | ~0.005 | Deep midnight floor |
| Purple center (40% alpha) | `rgba(91, 63, 216, 0.42)` | ~0.04 effective | Brightest gradient spot |
| Green center (40% alpha) | `rgba(14, 128, 96, 0.38)` | ~0.035 effective | |
| Teal center (40% alpha) | `rgba(32, 112, 144, 0.40)` | ~0.04 effective | |
| Purple wash (30% alpha) | `rgba(167, 139, 250, 0.30)` | ~0.045 effective | Lighter; smallest center |
| Raised surface (over brightest) | base + raised + center | ~0.07 effective | Sum of layers |

Body text `content.primary` is `#e8f0f4`, luminance ≈ 0.85. On the
brightest possible spot (raised surface over the purple wash):

```
contrast = (0.85 + 0.05) / (0.07 + 0.05) = 0.90 / 0.12 ≈ 7.5:1
```

Well above WCAG AA (4.5:1) and just below AAA (7:1). Off raised
surfaces, the contrast is higher (~12:1). Secondary text
(`#a8b8c8`, luminance ≈ 0.50) on the worst-case spot is at ~4.6:1
— passes AA for body text but not for AAA.

This is the contract addition the brief flagged: **a validator
extension could check text-color contrast against the BRIGHTEST
state of `effect.atmosphereGradient`, not the average background
color.** That validator would catch a future palette that bumps the
gradient alphas too high. For now, the contrast envelope is
documented here, and `aurora.ts` has inline comments at every text
color noting the worst-case contrast ratio.

## Selection state under `surfaceBy: 'luminance'`

Selected rows / cards / lines under Aurora can't just brighten the
surface — every raised surface is already a luminance lift. The
brief is explicit: "selected rows in a table can't just brighten,
they need a luminance shift that reads instantly."

The engine block layers two cues on `[aria-selected="true"]`,
`[data-selected="true"]`, and `.is-selected`:

1. **Brighter translucent fill.** `rgba(255, 255, 255, 0.13)` —
   noticeably above the `0.05` raised-surface baseline AND the
   `0.10` hover state, so selection wins both rest and hover.
2. **Inset purple-accent rule.** Painted with `box-shadow: inset
   ... var(--border-width-hairline) rgba(167, 139, 250, 0.45)`
   plus an outer glow at `0.18` alpha, so selection reads as "the
   atmosphere closed in around this element." No layout shift,
   because `box-shadow` doesn't push siblings the way an extra
   border would.

Tested against:

- **Task board (card selection)** — selected cards in a kanban
  column read instantly because the luminance lift escalates from
  `0.05` (resting raised) → `0.13` (selected) AND the purple inset
  rule outlines the card without competing with the rest of the
  atmosphere. Drag-and-drop reads cleanly because the selected card
  shows the rule even while moving.
- **Note outliner (current-line indicator)** — the `.is-selected`
  class on outline nodes lights up unambiguously. Because the rule
  is `inset 0 0 0 hairline` rather than a full border, the line
  doesn't shift horizontally when selection moves up/down — exactly
  the affordance the outliner needs for keyboard navigation.
- **Table rows** — the existing zebra-stripe pattern is preserved
  on resting rows, hover lifts to `0.10`, and `is-selected` rows
  win with the full luminance + purple rule treatment. The Table's
  own selection rule (`color-mix(in srgb, var(--color-intent-
  primary-bg) 14%, transparent)`) is OVERRIDDEN by the engine block
  because the engine's selection cue is the authoritative one under
  `surfaceBy: 'luminance'`.

If selection isn't obvious at a glance, the engine isn't done. The
three contexts above all pass that test.

## Hover / focus bends the luminance

The brief calls for "the luminance center subtly bends toward the
interactive element" on hover/focus. CSS can't track the cursor
without JavaScript, but we can intensify the luminance center
beneath the hovered / focused element so the atmosphere reads as
"closing in" around the interaction.

The engine block paints a `radial-gradient` `background-image` on
`.iux-button:hover`, `.iux-card--interactive:hover`,
`.iux-table__tr:hover`, and any element marked
`[data-interactive]:hover`. The gradient is centered on the element
(default `circle at center`) at `rgba(167, 139, 250, 0.10)` — a
subtle purple lift that fades to `transparent 70%`. On
`:focus-visible`, the alpha bumps to `0.14` so keyboard focus reads
as a stronger atmospheric brightening than hover.

This is the "luminance bends toward the interaction" cue. The cursor
isn't tracked — but the effect is good enough that the user reads
"the atmosphere is responding to me," which is what the brief asks
for. A future enhancement could add cursor tracking via a CSS
custom-property pointer-position trick, but that requires
JavaScript at the engine boundary and we kept the engine
JS-free.

## What thrives vs degrades

Components that **thrive** under Aurora:

- **Card, Modal, Drawer, Toast** — the engine's load-bearing
  surfaces. Translucent fill + backdrop blur + luminance halo
  produces the "fog patch in the atmosphere" effect at every
  elevation tier. Modal panels in particular read perfectly: the
  overlay elevation slot has the heaviest halo (`rgba(167, 139,
  250, 0.22)` outer glow) and the longest drop shadow, so a modal
  opening reads as the atmosphere thickening around the panel.
- **Tooltip, Popover, Spotlight** — small luminance lifts in the
  atmosphere. The translucent fill + heavy backdrop blur reads
  perfectly at small sizes.
- **Tabs, Segmented, Pagination** — the selected segment's
  `aria-selected="true"` triggers the engine's selection treatment,
  which means the active tab/segment lights up unambiguously
  without needing a separate styling pass.
- **Task board (kanban cards)** — see the selection section above.
  The card-level luminance halo and the engine's selection cue
  combine perfectly for drag-and-drop.
- **Note outliner** — the current-line indicator lands cleanly
  thanks to the engine's selection cue. Indented outlines also
  benefit from the engine's atmospheric base — there's no
  per-indent-level surface fill to fight, just the same atmosphere
  with deeper indentation marked by the muted text color.

Components that **degrade** under Aurora (intentional contrast — do
not fork to "fix"):

- **Table with dense rows** — the metaphor falls apart at row
  density. Each row IS a piece of the atmosphere, and luminance
  lifts don't separate rows the way zebra stripes or hard borders
  do. The Table's own zebra stripe (set to `--color-surface-base`)
  vanishes against the gradient. Use the engine's selection cue
  for the currently-active row and accept that resting rows blend
  into the atmosphere. The Aurora register is built for low-density
  panels and content-focused layouts, not data grids.
- **DiffView with character-level highlight** — the inset purple
  rule on selection overlaps with the chunk's own colored
  highlight. Multi-line block diffs survive cleanly because the
  block-level luminance lift is the dominant cue.
- **VirtualList / long scrolling columns** — same row-density
  problem as Table. The stacked atmosphere reads as noise at scale.
- **CommandPalette, NLBar** — these components render as
  translucent panels by default, which is FINE under Aurora — but
  the input affordance (a cursor in a field) loses some of its
  visual weight against the atmospheric background. The 1px white
  tint on `border.default` rescues it; just barely.

The point is the same as the Cardstock and Cel-shaded engines:
every "thrives" component survives **without code changes**. The
"degrades" list is the contrast that makes the contract teaching
material — a component that survives Aurora survives every
atmospheric engine, because Aurora is the cleanest test of the
surface-by-luminance rule.

## A11y

`experimental`. Three reasons:

1. **Contrast depends on the gradient state.** Body text passes WCAG
   AAA on the worst-case spot, but secondary text (`#a8b8c8`)
   passes only AA. A future "Aurora High-Contrast" register could
   raise the secondary luminance to clear AAA, but that would crowd
   the cool chromatic register.
2. **Backdrop blur isn't universally supported.** Browsers without
   `backdrop-filter` render raised surfaces as translucent fills
   over the unblurred gradient — the surface still reads as a
   luminance lift, but the edge dissolution effect is lost. The
   surface fill alone is enough to demarcate the card.
3. **Animated gradients can trigger motion sensitivity.** The drift
   is slow (48s loop, very low velocity at any point), but users
   with `prefers-reduced-motion` get the designed static fallback
   above. The `experimental` tag mandates an opt-in for production
   so teams confirm the static fallback also matches their brand.

## What is NOT in this engine

- **No cursor tracking.** The luminance bends toward the
  interactive element via hover/focus state, not by following the
  pointer. A pointer-position effect would require JavaScript at the
  engine boundary, and we kept the engine JS-free.
- **No per-component decoration utility.** The Cel-shaded engine
  ships a `.iux-cel-speedlines` utility class for opt-in
  decoration; Aurora has no equivalent because the atmosphere IS
  the decoration. Every surface already participates.
- **No second atmospheric register.** Aurora is the only palette
  using `surfaceBy: 'luminance'` today. The contract is built so a
  second register (e.g. "Aurora / Sunrise" with warmer luminance
  centers, "Aurora / Deep Sea" with all-blue centers) could land
  later by editing only `color.*`, `effect.atmosphereGradient`,
  `effect.luminanceCenter`, and `effect.focusRing.color`.

</details>

---

_Generated from `palettes/aurora.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
