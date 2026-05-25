import type { Palette } from '../tokens/semantic.contract'

/**
 * Desert Modernism — Flat engine tuned for the Palm-Springs mid-century
 * register at the warmer end of the desert palette. Sun-baked cream
 * field, terracotta-clay primary, pool-turquoise info, palm-shade green
 * success — the saturated Coachella-Valley colour vocabulary on the same
 * Flat engine that carries Mid-century modern. Mid-century modern is the
 * Eames living-room register; Desert Modernism is the Frey / Lautner
 * Palm-Springs-resort register on the same chassis.
 *
 *   - `surface.base` is sun-baked cream (`#f5e9d4`); `surface.raised`
 *     is `#fbf2e0` (a fresh stucco wall in shade); `surface.sunken` is
 *     `#ead9be` for input wells.
 *   - `intent.primary.bg` is desert terracotta (`#9c3d1f`) — the
 *     baked-clay roof tile of a Frey residence; `intent.info.bg` is
 *     pool turquoise (`#1f7d8a`) — the saturated cyan of an unheated
 *     Coachella pool at midday. `intent.warning` reuses a desert
 *     mustard (`#9c6a14`) so the warmth register stays consistent;
 *     `success` is palm-shade green (`#356a3a`).
 *   - `typography.family.display` is a humanist sans with a touch of
 *     mid-century geometry (Futura PT / Avenir). `family.body` is Inter
 *     for long-form reading.
 *   - `radius.*` keeps the default Flat scale — Palm Springs architecture
 *     mixed straight masonry with the occasional rounded poolside cabana,
 *     so the palette doesn't force a single corner discipline.
 *   - `elevation.*` keeps the Flat / Classic recipe with a warm-tinted
 *     shadow (`rgba(120, 60, 30, 0.10)`) so cards sit on the cream like
 *     awnings on a sun-baked wall, not as pure neutral panels.
 */
export const palette: Palette = {
  id: 'desert-modernism',
  name: 'Desert Modernism',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f5e9d4',
        raised: '#fbf2e0',
        sunken: '#ead9be',
        overlay: '#fbf2e0',
        scrim: 'rgba(120, 60, 30, 0.45)',
      },
      content: {
        primary: '#2a1f14',
        secondary: '#4e3e2a',
        muted: '#8a7a64',
        inverse: '#fbf2e0',
        link: '#9c3d1f',
      },
      border: {
        subtle: '#e2d2b6',
        default: '#ccb98e',
        strong: '#8a7a64',
        focus: '#9c3d1f',
      },
      intent: {
        primary: { bg: '#9c3d1f', content: '#fbf2e0', border: '#7a2f17', bgHover: '#7a2f17', bgActive: '#58220f' },
        neutral: { bg: '#ead9be', content: '#2a1f14', border: '#ccb98e', bgHover: '#ccb98e', bgActive: '#b3a072' },
        success: { bg: '#356a3a', content: '#fbf2e0', border: '#244c28', bgHover: '#244c28', bgActive: '#16361a' },
        warning: { bg: '#9c6a14', content: '#fbf2e0', border: '#7a510e', bgHover: '#7a510e', bgActive: '#583a08' },
        danger:  { bg: '#9c1f1f', content: '#fbf2e0', border: '#761616', bgHover: '#761616', bgActive: '#530f0f' },
        info:    { bg: '#1f7d8a', content: '#fbf2e0', border: '#155c66', bgHover: '#155c66', bgActive: '#0e4148' },
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
      low: { boxShadow: '0 1px 2px rgba(120, 60, 30, 0.10)' },
      medium: { boxShadow: '0 4px 8px rgba(120, 60, 30, 0.12), 0 2px 4px rgba(120, 60, 30, 0.06)' },
      high: { boxShadow: '0 10px 18px rgba(120, 60, 30, 0.16), 0 4px 8px rgba(120, 60, 30, 0.08)' },
      overlay: { boxShadow: '0 20px 32px rgba(120, 60, 30, 0.22), 0 10px 14px rgba(120, 60, 30, 0.10)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Futura PT", "Futura", "Avenir Next", "Avenir", "Inter", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 600, lineHeight: '1.05', tracking: '-0.01em' },
        title:      { family: 'display', size: '2.125rem', weight: 600, lineHeight: '1.15', tracking: '-0.005em' },
        heading:    { family: 'display', size: '1.5rem',   weight: 600, lineHeight: '1.25', tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.08em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '220ms',
        slow: '360ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#9c3d1f', style: 'solid' },
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
