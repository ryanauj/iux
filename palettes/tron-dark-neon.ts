import type { Palette } from '../tokens/semantic.contract'

/**
 * Tron / Dark-Neon — glassmorphism engine, all the translucency dialed to a
 * single neon color. Near-black field, cyan accent, glow-as-focus-ring
 * (`effect.focusRing.style = 'glow'`). Mono `code` typography is uppercased
 * for HUD readouts.
 */
export const palette: Palette = {
  id: 'tron-dark-neon',
  name: 'Tron / Dark-Neon',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#04060c',
        raised: 'rgba(8, 145, 178, 0.10)',
        sunken: 'rgba(8, 145, 178, 0.05)',
        overlay: 'rgba(8, 145, 178, 0.16)',
        scrim: 'rgba(4, 6, 12, 0.78)',
      },
      content: {
        primary: '#67e8f9',
        secondary: 'rgba(103, 232, 249, 0.78)',
        muted: 'rgba(103, 232, 249, 0.50)',
        inverse: '#04060c',
        link: '#22d3ee',
      },
      border: {
        subtle: 'rgba(34, 211, 238, 0.16)',
        default: 'rgba(34, 211, 238, 0.32)',
        strong: 'rgba(34, 211, 238, 0.55)',
        focus: '#22d3ee',
      },
      intent: {
        primary: { bg: 'rgba(34, 211, 238, 0.18)', content: '#67e8f9', border: '#22d3ee', bgHover: 'rgba(34, 211, 238, 0.28)', bgActive: 'rgba(34, 211, 238, 0.40)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.04)', content: '#67e8f9', border: 'rgba(34, 211, 238, 0.20)', bgHover: 'rgba(255, 255, 255, 0.08)', bgActive: 'rgba(255, 255, 255, 0.12)' },
        success: { bg: 'rgba(74, 222, 128, 0.18)', content: '#bbf7d0', border: '#4ade80', bgHover: 'rgba(74, 222, 128, 0.28)', bgActive: 'rgba(74, 222, 128, 0.40)' },
        warning: { bg: 'rgba(250, 204, 21, 0.18)', content: '#fef08a', border: '#facc15', bgHover: 'rgba(250, 204, 21, 0.28)', bgActive: 'rgba(250, 204, 21, 0.40)' },
        danger:  { bg: 'rgba(244, 63, 94, 0.18)', content: '#fecdd3', border: '#f43f5e', bgHover: 'rgba(244, 63, 94, 0.28)', bgActive: 'rgba(244, 63, 94, 0.40)' },
        info:    { bg: 'rgba(56, 189, 248, 0.18)', content: '#bae6fd', border: '#38bdf8', bgHover: 'rgba(56, 189, 248, 0.28)', bgActive: 'rgba(56, 189, 248, 0.40)' },
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(34, 211, 238, 0.18)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(34, 211, 238, 0.24), 0 0 8px rgba(34, 211, 238, 0.16)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(34, 211, 238, 0.32), 0 0 16px rgba(34, 211, 238, 0.24)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(34, 211, 238, 0.40), 0 0 28px rgba(34, 211, 238, 0.32)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(34, 211, 238, 0.55), 0 0 48px rgba(34, 211, 238, 0.40), 0 24px 60px rgba(4, 6, 12, 0.60)' },
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
      focusRing: { width: '2px', offset: '2px', color: '#22d3ee', style: 'glow' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      // Aurora engine no-op signals. `atmosphereGradient: 'none'` and
      // `luminanceCenter: 'transparent'` mean the engine CSS that paints
      // the gradient and luminance glow at `.palette-root[data-palette^='aurora']`
      // doesn't paint here. `surfaceBy: 'border'` records that this palette
      // demarcates surfaces with a stroke (the default), not with light density.
      atmosphereGradient: 'none',
      luminanceCenter: 'transparent',
      surfaceBy: 'border',
    },
  },
}
