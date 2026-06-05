import type { Palette } from '../tokens/semantic.contract'

/**
 * Sugar Paper Chalk — the soft-pastel-chalk register on the Sketch engine.
 * "Sugar paper" is the dusty blue-grey craft stock of a primary-school art
 * room; chalk pastel sits on it in powdery, never-quite-solid colour. This
 * palette pairs that field with the engine's hand-drawn wobble + marker
 * font, so every edge reads as drawn in soft pastel — the classroom-wall
 * cousin of the ink-blue notebook Sketch (Marker).
 *
 * Ships `experimental` like the Sketch family — the powdery pastel fills
 * and hand font are tuned for the chalk look, not for AA body text.
 */
export const palette: Palette = {
  id: 'sugar-paper-chalk',
  name: 'Sugar Paper Chalk',
  engine: 'sketch',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#dfe5ea',
        raised: '#eef2f5',
        sunken: '#d0d8df',
        overlay: '#f3f6f8',
        scrim: 'rgba(40, 52, 66, 0.52)',
      },
      content: {
        primary: '#2a3540',
        secondary: '#4a5868',
        muted: '#7e8a96',
        inverse: '#f3f6f8',
        link: '#b0496a',
      },
      border: {
        subtle: '#c6cfd7',
        default: '#2a3540',
        strong: '#16202a',
        focus: '#b0496a',
      },
      intent: {
        primary: { bg: '#3f6f8f', content: '#f3f6f8', border: '#2c5570', bgHover: '#4a7e9f', bgActive: '#2c5570' },
        neutral: { bg: '#d6dde3', content: '#2a3540', border: '#2a3540', bgHover: '#c8d1d8', bgActive: '#b3bec7' },
        success: { bg: '#5a8a5e', content: '#f3f6f8', border: '#436b46', bgHover: '#699a6d', bgActive: '#436b46' },
        warning: { bg: '#d8a64e', content: '#3a2c0c', border: '#b6863a', bgHover: '#e2b362', bgActive: '#b6863a' },
        danger:  { bg: '#b0496a', content: '#f3f6f8', border: '#8c3852', bgHover: '#c0567a', bgActive: '#8c3852' },
        info:    { bg: '#5a7d9e', content: '#f3f6f8', border: '#446281', bgHover: '#688cad', bgActive: '#446281' },
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
      lg: '16px',
      pill: '999px',
      full: '9999px',
    },
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '2px',
      thick: '3px',
      heavy: '4px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '1px 2px 0 rgba(40, 52, 66, 0.30)' },
      medium: { boxShadow: '2px 3px 0 rgba(40, 52, 66, 0.34), 0 4px 8px rgba(40, 52, 66, 0.10)' },
      high: { boxShadow: '3px 4px 0 rgba(40, 52, 66, 0.38), 0 10px 18px rgba(40, 52, 66, 0.12)' },
      overlay: { boxShadow: '3px 5px 0 rgba(40, 52, 66, 0.44), 0 18px 28px rgba(40, 52, 66, 0.18)' },
    },
    typography: {
      family: {
        ui: '"Patrick Hand", "Bradley Hand", "Comic Sans MS", cursive',
        display: '"Gloria Hallelujah", "Caveat", "Marker Felt", cursive',
        mono: '"Patrick Hand", "Bradley Hand", "Comic Sans MS", cursive',
        pixel: '"Patrick Hand", "Bradley Hand", "Comic Sans MS", cursive',
        hand: '"Patrick Hand", "Bradley Hand", "Comic Sans MS", cursive',
      },
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 400, lineHeight: '1.1',  tracking: '0' },
        title:      { family: 'display', size: '2.125rem',weight: 400, lineHeight: '1.15', tracking: '0' },
        heading:    { family: 'hand',    size: '1.5rem',   weight: 400, lineHeight: '1.25',tracking: '0' },
        subheading: { family: 'hand',    size: '1.25rem',  weight: 400, lineHeight: '1.3', tracking: '0' },
        body:       { family: 'hand',    size: '1.15rem',  weight: 400, lineHeight: '1.5', tracking: '0' },
        label:      { family: 'hand',    size: '1rem',     weight: 400, lineHeight: '1.4', tracking: '0.01em' },
        caption:    { family: 'hand',    size: '0.95rem',  weight: 400, lineHeight: '1.4', tracking: '0.01em' },
        code:       { family: 'hand',    size: '1rem',     weight: 400, lineHeight: '1.5', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '240ms',
        slow: '380ms',
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
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '3px', offset: '3px', color: '#b0496a', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '1.6px',
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
