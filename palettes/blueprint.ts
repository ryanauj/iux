import type { Palette } from '../tokens/semantic.contract'

/**
 * Blueprint — Flat engine tuned for the cyanotype-print register. Deep
 * Prussian-blue field, cyan-white line work, mono labels, annotation
 * yellow for callouts. The architectural / engineering drawing register
 * the same way Industrial / Light is the workshop-drawing register —
 * but on a dark field, with the line work doing the work instead of
 * the surface contrast.
 *
 *   - `surface.base` is deep Prussian blue (`#0d2c5e`) — the colour a
 *     ferric-ammonium cyanotype exposes to after the wash; `surface.raised`
 *     lifts one notch to `#143669`. `surface.sunken` is `#091f43` for
 *     recessed input wells. The field reads as a roll of blueprint
 *     paper.
 *   - `content.primary` is cyan-white (`#e4ecff`) — the colour of an
 *     unexposed line on a cyanotype. `content.link` and `border.focus`
 *     are annotation yellow (`#ffd400`) — the colour a drafter's
 *     coloured pencil reaches for to mark a revision callout.
 *   - `intent.primary.bg` is annotation yellow (`#ffd400`) with deep
 *     blue inverse content (`#0d2c5e`); `intent.warning.bg` uses the
 *     same yellow (annotations are warnings on a drawing). `info`
 *     stays cyan-white. The two-colour vocabulary keeps the drawing
 *     legible — every callout reads as either "blueprint line" or
 *     "annotation pencil mark."
 *   - `typography.family.ui` is IBM Plex Mono — the drafter's mono
 *     letterer typeface; `family.display` is Architects Daughter for
 *     callouts that should read as hand-lettered annotations.
 *     `family.body` is Inter for long-form text where the mono would
 *     slow reading.
 *   - `elevation.*` uses cyan-tinted shadows so cards lift as fresh
 *     paper on top of the blueprint, not as black voids cut into it.
 *   - `radius.*` collapses to `'0' / '0' / '2px'` — drafting precision
 *     argues against rounded corners on cards and modals.
 */
export const palette: Palette = {
  id: 'blueprint',
  name: 'Blueprint',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#0d2c5e',
        raised: '#143669',
        sunken: '#091f43',
        overlay: '#143669',
        scrim: 'rgba(5, 16, 36, 0.65)',
      },
      content: {
        primary: '#e4ecff',
        secondary: '#a8b8d8',
        muted: '#6e80a4',
        inverse: '#0d2c5e',
        link: '#ffd400',
      },
      border: {
        subtle: 'rgba(228, 236, 255, 0.16)',
        default: 'rgba(228, 236, 255, 0.36)',
        strong: '#e4ecff',
        focus: '#ffd400',
      },
      intent: {
        primary: { bg: '#ffd400', content: '#0d2c5e', border: '#cca800', bgHover: '#e6bf00', bgActive: '#b39600' },
        neutral: { bg: '#1d4488', content: '#e4ecff', border: 'rgba(228, 236, 255, 0.36)', bgHover: '#225099', bgActive: '#2a5cab' },
        success: { bg: '#2e7d4a', content: '#e4ecff', border: '#205a35', bgHover: '#205a35', bgActive: '#143e24' },
        warning: { bg: '#ffd400', content: '#0d2c5e', border: '#cca800', bgHover: '#e6bf00', bgActive: '#b39600' },
        danger:  { bg: '#c8221e', content: '#e4ecff', border: '#9a1a17', bgHover: '#9a1a17', bgActive: '#6e1210' },
        info:    { bg: '#2e7ad8', content: '#e4ecff', border: '#205aa3', bgHover: '#205aa3', bgActive: '#143e72' },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '20px',
      '6': '28px',
      '7': '40px',
      '8': '56px',
    },
    radius: {
      none: '0',
      sm: '0',
      md: '0',
      lg: '2px',
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
      low: { boxShadow: '0 1px 2px rgba(5, 16, 36, 0.50)' },
      medium: { boxShadow: '0 4px 8px rgba(5, 16, 36, 0.55), 0 2px 4px rgba(5, 16, 36, 0.35)' },
      high: { boxShadow: '0 10px 18px rgba(5, 16, 36, 0.60), 0 4px 8px rgba(5, 16, 36, 0.35)' },
      overlay: { boxShadow: '0 20px 32px rgba(5, 16, 36, 0.65), 0 10px 14px rgba(5, 16, 36, 0.35)' },
    },
    typography: {
      family: {
        ui: '"IBM Plex Mono", "JetBrains Mono", "Berkeley Mono", ui-monospace, monospace',
        display: '"Architects Daughter", "Patrick Hand", "Marker Felt", "IBM Plex Mono", cursive, monospace',
        mono: '"IBM Plex Mono", "JetBrains Mono", "Berkeley Mono", ui-monospace, monospace',
        pixel: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        hand: '"Architects Daughter", "Patrick Hand", cursive',
      },
      role: {
        display:    { family: 'display', size: '2.5rem',  weight: 700, lineHeight: '1.1',  tracking: '0' },
        title:      { family: 'display', size: '1.75rem', weight: 700, lineHeight: '1.2',  tracking: '0' },
        heading:    { family: 'ui',      size: '1.25rem', weight: 600, lineHeight: '1.3',  tracking: '0.02em',  textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '0.9375rem',weight: 600, lineHeight: '1.4',  tracking: '0.06em',  textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.10em',  textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4',  tracking: '0.02em' },
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
