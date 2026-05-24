import type { Palette } from '../tokens/semantic.contract'

/**
 * Marble Royal Flat — Flat engine paired with a procedural marble overlay
 * painted via `effect.overlay.image`. The gallery-plinth register: cool
 * Carrara-marble paper field, gold-vein accent, Trajan-feel display caps
 * for headings, body type kept on Cormorant for long-form reading.
 *
 *   - `surface.base` is a cool grey marble fallback (`#e8e6e3`); the
 *     marble pattern itself is delivered at the palette root via
 *     `effect.overlay.image` as a stacked-gradient texture (procedural
 *     so the palette stays self-contained — no asset dependency).
 *     `surface.raised` is a brighter polished-marble grey (`#f2f0ec`)
 *     so cards read as polished plinths against the cool field.
 *   - `intent.primary.bg` is gold-vein (`#9c7a2b`) — the same gold
 *     Scandinavian Royal Modern keeps demoted to a hairline, here
 *     promoted to the primary accent because the marble field has the
 *     restraint baked in. Hover state nudges the gold one step warmer
 *     (`#b8893a`) to mimic a vein catching light.
 *   - `typography.family.display` is Trajan Pro / Cinzel — architectural
 *     caps that sit on the marble like inscribed plaques. `family.body`
 *     is Cormorant; `family.ui` is Inter for controls that need to read
 *     at small sizes.
 *   - `elevation.*` uses a warmer shadow tint (`rgba(60, 40, 20, 0.10)`)
 *     so cards sit on the marble like inset plaques rather than floating
 *     above a neutral field.
 *   - `effect.overlay.*` paints the marble texture: two stacked radial
 *     gradients (a warm vein layer + a cool background mottle) tiled at
 *     720 × 720 so the pattern reads as natural stone rather than as
 *     repeated wallpaper. `blend: 'multiply'` lets the cards' lighter
 *     `surface.raised` punch through the marble where they sit.
 *   - A11y is `experimental` because body text on `surface.base` (the
 *     marble field) loses contrast where the vein layer is darkest;
 *     long-form body text must sit on `raised`, where contrast holds.
 *     The README documents this constraint.
 */
export const palette: Palette = {
  id: 'marble-royal-flat',
  name: 'Marble Royal Flat',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#e8e6e3',
        raised: '#f2f0ec',
        sunken: '#d8d5d0',
        overlay: '#f5f3ef',
        scrim: 'rgba(60, 40, 20, 0.42)',
      },
      content: {
        primary: '#2a2520',
        secondary: '#574e44',
        muted: '#8a7f72',
        inverse: '#f5f3ef',
        link: '#9c7a2b',
      },
      border: {
        subtle: 'rgba(60, 40, 20, 0.14)',
        default: 'rgba(60, 40, 20, 0.28)',
        strong: '#9c7a2b',
        focus: '#9c7a2b',
      },
      intent: {
        primary: { bg: '#9c7a2b', content: '#f5f3ef', border: '#7c6020', bgHover: '#b8893a', bgActive: '#7c6020' },
        neutral: { bg: '#d8d5d0', content: '#2a2520', border: 'rgba(60, 40, 20, 0.28)', bgHover: '#c9c5be', bgActive: '#b6b1a8' },
        success: { bg: '#3f6b4a', content: '#f5f3ef', border: '#2f5238', bgHover: '#2f5238', bgActive: '#23402b' },
        warning: { bg: '#9c7a2b', content: '#f5f3ef', border: '#7c6020', bgHover: '#7c6020', bgActive: '#5d4716' },
        danger:  { bg: '#8a2233', content: '#f5f3ef', border: '#6b1828', bgHover: '#6b1828', bgActive: '#4f111d' },
        info:    { bg: '#3b5a8c', content: '#f5f3ef', border: '#2b446c', bgHover: '#2b446c', bgActive: '#1e3252' },
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
      low: { boxShadow: '0 1px 2px rgba(60, 40, 20, 0.10)' },
      medium: { boxShadow: '0 4px 8px rgba(60, 40, 20, 0.12), 0 2px 4px rgba(60, 40, 20, 0.06)' },
      high: { boxShadow: '0 10px 20px rgba(60, 40, 20, 0.16), 0 4px 8px rgba(60, 40, 20, 0.08)' },
      overlay: { boxShadow: '0 20px 36px rgba(60, 40, 20, 0.22), 0 10px 14px rgba(60, 40, 20, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Trajan Pro", "Cinzel", "Optima", "Cormorant Garamond", "Georgia", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 500, lineHeight: '1.1',  tracking: '0.04em',  textTransform: 'uppercase' },
        title:      { family: 'display', size: '2.125rem', weight: 500, lineHeight: '1.2',  tracking: '0.03em',  textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.5rem',   weight: 500, lineHeight: '1.3',  tracking: '0.02em',  textTransform: 'uppercase' },
        subheading: { family: 'display', size: '1.125rem', weight: 500, lineHeight: '1.35', tracking: '0.04em',  textTransform: 'uppercase' },
        body:       { family: 'display', size: '1.0625rem',weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.08em',  textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.45', tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '220ms',
        slow: '360ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#9c7a2b', style: 'solid' },
      overlay: {
        image:
          'radial-gradient(ellipse 80% 30% at 22% 18%, rgba(156, 122, 43, 0.10) 0%, transparent 60%), ' +
          'radial-gradient(ellipse 60% 40% at 78% 64%, rgba(156, 122, 43, 0.08) 0%, transparent 55%), ' +
          'radial-gradient(ellipse 40% 50% at 50% 100%, rgba(60, 40, 20, 0.06) 0%, transparent 70%), ' +
          'radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.20) 0%, transparent 40%), ' +
          'radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.16) 0%, transparent 45%)',
        size: '720px 720px',
        blend: 'multiply',
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
