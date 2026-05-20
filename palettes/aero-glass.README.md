# Aero Glass

Windows Vista/7 register on the Glassmorphism engine. The "wet" feel
comes entirely from `elevation.*`: every slot above `flat` pairs an
inset *white* highlight along the top edge with an inset dark line
along the bottom (`inset 0 -1px 0 rgba(8,23,51,0.18 → 0.30)`), which is
the rim cue Vista panels used to read as a curved gloss rather than a
flat translucent square. `surface.base` is a saturated Vista blue
(`#1e4d8b`), `surface.raised` is blue-tinted white
(`rgba(195,222,255,0.22)`) rather than neutral white, and `borderWidth`
plus `radius` (`sm 6 / md 10 / lg 16`) carry the period-correct
beveled-edge look. Typography is Segoe UI, with `display` weight at
`300` to nod to Aero's chrome titlebars.

**A11y:** `experimental`. The Glass-engine caveat applies — translucent
`raised` is whatever shows through — but Aero compounds it. The
saturated blue `surface.base` pulls every overlapping pixel toward
cyan, and `content.muted` at 60% alpha on a blue-tinted `raised`
clears AA only when the host is dark; on a busy or light host it falls
to ≈ 3.5:1. The wet inset rim also visually consumes border space, so
`color.border.subtle` reads weaker than its alpha suggests.

**Most likely to fail: `DatePicker`.** A calendar is a grid of small
numbers (`caption`-sized), many of which are `content.muted` for
non-current-month dates. The blue tint plus the bright top-edge gloss
on each calendar cell reduce effective contrast on those muted cells
well below AA, and the cell-by-cell gloss makes the *selected* day
hard to distinguish from a hover state. Components in this palette
that need cell-level state distinction should drive the difference
through `intent.primary.bg` rather than relying on `elevation` deltas
that the gloss already saturates.
