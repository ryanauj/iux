import type { Palette } from '../tokens/semantic.contract'

/**
 * Modern Royal — Flat engine tuned for the regalia register stripped of
 * ornament. Deep aubergine field, antique-gold accent, modern geometric
 * sans body over a Cormorant display serif. The "regal colour palette
 * applied without filigree" register the same way Mall-goth is the
 * "crepuscular colour palette applied without ornament."
 *
 *   - `surface.base` is deep aubergine (`#1f0d2a`); `raised` lifts one
 *     notch to `#2a1538`; `overlay` matches `raised` so modals layer as
 *     the same material. No gradients, no two-tone fills — opaque
 *     surfaces on a dark royal field.
 *   - `intent.primary.bg` is antique gold (`#b8893a`) with near-black
 *     `content`. `border.focus` reuses the same gold at a heavier 3 px
 *     to read against the dark field — same focusRing slot, scaled.
 *   - `typography.family.display` is Cormorant Garamond; `family.ui`
 *     and `family.body` are Inter / system geometric sans. The serif
 *     ↔ sans contrast does the regal work without committing the body
 *     copy to a slower-to-read serif.
 *   - `elevation.*` keeps the Flat / Classic soft-gaussian recipe but
 *     raises shadow alpha (`rgba(0,0,0,0.40)` at `low`) so cards still
 *     lift visibly against the deep field.
 *   - `motion.*` matches Flat / Classic — no slowing, no spring; the
 *     register is delivered by colour and type, not by motion signature.
 */
export const palette: Palette = {
  id: 'modern-royal',
  name: 'Modern Royal',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#1f0d2a',
        raised: '#2a1538',
        sunken: '#170820',
        overlay: '#2a1538',
        scrim: 'rgba(8, 4, 12, 0.62)',
      },
      content: {
        primary: '#f5ecda',
        secondary: '#cdb78a',
        muted: '#8c7556',
        inverse: '#1f0d2a',
        link: '#d6a85a',
      },
      border: {
        subtle: 'rgba(245, 236, 218, 0.10)',
        default: 'rgba(245, 236, 218, 0.22)',
        strong: 'rgba(245, 236, 218, 0.42)',
        focus: '#b8893a',
      },
      intent: {
        primary: { bg: '#b8893a', content: '#1f0d2a', border: '#9c7128', bgHover: '#a47930', bgActive: '#866020' },
        neutral: { bg: '#3a2249', content: '#f5ecda', border: 'rgba(245, 236, 218, 0.22)', bgHover: '#46295a', bgActive: '#532f6c' },
        success: { bg: '#3f6b4a', content: '#f5ecda', border: '#2f5238', bgHover: '#2f5238', bgActive: '#234029' },
        warning: { bg: '#b8893a', content: '#1f0d2a', border: '#9c7128', bgHover: '#a47930', bgActive: '#866020' },
        danger:  { bg: '#8a2233', content: '#f5ecda', border: '#6b1828', bgHover: '#6b1828', bgActive: '#4f111d' },
        info:    { bg: '#3b5a8c', content: '#f5ecda', border: '#2b446c', bgHover: '#2b446c', bgActive: '#1e3252' },
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
      md: '6px',
      lg: '10px',
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
      low: { boxShadow: '0 1px 2px rgba(0, 0, 0, 0.40)' },
      medium: { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.42), 0 2px 4px rgba(0, 0, 0, 0.32)' },
      high: { boxShadow: '0 10px 15px rgba(0, 0, 0, 0.48), 0 4px 6px rgba(0, 0, 0, 0.32)' },
      overlay: { boxShadow: '0 20px 25px rgba(0, 0, 0, 0.55), 0 10px 10px rgba(0, 0, 0, 0.32)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Cormorant Garamond", "Cormorant", "Sorts Mill Goudy", "Garamond", "Georgia", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 500, lineHeight: '1.05', tracking: '-0.01em' },
        title:      { family: 'display', size: '2.125rem', weight: 500, lineHeight: '1.15', tracking: '-0.005em' },
        heading:    { family: 'display', size: '1.5rem',   weight: 500, lineHeight: '1.25', tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4',  tracking: '0.06em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '120ms',
        base: '200ms',
        slow: '320ms',
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
      focusRing: { width: '3px', offset: '2px', color: '#b8893a', style: 'solid' },
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
