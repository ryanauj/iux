import type { Palette } from '../tokens/semantic.contract'

/**
 * CRT / Greenbar — the daylight inversion of `crt-phosphor-green`. Where
 * the green-screen tube paints a single phosphor colour on near-black,
 * Greenbar paints dark green ink on the pale green-and-cream bands of
 * continuous-form ("greenbar") printer paper — the line-printer output
 * the same workloads produced when they weren't on a tube.
 *
 * The reinterpretation reuses the engine's slots verbatim, just flipped:
 *   - `effect.overlay.image` no longer paints scanlines — it paints the
 *     horizontal greenbar stripe bands (a faint green band every ~28px,
 *     `blend: multiply` so the band darkens the cream paper underneath).
 *   - `effect.glow` drops from a bright phosphor bloom to a soft green
 *     focus halo, so the CRT focus-pulse (scoped to `data-palette^=
 *     'crt-phosphor'` in the engine block) reads as a gentle ink pulse
 *     rather than a glowing tube.
 *   - `motion.decay` drops to `0ms` — printout doesn't linger the way a
 *     phosphor screen does.
 *   - Intents keep the green-CRT monochrome logic: fills stay green
 *     tints, `content` is dark green ink, and warning / danger / info
 *     encode state through BORDER weight rather than hue.
 */
export const palette: Palette = {
  id: 'crt-phosphor-greenbar',
  name: 'CRT / Greenbar',
  engine: 'crt-phosphor',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#eef3e6',
        raised: '#f4f7ee',
        sunken: '#e4ebd8',
        overlay: '#f7f9f1',
        scrim: 'rgba(30, 41, 22, 0.42)',
      },
      content: {
        primary: '#1f3d1a',
        secondary: 'rgba(31, 61, 26, 0.74)',
        muted: 'rgba(31, 61, 26, 0.50)',
        inverse: '#eef3e6',
        link: '#15803d',
      },
      border: {
        subtle: 'rgba(31, 61, 26, 0.20)',
        default: 'rgba(31, 61, 26, 0.38)',
        strong: 'rgba(31, 61, 26, 0.60)',
        focus: '#15803d',
      },
      intent: {
        primary: {
          bg: 'rgba(21, 128, 61, 0.16)',
          content: '#14331a',
          border: '#15803d',
          bgHover: 'rgba(21, 128, 61, 0.26)',
          bgActive: 'rgba(21, 128, 61, 0.38)',
        },
        neutral: {
          bg: 'rgba(21, 128, 61, 0.06)',
          content: '#1f3d1a',
          border: 'rgba(31, 61, 26, 0.24)',
          bgHover: 'rgba(21, 128, 61, 0.12)',
          bgActive: 'rgba(21, 128, 61, 0.20)',
        },
        success: {
          bg: 'rgba(21, 128, 61, 0.22)',
          content: '#14331a',
          border: '#15803d',
          bgHover: 'rgba(21, 128, 61, 0.32)',
          bgActive: 'rgba(21, 128, 61, 0.44)',
        },
        warning: {
          bg: 'rgba(21, 128, 61, 0.14)',
          content: '#1f3d1a',
          border: 'rgba(31, 61, 26, 0.62)',
          bgHover: 'rgba(21, 128, 61, 0.22)',
          bgActive: 'rgba(21, 128, 61, 0.30)',
        },
        danger: {
          bg: 'rgba(21, 128, 61, 0.10)',
          content: '#1f3d1a',
          border: 'rgba(31, 61, 26, 0.85)',
          bgHover: 'rgba(21, 128, 61, 0.18)',
          bgActive: 'rgba(21, 128, 61, 0.28)',
        },
        info: {
          bg: 'rgba(21, 128, 61, 0.10)',
          content: '#1f3d1a',
          border: 'rgba(31, 61, 26, 0.40)',
          bgHover: 'rgba(21, 128, 61, 0.16)',
          bgActive: 'rgba(21, 128, 61, 0.24)',
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(31, 61, 26, 0.18)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(31, 61, 26, 0.24), 0 1px 2px rgba(30, 41, 22, 0.10)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(31, 61, 26, 0.32), 0 2px 6px rgba(30, 41, 22, 0.12)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(31, 61, 26, 0.42), 0 6px 16px rgba(30, 41, 22, 0.14)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(31, 61, 26, 0.52), 0 24px 60px rgba(30, 41, 22, 0.22)' },
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
      // Printout doesn't linger — no phosphor-decay regime on paper.
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      // Soft green focus halo. The CRT focus-pulse keyframe (scoped to
      // `data-palette^='crt-phosphor'`) animates this — on paper it reads
      // as a gentle ink pulse instead of a glowing tube.
      focusRing: { width: '1px', offset: '2px', color: '#15803d', style: 'glow' },
      // Greenbar stripe bands instead of scanlines: a faint green band
      // every ~28px. `blend: multiply` darkens the cream paper under each
      // band so the bands read as printed stripes, not as added light.
      overlay: {
        image: 'repeating-linear-gradient(to bottom, rgba(31, 61, 26, 0) 0, rgba(31, 61, 26, 0) 28px, rgba(31, 61, 26, 0.06) 28px, rgba(31, 61, 26, 0.06) 56px)',
        size: 'auto',
        blend: 'multiply',
      },
      glow: {
        radius: '3px',
        color: 'rgba(21, 128, 61, 0.45)',
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
