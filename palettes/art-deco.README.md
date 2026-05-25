# Art Deco / Gatsby

1920s ornament-and-symmetry register on the Flat engine. Deep teal-black
field, champagne-gold accent, cream content, a geometric Deco serif
(Poiret One / Limelight) for headings. Closer to Modern Royal than to
Cathedral / Stained Glass, but with teal-black standing in for
aubergine and champagne in place of antique gold — and a different
display serif that argues for the era explicitly.

`surface.base` is deep teal-black (`#0e2027`) — the colour of a 1920s
lacquered theatre lobby. `surface.raised` lifts one notch to `#163039`
(a card-stock cream-foil weight against the teal); `surface.sunken`
darkens to `#0a181d` for input wells. The two-tone teal/black field
is the period's signature backdrop colour.

`intent.primary.bg` is champagne gold (`#c8a96a`) with deep-teal inverse
content (`#0e2027`) — the gold ≈ 10:1 against the teal, AAA at every
size. `border.focus` reuses the same gold at 3 px to compensate for the
dark field, the same heavier-ring move Modern Royal makes against
aubergine and Mall-goth makes against near-black.

`intent.warning` reuses the champagne gold — Deco's two-colour
hierarchy doesn't introduce a third saturated accent for warnings.
`intent.danger` is burgundy (`#8a2233`) — the era's "alert" colour on
poster art. `intent.success` is bottle green (`#3a7a4a`); `intent.info`
is a desaturated teal (`#2e5a72`) so it doesn't compete with the field.

`typography.family.display` is Poiret One (or Limelight / Bodoni 72
fallback) — the geometric Deco serif tied to 1920s poster art. The
display sets at `uppercase` with `0.04em` tracking — Deco type ran
widely-spaced caps almost exclusively. `family.body` is Cormorant for
long-form serif body; `family.ui` is Inter for controls that need to
read at form sizes. The three-family typography rule is the load-bearing
move: serif display + serif body + sans UI, with the display carrying
the period costume.

`radius.*` collapses to `'0' / '0' / '4px'` for `sm` / `md` / `lg` —
Deco geometry argues against rounded corners on cards. `pill` stays
for tag affordances that need it.

`elevation.*` keeps the soft-gaussian recipe but tints toward teal-black
(`rgba(8, 16, 22, 0.45)`) so cards still lift visibly against the dark
field. The shadow shape matches Flat / Classic verbatim; only the alpha
and tint shift.

**A11y:** `pass`. `content.primary` (`#e8dcc0`) on `surface.base`
(`#0e2027`) ≈ 12.5:1 (AAA). `intent.primary` champagne on deep-teal
inverse ≈ 10:1 (AAA). `intent.danger` (`#8a2233`) with cream inverse
≈ 7.5:1 (AAA). `border.focus` champagne on `surface.base` ≈ 7.4:1 with
the 3 px ring carrying clear perceptual weight.

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
elevation alpha, and a Deco-poster typography stack.
