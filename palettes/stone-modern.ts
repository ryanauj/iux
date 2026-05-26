import type { Palette } from '../tokens/semantic.contract'

/**
 * Stone Modern — Flat engine tuned for a warm-minimalist register
 * (Aesop, Muji, Goop-feel modern retail). Warm-stone field, near-black
 * charcoal-brown primary, single saturated rust accent for warning,
 * tight modern grotesque sans throughout. The warm-neutral sibling of
 * Dieter Rams: Rams uses cool warm-grey with Braun orange; Stone Modern
 * uses warm sand-stone with rust and routes its primary to the
 * charcoal-brown text colour itself.
 *
 *   - `surface.base` is warm stone (`#f0ece6`); `surface.raised` is
 *     bone (`#faf8f3`); `sunken` drops to `#e0dad0` for input wells.
 *     Slightly cooler at the high end of the lightness scale, slightly
 *     warmer at the low end than Heritage Maritime's bone.
 *   - `intent.primary.bg` is charcoal-brown (`#2c2620`) — the same
 *     near-black used for body text, promoted to the button slab. The
 *     palette has only one chromatic accent: rust on `warning`.
 *   - `intent.warning` is rust orange (`#c2541f`); `intent.danger` is
 *     terracotta-red (`#a8261e`); `intent.success` is forest (`#4d7942`);
 *     `intent.info` is slate (`#2d4d6a`).
 *   - `typography.family.display` is Söhne (or Inter fallback) at heavy
 *     weight — modern minimalist retail favours strong grotesque caps
 *     for display. `family.body` is the same Söhne for prose.
 *   - `space.*` widens at the high end (`6: '36px'`, `7: '52px'`,
 *     `8: '72px'`) — the modern-retail register depends on generous
 *     whitespace.
 *   - `elevation.low` is a 1 px hairline; `medium` and `high` add very
 *     low alpha drop shadows tinted toward the charcoal-brown
 *     (`rgba(44, 38, 32, 0.08)`).
 */
export const palette: Palette = {
  id: 'stone-modern',
  name: 'Stone Modern',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f0ece6',
        raised: '#faf8f3',
        sunken: '#e0dad0',
        overlay: '#faf8f3',
        scrim: 'rgba(44, 38, 32, 0.52)',
      },
      content: {
        primary: '#2c2620',
        secondary: '#564f47',
        muted: '#857e72',
        inverse: '#faf8f3',
        link: '#c2541f',
      },
      border: {
        subtle: '#e0dad0',
        default: '#c5bdaf',
        strong: '#2c2620',
        focus: '#c2541f',
      },
      intent: {
        primary: { bg: '#2c2620', content: '#faf8f3', border: '#1b1812', bgHover: '#1b1812', bgActive: '#0d0b08' },
        neutral: { bg: '#e0dad0', content: '#2c2620', border: '#c5bdaf', bgHover: '#c5bdaf', bgActive: '#a59c8c' },
        success: { bg: '#4d7942', content: '#faf8f3', border: '#385d30', bgHover: '#385d30', bgActive: '#26421f' },
        warning: { bg: '#c2541f', content: '#faf8f3', border: '#9a4218', bgHover: '#9a4218', bgActive: '#702f0e' },
        danger:  { bg: '#a8261e', content: '#faf8f3', border: '#811c16', bgHover: '#811c16', bgActive: '#5c130f' },
        info:    { bg: '#2d4d6a', content: '#faf8f3', border: '#1f384e', bgHover: '#1f384e', bgActive: '#142535' },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '20px',
      '5': '28px',
      '6': '36px',
      '7': '52px',
      '8': '72px',
    },
    radius: {
      none: '0',
      sm: '2px',
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
      low: { boxShadow: '0 0 0 1px #c5bdaf' },
      medium: { boxShadow: '0 2px 6px rgba(44, 38, 32, 0.06), 0 0 0 1px #c5bdaf' },
      high: { boxShadow: '0 10px 20px rgba(44, 38, 32, 0.10), 0 2px 4px rgba(44, 38, 32, 0.06)' },
      overlay: { boxShadow: '0 20px 36px rgba(44, 38, 32, 0.16), 0 8px 12px rgba(44, 38, 32, 0.08)' },
    },
    typography: {
      family: {
        ui: '"Söhne", "Inter", "Helvetica Neue", system-ui, sans-serif',
        display: '"Söhne", "Inter", "Helvetica Neue", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Söhne", "Inter", system-ui, sans-serif',
        hand: '"Söhne", "Inter", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 600, lineHeight: '1.05', tracking: '-0.025em' },
        title:      { family: 'display', size: '2.125rem', weight: 600, lineHeight: '1.15', tracking: '-0.015em' },
        heading:    { family: 'display', size: '1.5rem',   weight: 500, lineHeight: '1.3',  tracking: '-0.005em' },
        subheading: { family: 'ui',      size: '1rem',     weight: 500, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 500, lineHeight: '1.4',  tracking: '0.08em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.45', tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '100ms',
        base: '180ms',
        slow: '280ms',
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.2, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#c2541f', style: 'solid' },
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
