# Cyberpunk Neon-Noir

Rainy-window register on the Glassmorphism engine. Near-black
`surface.base` (`#08070d`), magenta-cast translucent `raised`
(`rgba(244,114,182,0.06)`), and a dual-accent border palette: magenta
on `subtle` / `default` / `focus`, cyan on `strong`, so the panel
edges read as two competing neon signs rather than one. `elevation.*`
encodes the same duality as paired glows — every slot above `flat`
stacks a magenta outer halo with a smaller cyan halo behind it.
`effect.focusRing.style = 'glow'` rather than `solid` — the focus
indicator is meant to render as a `box-shadow`, not an outline.
Typography is geometric uppercase sans (Rajdhani / Eurostile) for
display and an uppercase mono for `code`; both are the same choices
that make Tron readable as HUD, retuned to the neon-noir spectrum.

**A11y:** `experimental`. The Glass-engine caveat applies and is
sharper here than usual: `surface.raised` at 6% magenta on a near-
black base produces a near-invisible panel, so any contrast guarantee
comes from `content.primary` on `surface.base` directly (`#fce7f3`
≈ 16:1 — clears AA). `content.muted` at 46% alpha and the
`intent.*.content` colors on their own 18%-alpha fills both sit
around 4.0–4.5:1 — at the WCAG AA boundary, not above it.

**Most likely to fail: `PropertyInspector`.** The component pairs
this palette's two riskiest token choices: a dense block of `caption`
(small) `content.muted` (low-alpha) labels, against the magenta-tinted
`sunken` surface used for inset rows. The label color was tuned to
clear AA against `surface.base` directly, not against a 3% magenta
wash, and the magenta haze pulls the perceived hue of every label
closer to its background. Components doing dense label/value pairs in
this palette should promote labels from `muted` to `secondary`, or
render label-bearing rows on `surface.base` rather than `sunken`.
