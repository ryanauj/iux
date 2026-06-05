import type { Palette } from '../tokens/semantic.contract'

/**
 * Monokai (Glass·CRT) — a Cel+Glass+CRT hybrid on a white field. The cel-shaded
 * engine carries the ink-outline halo and hard offset block shadow; glassmorphism
 * adds translucent frosted panels (raised/overlay rgba surfaces + `backdropBlur.*`);
 * the CRT layer adds a scanline overlay (`effect.overlay.image`) and an accent glow
 * baked into `elevation.*` box-shadows — glow on elements/boxes only, NEVER on text
 * (`effect.glow` stays `{ radius: '0', color: 'transparent', intensity: 0 }`). The
 * Monokai register: hot-magenta accent against ink `#272822`, frosted panels tinted
 * with the signature pink, JetBrains Mono display. a11y is experimental — the
 * translucent surfaces and CRT scanline trade contrast certainty for atmosphere.
 */
export const palette: Palette = {
  id: 'cel-shaded-monokai-crt',
  name: 'Monokai (Glass·CRT)',
  engine: 'cel-shaded',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#ffffff',
        raised: 'rgba(249, 38, 114, 0.06)',
        sunken: 'rgba(39, 40, 34, 0.05)',
        overlay: 'rgba(255, 255, 255, 0.72)',
        scrim: 'rgba(39, 40, 34, 0.30)',
      },
      content: {
        primary: '#272822',
        secondary: '#49483e',
        muted: '#75715e',
        inverse: '#ffffff',
        link: '#c01a5b',
      },
      border: {
        subtle: '#272822',
        default: '#272822',
        strong: '#272822',
        focus: '#f92672',
      },
      intent: {
        primary: { bg: '#e11d6a', content: '#ffffff', border: '#272822', bgHover: '#cf1a61', bgActive: '#bc1857' },
        neutral: { bg: '#efe9e6', content: '#272822', border: '#272822', bgHover: '#dcd6d3', bgActive: '#c9c4c1' },
        success: { bg: '#6b8a17', content: '#f7fbe9', border: '#272822', bgHover: '#627f15', bgActive: '#597313' },
        warning: { bg: '#d9831a', content: '#2a1606', border: '#272822', bgHover: '#c87918', bgActive: '#b66e16' },
        danger:  { bg: '#d11a3f', content: '#fff0f3', border: '#272822', bgHover: '#c01839', bgActive: '#af1634' },
        info:    { bg: '#2bb6cf', content: '#062229', border: '#272822', bgHover: '#27a7be', bgActive: '#2498ad' },
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
      low: { boxShadow: '3px 3px 0 #272822, 0 0 10px rgba(249, 38, 114, 0.50), 0 2px 8px rgba(39, 40, 34, 0.12)' },
      medium: { boxShadow: '5px 5px 0 #272822, 0 0 16px rgba(249, 38, 114, 0.50), 0 8px 20px rgba(39, 40, 34, 0.12)' },
      high: { boxShadow: '7px 7px 0 #272822, 0 0 24px rgba(249, 38, 114, 0.50), 0 16px 32px rgba(39, 40, 34, 0.12)' },
      overlay: { boxShadow: '8px 8px 0 #272822, 0 0 32px rgba(249, 38, 114, 0.50), 0 24px 48px rgba(39, 40, 34, 0.12)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", system-ui, -apple-system, "Segoe UI", sans-serif',
        display: '"JetBrains Mono", "Fira Code", "Monaco", "Menlo", ui-monospace, monospace',
        mono: '"JetBrains Mono", "Fira Code", "Monaco", "Menlo", ui-monospace, monospace',
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
      focusRing: { width: '3px', offset: '2px', color: '#f92672', style: 'solid' },
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
      outline: { color: '#272822', width: '3px' },
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
