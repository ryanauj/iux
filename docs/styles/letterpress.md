# Letterpress

> Metal type pressed into rag paper — debossed `intent.*.bg` fills via paired inset shadows, five letterpress inks as the intent vocabulary, Caslon serif throughout.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Letterpress is the "impression into paper" register on the Flat engine. Cream rag paper fills `surface.base`; raised surfaces sit above the page as fresh sheets, but `intent.*.bg` fills are *debossed* — paired inset + tight drop shadows in `elevation.*` that read as metal type pushing ink into the rag-paper fibers. The five intents pick up the five historical letterpress inks: press-ink black (primary), press-room red (danger), bottle green (success), mustard ochre (warning), and ink-blue (info). Caslon carries display + body so the editorial warmth lives in the serif body.

## Origin

The American letterpress shop, c.1850–1950 — Vandercook proof presses and Heidelberg platens setting metal or wood type into cream rag paper. The "debossed" feel is the actual physical impression of type into damp paper at print pressure. Caslon (William Caslon I, 1722) is the historical workhorse face every shop owned in a chase. The colour vocabulary maps directly to the ink colours a one- to two-pass shop produced.

## Signatures

- **Debossed `intent.*.bg` fills via paired inset + drop shadows** — `elevation.low` is `inset 0 1px 2px rgba(26, 24, 20, 0.16), 0 1px 2px rgba(26, 24, 20, 0.10)`. The inset reads as ink pushed into the page; the drop is the sheet's thickness against the desk. `medium` and `high` deepen both halves together so the deboss reads progressively. Inverts the Neumorphism trick (which combines inset + outset for a single soft bump) toward "pressed into paper" instead.
- **Five letterpress inks as the intent vocabulary** — `intent.primary` is press ink-black (`#1a1814`), `danger` is press-room red (`#9a1f1f`), `success` is bottle green (`#1f5538`), `warning` is mustard ochre (`#9c6a14`), `info` is ink-blue (`#1f3a6a`). Every intent stays at letterpress saturation — no candy-bright digital versions.
- **Caslon serif on `display` AND `body`** — `typography.family.display` and the `body` role both route to Caslon. The single-family editorial warmth contrasts the multi-family typography moves in Modern Royal and Art Deco — Letterpress is one historical face throughout, the way a real shop in 1880 set every page from one cabinet.
- **Zero-radius card corners** — `radius.sm` and `radius.md` collapse to `'0'`; `lg` is `'2px'`. Letterpress type was set in straight metal forme; rounded card corners would betray the historical reference.

## Anti-signatures

- Outset-only `elevation.*` (the inset is the debossed-ink cue)
- Pure-white `surface.base` (cream rag paper is the field colour)
- A sans-serif `family.body` — that breaks the single-face editorial discipline
- Saturated digital intents (press-room red ≠ `#ff0000`)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `elevation.low.boxShadow` | `inset 0 1px 2px rgba(26, 24, 20, 0.16), 0 1px 2px rgba(26, 24, 20, 0.10)` | `inset 0 1px 2px rgba(26, 24, 20, 0.16), 0 1px 2px rgba(26, 24, 20, 0.10)` — paired inset + drop reading as deboss. |
| `color.intent.primary.bg` | `#1a1814` | Press ink-black `#1a1814` — the default monochrome ink colour. |
| `color.intent.danger.bg` | `#9a1f1f` | Press-room red `#9a1f1f` — the second-pass alternate ink colour. |
| `typography.family.display` | `"Caslon", "Adobe Caslon Pro", "Libre Caslon Text", "Bodoni 72", "Didot", "Georgia", serif` | Caslon — the historical letterpress workhorse face. |
| `radius.sm` | `0` | `'0'` — letterpress type was set in straight metal forme. |

## Often confused with

### vs [Editorial](./editorial.md)

Editorial is the warm-paper magazine register: serif display + sans body, restrained terracotta accent, soft drop shadows. Letterpress is the print-shop register: serif throughout (display + body both Caslon), five-ink intent vocabulary, debossed `intent.*.bg` fills. Same Flat engine, opposite elevation philosophy.

### vs [Newspaper / Broadsheet](./newspaper.md)

Newspaper is the broadsheet-density register: narrow-column serif, stop-the-presses red accent, classified-ad density. Letterpress is the print-shop register: lower density, debossed fills, five-ink intent vocabulary. Both serif, but Newspaper uses condensed body (Crimson at narrow column) and Letterpress uses display-weight Caslon throughout.

### vs [Neumorphism](./neumorphism.md)

Neumorphism combines inset + outset shadows for the cautionary single-surface "soft bump" register that contrast-fails on purpose. Letterpress also combines inset + outset shadows but at much lower alpha, tinted toward ink-black instead of monochrome grey, and applied to `intent.*.bg` fills (not surface containers) — the deboss is the affordance, not the surface.

## Where it thrives

- Editorial long-form prose (Caslon body on cream paper is the historical reading register)
- Subdued primary buttons + secondary buttons in the five-ink palette
- Book covers, certificate / receipt mockups, and any UI that reads as printed-not-displayed

## Where it degrades

- Dense data tables (the cream + serif slows scanning vs a mono / sans register)
- Saturated photographic imagery (the warm cream + ink palette doesn't carry vivid colour cleanly)

## Recall aliases

`letterpress`, `metal type`, `press`, `caslon`, `debossed`

## Long-form notes

<details>
<summary>From <code>palettes/letterpress.README.md</code></summary>

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

</details>

---

_Generated from `palettes/letterpress.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
