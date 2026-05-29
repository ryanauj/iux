import type { Palette } from '../tokens/semantic.contract'

/**
 * Paper Pop — minimal light register: a near-monochrome paper-white UI
 * where a single electric-cobalt accent does all the talking. Flat engine,
 * soft shadows, restrained radius. Surfaces and neutrals stay grayscale so
 * the one bright hue (primary / link / focus) reads as a deliberate pop
 * rather than one voice among many. The secondary intents stay present but
 * muted-saturation so the cobalt keeps the spotlight.
 */
export const palette: Palette = {
  id: 'paper-pop',
  name: 'Paper Pop',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#ffffff',
        raised: '#ffffff',
        sunken: '#f5f6f8',
        overlay: '#ffffff',
        scrim: 'rgba(17, 17, 19, 0.46)',
      },
      content: {
        primary: '#111113',
        secondary: '#3f4147',
        muted: '#73767e',
        inverse: '#ffffff',
        link: '#2563eb',
      },
      border: {
        subtle: '#eceef1',
        default: '#dadde2',
        strong: '#9da2ab',
        focus: '#2563eb',
      },
      intent: {
        primary: { bg: '#2563eb', content: '#ffffff', border: '#1d4ed8', bgHover: '#1d4ed8', bgActive: '#1e40af' },
        neutral: { bg: '#f1f3f5', content: '#111113', border: '#dadde2', bgHover: '#e6e9ed', bgActive: '#d5d9df' },
        success: { bg: '#15803d', content: '#ffffff', border: '#166534', bgHover: '#166534', bgActive: '#14532d' },
        warning: { bg: '#b45309', content: '#ffffff', border: '#92400e', bgHover: '#92400e', bgActive: '#78350f' },
        danger:  { bg: '#b91c1c', content: '#ffffff', border: '#991b1b', bgHover: '#991b1b', bgActive: '#7f1d1d' },
        info:    { bg: '#0e7490', content: '#ffffff', border: '#155e75', bgHover: '#155e75', bgActive: '#164e63' },
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
      sm: '5px',
      md: '8px',
      lg: '12px',
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
      low: { boxShadow: '0 1px 2px rgba(17, 17, 19, 0.06)' },
      medium: { boxShadow: '0 4px 8px rgba(17, 17, 19, 0.07), 0 2px 4px rgba(17, 17, 19, 0.04)' },
      high: { boxShadow: '0 10px 20px rgba(17, 17, 19, 0.10), 0 4px 8px rgba(17, 17, 19, 0.05)' },
      overlay: { boxShadow: '0 20px 36px rgba(17, 17, 19, 0.14), 0 8px 12px rgba(17, 17, 19, 0.06)' },
    },
    typography: {
      family: {
        ui: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        pixel: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 700, lineHeight: '1.08', tracking: '-0.02em' },
        title:      { family: 'display', size: '1.875rem',weight: 700, lineHeight: '1.18', tracking: '-0.015em' },
        heading:    { family: 'display', size: '1.25rem', weight: 600, lineHeight: '1.3',  tracking: '-0.005em' },
        subheading: { family: 'ui',      size: '1rem',    weight: 600, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 500,lineHeight: '1.4',  tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
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
      focusRing: { width: '2px', offset: '2px', color: '#2563eb', style: 'solid' },
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
