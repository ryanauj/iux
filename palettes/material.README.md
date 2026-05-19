# Material

Paper-and-ink metaphor. Opaque stacked surfaces with a real elevation
ladder — `elevation.low` through `elevation.overlay` each hold a paired
ambient + key shadow in the classic Material recipe. Indigo (`#1976d2`)
is the single accent; intent backgrounds are saturated and carry white
`inverse` content. Roboto family across UI and display, light display
weight (300) per the spec; `label` is uppercased with extra tracking the
way Material captions used to be.

Motion uses Material's standard easing (`cubic-bezier(0.4, 0, 0.2, 1)`)
and a wider base/slow band (250ms / 400ms) so press affordances and
ripple-style transitions feel correct.

**A11y:** `pass`. Body text on `surface.base` is `rgba(0,0,0,0.87)` on
`#fafafa`, ≈ 14:1 — comfortably AAA. The lowest-contrast intent is
`warning` `#ef6c00` with white content, ≈ 4.8:1 (AA at large text and
graphical controls). `content.muted` at `rgba(0,0,0,0.38)` is for
disabled / placeholder only — the contract reserves that slot for
decorative use, which Material's spec also dictates.
