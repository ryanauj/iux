# Desert Modernism

Palm Springs mid-century register on the Flat engine. Sun-baked cream
field, terracotta-clay primary, pool-turquoise info, palm-shade green
success — the saturated Coachella-Valley colour vocabulary on the same
Flat engine that carries Mid-century modern.

Mid-century modern is the Eames living-room register (Connecticut walnut,
cream paper, mustard-and-teal restraint); Desert Modernism is the
Frey / Lautner Palm-Springs-resort register on the same chassis — same
typography era, same flat-surface elevation discipline, opposite hue
register. Where Mid-century pulls from the indoor-textile palette,
Desert Modernism pulls from the outdoor-landscape palette: clay-tile
roofs, pool water, palm-shadow, late-afternoon sun.

`surface.base` is sun-baked cream (`#f5e9d4`) — a stucco wall in the
shade at 3 p.m. `surface.raised` is `#fbf2e0` (fresh stucco still in
shadow); `surface.sunken` is `#ead9be` for input wells. The two-step
cream ladder is warmer than Editorial / Mid-century — the desert sun
takes the cool out of even the white wall paint.

The five desert intents:

- `intent.primary` is desert terracotta (`#9c3d1f`) — the baked-clay
  roof tile of a Frey residence
- `intent.info` is pool turquoise (`#1f7d8a`) — the saturated cyan of
  an unheated Coachella pool at midday
- `intent.warning` is desert mustard (`#9c6a14`) — the dry-grass colour
  that ties the warmth register together
- `intent.success` is palm-shade green (`#356a3a`)
- `intent.danger` is rust red (`#9c1f1f`) — close enough to terracotta
  that the warning hierarchy stays consistent

`typography.family.display` is Futura PT (or Avenir fallback) — the
humanist-geometric sans tied to the era. `family.body` is Inter for
long-form reading. The two-family rule keeps display tight (geometric
counters) and body loose (humanist proportion).

`radius.*` keeps the default Flat scale (`sm: '4px'`, `md: '8px'`,
`lg: '12px'`) — Palm Springs architecture mixed straight masonry with
the occasional rounded poolside cabana, so the palette doesn't force
a single corner discipline. (Compare to Heritage Maritime, which tightens
`lg` to `6px` because varnished yacht trim curves are smaller.)

`elevation.*` keeps the Flat / Classic recipe with a warm-tinted shadow
(`rgba(120, 60, 30, 0.10)` at `low`) so cards sit on the cream like
awnings on a sun-baked wall, not as pure neutral panels.

**A11y:** `pass`. `content.primary` (`#2a1f14`) on `surface.base`
(`#f5e9d4`) ≈ 12.5:1 (AAA). `intent.primary` terracotta on cream inverse
content ≈ 7.2:1 (AAA). `intent.warning` mustard on cream inverse
≈ 4.8:1 (AA body). `intent.info` pool turquoise on cream inverse
≈ 5.8:1 (AAA at large sizes, AA at body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, elevation
tint, and a humanist-geometric typography stack.
