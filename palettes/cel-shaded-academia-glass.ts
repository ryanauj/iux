import type { Palette } from '../tokens/semantic.contract'

/**
 * Dark Academia (Cel·Glass) — a dark-academia identity on a Cel+Glass hybrid:
 * a light cream paper field (RE-LIT — the dark-academia register is lifted out
 * of its usual gloom into a warm cream daylight, not a dark room), an ink-outline
 * halo (3px oxblood-ink stroke + hard offset block shadow), translucent frosted
 * panels (backdrop blur over rgba surfaces), and a soft drop shadow layered under
 * the hard cel shadow. Serif display (EB Garamond) carries the library register.
 * No CRT, no text glow.
 */
export const palette: Palette = {
  id: 'cel-shaded-academia-glass',
  name: 'Dark Academia (Cel·Glass)',
  engine: 'cel-shaded',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#ece3d0',
        raised: 'rgba(74, 31, 31, 0.06)',
        sunken: 'rgba(43, 30, 24, 0.05)',
        overlay: 'rgba(245, 239, 225, 0.80)',
        scrim: 'rgba(43, 30, 24, 0.30)',
      },
      content: {
        primary: '#2b1e18',
        secondary: '#5a4632',
        muted: '#897355',
        inverse: '#f5efe1',
        link: '#6b2020',
      },
      border: {
        subtle: '#2b1e18',
        default: '#2b1e18',
        strong: '#2b1e18',
        focus: '#6b2020',
      },
      intent: {
        primary: { bg: '#4a1f1f', content: '#f3e8df', border: '#2b1e18', bgHover: '#441c1c', bgActive: '#3e1919' },
        neutral: { bg: '#ddd2ba', content: '#2b1e18', border: '#2b1e18', bgHover: '#cbc1ab', bgActive: '#b9b09c' },
        success: { bg: '#3e5233', content: '#eef2e6', border: '#2b1e18', bgHover: '#39492e', bgActive: '#34412a' },
        warning: { bg: '#9c6b1e', content: '#fbf3e2', border: '#2b1e18', bgHover: '#8f621b', bgActive: '#835919' },
        danger:  { bg: '#7a241e', content: '#f7e6e3', border: '#2b1e18', bgHover: '#70211b', bgActive: '#661e19' },
        info:    { bg: '#2f4858', content: '#e7eef2', border: '#2b1e18', bgHover: '#2b4251', bgActive: '#273b4a' },
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
      lg: '18px',
      pill: '999px',
      full: '9999px',
    },
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '2px',
      thick: '3px',
      heavy: '4px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '3px 3px 0 #2b1e18, 0 2px 8px rgba(43, 30, 24, 0.12)' },
      medium: { boxShadow: '5px 5px 0 #2b1e18, 0 8px 20px rgba(43, 30, 24, 0.12)' },
      high: { boxShadow: '7px 7px 0 #2b1e18, 0 16px 32px rgba(43, 30, 24, 0.12)' },
      overlay: { boxShadow: '8px 8px 0 #2b1e18, 0 24px 48px rgba(43, 30, 24, 0.12)' },
    },
    typography: {
      family: {
        ui: '"EB Garamond", "Cormorant Garamond", "Garamond", "Hoefler Text", Georgia, "Times New Roman", serif',
        display: '"EB Garamond", "Cormorant Garamond", "Garamond", "Hoefler Text", Georgia, "Times New Roman", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"EB Garamond", "Cormorant Garamond", "Garamond", "Hoefler Text", Georgia, "Times New Roman", serif',
        hand: '"EB Garamond", "Cormorant Garamond", "Garamond", "Hoefler Text", Georgia, "Times New Roman", serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',    weight: 700, lineHeight: '1.0',  tracking: '0.01em' },
        title:      { family: 'display', size: '2.25rem', weight: 700, lineHeight: '1.05', tracking: '0.01em' },
        heading:    { family: 'display', size: '1.5rem',  weight: 700, lineHeight: '1.2',  tracking: '0.01em' },
        subheading: { family: 'ui',      size: '1.125rem',weight: 600, lineHeight: '1.3',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 600, lineHeight: '1.3',  tracking: '0.04em' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 500, lineHeight: '1.4',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 500, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '90ms',
        base: '160ms',
        slow: '260ms',
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
      focusRing: { width: '3px', offset: '2px', color: '#6b2020', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: '#2b1e18', width: '3px' },
      shadowStyle: 'hard',
      atmosphereGradient: 'none',
      luminanceCenter: 'transparent',
      surfaceBy: 'border',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
