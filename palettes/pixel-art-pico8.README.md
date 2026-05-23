# Pixel Art (PICO-8)

The Lexaloffle fantasy-console register. The palette is literally
fixed: 16 hard-coded colours chosen by Joseph White in 2014, and any
PICO-8 cart you've ever loaded paints from exactly this set. There is
no in-between shade, no alpha, no gradient. Same `pixel-art` engine as
the NES / Game Boy registers — square corners, bitmap font, hard
offsets, `steps(1, end)` everywhere.

The full 16-slot ROM:

| Slot | Hex        | Slot | Hex        |
|------|------------|------|------------|
| 0    | `#000000`  | 8    | `#FF004D`  |
| 1    | `#1D2B53`  | 9    | `#FFA300`  |
| 2    | `#7E2553`  | 10   | `#FFEC27`  |
| 3    | `#008751`  | 11   | `#00E436`  |
| 4    | `#AB5236`  | 12   | `#29ADFF`  |
| 5    | `#5F574F`  | 13   | `#83769C`  |
| 6    | `#C2C3C7`  | 14   | `#FF77A8`  |
| 7    | `#FFF1E8`  | 15   | `#FFCCAA`  |

## The constraint is the register

Most palettes can darken a hover state by tweaking lightness in HSL.
PICO-8 cannot — there is no `#29ADFF` darker than `#29ADFF`, only the
next slot in the ROM. The hover for `primary` here is slot 13
(`#83769C` indigo) and the active is slot 1 (`#1D2B53` dark-blue).
Those are hue jumps, not luminance dips. **Emulating the cart through
the contract is the point.**

That same constraint means intents that share a hue family (success
green vs HP green) have to either alias or pick a different family.
Here success uses slot 11 (`#00E436`) and hovers to slot 10
(`#FFEC27` yellow) — the cart idiom of "step to the next colour" over
"darken the current colour".

## A11y

`experimental`. Cream on dark-blue (`#FFF1E8` on `#1D2B53`) measures
≈ 14.6:1, comfortably AAA at body size. The risk surface is intent
states: hover/active states change **hue**, not luminance, so users
relying on lightness alone to detect interaction state will have a
harder time than on NES or SNES. Pair intent affordance with the
4px focus ring (`#FFEC27` yellow, ≈ 13:1 against `#1D2B53`) and the
engine's `:hover` cursor change.

## What thrives vs degrades

Anything that fits a 128×128 screen at 1× scale thrives:
- **Stepper, Tabs, Pagination** at the compressed inline spacing
  (`space.2` collapses to 4px like Game Boy) read exactly like a
  PICO-8 BBS / menu cart.
- **Toast, Modal** with the single-pixel black drop and white outline
  read as cart pop-ups.

Degrades:
- **Multi-column layouts at narrow widths** — the 16-colour ROM
  forces every panel to lean on the same surface base, so depth
  cueing has to come from borders and offsets, not background tint.
- **DataTable** with alternating row-fills — there is no neutral
  "off" row colour; the available second surface is `#000000` which
  reads as a hard separator, not a stripe.

See [`pixel-art-nes.README.md`](./pixel-art-nes.README.md) for the
engine-level details, pixel-font choice, and the broader thrives /
degrades list.
