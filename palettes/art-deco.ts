import type { Palette } from '../tokens/semantic.contract'

/**
 * Art Deco / Gatsby — Flat engine tuned for the 1920s ornament-and-symmetry
 * register. Deep teal-black field, champagne-gold accent, cream content,
 * a geometric display serif (Poiret One / Limelight) for headings.
 * The Roaring-Twenties poster register on the Flat engine — closer to
 * Modern Royal than to Cathedral / Stained Glass, but with teal-black
 * standing in for aubergine and champagne in place of antique gold.
 *
 *   - `surface.base` is deep teal-black (`#0e2027`) — the colour of a
 *     1920s lacquered theatre lobby. `surface.raised` lifts one notch
 *     to `#163039`. `surface.sunken` darkens to `#0a181d` for input
 *     wells.
 *   - `intent.primary.bg` is champagne gold (`#c8a96a`) with deep-teal
 *     inverse content (`#0e2027`) — the gold sits on the dark like
 *     metallic foil on a Vogue 1925 cover. `border.focus` reuses the
 *     same gold at 3 px to compensate for the dark field, the same
 *     compensation Modern Royal makes.
 *   - `typography.family.display` is a geometric Deco serif (Poiret One
 *     / Limelight fallback to Bodoni). `family.body` is Cormorant for
 *     long-form reading; `family.ui` is Inter for controls. `label`
 *     runs uppercase-tracked at 0.12em — Deco posters set every
 *     subhead in widely-tracked capitals.
 *   - `radius.*` collapses to `'0' / '0' / '4px'` for `sm` / `md` / `lg`
 *     — Deco geometry argues against rounded corners on cards, with
 *     `pill` reserved for tag affordances that need it.
 *   - `elevation.*` keeps the soft-gaussian recipe but tints toward
 *     teal-black (`rgba(8, 16, 22, 0.45)`) so cards still lift visibly
 *     against the dark field.
 */
export const palette: Palette = {
  id: 'art-deco',
  name: 'Art Deco / Gatsby',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#0e2027',
        raised: '#163039',
        sunken: '#0a181d',
        overlay: '#163039',
        scrim: 'rgba(4, 10, 14, 0.65)',
      },
      content: {
        primary: '#e8dcc0',
        secondary: '#c8b896',
        muted: '#8a7e64',
        inverse: '#0e2027',
        link: '#d8b97a',
      },
      border: {
        subtle: 'rgba(232, 220, 192, 0.12)',
        default: 'rgba(232, 220, 192, 0.28)',
        strong: '#c8a96a',
        focus: '#c8a96a',
      },
      intent: {
        primary: { bg: '#c8a96a', content: '#0e2027', border: '#a88a4e', bgHover: '#b89a5a', bgActive: '#a88a4e' },
        neutral: { bg: '#284048', content: '#e8dcc0', border: 'rgba(232, 220, 192, 0.28)', bgHover: '#324c56', bgActive: '#3e5862' },
        success: { bg: '#3a7a4a', content: '#e8dcc0', border: '#2a5c36', bgHover: '#2a5c36', bgActive: '#1c4124' },
        warning: { bg: '#c8a96a', content: '#0e2027', border: '#a88a4e', bgHover: '#b89a5a', bgActive: '#a88a4e' },
        danger:  { bg: '#8a2233', content: '#e8dcc0', border: '#6b1828', bgHover: '#6b1828', bgActive: '#4f111d' },
        info:    { bg: '#2e5a72', content: '#e8dcc0', border: '#1f4258', bgHover: '#1f4258', bgActive: '#152d3e' },
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
      sm: '0',
      md: '0',
      lg: '4px',
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
      low: { boxShadow: '0 1px 2px rgba(8, 16, 22, 0.45)' },
      medium: { boxShadow: '0 4px 8px rgba(8, 16, 22, 0.48), 0 2px 4px rgba(8, 16, 22, 0.30)' },
      high: { boxShadow: '0 10px 18px rgba(8, 16, 22, 0.52), 0 4px 6px rgba(8, 16, 22, 0.30)' },
      overlay: { boxShadow: '0 20px 32px rgba(8, 16, 22, 0.60), 0 10px 14px rgba(8, 16, 22, 0.32)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Poiret One", "Limelight", "Bodoni 72", "Didot", "Georgia", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3.25rem',  weight: 400, lineHeight: '1.05', tracking: '0.04em',  textTransform: 'uppercase' },
        title:      { family: 'display', size: '2.25rem',  weight: 400, lineHeight: '1.15', tracking: '0.03em',  textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.5rem',   weight: 400, lineHeight: '1.25', tracking: '0.02em',  textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4',  tracking: '0.08em',  textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.12em',  textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.4',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '220ms',
        slow: '360ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '3px', offset: '2px', color: '#c8a96a', style: 'solid' },
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
