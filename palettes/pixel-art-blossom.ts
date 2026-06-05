import type { Palette } from '../tokens/semantic.contract'

/**
 * Pixel Art (Blossom) — a light-ground register of the `pixel-art`
 * engine, sibling to Sky and Meadow: a pale rose field with a single
 * dominant pink highlight carrying primary, focus, and links. Square
 * corners, Press Start 2P bitmap glyphs, hard offsets, `steps(1, end)`
 * motion — same engine as the NES / Game Boy / Cottagecore registers;
 * only `color.*` and `space.*` change.
 *
 * The pink dominant is the "colour highlight" version of the
 * light-ground idea: a near-white ground with the saturation in the
 * accent, the other intents keeping conventional hues for legibility.
 * Ships `a11y: 'experimental'` with the rest of the pixel-art family.
 *
 *   blossom field:  #fbecf2
 *   blossom frame:  #a83a66
 *   ink (text):     #3a1428  — dark plum, not pure black
 *   accent pink:    #db2777
 */
export const palette: Palette = {
  id: 'pixel-art-blossom',
  name: 'Pixel Art (Blossom)',
  engine: 'pixel-art',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#fbecf2',
        raised: '#fef5f8',
        sunken: '#f3d4e0',
        overlay: '#fbecf2',
        scrim: 'rgba(60, 20, 40, 0.62)',
      },
      content: {
        primary: '#3a1428',
        secondary: '#5e3a4c',
        muted: '#8a5c70',
        inverse: '#fbecf2',
        link: '#be185d',
      },
      border: {
        subtle: '#f0ccdc',
        default: '#cf7fa0',
        strong: '#a83a66',
        focus: '#db2777',
      },
      intent: {
        primary: {
          bg: '#db2777',
          content: '#fbecf2',
          border: '#3a1428',
          bgHover: '#e84a91',
          bgActive: '#be185d',
        },
        neutral: {
          bg: '#cf7fa0',
          content: '#3a1428',
          border: '#a83a66',
          bgHover: '#dd97b3',
          bgActive: '#b86385',
        },
        success: {
          bg: '#3fa34d',
          content: '#fbecf2',
          border: '#3a1428',
          bgHover: '#4fb85d',
          bgActive: '#2f8a3d',
        },
        warning: {
          bg: '#e0a82e',
          content: '#3a1428',
          border: '#a83a66',
          bgHover: '#f0bb44',
          bgActive: '#c08f1e',
        },
        danger: {
          bg: '#d14b3c',
          content: '#fbecf2',
          border: '#3a1428',
          bgHover: '#e0603c',
          bgActive: '#b03828',
        },
        info: {
          bg: '#4878b8',
          content: '#fbecf2',
          border: '#3a1428',
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
      low: { boxShadow: '2px 2px 0 #a83a66' },
      medium: { boxShadow: '4px 4px 0 #a83a66' },
      high: { boxShadow: '4px 4px 0 #a83a66, 8px 8px 0 #cf7fa0' },
      overlay: { boxShadow: '0 0 0 2px #3a1428, 4px 4px 0 #a83a66' },
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
      focusRing: { width: '4px', offset: '0', color: '#db2777', style: 'solid' },
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
