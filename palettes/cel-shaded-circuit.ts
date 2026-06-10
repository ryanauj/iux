import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-shaded (Circuit) — the CEL-SHADED variation on the "new tech gradient"
 * theme. It takes the modern-app electric palette (indigo / cyan / violet /
 * emerald) but renders it as flat poster cels on a deep circuit-board host:
 * every surface is an OPAQUE flat fill bounded by a hard ink line, shading is a
 * single hard-offset darker shape with no blur. Where the `aurora` registers
 * dissolve their chroma into a drifting gradient, Circuit freezes the same
 * colors into a comic-book / cyberpunk-HUD read — saturated neon blocks with a
 * crisp electric outline.
 *
 * Rides the `cel-shaded` engine and so puts its three signal slots to work:
 * `effect.outline.color` / `effect.outline.width` (the hard line the engine
 * block paints around every interactive control and card edge) and
 * `effect.shadowStyle: 'hard'` (the two-tone offset shading in `elevation.*`).
 * Because the host is dark, the "ink" inverts to a bright electric-white edge
 * the same way `cel-glass-noir` does — `color.border.*` and `effect.outline.color`
 * both resolve to it, so the outline stays uniform on every neon cel.
 *
 * Ships `a11y: 'experimental'` — the saturated neon fills on a near-black host
 * sit at the edge of the contrast envelope, so the lint skips it.
 */
export const palette: Palette = {
  id: 'cel-shaded-circuit',
  name: 'Cel-shaded (Circuit)',
  engine: 'cel-shaded',
  a11y: 'experimental',
  tokens: {
    color: {
      // Deep circuit-board host; opaque flat cels stepped just above it. The
      // raised cel is the lit surface and gets the higher value; sunken wells
      // drop back below the floor so they read as recessed cels.
      surface: {
        base: '#0c0f1d',
        raised: '#161a2e',
        sunken: '#0a0d18',
        overlay: '#1a1f36',
        scrim: 'rgba(4, 6, 14, 0.66)',
      },
      content: {
        primary: '#f2f5ff',
        secondary: '#c3c9e0',
        muted: '#7d85a3',
        inverse: '#0a0d18',
        link: '#22d3ee',
      },
      // Every border slot is the bright electric line so the cel outline is
      // uniform regardless of intent; focus jumps to electric cyan.
      border: {
        subtle: '#e2e8ff',
        default: '#e2e8ff',
        strong: '#e2e8ff',
        focus: '#22d3ee',
      },
      // Saturated neon triad as opaque flat fills — indigo primary, cyan info,
      // emerald success, amber warning, rose danger. Every border is the bright
      // line so the outline is the same whichever intent fills the cel.
      intent: {
        primary: { bg: '#6366f1', content: '#f2f5ff', border: '#e2e8ff', bgHover: '#4f46e5', bgActive: '#4338ca' },
        neutral: { bg: '#161a2e', content: '#f2f5ff', border: '#e2e8ff', bgHover: '#1f2540', bgActive: '#272e4e' },
        success: { bg: '#34d399', content: '#04130d', border: '#e2e8ff', bgHover: '#10b981', bgActive: '#059669' },
        warning: { bg: '#fbbf24', content: '#241800', border: '#e2e8ff', bgHover: '#f59e0b', bgActive: '#d97706' },
        danger:  { bg: '#fb7185', content: '#2a0612', border: '#e2e8ff', bgHover: '#f43f5e', bgActive: '#e11d48' },
        info:    { bg: '#22d3ee', content: '#042530', border: '#e2e8ff', bgHover: '#06b6d4', bgActive: '#0891b2' },
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
      sm: '4px',
      md: '8px',
      lg: '12px',
      pill: '999px',
      full: '9999px',
    },
    // `thick` is the outline width cards / panels consume via
    // `--border-width-thick`; `thin` is the outline buttons / inputs consume.
    // Both match the engine's `--outline-width` so the line reads as uniform.
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '2px',
      thick: '3px',
      heavy: '4px',
    },
    // Hard-offset two-tone shadows — a single darker shape offset down-right
    // with no blur, the cel-shading regime. The block is darker than the floor
    // so it reads as "the cel below," bounded by the bright outline above it.
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '3px 3px 0 #05060f' },
      medium: { boxShadow: '5px 5px 0 #05060f' },
      high: { boxShadow: '7px 7px 0 #05060f' },
      overlay: { boxShadow: '8px 8px 0 #05060f, 0 24px 48px rgba(4, 6, 14, 0.55)' },
    },
    typography: {
      family: {
        // Techy condensed display for headings (Chakra Petch / Rajdhani — the
        // HUD-label weight); crisp humanist sans for body. `pixel` / `hand`
        // alias to the body stack so the slots stay defined without becoming
        // load-bearing.
        ui: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: '"Chakra Petch", "Rajdhani", "Inter", system-ui, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 700, lineHeight: '1.05', tracking: '-0.01em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.875rem',weight: 700, lineHeight: '1.15', tracking: '0',       textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.25rem', weight: 600, lineHeight: '1.3',  tracking: '0.01em' },
        subheading: { family: 'ui',      size: '1rem',    weight: 600, lineHeight: '1.4',  tracking: '0.01em' },
        body:       { family: 'ui',      size: '1rem',    weight: 450, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4', tracking: '0.08em',  textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 500, lineHeight: '1.4',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 450, lineHeight: '1.5',  tracking: '0' },
      },
    },
    // Snap-fast motion — cel animation doesn't ease in. Spring keeps a small
    // overshoot so press interactions land with a panel-jiggle.
    motion: {
      duration: {
        instant: '0ms',
        fast: '80ms',
        base: '140ms',
        slow: '220ms',
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
      // No glass blur — cel-shaded cels are opaque flat fills.
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '3px', offset: '2px', color: '#22d3ee', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      // The inverted cel line — bright electric-white, painted by the engine
      // block on every raised surface and interactive control.
      outline: { color: '#e2e8ff', width: '3px' },
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
