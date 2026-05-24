import type { Palette } from '../tokens/semantic.contract'

/**
 * Vaporwave — flat engine, magenta/cyan dusk register. Deep night-purple
 * `surface.base` (`#1a0b2e`) with magenta-pink raised panels and cyan as the
 * second accent on `border.strong` and `content.link`. `elevation.*` stacks
 * paired magenta + cyan halos so card edges read as the horizon-grid glow
 * rather than a drop shadow. Typography mixes a large display serif
 * (Playfair) with a uppercase mono for labels/captions — the magazine-cover
 * + VHS-credits pairing the aesthetic lives on.
 */
export const palette: Palette = {
  id: 'vaporwave',
  name: 'Vaporwave',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#1a0b2e',
        raised: '#2a1452',
        sunken: '#0d0719',
        overlay: '#2a1452',
        scrim: 'rgba(15, 6, 30, 0.78)',
      },
      content: {
        primary: '#ffd6f5',
        secondary: 'rgba(255, 214, 245, 0.74)',
        muted: 'rgba(255, 214, 245, 0.48)',
        inverse: '#1a0b2e',
        link: '#22d3ee',
      },
      border: {
        subtle: 'rgba(244, 114, 182, 0.18)',
        default: 'rgba(244, 114, 182, 0.42)',
        strong: 'rgba(34, 211, 238, 0.70)',
        focus: '#f472b6',
      },
      intent: {
        primary: { bg: '#ec4899', content: '#1a0b2e', border: '#f472b6', bgHover: '#f472b6', bgActive: '#db2777' },
        neutral: { bg: '#3b1d63', content: '#ffd6f5', border: 'rgba(255, 255, 255, 0.10)', bgHover: '#4c2483', bgActive: '#2a1452' },
        success: { bg: '#34d399', content: '#0c2e22', border: '#34d399', bgHover: '#6ee7b7', bgActive: '#10b981' },
        warning: { bg: '#fbbf24', content: '#1a0b2e', border: '#fbbf24', bgHover: '#fcd34d', bgActive: '#f59e0b' },
        danger:  { bg: '#f43f5e', content: '#fff5f7', border: '#f43f5e', bgHover: '#fb7185', bgActive: '#e11d48' },
        info:    { bg: '#22d3ee', content: '#0a2230', border: '#22d3ee', bgHover: '#67e8f9', bgActive: '#06b6d4' },
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
      sm: '6px',
      md: '12px',
      lg: '20px',
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
      low: { boxShadow: '0 0 12px rgba(244, 114, 182, 0.20)' },
      medium: { boxShadow: '0 0 24px rgba(244, 114, 182, 0.30), 0 0 12px rgba(34, 211, 238, 0.20)' },
      high: { boxShadow: '0 0 40px rgba(244, 114, 182, 0.34), 0 0 20px rgba(34, 211, 238, 0.24)' },
      overlay: { boxShadow: '0 24px 60px rgba(8, 4, 20, 0.72), 0 0 80px rgba(244, 114, 182, 0.32), 0 0 40px rgba(34, 211, 238, 0.22)' },
    },
    typography: {
      family: {
        ui: '"Outfit", "Inter", system-ui, -apple-system, sans-serif',
        display: '"Playfair Display", "Times New Roman", Georgia, serif',
        mono: '"IBM Plex Mono", "Courier New", ui-monospace, SFMono-Regular, monospace',
        pixel: '"Outfit", "Inter", system-ui, -apple-system, sans-serif',
        hand: '"Outfit", "Inter", system-ui, -apple-system, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '4.5rem',  weight: 700, lineHeight: '1.0',  tracking: '-0.02em' },
        title:      { family: 'display', size: '3rem',    weight: 700, lineHeight: '1.05', tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.875rem', weight: 600, lineHeight: '1.2', tracking: '0' },
        subheading: { family: 'mono',    size: '0.9375rem', weight: 500, lineHeight: '1.4', tracking: '0.12em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'mono',    size: '0.8125rem', weight: 500, lineHeight: '1.4', tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'mono',    size: '0.75rem',  weight: 400, lineHeight: '1.5', tracking: '0.06em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '180ms',
        base: '320ms',
        slow: '480ms',
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
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '3px', color: '#f472b6', style: 'solid' },
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
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
