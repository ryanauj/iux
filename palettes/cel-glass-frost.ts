import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-Glass (Frost) — the cool, light register of the `cel-glass` engine: a
 * mix of cel-shaded ink outlines and frosted glassmorphism. Surfaces are
 * translucent white over a cool aqua host (`surface.raised` carries alpha and
 * the engine frosts overlay-class panels with `backdrop-filter`), but every
 * raised surface and interactive control is wrapped in a hard cel ink line —
 * `effect.outline.{color,width}` drives the engine's literal `outline:` halo
 * and `color.border.*` resolves to the same ink so cards/modals carry it too.
 *
 * The combination is the whole point: glass gives the depth and the frosted
 * see-through panels; cel gives the crisp graphic boundary glass usually
 * lacks. `elevation.*` blends the two — an inset white top-highlight (glass)
 * stacked on a hard-offset ink block with no blur (cel, `shadowStyle = hard`).
 *
 * Like every translucent palette it ships `a11y: 'experimental'` — the
 * frosted fills mean contrast depends on whatever sits behind the panel, so
 * the contrast lint skips it the same way it skips the glassmorphism family.
 */
export const palette: Palette = {
  id: 'cel-glass-frost',
  name: 'Cel-Glass (Frost)',
  engine: 'cel-glass',
  a11y: 'experimental',
  tokens: {
    color: {
      // Cool aqua host; translucent whites for the frosted cels. The cel ink
      // line lives in `border.*` so every panel reads as a crisp glass card
      // rather than a soft frosted blob.
      surface: {
        base: '#5ea9cf',
        raised: 'rgba(255, 255, 255, 0.42)',
        sunken: 'rgba(255, 255, 255, 0.22)',
        overlay: 'rgba(255, 255, 255, 0.58)',
        scrim: 'rgba(8, 30, 48, 0.46)',
      },
      content: {
        primary: '#0b1622',
        secondary: 'rgba(11, 22, 34, 0.74)',
        muted: 'rgba(11, 22, 34, 0.52)',
        inverse: '#f0f9ff',
        link: '#0369a1',
      },
      // Every border slot is the cel ink so the outline is uniform whichever
      // token a component reads. Focus jumps to a brighter cyan.
      border: {
        subtle: 'rgba(11, 22, 34, 0.55)',
        default: '#0b1622',
        strong: '#0b1622',
        focus: '#0284c7',
      },
      // Cool triad — cyan primary, sky info, mint success — held at high alpha
      // so the fills stay legible cels over the frosted field. Every border is
      // ink so intent changes never change the outline.
      intent: {
        primary: { bg: 'rgba(6, 182, 212, 0.92)', content: '#04222b', border: '#0b1622', bgHover: 'rgba(8, 145, 178, 0.95)', bgActive: 'rgba(14, 116, 144, 0.98)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.5)', content: '#0b1622', border: '#0b1622', bgHover: 'rgba(255, 255, 255, 0.62)', bgActive: 'rgba(255, 255, 255, 0.72)' },
        success: { bg: 'rgba(16, 185, 129, 0.92)', content: '#022c22', border: '#0b1622', bgHover: 'rgba(5, 150, 105, 0.95)', bgActive: 'rgba(4, 120, 87, 0.98)' },
        warning: { bg: 'rgba(245, 158, 11, 0.92)', content: '#2a1a00', border: '#0b1622', bgHover: 'rgba(217, 119, 6, 0.95)', bgActive: 'rgba(180, 83, 9, 0.98)' },
        danger:  { bg: 'rgba(239, 68, 68, 0.92)', content: '#2a0608', border: '#0b1622', bgHover: 'rgba(220, 38, 38, 0.95)', bgActive: 'rgba(185, 28, 28, 0.98)' },
        info:    { bg: 'rgba(59, 130, 246, 0.92)', content: '#04173a', border: '#0b1622', bgHover: 'rgba(37, 99, 235, 0.95)', bgActive: 'rgba(29, 78, 216, 0.98)' },
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
    // Glass-leaning radii — rounded enough to read as a polished pane, tight
    // enough that the ink outline stays crisp at the corner.
    radius: {
      none: '0',
      sm: '8px',
      md: '12px',
      lg: '18px',
      pill: '999px',
      full: '9999px',
    },
    // `thick` is the 2px cel outline cards consume via `--border-width-thick`;
    // it matches the engine's `--outline-width` so the line reads uniform.
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '2px',
      thick: '2px',
      heavy: '3px',
    },
    // The hybrid: an inset white top-highlight (glass refraction) stacked on a
    // hard-offset ink block with no blur (cel shading). `overlay` adds a
    // diffuse ambient drop because modal-class panels sit high enough for it.
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.55), 2px 2px 0 rgba(11, 22, 34, 0.16)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 3px 3px 0 rgba(11, 22, 34, 0.2)' },
      high: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.66), 5px 5px 0 rgba(11, 22, 34, 0.24)' },
      overlay: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.72), 6px 6px 0 rgba(11, 22, 34, 0.26), 0 24px 48px rgba(8, 30, 48, 0.4)' },
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
    // Mid-tempo — quicker than glass's slow drift, softer than cel's snap, so
    // the frosted hover settle reads without feeling sluggish.
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
      // The glass half — non-zero blur the engine applies to overlay-class
      // panels (Card, Modal, Drawer, Toast, Tooltip, Popover).
      backdropBlur: { none: 'none', sm: 'blur(6px)', md: 'blur(14px)', lg: 'blur(22px)' },
      focusRing: { width: '2px', offset: '2px', color: '#0284c7', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      // The cel half — the ink line the engine paints around every control.
      outline: { color: '#0b1622', width: '2px' },
      shadowStyle: 'hard',
      // No-op signals for the Aurora / Pixel / Terminal engines.
      atmosphereGradient: 'none',
      luminanceCenter: 'transparent',
      surfaceBy: 'border',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
