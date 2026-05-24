import type { Palette } from '../tokens/semantic.contract'

export const palette: Palette = {
  id: 'aaa',
  name: 'High-Contrast AAA',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#ffffff',
        raised: '#ffffff',
        sunken: '#ffffff',
        overlay: '#ffffff',
        scrim: 'rgba(0, 0, 0, 0.8)',
      },
      content: {
        primary: '#000000',
        secondary: '#000000',
        muted: '#333333',
        inverse: '#ffffff',
        link: '#0000ee',
      },
      border: {
        subtle: '#000000',
        default: '#000000',
        strong: '#000000',
        focus: '#0000ee',
      },
      intent: {
        primary: { bg: '#000000', content: '#ffffff', border: '#000000', bgHover: '#1a1a1a', bgActive: '#333333' },
        neutral: { bg: '#ffffff', content: '#000000', border: '#000000', bgHover: '#f0f0f0', bgActive: '#dcdcdc' },
        success: { bg: '#0a5400', content: '#ffffff', border: '#000000', bgHover: '#0d6b00', bgActive: '#063b00' },
        warning: { bg: '#7a4a00', content: '#ffffff', border: '#000000', bgHover: '#8a5800', bgActive: '#5c3700' },
        danger:  { bg: '#9b0000', content: '#ffffff', border: '#000000', bgHover: '#b40000', bgActive: '#7a0000' },
        info:    { bg: '#003a7a', content: '#ffffff', border: '#000000', bgHover: '#004c99', bgActive: '#002a5c' },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '6px',
      '3': '10px',
      '4': '14px',
      '5': '20px',
      '6': '28px',
      '7': '40px',
      '8': '56px',
    },
    radius: {
      none: '0',
      sm: '2px',
      md: '4px',
      lg: '4px',
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
      low: { boxShadow: 'none' },
      medium: { boxShadow: 'none' },
      high: { boxShadow: 'none' },
      overlay: { boxShadow: '0 0 0 2px #000000' },
    },
    typography: {
      family: {
        ui: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        pixel: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',    weight: 800, lineHeight: '1.1', tracking: '0' },
        title:      { family: 'display', size: '2rem',    weight: 800, lineHeight: '1.2', tracking: '0' },
        heading:    { family: 'display', size: '1.5rem',  weight: 700, lineHeight: '1.3', tracking: '0' },
        subheading: { family: 'ui',      size: '1.25rem', weight: 700, lineHeight: '1.4', tracking: '0' },
        body:       { family: 'ui',      size: '1.125rem',weight: 500, lineHeight: '1.6', tracking: '0' },
        label:      { family: 'ui',      size: '1rem',    weight: 700, lineHeight: '1.4', tracking: '0' },
        caption:    { family: 'ui',      size: '0.875rem',weight: 600, lineHeight: '1.5', tracking: '0' },
        code:       { family: 'mono',    size: '1rem',    weight: 500, lineHeight: '1.5', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '0ms',
        base: '0ms',
        slow: '0ms',
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
      focusRing: { width: '3px', offset: '2px', color: '#0000ee', style: 'double' },
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
