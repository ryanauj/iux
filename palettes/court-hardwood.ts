import type { Palette } from '../tokens/semantic.contract'

/**
 * Court Hardwood — the basketball-arcade register on the Flat engine.
 * A warm daytime arena: sanded-maple field, near-black painted court
 * lines, basketball-leather orange as the primary action, and an
 * arcade-neon violet accent (links, focus, info) — the purple-and-
 * orange clash of NBA Jam attract screens. The field carries a real
 * three-step wood gradient so panels lift off the floor instead of
 * floating on one flat tint.
 *
 *   maple field:     #f7efe0  (base) → #fffbf3 (raised) → #ece0cb (sunken)
 *   court-line ink:  #1a1a1a
 *   leather orange:  #e2591b  (primary action)
 *   arcade violet:   #7c3aed  (accent — links, focus, info)
 *   baseline green:  #2f9e44  (success)
 *   scoreboard red:  #e03131  (danger)
 *   ink (text):      #281a10  — warm near-black
 */
export const palette: Palette = {
  id: 'court-hardwood',
  name: 'Court Hardwood',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f7efe0',
        raised: '#fffbf3',
        sunken: '#ece0cb',
        overlay: '#fffbf3',
        scrim: 'rgba(40, 26, 14, 0.52)',
      },
      content: {
        primary: '#281a10',
        secondary: '#5c4836',
        muted: '#8c7763',
        inverse: '#fffbf3',
        link: '#6d28d9',
      },
      border: {
        subtle: '#ecdcc1',
        default: '#d2b384',
        strong: '#1a1a1a',
        focus: '#7c3aed',
      },
      // Two-colour identity: leather orange = primary action / the ball,
      // arcade violet = accent (links, focus, info). The rest spread
      // across a real scoreboard: wood-tan neutral, baseline green,
      // scoreboard amber, foul red.
      intent: {
        primary: { bg: '#e2591b', content: '#fffbf3', border: '#a83c0f', bgHover: '#c84a14', bgActive: '#a83c0f' },
        neutral: { bg: '#d2b384', content: '#281a10', border: '#b1905a', bgHover: '#c4a273', bgActive: '#b1905a' },
        success: { bg: '#2f9e44', content: '#fffbf3', border: '#237a33', bgHover: '#2a8c3c', bgActive: '#1c6629' },
        warning: { bg: '#f0a500', content: '#281a10', border: '#bd8200', bgHover: '#d49400', bgActive: '#9c6c00' },
        danger:  { bg: '#e03131', content: '#fffbf3', border: '#ad2424', bgHover: '#c52b2b', bgActive: '#8f1d1d' },
        info:    { bg: '#7c3aed', content: '#fffbf3', border: '#5f24c0', bgHover: '#6d28d9', bgActive: '#4c1d95' },
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
      lg: '14px',
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
      low: { boxShadow: '0 1px 2px rgba(40, 26, 14, 0.10)' },
      medium: { boxShadow: '0 4px 10px rgba(40, 26, 14, 0.14), 0 2px 4px rgba(40, 26, 14, 0.08)' },
      high: { boxShadow: '0 12px 22px rgba(40, 26, 14, 0.18), 0 4px 8px rgba(40, 26, 14, 0.10)' },
      overlay: { boxShadow: '0 24px 36px rgba(40, 26, 14, 0.22), 0 10px 14px rgba(40, 26, 14, 0.12)' },
    },
    typography: {
      family: {
        ui: '"Archivo", "Inter", "Helvetica Neue", system-ui, sans-serif',
        display: '"Archivo Black", "Archivo", "Helvetica Neue", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Archivo", "Inter", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Archivo", "Inter", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 800, lineHeight: '1.05', tracking: '-0.01em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '2rem',     weight: 800, lineHeight: '1.15', tracking: '0',       textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.375rem', weight: 700, lineHeight: '1.25', tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 700, lineHeight: '1.45', tracking: '0.02em' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 700, lineHeight: '1.4',  tracking: '0.08em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 500, lineHeight: '1.4',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '110ms',
        base: '190ms',
        slow: '300ms',
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
      focusRing: { width: '3px', offset: '2px', color: '#7c3aed', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
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
