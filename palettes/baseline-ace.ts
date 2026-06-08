import type { Palette } from '../tokens/semantic.contract'

/**
 * Baseline Ace — the tennis-sim register on the Flat engine. A bright
 * hard-court read built on two colours: a vivid hard-court blue as the
 * primary action and a fluorescent tennis-ball lime as the accent
 * (focus, links, success). The cool blue court and the electric ball
 * give it a real complementary palette rather than a single teal wash.
 *
 *   court light:      #eef3f6  (base) → #fbfeff (raised) → #dde8ee (sunken)
 *   hard-court blue:  #1f7ec0  (primary action)
 *   tennis-ball lime: #82c91e  (accent — focus, links, success)
 *   line-call amber:  #f59f00  (warning)
 *   fault red:        #e8453c  (danger)
 *   ink (text):       #122a36  — deep court blue-black
 */
export const palette: Palette = {
  id: 'baseline-ace',
  name: 'Baseline Ace',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#eef3f6',
        raised: '#fbfeff',
        sunken: '#dde8ee',
        overlay: '#fbfeff',
        scrim: 'rgba(18, 40, 54, 0.50)',
      },
      content: {
        primary: '#122a36',
        secondary: '#3a5563',
        muted: '#6e8a96',
        inverse: '#fbfeff',
        link: '#5a8a0a',
      },
      border: {
        subtle: '#dbe7ee',
        default: '#b2ccd8',
        strong: '#123a4a',
        focus: '#82c91e',
      },
      // Complementary two-colour identity: hard-court blue = primary,
      // tennis-ball lime = accent (focus, links, success). Line-call
      // amber warning, fault red danger, sky info round out the court.
      intent: {
        primary: { bg: '#1f7ec0', content: '#fbfeff', border: '#185f92', bgHover: '#1b6ea6', bgActive: '#134f7a' },
        neutral: { bg: '#cdd9e2', content: '#122a36', border: '#a9bac6', bgHover: '#bccad5', bgActive: '#a9bac6' },
        success: { bg: '#82c91e', content: '#18240a', border: '#639c12', bgHover: '#74b318', bgActive: '#54820f' },
        warning: { bg: '#f59f00', content: '#2a1f00', border: '#c27d00', bgHover: '#d88e00', bgActive: '#9c6500' },
        danger:  { bg: '#e8453c', content: '#fbfeff', border: '#b32f28', bgHover: '#cc372f', bgActive: '#8f231d' },
        info:    { bg: '#3aa0d8', content: '#fbfeff', border: '#2b7daa', bgHover: '#3090c2', bgActive: '#226488' },
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
      md: '10px',
      lg: '16px',
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
      low: { boxShadow: '0 1px 2px rgba(18, 40, 54, 0.10)' },
      medium: { boxShadow: '0 4px 10px rgba(18, 40, 54, 0.13), 0 2px 4px rgba(18, 40, 54, 0.07)' },
      high: { boxShadow: '0 12px 22px rgba(18, 40, 54, 0.16), 0 4px 8px rgba(18, 40, 54, 0.09)' },
      overlay: { boxShadow: '0 24px 36px rgba(18, 40, 54, 0.20), 0 10px 14px rgba(18, 40, 54, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Rajdhani", "Inter", "Helvetica Neue", system-ui, sans-serif',
        display: '"Rajdhani", "Inter", "Helvetica Neue", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Rajdhani", "Inter", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Rajdhani", "Inter", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 700, lineHeight: '1.08', tracking: '0.01em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '2rem',     weight: 700, lineHeight: '1.18', tracking: '0.01em' },
        heading:    { family: 'display', size: '1.375rem', weight: 600, lineHeight: '1.25', tracking: '0.01em' },
        subheading: { family: 'ui',      size: '1.0625rem',weight: 600, lineHeight: '1.45', tracking: '0.03em' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 500, lineHeight: '1.6',  tracking: '0.01em' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4',  tracking: '0.08em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 500, lineHeight: '1.4',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '110ms',
        base: '190ms',
        slow: '300ms',
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
      focusRing: { width: '3px', offset: '2px', color: '#82c91e', style: 'solid' },
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
