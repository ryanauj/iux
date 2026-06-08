import type { Palette } from '../tokens/semantic.contract'

/**
 * Nova Vanguard — the optimistic hero-shooter register on the
 * glassmorphism engine, in daylight. A bright, friendly objective-HUD
 * read: cool near-white field, translucent panels, a warm hero-orange
 * primary, and a confident team-blue info — the two-colour hero/objective
 * language of squad shooters. Inspired by the welcoming, high-saturation
 * HUDs of hero shooters (Overwatch, Apex Legends) rendered light and
 * airy rather than dark and cinematic.
 *
 *   sky field:      #f9fbfe
 *   glass panel:    rgba(255, 255, 255, 0.58)
 *   hero orange:    #f97316  (primary / focus)
 *   team blue:      #2563eb  (info)
 *   ink (text):     #13243a
 */
export const palette: Palette = {
  id: 'nova-vanguard',
  name: 'Nova Vanguard',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f9fbfe',
        raised: 'rgba(255, 255, 255, 0.58)',
        sunken: 'rgba(19, 36, 58, 0.05)',
        overlay: 'rgba(255, 255, 255, 0.80)',
        scrim: 'rgba(15, 30, 55, 0.32)',
      },
      content: {
        primary: '#13243a',
        secondary: 'rgba(19, 36, 58, 0.72)',
        muted: 'rgba(19, 36, 58, 0.50)',
        inverse: '#f9fbfe',
        link: '#ea6a16',
      },
      border: {
        subtle: 'rgba(19, 36, 58, 0.12)',
        default: 'rgba(19, 36, 58, 0.22)',
        strong: 'rgba(249, 115, 22, 0.62)',
        focus: '#f97316',
      },
      intent: {
        primary: { bg: 'rgba(249, 115, 22, 0.50)', content: '#7c2d12', border: '#f97316', bgHover: 'rgba(249, 115, 22, 0.60)', bgActive: 'rgba(249, 115, 22, 0.70)' },
        neutral: { bg: 'rgba(19, 36, 58, 0.10)', content: '#13243a', border: 'rgba(19, 36, 58, 0.24)', bgHover: 'rgba(19, 36, 58, 0.16)', bgActive: 'rgba(19, 36, 58, 0.22)' },
        success: { bg: 'rgba(22, 163, 74, 0.44)', content: '#14532d', border: '#16a34a', bgHover: 'rgba(22, 163, 74, 0.54)', bgActive: 'rgba(22, 163, 74, 0.64)' },
        warning: { bg: 'rgba(234, 179, 8, 0.48)', content: '#713f12', border: '#eab308', bgHover: 'rgba(234, 179, 8, 0.58)', bgActive: 'rgba(234, 179, 8, 0.68)' },
        danger:  { bg: 'rgba(220, 38, 38, 0.46)', content: '#7a1313', border: '#dc2626', bgHover: 'rgba(220, 38, 38, 0.56)', bgActive: 'rgba(220, 38, 38, 0.66)' },
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
      sm: '4px',
      md: '8px',
      lg: '14px',
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(19, 36, 58, 0.10)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(19, 36, 58, 0.12), 0 1px 3px rgba(15, 30, 55, 0.08), 0 0 8px rgba(249, 115, 22, 0.08)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(19, 36, 58, 0.14), 0 4px 12px rgba(15, 30, 55, 0.10), 0 0 16px rgba(249, 115, 22, 0.10)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(19, 36, 58, 0.16), 0 8px 24px rgba(15, 30, 55, 0.12), 0 0 24px rgba(249, 115, 22, 0.12)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(19, 36, 58, 0.18), 0 24px 60px rgba(15, 30, 55, 0.20), 0 0 36px rgba(249, 115, 22, 0.14)' },
    },
    typography: {
      family: {
        ui: '"Chakra Petch", "Rajdhani", "Inter", system-ui, sans-serif',
        display: '"Chakra Petch", "Rajdhani", "Inter", system-ui, sans-serif',
        mono: '"Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Chakra Petch", "Rajdhani", "Inter", system-ui, sans-serif',
        hand: '"Chakra Petch", "Rajdhani", "Inter", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 700, lineHeight: '1.08', tracking: '0.02em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.875rem', weight: 700, lineHeight: '1.18', tracking: '0.02em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.25rem',  weight: 600, lineHeight: '1.3',  tracking: '0.02em' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.45', tracking: '0.03em' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.55', tracking: '0.01em' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4',  tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4',  tracking: '0.04em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0.02em' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '90ms',
        base: '170ms',
        slow: '290ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#f97316', style: 'glow' },
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
