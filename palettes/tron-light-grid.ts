import type { Palette } from '../tokens/semantic.contract'

/**
 * Tron / Light-Grid — the daylight inversion of `tron-dark-neon`. Same
 * glassmorphism engine, same single-cyan identity, but the near-black
 * field flips to a cool near-white and the neon becomes deep cyan "ink"
 * — the lightcycle grid rendered as a blueprint on white paper instead
 * of a glowing HUD. Raised surfaces stay translucent cyan glass,
 * elevation keeps a restrained cyan glow (dialed down so it reads on a
 * bright field), and `effect.focusRing.style = 'glow'` keeps the
 * focus-as-halo behaviour. Mono `code` typography stays uppercased.
 */
export const palette: Palette = {
  id: 'tron-light-grid',
  name: 'Tron / Light-Grid',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#fbfdff',
        raised: 'rgba(8, 145, 178, 0.14)',
        sunken: 'rgba(8, 145, 178, 0.08)',
        overlay: 'rgba(255, 255, 255, 0.74)',
        scrim: 'rgba(15, 23, 42, 0.32)',
      },
      content: {
        primary: '#083344',
        secondary: 'rgba(8, 51, 68, 0.74)',
        muted: 'rgba(8, 51, 68, 0.52)',
        inverse: '#f2f7fb',
        link: '#0e7490',
      },
      border: {
        subtle: 'rgba(14, 116, 144, 0.32)',
        default: 'rgba(14, 116, 144, 0.52)',
        strong: 'rgba(14, 116, 144, 0.74)',
        focus: '#0891b2',
      },
      intent: {
        primary: { bg: 'rgba(8, 145, 178, 0.42)', content: '#083344', border: '#0891b2', bgHover: 'rgba(8, 145, 178, 0.52)', bgActive: 'rgba(8, 145, 178, 0.62)' },
        neutral: { bg: 'rgba(8, 51, 68, 0.12)', content: '#083344', border: 'rgba(14, 116, 144, 0.36)', bgHover: 'rgba(8, 51, 68, 0.18)', bgActive: 'rgba(8, 51, 68, 0.24)' },
        success: { bg: 'rgba(22, 163, 74, 0.42)', content: '#14532d', border: '#16a34a', bgHover: 'rgba(22, 163, 74, 0.52)', bgActive: 'rgba(22, 163, 74, 0.62)' },
        warning: { bg: 'rgba(202, 138, 4, 0.42)', content: '#713f12', border: '#ca8a04', bgHover: 'rgba(202, 138, 4, 0.52)', bgActive: 'rgba(202, 138, 4, 0.62)' },
        danger:  { bg: 'rgba(225, 29, 72, 0.42)', content: '#881337', border: '#e11d48', bgHover: 'rgba(225, 29, 72, 0.52)', bgActive: 'rgba(225, 29, 72, 0.62)' },
        info:    { bg: 'rgba(2, 132, 199, 0.42)', content: '#0c4a6e', border: '#0284c7', bgHover: 'rgba(2, 132, 199, 0.52)', bgActive: 'rgba(2, 132, 199, 0.62)' },
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
      lg: '8px',
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(14, 116, 144, 0.28)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(14, 116, 144, 0.34), 0 1px 3px rgba(15, 23, 42, 0.08), 0 0 8px rgba(8, 145, 178, 0.10)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(14, 116, 144, 0.42), 0 4px 12px rgba(15, 23, 42, 0.10), 0 0 16px rgba(8, 145, 178, 0.12)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(14, 116, 144, 0.50), 0 8px 24px rgba(15, 23, 42, 0.12), 0 0 24px rgba(8, 145, 178, 0.14)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(14, 116, 144, 0.58), 0 24px 60px rgba(15, 23, 42, 0.20), 0 0 36px rgba(8, 145, 178, 0.16)' },
    },
    typography: {
      family: {
        ui: '"Orbitron", "Eurostile", "Helvetica Neue", Helvetica, Arial, sans-serif',
        display: '"Orbitron", "Eurostile", "Helvetica Neue", Helvetica, Arial, sans-serif',
        mono: '"Share Tech Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
        pixel: '"Orbitron", "Eurostile", "Helvetica Neue", Helvetica, Arial, sans-serif',
        hand: '"Orbitron", "Eurostile", "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 700, lineHeight: '1.1',  tracking: '0.04em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.875rem',weight: 700, lineHeight: '1.2',  tracking: '0.04em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.25rem', weight: 600, lineHeight: '1.3',  tracking: '0.04em', textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',    weight: 600, lineHeight: '1.4',  tracking: '0.04em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.5', tracking: '0.02em' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4', tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0.08em', textTransform: 'uppercase' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0.05em', textTransform: 'uppercase' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '80ms',
        base: '160ms',
        slow: '280ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'blur(4px)', md: 'blur(10px)', lg: 'blur(20px)' },
      focusRing: { width: '2px', offset: '2px', color: '#0891b2', style: 'glow' },
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
