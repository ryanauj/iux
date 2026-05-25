import type { Palette } from '../tokens/semantic.contract'

/**
 * Industrial / Light — Flat engine tuned for the workshop-drawing register
 * inverted to a light field. Warm-paper white with steel-grey + concrete-
 * grey neutrals, safety-orange `intent.primary`, IBM Plex Mono on
 * `family.ui` so labels carry the measurement-drawing register. The
 * "shop floor at noon" inversion of the CRT / Bloomberg dark-workshop
 * aesthetic.
 *
 *   - `surface.base` is warm paper `#fbf8f1`; `surface.raised` is
 *     `#ffffff`. `surface.sunken` drops to `#f0ece2` so input wells read
 *     recessed against the cream field. Borders are a 1 px hairline
 *     `#d6d2c8` rule — the colour of a printed engineering drawing's
 *     hairline grid.
 *   - `intent.primary.bg` is deep safety orange `#b64800` — the workshop
 *     hi-vis colour pulled down two steps so white inverse text reads at
 *     WCAG UI contrast on the saturated fill. The hue still carries the
 *     hi-vis register; `content.link` and `border.focus` keep the bright
 *     `#ff6a00` so the accent colour still announces itself outside of
 *     button surfaces. `intent.warning` reuses the brighter safety orange
 *     so the two intents don't read identical when stacked.
 *   - `typography.family.ui` is IBM Plex Mono — mono labels with
 *     measurement-drawing density. `family.body` is Inter for long-form
 *     text where the mono would slow reading. `family.display` is
 *     Inconsolata for italicised drawing labels (the engineering convention).
 *     The split is the load-bearing typography move: mono carries
 *     labels / captions / forms, sans carries paragraphs.
 *   - `space.*` tightens at the high end (`5: '20px'`, `6: '28px'`,
 *     `7: '40px'`, `8: '56px'`) — the drawing density vs the magazine
 *     breathing room of Editorial.
 *   - `elevation.low` is a 1 px hairline rule (`0 0 0 1px #d6d2c8`)
 *     instead of a soft drop shadow — the "printed-on-paper" lift the
 *     Cardstock engine does with cut-edge, but ruled instead of insetted.
 *     `medium` / `high` / `overlay` keep the soft drop shadow recipe
 *     for components that need clearer separation.
 *   - `radius.*` collapses `sm` / `md` / `lg` to `'0' / '2px' / '4px'` —
 *     the sharp-corner workshop language. `radius.pill` stays at `'999px'`
 *     for tags that need it.
 */
export const palette: Palette = {
  id: 'industrial-light',
  name: 'Industrial / Light',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#fbf8f1',
        raised: '#ffffff',
        sunken: '#f0ece2',
        overlay: '#ffffff',
        scrim: 'rgba(42, 38, 32, 0.52)',
      },
      content: {
        primary: '#2a2620',
        secondary: '#4e4a44',
        muted: '#7e7a72',
        inverse: '#ffffff',
        link: '#ff6a00',
      },
      border: {
        subtle: '#e8e4da',
        default: '#d6d2c8',
        strong: '#8a857a',
        focus: '#ff6a00',
      },
      intent: {
        primary: { bg: '#b64800', content: '#ffffff', border: '#a04000', bgHover: '#a04000', bgActive: '#843600' },
        neutral: { bg: '#e8e4da', content: '#2a2620', border: '#d6d2c8', bgHover: '#d6d2c8', bgActive: '#bdb8aa' },
        success: { bg: '#1f7a3a', content: '#ffffff', border: '#175c2c', bgHover: '#175c2c', bgActive: '#0f4220' },
        warning: { bg: '#d45600', content: '#ffffff', border: '#a84400', bgHover: '#b64800', bgActive: '#8a3700' },
        danger:  { bg: '#a8201a', content: '#ffffff', border: '#841814', bgHover: '#841814', bgActive: '#62100c' },
        info:    { bg: '#3e5a78', content: '#ffffff', border: '#2e445a', bgHover: '#2e445a', bgActive: '#1f2e3e' },
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
      md: '2px',
      lg: '4px',
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
      low: { boxShadow: '0 0 0 1px #d6d2c8' },
      medium: { boxShadow: '0 3px 6px rgba(42, 38, 32, 0.08), 0 0 0 1px #d6d2c8' },
      high: { boxShadow: '0 8px 16px rgba(42, 38, 32, 0.10), 0 0 0 1px #d6d2c8' },
      overlay: { boxShadow: '0 16px 32px rgba(42, 38, 32, 0.16), 0 6px 12px rgba(42, 38, 32, 0.08)' },
    },
    typography: {
      family: {
        ui: '"IBM Plex Mono", "JetBrains Mono", "Berkeley Mono", "Courier Prime", ui-monospace, monospace',
        display: '"Inconsolata", "IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        mono: '"IBM Plex Mono", "JetBrains Mono", "Berkeley Mono", "Courier Prime", ui-monospace, monospace',
        pixel: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        hand: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
      },
      role: {
        display:    { family: 'display', size: '2.5rem',  weight: 700, lineHeight: '1.1',  tracking: '0.01em',  textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.75rem', weight: 700, lineHeight: '1.2',  tracking: '0.01em',  textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.25rem', weight: 700, lineHeight: '1.3',  tracking: '0.01em',  textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '0.9375rem',weight: 600, lineHeight: '1.4',  tracking: '0.04em',  textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.08em',  textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4',  tracking: '0.02em' },
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
      focusRing: { width: '2px', offset: '2px', color: '#ff6a00', style: 'solid' },
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
