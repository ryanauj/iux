import type { Palette } from '../tokens/semantic.contract'

/**
 * Ballpark Day — the baseball-sim register on the Flat engine. A warm
 * day-game read built on the classic team triad: brick-crimson as the
 * primary action, cap-navy as the accent (links, info), and outfield
 * green for success — all sitting on a sunlit cream field with
 * infield-dirt borders. Three real colours, not one tinted wash.
 *
 *   chalk-cream field: #f6f1e6  (base) → #fdfbf3 (raised) → #e9e1ce (sunken)
 *   infield dirt:      #cdbf9c
 *   brick crimson:     #b3322c  (primary action)
 *   cap navy:          #1c3a6e  (accent — links, info)
 *   outfield green:    #3f9e4d  (success)
 *   scoreboard amber:  #e0a400  (warning)
 *   ink (text):        #241a14  — warm brown-black
 */
export const palette: Palette = {
  id: 'ballpark-day',
  name: 'Ballpark Day',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f6f1e6',
        raised: '#fdfbf3',
        sunken: '#e9e1ce',
        overlay: '#fdfbf3',
        scrim: 'rgba(40, 30, 22, 0.50)',
      },
      content: {
        primary: '#241a14',
        secondary: '#5a4a3e',
        muted: '#8a7868',
        inverse: '#fdfbf3',
        link: '#1c3a6e',
      },
      border: {
        subtle: '#e9ddc7',
        default: '#cdbf9c',
        strong: '#241a14',
        focus: '#b3322c',
      },
      // Classic team triad: brick crimson = primary, cap navy = accent
      // (links, info), outfield green = success. Dirt-tan neutral and
      // scoreboard amber warning sit on the warm cream field.
      intent: {
        primary: { bg: '#b3322c', content: '#fdfbf3', border: '#8a2620', bgHover: '#9c2c26', bgActive: '#71201b' },
        neutral: { bg: '#cdbf9c', content: '#241a14', border: '#ab9c72', bgHover: '#bdad85', bgActive: '#ab9c72' },
        success: { bg: '#3f9e4d', content: '#0c2114', border: '#2f7a3a', bgHover: '#378c44', bgActive: '#266630' },
        warning: { bg: '#e0a400', content: '#2a1f00', border: '#ab7e00', bgHover: '#c38f00', bgActive: '#8a6500' },
        danger:  { bg: '#c0392b', content: '#fdfbf3', border: '#922b20', bgHover: '#a33125', bgActive: '#79221a' },
        info:    { bg: '#1c3a6e', content: '#fdfbf3', border: '#142c54', bgHover: '#173263', bgActive: '#102444' },
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
      low: { boxShadow: '0 1px 2px rgba(40, 30, 22, 0.10)' },
      medium: { boxShadow: '0 4px 10px rgba(40, 30, 22, 0.13), 0 2px 4px rgba(40, 30, 22, 0.07)' },
      high: { boxShadow: '0 12px 22px rgba(40, 30, 22, 0.16), 0 4px 8px rgba(40, 30, 22, 0.09)' },
      overlay: { boxShadow: '0 24px 36px rgba(40, 30, 22, 0.20), 0 10px 14px rgba(40, 30, 22, 0.10)' },
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
      focusRing: { width: '3px', offset: '2px', color: '#b3322c', style: 'solid' },
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
