import type { Palette } from '../tokens/semantic.contract'

/**
 * Art Nouveau (Cel·Glass) — an art-nouveau identity on a Cel+Glass hybrid:
 * a light parchment field, an ink-outline halo (3px plum-ink stroke + hard
 * offset block shadow), translucent frosted panels (backdrop blur over rgba
 * surfaces), and a soft drop shadow layered under the hard cel shadow. Olive
 * and gilt intents with a plum link carry the Mucha / stained-glass register;
 * serif display (Cormorant Garamond) and softer, rounder radii than the
 * academia cut. No CRT, no text glow.
 */
export const palette: Palette = {
  id: 'cel-shaded-nouveau-glass',
  name: 'Art Nouveau (Cel·Glass)',
  engine: 'cel-shaded',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#efe9d9',
        raised: 'rgba(111, 125, 78, 0.07)',
        sunken: 'rgba(58, 46, 58, 0.05)',
        overlay: 'rgba(247, 242, 230, 0.80)',
        scrim: 'rgba(58, 46, 58, 0.30)',
      },
      content: {
        primary: '#3a2e3a',
        secondary: '#6a5560',
        muted: '#978878',
        inverse: '#f7f2e6',
        link: '#7d3c5a',
      },
      border: {
        subtle: '#3a2e3a',
        default: '#3a2e3a',
        strong: '#3a2e3a',
        focus: '#9c7b3a',
      },
      intent: {
        primary: { bg: '#6f7d4e', content: '#f4f6ea', border: '#3a2e3a', bgHover: '#667348', bgActive: '#5d6941' },
        neutral: { bg: '#e2dac4', content: '#3a2e3a', border: '#3a2e3a', bgHover: '#d0c8b3', bgActive: '#beb6a2' },
        success: { bg: '#4f7048', content: '#eef3ec', border: '#3a2e3a', bgHover: '#496742', bgActive: '#425d3b' },
        warning: { bg: '#b08828', content: '#241a05', border: '#3a2e3a', bgHover: '#a27d25', bgActive: '#947221' },
        danger:  { bg: '#8c3a47', content: '#f6e7e9', border: '#3a2e3a', bgHover: '#813541', bgActive: '#76303b' },
        info:    { bg: '#5a5070', content: '#ebe8f1', border: '#3a2e3a', bgHover: '#534a67', bgActive: '#4c435e' },
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
      sm: '10px',
      md: '16px',
      lg: '26px',
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
      low: { boxShadow: '3px 3px 0 #3a2e3a, 0 2px 8px rgba(58, 46, 58, 0.12)' },
      medium: { boxShadow: '5px 5px 0 #3a2e3a, 0 8px 20px rgba(58, 46, 58, 0.12)' },
      high: { boxShadow: '7px 7px 0 #3a2e3a, 0 16px 32px rgba(58, 46, 58, 0.12)' },
      overlay: { boxShadow: '8px 8px 0 #3a2e3a, 0 24px 48px rgba(58, 46, 58, 0.12)' },
    },
    typography: {
      family: {
        ui: '"Cormorant Garamond", "EB Garamond", "Garamond", "Hoefler Text", Georgia, serif',
        display: '"Cormorant Garamond", "EB Garamond", "Garamond", "Hoefler Text", Georgia, serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Cormorant Garamond", "EB Garamond", "Garamond", "Hoefler Text", Georgia, serif',
        hand: '"Cormorant Garamond", "EB Garamond", "Garamond", "Hoefler Text", Georgia, serif',
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
      focusRing: { width: '3px', offset: '2px', color: '#9c7b3a', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: '#3a2e3a', width: '3px' },
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
