# Nordic Frost

Cool Scandinavian / arctic register on the Flat engine. Pale glacier-blue
field, deep arctic-navy primary, frost-grey neutrals, pine-forest success,
brushed-copper warning, winter-berry danger.

`surface.base` is glacier ice (`#eef4f7`) — a near-white with a 2-3% cyan
tint that grounds the rest of the palette as cooler than paper. The
cooler-than-paper register is the load-bearing colour move; without the
cyan tint the palette would collapse onto Flat / Classic. `surface.raised`
lifts to barely-tinted near-white (`#fafcfd`); `sunken` drops to `#dde6ec`
for input wells.

`intent.primary.bg` is arctic navy (`#1f3a5c`) — deeper and slightly more
saturated than Scandinavian Royal's navy (`#1a2c4e`). The two palettes
sit beside each other in the modern-light set: Nordic Frost's field is
cooler (cyan-tinted), Scandi Royal's field is warmer (oak-cream).

- `intent.success` is pine forest (`#2d6a4f`) — the dark conifer-green
  used in chart-symbol legends for safe altitudes
- `intent.warning` is brushed copper (`#b87333`) — warmer than the navy
  + cyan field, so warnings pop against the cool ground
- `intent.danger` is winter berry (`#a23039`) — a lower-saturation rose-red
  that fits the cool register
- `intent.info` is icy mid-blue (`#2563a0`) — distinct from primary navy

`typography.family.display` and `family.ui` both route to Inter — the
palette commits to one grotesque sans throughout, no serif. The
arctic-modern register reads correctly only with clean geometric type;
serifs would warm the register too much.

`radius.*` widens slightly compared to Flat / Classic (`md = 8px`,
`lg = 14px`) — modern Nordic interface design favours softer curves
than mid-century or Swiss.

`elevation.*` shadow recipes tint toward the primary navy
(`rgba(31, 58, 92, 0.10)` at `low`, scaling up through `overlay`) so
cards lift as polished steel above pale ice, not as neutral panels.

**A11y:** `pass`. `content.primary` (`#0e2236`) on `surface.base`
(`#eef4f7`) ≈ 14.5:1 (AAA). `intent.primary` navy with `#fafcfd` inverse
≈ 11.7:1 (AAA). `intent.info` mid-blue with inverse ≈ 5.4:1 (AA body).
`intent.warning` brushed copper with inverse ≈ 4.6:1 (AA body, AAA large).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
elevation tint, and a single-family Inter typography stack.
