# Pixel Art (SNES)

The canonical Super Nintendo dialog-box register. Deep-blue window
gradient, white inner-bevel outline, gold accent, bright HP / MP /
EXP intents. Anchored on the UI vocabulary of Chrono Trigger (1995),
Final Fantasy VI (1994), and Secret of Mana (1993) — the era when
15-bit BGR colour and mode-7 layering let game UIs paint richer
palettes than the NES could afford.

Same `pixel-art` engine as the NES / Game Boy registers — square
corners, bitmap font (Press Start 2P), hard offsets, `steps(1, end)`
easings. What changes is entirely in `color.*` and `elevation.*`:
the deeper, more-saturated blue field reads as a recessed dialog
window, and the `overlay` elevation stacks a white outline on top of
the drop shadow, which is the SNES dialog-frame signature.

Palette anchors:

| Hex       | Role                                           |
|-----------|------------------------------------------------|
| `#1c3878` | Dialog blue — every JRPG menu of the era      |
| `#0c1c48` | Deepest blue, inset / drop shadow              |
| `#f8f8f8` | White inner border — the SNES bevel idiom      |
| `#f8c040` | Gold accent — menu cursor, focus ring, EXP    |
| `#28a838` | HP green                                       |
| `#d83040` | Damage red                                     |
| `#3898d8` | MP / magic cyan-blue                           |

## A11y

`experimental` — same engine caveats. White content on `#1c3878`
measures ≈ 13.4:1 (AAA at body size). The bright-intent palette is
the highest-contrast of the four new registers: every intent bg
clears 4.5:1 against `#f8f8f8` content, and the gold focus ring
(`#f8c040`, ≈ 9.5:1 against `#1c3878`) is the most visible focus
indicator in the set.

The risk surface is **muted secondary text** (`#7878a0` on `#1c3878`
≈ 3.1:1) — fine for non-text UI but below AA for body copy. The
contract reserves `content.muted` for de-emphasised metadata, not
body text, so this is acceptable; just don't put paragraphs in muted.

## What thrives vs degrades

Identical to the NES variant in shape, with one engine-aligned twist:
the `overlay` elevation recipe paints a white outer ring (`0 0 0 2px
#f8f8f8`) before the drop shadow, which makes Modal and Drawer read
exactly like a SNES dialog frame. Components that lean on the
`overlay` elevation get the most SNES-specific look. Everything else
(Buttons, Toggle, Stepper, Kanban) reads as a generic 16-bit menu.

Degrades:
- Same as NES/Game Boy — SpatialCanvas, BezierEditor, fractional
  sliders. The deeper blue base makes off-grid jitter more visible,
  not less, because the contrast with the white outlines is sharper.

See [`pixel-art-nes.README.md`](./pixel-art-nes.README.md) for the
engine-level details, pixel-font choice, and the broader thrives /
degrades list.
