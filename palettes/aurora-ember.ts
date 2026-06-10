import type { Palette } from '../tokens/semantic.contract'

/**
 * Aurora (Ember) — the warm sunset register of the `aurora`-engine family: an
 * amber → orange → rose → magenta mesh drifting over a warm near-black host.
 * The dark, fiery cousin of Nebula (violet) and Spectrum (azure) — the same
 * "new tech gradient" surface model (`surfaceBy: 'luminance'`, a four-radial
 * mesh the engine paints at the root and drifts over a 48s loop, translucent
 * luminance-lift cards) tuned to a dusk / golden-hour palette.
 *
 * Chroma comes entirely from the drifting atmosphere; `surface.base` is a warm
 * near-neutral `#120a0c` so the mesh supplies all the colour. The primary is a
 * burnt orange, danger a rose pulled from the mesh, and the focus/accent an
 * amber-orange. Ships `a11y: 'experimental'` with the rest of the
 * translucent-surface family — luminance surfaces make contrast depend on the
 * brightest reachable gradient spot, so the contrast lint skips it.
 */
export const palette: Palette = {
  id: 'aurora-ember',
  name: 'Aurora (Ember)',
  engine: 'aurora',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#120a0c',
        raised: 'rgba(255, 255, 255, 0.05)',
        sunken: 'rgba(0, 0, 0, 0.24)',
        overlay: 'rgba(255, 255, 255, 0.08)',
        scrim: 'rgba(12, 6, 6, 0.72)',
      },
      content: {
        primary: '#fdeee6',
        secondary: '#cbb3a8',
        muted: '#8a746a',
        inverse: '#120a0c',
        link: '#fcae3c',
      },
      border: {
        subtle: 'rgba(255, 255, 255, 0.05)',
        default: 'rgba(255, 255, 255, 0.10)',
        strong: 'rgba(255, 255, 255, 0.18)',
        focus: '#fb923c',
      },
      intent: {
        primary: {
          bg: '#c2410c',
          content: '#fdeee6',
          border: 'rgba(251, 146, 60, 0.50)',
          bgHover: '#dc4f12',
          bgActive: '#9a330a',
        },
        neutral: {
          bg: 'rgba(255, 255, 255, 0.08)',
          content: '#fdeee6',
          border: 'rgba(255, 255, 255, 0.18)',
          bgHover: 'rgba(255, 255, 255, 0.14)',
          bgActive: 'rgba(255, 255, 255, 0.22)',
        },
        success: {
          bg: '#0e8060',
          content: '#ecfdf6',
          border: 'rgba(52, 211, 153, 0.50)',
          bgHover: '#149970',
          bgActive: '#0a6850',
        },
        warning: {
          bg: '#a8631a',
          content: '#fff8e8',
          border: 'rgba(251, 191, 36, 0.50)',
          bgHover: '#c27420',
          bgActive: '#8c5214',
        },
        danger: {
          bg: '#be2350',
          content: '#fdeef2',
          border: 'rgba(251, 113, 133, 0.50)',
          bgHover: '#d62c5c',
          bgActive: '#9e1c42',
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
    elevation: {
      flat: { boxShadow: 'none' },
      low: {
        boxShadow:
          '0 0 24px 2px rgba(251, 146, 60, 0.12), inset 0 0 20px rgba(255, 255, 255, 0.03)',
      },
      medium: {
        boxShadow:
          '0 0 40px 4px rgba(251, 146, 60, 0.16), inset 0 0 24px rgba(255, 255, 255, 0.04)',
      },
      high: {
        boxShadow:
          '0 0 56px 6px rgba(251, 146, 60, 0.20), inset 0 0 28px rgba(255, 255, 255, 0.05)',
      },
      overlay: {
        boxShadow:
          '0 0 80px 10px rgba(251, 146, 60, 0.24), inset 0 0 32px rgba(255, 255, 255, 0.06), 0 16px 48px rgba(12, 6, 6, 0.55)',
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
      focusRing: { width: '2px', offset: '2px', color: '#fb923c', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      // The warm sunset mesh — amber, orange, rose, magenta centers on the
      // warm near-black floor. Low-alpha so warm near-white text clears AA on
      // every spot the gradient touches.
      atmosphereGradient: [
        'radial-gradient(at 22% 24%, rgba(251, 146, 60, 0.42), transparent 56%)',
        'radial-gradient(at 80% 30%, rgba(244, 63, 94, 0.38), transparent 58%)',
        'radial-gradient(at 58% 82%, rgba(217, 70, 239, 0.32), transparent 58%)',
        'radial-gradient(at 12% 88%, rgba(251, 191, 36, 0.30), transparent 54%)',
      ].join(', '),
      luminanceCenter: 'rgba(255, 255, 255, 0.08)',
      surfaceBy: 'luminance',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
