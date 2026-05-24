import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'pixel-art-nes',
  tagline:
    'The canonical 8-bit console register — NES master palette colours, Press Start 2P bitmap glyphs, hard 4px offset block shadows, zero rounding, and motion that ticks at NTSC frame multiples.',
  summary:
    'Pixel Art (NES) is the engine that says "everything snaps to an 8-pixel grid." Colours are lifted from ' +
    'the NES 2C02 NTSC master palette (sky `#0000fc`, leaf `#00a800`, brick `#d82800`, coin `#fcfc00`). ' +
    'Typography is **Press Start 2P** routed through every role so display, body, label, caption, and code ' +
    'all render as bitmaps at 8/12/16/24/32 CSS px. Radii are `0` across the board — `pill` and `full` ' +
    'collapse to square. Elevation uses *hard offset block shadows only* (no penumbra), and motion durations ' +
    'are NTSC-frame multiples (32/64/128 ms) with `steps(1, end)` easing so sprites snap rather than ease.',
  origin:
    'The Nintendo Entertainment System shipped in North America in 1985. Its 2C02 picture processor ' +
    'used a fixed NTSC palette of 54 colours, an 8×8 sprite cell, and a 60 Hz frame loop with no anti-aliasing. ' +
    'This palette is the period-correct revival on the `pixel-art` engine, anchored on the new ' +
    '`effect.pixelGrid` and `typography.family.pixel` token slots.',
  signatures: [
    {
      label: 'NTSC 2C02 master-palette colours on every intent',
      detail:
        'Each `intent.*.bg` fills a distinct NES swatch: primary `#0000fc` (sky), success `#00a800` (leaf), ' +
        'danger `#d82800` (brick), warning `#fcfc00` (coin), info `#3cbcfc`. Every intent border is `#fcfcfc` ' +
        '("outline white" — the cue the original sprites used to separate from background).',
    },
    {
      label: 'Press Start 2P routed through every typography role',
      detail:
        '`typography.family.{ui,display,mono,pixel,hand}` all resolve to `"Press Start 2P", "VT323", ui-monospace`. ' +
        'Sizes are integer multiples of 8 CSS px (0.5rem / 1rem / 1.5rem / 2rem). Every other palette aliases ' +
        '`family.pixel` to its own `ui` stack, so this is the only one where the slot is load-bearing.',
    },
    {
      label: 'Zero rounding everywhere — `radius.*` is `0`',
      detail:
        'Including `pill` and `full`. Components that ask for a circle render as a square sprite under this engine. ' +
        'That contrast (Avatar / Toggle / Loading-spinner) is intentional teaching content — see the README\'s ' +
        '"What thrives vs degrades" section.',
    },
    {
      label: 'Hard offset block shadows — no penumbra',
      detail:
        '`elevation.low` is `4px 4px 0 #000000`. `medium` and `high` stack a second / third offset shadow in ' +
        'lighter shades to suggest depth without anti-aliasing. The 4-step grid alignment matches `space.*`.',
    },
    {
      label: 'NTSC-frame motion: `32ms / 64ms / 128ms` with `steps(1, end)` easing',
      detail:
        'Durations are 2 / 4 / 8 NTSC frames at 60 Hz (~16.67 ms / frame). Every `motion.easing.*` slot is ' +
        '`steps(1, end)` — sprites don\'t ease between frames, they snap. Under `prefers-reduced-motion` the ' +
        'engine collapses every duration to `instant`.',
    },
    {
      label: '`effect.pixelGrid` set to `8px` (the load-bearing engine slot)',
      detail:
        'The engine reads this at the palette root, sets `image-rendering: pixelated`, disables font smoothing, ' +
        'and anchors `space.*` / `radius.*` to integer multiples. Every non-pixel palette returns `\'0\'`, which ' +
        'the engine CSS reads as "no snap" — i.e. the rule is a no-op there.',
    },
  ],
  antiSignatures: [
    'Rounded corners — `radius.sm/md/lg/pill/full` all collapse to `0`',
    'Anti-aliased curves, gradients, or soft shadows',
    'Sub-pixel rendering or sub-pixel borders (`0.5px`)',
    'System UI or sans-serif typography on body / label / caption',
    'Smooth (non-stepped) easing curves like `cubic-bezier(0.2, 0, 0, 1)`',
    'Alpha-blended translucent surfaces (NES had no alpha)',
  ],
  tokenEvidence: [
    {
      path: 'effect.pixelGrid',
      note: '`8px` — the engine\'s grid step. The load-bearing slot the engine reads to snap rendering.',
    },
    {
      path: 'typography.family.pixel',
      note: 'Press Start 2P stack — routed through every `role.*` here, aliased to `ui` on every other palette.',
    },
    {
      path: 'radius.lg',
      note: '`0` — every radius slot is zero, including `pill` and `full`. Circles render as squares.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`4px 4px 0 #000000` — hard offset, zero blur. The pixel-art elevation recipe.',
    },
    {
      path: 'motion.duration.fast',
      note: '`32ms` — two NTSC frames at 60 Hz. Every duration is an integer frame count.',
    },
    {
      path: 'motion.easing.standard',
      note: '`steps(1, end)` — sprite-snap easing. Same value at every easing slot.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#0000fc` — NES "sky" from the NTSC 2C02 master palette.',
    },
  ],
  lookalikes: [
    {
      against: 'pixel-art-gameboy',
      differentiator:
        'Game Boy is the 4-shade green-monochrome register on the same pixel-art engine (DMG-01 LCD): every colour is one of four greens, every intent uses the same green family, and `surface.base` is the green-cream. NES (this palette) commits to full NTSC colour — six distinct intent hues.',
    },
    {
      against: 'pixel-art-snes',
      differentiator:
        'SNES is the 16-bit successor register — wider colour space (PPU could mix from 32,768 colours), softer pastel intents, and `space.*` still on the 8-grid but sized for higher-resolution layouts. NES (this palette) sticks to the 54-colour master palette and the 8-bit sprite cell.',
    },
    {
      against: 'pixel-art-pico8',
      differentiator:
        'PICO-8 is the fantasy-console register — only 16 fixed colours, `effect.pixelGrid` at `4px` rather than `8px`, and a different stylised palette (pink, peach, lime) rather than NES master. NES is hardware-historical; PICO-8 is hardware-fantasy.',
    },
    {
      against: 'crt-phosphor-green',
      differentiator:
        'CRT/Phosphor renders as a green-on-black terminal with scanlines (`effect.overlay.image` is non-`none`) and phosphor decay on motion (`motion.decay` ≈ `80ms`). NES has no scanlines, no decay — sprites snap and the screen is a flat field, not a CRT face.',
    },
  ],
  thrivesWith: [
    'Kanban / card grids — the 8px grid, hard offsets, and square corners read exactly like a Game Boy / NES menu',
    'Button, Toggle, Checkbox, Stepper — the brief\'s controls. Pixel fonts at 8/12 CSS px on a yellow `#fcfc00` focus ring is the look',
    'Pagination, Segmented, Tabs — text-only controls with block fills and integer-pixel separators',
    'Toast, Modal, Drawer — the block shadow stack reads as a sprite overlay',
  ],
  degradesWith: [
    'Spatial canvas — assumes arbitrary fractional positions, lands off-grid, cards visibly jitter against the bitmap field',
    'Bezier editor — sub-pixel control points + anti-aliased curve render pixelated; the math is right but the affordance reads as wrong',
    'Slider — the thumb\'s hover transform translates by 1px increments and feels stepped at fractional widths',
    'DiffView with character-level highlight — `radius.sm` collapses to `0`, so highlights become hard rectangles instead of pills',
    'Multi-line wrapped paragraphs at narrow widths — bitmap glyphs at a fixed width produce visibly cramped line breaks',
  ],
  recallAliases: ['nes', 'pixel art nes', 'pixel-art-nes', '8-bit', '8 bit', 'nintendo', 'pixel'],
}
