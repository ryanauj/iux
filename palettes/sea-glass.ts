import type { Palette } from '../tokens/semantic.contract'

/**
 * Sea Glass — the beach-tumbled-glass register on the Glassmorphism engine.
 * Frosted, surf-worn aqua and seafoam: a hazy tidal-mist field, translucent
 * surfaces the colour of a bottle shard sanded matte by the sea, and a deep
 * kelp-ink for legibility. Backdrop blur stays soft (the glass is frosted,
 * never clear), borders are foam-white at low alpha.
 *
 * Ships `experimental` like the glass family — translucent fills are tuned
 * for the frosted look, not measured for AA against an arbitrary backdrop.
 */
export const palette: Palette = {
  id: 'sea-glass',
  name: 'Sea Glass',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#dfeaea',
        raised: 'rgba(255, 255, 255, 0.52)',
        sunken: 'rgba(255, 255, 255, 0.30)',
        overlay: 'rgba(255, 255, 255, 0.70)',
        scrim: 'rgba(23, 58, 58, 0.26)',
      },
      content: {
        primary: '#173a3a',
        secondary: 'rgba(23, 58, 58, 0.74)',
        muted: 'rgba(23, 58, 58, 0.50)',
        inverse: '#f4fbfb',
        link: '#0f7d7d',
      },
      border: {
        subtle: 'rgba(255, 255, 255, 0.55)',
        default: 'rgba(178, 224, 219, 0.62)',
        strong: 'rgba(110, 197, 190, 0.82)',
        focus: '#14a8a0',
      },
      intent: {
        primary: { bg: 'rgba(155, 214, 208, 0.85)', content: '#0c3d3a', border: 'rgba(255, 255, 255, 0.65)', bgHover: 'rgba(155, 214, 208, 0.95)', bgActive: 'rgba(120, 196, 189, 0.95)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.52)', content: '#173a3a', border: 'rgba(255, 255, 255, 0.65)', bgHover: 'rgba(255, 255, 255, 0.66)', bgActive: 'rgba(255, 255, 255, 0.80)' },
        success: { bg: 'rgba(178, 224, 184, 0.88)', content: '#143d22', border: 'rgba(255, 255, 255, 0.65)', bgHover: 'rgba(178, 224, 184, 1)', bgActive: 'rgba(140, 206, 150, 1)' },
        warning: { bg: 'rgba(240, 226, 173, 0.90)', content: '#4a3d12', border: 'rgba(255, 255, 255, 0.65)', bgHover: 'rgba(240, 226, 173, 1)', bgActive: 'rgba(224, 204, 134, 1)' },
        danger:  { bg: 'rgba(238, 180, 168, 0.90)', content: '#5a2015', border: 'rgba(255, 255, 255, 0.65)', bgHover: 'rgba(238, 180, 168, 1)', bgActive: 'rgba(222, 148, 132, 1)' },
        info:    { bg: 'rgba(170, 214, 224, 0.88)', content: '#0e3744', border: 'rgba(255, 255, 255, 0.65)', bgHover: 'rgba(170, 214, 224, 1)', bgActive: 'rgba(132, 192, 208, 1)' },
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
      sm: '12px',
      md: '18px',
      lg: '28px',
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
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 1px 4px rgba(23, 58, 58, 0.08)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.60), 0 4px 14px rgba(23, 58, 58, 0.10)' },
      high: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.65), 0 8px 24px rgba(23, 58, 58, 0.14)' },
      overlay: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.70), 0 16px 36px rgba(23, 58, 58, 0.20)' },
    },
    typography: {
      family: {
        ui: '"Outfit", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: '"Outfit", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Outfit", "Inter", system-ui, sans-serif',
        hand: '"Outfit", "Inter", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 600, lineHeight: '1.1',  tracking: '-0.02em' },
        title:      { family: 'display', size: '1.875rem',weight: 600, lineHeight: '1.2',  tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.25rem', weight: 600, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 500, lineHeight: '1.4',  tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '200ms',
        base: '340ms',
        slow: '520ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'blur(6px)', md: 'blur(14px)', lg: 'blur(26px)' },
      focusRing: { width: '2px', offset: '2px', color: '#14a8a0', style: 'solid' },
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
