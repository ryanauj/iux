# Bullet Train / Day

Shinkansen livery on the Flat engine. Pale-sky-blue field, deep-navy
`intent.primary`, signal-yellow focus ring — the N700 series livery in
two tokens. The differentiators against Flat / Classic are two:
`radius.lg` is asymmetric (`16px 16px 4px 4px` — rounded leading edge,
square trailing edge) so every card / button / modal carries a
directional pill that reads as forward motion, and `motion.easing.standard`
is a long ease-out paired with a 30%-longer `duration.base`, mirroring
a train decelerating into a platform.

`surface.base` is pale sky `#eaf3fb`; `surface.raised` is `#ffffff`.
The brighter raised surface reads like a train carriage against the
sky — the inversion of the dark-cabin / bright-window relationship
most transit interiors have. `surface.sunken` drops to `#dde9f4` for
recessed input wells.

`intent.primary.bg` is deep navy (`#0a2540`) — the N700 nose-cone
colour. `border.focus` and the focus ring colour are signal yellow
(`#ffd400`) at 3 px width — the JR-East ticket-gate accent translated
into the focus slot. `intent.info.bg` uses a slightly lighter
`#0a4c8c` so info badges don't collide with primary buttons when
stacked. `intent.warning.bg` keeps the same signal yellow as the focus
ring; the two slots intentionally share the colour because the
N700 livery uses yellow for both attention and caution.

`radius.lg` is the single most-load-bearing token in the palette:
`"16px 16px 4px 4px"` — `border-radius` top-left, top-right,
bottom-right, bottom-left. Card and Modal default to `radius.lg`;
Button defaults to `radius.md` (`8px`). Setting `radius.lg` asymmetric
means every raised surface picks up the directional pill without
per-component code. No other palette in the showcase ships an
asymmetric radius value, so the visual is unmistakable.

`motion.easing.standard` and `motion.easing.out` are both
`cubic-bezier(0.05, 0.7, 0.1, 1)` — a long ease-out that holds
momentum and then settles, the curve a train uses as it decelerates
into a platform. `motion.duration.base` is `260ms` — 30% longer than
Flat / Classic's `200ms` — to give the curve room to read. Reduced-
motion still collapses durations to instant, same as every palette.

`typography.family.display` is Bahnschrift / D-DIN / DIN Next — the
German-industrial sans the Shinkansen display font HG Sans descends
from. The showcase doesn't ship HG Sans (it's proprietary to JR
Central), so DIN serves as the closest open / system-available
cousin. `family.ui` is Inter.

`elevation.*` uses Flat / Classic's recipe with a cooler shadow tint
(`rgba(10, 37, 64, 0.08)` at `low`), so cards lift visibly against the
pale-sky field.

**A11y:** `pass`. `content.primary` `#0a2540` on `surface.base`
`#eaf3fb` ≈ 13:1 — AAA. On `surface.raised` `#ffffff` ≈ 16:1 — AAA.
`intent.primary` navy + white inverse ≈ 14.5:1 (AAA). `intent.warning`
signal yellow `#ffd400` + dark-navy content ≈ 13.4:1 (AAA). `intent.info`
`#0a4c8c` + white inverse ≈ 8.6:1 (AAA). `intent.danger` `#c8102e` +
white inverse ≈ 6:1 (AA body, AAA large). `border.focus` signal yellow
on pale-sky `surface.base` ≈ 1.7:1 — below the 3:1 focus-contrast
threshold against the pale field, which is why the focus ring is `3 px`
wide rather than the standard `2 px`: the heavier stroke gives the
indication perceptual weight even where the colour contrast is at the
edge. On `surface.raised` (white) the focus ring contrast is the same
~1.7:1, so components that focus on `raised` (most of them) rely on the
stroke width for visibility. This is the documented trade-off — the
period-correct signal yellow over the period-correct pale-sky field
sits at this contrast, and the heavier stroke is the palette's
mitigation.
