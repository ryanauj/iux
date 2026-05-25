import type { Palette } from '../tokens/semantic.contract'

/**
 * Letterpress — Flat engine tuned for the impressed-into-paper register.
 * Deep ink-black body type on cream rag paper, raised surfaces lift the
 * way a fresh sheet sits above the chase, but `intent.*.bg` fills are
 * *debossed* (inset shadow) — the metal type pushed the ink into the
 * paper rather than sitting on top of it.
 *
 *   - `surface.base` is cream rag paper (`#f3ece0`); `surface.raised`
 *     is warmer fresh paper (`#faf3e6`); `sunken` drops to a more
 *     yellowed cream (`#e6dccb`). No gradients — opaque paper colours
 *     against opaque paper colours, the Flat recipe with paper-warm hues.
 *   - `intent.primary.bg` is deep ink-black (`#1a1814`) with cream
 *     inverse content (`#faf3e6`) — printer's ink on rag paper, the
 *     two-colour vocabulary of monochrome letterpress shops. The other
 *     intents pick up traditional letterpress second-ink colours:
 *     `danger` is press-room red (`#9a1f1f`), `success` is bottle green
 *     (`#1f5538`), `warning` is mustard ochre (`#9c6a14`), `info` is
 *     ink-blue (`#1f3a6a`). Every fill stays at letterpress saturation
 *     so it reads as "printed, not displayed".
 *   - `elevation.low` is a paired inset + tight drop shadow — the inset
 *     reads as ink pushed into paper, the drop is the sheet's thickness
 *     against the desk. `medium` / `high` deepen both halves. `overlay`
 *     keeps a softer drop so modals lift above the page without being
 *     debossed themselves.
 *   - `typography.family.display` is Caslon (or Bodoni fallback) — the
 *     historical letterpress face. `family.body` is Crimson Text for
 *     long-form serif body; `family.ui` is Inter for controls that need
 *     to read at form sizes.
 *   - `radius.*` collapses to `'0' / '0' / '2px'` for `sm` / `md` / `lg`
 *     — letterpress type was set in straight metal forme, never with
 *     rounded corners.
 */
export const palette: Palette = {
  id: 'letterpress',
  name: 'Letterpress',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f3ece0',
        raised: '#faf3e6',
        sunken: '#e6dccb',
        overlay: '#faf3e6',
        scrim: 'rgba(26, 24, 20, 0.55)',
      },
      content: {
        primary: '#1a1814',
        secondary: '#3a3630',
        muted: '#7a7468',
        inverse: '#faf3e6',
        link: '#9a1f1f',
      },
      border: {
        subtle: '#d8cdb6',
        default: '#bfb39a',
        strong: '#1a1814',
        focus: '#9a1f1f',
      },
      intent: {
        primary: { bg: '#1a1814', content: '#faf3e6', border: '#0e0c0a', bgHover: '#0e0c0a', bgActive: '#000000' },
        neutral: { bg: '#e6dccb', content: '#1a1814', border: '#bfb39a', bgHover: '#d8cdb6', bgActive: '#bfb39a' },
        success: { bg: '#1f5538', content: '#faf3e6', border: '#163e28', bgHover: '#163e28', bgActive: '#0e2a1a' },
        warning: { bg: '#9c6a14', content: '#faf3e6', border: '#7a510e', bgHover: '#7a510e', bgActive: '#583a08' },
        danger:  { bg: '#9a1f1f', content: '#faf3e6', border: '#761616', bgHover: '#761616', bgActive: '#530f0f' },
        info:    { bg: '#1f3a6a', content: '#faf3e6', border: '#162a4e', bgHover: '#162a4e', bgActive: '#0e1c34' },
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
      low: { boxShadow: 'inset 0 1px 2px rgba(26, 24, 20, 0.16), 0 1px 2px rgba(26, 24, 20, 0.10)' },
      medium: { boxShadow: 'inset 0 2px 4px rgba(26, 24, 20, 0.18), 0 3px 6px rgba(26, 24, 20, 0.12)' },
      high: { boxShadow: 'inset 0 2px 4px rgba(26, 24, 20, 0.20), 0 8px 14px rgba(26, 24, 20, 0.16)' },
      overlay: { boxShadow: '0 18px 32px rgba(26, 24, 20, 0.24), 0 8px 12px rgba(26, 24, 20, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Caslon", "Adobe Caslon Pro", "Libre Caslon Text", "Bodoni 72", "Didot", "Georgia", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3.25rem',  weight: 600, lineHeight: '1.05', tracking: '-0.005em' },
        title:      { family: 'display', size: '2.25rem',  weight: 600, lineHeight: '1.15', tracking: '0' },
        heading:    { family: 'display', size: '1.5rem',   weight: 600, lineHeight: '1.25', tracking: '0' },
        subheading: { family: 'display', size: '1.125rem', weight: 600, lineHeight: '1.35', tracking: '0' },
        body:       { family: 'display', size: '1.0625rem',weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.45', tracking: '0.01em' },
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
      focusRing: { width: '2px', offset: '2px', color: '#9a1f1f', style: 'solid' },
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
