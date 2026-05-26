import type { Palette } from '../tokens/semantic.contract'

/**
 * Lavender Dawn — Flat engine tuned for a calm modern purple register
 * (meditation apps, journaling tools, the post-2020 "calm SaaS" lane).
 * Pale lavender-tinted field, deep-plum primary, a warm-amber warning
 * that pairs with the cool-violet primary, modern humanist sans
 * throughout. The cool-violet sibling of Sage Studio in the same
 * register set — both palettes share warm body type, generous radii,
 * and one deep tonal primary against a barely-tinted pale field.
 *
 *   - `surface.base` is pale lavender (`#f3eff7`); `surface.raised`
 *     lifts to barely-tinted near-white (`#fbf9fd`); `sunken` drops to
 *     `#e6dff0` for input wells. The whole field has a 3-4% violet
 *     tint — the cool ground the deep plum primary reads against.
 *   - `intent.primary.bg` is deep plum-violet (`#5c3d8a`) — a Princely
 *     purple that clears 9:1 against white inverse. `intent.warning` is
 *     warm amber (`#c97d2a`) so the warm/cool pairing reads as
 *     intentional. `intent.success` is forest (`#4d7942`); `intent.danger`
 *     is signal red (`#a8261e`); `intent.info` is slate teal (`#2d6a8c`).
 *   - `typography.family.display` is Manrope (modern humanist sans) for
 *     a softer feel than Inter / Geist. `family.ui` and `family.body`
 *     route to the same Manrope stack — the palette commits to one
 *     family throughout.
 *   - `radius.*` widens (`sm = 6px / md = 12px / lg = 18px`) — modern
 *     calm apps favour soft, never sharp corners.
 *   - `elevation.*` shadows tint toward plum (`rgba(44, 31, 58, 0.10)`)
 *     so cards lift as pressed-paper above lavender mist.
 */
export const palette: Palette = {
  id: 'lavender-dawn',
  name: 'Lavender Dawn',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f3eff7',
        raised: '#fbf9fd',
        sunken: '#e6dff0',
        overlay: '#fbf9fd',
        scrim: 'rgba(44, 31, 58, 0.48)',
      },
      content: {
        primary: '#2c1f3a',
        secondary: '#534670',
        muted: '#827597',
        inverse: '#fbf9fd',
        link: '#5c3d8a',
      },
      border: {
        subtle: '#e6dff0',
        default: '#cbbedb',
        strong: '#5c3d8a',
        focus: '#5c3d8a',
      },
      intent: {
        primary: { bg: '#5c3d8a', content: '#fbf9fd', border: '#46306b', bgHover: '#46306b', bgActive: '#33234d' },
        neutral: { bg: '#e6dff0', content: '#2c1f3a', border: '#cbbedb', bgHover: '#cbbedb', bgActive: '#aa9ac2' },
        success: { bg: '#4d7942', content: '#fbf9fd', border: '#385d30', bgHover: '#385d30', bgActive: '#26421f' },
        warning: { bg: '#c97d2a', content: '#fbf9fd', border: '#a26221', bgHover: '#a26221', bgActive: '#7a4818' },
        danger:  { bg: '#a8261e', content: '#fbf9fd', border: '#811c16', bgHover: '#811c16', bgActive: '#5c130f' },
        info:    { bg: '#2d6a8c', content: '#fbf9fd', border: '#1f4e6b', bgHover: '#1f4e6b', bgActive: '#14374d' },
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
      low: { boxShadow: '0 1px 2px rgba(44, 31, 58, 0.08)' },
      medium: { boxShadow: '0 4px 10px rgba(44, 31, 58, 0.10), 0 2px 4px rgba(44, 31, 58, 0.06)' },
      high: { boxShadow: '0 12px 24px rgba(44, 31, 58, 0.14), 0 4px 8px rgba(44, 31, 58, 0.08)' },
      overlay: { boxShadow: '0 24px 40px rgba(44, 31, 58, 0.20), 0 10px 14px rgba(44, 31, 58, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Manrope", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Manrope", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Manrope", "Inter", system-ui, sans-serif',
        hand: '"Manrope", "Inter", system-ui, sans-serif',
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
        base: '240ms',
        slow: '380ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#5c3d8a', style: 'solid' },
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
