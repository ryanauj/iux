import type { Palette } from '../tokens/semantic.contract'

/**
 * Tactical Recon — the competitive-tactical-shooter register on the
 * glassmorphism engine, in a bright agent-select read. Warm off-white
 * field, translucent panels, a hot agent-red as the primary action and
 * focus, and a spike-teal success that reads as the "defused / planted"
 * state colour. Inspired by the round-economy and agent HUDs of
 * tactical FPS games (Valorant, Rainbow Six) — crisp, high-contrast
 * accents over a near-neutral ground.
 *
 *   off-white field: #f6f5f3
 *   glass panel:     rgba(255, 255, 255, 0.60)
 *   agent red:       #ff4655  (primary / focus)
 *   spike teal:      #0d9488  (success)
 *   ink (text):      #1c1917
 */
export const palette: Palette = {
  id: 'tactical-recon',
  name: 'Tactical Recon',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f6f5f3',
        raised: 'rgba(255, 255, 255, 0.60)',
        sunken: 'rgba(28, 25, 23, 0.05)',
        overlay: 'rgba(255, 255, 255, 0.82)',
        scrim: 'rgba(28, 25, 23, 0.34)',
      },
      content: {
        primary: '#1c1917',
        secondary: 'rgba(28, 25, 23, 0.72)',
        muted: 'rgba(28, 25, 23, 0.50)',
        inverse: '#faf9f7',
        link: '#be123c',
      },
      border: {
        subtle: 'rgba(28, 25, 23, 0.12)',
        default: 'rgba(28, 25, 23, 0.22)',
        strong: 'rgba(255, 70, 85, 0.66)',
        focus: '#ff4655',
      },
      intent: {
        primary: { bg: 'rgba(255, 70, 85, 0.50)', content: '#7a1320', border: '#ff4655', bgHover: 'rgba(255, 70, 85, 0.60)', bgActive: 'rgba(255, 70, 85, 0.70)' },
        neutral: { bg: 'rgba(28, 25, 23, 0.10)', content: '#1c1917', border: 'rgba(28, 25, 23, 0.24)', bgHover: 'rgba(28, 25, 23, 0.16)', bgActive: 'rgba(28, 25, 23, 0.22)' },
        success: { bg: 'rgba(13, 148, 136, 0.46)', content: '#134e4a', border: '#0d9488', bgHover: 'rgba(13, 148, 136, 0.56)', bgActive: 'rgba(13, 148, 136, 0.66)' },
        warning: { bg: 'rgba(217, 119, 6, 0.46)', content: '#713f12', border: '#d97706', bgHover: 'rgba(217, 119, 6, 0.56)', bgActive: 'rgba(217, 119, 6, 0.66)' },
        danger:  { bg: 'rgba(220, 38, 38, 0.48)', content: '#7a1313', border: '#dc2626', bgHover: 'rgba(220, 38, 38, 0.58)', bgActive: 'rgba(220, 38, 38, 0.68)' },
        info:    { bg: 'rgba(8, 145, 178, 0.44)', content: '#083344', border: '#0891b2', bgHover: 'rgba(8, 145, 178, 0.54)', bgActive: 'rgba(8, 145, 178, 0.64)' },
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(28, 25, 23, 0.10)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(28, 25, 23, 0.12), 0 1px 3px rgba(28, 25, 23, 0.08)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(28, 25, 23, 0.14), 0 4px 12px rgba(28, 25, 23, 0.10)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(255, 70, 85, 0.30), 0 8px 24px rgba(28, 25, 23, 0.12)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(28, 25, 23, 0.18), 0 24px 60px rgba(28, 25, 23, 0.20)' },
    },
    typography: {
      family: {
        ui: '"Oswald", "Rajdhani", "Inter", system-ui, sans-serif',
        display: '"Oswald", "Rajdhani", "Inter", system-ui, sans-serif',
        mono: '"Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Oswald", "Rajdhani", "Inter", system-ui, sans-serif',
        hand: '"Oswald", "Rajdhani", "Inter", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.875rem', weight: 600, lineHeight: '1.04', tracking: '0.02em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '2rem',     weight: 600, lineHeight: '1.14', tracking: '0.02em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.375rem', weight: 500, lineHeight: '1.24', tracking: '0.02em', textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',     weight: 500, lineHeight: '1.4',  tracking: '0.05em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 300, lineHeight: '1.55', tracking: '0.01em' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 500, lineHeight: '1.4',  tracking: '0.12em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4',  tracking: '0.06em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0.04em' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '70ms',
        base: '150ms',
        slow: '260ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#ff4655', style: 'glow' },
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
