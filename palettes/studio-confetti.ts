import type { Palette } from '../tokens/semantic.contract'

/**
 * Studio Confetti — playful light register: a warm off-white studio field
 * sprinkled with small, saturated highlights across the full intent set
 * (rose, amber, grass, violet, sky). Flat engine, soft shadows, friendly
 * rounded radius. Unlike `paper-pop`'s one-accent restraint, this leans
 * into a multi-hue confetti palette — but the field and neutrals stay quiet
 * so the brights register as accents, not chrome. Saturated fills carry
 * white text; the lighter neutral carries ink.
 */
export const palette: Palette = {
  id: 'studio-confetti',
  name: 'Studio Confetti',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#fdfcf9',
        raised: '#ffffff',
        sunken: '#f4f2ec',
        overlay: '#ffffff',
        scrim: 'rgba(28, 25, 23, 0.46)',
      },
      content: {
        primary: '#1c1917',
        secondary: '#44403c',
        muted: '#78716c',
        inverse: '#ffffff',
        link: '#e11d48',
      },
      border: {
        subtle: '#efece5',
        default: '#e0dcd2',
        strong: '#a8a29e',
        focus: '#e11d48',
      },
      intent: {
        primary: { bg: '#e11d48', content: '#ffffff', border: '#be123c', bgHover: '#c81841', bgActive: '#a3123a' },
        neutral: { bg: '#f4f2ec', content: '#1c1917', border: '#e0dcd2', bgHover: '#ebe7de', bgActive: '#ddd8cc' },
        success: { bg: '#16a34a', content: '#ffffff', border: '#15803d', bgHover: '#15803d', bgActive: '#166534' },
        warning: { bg: '#d97706', content: '#ffffff', border: '#b45309', bgHover: '#b45309', bgActive: '#92400e' },
        danger:  { bg: '#dc2626', content: '#ffffff', border: '#b91c1c', bgHover: '#b91c1c', bgActive: '#991b1b' },
        info:    { bg: '#2563eb', content: '#ffffff', border: '#1d4ed8', bgHover: '#1d4ed8', bgActive: '#1e40af' },
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
      sm: '8px',
      md: '14px',
      lg: '22px',
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
      low: { boxShadow: '0 1px 2px rgba(28, 25, 23, 0.06)' },
      medium: { boxShadow: '0 4px 12px rgba(28, 25, 23, 0.08), 0 2px 4px rgba(28, 25, 23, 0.04)' },
      high: { boxShadow: '0 12px 24px rgba(28, 25, 23, 0.12), 0 4px 8px rgba(28, 25, 23, 0.06)' },
      overlay: { boxShadow: '0 24px 40px rgba(28, 25, 23, 0.16), 0 10px 14px rgba(28, 25, 23, 0.07)' },
    },
    typography: {
      family: {
        ui: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: '"Poppins", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        pixel: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.875rem',weight: 700, lineHeight: '1.05', tracking: '-0.02em' },
        title:      { family: 'display', size: '2rem',    weight: 700, lineHeight: '1.15', tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.375rem',weight: 600, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',    weight: 600, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 500,lineHeight: '1.4',  tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '220ms',
        slow: '340ms',
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
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#e11d48', style: 'solid' },
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
