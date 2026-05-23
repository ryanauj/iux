import type { Palette } from '../tokens/semantic.contract'

/**
 * Academic — Editorial register on the flat engine, tuned for journal-
 * article LaTeX feel. Computer Modern serif throughout (display and ui
 * share the same family stack), generous margins (space scale widens
 * two notches at the upper end), zero radius, hairline rules. `label`
 * carries the small-caps surrogate used by figure / theorem markers;
 * `caption` is sized for footnotes and figure cutlines.
 */
export const palette: Palette = {
  id: 'academic',
  name: 'Academic',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#fbfaf6',
        raised: '#fefdfa',
        sunken: '#f0eee5',
        overlay: '#fefdfa',
        scrim: 'rgba(20, 18, 12, 0.5)',
      },
      content: {
        primary: '#0a0908',
        secondary: '#3d3a32',
        muted: '#7a766b',
        inverse: '#fbfaf6',
        link: '#3a4f87',
      },
      border: {
        subtle: 'rgba(20, 18, 12, 0.10)',
        default: 'rgba(20, 18, 12, 0.22)',
        strong: 'rgba(20, 18, 12, 0.55)',
        focus: '#3a4f87',
      },
      intent: {
        primary: { bg: '#3a4f87', content: '#fbfaf6', border: '#2a3a66', bgHover: '#2a3a66', bgActive: '#1d2848' },
        neutral: { bg: '#e8e5da', content: '#0a0908', border: 'rgba(20, 18, 12, 0.22)', bgHover: '#dcd9cc', bgActive: '#c9c5b3' },
        success: { bg: '#2d5530', content: '#fbfaf6', border: '#1f3e21', bgHover: '#1f3e21', bgActive: '#142a16' },
        warning: { bg: '#7d5208', content: '#fbfaf6', border: '#5c3c05', bgHover: '#5c3c05', bgActive: '#3e2803' },
        danger:  { bg: '#762020', content: '#fbfaf6', border: '#551616', bgHover: '#551616', bgActive: '#380e0e' },
        info:    { bg: '#2d4670', content: '#fbfaf6', border: '#1f3252', bgHover: '#1f3252', bgActive: '#142136' },
      },
    },
    space: {
      '0': '0',
      '1': '6px',
      '2': '12px',
      '3': '20px',
      '4': '30px',
      '5': '44px',
      '6': '64px',
      '7': '88px',
      '8': '120px',
    },
    radius: {
      none: '0',
      sm: '0',
      md: '0',
      lg: '0',
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
      low: { boxShadow: 'none' },
      medium: { boxShadow: 'none' },
      high: { boxShadow: 'none' },
      overlay: { boxShadow: '0 0 0 1px rgba(20, 18, 12, 0.30)' },
    },
    typography: {
      family: {
        ui: '"Latin Modern Roman", "Computer Modern Serif", "CMU Serif", Cambria, Georgia, "Times New Roman", serif',
        display: '"Latin Modern Roman", "Computer Modern Serif", "CMU Serif", Cambria, Georgia, "Times New Roman", serif',
        mono: '"Latin Modern Mono", "Computer Modern Typewriter", "CMU Typewriter Text", "IBM Plex Mono", ui-monospace, monospace',
        pixel: '"Latin Modern Roman", "Computer Modern Serif", "CMU Serif", Cambria, Georgia, "Times New Roman", serif',
        hand: '"Latin Modern Roman", "Computer Modern Serif", "CMU Serif", Cambria, Georgia, "Times New Roman", serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 700, lineHeight: '1.15', tracking: '0' },
        title:      { family: 'display', size: '2.125rem', weight: 700, lineHeight: '1.2',  tracking: '0' },
        heading:    { family: 'display', size: '1.5rem',   weight: 700, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'display', size: '1.1875rem',weight: 600, lineHeight: '1.35', tracking: '0' },
        body:       { family: 'ui',      size: '1.0625rem',weight: 400, lineHeight: '1.7',  tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4',  tracking: '0.06em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.5',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.9375rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '160ms',
        base: '280ms',
        slow: '480ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#3a4f87', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
    },
  },
}
