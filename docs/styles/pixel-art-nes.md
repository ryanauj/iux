# Pixel Art (NES)

> The canonical 8-bit console register — NES master palette colours, Press Start 2P bitmap glyphs, hard 4px offset block shadows, zero rounding, and motion that ticks at NTSC frame multiples.

**Engine:** `pixel-art` · **A11y:** `experimental`

## Summary

Pixel Art (NES) is the engine that says "everything snaps to an 8-pixel grid." Colours are lifted from the NES 2C02 NTSC master palette (sky `#0000fc`, leaf `#00a800`, brick `#d82800`, coin `#fcfc00`). Typography is **Press Start 2P** routed through every role so display, body, label, caption, and code all render as bitmaps at 8/12/16/24/32 CSS px. Radii are `0` across the board — `pill` and `full` collapse to square. Elevation uses *hard offset block shadows only* (no penumbra), and motion durations are NTSC-frame multiples (32/64/128 ms) with `steps(1, end)` easing so sprites snap rather than ease.

## Origin

The Nintendo Entertainment System shipped in North America in 1985. Its 2C02 picture processor used a fixed NTSC palette of 54 colours, an 8×8 sprite cell, and a 60 Hz frame loop with no anti-aliasing. This palette is the period-correct revival on the `pixel-art` engine, anchored on the new `effect.pixelGrid` and `typography.family.pixel` token slots.

## Signatures

- **NTSC 2C02 master-palette colours on every intent** — Each `intent.*.bg` fills a distinct NES swatch: primary `#0000fc` (sky), success `#00a800` (leaf), danger `#d82800` (brick), warning `#fcfc00` (coin), info `#3cbcfc`. Every intent border is `#fcfcfc` ("outline white" — the cue the original sprites used to separate from background).
- **Press Start 2P routed through every typography role** — `typography.family.{ui,display,mono,pixel,hand}` all resolve to `"Press Start 2P", "VT323", ui-monospace`. Sizes are integer multiples of 8 CSS px (0.5rem / 1rem / 1.5rem / 2rem). Every other palette aliases `family.pixel` to its own `ui` stack, so this is the only one where the slot is load-bearing.
- **Zero rounding everywhere — `radius.*` is `0`** — Including `pill` and `full`. Components that ask for a circle render as a square sprite under this engine. That contrast (Avatar / Toggle / Loading-spinner) is intentional teaching content — see the README's "What thrives vs degrades" section.
- **Hard offset block shadows — no penumbra** — `elevation.low` is `4px 4px 0 #000000`. `medium` and `high` stack a second / third offset shadow in lighter shades to suggest depth without anti-aliasing. The 4-step grid alignment matches `space.*`.
- **NTSC-frame motion: `32ms / 64ms / 128ms` with `steps(1, end)` easing** — Durations are 2 / 4 / 8 NTSC frames at 60 Hz (~16.67 ms / frame). Every `motion.easing.*` slot is `steps(1, end)` — sprites don't ease between frames, they snap. Under `prefers-reduced-motion` the engine collapses every duration to `instant`.
- **`effect.pixelGrid` set to `8px` (the load-bearing engine slot)** — The engine reads this at the palette root, sets `image-rendering: pixelated`, disables font smoothing, and anchors `space.*` / `radius.*` to integer multiples. Every non-pixel palette returns `'0'`, which the engine CSS reads as "no snap" — i.e. the rule is a no-op there.

## Anti-signatures

- Rounded corners — `radius.sm/md/lg/pill/full` all collapse to `0`
- Anti-aliased curves, gradients, or soft shadows
- Sub-pixel rendering or sub-pixel borders (`0.5px`)
- System UI or sans-serif typography on body / label / caption
- Smooth (non-stepped) easing curves like `cubic-bezier(0.2, 0, 0, 1)`
- Alpha-blended translucent surfaces (NES had no alpha)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.pixelGrid` | `8px` | `8px` — the engine's grid step. The load-bearing slot the engine reads to snap rendering. |
| `typography.family.pixel` | `"Press Start 2P", "VT323", ui-monospace, monospace` | Press Start 2P stack — routed through every `role.*` here, aliased to `ui` on every other palette. |
| `radius.lg` | `0` | `0` — every radius slot is zero, including `pill` and `full`. Circles render as squares. |
| `elevation.low.boxShadow` | `4px 4px 0 #000000` | `4px 4px 0 #000000` — hard offset, zero blur. The pixel-art elevation recipe. |
| `motion.duration.fast` | `32ms` | `32ms` — two NTSC frames at 60 Hz. Every duration is an integer frame count. |
| `motion.easing.standard` | `steps(1, end)` | `steps(1, end)` — sprite-snap easing. Same value at every easing slot. |
| `color.intent.primary.bg` | `#0000fc` | `#0000fc` — NES "sky" from the NTSC 2C02 master palette. |

