import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-shaded (Mecha) — cool, technical register on the anime engine, the
 * mecha / HUD counterpoint to the warm shojo and pastel kawaii variants.
 * Same engine machinery (ink outline halo, two-tone hard-offset shading via
 * `elevation.*`) but a cooler steel-white field and a primary steel-blue
 * fill dark enough to carry light text, paired with a hazard-orange warning
 * for the cockpit-alert feel. Display type switches to a squared technical
 * face. Tighter radius than the rounder shojo/kawaii cuts.
 */
export const palette: Palette = {
  id: 'cel-shaded-mecha',
  name: 'Cel-shaded (Mecha)',
  engine: 'cel-shaded',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f3f7fa',
        raised: '#ffffff',
        sunken: '#e6edf3',
        overlay: '#ffffff',
        scrim: 'rgba(15, 27, 45, 0.55)',
      },
      content: {
        primary: '#0a0f16',
        secondary: '#1f2a38',
        muted: '#566374',
        inverse: '#f3f7fa',
        link: '#1d4ed8',
      },
      border: {
        subtle: '#0a0f16',
        default: '#0a0f16',
        strong: '#0a0f16',
        focus: '#ff7a18',
      },
      intent: {
        primary: { bg: '#2563eb', content: '#f3f7fa', border: '#0a0f16', bgHover: '#1d4ed8', bgActive: '#1e40af' },
        neutral: { bg: '#e6edf3', content: '#0a0f16', border: '#0a0f16', bgHover: '#d6e0ea', bgActive: '#bccbda' },
        success: { bg: '#22d3a6', content: '#0a0f16', border: '#0a0f16', bgHover: '#0fc093', bgActive: '#0a9c78' },
        warning: { bg: '#ff8c1a', content: '#0a0f16', border: '#0a0f16', bgHover: '#f57c05', bgActive: '#d66a00' },
        danger:  { bg: '#ff4d5e', content: '#0a0f16', border: '#0a0f16', bgHover: '#ef3145', bgActive: '#cf1d31' },
        info:    { bg: '#38bdf8', content: '#0a0f16', border: '#0a0f16', bgHover: '#13a8ef', bgActive: '#0a8ecf' },
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
      sm: '3px',
      md: '6px',
      lg: '10px',
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
      low: { boxShadow: '3px 3px 0 #0a0f16' },
      medium: { boxShadow: '5px 5px 0 #0a0f16' },
      high: { boxShadow: '7px 7px 0 #0a0f16' },
      overlay: { boxShadow: '8px 8px 0 #0a0f16, 0 24px 48px rgba(15, 27, 45, 0.3)' },
    },
    typography: {
      family: {
        ui: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: '"Chakra Petch", "Rajdhani", "Saira", "Helvetica Neue", Arial, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',    weight: 700, lineHeight: '1.0',  tracking: '0.01em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '2.25rem', weight: 700, lineHeight: '1.05', tracking: '0.01em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.5rem',  weight: 700, lineHeight: '1.2',  tracking: '0.01em' },
        subheading: { family: 'ui',      size: '1.125rem',weight: 600, lineHeight: '1.3',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 600, lineHeight: '1.3',  tracking: '0.04em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 500, lineHeight: '1.4',  tracking: '0.02em' },
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
      focusRing: { width: '3px', offset: '2px', color: '#ff7a18', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: '#0a0f16', width: '3px' },
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
