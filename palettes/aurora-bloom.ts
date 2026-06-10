import type { Palette } from '../tokens/semantic.contract'

/**
 * Aurora (Bloom) — the LIGHT warm register of the `aurora`-engine family, and
 * the daylight counterpart of Nebula. Same engine and surface model: a
 * four-radial `effect.atmosphereGradient` the engine paints at the root and
 * drifts over a 48s loop, with translucent cards the engine frosts via
 * `backdrop-filter`. Here the mesh is a pink → peach → lavender → amber pastel
 * run over a warm near-white `#fef6f4` ground — the soft, optimistic
 * spring-blossom flavour of the mesh-gradient-on-white look.
 *
 * Type is a warm dark plum ink, elevation is a soft warm drop shadow (not a
 * luminance glow), cards carry a faint real border for definition, and the
 * primary / focus accent is a magenta-pink. The engine's selection tint
 * darkens here because it is a `color-mix` of `content.primary` (dark on this
 * ground). Ships `a11y: 'experimental'` with the translucent-surface family —
 * the contrast lint skips it.
 */
export const palette: Palette = {
  id: 'aurora-bloom',
  name: 'Aurora (Bloom)',
  engine: 'aurora',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#fef6f4',
        raised: 'rgba(255, 255, 255, 0.62)',
        sunken: 'rgba(58, 31, 46, 0.05)',
        overlay: 'rgba(255, 255, 255, 0.85)',
        scrim: 'rgba(58, 20, 40, 0.26)',
      },
      content: {
        primary: '#3a1f2e',
        secondary: 'rgba(58, 31, 46, 0.70)',
        muted: 'rgba(58, 31, 46, 0.48)',
        inverse: '#fef6f4',
        link: '#be185d',
      },
      border: {
        subtle: 'rgba(58, 31, 46, 0.10)',
        default: 'rgba(58, 31, 46, 0.16)',
        strong: 'rgba(58, 31, 46, 0.28)',
        focus: '#db2777',
      },
      intent: {
        primary: { bg: '#db2777', content: '#fff1f6', border: '#db2777', bgHover: '#be185d', bgActive: '#9d174d' },
        neutral: { bg: 'rgba(58, 31, 46, 0.06)', content: '#3a1f2e', border: 'rgba(58, 31, 46, 0.20)', bgHover: 'rgba(58, 31, 46, 0.10)', bgActive: 'rgba(58, 31, 46, 0.16)' },
        success: { bg: '#0d9488', content: '#ecfdfa', border: '#0d9488', bgHover: '#0f766e', bgActive: '#115e59' },
        warning: { bg: '#f59e0b', content: '#3a1d00', border: '#d97706', bgHover: '#d97706', bgActive: '#b45309' },
        danger:  { bg: '#e11d48', content: '#fff1f3', border: '#e11d48', bgHover: '#be123c', bgActive: '#9f1239' },
        info:    { bg: '#7c3aed', content: '#f5f0ff', border: '#7c3aed', bgHover: '#6d28d9', bgActive: '#5b21b6' },
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
      sm: '6px',
      md: '12px',
      lg: '18px',
      pill: '999px',
      full: '9999px',
    },
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '1px',
      thick: '1px',
      heavy: '2px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '0 1px 3px rgba(58, 20, 40, 0.08), 0 1px 2px rgba(58, 20, 40, 0.06)' },
      medium: { boxShadow: '0 4px 12px rgba(58, 20, 40, 0.10), 0 2px 4px rgba(58, 20, 40, 0.06)' },
      high: { boxShadow: '0 12px 28px rgba(58, 20, 40, 0.14), 0 4px 8px rgba(58, 20, 40, 0.08)' },
      overlay: { boxShadow: '0 24px 60px rgba(58, 20, 40, 0.20), 0 8px 16px rgba(58, 20, 40, 0.10)' },
    },
    typography: {
      family: {
        ui: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        pixel: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 600, lineHeight: '1.1',  tracking: '-0.02em' },
        title:      { family: 'display', size: '1.875rem', weight: 600, lineHeight: '1.2',  tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.375rem', weight: 600, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem', weight: 500, lineHeight: '1.4',  tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '180ms',
        base: '260ms',
        slow: '420ms',
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
      backdropBlur: { none: 'none', sm: 'blur(8px)', md: 'blur(14px)', lg: 'blur(22px)' },
      focusRing: { width: '2px', offset: '2px', color: '#db2777', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      // The light warm mesh — pink, peach, lavender, amber at PASTEL alpha so
      // the gradient stays soft on the warm white and dark plum ink reads.
      atmosphereGradient: [
        'radial-gradient(at 18% 20%, rgba(244, 114, 182, 0.22), transparent 56%)',
        'radial-gradient(at 82% 26%, rgba(251, 146, 60, 0.20), transparent 58%)',
        'radial-gradient(at 60% 85%, rgba(167, 139, 250, 0.20), transparent 58%)',
        'radial-gradient(at 10% 88%, rgba(251, 191, 36, 0.16), transparent 54%)',
      ].join(', '),
      luminanceCenter: 'rgba(255, 255, 255, 0.60)',
      surfaceBy: 'luminance',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
