import type { Palette } from '../tokens/semantic.contract'

/**
 * Heritage Maritime — Flat engine tuned for the nautical / chandlery
 * register. Bone-white field, deep-navy primary, brass-fitting warning,
 * signal-red danger, a serif display for ship-builder name plates. The
 * register sailing-yachts and harbour-front insurance offices have used
 * unchanged since the 1890s.
 *
 *   - `surface.base` is bone white (`#f4ecd9`) — old chart paper or
 *     painted-wood cabin trim; `surface.raised` is `#fbf4e2` (a fresh
 *     bulkhead panel); `surface.sunken` drops to `#e6dcc2`.
 *   - `intent.primary.bg` is deep navy (`#0d2e4a`) — Royal Navy hull
 *     paint, the one near-black on the palette. `intent.warning.bg` is
 *     polished brass (`#a07634`) — the colour of a binnacle fitting in
 *     low sun. `intent.danger.bg` is signal red (`#a8261e`) — the
 *     halyard pennant red of a "halt" signal. `intent.info` reuses navy
 *     because nautical signalling treats navy as the default register.
 *   - `typography.family.display` is a slab serif (Roboto Slab /
 *     Adelle), the brass-plaque face used on ship-builder name plates
 *     and insurance certificates. `family.body` is Crimson Text for
 *     long-form serif body; `family.ui` is Inter for controls.
 *   - `radius.*` collapses `sm` / `md` / `lg` to `'2px' / '4px' / '6px'`
 *     — the curve of a yacht's varnished trim is real but small.
 *   - `elevation.*` keeps the Flat / Classic recipe with a cool-tinted
 *     shadow (`rgba(13, 46, 74, 0.10)`) so cards lift as polished
 *     varnish above painted-canvas decks, not as neutral panels.
 *   - `border.subtle` and `border.default` are navy at low alpha — the
 *     "pinstripe trim" border colour, picking up the primary without
 *     adding a second saturated accent to the field.
 */
export const palette: Palette = {
  id: 'heritage-maritime',
  name: 'Heritage Maritime',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f4ecd9',
        raised: '#fbf4e2',
        sunken: '#e6dcc2',
        overlay: '#fbf4e2',
        scrim: 'rgba(13, 46, 74, 0.52)',
      },
      content: {
        primary: '#1a2530',
        secondary: '#3e4d5c',
        muted: '#7a8390',
        inverse: '#fbf4e2',
        link: '#0d2e4a',
      },
      border: {
        subtle: 'rgba(13, 46, 74, 0.14)',
        default: 'rgba(13, 46, 74, 0.28)',
        strong: '#0d2e4a',
        focus: '#a8261e',
      },
      intent: {
        primary: { bg: '#0d2e4a', content: '#fbf4e2', border: '#072138', bgHover: '#072138', bgActive: '#031628' },
        neutral: { bg: '#e6dcc2', content: '#1a2530', border: '#c8bd9c', bgHover: '#c8bd9c', bgActive: '#a89d7a' },
        success: { bg: '#2e6a3a', content: '#fbf4e2', border: '#1f4c28', bgHover: '#1f4c28', bgActive: '#14361a' },
        warning: { bg: '#a07634', content: '#fbf4e2', border: '#7a5926', bgHover: '#7a5926', bgActive: '#583f1a' },
        danger:  { bg: '#a8261e', content: '#fbf4e2', border: '#811c16', bgHover: '#811c16', bgActive: '#5c130f' },
        info:    { bg: '#0d2e4a', content: '#fbf4e2', border: '#072138', bgHover: '#072138', bgActive: '#031628' },
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
      sm: '2px',
      md: '4px',
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
      low: { boxShadow: '0 1px 2px rgba(13, 46, 74, 0.10)' },
      medium: { boxShadow: '0 4px 8px rgba(13, 46, 74, 0.12), 0 2px 4px rgba(13, 46, 74, 0.06)' },
      high: { boxShadow: '0 10px 18px rgba(13, 46, 74, 0.16), 0 4px 8px rgba(13, 46, 74, 0.08)' },
      overlay: { boxShadow: '0 20px 32px rgba(13, 46, 74, 0.22), 0 10px 14px rgba(13, 46, 74, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Roboto Slab", "Adelle", "Rockwell", "Georgia", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 700, lineHeight: '1.1',  tracking: '0.005em' },
        title:      { family: 'display', size: '2.125rem', weight: 700, lineHeight: '1.2',  tracking: '0' },
        heading:    { family: 'display', size: '1.5rem',   weight: 600, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.10em', textTransform: 'uppercase' },
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
        spring: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#a8261e', style: 'solid' },
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
