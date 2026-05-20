import type { Palette } from '../tokens/semantic.contract'

/**
 * Material — paper-and-ink metaphor. Stacked opaque surfaces, soft
 * `elevation.*` stack that does the heavy lifting, indigo primary accent,
 * Roboto family. Motion uses Material's standard easing curve and a wider
 * base/slow band so the ripple-style press feels right.
 */
export const palette: Palette = {
  id: 'material',
  name: 'Material',
  engine: 'material',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#fafafa',
        raised: '#ffffff',
        sunken: '#f1f3f5',
        overlay: '#ffffff',
        scrim: 'rgba(0, 0, 0, 0.50)',
      },
      content: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.60)',
        muted: 'rgba(0, 0, 0, 0.38)',
        inverse: '#ffffff',
        link: '#1565c0',
      },
      border: {
        subtle: 'rgba(0, 0, 0, 0.08)',
        default: 'rgba(0, 0, 0, 0.16)',
        strong: 'rgba(0, 0, 0, 0.32)',
        focus: '#1976d2',
      },
      intent: {
        primary: { bg: '#1976d2', content: '#ffffff', border: '#1976d2', bgHover: '#1565c0', bgActive: '#0d47a1' },
        neutral: { bg: '#eceff1', content: 'rgba(0, 0, 0, 0.87)', border: 'rgba(0, 0, 0, 0.12)', bgHover: '#cfd8dc', bgActive: '#b0bec5' },
        success: { bg: '#2e7d32', content: '#ffffff', border: '#2e7d32', bgHover: '#1b5e20', bgActive: '#1b5e20' },
        warning: { bg: '#ef6c00', content: '#ffffff', border: '#ef6c00', bgHover: '#e65100', bgActive: '#bf360c' },
        danger:  { bg: '#c62828', content: '#ffffff', border: '#c62828', bgHover: '#b71c1c', bgActive: '#7f0000' },
        info:    { bg: '#0288d1', content: '#ffffff', border: '#0288d1', bgHover: '#0277bd', bgActive: '#01579b' },
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
      sm: '4px',
      md: '4px',
      lg: '8px',
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
      low: { boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)' },
      medium: { boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' },
      high: { boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)' },
      overlay: { boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)' },
    },
    typography: {
      family: {
        ui: 'Roboto, system-ui, -apple-system, "Segoe UI", sans-serif',
        display: 'Roboto, system-ui, -apple-system, "Segoe UI", sans-serif',
        mono: '"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
      },
      role: {
        display:    { family: 'display', size: '3rem',    weight: 300, lineHeight: '1.15', tracking: '-0.01em' },
        title:      { family: 'display', size: '2rem',    weight: 400, lineHeight: '1.2',  tracking: '0' },
        heading:    { family: 'display', size: '1.5rem',  weight: 500, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1.125rem',weight: 500, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.5',  tracking: '0.01em' },
        label:      { family: 'ui',      size: '0.875rem',weight: 500, lineHeight: '1.4',  tracking: '0.02em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '150ms',
        base: '250ms',
        slow: '400ms',
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#1976d2', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
    },
  },
}
