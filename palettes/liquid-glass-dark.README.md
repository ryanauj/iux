# Liquid Glass (Dark)

Same Apple WWDC25 register as `liquid-glass-light` — softer
`backdropBlur` (`4 → 20`), Apple's pillier radii (`sm 10 → lg 22`),
refraction-tinted borders — inverted to a near-black `surface.base`
(`#0f1218`). `raised` drops to `rgba(255,255,255,0.06)` because adding
more white to a dark host stops reading as glass and starts reading as
solid grey. `color.border.default` uses a sky-cyan tint
(`rgba(125,211,252,0.20)`) so panel edges show the refractive hue cue
that the lower alpha would otherwise hide.

**A11y:** `experimental`. `content.primary` (`#f8fafc`) on the darkest
likely composite reaches ≈ 16:1, but the whole point of dark glass is
that surfaces are *barely there* — `border.subtle` at 8% alpha is
intentionally near-invisible, and `content.muted` at 48% over a 6%-white
panel on `#0f1218` lands around 4.4:1, below AA for non-large body
text. The trade is documented, not a bug.

**Most likely to fail: `VirtualList`.** Row separators consume
`color.border.subtle` (`rgba(255,255,255,0.08)`), which on the dark
glass `raised` panel renders at roughly 1% effective contrast against
its own surface — visually absent. A long list collapses into an
undifferentiated block. Components doing dense row work in this palette
should reach for `border.default` (the cyan-tinted hairline) instead of
`subtle`, or use a `space.*` gap to separate rows structurally.
