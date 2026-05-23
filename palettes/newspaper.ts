import type { Palette } from '../tokens/semantic.contract'

/**
 * Newspaper / Broadsheet — Editorial register on the flat engine, tuned
 * for classified-ad density. Serif body, narrow column rhythm, hard
 * column-rule overlays, newsprint cream-grey paper, ink-black body, a
 * single "stop-the-presses" red accent.
 */
export const palette: Palette = {
  id: 'newspaper',
  name: 'Newspaper / Broadsheet',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#e8e3d6',
        raised: '#f4eee0',
        sunken: '#dcd5c1',
        overlay: '#f4eee0',
        scrim: 'rgba(14, 13, 9, 0.6)',
      },
      content: {
        primary: '#0e0d09',
        secondary: '#3a352a',
        muted: '#6e6451',
        inverse: '#f4eee0',
        link: '#1c3e7a',
      },
      border: {
        subtle: 'rgba(14, 13, 9, 0.14)',
        default: 'rgba(14, 13, 9, 0.28)',
        strong: 'rgba(14, 13, 9, 0.62)',
        focus: '#a01818',
      },
      intent: {
        primary: { bg: '#a01818', content: '#f4eee0', border: '#7e1212', bgHover: '#7e1212', bgActive: '#5a0d0d' },
        neutral: { bg: '#dcd5c1', content: '#0e0d09', border: 'rgba(14, 13, 9, 0.28)', bgHover: '#cdc4ab', bgActive: '#b9af90' },
        success: { bg: '#2c4a1f', content: '#f4eee0', border: '#1f3614', bgHover: '#1f3614', bgActive: '#142309' },
        warning: { bg: '#8a5500', content: '#f4eee0', border: '#663f00', bgHover: '#663f00', bgActive: '#442a00' },
        danger:  { bg: '#7a1414', content: '#f4eee0', border: '#580d0d', bgHover: '#580d0d', bgActive: '#3a0707' },
        info:    { bg: '#1c3e7a', content: '#f4eee0', border: '#142d59', bgHover: '#142d59', bgActive: '#0c1d3a' },
      },
    },
    space: {
      '0': '0',
      '1': '3px',
      '2': '6px',
      '3': '10px',
      '4': '14px',
      '5': '20px',
      '6': '30px',
      '7': '44px',
      '8': '64px',
    },
    radius: {
      none: '0',
      sm: '0',
      md: '0',
      lg: '0',
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
      low: { boxShadow: 'none' },
      medium: { boxShadow: 'none' },
      high: { boxShadow: 'none' },
      overlay: { boxShadow: '0 0 0 1px rgba(14, 13, 9, 0.45)' },
    },
    typography: {
      family: {
        ui: 'Georgia, "Charter", "Times New Roman", "Liberation Serif", serif',
        display: '"Playfair Display", "Bodoni Moda", "Old Standard TT", "Times New Roman", serif',
        mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: 'Georgia, "Charter", "Times New Roman", "Liberation Serif", serif',
        hand: 'Georgia, "Charter", "Times New Roman", "Liberation Serif", serif',
      },
      role: {
        display:    { family: 'display', size: '4rem',     weight: 900, lineHeight: '1.0',  tracking: '-0.03em' },
        title:      { family: 'display', size: '2.75rem',  weight: 800, lineHeight: '1.05', tracking: '-0.02em' },
        heading:    { family: 'display', size: '1.5rem',   weight: 700, lineHeight: '1.2',  tracking: '-0.005em' },
        subheading: { family: 'ui',      size: '1rem',     weight: 700, lineHeight: '1.3',  tracking: '0.04em',  textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.4',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 700, lineHeight: '1.3',  tracking: '0.1em',   textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.3',  tracking: '0' },
        code:       { family: 'mono',    size: '0.8125rem',weight: 400, lineHeight: '1.4',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '120ms',
        base: '180ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#a01818', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
    },
  },
}
