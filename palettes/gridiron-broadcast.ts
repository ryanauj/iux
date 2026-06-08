import type { Palette } from '../tokens/semantic.contract'

/**
 * Gridiron Broadcast — the American-football-sim register on the Flat
 * engine. A network-broadcast read: cool stadium-white field, chalk
 * yard-line borders, stadium navy as the primary action, end-zone red
 * for danger, and a penalty-flag yellow warning. Anchored on the lower-
 * third score bug and play-call HUD of pro-football games and Sunday
 * broadcasts — condensed athletic type, hard edges, navy-and-red team
 * chrome on bright turf.
 *
 *   stadium white:   #eef2f6
 *   raised panel:    #fbfdff
 *   chalk line:      #bccbd9
 *   stadium navy:    #163a63  (primary action)
 *   penalty yellow:  #e0a400  (warning — flag)
 *   end-zone red:    #c62828  (danger)
 *   first-down blue: #2563c4  (info)
 *   ink (text):      #10243d  — navy near-black
 */
export const palette: Palette = {
  id: 'gridiron-broadcast',
  name: 'Gridiron Broadcast',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#eef2f6',
        raised: '#fbfdff',
        sunken: '#dce4ec',
        overlay: '#fbfdff',
        scrim: 'rgba(16, 36, 61, 0.52)',
      },
      content: {
        primary: '#10243d',
        secondary: '#3a4f66',
        muted: '#6c8096',
        inverse: '#fbfdff',
        link: '#b91c1c',
      },
      border: {
        subtle: '#dde6ee',
        default: '#bccbd9',
        strong: '#0c2742',
        focus: '#1d4ed8',
      },
      // Intents map to the broadcast: stadium navy = primary, steel =
      // neutral chrome, first-down green = success, penalty-flag yellow
      // = warning, end-zone red = danger, first-down line blue = info.
      intent: {
        primary: { bg: '#163a63', content: '#fbfdff', border: '#0f2a49', bgHover: '#103053', bgActive: '#0c2742' },
        neutral: { bg: '#cdd9e4', content: '#10243d', border: '#aab9c8', bgHover: '#bccbd9', bgActive: '#aab9c8' },
        success: { bg: '#2f8f4e', content: '#fbfdff', border: '#226b3a', bgHover: '#277a42', bgActive: '#1c5731' },
        warning: { bg: '#e0a400', content: '#2a1f00', border: '#ab7e00', bgHover: '#c38f00', bgActive: '#8a6500' },
        danger:  { bg: '#c62828', content: '#fbfdff', border: '#971e1e', bgHover: '#aa2222', bgActive: '#7d1818' },
        info:    { bg: '#2563c4', content: '#fbfdff', border: '#1b4b97', bgHover: '#1f56aa', bgActive: '#163e7d' },
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
      lg: '8px',
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
      low: { boxShadow: '0 1px 2px rgba(16, 36, 61, 0.10)' },
      medium: { boxShadow: '0 4px 10px rgba(16, 36, 61, 0.13), 0 2px 4px rgba(16, 36, 61, 0.07)' },
      high: { boxShadow: '0 12px 22px rgba(16, 36, 61, 0.17), 0 4px 8px rgba(16, 36, 61, 0.09)' },
      overlay: { boxShadow: '0 24px 36px rgba(16, 36, 61, 0.20), 0 10px 14px rgba(16, 36, 61, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Saira Condensed", "Oswald", "Inter", system-ui, sans-serif',
        display: '"Saira Condensed", "Oswald", "Inter", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Saira Condensed", "Oswald", "Inter", system-ui, sans-serif',
        hand: '"Saira Condensed", "Oswald", "Inter", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 700, lineHeight: '1.02', tracking: '0.01em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '2.125rem', weight: 700, lineHeight: '1.1',  tracking: '0.01em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.5rem',   weight: 600, lineHeight: '1.2',  tracking: '0.01em', textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1.0625rem',weight: 600, lineHeight: '1.4',  tracking: '0.04em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.55', tracking: '0.01em' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4',  tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 500, lineHeight: '1.4',  tracking: '0.04em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '100ms',
        base: '180ms',
        slow: '290ms',
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
      focusRing: { width: '3px', offset: '2px', color: '#1d4ed8', style: 'solid' },
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
