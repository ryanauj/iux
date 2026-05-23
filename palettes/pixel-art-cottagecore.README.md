# Pixel Art (Cottagecore)

The warm-pastoral register. Parchment fields, wood-frame borders,
harvest-gold accents, crop greens and berry reds. The broad cozy-indie
pixel idiom that emerged across the late-2010s and 2020s — farm sims,
life sims, illustrated storybooks, the "cottagecore" social media
aesthetic — sharing one warm-earth palette without belonging to any
single title. Bitmap glyphs throughout via **Press Start 2P** — same
engine as the NES / Game Boy / SNES registers.

Unlike NES and Game Boy this is **not a hardware-locked palette** —
it's an art-direction register. No console gates the colours; what
gates them is the aesthetic: warmth bias throughout, no pure black
anywhere, earthy intents in place of saturated console primaries.

| Role            | Hex        | Source                                      |
|-----------------|------------|---------------------------------------------|
| parchment field | `#fef0d4`  | menu background, paper journal              |
| warm wood       | `#7a4a1b`  | menu frame, sign borders, dialog boxes      |
| ink             | `#3b2615`  | body text — warm dark brown, never pure black |
| crop green      | `#7cb43c`  | mature crops, success                       |
| forest          | `#3d6b2c`  | primary intent — pine, deep grass           |
| harvest gold    | `#dca830`  | wheat, lanterns, warning                    |
| berry red       | `#c84830`  | salmonberries, health, danger               |
| water blue      | `#4878b8`  | rivers, fishing, info / link                |

## A11y

`experimental` — same engine caveats as the rest of the pixel-art
family. Contrast is the **best** of the non-hardware-locked registers:
`#3b2615` content on `#fef0d4` base measures ≈ 11.4:1, comfortably AA
at body size (12 CSS px) and AAA at the larger roles. The
`experimental` tag is held by the engine, not the colour pairs.

Two things to watch:

- The warm parchment base biases focus rings toward gold (`#dca830`,
  ~4.2:1 against `#fef0d4`). The ring clears AA for non-text UI
  outlines but is the lowest-contrast focus indicator in the
  pixel-art set; pair it with the 4px-wide ring the engine already
  forces and it stays scannable.
- Inverse text on the primary (`#fef0d4` on `#3d6b2c`) measures
  ≈ 7.8:1 — fine for buttons, fine for toasts.

## What thrives vs degrades

Identical to the NES variant in shape — kanban, buttons, modals,
toggles all thrive; SpatialCanvas, BezierEditor, fractional sliders
degrade. What changes with the cottagecore register is **temperature**:
the parchment base reads as cozy rather than retro, so the same
components feel journal-like instead of console-like. A Kanban board
styled with this palette reads as a notice-board pinned in a kitchen,
not a NES game menu.

See [`pixel-art-nes.README.md`](./pixel-art-nes.README.md) for the
engine-level details, pixel-font choice, and the broader thrives /
degrades list. Nothing in that document is NES-specific except the
colour references.
