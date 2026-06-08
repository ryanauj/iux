import type { Palette } from '../tokens/semantic.contract'

/**
 * Pitch Grass — the football-sim register on the Flat engine. A cool
 * stadium-light field with a faint grass tint, grass-green as the
 * primary action, and a vivid broadcast-cyan accent (links, focus) that
 * pulls the palette away from a single-hue green wash. The referee's
 * cards stay wired into the alerts: caution-yellow warning, sending-off
 * red danger.
 *
 *   stadium light:   #f1f5ee  (base) → #fbfdf9 (raised) → #e2eadb (sunken)
 *   grass green:     #2f9e44  (primary action)
 *   broadcast cyan:  #0891b2  (accent — links, focus, info)
 *   caution yellow:  #f5b800  (warning — yellow card)
 *   sending-off red: #e03131  (danger — red card)
 *   ink (text):      #14271a  — deep forest, not pure black
 */
export const palette: Palette = {
  id: 'pitch-grass',
  name: 'Pitch Grass',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f1f5ee',
        raised: '#fbfdf9',
        sunken: '#e2eadb',
        overlay: '#fbfdf9',
        scrim: 'rgba(19, 38, 26, 0.52)',
      },
      content: {
        primary: '#14271a',
        secondary: '#3b5340',
        muted: '#6d8371',
        inverse: '#fbfdf9',
        link: '#0e8aa8',
      },
      border: {
        subtle: '#dde8d3',
        default: '#b7cda7',
        strong: '#15401f',
        focus: '#0891b2',
      },
      // Two-colour identity: grass green = primary / the pitch,
      // broadcast cyan = accent (links, focus, info). The alerts keep
      // the laws of the game — caution-yellow warning, red-card danger.
      intent: {
        primary: { bg: '#2f9e44', content: '#fbfdf9', border: '#237a33', bgHover: '#2a8c3c', bgActive: '#1c6629' },
        neutral: { bg: '#cdd9c2', content: '#14271a', border: '#a7ba98', bgHover: '#bdcbb0', bgActive: '#a7ba98' },
        success: { bg: '#40c057', content: '#0c2114', border: '#2f9e44', bgHover: '#37ad4d', bgActive: '#2c8c3f' },
        warning: { bg: '#f5b800', content: '#2a2400', border: '#c29200', bgHover: '#d8a300', bgActive: '#9c7500' },
        danger:  { bg: '#e03131', content: '#fbfdf9', border: '#ad2424', bgHover: '#c52b2b', bgActive: '#8f1d1d' },
        info:    { bg: '#0891b2', content: '#fbfdf9', border: '#066a85', bgHover: '#077d9b', bgActive: '#05566d' },
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
      thin: '1px',
      thick: '2px',
      heavy: '3px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '0 1px 2px rgba(19, 38, 26, 0.10)' },
      medium: { boxShadow: '0 4px 10px rgba(19, 38, 26, 0.13), 0 2px 4px rgba(19, 38, 26, 0.07)' },
      high: { boxShadow: '0 12px 22px rgba(19, 38, 26, 0.17), 0 4px 8px rgba(19, 38, 26, 0.09)' },
      overlay: { boxShadow: '0 24px 36px rgba(19, 38, 26, 0.20), 0 10px 14px rgba(19, 38, 26, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Saira", "Inter", "Helvetica Neue", system-ui, sans-serif',
        display: '"Saira", "Inter", "Helvetica Neue", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Saira", "Inter", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Saira", "Inter", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.625rem', weight: 800, lineHeight: '1.08', tracking: '-0.01em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.875rem', weight: 700, lineHeight: '1.18', tracking: '0',       textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.375rem', weight: 700, lineHeight: '1.25', tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.45', tracking: '0.02em' },
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
      focusRing: { width: '3px', offset: '2px', color: '#0891b2', style: 'solid' },
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
