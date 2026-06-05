import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-Glass (Orchid) — the violet, light-ground register of the `cel-glass`
 * engine. Same light-ground formula as Mist / Bone: a soft near-white ground
 * (`surface.base = #f8f6fc`, a faint cool-greige) with the colour moved into
 * the highlights. The cel line is a saturated violet
 * (`effect.outline.color = #7c3aed`) drawn around every pane and control.
 *
 * `surface.raised` is white at 0.62 alpha frosted by `backdrop-filter`; over
 * the pale ground the glass is a soft lift and the violet cel line carries the
 * identity. `elevation.*` tints the hard cel offset violet
 * (`effect.shadowStyle = hard`).
 *
 * Dark ink content on the pale ground clears AA, so this register ships
 * `a11y: 'pass'`.
 */
export const palette: Palette = {
  id: 'cel-glass-orchid',
  name: 'Cel-Glass (Orchid)',
  engine: 'cel-glass',
  a11y: 'pass',
  tokens: {
    color: {
      // Pale cool-greige ground; translucent whites for the frosted cels. The
      // colour lives in the violet cel line, not the surface.
      surface: {
        base: '#f8f6fc',
        raised: 'rgba(255, 255, 255, 0.62)',
        sunken: 'rgba(124, 58, 237, 0.06)',
        overlay: 'rgba(255, 255, 255, 0.82)',
        scrim: 'rgba(30, 12, 48, 0.34)',
      },
      content: {
        primary: '#1f1430',
        secondary: 'rgba(31, 20, 48, 0.74)',
        muted: 'rgba(31, 20, 48, 0.54)',
        inverse: '#f8f6fc',
        link: '#7c3aed',
      },
      // The violet highlight cel line. Focus jumps to a warm amber so it pops
      // against the violet.
      border: {
        subtle: 'rgba(124, 58, 237, 0.5)',
        default: '#7c3aed',
        strong: '#7c3aed',
        focus: '#ea580c',
      },
      // Semantic fills dark-enough for white content; every intent border is
      // the violet highlight line so the cel edge stays uniform.
      intent: {
        primary: { bg: 'rgba(124, 58, 237, 0.96)', content: '#ffffff', border: '#7c3aed', bgHover: 'rgba(109, 40, 217, 0.98)', bgActive: 'rgba(91, 33, 182, 1)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.62)', content: '#1f1430', border: '#7c3aed', bgHover: 'rgba(255, 255, 255, 0.74)', bgActive: 'rgba(255, 255, 255, 0.84)' },
        success: { bg: 'rgba(21, 128, 61, 0.96)', content: '#ffffff', border: '#7c3aed', bgHover: 'rgba(22, 101, 52, 0.98)', bgActive: 'rgba(20, 83, 45, 1)' },
        warning: { bg: 'rgba(161, 98, 7, 0.96)', content: '#ffffff', border: '#7c3aed', bgHover: 'rgba(133, 77, 14, 0.98)', bgActive: 'rgba(113, 63, 18, 1)' },
        danger:  { bg: 'rgba(190, 18, 60, 0.96)', content: '#ffffff', border: '#7c3aed', bgHover: 'rgba(159, 18, 57, 0.98)', bgActive: 'rgba(136, 19, 55, 1)' },
        info:    { bg: 'rgba(29, 78, 216, 0.96)', content: '#ffffff', border: '#7c3aed', bgHover: 'rgba(30, 64, 175, 0.98)', bgActive: 'rgba(30, 58, 138, 1)' },
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
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.7), 2px 2px 0 rgba(124, 58, 237, 0.16)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.75), 3px 3px 0 rgba(124, 58, 237, 0.2)' },
      high: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8), 5px 5px 0 rgba(124, 58, 237, 0.24)' },
      overlay: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.85), 6px 6px 0 rgba(124, 58, 237, 0.24), 0 24px 48px rgba(30, 12, 48, 0.22)' },
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
      focusRing: { width: '2px', offset: '2px', color: '#ea580c', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      // The cel line as a colour highlight — saturated violet instead of ink.
      outline: { color: '#7c3aed', width: '2px' },
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
