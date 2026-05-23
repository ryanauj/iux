import type { Palette } from '../tokens/semantic.contract'

/**
 * Neubrutalism — elevation-stripped variant.
 *
 * The session brief pinned this palette to `elevation = none, radius = none,
 * thick borders, near-zero motion`. Depth comes entirely from `borderWidth.heavy`
 * + `color.border.strong`; the hard-offset shadow trick the engine description
 * mentions is not used here. See the README.
 */
export const palette: Palette = {
  id: 'neubrutalism',
  name: 'Neubrutalism',
  engine: 'neubrutalism',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#fef9e7',
        raised: '#ffffff',
        sunken: '#ffffff',
        overlay: '#ffffff',
        scrim: 'rgba(0, 0, 0, 0.6)',
      },
      content: {
        primary: '#0a0a0a',
        secondary: '#1a1a1a',
        muted: '#3a3a3a',
        inverse: '#ffffff',
        link: '#1d4ed8',
      },
      border: {
        subtle: '#0a0a0a',
        default: '#0a0a0a',
        strong: '#0a0a0a',
        focus: '#ff3ec9',
      },
      intent: {
        primary: { bg: '#ff3ec9', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ff1cb8', bgActive: '#d8009a' },
        neutral: { bg: '#ffffff', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#f0f0f0', bgActive: '#dcdcdc' },
        success: { bg: '#3aff85', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#14ec6a', bgActive: '#0fb453' },
        warning: { bg: '#ffd84d', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ffcb1f', bgActive: '#e6b400' },
        danger:  { bg: '#ff4d4d', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#e63030', bgActive: '#b81d1d' },
        info:    { bg: '#5cd6ff', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#30c2f0', bgActive: '#0ea9dc' },
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
      low: { boxShadow: 'none' },
      medium: { boxShadow: 'none' },
      high: { boxShadow: 'none' },
      overlay: { boxShadow: 'none' },
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
        fast: '40ms',
        base: '60ms',
        slow: '90ms',
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
      focusRing: { width: '4px', offset: '0', color: '#ff3ec9', style: 'solid' },
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
