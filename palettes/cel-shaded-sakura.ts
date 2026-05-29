import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-shaded (Sakura) — spring register on the anime engine: blossom-pink
 * primary against matcha green, on a warm petal-white field. Shares the
 * engine machinery with the rest of the cel-shaded family (ink outline
 * halo, two-tone hard-offset shading via `elevation.*`); only `color.*`
 * differs from shojo — a pink/green complementary pair (sakura petals over
 * new leaves) rather than shojo's pink/lavender dream set. Every fill keeps
 * ink-black text.
 */
export const palette: Palette = {
  id: 'cel-shaded-sakura',
  name: 'Cel-shaded (Sakura)',
  engine: 'cel-shaded',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#fff7f8',
        raised: '#ffffff',
        sunken: '#fdeaef',
        overlay: '#ffffff',
        scrim: 'rgba(74, 30, 45, 0.5)',
      },
      content: {
        primary: '#0a0a0a',
        secondary: '#2b1f24',
        muted: '#7a6168',
        inverse: '#0a0a0a',
        link: '#db2777',
      },
      border: {
        subtle: '#0a0a0a',
        default: '#0a0a0a',
        strong: '#0a0a0a',
        focus: '#65a30d',
      },
      intent: {
        primary: { bg: '#f9a8d4', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#f57ec0', bgActive: '#ec4faa' },
        neutral: { bg: '#fdeaef', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#fbd6e1', bgActive: '#f7b6cb' },
        success: { bg: '#86d96b', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#6dcd4d', bgActive: '#55b336' },
        warning: { bg: '#ffcf5c', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ffc233', bgActive: '#ebab00' },
        danger:  { bg: '#ff7a8a', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#f95668', bgActive: '#e03650' },
        info:    { bg: '#a5b4fc', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#8b9bf9', bgActive: '#6b80f5' },
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
      md: '12px',
      lg: '18px',
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
      overlay: { boxShadow: '8px 8px 0 #0a0a0a, 0 24px 48px rgba(74, 30, 45, 0.28)' },
    },
    typography: {
      family: {
        ui: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: '"Poppins", "Quicksand", "Comfortaa", "Helvetica Neue", Arial, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',    weight: 700, lineHeight: '1.0',  tracking: '-0.01em' },
        title:      { family: 'display', size: '2.25rem', weight: 700, lineHeight: '1.05', tracking: '-0.005em' },
        heading:    { family: 'display', size: '1.5rem',  weight: 600, lineHeight: '1.2',  tracking: '0' },
        subheading: { family: 'ui',      size: '1.125rem',weight: 600, lineHeight: '1.3',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 600, lineHeight: '1.3',  tracking: '0.02em' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
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
      focusRing: { width: '3px', offset: '2px', color: '#65a30d', style: 'solid' },
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
