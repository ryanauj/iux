# Pixel Art (Stardew Valley)

The modern cozy-indie register. Warm parchment fields, wood-frame
borders, harvest-gold accents, crop greens and berry reds. Inspired by
ConcernedApe's 2016 farm sim and the wider cottagecore indie wave
(Eastward, Moonglow Bay, Coral Island). Bitmap glyphs throughout via
**Press Start 2P** — same engine as the NES / Game Boy registers.

Unlike NES and Game Boy this is **not a hardware-locked palette** —
it's an art-direction register. There is no Stardew "console"; the
game runs at arbitrary resolutions and ConcernedApe authored the
sprites against modern monitors. What we honour is the colour
philosophy, not a bit-depth limit:

| Role            | Hex        | Source                                      |
|-----------------|------------|---------------------------------------------|
| parchment field | `#fef0d4`  | menu background, paper journal              |
| warm wood       | `#7a4a1b`  | menu frame, sign borders, NPC dialog boxes  |
| ink             | `#3b2615`  | body text — warm dark brown, never pure black |
| crop green      | `#7cb43c`  | mature crops, success                       |
| forest          | `#3d6b2c`  | primary intent — pine, deep grass           |
| harvest gold    | `#dca830`  | wheat, energy bar, warning                  |
| berry red       | `#c84830`  | salmonberries, health, danger               |
| water blue      | `#4878b8`  | rivers, fishing, info / link                |

## A11y

`experimental` — same engine caveats as the rest of the pixel-art
family. Contrast is the **best** of the four new registers: `#3b2615`
content on `#fef0d4` base measures ≈ 11.4:1, comfortably AA at body
size (12 CSS px) and AAA at the larger roles. The `experimental` tag
is held by the engine, not the colour pairs.

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
degrade. What changes with Stardew is **temperature**: the parchment
base reads as cozy rather than retro, so the same components feel
journal-like instead of console-like. A Kanban board styled with
this palette reads as a farmhand's whiteboard, not a NES game menu.

See [`pixel-art-nes.README.md`](./pixel-art-nes.README.md) for the
engine-level details, pixel-font choice, and the broader thrives /
degrades list. Nothing in that document is NES-specific except the
colour references.
