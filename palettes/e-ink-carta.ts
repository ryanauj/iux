import type { Palette } from '../tokens/semantic.contract'

/**
 * E-Ink Carta — the electrophoretic e-reader register on the Flat engine.
 * Not "white": a warm paper-grey field (`#e8e6df`) the way a Kindle
 * Paperwhite / Kobo Carta panel actually reads, with near-black ink and a
 * single brick-red highlight (the one chromatic move e-ink hardware can
 * make). Body is a reading serif; the intents stay almost monochrome —
 * faint duotone tints distinguished by lightness rather than hue, which is
 * exactly the legibility model of a 16-greyscale display.
 */
export const palette: Palette = {
  id: 'e-ink-carta',
  name: 'E-Ink Carta',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#e8e6df',
        raised: '#f2f1ea',
        sunken: '#dcdad1',
        overlay: '#f6f5ef',
        scrim: 'rgba(26, 26, 23, 0.42)',
      },
      content: {
        primary: '#1a1a17',
        secondary: '#43423c',
        muted: '#76746a',
        inverse: '#f6f5ef',
        link: '#9a2f28',
      },
      border: {
        subtle: '#d2d0c6',
        default: '#b3b1a5',
        strong: '#1a1a17',
        focus: '#9a2f28',
      },
      intent: {
        primary: { bg: '#2b2b27', content: '#f6f5ef', border: '#1a1a17', bgHover: '#3a3a34', bgActive: '#1a1a17' },
        neutral: { bg: '#dcdad1', content: '#1a1a17', border: '#b3b1a5', bgHover: '#d0cec3', bgActive: '#c2c0b3' },
        success: { bg: '#d8ddd0', content: '#28321f', border: '#bcc4af', bgHover: '#ccd2c2', bgActive: '#bcc4af' },
        warning: { bg: '#e7ddc8', content: '#3c331c', border: '#cfc2a3', bgHover: '#ddd1b7', bgActive: '#cfc2a3' },
        danger:  { bg: '#9a2f28', content: '#f6f5ef', border: '#7a201b', bgHover: '#ac3a32', bgActive: '#7a201b' },
        info:    { bg: '#d3d9df', content: '#21282f', border: '#b3bdc6', bgHover: '#c6cdd5', bgActive: '#b3bdc6' },
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
      md: '4px',
      lg: '6px',
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
      low: { boxShadow: '0 1px 0 rgba(26, 26, 23, 0.10)' },
      medium: { boxShadow: '0 1px 0 rgba(26, 26, 23, 0.14), 0 2px 4px rgba(26, 26, 23, 0.06)' },
      high: { boxShadow: '0 2px 0 rgba(26, 26, 23, 0.16), 0 6px 10px rgba(26, 26, 23, 0.08)' },
      overlay: { boxShadow: '0 3px 0 rgba(26, 26, 23, 0.18), 0 12px 20px rgba(26, 26, 23, 0.12)' },
    },
    typography: {
      family: {
        ui: '"Bitter", "Charter", "Iowan Old Style", Georgia, "Times New Roman", serif',
        display: '"Bitter", "Charter", "Iowan Old Style", Georgia, "Times New Roman", serif',
        mono: '"iA Writer Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Bitter", "Charter", Georgia, serif',
        hand: '"Bitter", "Charter", Georgia, serif',
      },
      role: {
        display:    { family: 'display', size: '2.5rem',   weight: 700, lineHeight: '1.15', tracking: '-0.01em' },
        title:      { family: 'display', size: '1.875rem', weight: 700, lineHeight: '1.25', tracking: '-0.005em' },
        heading:    { family: 'display', size: '1.25rem',  weight: 600, lineHeight: '1.35', tracking: '0' },
        subheading: { family: 'ui',      size: '1.0625rem',weight: 600, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1.0625rem',weight: 400, lineHeight: '1.7',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',  weight: 600, lineHeight: '1.4', tracking: '0.01em' },
        caption:    { family: 'ui',      size: '0.8125rem', weight: 400, lineHeight: '1.45',tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem',  weight: 400, lineHeight: '1.55',tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '120ms',
        base: '200ms',
        slow: '300ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#9a2f28', style: 'solid' },
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
