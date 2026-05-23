import type { Palette } from '../tokens/semantic.contract'

/**
 * Neumorphism — the cautionary palette. A single near-monochrome surface
 * with paired inner + outer shadow doing all the depth work. Borders are
 * deliberately set to the same value as the surface (effectively invisible);
 * elevation.* packs the canonical Soft UI shadow stack (top-left highlight,
 * bottom-right shade) into one slot per level.
 *
 * The README documents that this palette CANNOT meet WCAG AA for body or
 * icon text against the tonal field — that's the point. We ship it as
 * `experimental` so the showcase can demonstrate the failure mode concretely.
 */
export const palette: Palette = {
  id: 'neumorphism',
  name: 'Neumorphism',
  engine: 'neumorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#e0e5ec',
        raised: '#e0e5ec',
        sunken: '#e0e5ec',
        overlay: '#e0e5ec',
        scrim: 'rgba(163, 177, 198, 0.55)',
      },
      content: {
        primary: '#445063',
        secondary: '#5d6b81',
        muted: '#8c97a8',
        inverse: '#ffffff',
        link: '#4c6ef5',
      },
      border: {
        subtle: '#e0e5ec',
        default: '#e0e5ec',
        strong: '#cdd3da',
        focus: '#4c6ef5',
      },
      intent: {
        primary: { bg: '#e0e5ec', content: '#4c6ef5', border: '#e0e5ec', bgHover: '#dfe4eb', bgActive: '#d8dde4' },
        neutral: { bg: '#e0e5ec', content: '#445063', border: '#e0e5ec', bgHover: '#dfe4eb', bgActive: '#d8dde4' },
        success: { bg: '#e0e5ec', content: '#2f9e44', border: '#e0e5ec', bgHover: '#dfe4eb', bgActive: '#d8dde4' },
        warning: { bg: '#e0e5ec', content: '#b76d00', border: '#e0e5ec', bgHover: '#dfe4eb', bgActive: '#d8dde4' },
        danger:  { bg: '#e0e5ec', content: '#c92a2a', border: '#e0e5ec', bgHover: '#dfe4eb', bgActive: '#d8dde4' },
        info:    { bg: '#e0e5ec', content: '#1c7ed6', border: '#e0e5ec', bgHover: '#dfe4eb', bgActive: '#d8dde4' },
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
      lg: '22px',
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
      flat: { boxShadow: 'inset 4px 4px 8px rgba(163, 177, 198, 0.60), inset -4px -4px 8px rgba(255, 255, 255, 0.85)' },
      low: { boxShadow: '4px 4px 8px rgba(163, 177, 198, 0.60), -4px -4px 8px rgba(255, 255, 255, 0.85)' },
      medium: { boxShadow: '8px 8px 16px rgba(163, 177, 198, 0.55), -8px -8px 16px rgba(255, 255, 255, 0.85)' },
      high: { boxShadow: '12px 12px 24px rgba(163, 177, 198, 0.50), -12px -12px 24px rgba(255, 255, 255, 0.85)' },
      overlay: { boxShadow: '20px 20px 40px rgba(163, 177, 198, 0.50), -20px -20px 40px rgba(255, 255, 255, 0.90)' },
    },
    typography: {
      family: {
        ui: '"Nunito", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: '"Nunito", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Nunito", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: '"Nunito", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.5rem',  weight: 700, lineHeight: '1.15', tracking: '-0.01em' },
        title:      { family: 'display', size: '1.875rem',weight: 700, lineHeight: '1.2',  tracking: '0' },
        heading:    { family: 'display', size: '1.25rem', weight: 700, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',    weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 600, lineHeight: '1.4',  tracking: '0.01em' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 500, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 500, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '160ms',
        base: '260ms',
        slow: '420ms',
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '4px', color: '#4c6ef5', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
    },
  },
}
