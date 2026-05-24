# Bullet Train / Day

> Shinkansen livery on the Flat engine — pale-sky-blue field, deep-navy primary, signal-yellow focus ring, asymmetric `radius.lg` for forward motion, long ease-out timing.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Bullet Train / Day is the second palette in the day-transit family. Pale sky-blue (`#eaf3fb`) surfaces against a white-carriage `raised`, deep navy (`#0a2540`) as the primary intent, signal yellow (`#ffd400`) as the focus ring — the N700 series livery in two tokens. The differentiators against Flat / Classic are two: `radius.lg` is asymmetric (`16px 16px 4px 4px` — rounded leading edge, square trailing edge) so every card / button / modal carries a directional pill that reads as forward motion, and `motion.easing.standard` is a long ease-out paired with `duration.base = 260ms`, mirroring a train decelerating into a platform. Reduced-motion collapses to `0ms` like every palette.

## Origin

The N700 / N700S Shinkansen series (JR Central / JR West, 2007–present) and its design language: aerodynamic curves, navy-blue nose cone, signal-yellow JR ticket-gate accents, German-industrial DIN typography (HG Sans, the JR display font, descends from DIN 1451). The palette translates the livery into Flat tokens — Bahnschrift / D-DIN as the showcase's closest available cousin to HG Sans.

## Signatures

- **Asymmetric `radius.lg = "16px 16px 4px 4px"`** — The load-bearing visual. `radius.lg` is the slot Card and Modal default to; setting it asymmetric means every raised surface in the showcase picks up a directional pill (rounded leading edge, square trailing edge) without per-component code. No other palette in the set uses an asymmetric radius.
- **Pale sky-blue `surface.base` + white `surface.raised`** — `surface.base` is `#eaf3fb` (pale Shinkansen-sky); `surface.raised` is `#ffffff`. The brighter raised reads as a train carriage against the sky — the inversion of the dark-cabin / bright-window relationship most transit interiors have.
- **Deep navy `intent.primary.bg` (`#0a2540`) + signal-yellow focus ring** — `intent.primary.bg` is the N700 nose-cone navy. `border.focus` and the focus-ring colour are `#ffd400` (signal yellow — the JR-East ticket-gate colour). The two-colour livery: navy as the action, yellow as the attention.
- **Long ease-out timing (`cubic-bezier(0.05, 0.7, 0.1, 1)` @ `260ms`)** — `motion.easing.standard` and `easing.out` both use the long ease-out curve. `duration.base` is `260ms` — 30% longer than Flat / Classic's `200ms` to give the curve room to read. Reduced-motion collapses durations to `0ms`, same as every palette.
- **Bahnschrift / D-DIN display family** — `typography.family.display` is `"Bahnschrift", "D-DIN", "DIN Next", "DIN 1451", ...` — the German-industrial sans that HG Sans (the actual JR display font) descends from.

## Anti-signatures

- A uniform `radius.lg` — the asymmetric leading-edge pill is the palette's defining shape
- A short, snappy ease (`120–180ms`) — the long ease-out is the motion signature
- A serif display family
- A second saturated chromatic intent competing with the navy + yellow pair

## Token evidence

| Path | Value | Note |
|---|---|---|
| `radius.lg` | `16px 16px 4px 4px` | `"16px 16px 4px 4px"` — asymmetric directional pill. The single most-load-bearing token in the palette. |
| `motion.easing.standard` | `cubic-bezier(0.05, 0.7, 0.1, 1)` | `cubic-bezier(0.05, 0.7, 0.1, 1)` — the long ease-out that mirrors deceleration. |
| `motion.duration.base` | `260ms` | `260ms` — 30% slower than Flat / Classic, to give the easing room to read. |
| `color.intent.primary.bg` | `#0a2540` | Deep navy `#0a2540` — the N700 nose-cone livery. |
| `color.border.focus` | `#ffd400` | Signal yellow `#ffd400` — the JR ticket-gate accent. |
| `typography.family.display` | `"Bahnschrift", "D-DIN", "DIN Next", "DIN 1451", "Roboto Condensed", "Helvetica Neue", sans-serif` | Bahnschrift / D-DIN — the German-industrial sans HG Sans descends from. |

## Often confused with

### vs [Material](./material.md)

Material uses default symmetric radius, a standard `cubic-bezier(0.4, 0, 0.2, 1)` ease, and a Roboto display. Bullet Train / Day uses asymmetric `radius.lg`, a much longer ease-out (decelerating-train feel), and Bahnschrift display — the asymmetric corner is the unmistakable signal.

### vs [Tokyo / Day](./tokyo-day.md)

Tokyo / Day is the broader city-signage register: white field, JR-East green as `intent.primary`, four-colour signage triad, condensed gothic display. Bullet Train / Day commits specifically to the Shinkansen livery: pale-sky field, deep-navy primary, signal-yellow focus, asymmetric radius, long ease-out.

### vs [Aero Glass](./aero-glass.md)

Aero Glass also uses a saturated-blue host but is a Glassmorphism palette: translucent panels, paired-rim inset highlights, Segoe UI. Bullet Train / Day is Flat: opaque surfaces, soft drop shadows, DIN display, asymmetric corners.

## Where it thrives

- Buttons — the asymmetric `radius.lg` reads as a directional pill, perfect for "next" / "submit" affordances
- Cards in a horizontal feed — the leading-edge curve points the reader along the scroll axis
- Modal panels — the directional shape signals "this opened from somewhere"
- Motion-aware UI (drawer slides, page transitions) — the long ease-out shines

## Where it degrades

- Symmetric layouts that need uniform corners (centred dialogs that feel weighted to one side because of the radius)
- Reduced-motion users — the long ease-out is the palette's signature, and they collapse to instant
- Right-to-left layouts — the leading-edge curve points the wrong way unless components flip the radius

## Recall aliases

`bullet train day`, `bullet train`, `shinkansen`, `shinkansen day`, `n700`, `jr shinkansen`

## Long-form notes

<details>
<summary>From <code>palettes/bullet-train-day.README.md</code></summary>

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

</details>

---

_Generated from `palettes/bullet-train-day.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
