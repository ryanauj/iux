import type { Palette } from '../tokens/semantic.contract'

/**
 * Skeuomorphism — material mimicry. Tactile shadow stacks (real shadow + inset
 * highlight + bevel), deeper radii, warmer surface palette modeled on
 * brushed paper and leather. Texture inside surfaces would normally come
 * from a CSS gradient layered into `background-image`; the contract only
 * exposes flat colors, so the palette leans on multi-shadow elevation to
 * carry depth instead of gradient texture.
 */
export const palette: Palette = {
  id: 'skeuomorphism',
  name: 'Skeuomorphism',
  engine: 'skeuomorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#e8dfcf',
        raised: '#f3ead8',
        sunken: '#d8cdb8',
        overlay: '#f8f1df',
        scrim: 'rgba(58, 39, 19, 0.55)',
      },
      content: {
        primary: '#3a2713',
        secondary: '#5b4423',
        muted: '#8a7350',
        inverse: '#fdf6e3',
        link: '#6b4226',
      },
      border: {
        subtle: 'rgba(58, 39, 19, 0.16)',
        default: 'rgba(58, 39, 19, 0.32)',
        strong: 'rgba(58, 39, 19, 0.50)',
        focus: '#6b4226',
      },
      intent: {
        primary: { bg: '#2f6e4a', content: '#fdf6e3', border: '#1f4d33', bgHover: '#3a8359', bgActive: '#1f4d33' },
        neutral: { bg: '#d8cdb8', content: '#3a2713', border: '#a89779', bgHover: '#c7bca6', bgActive: '#a89779' },
        success: { bg: '#3f7d20', content: '#fdf6e3', border: '#2a5a14', bgHover: '#4a9326', bgActive: '#2a5a14' },
        warning: { bg: '#c87f0a', content: '#fdf6e3', border: '#8a5707', bgHover: '#dd900f', bgActive: '#8a5707' },
        danger:  { bg: '#a83232', content: '#fdf6e3', border: '#7a1f1f', bgHover: '#c23c3c', bgActive: '#7a1f1f' },
        info:    { bg: '#2b6b8e', content: '#fdf6e3', border: '#1c4860', bgHover: '#357fa8', bgActive: '#1c4860' },
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
      flat: { boxShadow: 'inset 0 1px 0 rgba(255, 246, 227, 0.50), inset 0 -1px 0 rgba(58, 39, 19, 0.20)' },
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 246, 227, 0.55), inset 0 -1px 0 rgba(58, 39, 19, 0.30), 0 2px 3px rgba(58, 39, 19, 0.30)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 246, 227, 0.60), inset 0 -2px 0 rgba(58, 39, 19, 0.30), 0 4px 8px rgba(58, 39, 19, 0.35)' },
      high: { boxShadow: 'inset 0 2px 0 rgba(255, 246, 227, 0.65), inset 0 -2px 0 rgba(58, 39, 19, 0.35), 0 8px 16px rgba(58, 39, 19, 0.40)' },
      overlay: { boxShadow: 'inset 0 2px 0 rgba(255, 246, 227, 0.70), inset 0 -3px 0 rgba(58, 39, 19, 0.40), 0 16px 32px rgba(58, 39, 19, 0.45)' },
    },
    typography: {
      family: {
        ui: '"Lucida Grande", "Helvetica Neue", Helvetica, Arial, sans-serif',
        display: '"Optima", "Lucida Bright", Georgia, serif',
        mono: '"Courier New", ui-monospace, SFMono-Regular, monospace',
        pixel: '"Lucida Grande", "Helvetica Neue", Helvetica, Arial, sans-serif',
        hand: '"Lucida Grande", "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.5rem',  weight: 700, lineHeight: '1.15', tracking: '0' },
        title:      { family: 'display', size: '1.875rem',weight: 700, lineHeight: '1.2',  tracking: '0' },
        heading:    { family: 'display', size: '1.375rem',weight: 700, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1.0625rem',weight: 600, lineHeight: '1.4', tracking: '0' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.5', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4', tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0' },
        code:       { family: 'mono',    size: '0.8125rem',weight: 400, lineHeight: '1.5', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '120ms',
        base: '200ms',
        slow: '320ms',
      },
      easing: {
        standard: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#6b4226', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
    },
  },
}
