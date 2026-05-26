import type { Palette } from '../tokens/semantic.contract'

/**
 * Coastal Modern — Flat engine tuned for a contemporary coastal /
 * beach-house register. Pale sea-foam field, deep-teal primary, sunset
 * coral warning, modern humanist sans throughout. Cooler than Sage
 * Studio (which leans warm-bone), warmer than Nordic Frost (which leans
 * arctic-blue). The Hamptons / Cape Cod / Tulum-modern aesthetic — sea
 * foam ground, polished wood trim, accent corals from a sunset.
 *
 *   - `surface.base` is pale sea-foam (`#edf5f4`); `surface.raised` is
 *     barely-tinted near-white (`#fafdfd`); `sunken` drops to `#d8e8e6`
 *     for input wells. The field has a 2-3% cyan-green undertone — the
 *     colour of light through shallow tropical water.
 *   - `intent.primary.bg` is deep teal (`#1e5460`) — the colour of deep
 *     coastal water at dusk. `intent.warning` is sunset rust (`#b8631c`)
 *     — the warm complement to the cool primary; the warm/cool pairing
 *     is the load-bearing colour move. `intent.danger` is coral red
 *     (`#c2403a`); `intent.success` is sea green (`#2d7a5a`);
 *     `intent.info` reuses the deep teal primary because coastal
 *     signage commits to one blue-green.
 *   - `typography.family.display` is Nunito (humanist rounded sans) for
 *     a softer modern feel; `family.body` and `family.ui` route to
 *     Inter for clean prose.
 *   - `radius.*` widens to `sm = 6px / md = 12px / lg = 18px` — coastal
 *     modern architecture favours softer curves than urban modernism.
 *   - `elevation.*` shadows tint toward teal (`rgba(20, 53, 64, 0.10)`)
 *     so cards lift as polished driftwood above sea-foam.
 */
export const palette: Palette = {
  id: 'coastal-modern',
  name: 'Coastal Modern',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#edf5f4',
        raised: '#fafdfd',
        sunken: '#d8e8e6',
        overlay: '#fafdfd',
        scrim: 'rgba(20, 53, 64, 0.48)',
      },
      content: {
        primary: '#143540',
        secondary: '#3f5862',
        muted: '#6e858d',
        inverse: '#fafdfd',
        link: '#1e5460',
      },
      border: {
        subtle: '#d8e8e6',
        default: '#b8cfcc',
        strong: '#1e5460',
        focus: '#1e5460',
      },
      intent: {
        primary: { bg: '#1e5460', content: '#fafdfd', border: '#143e48', bgHover: '#143e48', bgActive: '#0b2a32' },
        neutral: { bg: '#d8e8e6', content: '#143540', border: '#b8cfcc', bgHover: '#b8cfcc', bgActive: '#96b0ac' },
        success: { bg: '#2d7a5a', content: '#fafdfd', border: '#1f5e44', bgHover: '#1f5e44', bgActive: '#144430' },
        warning: { bg: '#b8631c', content: '#fafdfd', border: '#914c12', bgHover: '#914c12', bgActive: '#6b370b' },
        danger:  { bg: '#c2403a', content: '#fafdfd', border: '#9b302b', bgHover: '#9b302b', bgActive: '#72211d' },
        info:    { bg: '#1e5460', content: '#fafdfd', border: '#143e48', bgHover: '#143e48', bgActive: '#0b2a32' },
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
      lg: '18px',
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
      low: { boxShadow: '0 1px 2px rgba(20, 53, 64, 0.08)' },
      medium: { boxShadow: '0 4px 10px rgba(20, 53, 64, 0.10), 0 2px 4px rgba(20, 53, 64, 0.06)' },
      high: { boxShadow: '0 12px 24px rgba(20, 53, 64, 0.14), 0 4px 8px rgba(20, 53, 64, 0.08)' },
      overlay: { boxShadow: '0 24px 40px rgba(20, 53, 64, 0.20), 0 10px 14px rgba(20, 53, 64, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Nunito", "Quicksand", "Inter", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", system-ui, sans-serif',
        hand: '"Inter", "Söhne", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 700, lineHeight: '1.1',  tracking: '-0.02em' },
        title:      { family: 'display', size: '2rem',     weight: 700, lineHeight: '1.2',  tracking: '-0.015em' },
        heading:    { family: 'display', size: '1.375rem', weight: 600, lineHeight: '1.3',  tracking: '-0.005em' },
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
        spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#1e5460', style: 'solid' },
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
