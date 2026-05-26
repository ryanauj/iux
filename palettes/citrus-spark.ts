import type { Palette } from '../tokens/semantic.contract'

/**
 * Citrus Spark — Flat engine tuned for a bright, energetic modern brand
 * register. Bright off-white field with a barely-yellow tint, citrus
 * yellow primary with dark content (the only intent that doesn't carry
 * white inverse), lime success, signal-red danger, modern geometric
 * sans throughout. The "energetic D2C brand site" register — bright
 * but never neon, saturated but never confrontational.
 *
 *   - `surface.base` is bright off-white with a barely-yellow tint
 *     (`#fdfcf6`); `surface.raised` is pure white (`#ffffff`); `sunken`
 *     drops to `#f4f1e6` for input wells. The 1% yellow undertone
 *     warms the field just enough to read as "fresh squeezed."
 *   - `intent.primary.bg` is citrus yellow (`#f9c70d`) — the load-bearing
 *     colour move. Yellow buttons can't carry white text legibly, so
 *     `intent.primary.content` is near-black (`#1a1d1a`) — the inversion
 *     of the standard pattern, justified by the 12:1 dark-on-yellow
 *     contrast.
 *   - `intent.warning` is sun-warmed amber (`#c2671e`) — distinct from
 *     primary yellow so warning toasts don't read as branded chrome.
 *     `intent.success` is lime green (`#4d8c3b`); `intent.danger` is
 *     signal red (`#d6391c`); `intent.info` is mid-blue (`#1f6db8`).
 *   - `typography.family.display` is Space Grotesk (modern geometric sans
 *     with playful character) at heavy weight; `family.body` and
 *     `family.ui` route to Inter for clean prose.
 *   - `radius.*` widens to `sm = 6px / md = 12px / lg = 20px` — bright
 *     friendly brands favour soft corners; sharp + bright reads as
 *     warning, not energy.
 *   - `elevation.*` shadows tint warm (`rgba(80, 60, 0, 0.10)`) — the
 *     yellow-warm undertone of the brand carries into the depth cue.
 */
export const palette: Palette = {
  id: 'citrus-spark',
  name: 'Citrus Spark',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#fdfcf6',
        raised: '#ffffff',
        sunken: '#f4f1e6',
        overlay: '#ffffff',
        scrim: 'rgba(26, 29, 26, 0.48)',
      },
      content: {
        primary: '#1a1d1a',
        secondary: '#4a4d44',
        muted: '#7d8074',
        inverse: '#ffffff',
        link: '#1f6db8',
      },
      border: {
        subtle: '#ece8d8',
        default: '#d4cfb8',
        strong: '#1a1d1a',
        focus: '#f9c70d',
      },
      intent: {
        primary: { bg: '#f9c70d', content: '#1a1d1a', border: '#d4a808', bgHover: '#e6b80a', bgActive: '#c69a06' },
        neutral: { bg: '#f4f1e6', content: '#1a1d1a', border: '#d4cfb8', bgHover: '#ece8d8', bgActive: '#d4cfb8' },
        success: { bg: '#4d8c3b', content: '#ffffff', border: '#386f28', bgHover: '#386f28', bgActive: '#26521b' },
        warning: { bg: '#c2671e', content: '#ffffff', border: '#9a5018', bgHover: '#9a5018', bgActive: '#723a10' },
        danger:  { bg: '#d6391c', content: '#ffffff', border: '#ad2c14', bgHover: '#ad2c14', bgActive: '#85200d' },
        info:    { bg: '#1f6db8', content: '#ffffff', border: '#175594', bgHover: '#175594', bgActive: '#114070' },
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
      low: { boxShadow: '0 1px 2px rgba(80, 60, 0, 0.10)' },
      medium: { boxShadow: '0 4px 10px rgba(80, 60, 0, 0.12), 0 2px 4px rgba(80, 60, 0, 0.06)' },
      high: { boxShadow: '0 12px 22px rgba(80, 60, 0, 0.14), 0 4px 8px rgba(80, 60, 0, 0.08)' },
      overlay: { boxShadow: '0 24px 40px rgba(26, 29, 26, 0.20), 0 10px 14px rgba(26, 29, 26, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Space Grotesk", "Inter", "Söhne", system-ui, sans-serif',
        mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", system-ui, sans-serif',
        hand: '"Inter", "Söhne", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3.25rem',  weight: 700, lineHeight: '1.05', tracking: '-0.025em' },
        title:      { family: 'display', size: '2.25rem',  weight: 700, lineHeight: '1.15', tracking: '-0.02em' },
        heading:    { family: 'display', size: '1.5rem',   weight: 600, lineHeight: '1.3',  tracking: '-0.005em' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4',  tracking: '0.02em' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.45', tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
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
        spring: 'cubic-bezier(0.34, 1.5, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#f9c70d', style: 'solid' },
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
