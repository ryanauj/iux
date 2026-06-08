import type { Palette } from '../tokens/semantic.contract'

/**
 * Mirror Runner — the clean-city first-person register on the
 * glassmorphism engine. A sunlit rooftop: near-white field, translucent
 * neutral-glass panels, a hot runner-red primary and glow focus ring,
 * and a cool sign-blue secondary (links, info) — the red-and-blue
 * wayfinding of a bright parkour city, not a single-red wash.
 *
 *   sunlit field:   #f6f8fb
 *   glass panel:    rgba(255, 255, 255, 0.55)
 *   runner red:     #e8392f  (primary / focus)
 *   sign blue:      #2563eb  (accent — links, info)
 *   ink (text):     #15191f
 */
export const palette: Palette = {
  id: 'mirror-runner',
  name: 'Mirror Runner',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f6f8fb',
        raised: 'rgba(255, 255, 255, 0.55)',
        sunken: 'rgba(21, 25, 31, 0.05)',
        overlay: 'rgba(255, 255, 255, 0.80)',
        scrim: 'rgba(20, 24, 30, 0.32)',
      },
      content: {
        primary: '#15191f',
        secondary: 'rgba(21, 25, 31, 0.72)',
        muted: 'rgba(21, 25, 31, 0.50)',
        inverse: '#fbfcfe',
        link: '#2563eb',
      },
      border: {
        subtle: 'rgba(21, 25, 31, 0.12)',
        default: 'rgba(21, 25, 31, 0.22)',
        strong: 'rgba(232, 57, 47, 0.62)',
        focus: '#e8392f',
      },
      intent: {
        primary: { bg: 'rgba(232, 57, 47, 0.48)', content: '#7a1410', border: '#e8392f', bgHover: 'rgba(232, 57, 47, 0.58)', bgActive: 'rgba(232, 57, 47, 0.68)' },
        neutral: { bg: 'rgba(21, 25, 31, 0.10)', content: '#15191f', border: 'rgba(21, 25, 31, 0.24)', bgHover: 'rgba(21, 25, 31, 0.16)', bgActive: 'rgba(21, 25, 31, 0.22)' },
        success: { bg: 'rgba(22, 163, 74, 0.42)', content: '#14532d', border: '#16a34a', bgHover: 'rgba(22, 163, 74, 0.52)', bgActive: 'rgba(22, 163, 74, 0.62)' },
        warning: { bg: 'rgba(217, 119, 6, 0.44)', content: '#713f12', border: '#d97706', bgHover: 'rgba(217, 119, 6, 0.54)', bgActive: 'rgba(217, 119, 6, 0.64)' },
        danger:  { bg: 'rgba(190, 18, 60, 0.46)', content: '#7a0f25', border: '#be123c', bgHover: 'rgba(190, 18, 60, 0.56)', bgActive: 'rgba(190, 18, 60, 0.66)' },
        info:    { bg: 'rgba(37, 99, 235, 0.44)', content: '#1e3a8a', border: '#2563eb', bgHover: 'rgba(37, 99, 235, 0.54)', bgActive: 'rgba(37, 99, 235, 0.64)' },
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(21, 25, 31, 0.10)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(21, 25, 31, 0.12), 0 1px 3px rgba(20, 24, 30, 0.08)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(21, 25, 31, 0.14), 0 4px 12px rgba(20, 24, 30, 0.10)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(21, 25, 31, 0.16), 0 8px 24px rgba(20, 24, 30, 0.12)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(21, 25, 31, 0.18), 0 24px 60px rgba(20, 24, 30, 0.20)' },
    },
    typography: {
      family: {
        ui: '"Exo 2", "Inter", "Helvetica Neue", system-ui, sans-serif',
        display: '"Exo 2", "Inter", "Helvetica Neue", system-ui, sans-serif',
        mono: '"Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Exo 2", "Inter", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Exo 2", "Inter", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 700, lineHeight: '1.08', tracking: '0.02em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.875rem', weight: 600, lineHeight: '1.18', tracking: '0.02em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.25rem',  weight: 600, lineHeight: '1.3',  tracking: '0.02em' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.45', tracking: '0.02em' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.55', tracking: '0.01em' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4',  tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4',  tracking: '0.04em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0.02em' },
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
        spring: 'cubic-bezier(0.34, 1.5, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'blur(4px)', md: 'blur(10px)', lg: 'blur(20px)' },
      focusRing: { width: '2px', offset: '2px', color: '#e8392f', style: 'glow' },
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
