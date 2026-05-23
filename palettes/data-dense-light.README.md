# Data-dense light

Flat engine in a Tufte-influenced data-viz register. Bloomberg
Terminal's friendlier cousin: the same density stance, but with a cool
near-white field, ink-slate body, and desaturated semantic intents that
survive on a light surface without shouting. The aesthetic instruction
is Tufte's: non-data ink is wasted ink, so the chrome stays out of the
data's way.

`surface.base` is a near-white cool grey (`#fcfcfd`); `raised` is full
white. The two are close enough that a `Card` reads as "the field,
framed" rather than as "a chip lifted off the field". `content.primary`
is ink slate (`#0e131a`), almost black but tilted cool to match the
surface. `content.link` is a restrained indigo (`#2549a8`) — the same
hue used in `intent.primary` so the link colour and the primary action
share one identity. Every intent fill is one or two steps off vivid —
restrained indigo, deeper teal-blue `info`, forest `success`, umber
`warning`, brick `danger` — so categorical color in a chart (small-
multiples, bar grids, scatter dots) reads as data, not as decoration.

`radius.*` is hairline (`0` through `sm`, `2px` at `md`, `4px` at `lg`)
— the data wants rectangular cells, not rounded chips. `elevation.*` is
inset hairline rules at every slot except `overlay`, which adds a
single soft drop shadow so modals still read as separated from the
field. The Tufte register doesn't fake light sources; surfaces are
distinguished by ruled borders, the way a printed table is.

The type scale is the palette's sparkline-ready surface. `body` runs at
`0.875rem` (14 px), `label` at `0.75rem` (12 px), `caption` at
`0.6875rem` (11 px) — small enough that a row of small-multiples each
carries a legible tick label without the chart component needing
palette-specific overrides. The scale is sized so a sparkline 80 px
wide can still print 4–5 caption-sized tick labels under it; that's the
test the contract is meant to pass. `code` uses `IBM Plex Mono` which
ships tabular figures by default — currency columns and percentage
columns line up without per-column width hacks. `space.*` stays at the
Flat default; the *type scale* densifies, not the space scale, because
tight spacing with normal type sizes produces a cramped read while
small type with normal spacing produces the right register.

**A11y:** `pass`. `content.primary` (`#0e131a`) on `surface.base`
(`#fcfcfd`) ≈ 18.6:1 — AAA at every size, including the 11-px caption.
`content.secondary` `#3d4651` on base ≈ 9.5:1 (AAA), `content.muted`
`#6b7280` on base ≈ 4.7:1 (AA body). Every intent fill paired with the
`content: '#ffffff'` inverse hits AA at body or better — restrained
indigo ≈ 8.0:1, info ≈ 5.6:1, success ≈ 6.4:1, warning ≈ 6.0:1, danger
≈ 6.7:1. Focus ring is the same indigo at 2-px solid with a 1-px offset
— meets AA focus contrast against both `base` and `raised`.

**Most likely to fail: `Modal / Dialog` (all variants).** A modal's
visual containment depends on tonal contrast between the dimmed page
behind it and the panel above it; this palette publishes a `surface.base`
near pure white and a `surface.overlay` (the panel fill) at full white,
with a `surface.scrim` of `rgba(14, 19, 26, 0.42)`. On a near-white
page, the scrim drops the field to roughly the same lightness as the
overlay panel itself — the panel doesn't "lift", it merely sits in
front. The fix is not at the palette level — the high-key field is the
aesthetic. The fix is at the **component** level: pair the scrim with
a heavier `elevation.overlay` shadow stack (already in the contract),
and rely on the panel's hairline `border.default` for crisp edge
definition rather than expecting the scrim to do containment work.
Components that need an overlay to dominate the page in a Tufte
register need to do that through *edge*, not through *darken*.
