import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-shaded (Citrus Pop) — high-energy register on the anime engine:
 * tangerine primary, lemon and lime accents, teal info, on a bright
 * lemon-cream field. The loudest of the cel-shaded family — a sports /
 * shonen-summer poster read — while keeping the exact engine machinery
 * (ink outline halo, two-tone hard-offset shading via `elevation.*`). All
 * fills carry ink-black text.
 */
export const palette: Palette = {
  id: 'cel-shaded-citrus',
  name: 'Cel-shaded (Citrus Pop)',
  engine: 'cel-shaded',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#fffef2',
        raised: '#ffffff',
        sunken: '#fbf6dc',
        overlay: '#ffffff',
        scrim: 'rgba(40, 32, 10, 0.5)',
      },
      content: {
        primary: '#0a0a0a',
        secondary: '#241f12',
        muted: '#6b6447',
        inverse: '#0a0a0a',
        link: '#c2410c',
      },
      border: {
        subtle: '#0a0a0a',
        default: '#0a0a0a',
        strong: '#0a0a0a',
        focus: '#0d9488',
      },
      intent: {
        primary: { bg: '#ff9e3d', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#fb8c1a', bgActive: '#ec7705' },
        neutral: { bg: '#fbf6dc', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#f5edc2', bgActive: '#ecdf9c' },
        success: { bg: '#9ae635', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#86d61f', bgActive: '#6cad17' },
        warning: { bg: '#ffdb33', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#f5cd0a', bgActive: '#d6b400' },
        danger:  { bg: '#ff6b5c', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#f54a39', bgActive: '#d63525' },
        info:    { bg: '#34d6c4', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#16c4b1', bgActive: '#0ea596' },
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
      thin: '2px',
      thick: '3px',
      heavy: '4px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '3px 3px 0 #0a0a0a' },
      medium: { boxShadow: '5px 5px 0 #0a0a0a' },
      high: { boxShadow: '7px 7px 0 #0a0a0a' },
      overlay: { boxShadow: '8px 8px 0 #0a0a0a, 0 24px 48px rgba(40, 32, 10, 0.26)' },
    },
    typography: {
      family: {
        ui: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: '"Baloo 2", "Poppins", "Quicksand", "Helvetica Neue", Arial, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',    weight: 800, lineHeight: '0.98', tracking: '-0.015em' },
        title:      { family: 'display', size: '2.25rem', weight: 800, lineHeight: '1.05', tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.5rem',  weight: 700, lineHeight: '1.2',  tracking: '0' },
        subheading: { family: 'ui',      size: '1.125rem',weight: 600, lineHeight: '1.3',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 700, lineHeight: '1.3',  tracking: '0.03em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 500, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 500, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '90ms',
        base: '150ms',
        slow: '240ms',
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
      focusRing: { width: '3px', offset: '2px', color: '#0d9488', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: '#0a0a0a', width: '3px' },
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
