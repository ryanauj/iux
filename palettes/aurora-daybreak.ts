import type { Palette } from '../tokens/semantic.contract'

/**
 * Aurora (Daybreak) — the LIGHT cool register of the `aurora`-engine family,
 * and the daylight counterpart of Spectrum. Same engine and surface model:
 * `effect.atmosphereGradient` is a four-radial azure → cyan → emerald → violet
 * mesh the engine paints at the root and drifts over a 48s loop, raised cards
 * are translucent and frosted by the engine's `backdrop-filter`. The
 * difference is the ground: a near-white sky `#f5f8fe` with the mesh held at
 * pastel alpha, so the whole thing reads as the soft mesh-gradient-on-white
 * look modern marketing sites use.
 *
 * Because the host is light, the register inverts cleanly from the dark
 * siblings: type is dark navy ink, the engine's selection tint darkens (it is
 * a `color-mix` of `content.primary`, which is dark here), and elevation is a
 * soft cool drop shadow rather than a luminance glow. Cards keep a faint real
 * border for definition. Ships `a11y: 'experimental'` with the translucent-
 * surface family — the frosted fills make contrast depend on the backdrop, so
 * the contrast lint skips it.
 */
export const palette: Palette = {
  id: 'aurora-daybreak',
  name: 'Aurora (Daybreak)',
  engine: 'aurora',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f5f8fe',
        // Frosted near-white cards — the engine blurs the pastel mesh behind
        // them so they read as clean glass panels, not opaque blocks.
        raised: 'rgba(255, 255, 255, 0.62)',
        sunken: 'rgba(16, 36, 62, 0.05)',
        overlay: 'rgba(255, 255, 255, 0.85)',
        scrim: 'rgba(16, 36, 70, 0.28)',
      },
      content: {
        primary: '#10243e',
        secondary: 'rgba(16, 36, 62, 0.70)',
        muted: 'rgba(16, 36, 62, 0.48)',
        inverse: '#f5f8fe',
        link: '#0e6fb8',
      },
      // Real (if quiet) borders so frosted cards have definition on the light
      // ground; focus jumps to full-chroma blue.
      border: {
        subtle: 'rgba(16, 36, 62, 0.10)',
        default: 'rgba(16, 36, 62, 0.16)',
        strong: 'rgba(16, 36, 62, 0.28)',
        focus: '#2563eb',
      },
      intent: {
        primary: { bg: '#2563eb', content: '#f5f8fe', border: '#2563eb', bgHover: '#1d4ed8', bgActive: '#1e40af' },
        neutral: { bg: 'rgba(16, 36, 62, 0.06)', content: '#10243e', border: 'rgba(16, 36, 62, 0.20)', bgHover: 'rgba(16, 36, 62, 0.10)', bgActive: 'rgba(16, 36, 62, 0.16)' },
        success: { bg: '#0d9488', content: '#ecfdfa', border: '#0d9488', bgHover: '#0f766e', bgActive: '#115e59' },
        warning: { bg: '#f59e0b', content: '#3a1d00', border: '#d97706', bgHover: '#d97706', bgActive: '#b45309' },
        danger:  { bg: '#dc2626', content: '#fef2f2', border: '#dc2626', bgHover: '#b91c1c', bgActive: '#991b1b' },
        info:    { bg: '#0891b2', content: '#ecfeff', border: '#0891b2', bgHover: '#0e7490', bgActive: '#155e75' },
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
    // Soft cool drop shadows — NOT luminance glows. On a light ground the
    // surface reads by a gentle shadow + the faint border, with the frosted
    // fill doing the glass work.
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '0 1px 3px rgba(16, 36, 70, 0.08), 0 1px 2px rgba(16, 36, 70, 0.06)' },
      medium: { boxShadow: '0 4px 12px rgba(16, 36, 70, 0.10), 0 2px 4px rgba(16, 36, 70, 0.06)' },
      high: { boxShadow: '0 12px 28px rgba(16, 36, 70, 0.14), 0 4px 8px rgba(16, 36, 70, 0.08)' },
      overlay: { boxShadow: '0 24px 60px rgba(16, 36, 70, 0.20), 0 8px 16px rgba(16, 36, 70, 0.10)' },
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
      focusRing: { width: '2px', offset: '2px', color: '#2563eb', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      // The light cool mesh — azure, cyan, emerald, violet at PASTEL alpha so
      // the gradient stays soft on white and dark ink text reads everywhere.
      atmosphereGradient: [
        'radial-gradient(at 18% 20%, rgba(37, 99, 235, 0.20), transparent 56%)',
        'radial-gradient(at 82% 26%, rgba(34, 211, 238, 0.22), transparent 58%)',
        'radial-gradient(at 60% 85%, rgba(16, 185, 129, 0.18), transparent 58%)',
        'radial-gradient(at 10% 88%, rgba(139, 92, 246, 0.18), transparent 54%)',
      ].join(', '),
      // Records the frosted-white luminance lift. Unused by the engine CSS
      // (only the gradient + card blur are wired), so the value is documentary.
      luminanceCenter: 'rgba(255, 255, 255, 0.60)',
      surfaceBy: 'luminance',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
