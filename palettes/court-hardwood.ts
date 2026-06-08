import type { Palette } from '../tokens/semantic.contract'

/**
 * Court Hardwood — the basketball-arcade register on the Flat engine.
 * A daytime arena read: warm maple-hardwood field, painted court lines
 * in near-black, basketball-leather orange as the primary action, and
 * a scoreboard vocabulary of bright state colours. Anchored on the UI
 * of arcade hoops games (NBA Jam, NBA Street) and the broadcast
 * scoreboard graphics of modern sim basketball — bold, high-energy,
 * legible from the cheap seats.
 *
 *   maple field:     #f7ecd9
 *   raised panel:    #fffaf0
 *   court-line ink:  #1a1a1a
 *   leather orange:  #e2591b  (primary action)
 *   scoreboard red:  #c8362f  (danger)
 *   jersey blue:     #1d6fb8  (info)
 *   ink (text):      #2a1a0e  — warm near-black, not pure black
 */
export const palette: Palette = {
  id: 'court-hardwood',
  name: 'Court Hardwood',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f7ecd9',
        raised: '#fffaf0',
        sunken: '#ecdcc0',
        overlay: '#fffaf0',
        scrim: 'rgba(42, 26, 14, 0.52)',
      },
      content: {
        primary: '#2a1a0e',
        secondary: '#5a4632',
        muted: '#8a7560',
        inverse: '#fffaf0',
        link: '#c2410c',
      },
      border: {
        subtle: '#e6d3b3',
        default: '#caa877',
        strong: '#1a1a1a',
        focus: '#ea580c',
      },
      // Intents map to the court: leather orange = the ball / primary
      // action, hardwood tan = neutral chrome, baseline green = go,
      // scoreboard amber = shot-clock warning, foul red = danger,
      // jersey blue = info.
      intent: {
        primary: { bg: '#e2591b', content: '#fffaf0', border: '#a83c0f', bgHover: '#c84a14', bgActive: '#a83c0f' },
        neutral: { bg: '#caa877', content: '#2a1a0e', border: '#a8814b', bgHover: '#b8945f', bgActive: '#a8814b' },
        success: { bg: '#2f7d4f', content: '#fffaf0', border: '#225c39', bgHover: '#256741', bgActive: '#1a4a2e' },
        warning: { bg: '#d98a00', content: '#2a1a0e', border: '#a86a00', bgHover: '#bd7800', bgActive: '#8a5700' },
        danger:  { bg: '#c8362f', content: '#fffaf0', border: '#982621', bgHover: '#ab2c26', bgActive: '#7e201c' },
        info:    { bg: '#1d6fb8', content: '#fffaf0', border: '#15568f', bgHover: '#185f9e', bgActive: '#114876' },
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
      low: { boxShadow: '0 1px 2px rgba(42, 26, 14, 0.10)' },
      medium: { boxShadow: '0 4px 10px rgba(42, 26, 14, 0.14), 0 2px 4px rgba(42, 26, 14, 0.08)' },
      high: { boxShadow: '0 12px 22px rgba(42, 26, 14, 0.18), 0 4px 8px rgba(42, 26, 14, 0.10)' },
      overlay: { boxShadow: '0 24px 36px rgba(42, 26, 14, 0.22), 0 10px 14px rgba(42, 26, 14, 0.12)' },
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
      focusRing: { width: '3px', offset: '2px', color: '#ea580c', style: 'solid' },
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
