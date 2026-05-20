# 80s Memphis

Flat engine tuned for the Memphis Group's confetti vocabulary. Cream
`surface.base` (`#fdf8ec`) with primary-color intents — hot pink, sun
yellow, cyan-blue, tomato red, neon green — and every `border.*` slot
forced to the same ink-black (`#1c1c1c`) so panels read as cutout
shapes rather than soft cards. `elevation.*` carries the hard offset
shadow Memphis posters used as fake-3D depth (`3px / 5px / 7px` no
blur), so `low → high` reads as a discrete jump in collage layer
rather than a continuous lift. `motion.easing.standard` is the spring
curve so hover transitions bounce the way the squiggle decoration
implies. Display family is Archivo Black / Impact — heavy uppercase
grotesque, the headline weight the period poster set relied on.

`focusRing.color` deliberately lands on `warning` yellow rather than
`primary` pink — Memphis composition rotates among five primaries, so
no one intent owns the focus indicator. The squiggle / confetti
decoration the aesthetic advertises is the *engine*'s job to draw; the
palette just paints the field underneath.

**A11y:** `experimental`. Body text on `surface.base` (`#1c1c1c` on
`#fdf8ec`) sits at ≈ 17:1 — AAA at default. Intent fills are mostly
safe in the AA range when paired with dark `inverse` content
(`success` green + dark content ≈ 6.7:1; `warning` yellow + dark
content ≈ 13:1). The hazard is the inverse: `intent.danger` tomato
(`#ff4d3a`) with cream `inverse` content sits at ≈ 3.3:1 — fails AA at
body size, only passes at large. Bright `success` and `warning`
backgrounds also defeat focus-on-fill — yellow focus ring on a yellow
button reads as no focus indication at all.

**Most likely to fail: `Toast`.** Toasts pair an intent fill with a
`caption`-sized timestamp and a `body`-sized message — and on the
warning-yellow / success-green fills, both the timestamp and the
yellow focus ring vanish. Memphis's deliberately vibrating color
combinations also produce simultaneous-contrast shimmer on small text
that the static contrast numbers don't predict. Components that need
small text on a saturated intent surface should drop the field
saturation (use `intent.*.bg` for borders only, not full fills), or
swap to a `neutral` panel with an intent-colored border.
