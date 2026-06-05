import type { Palette } from '../tokens/semantic.contract'

/**
 * Gruvbox (Glass·CRT) — the Gruvbox identity on a Cel + Glass + CRT hybrid.
 * A warm white field with an ink-outline halo (3px `#3c3836` outline, hard
 * offset block shadows via `elevation.*`), translucent frosted panels
 * (orange-tinted rgba surfaces lifted by `effect.backdropBlur.*`), a scanline
 * overlay (`effect.overlay.image` repeating-linear-gradient), and an accent
 * glow that lives ONLY on elements / boxes — the warm orange halo rides inside
 * the `elevation.*` box-shadows, never on text. `effect.glow` stays inert
 * (`radius: 0`, `color: transparent`, `intensity: 0`) so no text glow leaks in.
 */
export const palette: Palette = {
  id: 'cel-shaded-gruvbox-crt',
  name: 'Gruvbox (Glass·CRT)',
  engine: 'cel-shaded',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#ffffff',
        raised: 'rgba(254, 128, 25, 0.07)',
        sunken: 'rgba(60, 56, 54, 0.05)',
        overlay: 'rgba(255, 252, 245, 0.76)',
        scrim: 'rgba(60, 56, 54, 0.30)',
      },
      content: {
        primary: '#3c3836',
        secondary: '#504945',
        muted: '#7c6f64',
        inverse: '#ffffff',
        link: '#af3a03',
      },
      border: {
        subtle: '#3c3836',
        default: '#3c3836',
        strong: '#3c3836',
        focus: '#fe8019',
      },
      intent: {
        primary: { bg: '#d65d0e', content: '#fff4ea', border: '#3c3836', bgHover: '#c4550d', bgActive: '#a8480b' },
        neutral: { bg: '#f0e6cf', content: '#3c3836', border: '#3c3836', bgHover: '#e6d9bb', bgActive: '#d6c69e' },
        success: { bg: '#79740e', content: '#fbf9e8', border: '#3c3836', bgHover: '#6f6b0d', bgActive: '#5e5b0b' },
        warning: { bg: '#d79921', content: '#241a04', border: '#3c3836', bgHover: '#c68c1e', bgActive: '#ad7a1a' },
        danger:  { bg: '#cc241d', content: '#fbeae8', border: '#3c3836', bgHover: '#bb211b', bgActive: '#a31d17' },
        info:    { bg: '#427b58', content: '#eaf3ed', border: '#3c3836', bgHover: '#3c7150', bgActive: '#346145' },
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
      lg: '12px',
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
      low: { boxShadow: '3px 3px 0 #3c3836, 0 0 10px rgba(254, 128, 25, 0.50), 0 2px 8px rgba(60, 56, 54, 0.12)' },
      medium: { boxShadow: '5px 5px 0 #3c3836, 0 0 16px rgba(254, 128, 25, 0.50), 0 8px 20px rgba(60, 56, 54, 0.12)' },
      high: { boxShadow: '7px 7px 0 #3c3836, 0 0 24px rgba(254, 128, 25, 0.50), 0 16px 32px rgba(60, 56, 54, 0.12)' },
      overlay: { boxShadow: '8px 8px 0 #3c3836, 0 0 32px rgba(254, 128, 25, 0.50), 0 24px 48px rgba(60, 56, 54, 0.12)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Helvetica Neue", system-ui, -apple-system, "Segoe UI", sans-serif',
        display: '"JetBrains Mono", "Fira Code", "Hack", "IBM Plex Mono", ui-monospace, monospace',
        mono: '"JetBrains Mono", "Fira Code", "Hack", "IBM Plex Mono", ui-monospace, monospace',
        pixel: '"Inter", "Helvetica Neue", system-ui, -apple-system, "Segoe UI", sans-serif',
        hand: '"Inter", "Helvetica Neue", system-ui, -apple-system, "Segoe UI", sans-serif',
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
      focusRing: { width: '3px', offset: '2px', color: '#fe8019', style: 'solid' },
      overlay: { image: 'repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0.05) 2px, rgba(0, 0, 0, 0.05) 3px)', size: 'auto', blend: 'multiply' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: '#3c3836', width: '3px' },
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
