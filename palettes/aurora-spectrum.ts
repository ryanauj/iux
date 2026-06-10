import type { Palette } from '../tokens/semantic.contract'

/**
 * Aurora (Spectrum) — the cool-side "new tech gradient" register on the
 * `aurora` engine: an azure → cyan → emerald → violet mesh drifting over a
 * deep blue-black host. Where Nebula leans warm and product-marketing, Spectrum
 * leans cool and dashboard — the observability / dev-tool flavour of the same
 * modern-app gradient (Vercel OG art, Grafana, telemetry hero sections).
 *
 * Same engine as `aurora` and `aurora-nebula`: surfaces are demarcated by
 * LIGHT DENSITY (`surfaceBy: 'luminance'`), `effect.atmosphereGradient` carries
 * a four-radial mesh the engine paints at the root and slowly drifts over a 48s
 * loop, and `effect.luminanceCenter` is the translucent near-white halo the
 * engine glows around raised surfaces. The cool tilt comes from a sky-blue
 * primary, a cyan luminance/focus accent, and an emerald success picked out of
 * the gradient.
 *
 * Ships `a11y: 'experimental'` with the translucent-surface family — luminance
 * surfaces make contrast depend on the brightest reachable gradient spot, so
 * the contrast lint skips it. Cool near-white `#e6f1f8` still clears AA on the
 * brightest (azure) center.
 */
export const palette: Palette = {
  id: 'aurora-spectrum',
  name: 'Aurora (Spectrum)',
  engine: 'aurora',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#06080f',
        raised: 'rgba(255, 255, 255, 0.05)',
        sunken: 'rgba(0, 0, 0, 0.24)',
        overlay: 'rgba(255, 255, 255, 0.08)',
        scrim: 'rgba(4, 6, 12, 0.72)',
      },
      content: {
        primary: '#e6f1f8',
        secondary: '#a6bccb',
        muted: '#6a8194',
        inverse: '#06080f',
        link: '#38d9c4',
      },
      border: {
        subtle: 'rgba(255, 255, 255, 0.05)',
        default: 'rgba(255, 255, 255, 0.10)',
        strong: 'rgba(255, 255, 255, 0.18)',
        focus: '#38bdf8',
      },
      intent: {
        primary: {
          bg: '#1d5fd8',
          content: '#e6f1f8',
          border: 'rgba(56, 189, 248, 0.50)',
          bgHover: '#2470ea',
          bgActive: '#1a4eb0',
        },
        neutral: {
          bg: 'rgba(255, 255, 255, 0.08)',
          content: '#e6f1f8',
          border: 'rgba(255, 255, 255, 0.18)',
          bgHover: 'rgba(255, 255, 255, 0.14)',
          bgActive: 'rgba(255, 255, 255, 0.22)',
        },
        success: {
          bg: '#0d8466',
          content: '#ecfdf6',
          border: 'rgba(52, 211, 153, 0.50)',
          bgHover: '#129b78',
          bgActive: '#0a6b54',
        },
        warning: {
          bg: '#9a6a1c',
          content: '#fff8e8',
          border: 'rgba(251, 191, 36, 0.50)',
          bgHover: '#b27c2a',
          bgActive: '#825816',
        },
        danger: {
          bg: '#b02f56',
          content: '#fdeef3',
          border: 'rgba(244, 114, 182, 0.50)',
          bgHover: '#c83a66',
          bgActive: '#982748',
        },
        info: {
          bg: '#1f7fa8',
          content: '#ecf9ff',
          border: 'rgba(125, 211, 252, 0.50)',
          bgHover: '#2592bf',
          bgActive: '#186686',
        },
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
    // Paired outer-cyan-glow + inner-white-lift — no hard offsets.
    elevation: {
      flat: { boxShadow: 'none' },
      low: {
        boxShadow:
          '0 0 24px 2px rgba(56, 189, 248, 0.12), inset 0 0 20px rgba(255, 255, 255, 0.03)',
      },
      medium: {
        boxShadow:
          '0 0 40px 4px rgba(56, 189, 248, 0.16), inset 0 0 24px rgba(255, 255, 255, 0.04)',
      },
      high: {
        boxShadow:
          '0 0 56px 6px rgba(56, 189, 248, 0.20), inset 0 0 28px rgba(255, 255, 255, 0.05)',
      },
      overlay: {
        boxShadow:
          '0 0 80px 10px rgba(56, 189, 248, 0.24), inset 0 0 32px rgba(255, 255, 255, 0.06), 0 16px 48px rgba(4, 6, 12, 0.55)',
      },
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
      backdropBlur: { none: 'none', sm: 'blur(8px)', md: 'blur(16px)', lg: 'blur(28px)' },
      focusRing: { width: '2px', offset: '2px', color: '#38bdf8', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      // The cool "new tech gradient" mesh — azure, cyan, emerald, violet
      // centers on the blue-black floor. Same low-alpha contrast discipline
      // as the rest of the family.
      atmosphereGradient: [
        'radial-gradient(at 24% 26%, rgba(37, 99, 235, 0.44), transparent 56%)',
        'radial-gradient(at 80% 34%, rgba(34, 211, 238, 0.38), transparent 58%)',
        'radial-gradient(at 58% 84%, rgba(16, 185, 129, 0.34), transparent 58%)',
        'radial-gradient(at 12% 88%, rgba(139, 92, 246, 0.30), transparent 54%)',
      ].join(', '),
      luminanceCenter: 'rgba(255, 255, 255, 0.08)',
      surfaceBy: 'luminance',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
