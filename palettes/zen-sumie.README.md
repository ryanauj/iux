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
