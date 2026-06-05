# Pixel Art (Blossom)

A light-ground register of the pixel-art engine, sibling to Sky and
Meadow: a pale rose field with a single dominant pink highlight carrying
primary, focus, and links. Square corners, hard offsets, `steps(1, end)`
motion, and bitmap glyphs via **Press Start 2P** — the same engine as the
NES / Game Boy / Cottagecore registers; only `color.*` and `space.*`
change.

Not a hardware-locked palette — an art-direction register. The
"colour highlight" reading of the light-ground idea: a near-white ground
with the saturation in a single blossom-pink accent, the other intents
keeping conventional hues for legibility.

| Role          | Hex        | Source                                   |
|---------------|------------|------------------------------------------|
| blossom field | `#fbecf2`  | page / menu background                   |
| blossom frame | `#a83a66`  | carved-frame bevel, strong borders       |
| ink           | `#3a1428`  | body text — dark plum, never pure black  |
| accent pink   | `#db2777`  | primary, focus ring, links               |
| crop green    | `#3fa34d`  | success                                  |
| harvest gold  | `#e0a82e`  | warning                                  |
| ember red     | `#d14b3c`  | danger                                   |
| water blue    | `#4878b8`  | info                                     |

## Typography — Press Start 2P (OFL)

All roles render in **Press Start 2P**, licensed under the SIL Open Font
License 1.1 (OFL). The OFL permits bundling, embedding, and redistribution
with the product; the font is a display face used for every role to keep
the bitmap idiom, with `body` at 12 CSS px. Pair it with the engine's 8px
grid (`effect.pixelGrid = 8px`) so glyph cells land on integer pixels.

## A11y

`experimental` — the engine-level caveat is the bitmap font at the small
`label` / `caption` sizes. The colour pairs are strong: `#3a1428` ink on
`#fbecf2` ground measures ≈ 12:1, comfortably AA at body size. Prefer the
larger roles for at-a-glance text and lean on the 4px focus ring.
