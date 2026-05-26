# Stone Modern

Warm-minimalist modern register on the Flat engine. Warm-stone field,
near-black charcoal-brown primary, single saturated rust accent for
warning, tight modern grotesque sans throughout. The Aesop / Muji /
modern-retail aesthetic — the "premium minimalist brand site" register
distilled to the colour vocabulary the field actually uses.

The warm-neutral sibling of Dieter Rams: Rams uses cool warm-grey with
Braun orange; Stone Modern uses warm sandstone with rust and routes its
primary to the charcoal-brown text colour itself rather than to a
saturated accent. The two palettes sit beside each other as the
modernist-retail vs. industrial-design poles of the same minimalist
register.

`surface.base` is warm stone (`#f0ece6`) — slightly cooler at the high
end of the lightness scale than Heritage Maritime's bone (`#f4ecd9`),
slightly warmer than Dieter Rams's warm-grey (`#e9e8e5`). `surface.raised`
lifts to bone (`#faf8f3`); `surface.sunken` drops to `#e0dad0` for
input wells.

`intent.primary.bg` is charcoal-brown (`#2c2620`) — the same near-black
used for body text, promoted to the button slab. The palette has only
one chromatic accent: rust on `warning`. This is the load-bearing
colour move and the source of the "premium minimalist" feel — a single
saturated note in a sea of neutrals.

- `intent.warning` is rust orange (`#c2541f`) — kiln-fired clay, the
  one saturated accent
- `intent.danger` is terracotta-red (`#a8261e`) — sits in the same warm
  hue family as warning so the two intents read as "intentional" rather
  than as a clash
- `intent.success` is forest (`#4d7942`)
- `intent.info` is slate (`#2d4d6a`)

`typography.family.display` is Söhne (Inter fallback) at heavy weight
— modern minimalist retail favours strong grotesque caps for display
and `family.body` is the same Söhne for prose. The display label uses
uppercase tracking (`0.08em`) for the small-caps "section" feel modern
retail sites use on category headers.

`space.*` widens at the high end (`6: '36px'`, `7: '52px'`, `8: '72px'`)
— the modern-retail register depends on generous whitespace.

`radius.*` collapses to `sm = 2px / md = 4px / lg = 8px` — Stone Modern
favours near-square corners. The contrast with Sage Studio's
(`sm = 4px / md = 10px / lg = 16px`) is one of the load-bearing
distinctions between the two palettes in the same register set.

`elevation.low` is a 1 px hairline; `medium` and `high` add very low
alpha drop shadows tinted toward the charcoal-brown
(`rgba(44, 38, 32, 0.06 → 0.16)`).

`border.focus` is rust (`#c2541f`) — the single saturated accent doubles
as the focus indicator.

**A11y:** `pass`. `content.primary` (`#2c2620`) on `surface.base`
(`#f0ece6`) ≈ 14:1 (AAA). `intent.primary` charcoal-brown with bone
inverse ≈ 14:1 (AAA). `intent.warning` rust with bone inverse ≈ 4.7:1
(AA body). `intent.danger` terracotta-red with bone inverse ≈ 7.0:1
(AAA). `intent.success` forest with bone inverse ≈ 5.6:1 (AA body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
`space.*` widening, hairline-ring elevations, and a single-family Söhne
typography stack with uppercase-tracked labels.
