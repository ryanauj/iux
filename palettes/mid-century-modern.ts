import type { Palette } from '../tokens/semantic.contract'

/**
 * Mid-century modern — flat engine tuned for the warm-restrained
 * Eames-era register. Cream paper, walnut ink, mustard and teal as the
 * dominant accents, persimmon and avocado in the data-semantic slots.
 * Quiet, not loud — the aesthetic restraint that period catalogues
 * (Herman Miller, Knoll, the 1956 Eames Lounge ad) made into a virtue.
 *
 *   - `surface.base` is a warm cream (`#f0e6d2`); `raised` lifts to a
 *     paler eggshell (`#f7eed9`); `sunken` drops to a slightly darker
 *     cream so input wells read recessed without a shadow. There is no
 *     stark white anywhere in the palette.
 *   - `content.primary` is walnut ink (`#2a1d12`) — a warm dark brown
 *     rather than pure black, so the page reads as "printed on cream"
 *     not "printed on a screen".
 *   - The intent set is the period's exact swatch language: mustard
 *     `#c98a16` (`intent.primary`, the Herman Miller catalogue accent),
 *     teal `#2d6f7c` (`intent.info`, the Eames Lounge upholstery teal),
 *     avocado `#5a7a3b` (`intent.success`), persimmon `#b14a1d`
 *     (`intent.danger`, also the warm orange Saarinen used on the
 *     Tulip chair seat pad). None of these are full-saturation — every
 *     one is one or two steps off vivid so panels never shout.
 *   - `radius.*` is moderate-but-warm: `sm: '3px'`, `md: '6px'`,
 *     `lg: '14px'`. No hard corners, no inflated curves — the bend a
 *     plywood lounge chair has.
 *   - `space.*` is the Flat default; the palette doesn't need extra
 *     breathing room because the cream field already reads quiet.
 *   - `typography.family.*`: humanist sans for body
 *     (`Karla` / `Avenir Next` / `Futura`); the same family doubles as
 *     `display`, because mid-century print rarely mixed faces — it
 *     mixed weights and sizes within one family.
 *   - `motion.*` uses gentle ease-out everywhere with `base = '220ms'`
 *     — slower than Flat default, the way a heavy plywood drawer settles
 *     rather than snaps.
 *
 *   - `effect.overlay.*` IS the atomic-age accent: a sparse three-point
 *     starburst-dot field at 4 – 5% alpha, tiled at 480 × 480 so the
 *     period decoration reads as wallpaper rhythm rather than as
 *     foreground pattern. This is the "atomic-age shapes used sparingly
 *     via decoration tokens" the brief calls for — the engine reads
 *     `effect.overlay.image` at the palette root, so the pattern paints
 *     once at the shell and never has to be re-applied per component.
 */
export const palette: Palette = {
  id: 'mid-century-modern',
  name: 'Mid-century modern',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f0e6d2',
        raised: '#f7eed9',
        sunken: '#e7dcc4',
        overlay: '#f7eed9',
        scrim: 'rgba(42, 29, 18, 0.52)',
      },
      content: {
        primary: '#2a1d12',
        secondary: '#52402d',
        muted: '#7a6750',
        inverse: '#f7eed9',
        link: '#2d6f7c',
      },
      border: {
        subtle: 'rgba(42, 29, 18, 0.12)',
        default: 'rgba(42, 29, 18, 0.26)',
        strong: 'rgba(42, 29, 18, 0.58)',
        focus: '#c98a16',
      },
      intent: {
        primary: { bg: '#c98a16', content: '#2a1d12', border: '#a47010', bgHover: '#b07a12', bgActive: '#8c5e0d' },
        neutral: { bg: '#e7dcc4', content: '#2a1d12', border: 'rgba(42, 29, 18, 0.26)', bgHover: '#dccfb1', bgActive: '#cdbf9c' },
        success: { bg: '#5a7a3b', content: '#f7eed9', border: '#42592b', bgHover: '#42592b', bgActive: '#2e3f1d' },
        warning: { bg: '#c98a16', content: '#2a1d12', border: '#a47010', bgHover: '#b07a12', bgActive: '#8c5e0d' },
        danger:  { bg: '#b14a1d', content: '#f7eed9', border: '#8a3814', bgHover: '#8a3814', bgActive: '#62280d' },
        info:    { bg: '#2d6f7c', content: '#f7eed9', border: '#1f525c', bgHover: '#1f525c', bgActive: '#143840' },
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
      sm: '3px',
      md: '6px',
      lg: '14px',
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
      low: { boxShadow: '0 1px 2px rgba(42, 29, 18, 0.08)' },
      medium: { boxShadow: '0 3px 6px rgba(42, 29, 18, 0.10), 0 1px 2px rgba(42, 29, 18, 0.06)' },
      high: { boxShadow: '0 8px 16px rgba(42, 29, 18, 0.12), 0 3px 6px rgba(42, 29, 18, 0.06)' },
      overlay: { boxShadow: '0 16px 32px rgba(42, 29, 18, 0.16), 0 6px 12px rgba(42, 29, 18, 0.08)' },
    },
    typography: {
      family: {
        ui: '"Karla", "Avenir Next", "Avenir", "Futura", "Century Gothic", "Helvetica Neue", system-ui, sans-serif',
        display: '"Karla", "Avenir Next", "Avenir", "Futura", "Century Gothic", "Helvetica Neue", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "Courier Prime", "Courier New", ui-monospace, monospace',
        pixel: '"Karla", "Avenir Next", "Avenir", "Futura", "Century Gothic", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Karla", "Avenir Next", "Avenir", "Futura", "Century Gothic", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 600, lineHeight: '1.1',  tracking: '-0.015em' },
        title:      { family: 'display', size: '2rem',     weight: 600, lineHeight: '1.15', tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.375rem', weight: 600, lineHeight: '1.25', tracking: '0' },
        subheading: { family: 'ui',      size: '1.0625rem',weight: 600, lineHeight: '1.35', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4',  tracking: '0.08em',  textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.4',  tracking: '0.01em' },
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
        standard: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#c98a16', style: 'solid' },
      overlay: {
        image:
          'radial-gradient(circle at 14% 18%, rgba(201, 138, 22, 0.06) 0 1.4px, transparent 1.4px), ' +
          'radial-gradient(circle at 78% 36%, rgba(45, 111, 124, 0.05) 0 1.4px, transparent 1.4px), ' +
          'radial-gradient(circle at 42% 82%, rgba(177, 74, 29, 0.045) 0 1.6px, transparent 1.6px)',
        size: '480px 480px',
        blend: 'normal',
      },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
    },
  },
}
