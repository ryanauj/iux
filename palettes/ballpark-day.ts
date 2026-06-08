import type { Palette } from '../tokens/semantic.contract'

/**
 * Ballpark Day — the baseball-sim register on the Flat engine. A classic
 * day-game read: warm chalk-and-cream field, infield-dirt borders,
 * outfield green as the primary action, and stitching-red wired into
 * danger and links the way a baseball's seams are the one red on a
 * white hide. Anchored on the scoreboard and box-score HUD of baseball
 * games (MLB The Show, classic arcade baseball) — cap navy, grass
 * green, infield clay, and a single stitch red.
 *
 *   chalk-cream field: #f3f1e6
 *   raised panel:      #fdfcf5
 *   infield dirt:      #cdbf9c
 *   outfield green:    #2f7d3f  (primary action)
 *   stitch red:        #c0392b  (danger / link)
 *   cap navy:          #2456a6  (info)
 *   scoreboard amber:  #e0a400  (warning)
 *   ink (text):        #1c2a3a  — cap navy near-black
 */
export const palette: Palette = {
  id: 'ballpark-day',
  name: 'Ballpark Day',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f3f1e6',
        raised: '#fdfcf5',
        sunken: '#e6e2cf',
        overlay: '#fdfcf5',
        scrim: 'rgba(28, 42, 58, 0.50)',
      },
      content: {
        primary: '#1c2a3a',
        secondary: '#465468',
        muted: '#7b8798',
        inverse: '#fdfcf5',
        link: '#b3392f',
      },
      border: {
        subtle: '#e7e1cd',
        default: '#cdbf9c',
        strong: '#1c2a3a',
        focus: '#c0392b',
      },
      // Intents map to the ballpark: outfield green = primary action,
      // infield-dirt tan = neutral chrome, fresh-grass green = success,
      // scoreboard amber = warning, stitching red = danger, cap navy =
      // info.
      intent: {
        primary: { bg: '#2f7d3f', content: '#fdfcf5', border: '#225c2e', bgHover: '#276835', bgActive: '#1c4a26' },
        neutral: { bg: '#cdbf9c', content: '#1c2a3a', border: '#ab9c72', bgHover: '#bdad85', bgActive: '#ab9c72' },
        success: { bg: '#3fae5a', content: '#0c2114', border: '#2d8543', bgHover: '#35994e', bgActive: '#2a7a40' },
        warning: { bg: '#e0a400', content: '#2a1f00', border: '#ab7e00', bgHover: '#c38f00', bgActive: '#8a6500' },
        danger:  { bg: '#c0392b', content: '#fdfcf5', border: '#922b20', bgHover: '#a33125', bgActive: '#79221a' },
        info:    { bg: '#2456a6', content: '#fdfcf5', border: '#1a4180', bgHover: '#1e4a8f', bgActive: '#163866' },
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
      low: { boxShadow: '0 1px 2px rgba(28, 42, 58, 0.10)' },
      medium: { boxShadow: '0 4px 10px rgba(28, 42, 58, 0.13), 0 2px 4px rgba(28, 42, 58, 0.07)' },
      high: { boxShadow: '0 12px 22px rgba(28, 42, 58, 0.16), 0 4px 8px rgba(28, 42, 58, 0.09)' },
      overlay: { boxShadow: '0 24px 36px rgba(28, 42, 58, 0.20), 0 10px 14px rgba(28, 42, 58, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Anton", "Oswald", "Inter", system-ui, sans-serif',
        display: '"Anton", "Oswald", "Inter", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Anton", "Oswald", "Inter", system-ui, sans-serif',
        hand: '"Anton", "Oswald", "Inter", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 400, lineHeight: '1.02', tracking: '0.01em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '2.125rem', weight: 400, lineHeight: '1.1',  tracking: '0.01em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.5rem',   weight: 400, lineHeight: '1.2',  tracking: '0.01em', textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1.0625rem',weight: 400, lineHeight: '1.4',  tracking: '0.03em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.6',  tracking: '0.01em' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.4',  tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4',  tracking: '0.04em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '110ms',
        base: '200ms',
        slow: '320ms',
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
      focusRing: { width: '3px', offset: '2px', color: '#c0392b', style: 'solid' },
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
