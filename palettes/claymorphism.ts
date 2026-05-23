import type { Palette } from '../tokens/semantic.contract'

/**
 * Claymorphism — inflated 3D gumdrops. `radius.lg` is large (24px+),
 * `elevation.*` packs a doubled-shadow recipe (outer drop + inner highlight)
 * to get the soft, puffy quality. Pastel surfaces, vibrant pastel intents,
 * black-ish content for legibility on the lights.
 */
export const palette: Palette = {
  id: 'claymorphism',
  name: 'Claymorphism',
  engine: 'claymorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f5f0ff',
        raised: '#ffffff',
        sunken: '#ece4ff',
        overlay: '#ffffff',
        scrim: 'rgba(76, 29, 149, 0.40)',
      },
      content: {
        primary: '#2e1065',
        secondary: '#4c1d95',
        muted: '#7c3aed',
        inverse: '#ffffff',
        link: '#6d28d9',
      },
      border: {
        subtle: 'rgba(76, 29, 149, 0.08)',
        default: 'rgba(76, 29, 149, 0.14)',
        strong: 'rgba(76, 29, 149, 0.28)',
        focus: '#7c3aed',
      },
      intent: {
        primary: { bg: '#a78bfa', content: '#1e1b4b', border: 'rgba(76, 29, 149, 0.20)', bgHover: '#9275f3', bgActive: '#7c5cea' },
        neutral: { bg: '#f3eaff', content: '#2e1065', border: 'rgba(76, 29, 149, 0.16)', bgHover: '#ece4ff', bgActive: '#ddd0f9' },
        success: { bg: '#86efac', content: '#052e16', border: 'rgba(5, 46, 22, 0.20)',   bgHover: '#6ee69a', bgActive: '#4ade80' },
        warning: { bg: '#fcd34d', content: '#422006', border: 'rgba(66, 32, 6, 0.20)',   bgHover: '#fbbf24', bgActive: '#f59e0b' },
        danger:  { bg: '#fda4af', content: '#4c0519', border: 'rgba(76, 5, 25, 0.20)',   bgHover: '#fb7185', bgActive: '#f43f5e' },
        info:    { bg: '#7dd3fc', content: '#082f49', border: 'rgba(8, 47, 73, 0.20)',   bgHover: '#38bdf8', bgActive: '#0ea5e9' },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '24px',
      '6': '36px',
      '7': '52px',
      '8': '72px',
    },
    radius: {
      none: '0',
      sm: '16px',
      md: '24px',
      lg: '32px',
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
      low: { boxShadow: 'inset 0 -4px 0 rgba(76, 29, 149, 0.15), inset 0 4px 0 rgba(255, 255, 255, 0.50), 0 8px 16px rgba(76, 29, 149, 0.18)' },
      medium: { boxShadow: 'inset 0 -6px 0 rgba(76, 29, 149, 0.18), inset 0 6px 0 rgba(255, 255, 255, 0.55), 0 16px 28px rgba(76, 29, 149, 0.22)' },
      high: { boxShadow: 'inset 0 -8px 0 rgba(76, 29, 149, 0.20), inset 0 8px 0 rgba(255, 255, 255, 0.60), 0 24px 40px rgba(76, 29, 149, 0.28)' },
      overlay: { boxShadow: 'inset 0 -10px 0 rgba(76, 29, 149, 0.22), inset 0 10px 0 rgba(255, 255, 255, 0.65), 0 32px 60px rgba(76, 29, 149, 0.36)' },
    },
    typography: {
      family: {
        ui: '"Quicksand", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: '"Quicksand", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Quicksand", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 700, lineHeight: '1.15', tracking: '-0.01em' },
        title:      { family: 'display', size: '2rem',    weight: 700, lineHeight: '1.2',  tracking: '0' },
        heading:    { family: 'display', size: '1.375rem',weight: 700, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1.125rem',weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 700, lineHeight: '1.4',  tracking: '0.01em' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 600, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 500, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '180ms',
        base: '280ms',
        slow: '460ms',
      },
      easing: {
        standard: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.7, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '3px', offset: '4px', color: '#7c3aed', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
    },
  },
}
