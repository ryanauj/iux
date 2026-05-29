import type { Palette } from '../tokens/semantic.contract'

/**
 * Neo Grape — light neobrutalist register built on a deep-violet primary
 * with a lime counter-pop. The violet fill is dark enough to carry white
 * content (the one intent here that inverts to light text), while every
 * other fill stays bright with ink-black text. Structure matches the rest
 * of the neo-* set: paper field, zero radius, ink outlines, hard-offset
 * block shadows.
 */
export const palette: Palette = {
  id: 'neo-grape',
  name: 'Neo Grape',
  engine: 'neubrutalism',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#faf7ff',
        raised: '#ffffff',
        sunken: '#f1ebff',
        overlay: '#ffffff',
        scrim: 'rgba(10, 10, 10, 0.6)',
      },
      content: {
        primary: '#0a0a0a',
        secondary: '#1f1f1f',
        muted: '#4a4a4a',
        inverse: '#ffffff',
        link: '#6d28d9',
      },
      border: {
        subtle: '#0a0a0a',
        default: '#0a0a0a',
        strong: '#0a0a0a',
        focus: '#a3e635',
      },
      intent: {
        primary: { bg: '#7c3aed', content: '#ffffff', border: '#0a0a0a', bgHover: '#6d28d9', bgActive: '#5b21b6' },
        neutral: { bg: '#f1ebff', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#e4d9ff', bgActive: '#d0bdff' },
        success: { bg: '#a3e635', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#8fd61f', bgActive: '#73ad17' },
        warning: { bg: '#ffd84d', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ffcb1f', bgActive: '#e6b400' },
        danger:  { bg: '#ff5a4d', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ef4133', bgActive: '#cf2c1e' },
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
      focusRing: { width: '4px', offset: '0', color: '#a3e635', style: 'solid' },
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
