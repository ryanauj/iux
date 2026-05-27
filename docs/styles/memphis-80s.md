# 80s Memphis

> Memphis Group confetti vocabulary on the flat engine — cream cel-field with hot-pink / cyan / sun-yellow / tomato / neon-green primaries, every `border.*` forced to ink-black `#1c1c1c`, and `elevation.*` painting hard offset shadows as fake-3D depth.

**Engine:** `flat` · **A11y:** `experimental`

## Summary

80s Memphis is the flat-engine palette tuned for the Memphis Group's poster vocabulary. `surface.base` is cream `#fdf8ec`; `intent.*.bg` cycles through hot pink (`#ff3d7f`), cyan-blue (`#1e90ff`), sun yellow (`#ffd60a`), tomato red (`#ff4d3a`), and neon green (`#1bd96a`). Every `border.*` slot is forced to the same ink-black `#1c1c1c` so panels read as cutout shapes. `elevation.*` carries the hard offset shadow Memphis posters used as fake-3D depth (`3px / 5px / 7px` no blur). `motion.easing.standard` is the spring curve so hover transitions bounce the way the squiggle decoration implies. Focus ring is `#ffd60a` yellow — Memphis composition rotates among five primaries, so no one intent owns the indicator.

## Origin

The Memphis Group — Ettore Sottsass and the Milan design collective active 1981–1987. Their vocabulary of flat saturated primaries, hard geometric shapes, squiggle and confetti motifs, and terrazzo speckle ran through furniture, posters, plastic laminates, and (via MTV-era graphic design) the entire 1980s consumer aesthetic. This palette is the engine-level revival — the field, type, and shadow grammar; the engine paints the squiggles.

## Signatures

- **Five-primary intent palette (hot pink / cyan / yellow / tomato / neon green)** — `intent.primary.bg = #ff3d7f` hot pink, `info = #1e90ff` cyan-blue, `warning = #ffd60a` sun yellow, `danger = #ff4d3a` tomato red, `success = #1bd96a` neon green. Every intent is a saturated primary — Memphis composition rotates among them rather than ranking one as "the brand color."
- **Every `border.*` forced to ink-black `#1c1c1c`** — `border.subtle`, `border.default`, `border.strong` all resolve to the same `#1c1c1c`. Every `intent.*.border` is also `#1c1c1c`. Panels read as cutout shapes with a uniform ink edge — the same convention Cardstock and Cel-shaded use, applied to the flat engine.
- **Hard offset block shadows on `elevation.*` (`3px / 5px / 7px / 8px`, no blur)** — `elevation.low = 3px 3px 0 #1c1c1c`, scaling to `8px 8px 0 #1c1c1c, 0 24px 48px rgba(0,0,0,0.25)` at `overlay`. The single offset ink shape with zero blur is the Memphis-poster fake-3D depth — same hard-shadow grammar as Cel-shaded, but the engine is still `flat` and there is no `effect.outline.*` halo.
- **Yellow focus ring (`#ffd60a`) that ignores intent rotation** — `effect.focusRing.color = #ffd60a`. README rationale: Memphis composition rotates among five primaries, so no one intent owns the focus indicator. Yellow is the brightest primary in the rotation and the one most visible against the ink borders.
- **Heavy uppercase grotesque display (Archivo Black / Impact)** — `typography.family.display` is `"Archivo Black", "Impact", "Helvetica Neue", Helvetica, Arial, sans-serif`. `display` / `title` / `heading` / `subheading` / `label` are all `textTransform: uppercase`. Display weight is 800 — the headline weight Memphis poster sets relied on.
- **Spring `motion.easing.standard` — every transition bounces** — `motion.easing.standard = cubic-bezier(0.34, 1.56, 0.64, 1)`. The standard slot — the one most components reach for — is the spring curve, so every hover and state transition bounces the way the squiggle decoration implies. Every other flat-engine palette uses a non-overshooting standard easing.

## Anti-signatures

