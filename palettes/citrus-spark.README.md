# Citrus Spark

Bright, energetic modern brand register on the Flat engine. Bright off-
white field with a barely-yellow tint, citrus-yellow primary with **dark**
inverse content (the only intent that doesn't carry white on its
button), lime success, signal-red danger, modern geometric sans
throughout. The "energetic D2C brand site" register — bright but never
neon, saturated but never confrontational.

`surface.base` is bright off-white with a barely-yellow tint
(`#fdfcf6`); the 1% yellow undertone warms the field just enough to
read as "fresh squeezed." `surface.raised` is pure white (`#ffffff`);
`surface.sunken` drops to `#f4f1e6` for input wells.

`intent.primary.bg` is citrus yellow (`#f9c70d`) — the load-bearing
colour move and the source of the entire palette's identity. Yellow
buttons can't carry white text legibly, so `intent.primary.content` is
near-black (`#1a1d1a`) — **the inversion of the standard pattern**,
justified by the 12:1 dark-on-yellow contrast. This is the first
palette in the showcase whose primary intent uses dark inverse content
(Mall-goth uses dark text on dark surfaces but white on its primary).

- `intent.warning` is sun-warmed amber (`#c2671e`) — distinct from
  primary yellow so warning toasts don't read as branded chrome
- `intent.success` is lime green (`#4d8c3b`)
- `intent.danger` is signal red (`#d6391c`)
- `intent.info` is mid-blue (`#1f6db8`) — the one cool note on a warm
  palette, sitting against everything else for state contrast
- `content.link` is the same `#1f6db8` info-blue (yellow primary can't
  pull double duty as a link colour)

`border.focus` is the primary citrus yellow (`#f9c70d`) — the focus
ring carries the brand colour, the same way the primary button does.

`typography.family.display` is Space Grotesk (Inter / Söhne fallback)
at heavy weight — modern geometric sans with playful character that
fits the bright register. `family.body` and `family.ui` route to Inter
for clean prose. Display labels gain `tracking: 0.02em` for the slightly-
stretched label feel D2C brands favour.

`radius.*` widens to `sm = 6px / md = 12px / lg = 20px` — bright
friendly brands favour soft corners; sharp + bright reads as warning,
not energy.

`elevation.*` shadow recipes tint warm (`rgba(80, 60, 0, 0.10)` at
`low`) — the yellow-warm undertone of the brand carries into the
depth cue.

`motion.easing.spring` uses a stronger bounce (`cubic-bezier(0.34, 1.5,
0.64, 1)`) than Flat / Classic — the bright register reads correctly
with slightly playful motion.

**A11y:** `pass`. `content.primary` (`#1a1d1a`) on `surface.base`
(`#fdfcf6`) ≈ 16:1 (AAA). `intent.primary` citrus yellow with **dark
inverse** (`#1a1d1a`) ≈ 12.2:1 (AAA). `intent.warning` sun amber with
white inverse ≈ 4.5:1 (AA body). `intent.success` lime green with white
inverse ≈ 4.0:1 (AA UI). `intent.danger` signal red with white inverse
≈ 5.4:1 (AA body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, widened
`radius.*`, warm-tinted elevations, geometric-display + grotesque-body
typography, and (load-bearing) the **dark inverse content** on
`intent.primary` — the contract supports inverse-content per intent
exactly so palettes like this can route around yellow's contrast
limits without an engine change.
