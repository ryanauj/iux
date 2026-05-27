# Pixel Art (PICO-8)

> The Lexaloffle fantasy-console register — a fixed 16-colour ROM where hover/active states cannot tint luminance, they have to hue-jump to a neighbouring slot, exactly the way a PICO-8 cart paints.

**Engine:** `pixel-art` · **A11y:** `experimental`

## Summary

Pixel Art (PICO-8) is the Lexaloffle fantasy-console register on the `pixel-art` engine. The palette is literally fixed: 16 hard-coded colours chosen by Joseph White in 2014, and any cart paints from exactly this set. `surface.base` is dark-blue slot 1 (`#1D2B53`), `content.primary` is cream slot 7 (`#FFF1E8`), `intent.primary.bg` is blue slot 12 (`#29ADFF`). The defining constraint: there is no `#29ADFF` darker than `#29ADFF`, so `bgHover` jumps to indigo slot 13 (`#83769C`) and `bgActive` to dark-blue slot 1 — hue jumps, not luminance dips. Emulating the cart through the contract is the point.

## Origin

PICO-8 is the Lexaloffle fantasy console released in 2014 by Joseph White. It deliberately constrains carts to a 128×128 screen, a 16-colour fixed ROM, a 4-channel sound chip, and a tiny instruction budget. The "fantasy" in fantasy-console means the hardware never existed — it is a curated set of constraints, and the 16-colour ROM is the most visible one.

## Signatures

- **Fixed 16-colour ROM — every value in `color.*` is one of those slots** — Every hex in the palette is one of the 16 PICO-8 slots: black `#000000`, dark-blue `#1D2B53`, dark-purple `#7E2553`, dark-green `#008751`, brown `#AB5236`, dark-grey `#5F574F`, light-grey `#C2C3C7`, white `#FFF1E8`, red `#FF004D`, orange `#FFA300`, yellow `#FFEC27`, green `#00E436`, blue `#29ADFF`, indigo `#83769C`, pink `#FF77A8`, peach `#FFCCAA`. Nothing in between, no alpha, no gradients.
- **Hover/active states hue-jump, not tint** — `intent.primary` is blue `#29ADFF`; `bgHover` is indigo `#83769C` (slot 13); `bgActive` is dark-blue `#1D2B53` (slot 1). Those are hue jumps to neighbouring ROM slots, not luminance dips on the source colour. `intent.success` `bgHover` jumps from green `#00E436` to yellow `#FFEC27`. The cart cannot tint, so the contract does not either.
- **Yellow `#FFEC27` focus ring (slot 10) at 4px** — `effect.focusRing` is `{ width: "4px", color: "#FFEC27", style: "solid" }`. Measures ~13:1 against the dark-blue base — the most visible focus indicator. Yellow is slot 10; the focus colour is also picked from the fixed ROM, not generated.
- **Compressed inline `space.*` for the 128×128 native canvas** — `space.2` collapses to `4px` and `space.5` to `16px`, the tightest grid of any pixel-art register here. The PICO-8 cart targets a 128×128 screen at 1× scale; the spacing compresses so Stepper / Tabs / Pagination still fit a single cart screen.
- **Single-colour drop shadow in slot 0 (`#000000`)** — `elevation.low` is `2px 2px 0 #000000` — PICO-8 sprites cast a one-pixel black shadow underneath, and the contract scales it to the engine grid while keeping the single-colour cast. At `high` it adds dark-grey slot 5 (`#5F574F`) as a second offset.
- **Compressed typography role ladder — `display` at `1.5rem`, not `2rem`** — PICO-8's native font is 3×5 px — far smaller than Press Start 2P at 8px. The role ladder compresses (`display: 1.5rem`, `body: 0.5rem`) so the visual density matches the cart aesthetic, accepting 8px as the floor for the bitmap font.

## Anti-signatures

