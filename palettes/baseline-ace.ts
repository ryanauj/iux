import type { Palette } from '../tokens/semantic.contract'

/**
 * Baseline Ace — the tennis-sim register on the Flat engine. A bright
 * hard-court read: pale blue-green court field, white sideline borders,
 * court-teal as the primary action, and a signature tennis-ball lime
 * carried in the focus ring and links. Anchored on the clean,
 * sun-bleached HUD of tennis games (Top Spin, Mario Tennis, Virtua
 * Tennis) — calm court colours with one electric lime accent for the
 * ball.
 *
 *   hard-court field: #eaf2f0
 *   raised panel:     #fbfefe
 *   sideline:         #b2cdc8
 *   court teal:       #0f7d6a  (primary action)
 *   tennis-ball lime: #a3d11f  (focus / link accent)
 *   fault red:        #cf3a3a  (danger)
 *   sky info:         #2a8fb8  (info)
 *   ink (text):       #16302b  — deep court green-black
 */
export const palette: Palette = {
  id: 'baseline-ace',
  name: 'Baseline Ace',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#eaf2f0',
        raised: '#fbfefe',
        sunken: '#d6e4e3',
        overlay: '#fbfefe',
        scrim: 'rgba(22, 48, 43, 0.50)',
      },
      content: {
        primary: '#16302b',
        secondary: '#3c5751',
        muted: '#6e8983',
        inverse: '#fbfefe',
        link: '#0e7c66',
      },
      border: {
        subtle: '#d8e6e3',
        default: '#b2cdc8',
        strong: '#123a32',
        focus: '#82a814',
      },
      // Intents map to the court: court-teal = primary action, court-grey
      // = neutral, ball-lime green = success, line-call amber = warning,
      // fault red = danger, sky = info. The lime success is the ball:
      // bright, unmistakable, the one electric colour on a calm court.
      intent: {
        primary: { bg: '#0f7d6a', content: '#fbfefe', border: '#0a5c4e', bgHover: '#0c6759', bgActive: '#094a3f' },
        neutral: { bg: '#c8dad7', content: '#16302b', border: '#a3c0bb', bgHover: '#b6cdc9', bgActive: '#a3c0bb' },
        success: { bg: '#82a814', content: '#16240a', border: '#62800e', bgHover: '#719311', bgActive: '#566f0c' },
        warning: { bg: '#d99100', content: '#2a1f00', border: '#a86f00', bgHover: '#bd7e00', bgActive: '#8a5b00' },
        danger:  { bg: '#cf3a3a', content: '#fbfefe', border: '#9e2b2b', bgHover: '#b03131', bgActive: '#852323' },
        info:    { bg: '#2a8fb8', content: '#fbfefe', border: '#1f6d8e', bgHover: '#247b9e', bgActive: '#19566f' },
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
      md: '10px',
      lg: '16px',
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
      low: { boxShadow: '0 1px 2px rgba(22, 48, 43, 0.10)' },
      medium: { boxShadow: '0 4px 10px rgba(22, 48, 43, 0.13), 0 2px 4px rgba(22, 48, 43, 0.07)' },
      high: { boxShadow: '0 12px 22px rgba(22, 48, 43, 0.16), 0 4px 8px rgba(22, 48, 43, 0.09)' },
      overlay: { boxShadow: '0 24px 36px rgba(22, 48, 43, 0.20), 0 10px 14px rgba(22, 48, 43, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Rajdhani", "Inter", "Helvetica Neue", system-ui, sans-serif',
        display: '"Rajdhani", "Inter", "Helvetica Neue", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Rajdhani", "Inter", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Rajdhani", "Inter", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 700, lineHeight: '1.08', tracking: '0.01em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '2rem',     weight: 700, lineHeight: '1.18', tracking: '0.01em' },
        heading:    { family: 'display', size: '1.375rem', weight: 600, lineHeight: '1.25', tracking: '0.01em' },
        subheading: { family: 'ui',      size: '1.0625rem',weight: 600, lineHeight: '1.45', tracking: '0.03em' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 500, lineHeight: '1.6',  tracking: '0.01em' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4',  tracking: '0.08em', textTransform: 'uppercase' },
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
        spring: 'cubic-bezier(0.34, 1.5, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '3px', offset: '2px', color: '#82a814', style: 'solid' },
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
