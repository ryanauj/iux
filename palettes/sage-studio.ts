import type { Palette } from '../tokens/semantic.contract'

/**
 * Sage Studio — Flat engine tuned for a modern botanical / wellness-brand
 * register. Bone-paper field, sage-green primary, terracotta warning, a
 * matcha-green success that differentiates from primary by hue rather
 * than by luminance, a warm modern transitional serif on display.
 * Quieter than Solarpunk (which saturates everything for eco-utopian
 * optimism) and warmer than Scandinavian Royal Modern (which leans
 * cool and royal).
 *
 *   - `surface.base` is bone (`#f3efe6`); `surface.raised` is fresh
 *     paper (`#faf7ee`); `sunken` drops to `#e5dfd0`. The whole field
 *     has a 2-3% yellow undertone that grounds the sage as the colour
 *     of dried herbs against unbleached linen.
 *   - `intent.primary.bg` is deep sage (`#3e5d3a`) — a desaturated
 *     forest-leaf colour, sitting between olive and pine.
 *     `intent.warning` is terracotta (`#c25624`), a kiln-fired clay
 *     orange. `intent.success` is matcha (`#5a7c3a`) — visibly lighter
 *     than primary so the two greens don't collapse on stacked alerts.
 *     `intent.danger` is signal red (`#a8261e`), `intent.info` is
 *     slate-blue (`#2d5a8c`).
 *   - `typography.family.display` is Fraunces (or DM Serif Text fallback)
 *     — a contemporary transitional serif with a soft-modern feel; bold
 *     for `display` / `title`. `family.body` and `family.ui` are Inter.
 *   - `radius.*` widens to `sm = 4px / md = 10px / lg = 16px` — modern
 *     wellness brands favour rounded but not pillow-soft curves.
 *   - `elevation.*` shadows tint toward sage (`rgba(45, 60, 35, 0.10)`)
 *     so raised cards lift as pressed-paper above linen, not as neutral
 *     panels.
 */
export const palette: Palette = {
  id: 'sage-studio',
  name: 'Sage Studio',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f3efe6',
        raised: '#faf7ee',
        sunken: '#e5dfd0',
        overlay: '#faf7ee',
        scrim: 'rgba(37, 41, 31, 0.48)',
      },
      content: {
        primary: '#25291f',
        secondary: '#4a5040',
        muted: '#7a806e',
        inverse: '#faf7ee',
        link: '#3e5d3a',
      },
      border: {
        subtle: '#e5dfd0',
        default: '#c8c0ad',
        strong: '#3e5d3a',
        focus: '#3e5d3a',
      },
      intent: {
        primary: { bg: '#3e5d3a', content: '#faf7ee', border: '#2d4528', bgHover: '#2d4528', bgActive: '#1d2f1a' },
        neutral: { bg: '#e5dfd0', content: '#25291f', border: '#c8c0ad', bgHover: '#c8c0ad', bgActive: '#a8a08c' },
        success: { bg: '#5a7c3a', content: '#faf7ee', border: '#446028', bgHover: '#446028', bgActive: '#2f441a' },
        warning: { bg: '#c25624', content: '#faf7ee', border: '#9a4218', bgHover: '#9a4218', bgActive: '#702f0e' },
        danger:  { bg: '#a8261e', content: '#faf7ee', border: '#811c16', bgHover: '#811c16', bgActive: '#5c130f' },
        info:    { bg: '#2d5a8c', content: '#faf7ee', border: '#1f4268', bgHover: '#1f4268', bgActive: '#142d48' },
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
      sm: '4px',
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
      flat: { boxShadow: 'none' },
      low: { boxShadow: '0 1px 2px rgba(45, 60, 35, 0.08)' },
      medium: { boxShadow: '0 4px 10px rgba(45, 60, 35, 0.10), 0 2px 4px rgba(45, 60, 35, 0.06)' },
      high: { boxShadow: '0 12px 22px rgba(45, 60, 35, 0.14), 0 4px 8px rgba(45, 60, 35, 0.08)' },
      overlay: { boxShadow: '0 24px 36px rgba(37, 41, 31, 0.18), 0 10px 14px rgba(37, 41, 31, 0.08)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Fraunces", "DM Serif Text", "Bodoni Moda", "Georgia", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 600, lineHeight: '1.05', tracking: '-0.015em' },
        title:      { family: 'display', size: '2.125rem', weight: 600, lineHeight: '1.15', tracking: '-0.005em' },
        heading:    { family: 'display', size: '1.5rem',   weight: 500, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.65', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 500, lineHeight: '1.4',  tracking: '0' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.45', tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '220ms',
        slow: '340ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#3e5d3a', style: 'solid' },
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
