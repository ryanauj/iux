import type { Palette } from '../tokens/semantic.contract'

/**
 * Vercel Geist — Flat engine tuned for the Vercel Geist / shadcn modern
 * dev-tool register. Pure-white field, pure-black primary, the canonical
 * Vercel blue (`#0070f3`) as `intent.info`, hairline-only elevations,
 * Geist-feel sans-serif throughout. The "ship a developer dashboard"
 * aesthetic — closer to AAA than Flat / Classic, but with one saturated
 * accent and softer corners.
 *
 *   - `surface.base` and `surface.raised` are both pure white (`#ffffff`)
 *     — depth is delivered through 1-px hairline borders, not by
 *     differentiated surface luminance. `surface.sunken` drops only to
 *     `#fafafa` for input wells.
 *   - `intent.primary.bg` is pure black (`#000000`) — the Vercel convention
 *     where the primary button is a solid black slab. `intent.info` is the
 *     signature `#0070f3` blue (Vercel link colour and the brand-defining
 *     accent). `intent.success` is `#0a874a`; `intent.warning` is amber
 *     (`#d97706`); `intent.danger` is `#e00000` (Vercel's error red).
 *   - `typography.family.*` aliases to Geist Sans with Inter / Söhne as
 *     fallbacks. The display weights climb to 600 (semibold, not bold) —
 *     the Geist register favours medium weights at large sizes.
 *   - `radius.*` is tight (`sm = 4px / md = 6px / lg = 8px`) — modern
 *     shadcn / Vercel components round just enough to read as friendly
 *     without committing to claymorphism softness.
 *   - `elevation.low` is a 1 px hairline ring; `medium` adds a very low
 *     alpha drop shadow. The shadow tint is neutral grey (`rgba(0, 0, 0, 0.06)`)
 *     — no chromatic cast.
 */
export const palette: Palette = {
  id: 'vercel-geist',
  name: 'Vercel Geist',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#ffffff',
        raised: '#ffffff',
        sunken: '#fafafa',
        overlay: '#ffffff',
        scrim: 'rgba(0, 0, 0, 0.55)',
      },
      content: {
        primary: '#000000',
        secondary: '#525252',
        muted: '#8f8f8f',
        inverse: '#ffffff',
        link: '#0070f3',
      },
      border: {
        subtle: '#eaeaea',
        default: '#d4d4d4',
        strong: '#000000',
        focus: '#0070f3',
      },
      intent: {
        primary: { bg: '#000000', content: '#ffffff', border: '#000000', bgHover: '#171717', bgActive: '#2e2e2e' },
        neutral: { bg: '#fafafa', content: '#000000', border: '#eaeaea', bgHover: '#f0f0f0', bgActive: '#e0e0e0' },
        success: { bg: '#0a874a', content: '#ffffff', border: '#076b3a', bgHover: '#076b3a', bgActive: '#05502c' },
        warning: { bg: '#d97706', content: '#ffffff', border: '#b86204', bgHover: '#b86204', bgActive: '#8c4a03' },
        danger:  { bg: '#e00000', content: '#ffffff', border: '#b40000', bgHover: '#b40000', bgActive: '#8a0000' },
        info:    { bg: '#0070f3', content: '#ffffff', border: '#005ccc', bgHover: '#005ccc', bgActive: '#00489c' },
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
      md: '6px',
      lg: '8px',
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
      flat: { boxShadow: 'none' },
      low: { boxShadow: '0 0 0 1px #eaeaea' },
      medium: { boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04), 0 0 0 1px #eaeaea' },
      high: { boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)' },
      overlay: { boxShadow: '0 20px 36px rgba(0, 0, 0, 0.16), 0 8px 12px rgba(0, 0, 0, 0.06)' },
    },
    typography: {
      family: {
        ui: '"Geist", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Geist", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        mono: '"Geist Mono", "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
        pixel: '"Geist", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Geist", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 600, lineHeight: '1.1',  tracking: '-0.025em' },
        title:      { family: 'display', size: '2rem',     weight: 600, lineHeight: '1.2',  tracking: '-0.02em' },
        heading:    { family: 'display', size: '1.375rem', weight: 600, lineHeight: '1.3',  tracking: '-0.01em' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 500, lineHeight: '1.4',  tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '100ms',
        base: '180ms',
        slow: '280ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#0070f3', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
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
