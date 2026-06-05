import type { Palette } from '../tokens/semantic.contract'

/**
 * CRT / Goldbar — a daylight, light-ground member of the `crt-phosphor`
 * engine, sibling to Greenbar / Bluebar / Rosebar with the phosphor
 * moved to a warm amber-gold highlight. It is the paper inversion of the
 * classic amber tube: dark cocoa ink on warm cream continuous paper,
 * with a saturated amber (`#b45309`) carrying the focus halo, links, and
 * the primary border.
 *
 * Same engine slots, flipped to paper: `effect.overlay.image` paints
 * faint horizontal amber bands (`blend: multiply`); `effect.glow` is a
 * soft amber focus halo; `motion.decay` is `0ms`; intents stay
 * monochrome amber tints with state encoded through BORDER weight. The
 * monochrome intent model is the engine's documented a11y caveat, so the
 * register ships `a11y: 'experimental'`.
 */
export const palette: Palette = {
  id: 'crt-phosphor-goldbar',
  name: 'CRT / Goldbar',
  engine: 'crt-phosphor',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f6efdf',
        raised: '#faf5ea',
        sunken: '#ece0c6',
        overlay: '#fbf7ee',
        scrim: 'rgba(58, 40, 16, 0.42)',
      },
      content: {
        primary: '#3a2810',
        secondary: 'rgba(58, 40, 16, 0.74)',
        muted: 'rgba(58, 40, 16, 0.50)',
        inverse: '#f6efdf',
        link: '#b45309',
      },
      border: {
        subtle: 'rgba(58, 40, 16, 0.20)',
        default: 'rgba(58, 40, 16, 0.38)',
        strong: 'rgba(58, 40, 16, 0.60)',
        focus: '#b45309',
      },
      intent: {
        primary: {
          bg: 'rgba(180, 83, 9, 0.16)',
          content: '#2a1d0a',
          border: '#b45309',
          bgHover: 'rgba(180, 83, 9, 0.26)',
          bgActive: 'rgba(180, 83, 9, 0.38)',
        },
        neutral: {
          bg: 'rgba(180, 83, 9, 0.06)',
          content: '#3a2810',
          border: 'rgba(58, 40, 16, 0.24)',
          bgHover: 'rgba(180, 83, 9, 0.12)',
          bgActive: 'rgba(180, 83, 9, 0.20)',
        },
        success: {
          bg: 'rgba(180, 83, 9, 0.22)',
          content: '#2a1d0a',
          border: '#b45309',
          bgHover: 'rgba(180, 83, 9, 0.32)',
          bgActive: 'rgba(180, 83, 9, 0.44)',
        },
        warning: {
          bg: 'rgba(180, 83, 9, 0.14)',
          content: '#3a2810',
          border: 'rgba(58, 40, 16, 0.62)',
          bgHover: 'rgba(180, 83, 9, 0.22)',
          bgActive: 'rgba(180, 83, 9, 0.30)',
        },
        danger: {
          bg: 'rgba(180, 83, 9, 0.10)',
          content: '#3a2810',
          border: 'rgba(58, 40, 16, 0.85)',
          bgHover: 'rgba(180, 83, 9, 0.18)',
          bgActive: 'rgba(180, 83, 9, 0.28)',
        },
        info: {
          bg: 'rgba(180, 83, 9, 0.10)',
          content: '#3a2810',
          border: 'rgba(58, 40, 16, 0.40)',
          bgHover: 'rgba(180, 83, 9, 0.16)',
          bgActive: 'rgba(180, 83, 9, 0.24)',
        },
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(58, 40, 16, 0.18)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(58, 40, 16, 0.24), 0 1px 2px rgba(58, 40, 16, 0.10)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(58, 40, 16, 0.32), 0 2px 6px rgba(58, 40, 16, 0.12)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(58, 40, 16, 0.42), 0 6px 16px rgba(58, 40, 16, 0.14)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(58, 40, 16, 0.52), 0 24px 60px rgba(58, 40, 16, 0.22)' },
    },
    typography: {
      family: {
        ui: '"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
        display: '"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
        mono: '"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
        hand: '"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
      },
      role: {
        display:    { family: 'display', size: '2.5rem',   weight: 400, lineHeight: '1.1', tracking: '0.04em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.75rem',  weight: 400, lineHeight: '1.2', tracking: '0.04em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.25rem',  weight: 400, lineHeight: '1.3', tracking: '0.04em', textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.4', tracking: '0.04em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.5', tracking: '0.02em' },
        label:      { family: 'ui',      size: '0.875rem', weight: 400, lineHeight: '1.4', tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4', tracking: '0.08em', textTransform: 'uppercase' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5', tracking: '0.05em' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '100ms',
        base: '180ms',
        slow: '300ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '1px', offset: '2px', color: '#b45309', style: 'glow' },
      overlay: {
        image: 'repeating-linear-gradient(to bottom, rgba(58, 40, 16, 0) 0, rgba(58, 40, 16, 0) 28px, rgba(58, 40, 16, 0.06) 28px, rgba(58, 40, 16, 0.06) 56px)',
        size: 'auto',
        blend: 'multiply',
      },
      glow: {
        radius: '3px',
        color: 'rgba(180, 83, 9, 0.45)',
        intensity: 0.4,
      },
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
