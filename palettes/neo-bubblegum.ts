import type { Palette } from '../tokens/semantic.contract'

/**
 * Neo Bubblegum — light neobrutalist register tuned hot-pink + cyan. Same
 * structure as `neo-citrus` (zero radius, ink outlines, hard-offset block
 * shadows on a near-white field) but the loud accent flips to bubblegum
 * pink with a cyan secondary, so the pair reads as a candy-shop sign rather
 * than a citrus crate. Content stays ink-black on every bright fill — the
 * fills are light enough to carry dark text well past the UI contrast floor.
 */
export const palette: Palette = {
  id: 'neo-bubblegum',
  name: 'Neo Bubblegum',
  engine: 'neubrutalism',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#fff7fb',
        raised: '#ffffff',
        sunken: '#ffeef6',
        overlay: '#ffffff',
        scrim: 'rgba(10, 10, 10, 0.6)',
      },
      content: {
        primary: '#0a0a0a',
        secondary: '#1f1f1f',
        muted: '#4a4a4a',
        inverse: '#ffffff',
        link: '#d6008e',
      },
      border: {
        subtle: '#0a0a0a',
        default: '#0a0a0a',
        strong: '#0a0a0a',
        focus: '#00c2d6',
      },
      intent: {
        primary: { bg: '#ff5fa2', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ff3d8d', bgActive: '#e01f72' },
        neutral: { bg: '#ffeef6', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ffdbeb', bgActive: '#ffc2dc' },
        success: { bg: '#3aff9e', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#14ec83', bgActive: '#0fb463' },
        warning: { bg: '#ffd84d', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ffcb1f', bgActive: '#e6b400' },
        danger:  { bg: '#ff5a4d', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ef4133', bgActive: '#cf2c1e' },
        info:    { bg: '#5ce1ff', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#30d2f0', bgActive: '#0eb6dc' },
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
      sm: '0',
      md: '0',
      lg: '0',
      pill: '0',
      full: '0',
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
      low: { boxShadow: '2px 2px 0 #0a0a0a' },
      medium: { boxShadow: '4px 4px 0 #0a0a0a' },
      high: { boxShadow: '6px 6px 0 #0a0a0a' },
      overlay: { boxShadow: '8px 8px 0 #0a0a0a' },
    },
    typography: {
      family: {
        ui: '"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: '"Archivo Black", "Helvetica Neue", Arial Black, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: '"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',    weight: 900, lineHeight: '0.95', tracking: '-0.02em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '2rem',    weight: 900, lineHeight: '1.0',  tracking: '-0.01em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.5rem',  weight: 900, lineHeight: '1.1',  tracking: '0' },
        subheading: { family: 'ui',      size: '1.125rem',weight: 700, lineHeight: '1.3',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 700, lineHeight: '1.3',  tracking: '0.02em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 600, lineHeight: '1.3',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 500, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '60ms',
        base: '90ms',
        slow: '120ms',
      },
      easing: {
        standard: 'linear',
        in: 'linear',
        out: 'linear',
        inOut: 'linear',
        spring: 'linear',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '4px', offset: '0', color: '#00c2d6', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
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
