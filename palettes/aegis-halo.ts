import type { Palette } from '../tokens/semantic.contract'

/**
 * Aegis Halo — the military-sci-fi shield register on the glassmorphism
 * engine, in daylight. A clean visor-HUD read: pale blue field,
 * translucent cyan-glass panels, deep-cyan "ink" borders, and a
 * shield-amber warning that reads as the recharging-shield flash of a
 * powered-armour HUD. Inspired by the heads-up displays of sci-fi
 * shooters (Halo, Destiny) rendered as a bright daytime blueprint
 * rather than a glowing dark visor.
 *
 *   visor field:    #f4f9fc
 *   cyan glass:     rgba(56, 189, 248, 0.12)
 *   HUD cyan:       #0ea5e9  (primary / focus)
 *   shield amber:   #f59e0b  (warning)
 *   ink (text):     #0a2a3d
 */
export const palette: Palette = {
  id: 'aegis-halo',
  name: 'Aegis Halo',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f4f9fc',
        raised: 'rgba(56, 189, 248, 0.12)',
        sunken: 'rgba(8, 47, 73, 0.06)',
        overlay: 'rgba(255, 255, 255, 0.78)',
        scrim: 'rgba(8, 30, 46, 0.34)',
      },
      content: {
        primary: '#0a2a3d',
        secondary: 'rgba(10, 42, 61, 0.74)',
        muted: 'rgba(10, 42, 61, 0.50)',
        inverse: '#f4f9fc',
        link: '#0369a1',
      },
      border: {
        subtle: 'rgba(2, 132, 199, 0.30)',
        default: 'rgba(2, 132, 199, 0.50)',
        strong: 'rgba(2, 132, 199, 0.72)',
        focus: '#0ea5e9',
      },
      intent: {
        primary: { bg: 'rgba(14, 165, 233, 0.42)', content: '#083344', border: '#0ea5e9', bgHover: 'rgba(14, 165, 233, 0.52)', bgActive: 'rgba(14, 165, 233, 0.62)' },
        neutral: { bg: 'rgba(8, 47, 73, 0.10)', content: '#0a2a3d', border: 'rgba(2, 132, 199, 0.34)', bgHover: 'rgba(8, 47, 73, 0.16)', bgActive: 'rgba(8, 47, 73, 0.22)' },
        success: { bg: 'rgba(16, 185, 129, 0.42)', content: '#064e3b', border: '#10b981', bgHover: 'rgba(16, 185, 129, 0.52)', bgActive: 'rgba(16, 185, 129, 0.62)' },
        warning: { bg: 'rgba(245, 158, 11, 0.46)', content: '#713f12', border: '#f59e0b', bgHover: 'rgba(245, 158, 11, 0.56)', bgActive: 'rgba(245, 158, 11, 0.66)' },
        danger:  { bg: 'rgba(225, 29, 72, 0.44)', content: '#7a0f25', border: '#e11d48', bgHover: 'rgba(225, 29, 72, 0.54)', bgActive: 'rgba(225, 29, 72, 0.64)' },
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
      md: '6px',
      lg: '12px',
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(2, 132, 199, 0.26)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(2, 132, 199, 0.32), 0 1px 3px rgba(8, 30, 46, 0.08), 0 0 8px rgba(14, 165, 233, 0.10)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(2, 132, 199, 0.40), 0 4px 12px rgba(8, 30, 46, 0.10), 0 0 16px rgba(14, 165, 233, 0.12)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(2, 132, 199, 0.48), 0 8px 24px rgba(8, 30, 46, 0.12), 0 0 24px rgba(14, 165, 233, 0.14)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(2, 132, 199, 0.56), 0 24px 60px rgba(8, 30, 46, 0.20), 0 0 36px rgba(14, 165, 233, 0.16)' },
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
        display:    { family: 'display', size: '2.625rem', weight: 700, lineHeight: '1.1', tracking: '0.05em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.875rem', weight: 700, lineHeight: '1.2', tracking: '0.05em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.25rem',  weight: 600, lineHeight: '1.3', tracking: '0.04em', textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4', tracking: '0.04em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.5', tracking: '0.02em' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4', tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4', tracking: '0.06em', textTransform: 'uppercase' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5', tracking: '0.05em', textTransform: 'uppercase' },
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
      focusRing: { width: '2px', offset: '2px', color: '#0ea5e9', style: 'glow' },
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
