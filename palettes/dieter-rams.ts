import type { Palette } from '../tokens/semantic.contract'

/**
 * Dieter Rams / Braun — Flat engine tuned for the Ulm-and-Braun
 * industrial-design register. Cool warm-grey field, near-white raised
 * surfaces, a single saturated orange as the only chromatic intent
 * (the colour of a Braun ET66 calculator's `=` key), Helvetica
 * throughout. The "less but better" register on the Flat engine —
 * structurally identical to Swiss / International but warmer in the
 * neutrals and with orange standing in for signal red.
 *
 *   - `surface.base` is cool warm-grey (`#e9e8e5`) — the colour of a
 *     plastic Braun product housing under daylight. `surface.raised`
 *     is `#f7f6f3` (an off-white close to product-photography seamless
 *     paper); `sunken` drops to `#dad8d3` for input wells.
 *   - `intent.primary.bg` is Braun orange (`#e25822`) — the saturated
 *     orange on a Braun ET66 `=` key and the SK4 record-player rim.
 *     `border.focus` reuses the same orange. Every other intent stays
 *     desaturated so the single orange reads as the only chromatic note.
 *     `intent.warning` shifts the orange to a more amber tone (`#cc6f1a`)
 *     so the two intents don't read identical when stacked.
 *   - `typography.family.ui` / `family.body` / `family.display` are all
 *     Helvetica (the typeface every Ulm and Braun designer reached for).
 *     Display is sentence-case at modest size — Ulm typography is
 *     restrained, never showy.
 *   - `space.*` widens slightly at the high end (`6: '36px'`, `7: '52px'`,
 *     `8: '72px'`) — Ulm layouts rely on generous whitespace as the
 *     organising tool.
 *   - `elevation.*` is near-flat: `low` is a 1 px hairline rule
 *     (`0 0 0 1px #cfccc4`), `medium` adds a very low alpha drop, `high`
 *     deepens it. Cards almost don't lift — the field organises itself
 *     by the type and the grid, not by depth.
 *   - `radius.*` collapses to `'0' / '0' / '2px' / '6px' / '999px'` —
 *     product detailing on Braun objects favoured square corners with
 *     small radii on softgoods.
 */
export const palette: Palette = {
  id: 'dieter-rams',
  name: 'Dieter Rams / Braun',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#e9e8e5',
        raised: '#f7f6f3',
        sunken: '#dad8d3',
        overlay: '#f7f6f3',
        scrim: 'rgba(34, 32, 30, 0.55)',
      },
      content: {
        primary: '#1d1c1a',
        secondary: '#4a4844',
        muted: '#807d77',
        inverse: '#f7f6f3',
        link: '#e25822',
      },
      border: {
        subtle: '#dad8d3',
        default: '#cfccc4',
        strong: '#1d1c1a',
        focus: '#e25822',
      },
      intent: {
        primary: { bg: '#e25822', content: '#ffffff', border: '#b8421a', bgHover: '#b8421a', bgActive: '#923414' },
        neutral: { bg: '#dad8d3', content: '#1d1c1a', border: '#cfccc4', bgHover: '#cfccc4', bgActive: '#b6b3aa' },
        success: { bg: '#2e6a3a', content: '#ffffff', border: '#1f4c28', bgHover: '#1f4c28', bgActive: '#15351c' },
        warning: { bg: '#cc6f1a', content: '#ffffff', border: '#a25612', bgHover: '#a25612', bgActive: '#7a410d' },
        danger:  { bg: '#a8201a', content: '#ffffff', border: '#811814', bgHover: '#811814', bgActive: '#5c100e' },
        info:    { bg: '#2e5a8c', content: '#ffffff', border: '#1f4068', bgHover: '#1f4068', bgActive: '#152c48' },
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
      sm: '0',
      md: '2px',
      lg: '6px',
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
      low: { boxShadow: '0 0 0 1px #cfccc4' },
      medium: { boxShadow: '0 2px 4px rgba(34, 32, 30, 0.05), 0 0 0 1px #cfccc4' },
      high: { boxShadow: '0 8px 16px rgba(34, 32, 30, 0.08), 0 0 0 1px #cfccc4' },
      overlay: { boxShadow: '0 18px 32px rgba(34, 32, 30, 0.14), 0 6px 10px rgba(34, 32, 30, 0.06)' },
    },
    typography: {
      family: {
        ui: '"Helvetica Neue", "Helvetica", "Inter", "Söhne", system-ui, sans-serif',
        display: '"Helvetica Neue", "Helvetica", "Inter", "Söhne", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Helvetica Neue", "Helvetica", "Inter", system-ui, sans-serif',
        hand: '"Helvetica Neue", "Helvetica", "Inter", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.5rem',  weight: 500, lineHeight: '1.1',  tracking: '-0.01em' },
        title:      { family: 'display', size: '1.875rem',weight: 500, lineHeight: '1.2',  tracking: '-0.005em' },
        heading:    { family: 'display', size: '1.375rem',weight: 500, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',    weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.06em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.4',  tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '100ms',
        base: '160ms',
        slow: '260ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#e25822', style: 'solid' },
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
