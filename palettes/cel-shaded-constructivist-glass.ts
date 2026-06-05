import type { Palette } from '../tokens/semantic.contract'

/**
 * Constructivist (Cel·Glass) — the Soviet agitprop-poster register on a
 * Cel+Glass hybrid. The cel-shaded engine drives the chrome (a 3px ink
 * outline halo at `effect.outline.color` plus a hard offset block shadow via
 * `elevation.*`), but panels are now translucent frosted glass:
 * `surface.raised` is a faint red wash and `effect.backdropBlur.*` frosts
 * the field behind. The paper stays light (`#f0e9da`), Rodchenko red carries
 * the link, primary, and focus ring, and the radius drops near-rectilinear.
 * Poster type is loud condensed sans, uppercased on the display/title/heading
 * roles. No CRT layer (no scanlines, no colored glow) and no text glow —
 * `effect.glow` stays fully transparent.
 */
export const palette: Palette = {
  id: 'cel-shaded-constructivist-glass',
  name: 'Constructivist (Cel·Glass)',
  engine: 'cel-shaded',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f0e9da',
        raised: 'rgba(193, 39, 45, 0.06)',
        sunken: 'rgba(22, 20, 18, 0.05)',
        overlay: 'rgba(250, 246, 236, 0.80)',
        scrim: 'rgba(22, 20, 18, 0.30)',
      },
      content: {
        primary: '#161412',
        secondary: '#3a3530',
        muted: '#6f685c',
        inverse: '#faf6ec',
        link: '#c1272d',
      },
      border: {
        subtle: '#161412',
        default: '#161412',
        strong: '#161412',
        focus: '#c1272d',
      },
      intent: {
        primary: { bg: '#c1272d', content: '#fbf3ec', border: '#161412', bgHover: '#b22429', bgActive: '#a32125' },
        neutral: { bg: '#e0d7c2', content: '#161412', border: '#161412', bgHover: '#cfc6b2', bgActive: '#bdb49f' },
        success: { bg: '#2f6b34', content: '#eaf3ea', border: '#161412', bgHover: '#2b6230', bgActive: '#27592b' },
        warning: { bg: '#e3a01e', content: '#231603', border: '#161412', bgHover: '#d0931c', bgActive: '#be8719' },
        danger:  { bg: '#9c1c1c', content: '#f6e4e4', border: '#161412', bgHover: '#8f1a1a', bgActive: '#831818' },
        info:    { bg: '#34495e', content: '#e7edf3', border: '#161412', bgHover: '#2f4356', bgActive: '#2b3c4d' },
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
      sm: '2px',
      md: '4px',
      lg: '6px',
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
      low: { boxShadow: '3px 3px 0 #161412, 0 2px 8px rgba(22, 20, 18, 0.12)' },
      medium: { boxShadow: '5px 5px 0 #161412, 0 8px 20px rgba(22, 20, 18, 0.12)' },
      high: { boxShadow: '7px 7px 0 #161412, 0 16px 32px rgba(22, 20, 18, 0.12)' },
      overlay: { boxShadow: '8px 8px 0 #161412, 0 24px 48px rgba(22, 20, 18, 0.12)' },
    },
    typography: {
      family: {
        ui: '"Oswald", "Anton", "Archivo Narrow", "Helvetica Neue", Impact, system-ui, sans-serif',
        display: '"Anton", "Oswald", "Archivo Black", "Helvetica Neue", Impact, system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Oswald", "Anton", "Archivo Narrow", "Helvetica Neue", Impact, system-ui, sans-serif',
        hand: '"Oswald", "Anton", "Archivo Narrow", "Helvetica Neue", Impact, system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',    weight: 700, lineHeight: '1.0',  tracking: '0.01em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '2.25rem', weight: 700, lineHeight: '1.05', tracking: '0.01em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.5rem',  weight: 700, lineHeight: '1.2',  tracking: '0.01em', textTransform: 'uppercase' },
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
      focusRing: { width: '3px', offset: '2px', color: '#c1272d', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: '#161412', width: '3px' },
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
