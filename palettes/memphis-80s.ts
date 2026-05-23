import type { Palette } from '../tokens/semantic.contract'

/**
 * 80s Memphis — flat engine tuned for the Memphis Group's confetti
 * vocabulary. Cream `surface.base` (`#fdf8ec`) with primary-color intents
 * (hot pink, cyan-blue, sun yellow, tomato red, neon green), every border
 * forced to ink-black `#1c1c1c` regardless of `border.*` slot, and
 * `elevation.*` packing the hard offset shadow Memphis posters used as
 * fake-3D depth. Display family is a heavy uppercase grotesque (Archivo
 * Black / Impact). The squiggle/confetti decoration the aesthetic
 * advertises is the *engine*'s job to draw — the palette just paints
 * the background underneath.
 */
export const palette: Palette = {
  id: 'memphis-80s',
  name: '80s Memphis',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#fdf8ec',
        raised: '#ffffff',
        sunken: '#f5ecd1',
        overlay: '#ffffff',
        scrim: 'rgba(20, 20, 40, 0.45)',
      },
      content: {
        primary: '#1c1c1c',
        secondary: '#3a3a3a',
        muted: '#6a6a6a',
        inverse: '#fdf8ec',
        link: '#e91e63',
      },
      border: {
        subtle: '#1c1c1c',
        default: '#1c1c1c',
        strong: '#1c1c1c',
        focus: '#ffd60a',
      },
      intent: {
        primary: { bg: '#ff3d7f', content: '#1c1c1c', border: '#1c1c1c', bgHover: '#ff5a92', bgActive: '#e02968' },
        neutral: { bg: '#f5ecd1', content: '#1c1c1c', border: '#1c1c1c', bgHover: '#ece1bd', bgActive: '#d8cda7' },
        success: { bg: '#1bd96a', content: '#1c1c1c', border: '#1c1c1c', bgHover: '#3ce086', bgActive: '#0fb858' },
        warning: { bg: '#ffd60a', content: '#1c1c1c', border: '#1c1c1c', bgHover: '#ffde33', bgActive: '#e6bf00' },
        danger:  { bg: '#ff4d3a', content: '#fdf8ec', border: '#1c1c1c', bgHover: '#ff6650', bgActive: '#e6321f' },
        info:    { bg: '#1e90ff', content: '#fdf8ec', border: '#1c1c1c', bgHover: '#3aa0ff', bgActive: '#0070d6' },
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
      thin: '2px',
      thick: '3px',
      heavy: '4px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '3px 3px 0 #1c1c1c' },
      medium: { boxShadow: '5px 5px 0 #1c1c1c' },
      high: { boxShadow: '7px 7px 0 #1c1c1c' },
      overlay: { boxShadow: '8px 8px 0 #1c1c1c, 0 24px 48px rgba(0, 0, 0, 0.25)' },
    },
    typography: {
      family: {
        ui: '"Space Grotesk", "Inter", system-ui, -apple-system, sans-serif',
        display: '"Archivo Black", "Impact", "Helvetica Neue", Helvetica, Arial, sans-serif',
        mono: '"Courier Prime", "Courier New", ui-monospace, SFMono-Regular, monospace',
        pixel: '"Space Grotesk", "Inter", system-ui, -apple-system, sans-serif',
        hand: '"Space Grotesk", "Inter", system-ui, -apple-system, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3.25rem', weight: 800, lineHeight: '1.0',  tracking: '-0.02em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '2.25rem', weight: 800, lineHeight: '1.05', tracking: '-0.01em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.5rem',  weight: 800, lineHeight: '1.2',  tracking: '0',      textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',    weight: 700, lineHeight: '1.4',  tracking: '0.04em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem', weight: 700, lineHeight: '1.4',  tracking: '0.06em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 500, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '100ms',
        base: '180ms',
        slow: '280ms',
      },
      easing: {
        standard: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '3px', offset: '2px', color: '#ffd60a', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
    },
  },
}
