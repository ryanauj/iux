import type { Palette } from '../tokens/semantic.contract'

/**
 * Whitewash Aegean — the Cycladic register on the Flat engine. Limewashed
 * plaster (a warm chalk-white, never pure `#fff`), deep Aegean navy ink,
 * and the two colours every Greek-island village actually paints: the
 * domed-church blue and the sun-baked terracotta of the rooftops. Olive
 * and gold round out the herb-garden palette.
 */
export const palette: Palette = {
  id: 'whitewash-aegean',
  name: 'Whitewash Aegean',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f4f1ea',
        raised: '#fbf9f3',
        sunken: '#e8e3d6',
        overlay: '#fdfcf7',
        scrim: 'rgba(29, 43, 58, 0.40)',
      },
      content: {
        primary: '#1d2b3a',
        secondary: '#41566b',
        muted: '#8593a0',
        inverse: '#fbf9f3',
        link: '#1565a0',
      },
      border: {
        subtle: '#e4ddcd',
        default: '#cbc2ad',
        strong: '#1d2b3a',
        focus: '#1565a0',
      },
      intent: {
        primary: { bg: '#1565a0', content: '#fbf9f3', border: '#0f4e7d', bgHover: '#1972b3', bgActive: '#0f4e7d' },
        neutral: { bg: '#e8e3d6', content: '#1d2b3a', border: '#cbc2ad', bgHover: '#dcd5c3', bgActive: '#cbc2ad' },
        success: { bg: '#43702f', content: '#fbf9f3', border: '#345824', bgHover: '#4d7f37', bgActive: '#345824' },
        warning: { bg: '#e3c66a', content: '#473806', border: '#cdac49', bgHover: '#d9b955', bgActive: '#cdac49' },
        danger:  { bg: '#b34733', content: '#fbf9f3', border: '#8f3827', bgHover: '#c2543f', bgActive: '#8f3827' },
        info:    { bg: '#2d7fb0', content: '#fbf9f3', border: '#22638a', bgHover: '#358cbe', bgActive: '#22638a' },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '24px',
      '6': '36px',
      '7': '52px',
      '8': '72px',
    },
    radius: {
      none: '0',
      sm: '4px',
      md: '10px',
      lg: '18px',
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
      low: { boxShadow: '0 1px 2px rgba(29, 43, 58, 0.08)' },
      medium: { boxShadow: '0 6px 16px rgba(29, 43, 58, 0.10), 0 2px 4px rgba(29, 43, 58, 0.06)' },
      high: { boxShadow: '0 16px 32px rgba(29, 43, 58, 0.13), 0 6px 10px rgba(29, 43, 58, 0.07)' },
      overlay: { boxShadow: '0 28px 52px rgba(29, 43, 58, 0.20), 0 10px 16px rgba(29, 43, 58, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Mukta", "Frank Ruhl", "Inter", "Helvetica Neue", system-ui, sans-serif',
        display: '"Cormorant Garamond", "GFS Didot", "Playfair Display", Georgia, serif',
        mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Mukta", "Inter", system-ui, sans-serif',
        hand: '"Mukta", "Inter", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3.25rem',  weight: 600, lineHeight: '1.08', tracking: '0' },
        title:      { family: 'display', size: '2.25rem',  weight: 600, lineHeight: '1.18', tracking: '0' },
        heading:    { family: 'display', size: '1.5rem',   weight: 600, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.45', tracking: '0.01em' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.65', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4',  tracking: '0.06em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.45', tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '150ms',
        base: '260ms',
        slow: '420ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#1565a0', style: 'solid' },
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
