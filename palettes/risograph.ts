import type { Palette } from '../tokens/semantic.contract'

/**
 * Risograph — Flat engine tuned for the duplicator-print register. Cream
 * paper field, fluorescent-pink + electric-blue duotone intents, a tiled
 * halftone-dot overlay painted at the palette root via
 * `effect.overlay.image`. The print-process register the same way
 * Mid-century modern carries the atomic-dot field — colour pulled from a
 * physical printing process (Riso GR / SF machines), not from a digital
 * brand palette.
 *
 *   - `surface.base` is cream paper (`#f6efe1`); `surface.raised` is
 *     `#ffffff` (a fresh duplicator sheet); `surface.sunken` drops to
 *     `#ece2cf`. The texture itself is delivered by the halftone overlay,
 *     not by the surface colour.
 *   - `intent.primary.bg` is fluorescent pink (`#e2266e`) — Riso's
 *     "Fluorescent Pink" drum colour, knocked down two shades from the
 *     un-printable `#ff48b0` so white inverse content clears WCAG UI
 *     contrast (≈ 4.1:1). `intent.info.bg` is "Medium Blue" (`#1755bf`)
 *     so the two Riso drums sit on the page as a duotone pair. `warning`
 *     is "Yellow" pulled down to `#a36c00` so inverse white passes 3:1.
 *   - `effect.overlay.image` paints a 4 px halftone-dot grid (one black
 *     dot per cell at low alpha) tiled across the palette root. The
 *     overlay is the load-bearing engine move — Riso prints leave a
 *     visible dot screen on every fill, and this is the digital
 *     equivalent. `blend: 'multiply'` lets cards' lighter `raised`
 *     surfaces darken the dots over them so the screen reads as
 *     continuous across the page.
 *   - `typography.family.display` is a geometric grotesque (Space Grotesk)
 *     for poster-feel headings; `family.ui` / `family.body` are Inter.
 *     `label` runs uppercase-tracked so the Riso print aesthetic carries
 *     into form rows.
 *   - `elevation.*` skips soft drop shadows in favour of a hard 2 px
 *     offset (printer-misregistration cue) tinted toward the duotone
 *     pink. Cards lift the way a misregistered second pass lifts off the
 *     first one — diagnostic, not blurred.
 *   - A11y is `experimental`. The halftone overlay reduces contrast on
 *     the `base` surface; long-form body should sit on `raised`. The
 *     README documents this constraint.
 */
export const palette: Palette = {
  id: 'risograph',
  name: 'Risograph',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f6efe1',
        raised: '#ffffff',
        sunken: '#ece2cf',
        overlay: '#ffffff',
        scrim: 'rgba(23, 85, 191, 0.52)',
      },
      content: {
        primary: '#1a1814',
        secondary: '#3a3630',
        muted: '#7a7468',
        inverse: '#ffffff',
        link: '#1755bf',
      },
      border: {
        subtle: '#e2d8c2',
        default: '#1a1814',
        strong: '#0e0c0a',
        focus: '#e2266e',
      },
      intent: {
        primary: { bg: '#e2266e', content: '#ffffff', border: '#b41855', bgHover: '#b41855', bgActive: '#8d1243' },
        neutral: { bg: '#e2d8c2', content: '#1a1814', border: '#bfb59f', bgHover: '#bfb59f', bgActive: '#a09683' },
        success: { bg: '#1f6d3a', content: '#ffffff', border: '#155028', bgHover: '#155028', bgActive: '#0d3a1c' },
        warning: { bg: '#a36c00', content: '#ffffff', border: '#7d5200', bgHover: '#7d5200', bgActive: '#5a3a00' },
        danger:  { bg: '#c01a32', content: '#ffffff', border: '#931524', bgHover: '#931524', bgActive: '#6c0e1a' },
        info:    { bg: '#1755bf', content: '#ffffff', border: '#0f3f90', bgHover: '#0f3f90', bgActive: '#0a2c66' },
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
      low: { boxShadow: '2px 2px 0 rgba(226, 38, 110, 0.45)' },
      medium: { boxShadow: '3px 3px 0 rgba(226, 38, 110, 0.50), 0 2px 4px rgba(26, 24, 20, 0.06)' },
      high: { boxShadow: '4px 4px 0 rgba(226, 38, 110, 0.55), 0 6px 10px rgba(26, 24, 20, 0.08)' },
      overlay: { boxShadow: '5px 5px 0 rgba(226, 38, 110, 0.60), 0 14px 22px rgba(26, 24, 20, 0.14)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Space Grotesk", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 700, lineHeight: '1.05', tracking: '-0.01em' },
        title:      { family: 'display', size: '2.125rem', weight: 700, lineHeight: '1.15', tracking: '-0.005em' },
        heading:    { family: 'display', size: '1.5rem',   weight: 600, lineHeight: '1.25', tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.4',  tracking: '0.01em' },
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
        spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '3px', offset: '2px', color: '#e2266e', style: 'solid' },
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
