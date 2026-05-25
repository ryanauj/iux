# Zen / Sumi-e

> East-Asian brush-and-ink register on the Sketch engine — rice-paper field, brush-black `intent.primary`, single seal-vermilion `intent.danger` + focus ring, brush-script display, `effect.strokeVariance` tuned to `1.0px`.

**Engine:** `sketch` · **A11y:** `experimental`

## Summary

Zen / Sumi-e is the second register on the Sketch engine (after Hand-drawn / Marker), proving the engine carries non-Western brushwork. Unbleached rice paper (`#f4ecd8`) fills `surface.base`; brush ink-black (`#1a1612`) carries `intent.primary`; seal vermilion (`#a8231c`) carries `intent.danger`, `border.focus`, and `content.link` — the only saturated chromatic in a traditional sumi-e composition. `effect.strokeVariance` is `'1.0px'` (down from marker's `'1.4px'`) — brush strokes are wobbly but less so than felt-tip marker. Display / title / heading all route through `family.hand` (brush-script).

## Origin

The East-Asian sumi-e (墨絵, "ink picture") tradition — Tang Dynasty Chinese origins, c.618–907, brought to Japan via Zen Buddhist temples in the 13th century. The visual vocabulary is rice-paper field (unbleached washi), brush-black ground sumi-e ink, and a single seal stamp (hanko / yinzhang) in vermilion as the only saturated chromatic. Negative space (`ma`, 間) is the primary compositional element — the empty paper is part of the painting, not absence.

## Signatures

- **`effect.strokeVariance: '1.0px'` (vs Hand-drawn / Marker's `1.4px`)** — The Sketch engine's SVG turbulence + displacement filter reads `strokeVariance` to scale edge wobble. Brush strokes wobble but less than felt-tip; tuning the value down is what makes Zen / Sumi-e read as brush rather than as a quieter marker. Same filter, same slot, different amplitude — the pair proves the engine generalises across non-Western brushwork.
- **Single seal-vermilion accent on a monochrome field** — `intent.danger.bg`, `border.focus`, and `content.link` are all `#a8231c` — the colour of a personal hanko stamp. Every other intent (`success`, `info`) stays near-monochromatic dark teal / dark blue so the seal red reads as unique. Traditional sumi-e treats the seal as the only saturated chromatic in the composition; the palette enforces that rule.
- **Brush-script `family.hand` routed through display / title / heading** — `typography.family.display` and `family.hand` are both brush-script (Ma Shan Zheng / Yuji Mai). Hand-drawn / Marker routes most roles through `family.hand`; Zen / Sumi-e tunes the routing harder — `display`, `title`, and `heading` ALL route through `hand` so the brush register reads on every section title. `family.body` stays Inter for legibility.
- **Widened `space.*` for `ma` (negative-space composition)** — `space.6: '36px'`, `space.7: '56px'`, `space.8: '80px'` — more aggressive than Scandinavian Royal Modern's 25% widening. The empty cream is part of the composition, not just margin.

## Anti-signatures

- A pure-white `surface.base` (unbleached rice paper is the field colour)
- Multiple saturated chromatic intents — the seal red is meant to be unique
- `effect.strokeVariance: '0'` (the brush wobble is the engine cue)
- A sans-serif `display` family — the brush script is the load-bearing register

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#f4ecd8` | Unbleached rice paper `#f4ecd8` — warmer than Hand-drawn / Marker's notebook cream. |
| `color.intent.primary.bg` | `#1a1612` | Brush ink-black `#1a1612` — freshly-ground sumi-e stick. |
| `color.intent.danger.bg` | `#a8231c` | Seal vermilion `#a8231c` — the hanko-stamp colour, the only saturated chromatic. |
| `effect.strokeVariance` | `1.0px` | `'1.0px'` — tuned down from marker's `'1.4px'` for brush amplitude. |
| `typography.family.hand` | `"Ma Shan Zheng", "Yuji Mai", "Klee One", "Caveat", cursive` | Ma Shan Zheng / Yuji Mai — brush-script. |
| `space.8` | `80px` | `'80px'` — aggressive whitespace for `ma` (negative-space composition). |

## Often confused with

### vs [Hand-drawn (Marker)](./sketch-marker.md)

Same Sketch engine, opposite cultural register. Hand-drawn / Marker: notebook-paper cream, ink-blue body, five-marker palette (navy / red / green / mustard / teal), `strokeVariance` `1.4px`, Caveat brush-marker display (Western felt-tip register). Zen / Sumi-e: rice-paper cream, monochrome brush-ink, single seal-vermilion accent, `strokeVariance` `1.0px`, brush-script display (East-Asian brush register). The pair proves the engine generalises across cultural brush traditions.

### vs [Letterpress](./letterpress.md)

Both use cream / off-white fields with restrained ink accents. Letterpress: Flat engine, `intent.*.bg` debossed via paired inset shadows, Caslon serif throughout, five-ink intent vocabulary. Zen / Sumi-e: Sketch engine, every edge displaced by the SVG turbulence filter, brush-script display, monochrome-plus-seal-red intent vocabulary. Engine difference is the load-bearing one (wobble vs deboss).

### vs [Cardstock (Layered)](./cardstock-layered.md)

Both use cream-paper fields with restrained type. Cardstock: Cardstock engine, every raised surface a piece of cut cardstock with 1 px slate-ink rule along bottom/right and a tight close shadow. Zen / Sumi-e: Sketch engine, every edge displaced by the wobble filter, large `radius.lg: 14px` so corners survive the displacement. Cardstock is crisp paper craft; Zen / Sumi-e is brush-ink composition.

## Where it thrives

- Editorial / meditation / wellness interfaces
- East-Asian cultural-content surfaces (galleries, museum collections, calligraphy schools)
- Hero panels with brush-script headings on `surface.raised`

## Where it degrades

- Form-heavy interfaces (the displacement filter softens small-glyph legibility)
- Dense data tables (the widened `space.*` and the wobble eat density on every row)

## Recall aliases

`zen`, `sumi-e`, `sumie`, `brush`, `ink wash`, `east asian`

## Long-form notes

<details>
<summary>From <code>palettes/zen-sumie.README.md</code></summary>

# Zen / Sumi-e

East-Asian brush-and-ink register on the Sketch engine. Rice-paper
field, ink-black brush primary, single seal-red accent, generous
whitespace, restrained scale. The **second register on the Sketch
engine** (the first being Hand-drawn / Marker) — proves the engine
carries non-Western brushwork the same way the Pixel-art engine carries
non-console registers (PICO-8, Cottagecore).

The Sketch engine applies an SVG turbulence + displacement filter at
the palette root (defined in `index.html`). Every edge — borders,
glyph outlines, focus rings, shadow strokes — picks up the same
micro-jitter as Hand-drawn / Marker, but Zen / Sumi-e tunes the
**amplitude** down (`effect.strokeVariance: '1.0px'` vs marker's
`1.4px`): brush strokes are wobbly but less so than felt-tip marker.

`surface.base` is unbleached rice paper (`#f4ecd8`); `surface.raised`
is brighter washi (`#fbf5e7`); `surface.sunken` drops to `#e6dcc2`.
The cream is warmer than Hand-drawn / Marker's notebook-paper cream
because traditional sumi-e paper is unbleached, not lightly-sized.

The intent vocabulary is monochromatic except for the seal red:

- `intent.primary` is ground sumi-e ink (`#1a1612`) — the default brush
  colour, what a freshly-ground stick produces
- `intent.danger` is seal vermilion (`#a8231c`) — the colour of a
  personal hanko stamp, traditionally the only saturated chromatic in
  a brush composition. `border.focus` and `content.link` reuse the
  same seal red.
- `intent.warning` is a slightly more orange seal red (`#b8501a`) so
  the two intents don't read identical when stacked
- `intent.success` and `intent.info` stay near-monochromatic dark teal
  / dark blue — they don't introduce competing chromatic notes

`typography.family.display` and `family.hand` are brush-feel scripts
(Ma Shan Zheng / Yuji Mai / Klee One fallback). `family.body` is Inter
— the Sketch-engine displacement filter would crush form labels and
captions if everything routed through `family.hand`. The mix is the
same compromise Hand-drawn / Marker makes; this palette tunes the
display routing harder toward `family.hand` (heading, title, display
all route through `hand`) so the brush register reads on every section
title.

`space.*` widens at the high end (`6: '36px'`, `7: '56px'`, `8: '80px'`)
— sumi-e composition relies on negative space (`ma`) as the primary
organising element, more aggressively than even Scandinavian Royal
Modern's 25% widening. The empty cream is part of the composition.

`elevation.*` stays close to flat: cards lift via ink-tinted hard-offset
shadow but the lift is small (1-3 px offset). The field is the canvas,
not a stage above it.

`radius.*` keeps brush-curve-friendly defaults (`sm: '4px'`, `md: '8px'`,
`lg: '14px'`) so the displacement pass doesn't crush hard corners. The
filter actually softens corners further; the stated `lg: '14px'` reads
more rounded than the marker palette's `'16px'` because the lower
variance lets the corner survive.

`motion.duration.*` stretches another tier (`base: '280ms'`, `slow: '440ms'`)
— the brush register reads as "ink settling on paper" rather than "GPU
flip" or "felt-tip squeak."

**A11y:** `experimental`. The Sketch engine's edge displacement reduces
glyph legibility at small sizes — same caveat as Hand-drawn / Marker.
Body text on `surface.base` (`#1a1612` on `#f4ecd8`) ≈ 13:1 (AAA), but
the displacement pass softens the glyph edges enough that the
perceived contrast feels lower than the numeric ratio. The seal-red
intents pass 3:1 on the cream inverse content; the monochrome intents
all clear AAA.

## Engine cost

Zero new tokens. Reuses the Sketch engine's `effect.strokeVariance`
and `typography.family.hand` slots verbatim. The amplitude difference
(`1.0px` vs `1.4px`) is just a different value in the same slot —
the SVG filter at the palette root reads it and applies the matching
displacement strength.

</details>

---

_Generated from `palettes/zen-sumie.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
