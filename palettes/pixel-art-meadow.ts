import type { Palette } from '../tokens/semantic.contract'

/**
 * Pixel Art (Meadow) — a light-ground register of the `pixel-art` engine,
 * sibling to Sky and Blossom: a pale mint field with a single dominant
 * green highlight carrying primary, focus, and links. Square corners,
 * Press Start 2P bitmap glyphs, hard offsets, `steps(1, end)` motion —
 * same engine as the NES / Game Boy / Cottagecore registers; only
 * `color.*` and `space.*` change.
 *
 * The green dominant is the "colour highlight" version of the
 * light-ground idea: a near-white ground with the saturation in the
 * accent, the other intents keeping conventional hues for legibility.
 * Ships `a11y: 'experimental'` with the rest of the pixel-art family.
 *
 *   meadow field:  #eaf6ea
 *   meadow frame:  #2f6b3f
 *   ink (text):    #18301f  — dark forest, not pure black
 *   accent green:  #2f9e44
 */
export const palette: Palette = {
  id: 'pixel-art-meadow',
  name: 'Pixel Art (Meadow)',
  engine: 'pixel-art',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#eaf6ea',
        raised: '#f3faf2',
        sunken: '#cfe6cf',
        overlay: '#eaf6ea',
        scrim: 'rgba(20, 50, 30, 0.62)',
      },
      content: {
        primary: '#18301f',
        secondary: '#35583f',
        muted: '#5c7d66',
        inverse: '#eaf6ea',
        link: '#2f7d4f',
      },
      border: {
        subtle: '#c6e2c6',
        default: '#6fae7f',
        strong: '#2f6b3f',
        focus: '#2f9e44',
      },
      intent: {
        primary: {
          bg: '#2f9e44',
          content: '#eaf6ea',
          border: '#18301f',
          bgHover: '#3fb454',
          bgActive: '#268038',
        },
        neutral: {
          bg: '#6fae7f',
          content: '#18301f',
          border: '#2f6b3f',
          bgHover: '#87c096',
          bgActive: '#57946a',
        },
        success: {
          bg: '#3fa34d',
          content: '#eaf6ea',
          border: '#18301f',
          bgHover: '#4fb85d',
          bgActive: '#2f8a3d',
        },
        warning: {
          bg: '#e0a82e',
          content: '#18301f',
          border: '#2f6b3f',
          bgHover: '#f0bb44',
          bgActive: '#c08f1e',
        },
        danger: {
          bg: '#d14b3c',
          content: '#eaf6ea',
          border: '#18301f',
          bgHover: '#e0603c',
          bgActive: '#b03828',
        },
        info: {
          bg: '#4878b8',
          content: '#eaf6ea',
          border: '#18301f',
          bgHover: '#608cd0',
          bgActive: '#305898',
        },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
      '6': '48px',
      '7': '64px',
      '8': '96px',
    },
    radius: {
      none: '0',
      sm: '0',
      md: '0',
      lg: '0',
      pill: '0',
      full: '0',
    },
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '2px',
      thick: '2px',
      heavy: '4px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '2px 2px 0 #2f6b3f' },
      medium: { boxShadow: '4px 4px 0 #2f6b3f' },
      high: { boxShadow: '4px 4px 0 #2f6b3f, 8px 8px 0 #6fae7f' },
      overlay: { boxShadow: '0 0 0 2px #18301f, 4px 4px 0 #2f6b3f' },
    },
    typography: {
      family: {
        ui: '"Press Start 2P", "VT323", ui-monospace, monospace',
        display: '"Press Start 2P", "VT323", ui-monospace, monospace',
        mono: '"Press Start 2P", "VT323", ui-monospace, monospace',
        pixel: '"Press Start 2P", "VT323", ui-monospace, monospace',
        hand: '"Press Start 2P", "VT323", ui-monospace, monospace',
      },
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
      duration: {
        instant: '0ms',
        fast: '32ms',
        base: '64ms',
        slow: '128ms',
      },
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
      focusRing: { width: '4px', offset: '0', color: '#2f9e44', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '8px',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      atmosphereGradient: 'none',
      luminanceCenter: 'transparent',
      surfaceBy: 'border',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
