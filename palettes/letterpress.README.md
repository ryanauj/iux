# Letterpress

Impressed-into-paper register on the Flat engine. Deep ink-black body on
cream rag paper, raised surfaces sit on top of the page as fresh sheets,
but `intent.*.bg` fills are *debossed* — paired inset shadows that read
as metal type pushing ink into the rag-paper fibers.

`surface.base` is cream rag paper (`#f3ece0`); `surface.raised` is warmer
fresh paper (`#faf3e6`); `surface.sunken` is yellower cream (`#e6dccb`).
Opaque colours, no gradients — the Flat recipe with paper-warm hues
rather than neutral greys.

The five letterpress inks define the intent vocabulary:

- `intent.primary` is press ink-black (`#1a1814`) — the default, what a
  monochrome shop produces in one pass.
- `intent.danger` is press-room red (`#9a1f1f`) — the second ink the
  shop sets when a job calls for emphasis.
- `intent.success` is bottle green (`#1f5538`) — Christmas-cards
  letterpress green.
- `intent.warning` is mustard ochre (`#9c6a14`) — the historical
  alternative to red for moderate emphasis.
- `intent.info` is press ink-blue (`#1f3a6a`) — the third-ink colour
  for cards and certificates.

Every intent stays at letterpress saturation (no candy-bright digital
versions) so the surface reads as "printed, not displayed."

The load-bearing engine move is `elevation.low`: a paired
`inset 0 1px 2px rgba(26, 24, 20, 0.16)` (the ink pushed into the page)
plus a tight `0 1px 2px rgba(26, 24, 20, 0.10)` drop (the sheet's
thickness against the desk). `medium` and `high` deepen both halves
together so the deboss reads progressively. `overlay` drops the inset
(modal panels lift above the page rather than being pressed into it).

`typography.family.display` is Caslon (the historical letterpress face);
`family.body` is also Caslon for long-form serif body — the editorial
warmth comes from the serif body, not a sans-serif compromise. `family.ui`
is Inter for controls that need to read at form sizes.

`radius.*` collapses `sm` / `md` to `'0'`, `lg` to `'2px'` — letterpress
type was set in straight metal forme; rounded card corners would betray
the historical reference.

**A11y:** `pass`. `content.primary` (`#1a1814`) on `surface.base`
(`#f3ece0`) ≈ 14:1 (AAA). `intent.primary` press-ink on cream inverse
content ≈ 13:1 (AAA). `intent.warning` (`#9c6a14`) on cream inverse
≈ 4.8:1 (AA at every size). `intent.danger` (`#9a1f1f`) on cream
≈ 8.5:1 (AAA).

## Engine cost

Zero new tokens. The deboss is delivered entirely through `elevation.*`
— the same trick Neumorphism uses to combine inset + outset shadows in
a single slot, applied here at much lower alpha and tinted toward ink-black
rather than monochrome grey.
