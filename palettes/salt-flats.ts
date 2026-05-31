import type { Palette } from '../tokens/semantic.contract'

/**
 * Salt Flats — the Bonneville / Uyuni register on the Flat engine. A
 * blinding mineral-white field that runs to the horizon, basalt-dark ink,
 * and the trace-element colours a salt crust actually leaves: alkali sage,
 * sun-baked ochre, oxidised rust, and a cool brine blue. The space scale
 * runs wide — the look is mostly emptiness with a few mineral marks in it.
 */
export const palette: Palette = {
  id: 'salt-flats',
  name: 'Salt Flats',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f7f6f3',
        raised: '#ffffff',
        sunken: '#ecebe6',
        overlay: '#ffffff',
        scrim: 'rgba(42, 39, 35, 0.32)',
      },
      content: {
        primary: '#2a2723',
        secondary: '#5c574e',
        muted: '#918a7d',
        inverse: '#ffffff',
        link: '#b5683c',
      },
      border: {
        subtle: '#e7e5de',
        default: '#cdc9bf',
        strong: '#2a2723',
        focus: '#3a6b78',
      },
      intent: {
        primary: { bg: '#3a6b78', content: '#ffffff', border: '#2c5662', bgHover: '#447a88', bgActive: '#2c5662' },
        neutral: { bg: '#ecebe6', content: '#2a2723', border: '#cdc9bf', bgHover: '#e0ded7', bgActive: '#d2cfc4' },
        success: { bg: '#cdd9c5', content: '#2c3a25', border: '#abbd9f', bgHover: '#bfcdb5', bgActive: '#abbd9f' },
        warning: { bg: '#ecd9b0', content: '#493b1c', border: '#d4bd87', bgHover: '#e2cb9b', bgActive: '#d4bd87' },
        danger:  { bg: '#a84a32', content: '#ffffff', border: '#883a27', bgHover: '#ba5740', bgActive: '#883a27' },
        info:    { bg: '#c9d6dd', content: '#243038', border: '#a4b8c2', bgHover: '#bacad3', bgActive: '#a4b8c2' },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '14px',
      '4': '20px',
      '5': '32px',
      '6': '48px',
      '7': '72px',
      '8': '104px',
    },
    radius: {
      none: '0',
      sm: '3px',
      md: '6px',
      lg: '10px',
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
      low: { boxShadow: '0 1px 2px rgba(42, 39, 35, 0.06)' },
      medium: { boxShadow: '0 4px 12px rgba(42, 39, 35, 0.07), 0 1px 3px rgba(42, 39, 35, 0.05)' },
      high: { boxShadow: '0 12px 28px rgba(42, 39, 35, 0.09), 0 4px 8px rgba(42, 39, 35, 0.05)' },
      overlay: { boxShadow: '0 28px 56px rgba(42, 39, 35, 0.14), 0 10px 16px rgba(42, 39, 35, 0.07)' },
    },
    typography: {
      family: {
        ui: '"Söhne", "Inter", "Helvetica Neue", system-ui, Arial, sans-serif',
        display: '"GT America", "Söhne", "Inter", "Helvetica Neue", system-ui, sans-serif',
        mono: '"GT America Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Söhne", "Inter", system-ui, sans-serif',
        hand: '"Söhne", "Inter", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3.25rem',  weight: 600, lineHeight: '1.05', tracking: '-0.03em' },
        title:      { family: 'display', size: '2.125rem', weight: 600, lineHeight: '1.15', tracking: '-0.02em' },
        heading:    { family: 'display', size: '1.375rem', weight: 600, lineHeight: '1.3',  tracking: '-0.01em' },
        subheading: { family: 'ui',      size: '1rem',     weight: 500, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.65', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 500, lineHeight: '1.4',  tracking: '0.04em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.45', tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '160ms',
        base: '280ms',
        slow: '440ms',
      },
      easing: {
        standard: 'cubic-bezier(0.22, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.22, 0, 0, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '3px', color: '#3a6b78', style: 'solid' },
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
