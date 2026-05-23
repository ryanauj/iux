import type { Palette } from '../tokens/semantic.contract'

/**
 * Glassmorphism — translucent panels over a saturated background. `surface.*`
 * carries alpha (the engine's defining choice), `effect.backdropBlur.*` is
 * non-zero, borders are hairline whites for the frosted edge. `color.scrim`
 * is aggressive because the palette cannot guarantee a known background.
 *
 * `surface.base` is a saturated tone rather than a photo — palettes never own
 * the page chrome, but giving `base` a saturated value documents the
 * intended host. The README notes the AA caveat.
 */
export const palette: Palette = {
  id: 'glassmorphism',
  name: 'Glassmorphism',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#3b3a8e',
        raised: 'rgba(255, 255, 255, 0.16)',
        sunken: 'rgba(255, 255, 255, 0.08)',
        overlay: 'rgba(255, 255, 255, 0.22)',
        scrim: 'rgba(15, 23, 42, 0.40)',
      },
      content: {
        primary: '#f8fafc',
        secondary: 'rgba(248, 250, 252, 0.78)',
        muted: 'rgba(248, 250, 252, 0.56)',
        inverse: '#0f172a',
        link: '#bae6fd',
      },
      border: {
        subtle: 'rgba(255, 255, 255, 0.12)',
        default: 'rgba(255, 255, 255, 0.24)',
        strong: 'rgba(255, 255, 255, 0.40)',
        focus: '#bae6fd',
      },
      intent: {
        primary: { bg: 'rgba(186, 230, 253, 0.92)', content: '#0f172a', border: 'rgba(255, 255, 255, 0.40)', bgHover: 'rgba(186, 230, 253, 1)', bgActive: 'rgba(125, 211, 252, 1)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.16)', content: '#f8fafc', border: 'rgba(255, 255, 255, 0.24)', bgHover: 'rgba(255, 255, 255, 0.24)', bgActive: 'rgba(255, 255, 255, 0.32)' },
        success: { bg: 'rgba(134, 239, 172, 0.92)', content: '#052e16', border: 'rgba(255, 255, 255, 0.40)', bgHover: 'rgba(134, 239, 172, 1)', bgActive: 'rgba(74, 222, 128, 1)' },
        warning: { bg: 'rgba(253, 224, 71, 0.92)', content: '#422006', border: 'rgba(255, 255, 255, 0.40)', bgHover: 'rgba(253, 224, 71, 1)', bgActive: 'rgba(250, 204, 21, 1)' },
        danger:  { bg: 'rgba(252, 165, 165, 0.92)', content: '#450a0a', border: 'rgba(255, 255, 255, 0.40)', bgHover: 'rgba(252, 165, 165, 1)', bgActive: 'rgba(248, 113, 113, 1)' },
        info:    { bg: 'rgba(165, 243, 252, 0.92)', content: '#083344', border: 'rgba(255, 255, 255, 0.40)', bgHover: 'rgba(165, 243, 252, 1)', bgActive: 'rgba(103, 232, 249, 1)' },
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
      md: '12px',
      lg: '20px',
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
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 2px 8px rgba(15, 23, 42, 0.18)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.24), 0 8px 24px rgba(15, 23, 42, 0.28)' },
      high: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.32), 0 16px 40px rgba(15, 23, 42, 0.36)' },
      overlay: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.40), 0 24px 60px rgba(15, 23, 42, 0.50)' },
    },
    typography: {
      family: {
        ui: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 600, lineHeight: '1.1',  tracking: '-0.02em' },
        title:      { family: 'display', size: '1.875rem',weight: 600, lineHeight: '1.2',  tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.25rem', weight: 600, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 500, lineHeight: '1.4',  tracking: '0.01em' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
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
      focusRing: { width: '2px', offset: '2px', color: '#bae6fd', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
    },
  },
}
