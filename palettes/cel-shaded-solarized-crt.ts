import type { Palette } from '../tokens/semantic.contract'

/**
 * Solarized (Glass·CRT) — a Cel+Glass+CRT hybrid on a warm off-white field. The
 * cel-shaded engine carries the ink-outline halo and hard offset block shadow;
 * glassmorphism adds translucent frosted panels (raised/overlay rgba surfaces +
 * `backdropBlur.*`); the CRT layer adds a scanline overlay (`effect.overlay.image`)
 * and an accent glow baked into `elevation.*` box-shadows — glow on elements/boxes
 * only, NEVER on text (`effect.glow` stays `{ radius: '0', color: 'transparent',
 * intensity: 0 }`). The Solarized register: calm sky-blue accent against deep-teal
 * ink `#073642`, frosted panels tinted sky-blue, JetBrains Mono display. a11y is
 * experimental — translucent surfaces and the CRT scanline trade contrast certainty
 * for atmosphere.
 */
export const palette: Palette = {
  id: 'cel-shaded-solarized-crt',
  name: 'Solarized (Glass·CRT)',
  engine: 'cel-shaded',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#fdfbf2',
        raised: 'rgba(38, 139, 210, 0.07)',
        sunken: 'rgba(7, 54, 66, 0.05)',
        overlay: 'rgba(255, 253, 245, 0.78)',
        scrim: 'rgba(7, 54, 66, 0.28)',
      },
      content: {
        primary: '#073642',
        secondary: '#586e75',
        muted: '#93a1a1',
        inverse: '#ffffff',
        link: '#268bd2',
      },
      border: {
        subtle: '#073642',
        default: '#073642',
        strong: '#073642',
        focus: '#268bd2',
      },
      intent: {
        primary: { bg: '#268bd2', content: '#f4fbff', border: '#073642', bgHover: '#2380c1', bgActive: '#2074b0' },
        neutral: { bg: '#ece6d3', content: '#073642', border: '#073642', bgHover: '#d9d4c2', bgActive: '#c6c2b1' },
        success: { bg: '#859900', content: '#11160a', border: '#073642', bgHover: '#7a8d00', bgActive: '#6f8000' },
        warning: { bg: '#b58900', content: '#1c1400', border: '#073642', bgHover: '#a67e00', bgActive: '#977300' },
        danger:  { bg: '#dc322f', content: '#fff1f0', border: '#073642', bgHover: '#ca2e2b', bgActive: '#b92927' },
        info:    { bg: '#2aa198', content: '#04201d', border: '#073642', bgHover: '#26948c', bgActive: '#23877f' },
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
      low: { boxShadow: '3px 3px 0 #073642, 0 0 10px rgba(38, 139, 210, 0.50), 0 2px 8px rgba(7, 54, 66, 0.12)' },
      medium: { boxShadow: '5px 5px 0 #073642, 0 0 16px rgba(38, 139, 210, 0.50), 0 8px 20px rgba(7, 54, 66, 0.12)' },
      high: { boxShadow: '7px 7px 0 #073642, 0 0 24px rgba(38, 139, 210, 0.50), 0 16px 32px rgba(7, 54, 66, 0.12)' },
      overlay: { boxShadow: '8px 8px 0 #073642, 0 0 32px rgba(38, 139, 210, 0.50), 0 24px 48px rgba(7, 54, 66, 0.12)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", system-ui, -apple-system, "Segoe UI", sans-serif',
        display: '"JetBrains Mono", "Fira Code", "IBM Plex Mono", ui-monospace, monospace',
        mono: '"JetBrains Mono", "Fira Code", "IBM Plex Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", system-ui, -apple-system, "Segoe UI", sans-serif',
        hand: '"Inter", "Söhne", system-ui, -apple-system, "Segoe UI", sans-serif',
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
      focusRing: { width: '3px', offset: '2px', color: '#268bd2', style: 'solid' },
      overlay: {
        image: 'repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0.05) 2px, rgba(0, 0, 0, 0.05) 3px)',
        size: 'auto',
        blend: 'multiply',
      },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: '#073642', width: '3px' },
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