## Often confused with

### vs [Pixel Art (Game Boy)](./pixel-art-gameboy.md)

Game Boy is the 4-shade green-monochrome register on the same pixel-art engine (DMG-01 LCD): every colour is one of four greens, every intent uses the same green family, and `surface.base` is the green-cream. NES (this palette) commits to full NTSC colour — six distinct intent hues.

### vs [Pixel Art (SNES)](./pixel-art-snes.md)

SNES is the 16-bit successor register — wider colour space (PPU could mix from 32,768 colours), softer pastel intents, and `space.*` still on the 8-grid but sized for higher-resolution layouts. NES (this palette) sticks to the 54-colour master palette and the 8-bit sprite cell.

### vs [Pixel Art (PICO-8)](./pixel-art-pico8.md)

PICO-8 is the fantasy-console register — only 16 fixed colours, `effect.pixelGrid` at `4px` rather than `8px`, and a different stylised palette (pink, peach, lime) rather than NES master. NES is hardware-historical; PICO-8 is hardware-fantasy.

### vs [CRT / Phosphor (Green)](./crt-phosphor-green.md)

CRT/Phosphor renders as a green-on-black terminal with scanlines (`effect.overlay.image` is non-`none`) and phosphor decay on motion (`motion.decay` ≈ `80ms`). NES has no scanlines, no decay — sprites snap and the screen is a flat field, not a CRT face.

## Where it thrives

- Kanban / card grids — the 8px grid, hard offsets, and square corners read exactly like a Game Boy / NES menu
- Button, Toggle, Checkbox, Stepper — the brief's controls. Pixel fonts at 8/12 CSS px on a yellow `#fcfc00` focus ring is the look
- Pagination, Segmented, Tabs — text-only controls with block fills and integer-pixel separators
- Toast, Modal, Drawer — the block shadow stack reads as a sprite overlay

## Where it degrades

- Spatial canvas — assumes arbitrary fractional positions, lands off-grid, cards visibly jitter against the bitmap field
- Bezier editor — sub-pixel control points + anti-aliased curve render pixelated; the math is right but the affordance reads as wrong
- Slider — the thumb's hover transform translates by 1px increments and feels stepped at fractional widths
- DiffView with character-level highlight — `radius.sm` collapses to `0`, so highlights become hard rectangles instead of pills
- Multi-line wrapped paragraphs at narrow widths — bitmap glyphs at a fixed width produce visibly cramped line breaks

## Recall aliases

`nes`, `pixel art nes`, `pixel-art-nes`, `8-bit`, `8 bit`, `nintendo`, `pixel`

## Long-form notes

<details>
<summary>From <code>palettes/pixel-art-nes.README.md</code></summary>

# Pixel Art (NES)

The canonical 8-bit-console register. Colours are lifted from the NTSC
2C02 master palette the Nintendo Entertainment System shipped (sky
`#0000fc`, leaf `#00a800`, brick `#d82800`, coin `#fcfc00`, plus black
`#000000` and "outline white" `#fcfcfc`). Bitmap glyphs throughout via
**Press Start 2P**. Sub-pixel rendering is disabled at the engine level.

Anchored on a new `pixel-art` engine that exercises two contract slots
no previous engine touched:

- `effect.pixelGrid` — the engine grid step in CSS px. Set to `'8px'`
  here; every `space.*` and `radius.*` value is an integer multiple of
  that step, so layout naturally lands on pixel boundaries. Every
  non-pixel palette returns `'0'`, which the engine CSS reads as
  "no snap" — i.e. the rule is a no-op.
