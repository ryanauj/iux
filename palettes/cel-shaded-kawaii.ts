import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-shaded (Kawaii) — soft pastel-pop register on the anime engine. Same
 * machinery as the shonen / shojo variants: flat fills bounded by hard ink
 * outlines, two-tone hard-offset shading delivered through `elevation.*`,
 * the ink halo via `effect.outline`. Only `color.*` changes — a mint-white
 * page and a candy set of pink / mint / sky / lemon pastels, every fill
 * carrying ink-black text so the cel-outline affordance reads identically
 * to the rest of the family.
 */
export const palette: Palette = {
  id: 'cel-shaded-kawaii',
  name: 'Cel-shaded (Kawaii)',
  engine: 'cel-shaded',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f6fffb',
        raised: '#ffffff',
        sunken: '#e6fbf1',
        overlay: '#ffffff',
        scrim: 'rgba(15, 60, 47, 0.5)',
      },
      content: {
        primary: '#0a0a0a',
        secondary: '#243029',
        muted: '#5f7068',
        inverse: '#0a0a0a',
        link: '#d6457f',
      },
      border: {
        subtle: '#0a0a0a',
        default: '#0a0a0a',
        strong: '#0a0a0a',
        focus: '#ff8ac4',
      },
      intent: {
        primary: { bg: '#ff8ac4', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ff6fb4', bgActive: '#f54e9d' },
        neutral: { bg: '#e6fbf1', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#d3f6e5', bgActive: '#b6efd2' },
        success: { bg: '#5ce6a8', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#34d98e', bgActive: '#1fb976' },
        warning: { bg: '#ffe066', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ffd633', bgActive: '#ebbf00' },
        danger:  { bg: '#ff7a8a', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#f95668', bgActive: '#e03650' },
        info:    { bg: '#7cc6ff', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#56b3ff', bgActive: '#2f99f5' },
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
      sm: '8px',
      md: '14px',
      lg: '20px',
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
      overlay: { boxShadow: '8px 8px 0 #0a0a0a, 0 24px 48px rgba(15, 60, 47, 0.28)' },
    },
    typography: {
      family: {
        ui: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: '"Baloo 2", "Quicksand", "Poppins", "Comfortaa", "Helvetica Neue", Arial, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',    weight: 800, lineHeight: '1.0',  tracking: '-0.015em' },
        title:      { family: 'display', size: '2.25rem', weight: 800, lineHeight: '1.05', tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.5rem',  weight: 700, lineHeight: '1.2',  tracking: '0' },
        subheading: { family: 'ui',      size: '1.125rem',weight: 600, lineHeight: '1.3',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 600, lineHeight: '1.3',  tracking: '0.02em' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 500, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 500, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '90ms',
        base: '160ms',
        slow: '260ms',
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
      focusRing: { width: '3px', offset: '2px', color: '#ff8ac4', style: 'solid' },
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
