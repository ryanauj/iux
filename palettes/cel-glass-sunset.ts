import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-Glass (Sunset) — the warm, vivid register of the `cel-glass` engine.
 * Same mix of cel-shaded ink line and frosted glass, tuned to a hot
 * magenta-rose host with an orange / violet intent story — the anime-poster
 * end of the engine. Translucent whites frost over the saturated base (the
 * engine applies `backdrop-filter` to overlay-class panels), and every panel
 * and control is wrapped in a warm near-black cel line via
 * `effect.outline.{color,width}` plus the matching `color.border.*` ink.
 *
 * `elevation.*` keeps the hybrid: an inset white top-highlight (glass
 * refraction) over a hard-offset warm-ink block with no blur (cel shading,
 * `shadowStyle = hard`).
 *
 * Ships `a11y: 'experimental'` with the translucent family — frosted fills
 * depend on the backdrop, so the contrast lint skips it.
 */
export const palette: Palette = {
  id: 'cel-glass-sunset',
  name: 'Cel-Glass (Sunset)',
  engine: 'cel-glass',
  a11y: 'experimental',
  tokens: {
    color: {
      // Hot magenta-rose host; translucent whites for the frosted cels. The
      // cel ink line is a warm near-black so it reads against the warm field.
      surface: {
        base: '#c65b9c',
        raised: 'rgba(255, 255, 255, 0.4)',
        sunken: 'rgba(255, 255, 255, 0.22)',
        overlay: 'rgba(255, 255, 255, 0.56)',
        scrim: 'rgba(40, 10, 28, 0.46)',
      },
      content: {
        primary: '#1a0a14',
        secondary: 'rgba(26, 10, 20, 0.74)',
        muted: 'rgba(26, 10, 20, 0.52)',
        inverse: '#fff5fb',
        link: '#be185d',
      },
      border: {
        subtle: 'rgba(26, 10, 20, 0.55)',
        default: '#1a0a14',
        strong: '#1a0a14',
        focus: '#db2777',
      },
      // Warm triad — orange primary, violet info, lime success — at high alpha
      // so the fills stay legible cels. Every border is the warm ink.
      intent: {
        primary: { bg: 'rgba(249, 115, 22, 0.92)', content: '#2a1400', border: '#1a0a14', bgHover: 'rgba(234, 88, 12, 0.95)', bgActive: 'rgba(194, 65, 12, 0.98)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.5)', content: '#1a0a14', border: '#1a0a14', bgHover: 'rgba(255, 255, 255, 0.62)', bgActive: 'rgba(255, 255, 255, 0.72)' },
        success: { bg: 'rgba(132, 204, 22, 0.92)', content: '#1a2e02', border: '#1a0a14', bgHover: 'rgba(101, 163, 13, 0.95)', bgActive: 'rgba(77, 124, 15, 0.98)' },
        warning: { bg: 'rgba(250, 204, 21, 0.92)', content: '#2a2200', border: '#1a0a14', bgHover: 'rgba(234, 179, 8, 0.95)', bgActive: 'rgba(202, 138, 4, 0.98)' },
        danger:  { bg: 'rgba(244, 63, 94, 0.92)', content: '#2a0610', border: '#1a0a14', bgHover: 'rgba(225, 29, 72, 0.95)', bgActive: 'rgba(190, 18, 60, 0.98)' },
        info:    { bg: 'rgba(139, 92, 246, 0.92)', content: '#1a0533', border: '#1a0a14', bgHover: 'rgba(124, 58, 237, 0.95)', bgActive: 'rgba(109, 40, 217, 0.98)' },
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
      sm: '8px',
      md: '12px',
      lg: '18px',
      pill: '999px',
      full: '9999px',
    },
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '2px',
      thick: '2px',
      heavy: '3px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.55), 2px 2px 0 rgba(26, 10, 20, 0.16)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 3px 3px 0 rgba(26, 10, 20, 0.2)' },
      high: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.66), 5px 5px 0 rgba(26, 10, 20, 0.24)' },
      overlay: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.72), 6px 6px 0 rgba(26, 10, 20, 0.26), 0 24px 48px rgba(40, 10, 28, 0.42)' },
    },
    typography: {
      family: {
        ui: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 800, lineHeight: '1.05', tracking: '-0.02em' },
        title:      { family: 'display', size: '1.875rem',weight: 700, lineHeight: '1.15', tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.25rem', weight: 700, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',    weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 450, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 600, lineHeight: '1.4',  tracking: '0.02em' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 500, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 450, lineHeight: '1.5',  tracking: '0' },
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
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'blur(6px)', md: 'blur(14px)', lg: 'blur(22px)' },
      focusRing: { width: '2px', offset: '2px', color: '#db2777', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: '#1a0a14', width: '2px' },
      shadowStyle: 'hard',
      atmosphereGradient: 'none',
      luminanceCenter: 'transparent',
      surfaceBy: 'border',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
