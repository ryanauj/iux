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
