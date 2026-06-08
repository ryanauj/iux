import type { Palette } from '../tokens/semantic.contract'

/**
 * Tactical Recon — the competitive-tactical-shooter register on the
 * glassmorphism engine, re-themed around a scanner read. A warm
 * off-white field, translucent panels, an acid scanner-green primary and
 * glow focus, and a hot magenta accent (links, info) — the green-and-
 * magenta of a night-vision recon overlay. Spike-teal carries success so
 * it never collapses into the primary green.
 *
 *   off-white field: #f4f5f1
 *   glass panel:     rgba(255, 255, 255, 0.58)
 *   scanner green:   #65a30d  (primary / focus)
 *   recon magenta:   #be185d  (accent — links, info)
 *   spike teal:      #0d9488  (success)
 *   ink (text):      #1a1d14
 */
export const palette: Palette = {
  id: 'tactical-recon',
  name: 'Tactical Recon',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f4f5f1',
        raised: 'rgba(255, 255, 255, 0.58)',
        sunken: 'rgba(26, 29, 20, 0.05)',
        overlay: 'rgba(255, 255, 255, 0.82)',
        scrim: 'rgba(24, 26, 18, 0.34)',
      },
      content: {
        primary: '#1a1d14',
        secondary: 'rgba(26, 29, 20, 0.72)',
        muted: 'rgba(26, 29, 20, 0.50)',
        inverse: '#fafbf6',
        link: '#be185d',
      },
      border: {
        subtle: 'rgba(26, 29, 20, 0.12)',
        default: 'rgba(26, 29, 20, 0.22)',
        strong: 'rgba(101, 163, 13, 0.66)',
        focus: '#65a30d',
      },
      intent: {
        primary: { bg: 'rgba(101, 163, 13, 0.48)', content: '#2a3d08', border: '#65a30d', bgHover: 'rgba(101, 163, 13, 0.58)', bgActive: 'rgba(101, 163, 13, 0.68)' },
        neutral: { bg: 'rgba(26, 29, 20, 0.10)', content: '#1a1d14', border: 'rgba(26, 29, 20, 0.24)', bgHover: 'rgba(26, 29, 20, 0.16)', bgActive: 'rgba(26, 29, 20, 0.22)' },
        success: { bg: 'rgba(13, 148, 136, 0.46)', content: '#134e4a', border: '#0d9488', bgHover: 'rgba(13, 148, 136, 0.56)', bgActive: 'rgba(13, 148, 136, 0.66)' },
        warning: { bg: 'rgba(217, 119, 6, 0.46)', content: '#713f12', border: '#d97706', bgHover: 'rgba(217, 119, 6, 0.56)', bgActive: 'rgba(217, 119, 6, 0.66)' },
        danger:  { bg: 'rgba(220, 38, 38, 0.48)', content: '#7a1313', border: '#dc2626', bgHover: 'rgba(220, 38, 38, 0.58)', bgActive: 'rgba(220, 38, 38, 0.68)' },
        info:    { bg: 'rgba(190, 24, 93, 0.46)', content: '#7a1340', border: '#be185d', bgHover: 'rgba(190, 24, 93, 0.56)', bgActive: 'rgba(190, 24, 93, 0.66)' },
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(26, 29, 20, 0.10)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(26, 29, 20, 0.12), 0 1px 3px rgba(24, 26, 18, 0.08)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(26, 29, 20, 0.14), 0 4px 12px rgba(24, 26, 18, 0.10)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(101, 163, 13, 0.30), 0 8px 24px rgba(24, 26, 18, 0.12)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(26, 29, 20, 0.18), 0 24px 60px rgba(24, 26, 18, 0.20)' },
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
      focusRing: { width: '2px', offset: '2px', color: '#65a30d', style: 'glow' },
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
