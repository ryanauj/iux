import type { Palette } from '../tokens/semantic.contract'

/**
 * Solarpunk — Flat engine tuned for the eco-utopian register. Soft cream
 * paper field, leaf-green primary, sunlight-amber warning, sky-cyan info
 * — a saturated organic palette pulled from chlorophyll, daylight, and
 * clean water rather than from a brand guideline.
 *
 *   - `surface.base` is soft sun-bleached cream (`#f6f1de`); `surface.raised`
 *     is `#fdfaee` (a fresh page in afternoon shade); `surface.sunken`
 *     drops to `#e8e0c2` for input wells.
 *   - `intent.primary.bg` is leaf green (`#2f7a32`) — the saturated
 *     mid-canopy green of a hardwood in May. `intent.warning.bg` is
 *     deep solar amber (`#a07210`) — late-afternoon sun through leaves,
 *     pulled two shades down from the un-printable `#c48a14` so cream
 *     inverse content clears the 3:1 floor on the saturated fill.
 *     `intent.info.bg` is sky cyan (`#1f7a9c`). `intent.danger` is
 *     pomegranate (`#9c1f2e`) — the only red on the palette, so it
 *     reads as urgent without competing with the warmth register.
 *   - `typography.family.display` is a humanist sans (Quicksand /
 *     Comfortaa) at sentence case — the rounded letterforms cue
 *     "organic, not industrial." `family.body` is Inter for long-form
 *     reading.
 *   - `radius.*` widens compared to Flat / Classic — `sm: '6px'`,
 *     `md: '10px'`, `lg: '16px'` — rounded corners are part of the
 *     "organic shapes, not engineering grids" cue.
 *   - `elevation.*` uses a green-tinted shadow (`rgba(40, 70, 30, 0.10)`)
 *     so cards lift as canopy leaves on dappled-light cream paper,
 *     not as neutral panels against grey.
 */
export const palette: Palette = {
  id: 'solarpunk',
  name: 'Solarpunk',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f6f1de',
        raised: '#fdfaee',
        sunken: '#e8e0c2',
        overlay: '#fdfaee',
        scrim: 'rgba(40, 70, 30, 0.45)',
      },
      content: {
        primary: '#1d2818',
        secondary: '#3e4e35',
        muted: '#7a8270',
        inverse: '#fdfaee',
        link: '#2f7a32',
      },
      border: {
        subtle: '#e2dabe',
        default: '#c6bd9e',
        strong: '#1d2818',
        focus: '#2f7a32',
      },
      intent: {
        primary: { bg: '#2f7a32', content: '#fdfaee', border: '#235c24', bgHover: '#235c24', bgActive: '#174018' },
        neutral: { bg: '#e8e0c2', content: '#1d2818', border: '#c6bd9e', bgHover: '#c6bd9e', bgActive: '#a89e7a' },
        success: { bg: '#2f7a32', content: '#fdfaee', border: '#235c24', bgHover: '#235c24', bgActive: '#174018' },
        warning: { bg: '#a07210', content: '#fdfaee', border: '#7a5708', bgHover: '#7a5708', bgActive: '#583f04' },
        danger:  { bg: '#9c1f2e', content: '#fdfaee', border: '#761722', bgHover: '#761722', bgActive: '#530f17' },
        info:    { bg: '#1f7a9c', content: '#fdfaee', border: '#155b72', bgHover: '#155b72', bgActive: '#0e4150' },
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
      low: { boxShadow: '0 1px 2px rgba(40, 70, 30, 0.10)' },
      medium: { boxShadow: '0 4px 8px rgba(40, 70, 30, 0.12), 0 2px 4px rgba(40, 70, 30, 0.06)' },
      high: { boxShadow: '0 10px 18px rgba(40, 70, 30, 0.16), 0 4px 8px rgba(40, 70, 30, 0.08)' },
      overlay: { boxShadow: '0 20px 32px rgba(40, 70, 30, 0.22), 0 10px 14px rgba(40, 70, 30, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Quicksand", "Comfortaa", "Nunito", "Avenir Next", "Inter", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 600, lineHeight: '1.1',  tracking: '-0.005em' },
        title:      { family: 'display', size: '2.125rem', weight: 600, lineHeight: '1.2',  tracking: '0' },
        heading:    { family: 'display', size: '1.5rem',   weight: 600, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.65', tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.06em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.45', tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '240ms',
        slow: '400ms',
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
      focusRing: { width: '2px', offset: '3px', color: '#2f7a32', style: 'solid' },
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