- Any colour outside the 16-slot ROM (no tints, no in-between shades — the cart cannot paint them)
- Hover states that darken or lighten the source colour instead of jumping to a different slot
- Alpha-blended surfaces or gradients (the cart has no alpha)
- Rounded corners, soft shadows, or anti-aliased curves
- System UI / sans-serif body — every role is Press Start 2P bitmap

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.pixelGrid` | `8px` | `8px` — the engine snap step. Shared with the rest of the pixel-art family; `space.*` compresses but the grid step does not. |
| `color.surface.base` | `#1D2B53` | `#1D2B53` — slot 1, PICO-8 dark-blue. The default cart background. |
| `color.intent.primary.bg` | `#29ADFF` | `#29ADFF` — slot 12, PICO-8 blue. Picked from the ROM, not interpolated. |
| `color.intent.success.bg` | `#00E436` | `#00E436` — slot 11, PICO-8 green. `bgHover` jumps to slot 10 yellow (`#FFEC27`), not a darker green. |
| `effect.focusRing.color` | `#FFEC27` | `#FFEC27` — slot 10 yellow. Focus is also a ROM slot. |
| `elevation.low.boxShadow` | `2px 2px 0 #000000` | `2px 2px 0 #000000` — slot 0 black, the cart's single-colour drop. |
| `typography.family.pixel` | `"Press Start 2P", "VT323", ui-monospace, monospace` | Press Start 2P stack — same bitmap register as the rest of the pixel-art family; role sizes compress because the PICO-8 native font is 3×5 px. |
| `radius.pill` | `0` | `0` — circular components render as squares. Same as the rest of the pixel-art family. |
| `space.2` | `4px` | `4px` — compressed inline step for the 128×128 native canvas. Same trick as Game Boy. |

## Often confused with

### vs [Pixel Art (NES)](./pixel-art-nes.md)

NES is hardware-historical — the 54-colour NTSC 2C02 master palette, 8×8 sprite cell, full inline `space.*` for the 256×240 screen. PICO-8 is hardware-fantasy — a curated 16-colour ROM, 128×128 screen, compressed `space.*`, and hover states that hue-jump rather than tint. NES intent hues come from real silicon; PICO-8 intent hues are picked from a designer's ROM.

### vs [Pixel Art (Game Boy)](./pixel-art-gameboy.md)

Game Boy collapses every intent onto four greens because the DMG had no colour channel. PICO-8 has the full 16-slot ROM with distinct intent hues (blue, green, yellow, red) — the constraint is "no in-between shades," not "no colour."

### vs [Pixel Art (SNES)](./pixel-art-snes.md)

SNES targets the 15-bit BGR space with thousands of available colours and bright HP/MP/EXP intents on a deep dialog blue. PICO-8 caps at 16 fixed slots and uses the dark-blue slot 1 for `surface.base` — same blue family, much smaller gamut, and the white-bevel SNES dialog outline is replaced by white slot 7 used as a border colour without the inset cast.

### vs [Pixel Art (Hyper Light)](./pixel-art-hyperlight.md)

Hyperlight is the modern art-direction register — free palette, magenta-cast `high` elevation, indigo dusk host. PICO-8 is also an art-direction register but locked to 16 slots; the magenta cast Hyperlight uses cannot exist here because there is no magenta in the ROM (the closest slots are pink `#FF77A8` or red `#FF004D`).

## Where it thrives

- Stepper, Tabs, Pagination — at the compressed inline spacing (`space.2` = 4px) they read like a PICO-8 BBS or menu cart
- Toast, Modal — the single-pixel black drop and white outline read as cart pop-ups
- Buttons — hue-jumping hover states are the most distinctive PICO-8 interaction cue

## Where it degrades

- Multi-column layouts at narrow widths — the ROM forces every panel to share `surface.base`, so depth has to come from borders and offsets
- DataTable with alternating row-fills — there is no neutral "off" row colour; slot 0 black reads as a hard separator, not a stripe
- Spatial canvas, Bezier editor, fractional sliders — same engine-level off-grid degradation as the other pixel-art registers
- Components that depend on luminance steps for hover affordance — PICO-8 hue-jumps instead, which surprises users expecting tinting

## Recall aliases

`pico-8`, `pico8`, `pixel art pico-8`, `pixel-art-pico8`, `fantasy console`, `lexaloffle`, `16-color`, `16 colour rom`

## Long-form notes

<details>
<summary>From <code>palettes/pixel-art-pico8.README.md</code></summary>

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

</details>

---

_Generated from `palettes/pixel-art-pico8.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
