import type { Palette } from '../tokens/semantic.contract'

/**
 * Aurora (Nebula) — the warm-side "new tech gradient" register on the
 * `aurora` engine: a violet → magenta → cyan → indigo mesh slowly drifting
 * over a deep violet-black host. This is the look a lot of modern apps reach
 * for now (Linear / Stripe / Raycast hero gradients) — saturated chroma
 * supplied entirely by the drifting atmosphere, surfaces demarcated by
 * LIGHT DENSITY (`surfaceBy: 'luminance'`) rather than borders.
 *
 * It rides the same engine as `aurora` and so exercises the same three
 * load-bearing slots: `effect.atmosphereGradient` (the four-radial mesh the
 * engine paints at the root and drifts over a 48s loop), `effect.luminanceCenter`
 * (the translucent near-white halo the engine glows around raised surfaces),
 * and `effect.surfaceBy: 'luminance'`. Where the original `aurora` leans cool
 * and astrophotographic (purple / green / teal), Nebula leans warm and
 * product-marketing: a violet primary, a fuchsia luminance center, and a
 * cyan link picked out of the gradient itself.
 *
 * Ships `a11y: 'experimental'` with the rest of the translucent-surface family
 * — the luminance surfaces make text contrast depend on the brightest reachable
 * gradient spot, so the contrast lint skips it. Every text color is still
 * chosen against the brightest center (warm near-white `#f0ecfb` on the violet
 * center clears well above AA).
 */
export const palette: Palette = {
  id: 'aurora-nebula',
  name: 'Aurora (Nebula)',
  engine: 'aurora',
  a11y: 'experimental',
  tokens: {
    color: {
      // Deep violet-black floor — the chroma all comes from the drifting
      // atmosphere, so the base stays near-neutral with a faint violet bias.
      surface: {
        base: '#0b0813',
        // Translucent luminance lift, not an opaque fill — reads as a brighter
        // patch of the same nebula. The engine adds the outer halo + blur.
        raised: 'rgba(255, 255, 255, 0.05)',
        sunken: 'rgba(0, 0, 0, 0.22)',
        overlay: 'rgba(255, 255, 255, 0.08)',
        scrim: 'rgba(7, 5, 14, 0.72)',
      },
      // Warm-tinted near-white type, stepping down within the same family.
      content: {
        primary: '#f0ecfb',
        secondary: '#b7adce',
        muted: '#7b7193',
        inverse: '#0b0813',
        // Cyan link picked straight out of the gradient.
        link: '#67e8f9',
      },
      // Recessive white tints — the luminance centers do the real surface
      // demarcation; focus holds full-chroma violet so keyboard focus survives.
      border: {
        subtle: 'rgba(255, 255, 255, 0.05)',
        default: 'rgba(255, 255, 255, 0.10)',
        strong: 'rgba(255, 255, 255, 0.18)',
        focus: '#c4b5fd',
      },
      // Intents picked out of the nebula register — violet primary, fuchsia-lean
      // danger, cyan info, emerald success. Borders are translucent tinted
      // glows rather than hard strokes, matching the luminance model.
      intent: {
        primary: {
          bg: '#6d28d9',
          content: '#f0ecfb',
          border: 'rgba(196, 181, 253, 0.50)',
          bgHover: '#7c3aed',
          bgActive: '#5b21b6',
        },
        neutral: {
          bg: 'rgba(255, 255, 255, 0.08)',
          content: '#f0ecfb',
          border: 'rgba(255, 255, 255, 0.18)',
          bgHover: 'rgba(255, 255, 255, 0.14)',
          bgActive: 'rgba(255, 255, 255, 0.22)',
        },
        success: {
          bg: '#0e8060',
          content: '#f0fdf9',
          border: 'rgba(52, 211, 153, 0.50)',
          bgHover: '#149970',
          bgActive: '#0a6850',
        },
        warning: {
          bg: '#a06820',
          content: '#fff8e8',
          border: 'rgba(251, 191, 36, 0.50)',
          bgHover: '#b87830',
          bgActive: '#885818',
        },
        danger: {
          bg: '#be2667',
          content: '#fdeef5',
          border: 'rgba(244, 114, 182, 0.50)',
          bgHover: '#d42d74',
          bgActive: '#9e1f55',
        },
        info: {
          bg: '#1f7a9e',
          content: '#ecf9ff',
          border: 'rgba(103, 232, 249, 0.50)',
          bgHover: '#258bb2',
          bgActive: '#186279',
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
    // Paired outer-violet-glow + inner-white-lift — no hard offsets. The
    // surface metaphor is "a brighter patch of the nebula," not paper on paper.
    elevation: {
      flat: { boxShadow: 'none' },
      low: {
        boxShadow:
          '0 0 24px 2px rgba(139, 92, 246, 0.12), inset 0 0 20px rgba(255, 255, 255, 0.03)',
      },
      medium: {
        boxShadow:
          '0 0 40px 4px rgba(139, 92, 246, 0.16), inset 0 0 24px rgba(255, 255, 255, 0.04)',
      },
      high: {
        boxShadow:
          '0 0 56px 6px rgba(139, 92, 246, 0.20), inset 0 0 28px rgba(255, 255, 255, 0.05)',
      },
      overlay: {
        boxShadow:
          '0 0 80px 10px rgba(139, 92, 246, 0.24), inset 0 0 32px rgba(255, 255, 255, 0.06), 0 16px 48px rgba(7, 5, 14, 0.55)',
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
      focusRing: { width: '2px', offset: '2px', color: '#c4b5fd', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      // The warm "new tech gradient" mesh — violet, fuchsia, cyan, indigo
      // centers on the violet-black floor. Anchored at different positions so
      // the engine's 48s drift reads as a living mesh rather than a sweep.
      // Alphas stay low enough that warm near-white text clears AA on every
      // spot the gradient touches.
      atmosphereGradient: [
        'radial-gradient(at 20% 25%, rgba(124, 58, 237, 0.45), transparent 55%)',
        'radial-gradient(at 80% 30%, rgba(217, 70, 239, 0.40), transparent 58%)',
        'radial-gradient(at 62% 82%, rgba(34, 211, 238, 0.36), transparent 58%)',
        'radial-gradient(at 12% 90%, rgba(99, 102, 241, 0.34), transparent 54%)',
      ].join(', '),
      luminanceCenter: 'rgba(255, 255, 255, 0.08)',
      surfaceBy: 'luminance',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
