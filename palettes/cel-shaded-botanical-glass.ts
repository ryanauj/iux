import type { Palette } from '../tokens/semantic.contract'

/**
 * Botanical (Cel·Glass) — the pressed-herbarium / vintage-field-guide
 * register on a Cel+Glass hybrid. The cel-shaded engine drives the chrome
 * (a 3px ink outline halo at `effect.outline.color` plus a hard offset block
 * shadow via `elevation.*`), but panels are now translucent frosted glass:
 * `surface.raised` is a faint leaf-green wash and `effect.backdropBlur.*`
 * frosts the field behind. The paper field stays light and warm (`#f0ead7`),
 * a botanical-leaf green carries the link, primary, and focus ring, and a
 * humanist book serif sets every role. No CRT layer (no scanlines, no
 * colored glow) and no text glow — `effect.glow` stays fully transparent.
 */
export const palette: Palette = {
  id: 'cel-shaded-botanical-glass',
  name: 'Botanical (Cel·Glass)',
  engine: 'cel-shaded',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f0ead7',
        raised: 'rgba(74, 107, 58, 0.07)',
        sunken: 'rgba(47, 42, 29, 0.05)',
        overlay: 'rgba(248, 243, 228, 0.80)',
        scrim: 'rgba(47, 42, 29, 0.30)',
      },
      content: {
        primary: '#2f2a1d',
        secondary: '#4f4732',
        muted: '#8c8159',
        inverse: '#f8f3e4',
        link: '#4a6b3a',
      },
      border: {
        subtle: '#2f2a1d',
        default: '#2f2a1d',
        strong: '#2f2a1d',
        focus: '#4a6b3a',
      },
      intent: {
        primary: { bg: '#4a6b3a', content: '#eff3e9', border: '#2f2a1d', bgHover: '#446235', bgActive: '#3e5930' },
        neutral: { bg: '#e3d9bf', content: '#2f2a1d', border: '#2f2a1d', bgHover: '#d2c8af', bgActive: '#c0b79e' },
        success: { bg: '#5f7a32', content: '#eef2e6', border: '#2f2a1d', bgHover: '#56702e', bgActive: '#4e652a' },
        warning: { bg: '#c89328', content: '#241803', border: '#2f2a1d', bgHover: '#b88725', bgActive: '#a87b22' },
        danger:  { bg: '#8a3324', content: '#f6e6e2', border: '#2f2a1d', bgHover: '#7e2f21', bgActive: '#732b1e' },
        info:    { bg: '#3f5d6b', content: '#e8eef1', border: '#2f2a1d', bgHover: '#395562', bgActive: '#344d59' },
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
      thin: '2px',
      thick: '3px',
      heavy: '4px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '3px 3px 0 #2f2a1d, 0 2px 8px rgba(47, 42, 29, 0.12)' },
      medium: { boxShadow: '5px 5px 0 #2f2a1d, 0 8px 20px rgba(47, 42, 29, 0.12)' },
      high: { boxShadow: '7px 7px 0 #2f2a1d, 0 16px 32px rgba(47, 42, 29, 0.12)' },
      overlay: { boxShadow: '8px 8px 0 #2f2a1d, 0 24px 48px rgba(47, 42, 29, 0.12)' },
    },
    typography: {
      family: {
        ui: '"Spectral", "EB Garamond", "PT Serif", "Hoefler Text", Georgia, serif',
        display: '"Spectral", "EB Garamond", "PT Serif", "Hoefler Text", Georgia, serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Spectral", "EB Garamond", "PT Serif", "Hoefler Text", Georgia, serif',
        hand: '"Spectral", "EB Garamond", "PT Serif", "Hoefler Text", Georgia, serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',    weight: 700, lineHeight: '1.0',  tracking: '0.01em' },
        title:      { family: 'display', size: '2.25rem', weight: 700, lineHeight: '1.05', tracking: '0.01em' },
        heading:    { family: 'display', size: '1.5rem',  weight: 700, lineHeight: '1.2',  tracking: '0.01em' },
        subheading: { family: 'ui',      size: '1.125rem',weight: 600, lineHeight: '1.3',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 600, lineHeight: '1.3',  tracking: '0.04em' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 500, lineHeight: '1.4',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 500, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '90ms',
        base: '160ms',
        slow: '260ms',
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
      backdropBlur: { none: 'none', sm: 'blur(4px)', md: 'blur(10px)', lg: 'blur(20px)' },
      focusRing: { width: '3px', offset: '2px', color: '#4a6b3a', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: '#2f2a1d', width: '3px' },
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
