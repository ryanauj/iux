import type { Palette } from '../tokens/semantic.contract'

/**
 * Editorial — flat engine reading like a magazine. Warm paper background,
 * ink-black body, serif `display` family, restrained terracotta accent.
 * Space scale widens one notch to give the type room to breathe.
 */
export const palette: Palette = {
  id: 'editorial',
  name: 'Editorial',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f7f1e3',
        raised: '#fdf8ec',
        sunken: '#ede4ce',
        overlay: '#fdf8ec',
        scrim: 'rgba(30, 23, 13, 0.55)',
      },
      content: {
        primary: '#1e170d',
        secondary: '#4a3d28',
        muted: '#7a6a4f',
        inverse: '#fdf8ec',
        link: '#a13b1a',
      },
      border: {
        subtle: 'rgba(30, 23, 13, 0.10)',
        default: 'rgba(30, 23, 13, 0.22)',
        strong: 'rgba(30, 23, 13, 0.55)',
        focus: '#a13b1a',
      },
      intent: {
        primary: { bg: '#a13b1a', content: '#fdf8ec', border: '#7e2c10', bgHover: '#7e2c10', bgActive: '#5b1f0a' },
        neutral: { bg: '#ede4ce', content: '#1e170d', border: 'rgba(30, 23, 13, 0.22)', bgHover: '#e1d6b8', bgActive: '#cdbe96' },
        success: { bg: '#3f5b2a', content: '#fdf8ec', border: '#2f4520', bgHover: '#2f4520', bgActive: '#1f2f15' },
        warning: { bg: '#a36b00', content: '#fdf8ec', border: '#7a5000', bgHover: '#7a5000', bgActive: '#523600' },
        danger:  { bg: '#8a1d1d', content: '#fdf8ec', border: '#691414', bgHover: '#691414', bgActive: '#480d0d' },
        info:    { bg: '#1f4b6e', content: '#fdf8ec', border: '#163851', bgHover: '#163851', bgActive: '#0e2536' },
      },
    },
    space: {
      '0': '0',
      '1': '6px',
      '2': '10px',
      '3': '16px',
      '4': '22px',
      '5': '32px',
      '6': '44px',
      '7': '64px',
      '8': '88px',
    },
    radius: {
      none: '0',
      sm: '2px',
      md: '3px',
      lg: '4px',
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
      high: { boxShadow: '0 4px 12px rgba(30, 23, 13, 0.10)' },
      overlay: { boxShadow: '0 12px 32px rgba(30, 23, 13, 0.18)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
        display: '"Playfair Display", "Times New Roman", Georgia, serif',
        mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
        hand: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3.5rem',  weight: 700, lineHeight: '1.05', tracking: '-0.02em' },
        title:      { family: 'display', size: '2.5rem',  weight: 700, lineHeight: '1.1',  tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.625rem',weight: 600, lineHeight: '1.25', tracking: '0' },
        subheading: { family: 'ui',      size: '1.0625rem',weight: 600, lineHeight: '1.4', tracking: '0.05em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '1.0625rem',weight: 400, lineHeight: '1.65',tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4', tracking: '0.08em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.5', tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '220ms',
        slow: '360ms',
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
      focusRing: { width: '2px', offset: '3px', color: '#a13b1a', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
    },
  },
}