- A single dark accent palette — defeats the five-primary intent rotation
- Soft gaussian drop shadows — Memphis uses hard offset block shadows with zero blur
- Neutral grey or transparent borders — every border is forced to ink `#1c1c1c`
- A serif display like Cinzel or Bodoni — Memphis wants heavy uppercase grotesque
- A non-spring `motion.easing.standard` — the bounce is part of the look

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.intent.primary.bg` | `#ff3d7f` | `#ff3d7f` hot pink — the Memphis primary, one of five rotating saturated intents. |
| `color.intent.warning.bg` | `#ffd60a` | `#ffd60a` sun yellow — also the focus ring color. |
| `color.border.default` | `#1c1c1c` | `#1c1c1c` — every border slot is forced to the same ink for the cutout-shape look. |
| `elevation.low.boxShadow` | `3px 3px 0 #1c1c1c` | `3px 3px 0 #1c1c1c` — hard ink offset, zero blur, scaling through the elevation ladder. |
| `effect.focusRing.color` | `#ffd60a` | `#ffd60a` yellow — ignores intent rotation so no single intent owns the indicator. |
| `typography.family.display` | `"Archivo Black", "Impact", "Helvetica Neue", Helvetica, Arial, sans-serif` | Archivo Black / Impact stack — the heavy uppercase grotesque headline weight. |
| `motion.easing.standard` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `cubic-bezier(0.34, 1.56, 0.64, 1)` — spring curve in the standard slot; hover transitions bounce. |

## Often confused with

### vs [Cel-shaded (Shonen)](./cel-shaded-shonen.md)

Both paint hard ink-black offset shadows and force every border to ink — the visual grammar overlaps. The difference is the engine: Cel-shaded uses `effect.outline.*` and `effect.shadowStyle = hard` and runs the shonen orange/blue/cream triad. Memphis-80s is on the `flat` engine, rotates among five saturated primaries, and the decoration (squiggle / confetti / terrazzo) is the engine's job to draw.

### vs [Bauhaus](./bauhaus.md)

Bauhaus also runs saturated primaries on a flat grid, but its palette is the classic three-primary set (red, yellow, blue) and the geometric vocabulary is constructive: circle, square, triangle, hairline rule. Memphis-80s rotates among five primaries plus pink and neon green, uses hard offset shadows, and the decoration is squiggles / confetti / terrazzo rather than Bauhaus's rigorous geometry.

### vs [Risograph](./risograph.md)

Risograph shares the saturated-primary feel but the load-bearing tokens are misregistration offsets, paper-grain texture, and limited-ink overlays — a print process simulation on a paper field. Memphis-80s has no grain, no misregistration; every intent is solid flat fill with a hard ink offset shadow.

### vs [Vaporwave](./vaporwave.md)

Vaporwave shares the 80s saturated palette but commits to gradients, chrome, and pastel pink/teal with neon glow. Memphis-80s stays flat — no gradient, no glow, no chrome — and every intent is one solid color bounded by an ink border with a hard offset shadow.

## Where it thrives

- Cards, Modals, Drawers — hard offset shadows on ink-bordered panels read as cutout collage layers
- Buttons / Toggles — spring easing on hover gives the squiggle-implied bounce
- Display headlines — Archivo Black uppercased at 3.25rem is the Memphis poster headline
- Bento layouts — each cell becomes a cutout shape with its own ink boundary and offset shadow

## Where it degrades

- Toast — `caption` timestamp on the saturated-yellow / saturated-green fills vanishes (README flags this as most likely to fail)
- Small text on `intent.danger` tomato — cream content on `#ff4d3a` lands ~3.3:1, fails AA at body size
- Forms relying on focus visibility on `warning`-yellow buttons — yellow ring on yellow fill reads as no focus
- Long muted-text paragraphs — simultaneous-contrast shimmer on Memphis primaries makes small text feel unstable

## Recall aliases

`memphis`, `80s memphis`, `memphis 80s`, `memphis group`, `sottsass`, `milano memphis`, `memphis-milano`

## Long-form notes

<details>
<summary>From <code>palettes/memphis-80s.README.md</code></summary>

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

</details>

---

_Generated from `palettes/memphis-80s.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
