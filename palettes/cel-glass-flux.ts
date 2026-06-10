import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-Glass (Flux) — the GLASS variation on the "new tech gradient" theme. It
 * takes the same modern-app palette (electric indigo / violet / cyan) but
 * delivers it through the `cel-glass` engine: frosted translucent panels over
 * a deep indigo-navy host, each cut with a bright cel ink line. Think of it as
 * the gradient aesthetic frozen into glass cards — the chroma lives in the
 * intent fills and the elevation glow rather than in a drifting atmosphere.
 *
 * The defining move is the cel outline: on a dark glass panel a near-black ink
 * line would vanish, so the "ink" inverts to a bright electric-lavender-white
 * edge. `effect.outline.color` carries that line and `color.border.*` resolves
 * to the same value, so every smoked-glass panel reads as a crisp lit cel. The
 * engine block frosts raised/overlay panels with `backdrop-filter` and paints
 * the outline; `elevation.*` keeps the hybrid — an inset white top-highlight
 * (glass) over a hard-offset light block with no blur (cel, `shadowStyle = hard`).
 *
 * Ships `a11y: 'experimental'` with the rest of the translucent family — the
 * frosted fills make contrast depend on the backdrop, so the contrast lint
 * skips it.
 */
export const palette: Palette = {
  id: 'cel-glass-flux',
  name: 'Cel-Glass (Flux)',
  engine: 'cel-glass',
  a11y: 'experimental',
  tokens: {
    color: {
      // Deep indigo-navy host; low-alpha whites for the smoked-glass cels.
      // The cel line is a bright electric-lavender-white so it lights the
      // dark panels.
      surface: {
        base: '#0a0d1a',
        raised: 'rgba(255, 255, 255, 0.07)',
        sunken: 'rgba(255, 255, 255, 0.035)',
        overlay: 'rgba(255, 255, 255, 0.1)',
        scrim: 'rgba(5, 7, 16, 0.58)',
      },
      content: {
        primary: '#eef2ff',
        secondary: 'rgba(238, 242, 255, 0.72)',
        muted: 'rgba(238, 242, 255, 0.46)',
        inverse: '#0a0d1a',
        link: '#67e8f9',
      },
      // The inverted cel line — bright electric-lavender-white. Every slot
      // points at it so the outline is uniform; focus jumps to electric cyan.
      border: {
        subtle: 'rgba(219, 228, 255, 0.4)',
        default: 'rgba(219, 228, 255, 0.85)',
        strong: '#dbe4ff',
        focus: '#22d3ee',
      },
      // Tech-gradient triad over dark glass — indigo / violet / cyan held at
      // high alpha so the fills glow. Every border is the bright line so the
      // outline stays uniform whichever intent fills the cel.
      intent: {
        primary: { bg: 'rgba(99, 102, 241, 0.92)', content: '#070a1f', border: '#dbe4ff', bgHover: 'rgba(79, 70, 229, 0.96)', bgActive: 'rgba(67, 56, 202, 1)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.1)', content: '#eef2ff', border: 'rgba(219, 228, 255, 0.85)', bgHover: 'rgba(255, 255, 255, 0.16)', bgActive: 'rgba(255, 255, 255, 0.24)' },
        success: { bg: 'rgba(52, 211, 153, 0.92)', content: '#022c22', border: '#dbe4ff', bgHover: 'rgba(16, 185, 129, 0.96)', bgActive: 'rgba(5, 150, 105, 1)' },
        warning: { bg: 'rgba(251, 191, 36, 0.92)', content: '#2a1a00', border: '#dbe4ff', bgHover: 'rgba(245, 158, 11, 0.96)', bgActive: 'rgba(217, 119, 6, 1)' },
        danger:  { bg: 'rgba(244, 114, 182, 0.92)', content: '#2a0617', border: '#dbe4ff', bgHover: 'rgba(236, 72, 153, 0.96)', bgActive: 'rgba(219, 39, 119, 1)' },
        info:    { bg: 'rgba(34, 211, 238, 0.92)', content: '#042530', border: '#dbe4ff', bgHover: 'rgba(6, 182, 212, 0.96)', bgActive: 'rgba(8, 145, 178, 1)' },
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
    // Inset white top-highlight (glass) over a hard-offset light block (cel),
    // no blur. `overlay` adds a deep ambient drop for modal-class depth.
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 2px 2px 0 rgba(219, 228, 255, 0.14)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 3px 3px 0 rgba(219, 228, 255, 0.18)' },
      high: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 5px 5px 0 rgba(219, 228, 255, 0.22)' },
      overlay: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.24), 6px 6px 0 rgba(219, 228, 255, 0.24), 0 24px 52px rgba(5, 7, 16, 0.6)' },
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
      // Softer blur than the light registers — dark glass reads as glass at a
      // lower radius before it muddies.
      backdropBlur: { none: 'none', sm: 'blur(5px)', md: 'blur(12px)', lg: 'blur(20px)' },
      focusRing: { width: '2px', offset: '2px', color: '#22d3ee', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      // The inverted cel line — bright electric-lavender-white instead of ink.
      outline: { color: '#dbe4ff', width: '2px' },
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
