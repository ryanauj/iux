import type { Palette } from '../tokens/semantic.contract'

/**
 * Iridescent Opal — the pearlescent-holographic register on the
 * Glassmorphism engine. Where Sea Glass is a single frosted aqua, Opal is
 * the whole nacre sheen at once: a cool pearl-white field that shifts
 * between lilac, rose, mint, and sky, translucent surfaces with a soft
 * highlight bloom, and a deep iris ink. The intents are the spectral
 * pastels of a fire opal catching light.
 *
 * Ships `experimental` like the glass family — translucent pearlescent
 * fills are tuned for the shimmer, not measured for AA on an arbitrary
 * backdrop.
 */
export const palette: Palette = {
  id: 'iridescent-opal',
  name: 'Iridescent Opal',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#eef0f6',
        raised: 'rgba(255, 255, 255, 0.56)',
        sunken: 'rgba(236, 233, 247, 0.42)',
        overlay: 'rgba(255, 255, 255, 0.72)',
        scrim: 'rgba(42, 39, 64, 0.24)',
      },
      content: {
        primary: '#2a2740',
        secondary: 'rgba(42, 39, 64, 0.72)',
        muted: 'rgba(42, 39, 64, 0.48)',
        inverse: '#f8f7fd',
        link: '#7b5cd6',
      },
      border: {
        subtle: 'rgba(255, 255, 255, 0.58)',
        default: 'rgba(214, 206, 240, 0.62)',
        strong: 'rgba(176, 158, 224, 0.80)',
        focus: '#9a7df0',
      },
      intent: {
        primary: { bg: 'rgba(200, 188, 244, 0.86)', content: '#2c1f55', border: 'rgba(255, 255, 255, 0.66)', bgHover: 'rgba(200, 188, 244, 0.96)', bgActive: 'rgba(176, 160, 234, 0.96)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.56)', content: '#2a2740', border: 'rgba(255, 255, 255, 0.66)', bgHover: 'rgba(255, 255, 255, 0.70)', bgActive: 'rgba(255, 255, 255, 0.82)' },
        success: { bg: 'rgba(186, 232, 209, 0.88)', content: '#103d2b', border: 'rgba(255, 255, 255, 0.66)', bgHover: 'rgba(186, 232, 209, 1)', bgActive: 'rgba(150, 214, 184, 1)' },
        warning: { bg: 'rgba(248, 220, 198, 0.90)', content: '#5a3a1c', border: 'rgba(255, 255, 255, 0.66)', bgHover: 'rgba(248, 220, 198, 1)', bgActive: 'rgba(238, 198, 168, 1)' },
        danger:  { bg: 'rgba(248, 196, 214, 0.90)', content: '#5e1b34', border: 'rgba(255, 255, 255, 0.66)', bgHover: 'rgba(248, 196, 214, 1)', bgActive: 'rgba(238, 164, 192, 1)' },
        info:    { bg: 'rgba(190, 214, 248, 0.88)', content: '#16335e', border: 'rgba(255, 255, 255, 0.66)', bgHover: 'rgba(190, 214, 248, 1)', bgActive: 'rgba(154, 190, 238, 1)' },
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
      md: '20px',
      lg: '30px',
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
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.58), 0 1px 6px rgba(124, 92, 214, 0.10)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.62), 0 6px 18px rgba(124, 92, 214, 0.12)' },
      high: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.68), 0 12px 30px rgba(124, 92, 214, 0.16)' },
      overlay: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.72), 0 22px 44px rgba(124, 92, 214, 0.22)' },
    },
    typography: {
      family: {
        ui: '"Sora", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: '"Sora", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Sora", "Inter", system-ui, sans-serif',
        hand: '"Sora", "Inter", system-ui, sans-serif',
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
        base: '360ms',
        slow: '560ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.5, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'blur(6px)', md: 'blur(16px)', lg: 'blur(28px)' },
      focusRing: { width: '2px', offset: '2px', color: '#9a7df0', style: 'solid' },
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
