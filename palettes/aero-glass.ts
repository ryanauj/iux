import type { Palette } from '../tokens/semantic.contract'

/**
 * Aero Glass — Windows Vista/7 register on the Glassmorphism engine.
 * Distinctly wetter than Liquid Glass: heavier inset white highlights
 * along the top edge, an answering inset dark line along the bottom
 * (the "rim" Vista's panels carried), and a saturated blue
 * `surface.base` so the blue-tinted translucent `raised` panels read
 * as Vista chrome rather than neutral glass. `elevation.*` shadow
 * saturation rides up (`rgba(8,23,51,0.30 → 0.60)`) to keep the wet
 * gloss intact even at low elevation.
 */
export const palette: Palette = {
  id: 'aero-glass',
  name: 'Aero Glass',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#1e4d8b',
        raised: 'rgba(195, 222, 255, 0.22)',
        sunken: 'rgba(195, 222, 255, 0.10)',
        overlay: 'rgba(195, 222, 255, 0.32)',
        scrim: 'rgba(8, 23, 51, 0.55)',
      },
      content: {
        primary: '#f0f9ff',
        secondary: 'rgba(240, 249, 255, 0.82)',
        muted: 'rgba(240, 249, 255, 0.60)',
        inverse: '#0c2a4d',
        link: '#bee3ff',
      },
      border: {
        subtle: 'rgba(255, 255, 255, 0.22)',
        default: 'rgba(255, 255, 255, 0.40)',
        strong: 'rgba(255, 255, 255, 0.62)',
        focus: '#7dd3fc',
      },
      intent: {
        primary: { bg: 'rgba(125, 211, 252, 0.88)', content: '#0c2a4d', border: 'rgba(255, 255, 255, 0.55)', bgHover: 'rgba(125, 211, 252, 0.98)', bgActive: 'rgba(56, 189, 248, 0.98)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.18)', content: '#f0f9ff', border: 'rgba(255, 255, 255, 0.38)', bgHover: 'rgba(255, 255, 255, 0.28)', bgActive: 'rgba(255, 255, 255, 0.38)' },
        success: { bg: 'rgba(134, 239, 172, 0.88)', content: '#052e16', border: 'rgba(255, 255, 255, 0.55)', bgHover: 'rgba(134, 239, 172, 0.98)', bgActive: 'rgba(74, 222, 128, 0.98)' },
        warning: { bg: 'rgba(253, 224, 71, 0.88)', content: '#422006', border: 'rgba(255, 255, 255, 0.55)', bgHover: 'rgba(253, 224, 71, 0.98)', bgActive: 'rgba(250, 204, 21, 0.98)' },
        danger:  { bg: 'rgba(252, 165, 165, 0.88)', content: '#450a0a', border: 'rgba(255, 255, 255, 0.55)', bgHover: 'rgba(252, 165, 165, 0.98)', bgActive: 'rgba(248, 113, 113, 0.98)' },
        info:    { bg: 'rgba(165, 243, 252, 0.88)', content: '#083344', border: 'rgba(255, 255, 255, 0.55)', bgHover: 'rgba(165, 243, 252, 0.98)', bgActive: 'rgba(103, 232, 249, 0.98)' },
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
      thin: '1px',
      thick: '2px',
      heavy: '3px',
    },
    elevation: {
      flat: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.32)' },
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.50), inset 0 -1px 0 rgba(8, 23, 51, 0.18), 0 2px 4px rgba(8, 23, 51, 0.30)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.60), inset 0 -1px 0 rgba(8, 23, 51, 0.22), 0 4px 10px rgba(8, 23, 51, 0.38)' },
      high: { boxShadow: 'inset 0 2px 0 rgba(255, 255, 255, 0.65), inset 0 -2px 0 rgba(8, 23, 51, 0.26), 0 10px 22px rgba(8, 23, 51, 0.46)' },
      overlay: { boxShadow: 'inset 0 2px 0 rgba(255, 255, 255, 0.70), inset 0 -2px 0 rgba(8, 23, 51, 0.30), 0 18px 40px rgba(8, 23, 51, 0.60)' },
    },
    typography: {
      family: {
        ui: '"Segoe UI", "Segoe UI Variable", Tahoma, Verdana, sans-serif',
        display: '"Segoe UI", "Segoe UI Variable", Tahoma, Verdana, sans-serif',
        mono: 'Consolas, "Lucida Console", "JetBrains Mono", ui-monospace, monospace',
      },
      role: {
        display:    { family: 'display', size: '2.5rem',  weight: 300, lineHeight: '1.15', tracking: '-0.005em' },
        title:      { family: 'display', size: '1.75rem', weight: 400, lineHeight: '1.2',  tracking: '0' },
        heading:    { family: 'display', size: '1.25rem', weight: 600, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',    weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.5', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4', tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '120ms',
        base: '220ms',
        slow: '380ms',
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
      backdropBlur: { none: 'none', sm: 'blur(6px)', md: 'blur(14px)', lg: 'blur(24px)' },
      focusRing: { width: '2px', offset: '2px', color: '#7dd3fc', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
    },
  },
}
