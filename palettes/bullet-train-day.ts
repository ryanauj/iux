import type { Palette } from '../tokens/semantic.contract'

/**
 * Bullet Train / Day — Flat engine tuned for the Shinkansen livery
 * register. Pale-sky-blue field, deep-navy `intent.primary`, signal-
 * yellow focus ring — the N700 series in two tokens. The differentiator
 * is motion: a long ease-out (`cubic-bezier(0.05, 0.7, 0.1, 1)`)
 * matched with `duration.base = '260ms'` mirrors a train decelerating
 * into a platform, and `radius.lg` is asymmetric (`'16px 16px 4px 4px'`)
 * — rounded leading edge, square trailing edge — so cards, buttons, and
 * modals all carry a directional pill that reads as forward motion.
 *
 *   - `surface.base` is pale sky `#eaf3fb`; `surface.raised` is `#ffffff`.
 *     The brighter raised surface reads like a train carriage against
 *     the sky.
 *   - `intent.primary.bg` is deep navy `#0a2540` — the N700 nose-cone
 *     blue. `intent.warning.bg` is signal yellow `#ffd400` (the JR-East
 *     ticket-gate yellow that doubles as the focus colour). `intent.info`
 *     reuses the deep navy.
 *   - `radius.lg` is the load-bearing visual: `'16px 16px 4px 4px'` —
 *     `border-radius` top-left, top-right, bottom-right, bottom-left.
 *     Cards, buttons (default to `radius.lg`), modals all inherit the
 *     directional shape because they consume the same slot.
 *   - `motion.easing.standard` is `cubic-bezier(0.05, 0.7, 0.1, 1)` — a
 *     long ease-out that holds momentum and then settles. `duration.base`
 *     is `'260ms'` (vs Flat / Classic's `'200ms'`) to give the easing
 *     room to read. Reduced-motion still collapses to `'0ms'`, same as
 *     every other palette.
 *   - `typography.family.display` is Bahnschrift / D-DIN — the German
 *     industrial sans the Shinkansen livery font (HG Sans) descends
 *     from; the showcase doesn't ship HG Sans so we use the European
 *     cousin. `family.body` is Inter.
 *   - `elevation.*` keeps the Flat / Classic recipe with a cooler shadow
 *     tint (`rgba(10, 37, 64, 0.08)` at `low`).
 */
export const palette: Palette = {
  id: 'bullet-train-day',
  name: 'Bullet Train / Day',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#eaf3fb',
        raised: '#ffffff',
        sunken: '#dde9f4',
        overlay: '#ffffff',
        scrim: 'rgba(10, 37, 64, 0.46)',
      },
      content: {
        primary: '#0a2540',
        secondary: '#3a4a62',
        muted: '#6a7a90',
        inverse: '#ffffff',
        link: '#0a4c8c',
      },
      border: {
        subtle: '#dbe7f2',
        default: '#c4d5e8',
        strong: '#0a2540',
        focus: '#ffd400',
      },
      intent: {
        primary: { bg: '#0a2540', content: '#ffffff', border: '#061830', bgHover: '#061830', bgActive: '#030d1e' },
        neutral: { bg: '#dde9f4', content: '#0a2540', border: '#c4d5e8', bgHover: '#c4d5e8', bgActive: '#a8bcd4' },
        success: { bg: '#0a7d3a', content: '#ffffff', border: '#08602c', bgHover: '#08602c', bgActive: '#054520' },
        warning: { bg: '#ffd400', content: '#0a2540', border: '#d4af00', bgHover: '#ebc200', bgActive: '#c4a300' },
        danger:  { bg: '#c8102e', content: '#ffffff', border: '#a40d26', bgHover: '#b00e29', bgActive: '#8a0b20' },
        info:    { bg: '#0a4c8c', content: '#ffffff', border: '#073a6c', bgHover: '#073a6c', bgActive: '#052a4e' },
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
      md: '8px',
      lg: '16px 16px 4px 4px',
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
      low: { boxShadow: '0 1px 2px rgba(10, 37, 64, 0.08)' },
      medium: { boxShadow: '0 4px 6px rgba(10, 37, 64, 0.10), 0 2px 4px rgba(10, 37, 64, 0.05)' },
      high: { boxShadow: '0 10px 15px rgba(10, 37, 64, 0.12), 0 4px 6px rgba(10, 37, 64, 0.06)' },
      overlay: { boxShadow: '0 20px 25px rgba(10, 37, 64, 0.14), 0 10px 10px rgba(10, 37, 64, 0.05)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Bahnschrift", "D-DIN", "DIN Next", "DIN 1451", "Roboto Condensed", "Helvetica Neue", sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 700, lineHeight: '1.05', tracking: '0.01em' },
        title:      { family: 'display', size: '2rem',     weight: 700, lineHeight: '1.15', tracking: '0.005em' },
        heading:    { family: 'display', size: '1.375rem', weight: 700, lineHeight: '1.25', tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'display', size: '0.8125rem',weight: 700, lineHeight: '1.4',  tracking: '0.08em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.4',  tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0' },
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
        standard: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '3px', offset: '2px', color: '#ffd400', style: 'solid' },
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
