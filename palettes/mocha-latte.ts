import type { Palette } from '../tokens/semantic.contract'

/**
 * Mocha Latte — Flat engine tuned for a warm coffee-shop / third-wave
 * café register. Oat-cream field, mocha-brown primary, cinnamon warning,
 * matcha success, cool-blue info. Warmer than Stone Modern (which leans
 * cool charcoal), more coffee-table than Sage Studio (which leans
 * botanical-leaf). The "modern café web presence" aesthetic — warm
 * espresso accents on hand-pressed paper.
 *
 *   - `surface.base` is oat-cream (`#f5eddd`); `surface.raised` lifts to
 *     latté-foam (`#fcf7ea`); `sunken` drops to `#e8ddc6` for input
 *     wells. The whole field has a 4-5% yellow-warm undertone — espresso-
 *     stained paper, not bone or bright cream.
 *   - `intent.primary.bg` is mocha brown (`#6f4b2d`) — the espresso-with-
 *     cream colour, with bone-cream inverse content at ≈ 7.5:1. `intent.
 *     warning` is cinnamon (`#c97d2a`); `intent.success` is matcha green
 *     (`#5a7c3a`); `intent.danger` is signal red (`#a8261e`); `intent.info`
 *     is cool slate-blue (`#3a5c7c`) — the only cool colour on the
 *     palette, sitting against everything else for state contrast.
 *   - `typography.family.display` is Recoleta (or Fraunces fallback) — a
 *     warm modern transitional serif that pairs with the espresso colour
 *     register. `family.body` and `family.ui` route to Inter for prose.
 *   - `radius.*` widens (`sm = 4px / md = 10px / lg = 16px`) — café
 *     branding favours warm, soft corners without going pillow-soft.
 *   - `elevation.*` shadows tint toward espresso (`rgba(46, 34, 24, 0.10)`)
 *     so cards lift as a saucer above the table-paper field.
 */
export const palette: Palette = {
  id: 'mocha-latte',
  name: 'Mocha Latte',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f5eddd',
        raised: '#fcf7ea',
        sunken: '#e8ddc6',
        overlay: '#fcf7ea',
        scrim: 'rgba(46, 34, 24, 0.48)',
      },
      content: {
        primary: '#2e2218',
        secondary: '#5a4a3a',
        muted: '#8a7864',
        inverse: '#fcf7ea',
        link: '#6f4b2d',
      },
      border: {
        subtle: '#e8ddc6',
        default: '#caba9c',
        strong: '#6f4b2d',
        focus: '#6f4b2d',
      },
      intent: {
        primary: { bg: '#6f4b2d', content: '#fcf7ea', border: '#553820', bgHover: '#553820', bgActive: '#3c2614' },
        neutral: { bg: '#e8ddc6', content: '#2e2218', border: '#caba9c', bgHover: '#caba9c', bgActive: '#a8987a' },
        success: { bg: '#5a7c3a', content: '#fcf7ea', border: '#446028', bgHover: '#446028', bgActive: '#2f441a' },
        warning: { bg: '#c97d2a', content: '#fcf7ea', border: '#a26221', bgHover: '#a26221', bgActive: '#7a4818' },
        danger:  { bg: '#a8261e', content: '#fcf7ea', border: '#811c16', bgHover: '#811c16', bgActive: '#5c130f' },
        info:    { bg: '#3a5c7c', content: '#fcf7ea', border: '#2a445c', bgHover: '#2a445c', bgActive: '#1c3040' },
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
      low: { boxShadow: '0 1px 2px rgba(46, 34, 24, 0.08)' },
      medium: { boxShadow: '0 4px 10px rgba(46, 34, 24, 0.10), 0 2px 4px rgba(46, 34, 24, 0.06)' },
      high: { boxShadow: '0 12px 22px rgba(46, 34, 24, 0.14), 0 4px 8px rgba(46, 34, 24, 0.08)' },
      overlay: { boxShadow: '0 24px 36px rgba(46, 34, 24, 0.20), 0 10px 14px rgba(46, 34, 24, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Recoleta", "Fraunces", "DM Serif Text", "Georgia", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", system-ui, sans-serif',
        hand: '"Inter", "Söhne", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 600, lineHeight: '1.05', tracking: '-0.015em' },
        title:      { family: 'display', size: '2.125rem', weight: 600, lineHeight: '1.15', tracking: '-0.005em' },
        heading:    { family: 'display', size: '1.5rem',   weight: 500, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.65', tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.08em', textTransform: 'uppercase' },
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
      focusRing: { width: '2px', offset: '2px', color: '#6f4b2d', style: 'solid' },
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
