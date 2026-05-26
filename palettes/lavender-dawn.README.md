# Lavender Dawn

Calm modern purple register on the Flat engine. Pale lavender-tinted
field, deep-plum primary, a warm-amber warning that pairs with the
cool-violet primary, modern humanist sans throughout. The meditation-app
/ journaling-tool / post-2020 "calm SaaS" aesthetic — low-saturation
purple ground, one deep tonal accent, generous radii.

The cool-violet sibling of Sage Studio in the modern-light register
set: both palettes share warm body type, generous radii, and one deep
tonal primary against a barely-tinted pale field. Sage Studio lands on
botanical-warm; Lavender Dawn lands on meditation-cool.

`surface.base` is pale lavender (`#f3eff7`) — a 3-4% violet tint over
near-white. `surface.raised` lifts to barely-tinted near-white
(`#fbf9fd`); `surface.sunken` drops to `#e6dff0` for input wells. The
violet tint is what reads as "calm app" rather than "blank screen."

`intent.primary.bg` is deep plum-violet (`#5c3d8a`) — a Princely purple
that clears ≈ 9:1 against `#fbf9fd` inverse content. The depth of the
plum is the load-bearing colour move: at lighter saturations the palette
collapses into Soft Pastel; at deeper saturations it reads as Mall-goth.

- `intent.warning` is warm amber (`#c97d2a`) — the warm/cool pairing
  (warm amber against cool plum) is the second load-bearing move
- `intent.success` is forest (`#4d7942`)
- `intent.danger` is signal red (`#a8261e`)
- `intent.info` is slate teal (`#2d6a8c`)

`typography.family.display` is Manrope (Inter / Söhne fallback) — a
modern humanist sans with softer terminals than Inter. The palette
commits to one family throughout, the way Linear Workspace commits to
Inter and Stone Modern commits to Söhne. The softer humanist feel of
Manrope is what differentiates this from Linear Workspace's Inter.

`radius.*` widens (`sm = 6px / md = 12px / lg = 18px`) — modern calm
apps favour soft, never sharp corners.

`elevation.*` shadow recipes tint toward plum (`rgba(44, 31, 58, 0.10)`
at `low`) so cards lift as pressed-paper above lavender mist.

`border.focus` reuses the deep plum primary — the focus ring carries
the brand colour rather than introducing a second saturated accent.

**A11y:** `pass`. `content.primary` (`#2c1f3a`) on `surface.base`
(`#f3eff7`) ≈ 13:1 (AAA). `intent.primary` plum-violet with `#fbf9fd`
inverse ≈ 9.1:1 (AAA). `intent.warning` warm amber with cream inverse
≈ 3.7:1 (AA UI, AA large). `intent.success` forest with cream inverse
≈ 5.6:1 (AA body). `intent.danger` signal red with cream inverse
≈ 6.8:1 (AAA large, AA body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, widened
`radius.*`, plum-tinted elevations, and a single-family Manrope
typography stack.
