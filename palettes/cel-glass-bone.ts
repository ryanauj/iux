import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-Glass (Bone) — the warm, beige-ground register of the `cel-glass`
 * engine. Same light-ground formula as Mist / Orchid: a near-white neutral —
 * here a warm bone / ivory paper (`surface.base = #f3ecdf`) — with the colour
 * moved into the highlights. The cel line is a burnt-clay terracotta
 * (`effect.outline.color = #b45309`) drawn around every pane and control.
 *
 * `surface.raised` is white at 0.6 alpha frosted by `backdrop-filter`, so over
 * a textured host the panes still blur; over the bone ground the glass is a
 * soft lift and the clay cel line carries the look. `elevation.*` tints the
 * hard cel offset with the same clay (`effect.shadowStyle = hard`).
 *
 * Dark warm-ink content on the bone ground clears AA, so this register ships
 * `a11y: 'pass'`.
 */
export const palette: Palette = {
  id: 'cel-glass-bone',
  name: 'Cel-Glass (Bone)',
  engine: 'cel-glass',
  a11y: 'pass',
  tokens: {
    color: {
      // Warm bone / ivory ground; translucent whites for the frosted cels.
      // The colour lives in the clay cel line, not the surface.
      surface: {
        base: '#f3ecdf',
        raised: 'rgba(255, 255, 255, 0.6)',
        sunken: 'rgba(180, 83, 9, 0.07)',
        overlay: 'rgba(255, 252, 246, 0.82)',
        scrim: 'rgba(48, 30, 8, 0.34)',
      },
      content: {
        primary: '#2a1f10',
        secondary: 'rgba(42, 31, 16, 0.74)',
        muted: 'rgba(42, 31, 16, 0.54)',
        inverse: '#fffaf0',
        link: '#b45309',
      },
      // The clay highlight cel line. Focus jumps to a deep teal so it pops
      // against the warm terracotta.
      border: {
        subtle: 'rgba(180, 83, 9, 0.5)',
        default: '#b45309',
        strong: '#b45309',
        focus: '#0e7490',
      },
      // Semantic fills dark-enough for white content; every intent border is
      // the clay highlight line so the cel edge stays uniform.
      intent: {
        primary: { bg: 'rgba(180, 83, 9, 0.96)', content: '#fffaf0', border: '#b45309', bgHover: 'rgba(154, 52, 18, 0.98)', bgActive: 'rgba(124, 45, 18, 1)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.6)', content: '#2a1f10', border: '#b45309', bgHover: 'rgba(255, 255, 255, 0.72)', bgActive: 'rgba(255, 255, 255, 0.82)' },
        success: { bg: 'rgba(77, 124, 15, 0.96)', content: '#fffaf0', border: '#b45309', bgHover: 'rgba(63, 98, 18, 0.98)', bgActive: 'rgba(54, 83, 20, 1)' },
        warning: { bg: 'rgba(161, 98, 7, 0.96)', content: '#fffaf0', border: '#b45309', bgHover: 'rgba(133, 77, 14, 0.98)', bgActive: 'rgba(113, 63, 18, 1)' },
        danger:  { bg: 'rgba(185, 28, 28, 0.96)', content: '#fffaf0', border: '#b45309', bgHover: 'rgba(153, 27, 27, 0.98)', bgActive: 'rgba(127, 29, 29, 1)' },
        info:    { bg: 'rgba(3, 105, 161, 0.96)', content: '#fffaf0', border: '#b45309', bgHover: 'rgba(7, 89, 133, 0.98)', bgActive: 'rgba(12, 74, 110, 1)' },
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
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.7), 2px 2px 0 rgba(180, 83, 9, 0.16)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.75), 3px 3px 0 rgba(180, 83, 9, 0.2)' },
      high: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8), 5px 5px 0 rgba(180, 83, 9, 0.24)' },
      overlay: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.85), 6px 6px 0 rgba(180, 83, 9, 0.24), 0 24px 48px rgba(48, 30, 8, 0.22)' },
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
      focusRing: { width: '2px', offset: '2px', color: '#0e7490', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      // The cel line as a colour highlight — burnt clay instead of ink.
      outline: { color: '#b45309', width: '2px' },
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
