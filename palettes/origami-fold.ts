import type { Palette } from '../tokens/semantic.contract'

/**
 * Origami Fold — the folded-paper register on the Cardstock engine. Crisp
 * bright paper-white stock, charcoal ink, and the saturated facet colours
 * of a folded paper crane: vermilion, leaf, marigold, sky, crimson. The
 * Cardstock cut-edge becomes the crease — every raised surface reads as a
 * sheet folded once and pressed flat.
 *
 * Exercises the `cardstock` engine slots `effect.paperEdgeColor` /
 * `effect.paperEdgeWidth`; the crease itself is baked into `elevation.*`
 * as a paired inset rule + hard zero-blur drop.
 */
export const palette: Palette = {
  id: 'origami-fold',
  name: 'Origami Fold',
  engine: 'cardstock',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f3f1ec',
        raised: '#ffffff',
        sunken: '#e7e4db',
        overlay: '#ffffff',
        scrim: 'rgba(43, 42, 40, 0.50)',
      },
      content: {
        primary: '#2b2a28',
        secondary: '#56544e',
        muted: '#8a8780',
        inverse: '#ffffff',
        link: '#c2452e',
      },
      border: {
        subtle: '#e4e0d6',
        default: '#c9c4b8',
        strong: '#2b2a28',
        focus: '#c2452e',
      },
      intent: {
        primary: { bg: '#c2452e', content: '#ffffff', border: '#9c3322', bgHover: '#d2513a', bgActive: '#9c3322' },
        neutral: { bg: '#e7e4db', content: '#2b2a28', border: '#c9c4b8', bgHover: '#dbd7cb', bgActive: '#c9c4b8' },
        success: { bg: '#2f7d4f', content: '#ffffff', border: '#236340', bgHover: '#388c5a', bgActive: '#236340' },
        warning: { bg: '#e6b23f', content: '#3f2f0a', border: '#cc9926', bgHover: '#edbd55', bgActive: '#cc9926' },
        danger:  { bg: '#b3322a', content: '#ffffff', border: '#902720', bgHover: '#c43e35', bgActive: '#902720' },
        info:    { bg: '#2f6fb0', content: '#ffffff', border: '#23568a', bgHover: '#387dc0', bgActive: '#23568a' },
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
      sm: '0',
      md: '2px',
      lg: '4px',
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
      low: { boxShadow: 'inset -1px -1px 0 rgba(43, 42, 40, 0.16), 1px 1px 0 rgba(43, 42, 40, 0.10)' },
      medium: { boxShadow: 'inset -1px -1px 0 rgba(43, 42, 40, 0.20), 2px 2px 0 rgba(43, 42, 40, 0.12)' },
      high: { boxShadow: 'inset -2px -2px 0 rgba(43, 42, 40, 0.22), 4px 4px 0 rgba(43, 42, 40, 0.14)' },
      overlay: { boxShadow: 'inset -2px -2px 0 rgba(43, 42, 40, 0.24), 8px 8px 0 rgba(43, 42, 40, 0.16)' },
    },
    typography: {
      family: {
        ui: '"Zen Kaku Gothic New", "Hiragino Kaku Gothic ProN", "Inter", system-ui, sans-serif',
        display: '"Zen Kaku Gothic New", "Hiragino Kaku Gothic ProN", "Inter", system-ui, sans-serif',
        mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Zen Kaku Gothic New", "Inter", system-ui, sans-serif',
        hand: '"Zen Kaku Gothic New", "Inter", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 700, lineHeight: '1.1',  tracking: '-0.01em' },
        title:      { family: 'display', size: '1.875rem', weight: 700, lineHeight: '1.2',  tracking: '0' },
        heading:    { family: 'display', size: '1.25rem',  weight: 500, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 500, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 500, lineHeight: '1.4',  tracking: '0.02em' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.45', tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '130ms',
        base: '220ms',
        slow: '340ms',
      },
      easing: {
        standard: 'cubic-bezier(0.3, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.5, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#c2452e', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'rgba(43, 42, 40, 0.16)',
      paperEdgeWidth: '1px',
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
