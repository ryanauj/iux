import type { Palette } from '../tokens/semantic.contract'

/**
 * Metro / Light — Flat engine tuned for the transit-map information-graphic
 * register. Near-white field, hairline "track-rule" borders, Helvetica
 * everywhere, pill-shaped station tags via `radius.full`. The MTA Standards
 * Manual aesthetic translated into a generic palette: the load-bearing
 * visual is the hairline border carrying every raised surface (no drop
 * shadow), and the line-colour vocabulary lives in the standard
 * `intent.*` slots (primary = NYC-MTA red, info = blue, etc.) rather
 * than a new `color.category.*` namespace — the contract addition is
 * deferred until a second palette needs it.
 *
 *   - `surface.base` is `#fcfcfc`; `surface.raised` is `#ffffff`. Borders
 *     are a 1 px hairline `#e6e6e6` rule — the "track-rule" that
 *     separates map regions. `surface.sunken` drops to `#f4f4f4` for
 *     input wells.
 *   - Intents take their colours from the MTA / NYC Subway / London
 *     Underground / Tokyo Metro shared line-colour palette: red
 *     (`#ee352e` — 1/2/3 line), blue (`#0039a6` — A/C/E line), green
 *     (`#00933c` — 4/5/6 line), orange (`#ff6319` — B/D/F/M line),
 *     yellow (`#fccc0a` — N/Q/R/W line), purple (`#b933ad` — 7 line).
 *     `intent.primary.bg` is the red; `intent.info` is the blue;
 *     `intent.success` is the green; `intent.warning` is the orange
 *     pulled down to `#b6420c` so white inverse text reads at WCAG UI
 *     contrast — the brighter B/D/F/M line orange survives in the JSDoc
 *     reference but the painted fill carries the deeper shade; `intent.danger`
 *     reuses red one step darker (`#c8201a`).
 *   - `radius.lg` keeps `'10px'` for cards; `radius.pill` (`'999px'`)
 *     is the one most palettes return as `'999px'` already and Metro
 *     exercises through station-tag chips. Nothing palette-specific
 *     about the radius scale.
 *   - `typography.family.display` and `family.ui` are both Helvetica
 *     (the canonical transit-map type, NYC MTA Standards Manual). The
 *     two-family split most palettes use (sans body + display) collapses
 *     to a single family — Helvetica does both jobs at different sizes
 *     and weights.
 *   - `elevation.low` is `'none'` — the hairline border on raised
 *     surfaces carries the lift, the same trick Wikipedia uses.
 *     `elevation.overlay` keeps a soft drop shadow so modals lift above
 *     the map plane.
 */
export const palette: Palette = {
  id: 'metro-light',
  name: 'Metro / Light',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#fcfcfc',
        raised: '#ffffff',
        sunken: '#f4f4f4',
        overlay: '#ffffff',
        scrim: 'rgba(0, 0, 0, 0.46)',
      },
      content: {
        primary: '#0a0a0a',
        secondary: '#4a4a4a',
        muted: '#7a7a7a',
        inverse: '#ffffff',
        link: '#0039a6',
      },
      border: {
        subtle: '#ececec',
        default: '#e6e6e6',
        strong: '#9c9c9c',
        focus: '#0039a6',
      },
      intent: {
        primary: { bg: '#ee352e', content: '#ffffff', border: '#c8201a', bgHover: '#d62a25', bgActive: '#a81814' },
        neutral: { bg: '#f4f4f4', content: '#0a0a0a', border: '#e6e6e6', bgHover: '#e6e6e6', bgActive: '#cccccc' },
        success: { bg: '#00933c', content: '#ffffff', border: '#007530', bgHover: '#007530', bgActive: '#005c24' },
        warning: { bg: '#b6420c', content: '#ffffff', border: '#9c3808', bgHover: '#9c3808', bgActive: '#823006' },
        danger:  { bg: '#c8201a', content: '#ffffff', border: '#a81814', bgHover: '#a81814', bgActive: '#8a120e' },
        info:    { bg: '#0039a6', content: '#ffffff', border: '#002a7c', bgHover: '#002a7c', bgActive: '#001e5a' },
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
      low: { boxShadow: '0 0 0 1px #e6e6e6' },
      medium: { boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06), 0 0 0 1px #e6e6e6' },
      high: { boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px #e6e6e6' },
      overlay: { boxShadow: '0 16px 32px rgba(0, 0, 0, 0.16), 0 6px 12px rgba(0, 0, 0, 0.08)' },
    },
    typography: {
      family: {
        ui: '"Helvetica Neue", "Helvetica", "Arial", system-ui, sans-serif',
        display: '"Helvetica Neue", "Helvetica", "Arial", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Helvetica Neue", "Helvetica", "Arial", system-ui, sans-serif',
        hand: '"Helvetica Neue", "Helvetica", "Arial", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 700, lineHeight: '1.1',  tracking: '-0.015em' },
        title:      { family: 'display', size: '2rem',     weight: 700, lineHeight: '1.2',  tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.375rem', weight: 700, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 700, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 700, lineHeight: '1.4',  tracking: '0.04em',  textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.4',  tracking: '0' },
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
      focusRing: { width: '2px', offset: '2px', color: '#0039a6', style: 'solid' },
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
