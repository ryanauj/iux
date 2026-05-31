import type { Palette } from '../tokens/semantic.contract'

/**
 * Celadon Glaze — the glazed-porcelain register on the Claymorphism engine.
 * Pale jade celadon ware: a misty green-white field, puffy inflated
 * surfaces that read as thrown clay under a translucent glaze, and the
 * soft chromatic intents of a Song-dynasty kiln — celadon, mint, glaze-
 * yellow, persimmon, porcelain blue. Inflated `radius`, doubled inner-
 * highlight / outer-drop shadows give the wet-glaze sheen.
 *
 * Ships `experimental` like the base Claymorphism palette — the pastel
 * glaze fills are tuned for the inflated 3D look, not for AA body text.
 */
export const palette: Palette = {
  id: 'celadon-glaze',
  name: 'Celadon Glaze',
  engine: 'claymorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#e7f0ea',
        raised: '#f3f8f4',
        sunken: '#d8e6dd',
        overlay: '#f7fbf8',
        scrim: 'rgba(31, 58, 46, 0.40)',
      },
      content: {
        primary: '#1f3a2e',
        secondary: '#3a5c4b',
        muted: '#6f8c7e',
        inverse: '#ffffff',
        link: '#2f7d5a',
      },
      border: {
        subtle: 'rgba(31, 58, 46, 0.08)',
        default: 'rgba(31, 58, 46, 0.14)',
        strong: 'rgba(31, 58, 46, 0.26)',
        focus: '#3f9e74',
      },
      intent: {
        primary: { bg: '#8cc3a6', content: '#16331f', border: 'rgba(31, 58, 46, 0.20)', bgHover: '#7cb898', bgActive: '#6aab88' },
        neutral: { bg: '#e3efe7', content: '#1f3a2e', border: 'rgba(31, 58, 46, 0.16)', bgHover: '#d8e6dd', bgActive: '#c9dbcf' },
        success: { bg: '#9ad7b3', content: '#0d3320', border: 'rgba(13, 51, 32, 0.20)', bgHover: '#85cda3', bgActive: '#6fc191' },
        warning: { bg: '#ecd98f', content: '#43370c', border: 'rgba(67, 55, 12, 0.20)', bgHover: '#e6cf77', bgActive: '#dcc25c' },
        danger:  { bg: '#e8a48c', content: '#4a1d10', border: 'rgba(74, 29, 16, 0.20)', bgHover: '#e09277', bgActive: '#d57e60' },
        info:    { bg: '#9ec7e0', content: '#0f3346', border: 'rgba(15, 51, 70, 0.20)', bgHover: '#88badd', bgActive: '#6fabd5' },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '24px',
      '6': '36px',
      '7': '52px',
      '8': '72px',
    },
    radius: {
      none: '0',
      sm: '14px',
      md: '22px',
      lg: '30px',
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
      low: { boxShadow: 'inset 0 -4px 0 rgba(31, 58, 46, 0.12), inset 0 4px 0 rgba(255, 255, 255, 0.60), 0 8px 16px rgba(31, 58, 46, 0.16)' },
      medium: { boxShadow: 'inset 0 -6px 0 rgba(31, 58, 46, 0.14), inset 0 6px 0 rgba(255, 255, 255, 0.66), 0 16px 28px rgba(31, 58, 46, 0.20)' },
      high: { boxShadow: 'inset 0 -8px 0 rgba(31, 58, 46, 0.16), inset 0 8px 0 rgba(255, 255, 255, 0.70), 0 24px 40px rgba(31, 58, 46, 0.24)' },
      overlay: { boxShadow: 'inset 0 -10px 0 rgba(31, 58, 46, 0.18), inset 0 10px 0 rgba(255, 255, 255, 0.75), 0 32px 60px rgba(31, 58, 46, 0.30)' },
    },
    typography: {
      family: {
        ui: '"Quicksand", "Varela Round", system-ui, -apple-system, "Segoe UI", sans-serif',
        display: '"Quicksand", "Varela Round", system-ui, -apple-system, "Segoe UI", sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Quicksand", system-ui, sans-serif',
        hand: '"Quicksand", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 700, lineHeight: '1.15', tracking: '-0.01em' },
        title:      { family: 'display', size: '2rem',     weight: 700, lineHeight: '1.2',  tracking: '0' },
        heading:    { family: 'display', size: '1.375rem', weight: 600, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1.125rem', weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 500, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem', weight: 600, lineHeight: '1.4',  tracking: '0.01em' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 500, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 500, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '180ms',
        base: '280ms',
        slow: '460ms',
      },
      easing: {
        standard: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.7, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '3px', offset: '4px', color: '#3f9e74', style: 'solid' },
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
