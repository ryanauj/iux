import type { Palette } from '../tokens/semantic.contract'

/**
 * Data-dense light — flat engine in a Tufte-influenced data-viz
 * register. Financial Terminal's friendlier cousin: same density
 * stance, but with a cool near-white field, ink-slate body, and
 * desaturated semantic intents that survive on a light surface
 * without shouting.
 *
 *   - `surface.base` is a near-white cool grey (`#fcfcfd`); `raised`
 *     is full white. The two are close enough that a `Card` reads as
 *     "the field, framed" rather than as "a chip lifted off the field"
 *     — Tufte's instruction that the data is the figure and the
 *     chrome is the ground.
 *   - `content.primary` is ink slate (`#0e131a`) — almost black but
 *     tilted slightly cool to match the surface. `secondary` and
 *     `muted` are tonal greys; `link` is a restrained indigo
 *     (`#2549a8`) rather than a saturated link blue.
 *   - The intent set is desaturated for data-viz parity: every fill
 *     sits one or two steps off vivid so categorical color in a chart
 *     (small-multiples, bar grids, scatter dots) reads as data, not as
 *     decoration. `intent.primary` is restrained indigo; `info` is a
 *     deeper teal-blue; `success` is forest green; `warning` is umber;
 *     `danger` is brick red.
 *   - `radius.*` is hairline: `0` through `sm`, `2px` at `md`, `4px`
 *     at `lg`. The data wants rectangular cells, not rounded chips.
 *   - `space.*` is the Flat default; the type scale (below) is what
 *     does the densification, not the spacing scale, because tight
 *     spacing with normal type sizes produces a cramped read while
 *     small type with normal spacing produces the Tufte register.
 *   - `typography.role.*` is sparkline-ready: `body = '0.875rem'`
 *     (14 px), `label = '0.75rem'` (12 px), `caption = '0.6875rem'`
 *     (11 px). Tight enough that a row of small-multiples each carries
 *     a legible tick label without needing palette-specific overrides
 *     in the chart component. `code` uses `IBM Plex Mono` with the
 *     CSS font-feature-settings the engine applies for tabular figures
 *     — the contract has no `font-feature-settings` slot, but the mono
 *     family choice carries tabular-figure defaults in every browser.
 *   - `motion.*` is short and linear-ish — `base = '160ms'` — so
 *     hover-state-change on a dense table doesn't feel sluggish.
 *
 *   - `effect.overlay.*` is `'none'` — Tufte's instruction is that
 *     non-data ink is wasted ink. No decoration on the root.
 */
export const palette: Palette = {
  id: 'data-dense-light',
  name: 'Data-dense light',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#fcfcfd',
        raised: '#ffffff',
        sunken: '#f4f5f7',
        overlay: '#ffffff',
        scrim: 'rgba(14, 19, 26, 0.42)',
      },
      content: {
        primary: '#0e131a',
        secondary: '#3d4651',
        muted: '#6b7280',
        inverse: '#ffffff',
        link: '#2549a8',
      },
      border: {
        subtle: '#eef0f3',
        default: '#d8dce2',
        strong: '#9aa1ad',
        focus: '#2549a8',
      },
      intent: {
        primary: { bg: '#2549a8', content: '#ffffff', border: '#1c3a8a', bgHover: '#1c3a8a', bgActive: '#152c6a' },
        neutral: { bg: '#eef0f3', content: '#0e131a', border: '#d8dce2', bgHover: '#e3e6eb', bgActive: '#d1d6dd' },
        success: { bg: '#1f6b3a', content: '#ffffff', border: '#155028', bgHover: '#155028', bgActive: '#0e3a1c' },
        warning: { bg: '#8a5a0d', content: '#ffffff', border: '#6a4308', bgHover: '#6a4308', bgActive: '#4a2e05' },
        danger:  { bg: '#a32424', content: '#ffffff', border: '#7e1818', bgHover: '#7e1818', bgActive: '#5a1010' },
        info:    { bg: '#1d6b87', content: '#ffffff', border: '#155068', bgHover: '#155068', bgActive: '#0e3a4c' },
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
      md: '2px',
      lg: '4px',
      pill: '999px',
      full: '9999px',
    },
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '1px',
      thick: '1px',
      heavy: '2px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: 'inset 0 0 0 1px #eef0f3' },
      medium: { boxShadow: 'inset 0 0 0 1px #d8dce2' },
      high: { boxShadow: 'inset 0 0 0 1px #d8dce2, 0 1px 2px rgba(14, 19, 26, 0.04)' },
      overlay: { boxShadow: 'inset 0 0 0 1px #d8dce2, 0 8px 24px rgba(14, 19, 26, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Inter", "IBM Plex Sans", "Helvetica Neue", system-ui, -apple-system, sans-serif',
        display: '"Inter", "IBM Plex Sans", "Helvetica Neue", system-ui, -apple-system, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", "SF Mono", "Menlo", "Consolas", ui-monospace, monospace',
        pixel: '"Inter", "IBM Plex Sans", "Helvetica Neue", system-ui, -apple-system, sans-serif',
        hand: '"Inter", "IBM Plex Sans", "Helvetica Neue", system-ui, -apple-system, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '1.625rem',  weight: 600, lineHeight: '1.2',  tracking: '-0.01em' },
        title:      { family: 'display', size: '1.25rem',   weight: 600, lineHeight: '1.25', tracking: '-0.005em' },
        heading:    { family: 'display', size: '1.0625rem', weight: 600, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '0.9375rem', weight: 600, lineHeight: '1.35', tracking: '0' },
        body:       { family: 'ui',      size: '0.875rem',  weight: 400, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',   weight: 600, lineHeight: '1.3',  tracking: '0.02em',  textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.6875rem', weight: 400, lineHeight: '1.3',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.8125rem', weight: 400, lineHeight: '1.45', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '100ms',
        base: '160ms',
        slow: '240ms',
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
      focusRing: { width: '2px', offset: '1px', color: '#2549a8', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      // Aurora engine no-op signals. `atmosphereGradient: 'none'` and
      // `luminanceCenter: 'transparent'` mean the engine CSS that paints
      // the gradient and luminance glow at `.palette-root[data-palette^='aurora']`
      // doesn't paint here. `surfaceBy: 'border'` records that this palette
      // demarcates surfaces with a stroke (the default), not with light density.
      atmosphereGradient: 'none',
      luminanceCenter: 'transparent',
      surfaceBy: 'border',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
