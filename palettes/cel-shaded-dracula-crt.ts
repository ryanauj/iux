import type { Palette } from '../tokens/semantic.contract'

/**
 * Dracula (Glass·CRT) — the Dracula identity on a Cel + Glass + CRT hybrid.
 * A white field with an ink-outline halo (3px `#282a36` outline, hard offset
 * block shadows via `elevation.*`), translucent frosted panels (purple-tinted
 * rgba surfaces lifted by `effect.backdropBlur.*`), a scanline overlay
 * (`effect.overlay.image` repeating-linear-gradient), and an accent glow that
 * lives ONLY on elements / boxes — the soft purple halo rides inside the
 * `elevation.*` box-shadows, never on text. `effect.glow` stays inert
 * (`radius: 0`, `color: transparent`, `intensity: 0`) so no text glow leaks in.
 */
export const palette: Palette = {
  id: 'cel-shaded-dracula-crt',
  name: 'Dracula (Glass·CRT)',
  engine: 'cel-shaded',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#ffffff',
        raised: 'rgba(189, 147, 249, 0.08)',
        sunken: 'rgba(40, 42, 54, 0.05)',
        overlay: 'rgba(255, 255, 255, 0.72)',
        scrim: 'rgba(40, 42, 54, 0.30)',
      },
      content: {
        primary: '#282a36',
        secondary: '#44475a',
        muted: '#6f7287',
        inverse: '#ffffff',
        link: '#7c3aed',
      },
      border: {
        subtle: '#282a36',
        default: '#282a36',
        strong: '#282a36',
        focus: '#bd93f9',
      },
      intent: {
        primary: { bg: '#8b5cf6', content: '#ffffff', border: '#282a36', bgHover: '#7c4ae0', bgActive: '#6d3dcc' },
        neutral: { bg: '#ece9f8', content: '#282a36', border: '#282a36', bgHover: '#dcd6f0', bgActive: '#c7bfe6' },
        success: { bg: '#2faa5e', content: '#ffffff', border: '#282a36', bgHover: '#299c56', bgActive: '#23874a' },
        warning: { bg: '#ffb86c', content: '#2a1a08', border: '#282a36', bgHover: '#f5a955', bgActive: '#e6964a' },
        danger:  { bg: '#ff5555', content: '#2a0c0c', border: '#282a36', bgHover: '#f04545', bgActive: '#d63b3b' },
        info:    { bg: '#36b5d6', content: '#06222a', border: '#282a36', bgHover: '#2ba6c6', bgActive: '#2592af' },
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
      low: { boxShadow: '3px 3px 0 #282a36, 0 0 10px rgba(189, 147, 249, 0.55), 0 2px 8px rgba(40, 42, 54, 0.12)' },
      medium: { boxShadow: '5px 5px 0 #282a36, 0 0 16px rgba(189, 147, 249, 0.55), 0 8px 20px rgba(40, 42, 54, 0.12)' },
      high: { boxShadow: '7px 7px 0 #282a36, 0 0 24px rgba(189, 147, 249, 0.55), 0 16px 32px rgba(40, 42, 54, 0.12)' },
      overlay: { boxShadow: '8px 8px 0 #282a36, 0 0 32px rgba(189, 147, 249, 0.55), 0 24px 48px rgba(40, 42, 54, 0.12)' },
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
      focusRing: { width: '3px', offset: '2px', color: '#bd93f9', style: 'solid' },
      overlay: { image: 'repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0.05) 2px, rgba(0, 0, 0, 0.05) 3px)', size: 'auto', blend: 'multiply' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: '#282a36', width: '3px' },
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
