import type { Palette } from '../tokens/semantic.contract'

/**
 * Scandinavian Royal Modern — Flat engine tuned for the Nordic-restraint
 * register applied to royal colour. Pale chalk-white / bleached-oak field,
 * one deep regal navy as the sole chromatic intent, gold demoted to a 1 px
 * hairline rule on raised surfaces. Generous whitespace, humanist sans
 * body, Cormorant in regular weight (not bold) for the display serif.
 *
 *   - `surface.base` is chalk-white (`#f6f3ee`), `surface.raised` is
 *     bleached-oak warm-cream (`#fbf9f4`). The brighter raised surface
 *     reads as a piece of light wood against a pale plaster wall.
 *   - `intent.primary.bg` is deep regal navy (`#1a2c4e`) — the only
 *     chromatic intent that shouts. `intent.success`, `intent.warning`,
 *     `intent.danger`, `intent.info` remain solid but desaturate one or
 *     two steps from Flat / Classic so they read as functional, not
 *     decorative.
 *   - Gold (`#9c7a2b`) is **not** used as an `intent.*` — it appears only
 *     as `border.subtle` at low alpha on `raised`, a 1 px hairline rule
 *     that picks up the regal vocabulary without committing the palette
 *     to a second saturated accent.
 *   - `typography.family.display` is Cormorant Garamond at weight `400`
 *     (regular, not bold) — Nordic editorial design rarely bolds serif
 *     headings. `family.ui` and `family.body` are Inter / Söhne.
 *   - `space.*` scales 1.25× from Flat / Classic at the high end
 *     (`5: '30px'`, `6: '40px'`, `7: '60px'`, `8: '80px'`) — the
 *     additional breathing room is the load-bearing Nordic cue.
 *   - `elevation.low` is a 1 px hairline border (delivered via shadow)
 *     instead of a drop shadow; `medium` / `high` are soft and very low
 *     alpha (`rgba(26,44,78, 0.04)`). Cards almost don't lift; the
 *     hairline does the work.
 */
export const palette: Palette = {
  id: 'scandinavian-royal-modern',
  name: 'Scandinavian Royal Modern',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f6f3ee',
        raised: '#fbf9f4',
        sunken: '#ece8e0',
        overlay: '#fbf9f4',
        scrim: 'rgba(26, 44, 78, 0.32)',
      },
      content: {
        primary: '#1a1c24',
        secondary: '#4a4e5a',
        muted: '#7d8090',
        inverse: '#fbf9f4',
        link: '#1a2c4e',
      },
      border: {
        subtle: 'rgba(156, 122, 43, 0.20)',
        default: '#d8d2c4',
        strong: '#9c7a2b',
        focus: '#1a2c4e',
      },
      intent: {
        primary: { bg: '#1a2c4e', content: '#fbf9f4', border: '#13213b', bgHover: '#13213b', bgActive: '#0d172a' },
        neutral: { bg: '#ece8e0', content: '#1a1c24', border: '#d8d2c4', bgHover: '#d8d2c4', bgActive: '#bfb8a8' },
        success: { bg: '#2f5b3a', content: '#fbf9f4', border: '#23442c', bgHover: '#23442c', bgActive: '#172e1d' },
        warning: { bg: '#9c7a2b', content: '#fbf9f4', border: '#7c6020', bgHover: '#7c6020', bgActive: '#5d4716' },
        danger:  { bg: '#7d2230', content: '#fbf9f4', border: '#5f1922', bgHover: '#5f1922', bgActive: '#421014' },
        info:    { bg: '#1a2c4e', content: '#fbf9f4', border: '#13213b', bgHover: '#13213b', bgActive: '#0d172a' },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '20px',
      '5': '30px',
      '6': '40px',
      '7': '60px',
      '8': '80px',
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
      low: { boxShadow: '0 0 0 1px rgba(156, 122, 43, 0.20)' },
      medium: { boxShadow: '0 2px 4px rgba(26, 44, 78, 0.04), 0 0 0 1px rgba(156, 122, 43, 0.20)' },
      high: { boxShadow: '0 8px 16px rgba(26, 44, 78, 0.06), 0 0 0 1px rgba(156, 122, 43, 0.20)' },
      overlay: { boxShadow: '0 16px 32px rgba(26, 44, 78, 0.10), 0 0 0 1px rgba(156, 122, 43, 0.20)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Cormorant Garamond", "Cormorant", "Sorts Mill Goudy", "Garamond", "Georgia", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3.25rem',  weight: 400, lineHeight: '1.05', tracking: '-0.005em' },
        title:      { family: 'display', size: '2.25rem',  weight: 400, lineHeight: '1.15', tracking: '0' },
        heading:    { family: 'display', size: '1.5rem',   weight: 500, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 500, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.65', tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 500, lineHeight: '1.4',  tracking: '0.1em', textTransform: 'uppercase' },
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
        spring: 'cubic-bezier(0.34, 1.2, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '3px', color: '#1a2c4e', style: 'solid' },
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
