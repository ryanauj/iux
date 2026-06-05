import type { Palette } from '../tokens/semantic.contract'

/**
 * Apothecary Herbarium — the vintage-pharmacy register on the Flat engine.
 * Aged-label cream stock, sepia-black letterpress ink, botanical tincture
 * green, and the amber-glass brown of a dispensary bottle. The type is a
 * classic transitional serif — a printed pharmacopoeia label, not an app.
 */
export const palette: Palette = {
  id: 'apothecary-herbarium',
  name: 'Apothecary Herbarium',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f0e9d8',
        raised: '#f7f1e2',
        sunken: '#e6dcc4',
        overlay: '#faf5e8',
        scrim: 'rgba(44, 42, 31, 0.45)',
      },
      content: {
        primary: '#2c2a1f',
        secondary: '#54503c',
        muted: '#847d63',
        inverse: '#f7f1e2',
        link: '#7a5a2c',
      },
      border: {
        subtle: '#e0d6bd',
        default: '#c4b694',
        strong: '#2c2a1f',
        focus: '#2f5d3a',
      },
      intent: {
        primary: { bg: '#2f5d3a', content: '#f7f1e2', border: '#234729', bgHover: '#386c45', bgActive: '#234729' },
        neutral: { bg: '#e6dcc4', content: '#2c2a1f', border: '#c4b694', bgHover: '#dccfb1', bgActive: '#c4b694' },
        success: { bg: '#4a7340', content: '#f7f1e2', border: '#395c30', bgHover: '#558048', bgActive: '#395c30' },
        warning: { bg: '#d9b25a', content: '#3a2c0c', border: '#bf9740', bgHover: '#e0bd6e', bgActive: '#bf9740' },
        danger:  { bg: '#9c3526', content: '#f7f1e2', border: '#7c281b', bgHover: '#ad4031', bgActive: '#7c281b' },
        info:    { bg: '#3f6273', content: '#f7f1e2', border: '#304c5a', bgHover: '#496f82', bgActive: '#304c5a' },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '24px',
      '6': '32px',
      '7': '48px',
      '8': '64px',
    },
    radius: {
      none: '0',
      sm: '2px',
      md: '3px',
      lg: '5px',
      pill: '999px',
      full: '9999px',
    },
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '1px',
      thick: '2px',
      heavy: '3px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '0 1px 2px rgba(44, 42, 31, 0.10)' },
      medium: { boxShadow: '0 3px 8px rgba(44, 42, 31, 0.12), 0 1px 2px rgba(44, 42, 31, 0.08)' },
      high: { boxShadow: '0 10px 20px rgba(44, 42, 31, 0.16), 0 3px 6px rgba(44, 42, 31, 0.10)' },
      overlay: { boxShadow: '0 22px 40px rgba(44, 42, 31, 0.24), 0 8px 14px rgba(44, 42, 31, 0.14)' },
    },
    typography: {
      family: {
        ui: '"Spectral", "Source Serif 4", "Hoefler Text", Georgia, "Times New Roman", serif',
        display: '"Spectral", "Source Serif 4", "Hoefler Text", Georgia, "Times New Roman", serif',
        mono: '"Spectral", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Spectral", Georgia, serif',
        hand: '"Spectral", Georgia, serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 700, lineHeight: '1.1',  tracking: '0.01em' },
        title:      { family: 'display', size: '2rem',     weight: 600, lineHeight: '1.2',  tracking: '0.01em' },
        heading:    { family: 'display', size: '1.375rem', weight: 600, lineHeight: '1.3',  tracking: '0.02em', textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1.0625rem',weight: 600, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1.0625rem',weight: 400, lineHeight: '1.65', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4',  tracking: '0.1em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.45', tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '240ms',
        slow: '380ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.2, 0, 0, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#2f5d3a', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
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
