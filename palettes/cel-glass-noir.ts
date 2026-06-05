import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-Glass (Noir) — the dark, neon register of the `cel-glass` engine. Same
 * mix of cel-shaded ink line and frosted glass, inverted onto a near-black
 * host. The defining move is the cel outline: on a dark panel a near-black
 * ink line would vanish, so the "ink" inverts to a bright near-white edge.
 * `effect.outline.color` carries that light line and `color.border.*` resolves
 * to the same value, so every smoked-glass panel reads as a crisp lit cel.
 *
 * Surfaces are low-alpha whites over the midnight base (the engine frosts
 * overlay-class panels with `backdrop-filter`); intents are neon cyan / mint /
 * amber held at high alpha so they glow against the dark glass. `elevation.*`
 * keeps the hybrid — an inset white top-highlight (glass) over a hard-offset
 * light block with no blur (cel, `shadowStyle = hard`).
 *
 * Ships `a11y: 'experimental'` with the rest of the translucent family — the
 * frosted fills make contrast depend on the backdrop, so the contrast lint
 * skips it.
 */
export const palette: Palette = {
  id: 'cel-glass-noir',
  name: 'Cel-Glass (Noir)',
  engine: 'cel-glass',
  a11y: 'experimental',
  tokens: {
    color: {
      // Midnight host; low-alpha whites for the smoked-glass cels. The cel
      // line is a bright near-white edge so it shows on the dark panels.
      surface: {
        base: '#0c1018',
        raised: 'rgba(255, 255, 255, 0.07)',
        sunken: 'rgba(255, 255, 255, 0.035)',
        overlay: 'rgba(255, 255, 255, 0.1)',
        scrim: 'rgba(0, 0, 0, 0.56)',
      },
      content: {
        primary: '#f4f8ff',
        secondary: 'rgba(244, 248, 255, 0.72)',
        muted: 'rgba(244, 248, 255, 0.46)',
        inverse: '#0c1018',
        link: '#7dd3fc',
      },
      // The inverted cel line — bright near-white. Every slot points at it so
      // the outline is uniform; focus jumps to neon cyan.
      border: {
        subtle: 'rgba(232, 246, 255, 0.4)',
        default: 'rgba(232, 246, 255, 0.85)',
        strong: '#e8f6ff',
        focus: '#22d3ee',
      },
      // Neon triad over dark glass — every border is the bright line so the
      // outline stays uniform whichever intent fills the cel.
      intent: {
        primary: { bg: 'rgba(34, 211, 238, 0.92)', content: '#04222b', border: '#e8f6ff', bgHover: 'rgba(6, 182, 212, 0.96)', bgActive: 'rgba(8, 145, 178, 1)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.1)', content: '#f4f8ff', border: 'rgba(232, 246, 255, 0.85)', bgHover: 'rgba(255, 255, 255, 0.16)', bgActive: 'rgba(255, 255, 255, 0.24)' },
        success: { bg: 'rgba(52, 211, 153, 0.92)', content: '#022c22', border: '#e8f6ff', bgHover: 'rgba(16, 185, 129, 0.96)', bgActive: 'rgba(5, 150, 105, 1)' },
        warning: { bg: 'rgba(251, 191, 36, 0.92)', content: '#2a1a00', border: '#e8f6ff', bgHover: 'rgba(245, 158, 11, 0.96)', bgActive: 'rgba(217, 119, 6, 1)' },
        danger:  { bg: 'rgba(251, 113, 133, 0.92)', content: '#2a0610', border: '#e8f6ff', bgHover: 'rgba(244, 63, 94, 0.96)', bgActive: 'rgba(225, 29, 72, 1)' },
        info:    { bg: 'rgba(96, 165, 250, 0.92)', content: '#04173a', border: '#e8f6ff', bgHover: 'rgba(59, 130, 246, 0.96)', bgActive: 'rgba(37, 99, 235, 1)' },
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
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 2px 2px 0 rgba(232, 246, 255, 0.14)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 3px 3px 0 rgba(232, 246, 255, 0.18)' },
      high: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 5px 5px 0 rgba(232, 246, 255, 0.22)' },
      overlay: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.24), 6px 6px 0 rgba(232, 246, 255, 0.24), 0 24px 52px rgba(0, 0, 0, 0.6)' },
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
      // The inverted cel line — bright near-white instead of ink.
      outline: { color: '#e8f6ff', width: '2px' },
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
