import type { Palette } from '../tokens/semantic.contract'

/**
 * Pixel-art (NES) — the canonical 8-bit console register. Colours are
 * lifted from the NES master palette (NTSC 2C02): sky `#0000fc`, leaf
 * `#00a800`, brick `#d82800`, coin `#fcfc00`, plus `#000000` / `#fcfcfc`.
 *
 * Anchored on the new `pixel-art` engine. The engine exercises two
 * contract slots no previous palette put to work:
 *
 *   - `effect.pixelGrid`     — the layout step (`'8px'` here).
 *   - `typography.family.pixel` — the bundled pixel-font stack.
 *
 * Every `space.*` and `radius.*` value is an integer multiple of the
 * grid (0, 4, 8, 16, 24, 32, 48, 64, 96), so any composition
 * components produce already lands on integer pixel boundaries. Radii
 * are `'0'` across the board — the brief is explicit: no anti-aliased
 * corners.
 */
export const palette: Palette = {
  id: 'pixel-art-nes',
  name: 'Pixel Art (NES)',
  engine: 'pixel-art',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#000000',
        raised: '#1c1c1c',
        sunken: '#000000',
        overlay: '#1c1c1c',
        scrim: 'rgba(0, 0, 0, 0.82)',
      },
      content: {
        primary: '#fcfcfc',
        secondary: '#bcbcbc',
        muted: '#7c7c7c',
        inverse: '#000000',
        link: '#3cbcfc',
      },
      border: {
        subtle: '#7c7c7c',
        default: '#bcbcbc',
        strong: '#fcfcfc',
        focus: '#fcfc00',
      },
      intent: {
        // Each intent fills a different NES master-palette swatch. The
        // borders go to `#fcfcfc` (the "outline white" the original
        // sprites used) and content to `#000000` or `#fcfcfc` per
        // contrast. No alpha — NES had none.
        primary: {
          bg: '#0000fc',
          content: '#fcfcfc',
          border: '#fcfcfc',
          bgHover: '#0058f8',
          bgActive: '#0040a0',
        },
        neutral: {
          bg: '#7c7c7c',
          content: '#fcfcfc',
          border: '#fcfcfc',
          bgHover: '#bcbcbc',
          bgActive: '#545454',
        },
        success: {
          bg: '#00a800',
          content: '#fcfcfc',
          border: '#fcfcfc',
          bgHover: '#00b800',
          bgActive: '#007800',
        },
        warning: {
          bg: '#fcfc00',
          content: '#000000',
          border: '#fcfcfc',
          bgHover: '#fce064',
          bgActive: '#bcbc00',
        },
        danger: {
          bg: '#d82800',
          content: '#fcfcfc',
          border: '#fcfcfc',
          bgHover: '#f83800',
          bgActive: '#a81000',
        },
        info: {
          bg: '#3cbcfc',
          content: '#000000',
          border: '#fcfcfc',
          bgHover: '#60a8fc',
          bgActive: '#0078f8',
        },
      },
    },
    // Every value is an integer multiple of the 8px grid. The `1`
    // half-step is kept at 4px because a strict 8-multiple ladder
    // pushes inline gaps too wide — 4px is still grid-aligned at the
    // 4x sub-step, which the engine's `--pixel-grid: '8px'` accepts.
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '16px',
      '4': '16px',
      '5': '24px',
      '6': '32px',
      '7': '48px',
      '8': '64px',
    },
    // No rounding — every radius slot is `'0'`. The brief is unambiguous:
    // pixel corners are stepped or square. `pill` and `full` collapse to
    // `'0'` too, which means components that ask for circles still get
    // square sprites under this engine (intentional contrast — see
    // README, "What thrives vs degrades").
    radius: {
      none: '0',
      sm: '0',
      md: '0',
      lg: '0',
      pill: '0',
      full: '0',
    },
    // Border widths step in whole pixels. There is no `0.5px` — sub-pixel
    // rendering is disabled at the engine level.
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '2px',
      thick: '2px',
      heavy: '4px',
    },
    // No soft drop shadows — NES sprites had no penumbra. `low` and
    // `medium` use a 4px hard offset (the closest analog to a sprite
    // shadow); `high` and `overlay` add a second offset stack so modals
    // still read as elevated.
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '4px 4px 0 #000000' },
      medium: { boxShadow: '4px 4px 0 #000000, 8px 8px 0 #7c7c7c' },
      high: { boxShadow: '4px 4px 0 #000000, 8px 8px 0 #7c7c7c, 12px 12px 0 #bcbcbc' },
      overlay: { boxShadow: '0 0 0 4px #000000, 8px 8px 0 #000000' },
    },
    typography: {
      family: {
        // `ui` / `display` / `mono` all route to the pixel font so every
        // role renders as bitmap. `monospace` fallback keeps glyphs
        // grid-aligned if the WOFF fails to load.
        ui: '"Press Start 2P", "VT323", ui-monospace, monospace',
        display: '"Press Start 2P", "VT323", ui-monospace, monospace',
        mono: '"Press Start 2P", "VT323", ui-monospace, monospace',
        pixel: '"Press Start 2P", "VT323", ui-monospace, monospace',
        hand: '"Press Start 2P", "VT323", ui-monospace, monospace',
      },
      // Press Start 2P is designed at an 8px cell. Sizes here are integer
      // multiples (8, 16, 24, 32...) expressed in rem assuming a 16px root.
      // 0.5rem = 8px, 1rem = 16px, 1.5rem = 24px, 2rem = 32px.
      role: {
        display:    { family: 'pixel', size: '2rem',   weight: 400, lineHeight: '1.5', tracking: '0' },
        title:      { family: 'pixel', size: '1.5rem', weight: 400, lineHeight: '1.5', tracking: '0' },
        heading:    { family: 'pixel', size: '1rem',   weight: 400, lineHeight: '1.5', tracking: '0' },
        subheading: { family: 'pixel', size: '1rem',   weight: 400, lineHeight: '1.5', tracking: '0' },
        body:       { family: 'pixel', size: '0.75rem',weight: 400, lineHeight: '1.6', tracking: '0' },
        label:      { family: 'pixel', size: '0.5rem', weight: 400, lineHeight: '1.6', tracking: '0' },
        caption:    { family: 'pixel', size: '0.5rem', weight: 400, lineHeight: '1.6', tracking: '0' },
        code:       { family: 'pixel', size: '0.75rem',weight: 400, lineHeight: '1.6', tracking: '0' },
      },
    },
    motion: {
      // 60 Hz NTSC frame is ~16.67ms — multiples of one frame are the
      // canonical "feels right" durations. `instant` is a single frame
      // visible-state delay, `fast` two frames, `base` four, `slow` eight.
      duration: {
        instant: '0ms',
        fast: '32ms',
        base: '64ms',
        slow: '128ms',
      },
      // Linear easing — sprites don't ease, they snap from frame to frame.
      easing: {
        standard: 'steps(1, end)',
        in: 'steps(1, end)',
        out: 'steps(1, end)',
        inOut: 'steps(1, end)',
        spring: 'steps(1, end)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      // Yellow flashing focus block — `solid` because the engine reads
      // `outline-style` literally, and pixel-art has no "glow" sense.
      // Width is one pixel-grid step so the ring lands on the grid.
      focusRing: { width: '4px', offset: '0', color: '#fcfc00', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      // The grid step. The engine reads this at the palette root and
      // sets `image-rendering: pixelated` plus font-smoothing-none. Every
      // non-pixel palette returns `'0'`, which the engine CSS treats as
      // "no snap" — i.e. the rule is a no-op there.
      pixelGrid: '8px',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      // Aurora engine no-op signals. `atmosphereGradient: 'none'` and
      // `luminanceCenter: 'transparent'` mean the engine CSS that paints
      // the gradient and luminance glow at `.palette-root[data-palette^='aurora']`
      // doesn't paint here. `surfaceBy: 'border'` records that this palette
      // demarcates surfaces with a stroke (the default), not with light density.
      atmosphereGradient: 'none',
      luminanceCenter: 'transparent',
      surfaceBy: 'border',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
