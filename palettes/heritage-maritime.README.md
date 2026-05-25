# Heritage Maritime

Nautical / chandlery register on the Flat engine. Bone-white field,
deep-navy primary, brass-fitting warning, signal-red danger, a slab
serif display for ship-builder name plates. The register sailing-
yachts and harbour-front insurance offices have used unchanged since
the 1890s.

`surface.base` is bone white (`#f4ecd9`) — old chart paper or
painted-wood cabin trim; `surface.raised` is `#fbf4e2` (a fresh bulkhead
panel); `surface.sunken` drops to `#e6dcc2` for input wells. Cooler
than Letterpress (which leans toward true cream), warmer than Newspaper
(which leans toward newsprint grey).

`intent.primary.bg` is deep navy (`#0d2e4a`) — Royal Navy hull paint,
the one near-black on the palette. The two-tone vocabulary (navy +
bone) is the load-bearing colour move; every other intent picks up a
period-correct secondary:

- `intent.warning` is polished brass (`#a07634`) — the colour of a
  binnacle fitting in low sun
- `intent.danger` is signal red (`#a8261e`) — halyard-pennant red, the
  "halt" colour
- `intent.info` reuses navy because nautical signalling treats navy as
  the default register
- `intent.success` is forest green (`#2e6a3a`) — the chart-symbol green
  for a safe sounding

`border.subtle` and `border.default` are navy at low alpha (12 / 22%)
— the "pinstripe trim" border colour, picking up the primary without
adding a second saturated accent to the field.

`typography.family.display` is Roboto Slab (Adelle / Rockwell fallback)
— the brass-plaque slab serif used on ship-builder name plates and
insurance certificates. `family.body` is Inter for long-form text;
`family.ui` is Inter for controls. The display serif sets at
`weight: 700` with `0.005em` tracking — slab serifs at display sizes
look strongest at moderate tracking.

`radius.*` collapses `sm` / `md` / `lg` to `'2px' / '4px' / '6px'` —
the curve of a yacht's varnished trim is real but small, smaller than
Desert Modernism's `12px` cabana radius.

`elevation.*` keeps the Flat / Classic recipe with a cool-tinted shadow
(`rgba(13, 46, 74, 0.10)` at `low`) so cards lift as polished varnish
above painted-canvas decks. The shadow tint pulls toward the primary
navy.

`border.focus` is signal red — the focus ring reads as a halyard
pennant catching attention, a deliberate departure from the navy +
brass two-tone primary scheme.

**A11y:** `pass`. `content.primary` (`#1a2530`) on `surface.base`
(`#f4ecd9`) ≈ 13:1 (AAA). `intent.primary` navy on bone inverse content
≈ 13:1 (AAA). `intent.warning` brass on bone inverse ≈ 4.6:1 (AA body).
`intent.danger` signal red on bone inverse ≈ 6.8:1 (AAA at large sizes,
AA at body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
elevation tint, and a slab-serif display typography stack.
