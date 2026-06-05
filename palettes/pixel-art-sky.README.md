# Pixel Art (Sky)

A light-ground register of the pixel-art engine in the cozy-indie spirit
of Cottagecore, but cool and airy: a pale-sky field with a single
dominant blue highlight carrying primary, focus, and links. Square
corners, hard offsets, `steps(1, end)` motion, and bitmap glyphs via
**Press Start 2P** — the same engine as the NES / Game Boy / Cottagecore
registers; only `color.*` and `space.*` change.

Not a hardware-locked palette — an art-direction register. It is the
"colour highlight" reading of the light-ground idea: a near-white ground
with the saturation moved into a single sky-blue accent, while the other
intents keep conventional hues so the UI stays readable.

| Role          | Hex        | Source                                   |
|---------------|------------|------------------------------------------|
| sky field     | `#eaf2fb`  | page / menu background                   |
| sky frame     | `#2f5f96`  | carved-frame bevel, strong borders       |
| ink           | `#182b40`  | body text — dark navy, never pure black  |
| accent blue   | `#2563eb`  | primary, focus ring, links               |
| crop green    | `#3fa34d`  | success                                  |
| harvest gold  | `#e0a82e`  | warning                                  |
| ember red     | `#d14b3c`  | danger                                   |

## Typography — Press Start 2P (OFL)

All roles render in **Press Start 2P**, licensed under the SIL Open Font
License 1.1 (OFL). The OFL permits bundling, embedding, and redistribution
with the product; the font is a display face — used here for every role to
keep the bitmap idiom, with `body` at 12 CSS px and the larger roles
scaled up. Pair it with the engine's 8px grid (`effect.pixelGrid = 8px`)
so glyph cells land on integer pixels.

## A11y

`experimental` — the engine-level caveat is the bitmap font at the small
`label` / `caption` role sizes (8 CSS px), which is hard to read regardless
of colour. The colour pairs themselves are strong: `#182b40` ink on
`#eaf2fb` ground measures ≈ 12:1, comfortably AA at body size. Prefer the
larger roles for any text that must be read at a glance, and lean on the
4px focus ring the engine already paints.