- `typography.family.pixel` — the bundled pixel-font stack. Routed
  through every `role.*` here so display, body, label, caption, code
  all render as bitmaps at integer-multiple sizes (8, 12, 16, 24, 32
  CSS px). Every non-pixel palette aliases this to its `ui` stack so
  the slot stays defined without being load-bearing.

Radii are `'0'` across the board including `pill` and `full`. The brief
is unambiguous: pixel corners are stepped or square. Components that
ask for circles render as squares under this palette — that contrast is
teaching content (see "What thrives vs degrades" below).

`elevation.*` uses **hard offsets only** — no penumbra, no gaussian
blur. `low` is a `4px 4px 0 #000000` block-shadow; `medium` and `high`
stack a second and third offset shadow in lighter shades to suggest
elevation without anti-aliasing.

`motion.duration.*` ticks at NTSC frame multiples (32ms = 2 frames,
64ms = 4 frames, 128ms = 8 frames). Every `motion.easing.*` slot is
`steps(1, end)` — sprites don't ease, they snap. Under
`prefers-reduced-motion` the engine collapses every duration to
`instant`, which lands transitions instantly (no decorative motion
loops to disable — the engine paints no scanlines, no glow pulse).

## Pixel font

**Press Start 2P** by CodeMan38, licensed under the **SIL Open Font
License 1.1** (open-source, embedding-safe). The font is loaded via
`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P')`
at the top of `src/styles.css`. `font-display: block` is used so the
glyphs don't flash a non-pixel fallback before the WOFF lands.

To vendor a local copy (recommended for offline / self-hosted builds),
drop `PressStart2P-Regular.woff2` into `public/fonts/` and swap the
`@import` for a `@font-face` rule pointing at it. The token files don't
change; the font-name `"Press Start 2P"` stays the same.

## A11y

`experimental`. Two reasons:

1. **Reading-comprehension at small sizes.** Press Start 2P at 8px
   (`label`/`caption`) is legible but cramped — narrow viewports
   produce ragged multi-line wrapping. Field text at 12px (`body`)
   clears AA contrast (`#fcfcfc` content on `#000000` base measures
   ~21:1) but the bitmap edges defeat sub-pixel kerning, so dense
   paragraphs feel busier than a system-font palette.
2. **The grid forces stepped spacing.** With every gap quantised to
   4/8/16/24/32 px, components that assume arbitrary inset values
   (kanban tickets, table cells, fluid grids) compose cleanly. Density
   controls like motion-scale or text-size sliders fight the grid and
   feel coarse — that is the engine working as intended, not a bug.

## What thrives vs degrades

Components that **thrive** under Pixel-art:

- **Kanban / card grids** — the 8px grid, hard offsets, and square
  corners read exactly like a Game Boy / NES menu.
- **Button, Toggle, Checkbox, Stepper** — the brief's controls. Pixel
  fonts at 8/12 CSS px on a yellow `#fcfc00` focus ring is the look.
- **Pagination, Segmented, Tabs** — text-only controls with block fills
  and integer-pixel separators.
- **Toast, Modal, Drawer** — the block shadow stack reads as a sprite
  overlay.

Components that **degrade** under Pixel-art (intentional contrast — do
not fork to "fix"):

- **Spatial canvas** — assumes arbitrary fractional positions. Lands
  off-grid; cards visibly jitter relative to the bitmap field.
- **Bezier editor** — sub-pixel control points, anti-aliased curve.
  The curve renders pixelated; the math is still right but the
  affordance reads as wrong.
- **Slider** — the thumb's hover transform translates by 1px increments;
  feels stepped at fractional widths.
- **DiffView with character-level highlight** — `radius.sm` collapses to
  `'0'`, so character highlights become hard rectangles instead of
  pills. Still readable, just different.
- **Multi-line wrapped paragraphs at narrow widths** — bitmap glyphs at
  a fixed width produce visibly cramped line breaks. Accept it; this is
  what pixel-art looks like on phones.

The point of the engine is to keep the **variant-as-prop principle**
intact: every component above survives without code changes. The
"degrades" list is the contrast that makes the contract teaching
material.

</details>

---

_Generated from `palettes/pixel-art-nes.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
