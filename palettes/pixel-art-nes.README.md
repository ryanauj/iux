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
