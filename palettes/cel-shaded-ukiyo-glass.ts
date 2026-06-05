import type { Palette } from '../tokens/semantic.contract'

/**
 * Ukiyo-e (Cel·Glass) — the Japanese woodblock register on a Cel+Glass
 * hybrid. The cel-shaded engine still rules the chrome (a 3px ink outline
 * halo at `effect.outline.color` plus a hard offset block shadow via
 * `elevation.*`), but the panels are now translucent frosted glass:
 * `surface.raised` is a faint indigo wash and `effect.backdropBlur.*` frosts
 * what sits behind. The paper field stays light and warm (`#f2ebd9`),
 * Hokusai-indigo carries the link and primary, and a vermilion seal accent
 * lights the focus ring. No CRT layer (no scanlines, no colored glow) and no
 * text glow — `effect.glow` stays fully transparent.
 */
export const palette: Palette = {
  id: 'cel-shaded-ukiyo-glass',
  name: 'Ukiyo-e (Cel·Glass)',
  engine: 'cel-shaded',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f2ebd9',
        raised: 'rgba(31, 78, 121, 0.07)',
        sunken: 'rgba(31, 35, 41, 0.05)',
        overlay: 'rgba(249, 243, 227, 0.80)',
        scrim: 'rgba(31, 35, 41, 0.30)',
      },
      content: {
        primary: '#1f2329',
        secondary: '#3a4450',
        muted: '#6f6a5a',
        inverse: '#f9f3e3',
        link: '#1f4e79',
      },
      border: {
        subtle: '#1f2329',
        default: '#1f2329',
        strong: '#1f2329',
        focus: '#c8443a',
      },
      intent: {
        primary: { bg: '#1f4e79', content: '#eef3f8', border: '#1f2329', bgHover: '#1c4870', bgActive: '#194161' },
        neutral: { bg: '#e6dcc2', content: '#1f2329', border: '#1f2329', bgHover: '#d4cab2', bgActive: '#c1b89e' },
        success: { bg: '#4a7340', content: '#eef3ec', border: '#1f2329', bgHover: '#446a3b', bgActive: '#3e6035' },
        warning: { bg: '#e0a92e', content: '#241a04', border: '#1f2329', bgHover: '#cd9a2a', bgActive: '#bc8d26' },
        danger:  { bg: '#c8443a', content: '#fbece9', border: '#1f2329', bgHover: '#b83e35', bgActive: '#a83930' },
        info:    { bg: '#3a6b8a', content: '#ecf2f5', border: '#1f2329', bgHover: '#35627e', bgActive: '#315872' },
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
      low: { boxShadow: '3px 3px 0 #1f2329, 0 2px 8px rgba(31, 35, 41, 0.12)' },
      medium: { boxShadow: '5px 5px 0 #1f2329, 0 8px 20px rgba(31, 35, 41, 0.12)' },
      high: { boxShadow: '7px 7px 0 #1f2329, 0 16px 32px rgba(31, 35, 41, 0.12)' },
      overlay: { boxShadow: '8px 8px 0 #1f2329, 0 24px 48px rgba(31, 35, 41, 0.12)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Yu Gothic", "Hiragino Sans", "Helvetica Neue", system-ui, sans-serif',
        display: '"Shippori Mincho", "Yu Mincho", "Hiragino Mincho ProN", "Hoefler Text", Georgia, serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Yu Gothic", "Hiragino Sans", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Yu Gothic", "Hiragino Sans", "Helvetica Neue", system-ui, sans-serif',
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
      focusRing: { width: '3px', offset: '2px', color: '#c8443a', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: '#1f2329', width: '3px' },
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
