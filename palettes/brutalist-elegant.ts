import type { Palette } from '../tokens/semantic.contract'

/**
 * Brutalist-elegant — Neubrutalism engine, ivory/black/oxblood register.
 *
 * Structural honesty is preserved verbatim: `radius.*` all `'0'`,
 * `borderWidth.heavy` 4px, `elevation.low/medium/high/overlay` carry the
 * hard-offset `Npx Npx 0 #0a0a0a` block (the variant the canonical
 * neubrutalism README mentions but leaves opt-in). Motion stays linear
 * snap-to-grid (40–90ms). Only the chromatic temperature shifts —
 * vibrant clashing fills swap for warm ivory `#f3eee2`, ink black
 * `#0a0a0a`, and a single oxblood accent `#7a1014` — and `display`
 * moves from Archivo Black condensed sans to a Bodoni / Didot serif at
 * `700` for the high-end editorial feel.
 */
export const palette: Palette = {
  id: 'brutalist-elegant',
  name: 'Brutalist-elegant',
  engine: 'neubrutalism',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f3eee2',
        raised: '#fbf7ec',
        sunken: '#e8e1cf',
        overlay: '#fbf7ec',
        scrim: 'rgba(10, 10, 10, 0.6)',
      },
      content: {
        primary: '#0a0a0a',
        secondary: '#1f1f1f',
        muted: '#5a554b',
        inverse: '#f3eee2',
        link: '#7a1014',
      },
      border: {
        subtle: '#0a0a0a',
        default: '#0a0a0a',
        strong: '#0a0a0a',
        focus: '#7a1014',
      },
      intent: {
        primary: { bg: '#7a1014', content: '#f3eee2', border: '#0a0a0a', bgHover: '#5e0c0f', bgActive: '#3f0709' },
        neutral: { bg: '#fbf7ec', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#f0ead8', bgActive: '#e0d8be' },
        success: { bg: '#22432a', content: '#f3eee2', border: '#0a0a0a', bgHover: '#172e1c', bgActive: '#0d1a10' },
        warning: { bg: '#7a5a14', content: '#f3eee2', border: '#0a0a0a', bgHover: '#5a420f', bgActive: '#3d2c0a' },
        danger:  { bg: '#5a0a0e', content: '#f3eee2', border: '#0a0a0a', bgHover: '#3f0709', bgActive: '#260406' },
        info:    { bg: '#1c2a4b', content: '#f3eee2', border: '#0a0a0a', bgHover: '#131e36', bgActive: '#0a1224' },
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
      lg: '0',
      pill: '0',
      full: '0',
    },
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '2px',
      thick: '3px',
      heavy: '4px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '4px 4px 0 #0a0a0a' },
      medium: { boxShadow: '6px 6px 0 #0a0a0a' },
      high: { boxShadow: '8px 8px 0 #0a0a0a' },
      overlay: { boxShadow: '10px 10px 0 #0a0a0a' },
    },
    typography: {
      family: {
        ui: '"Inter", "Neue Haas Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
        display: '"Bodoni Moda", "Didot", "Bodoni 72", "Playfair Display", Georgia, "Times New Roman", serif',
        mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Inter", "Neue Haas Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
        hand: '"Inter", "Neue Haas Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '4rem',     weight: 700, lineHeight: '1.0',  tracking: '-0.02em' },
        title:      { family: 'display', size: '2.75rem',  weight: 700, lineHeight: '1.05', tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.875rem', weight: 600, lineHeight: '1.2',  tracking: '0' },
        subheading: { family: 'ui',      size: '0.9375rem',weight: 600, lineHeight: '1.4',  tracking: '0.18em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.3',  tracking: '0.16em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.5',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '40ms',
        base: '60ms',
        slow: '90ms',
      },
      easing: {
        standard: 'linear',
        in: 'linear',
        out: 'linear',
        inOut: 'linear',
        spring: 'linear',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '3px', offset: '0', color: '#7a1014', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
    },
  },
}
