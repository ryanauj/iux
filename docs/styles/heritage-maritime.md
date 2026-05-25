# Heritage Maritime

> Nautical / chandlery register — bone-white field, deep-navy `intent.primary`, polished-brass `intent.warning`, signal-red `intent.danger` + focus ring, Roboto Slab brass-plaque display.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Heritage Maritime is the chandlery / yacht-trim register on the Flat engine. Bone white (`#f4ecd9`) fills `surface.base`; deep navy (`#0d2e4a`) carries `intent.primary` (Royal Navy hull paint, the one near-black on the palette); polished brass (`#a07634`) carries `warning`; signal red (`#a8261e`) carries `danger` and the focus ring. Roboto Slab on display reads as a ship-builder name plate; Inter on body keeps long-form text legible. The register sailing-yachts and harbour-front insurance offices have used unchanged since the 1890s.

## Origin

The Anglo-American yacht / chandlery / harbour-insurance visual tradition, c.1890–present — Lloyd's of London certificates, painted-wood yacht cabin trim, polished-brass binnacle fittings, halyard-pennant signal flags. The colour vocabulary maps directly: Royal Navy navy hull paint, polished-brass fittings, painted-canvas deck cream, signal-red halt pennants. Slab serif display (Roboto Slab, Adelle, Rockwell) is the brass-plaque lettering used on ship-builder name plates and certificate borders.

## Signatures

- **Deep-navy `intent.primary` + bone-white field** — `surface.base` `#f4ecd9` (chart paper / painted-wood cabin trim cream); `intent.primary.bg` `#0d2e4a` (Royal Navy hull paint). The two-tone navy + bone is the load-bearing colour move; the palette's identity sits in that pairing the way Mid-century-modern's identity sits in cream + walnut.
- **Polished-brass `warning` + signal-red `danger`** — `intent.warning.bg` `#a07634` (binnacle-fitting brass in low sun); `intent.danger.bg` `#a8261e` (halyard-pennant red). The second-tier intents are pulled from period-correct hardware and signalling, not from a generic Material warning yellow / Material danger red.
- **Signal-red `border.focus`** — `border.focus` is `#a8261e` — the focus ring reads as a halyard pennant catching attention, a deliberate departure from the navy + brass two-tone primary scheme. This is the only palette in the set whose focus colour is not also the primary intent.
- **Roboto Slab brass-plaque display** — `typography.family.display` is Roboto Slab (Adelle / Rockwell fallback) — the brass-plaque slab serif used on ship-builder name plates and insurance certificates. Display sets at `weight: 700` with `0.005em` tracking — slab serifs at display sizes read strongest at moderate tracking.

## Anti-signatures

- A non-navy `intent.primary` — the Royal Navy hull paint is structural
- Saturated digital intents (Material-style brand reds / yellows break the chandlery register)
- A `border.focus` that reuses the primary navy — signal red on focus is the differentiator
- A geometric sans `display` family — the slab serif is the brass-plaque cue

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#f4ecd9` | Bone white `#f4ecd9` — chart-paper / cabin-trim colour. |
| `color.intent.primary.bg` | `#0d2e4a` | Royal Navy navy `#0d2e4a` — period-correct hull paint. |
| `color.intent.warning.bg` | `#a07634` | Polished brass `#a07634` — binnacle-fitting colour in low sun. |
| `color.intent.danger.bg` | `#a8261e` | Signal red `#a8261e` — halyard-pennant halt colour. |
| `color.border.focus` | `#a8261e` | `#a8261e` — signal red, distinct from the primary navy. |
| `typography.family.display` | `"Roboto Slab", "Adelle", "Rockwell", "Georgia", serif` | Roboto Slab — brass-plaque slab serif. |

## Often confused with

### vs [Desert Modernism](./desert-modernism.md)

Both palettes use a cream field with multiple period-correct intents on the Flat engine. Desert Modernism: warmer cream + terracotta + pool turquoise + palm green (Palm Springs register). Heritage Maritime: cooler bone-white + navy + brass + signal red (Atlantic-coast register). Opposite warmth tilt on the surface, opposite intent vocabulary on the page.

### vs [Newspaper / Broadsheet](./newspaper.md)

Newspaper is the broadsheet-density register: condensed Crimson body, stop-the-presses red accent, narrow-column rhythm. Heritage Maritime is the chandlery register: standard Inter body, brass + navy + signal-red accents, generous spacing. Both use serif display but Heritage uses slab serif (Roboto Slab — brass plaque) where Newspaper uses transitional serif (Crimson — body type at display size).

### vs [Modern Royal](./modern-royal.md)

Both are conservative registers with traditional-typography display. Modern Royal: dark aubergine field, antique gold accent, Cormorant display (regal). Heritage Maritime: bone-white field, navy primary + brass warning, Roboto Slab display (nautical). Opposite tonal register; the typography vocabularies are both serif but the slab Roboto sits differently from Cormorant's garamond-era counters.

## Where it thrives

- Maritime insurance, yacht-brokerage, harbour-management interfaces
- Heritage-luxury hospitality and travel brands
- Long-form Inter body with Roboto Slab display headings on `surface.raised`

## Where it degrades

- Modern-startup contexts where the heritage vocabulary reads as off-brand
- Photographic content unrelated to maritime themes (the navy + brass palette is genre-specific)

## Recall aliases

`heritage maritime`, `maritime`, `nautical`, `chandlery`, `yacht`, `navy brass`

## Long-form notes

<details>
<summary>From <code>palettes/heritage-maritime.README.md</code></summary>

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

</details>

---

_Generated from `palettes/heritage-maritime.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
