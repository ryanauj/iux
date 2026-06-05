import type { Palette } from '../tokens/semantic.contract'

/**
 * CRT / Bluebar — a daylight, light-ground member of the `crt-phosphor`
 * engine, in the same spirit as `crt-phosphor-greenbar` but with the
 * phosphor moved to a cool blue highlight. Where the green-screen tube
 * paints a single phosphor colour on near-black, Bluebar paints dark
 * navy ink on cool "bluebar" continuous-form printer paper, with a
 * saturated blue (`#1d4ed8`) carrying the focus halo, links, and the
 * primary border.
 *
 * The engine slots are reused verbatim, flipped to paper:
 *   - `effect.overlay.image` paints faint horizontal blue bands every
 *     ~28px (`blend: multiply`) instead of scanlines.
 *   - `effect.glow` is a soft blue focus halo, so the CRT focus-pulse
 *     keyframe reads as a gentle ink pulse rather than a glowing tube.
 *   - `motion.decay` is `0ms` — printout doesn't linger.
 *   - Intents keep the monochrome CRT logic: fills are blue tints,
 *     `content` is dark navy ink, and warning / danger / info encode
 *     state through BORDER weight rather than hue. That monochrome
 *     intent model is the engine's documented a11y caveat, so this
 *     register ships `a11y: 'experimental'` with the rest of the family.
 */
export const palette: Palette = {
  id: 'crt-phosphor-bluebar',
  name: 'CRT / Bluebar',
  engine: 'crt-phosphor',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#eaeef6',
        raised: '#f2f5fb',
        sunken: '#dde3f0',
        overlay: '#f6f8fc',
        scrim: 'rgba(20, 30, 55, 0.42)',
      },
      content: {
        primary: '#1c2e4a',
        secondary: 'rgba(28, 46, 74, 0.74)',
        muted: 'rgba(28, 46, 74, 0.50)',
        inverse: '#eaeef6',
        link: '#1d4ed8',
      },
      border: {
        subtle: 'rgba(28, 46, 74, 0.20)',
        default: 'rgba(28, 46, 74, 0.38)',
        strong: 'rgba(28, 46, 74, 0.60)',
        focus: '#1d4ed8',
      },
      intent: {
        primary: {
          bg: 'rgba(29, 78, 216, 0.16)',
          content: '#15233b',
          border: '#1d4ed8',
          bgHover: 'rgba(29, 78, 216, 0.26)',
          bgActive: 'rgba(29, 78, 216, 0.38)',
        },
        neutral: {
          bg: 'rgba(29, 78, 216, 0.06)',
          content: '#1c2e4a',
          border: 'rgba(28, 46, 74, 0.24)',
          bgHover: 'rgba(29, 78, 216, 0.12)',
          bgActive: 'rgba(29, 78, 216, 0.20)',
        },
        success: {
          bg: 'rgba(29, 78, 216, 0.22)',
          content: '#15233b',
          border: '#1d4ed8',
          bgHover: 'rgba(29, 78, 216, 0.32)',
          bgActive: 'rgba(29, 78, 216, 0.44)',
        },
        warning: {
          bg: 'rgba(29, 78, 216, 0.14)',
          content: '#1c2e4a',
          border: 'rgba(28, 46, 74, 0.62)',
          bgHover: 'rgba(29, 78, 216, 0.22)',
          bgActive: 'rgba(29, 78, 216, 0.30)',
        },
        danger: {
          bg: 'rgba(29, 78, 216, 0.10)',
          content: '#1c2e4a',
          border: 'rgba(28, 46, 74, 0.85)',
          bgHover: 'rgba(29, 78, 216, 0.18)',
          bgActive: 'rgba(29, 78, 216, 0.28)',
        },
        info: {
          bg: 'rgba(29, 78, 216, 0.10)',
          content: '#1c2e4a',
          border: 'rgba(28, 46, 74, 0.40)',
          bgHover: 'rgba(29, 78, 216, 0.16)',
          bgActive: 'rgba(29, 78, 216, 0.24)',
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(28, 46, 74, 0.18)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(28, 46, 74, 0.24), 0 1px 2px rgba(20, 30, 55, 0.10)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(28, 46, 74, 0.32), 0 2px 6px rgba(20, 30, 55, 0.12)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(28, 46, 74, 0.42), 0 6px 16px rgba(20, 30, 55, 0.14)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(28, 46, 74, 0.52), 0 24px 60px rgba(20, 30, 55, 0.22)' },
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
      focusRing: { width: '1px', offset: '2px', color: '#1d4ed8', style: 'glow' },
      overlay: {
        image: 'repeating-linear-gradient(to bottom, rgba(28, 46, 74, 0) 0, rgba(28, 46, 74, 0) 28px, rgba(28, 46, 74, 0.06) 28px, rgba(28, 46, 74, 0.06) 56px)',
        size: 'auto',
        blend: 'multiply',
      },
      glow: {
        radius: '3px',
        color: 'rgba(29, 78, 216, 0.45)',
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
