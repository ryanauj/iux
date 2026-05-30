import type { Palette } from '../tokens/semantic.contract'

/**
 * Whiteprint — the daylight inversion of `blueprint`. The cyanotype's
 * deep Prussian-blue field flips to the cream paper of a diazo
 * "whiteprint" (the dry-process print that succeeded the wet cyanotype
 * in drafting rooms): blue line-work on white instead of white line-work
 * on blue. Same Flat engine, same mono drafting register, same hand-
 * lettered display face for callouts.
 *
 *   - `surface.base` is warm drafting vellum (`#f4f1e8`); `surface.raised`
 *     lifts to a brighter `#fbf9f2` so cards read as a fresh sheet laid
 *     on the roll.
 *   - `content.primary` is Prussian-blue ink (`#15336b`) — the colour the
 *     line-work prints in. `content.link` and `border.focus` are the
 *     drafter's red revision pencil (`#c8221e`), the light-room analogue
 *     of the dark theme's annotation yellow.
 *   - `effect.overlay.image` paints a faint blue 24px engineering grid
 *     across the field, so the surface reads as gridded graph paper.
 *   - `intent.primary` is the solid blue line; `danger` is the red
 *     revision pencil and `warning` an ochre marker — the two-pencil
 *     vocabulary that keeps a drawing legible.
 *   - `radius.*` collapses to `'0' / '0' / '2px'` and `elevation.*` uses
 *     warm-grey paper shadows, the light-room version of the dark
 *     theme's cyan-tinted lift.
 */
export const palette: Palette = {
  id: 'whiteprint',
  name: 'Whiteprint',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f4f1e8',
        raised: '#fbf9f2',
        sunken: '#ebe7da',
        overlay: '#fbf9f2',
        scrim: 'rgba(40, 36, 28, 0.45)',
      },
      content: {
        primary: '#15336b',
        secondary: '#3a5488',
        muted: '#6e80a4',
        inverse: '#f4f1e8',
        link: '#c8221e',
      },
      border: {
        subtle: 'rgba(21, 51, 107, 0.20)',
        default: 'rgba(21, 51, 107, 0.40)',
        strong: '#15336b',
        focus: '#c8221e',
      },
      intent: {
        primary: { bg: '#15336b', content: '#f4f1e8', border: '#0e2750', bgHover: '#1d3f80', bgActive: '#0e2750' },
        neutral: { bg: '#e3ddcc', content: '#15336b', border: 'rgba(21, 51, 107, 0.30)', bgHover: '#d9d2bd', bgActive: '#cfc7ae' },
        success: { bg: '#2e7d4a', content: '#f4f1e8', border: '#205a35', bgHover: '#27693e', bgActive: '#205a35' },
        warning: { bg: '#a4630f', content: '#f4f1e8', border: '#854f0c', bgHover: '#925810', bgActive: '#7a4a0b' },
        danger:  { bg: '#c8221e', content: '#f4f1e8', border: '#9a1a17', bgHover: '#b01e1a', bgActive: '#9a1a17' },
        info:    { bg: '#2e7ad8', content: '#f4f1e8', border: '#205aa3', bgHover: '#2769bd', bgActive: '#205aa3' },
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
      low: { boxShadow: '0 1px 2px rgba(40, 36, 28, 0.12)' },
      medium: { boxShadow: '0 4px 8px rgba(40, 36, 28, 0.14), 0 2px 4px rgba(40, 36, 28, 0.10)' },
      high: { boxShadow: '0 10px 18px rgba(40, 36, 28, 0.16), 0 4px 8px rgba(40, 36, 28, 0.10)' },
      overlay: { boxShadow: '0 20px 32px rgba(40, 36, 28, 0.20), 0 10px 14px rgba(40, 36, 28, 0.12)' },
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
      focusRing: { width: '3px', offset: '2px', color: '#c8221e', style: 'solid' },
      // Faint blue 24px engineering grid across the sheet.
      overlay: {
        image: 'repeating-linear-gradient(to right, rgba(21, 51, 107, 0) 0, rgba(21, 51, 107, 0) 23px, rgba(21, 51, 107, 0.06) 23px, rgba(21, 51, 107, 0.06) 24px), repeating-linear-gradient(to bottom, rgba(21, 51, 107, 0) 0, rgba(21, 51, 107, 0) 23px, rgba(21, 51, 107, 0.06) 23px, rgba(21, 51, 107, 0.06) 24px)',
        size: 'auto',
        blend: 'normal',
      },
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
