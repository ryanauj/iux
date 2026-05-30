import type { Palette } from '../tokens/semantic.contract'

/**
 * Art Deco / Ivory — the daylight inversion of `art-deco`. The Gatsby
 * register flips from a lacquered teal-black lobby to an ivory invitation
 * card: champagne gold and deep emerald-teal sitting on warm cream rather
 * than the reverse. Same Flat engine, same geometric Deco display serif,
 * same widely-tracked uppercase subheads.
 *
 *   - `surface.base` is warm ivory / champagne paper (`#f4ecd8`);
 *     `surface.raised` lifts to `#faf3e2`. `surface.sunken` darkens to
 *     `#e9dfc6` for input wells.
 *   - `content.primary` is deep emerald-teal-black ink (`#10302c`) — the
 *     dark theme's `surface.base` register promoted to the foreground.
 *     `content.link` and `border.strong` are a deep gold-bronze
 *     (`#9a7b2e`) that reads on cream where the bright champagne foil
 *     would not.
 *   - `intent.primary.bg` keeps champagne gold (`#c8a96a`) with deep-teal
 *     inverse content — gold foil on cream, the engraved-invitation look
 *     — bordered in the darker gold-bronze for definition. `warning`
 *     reuses the gold; `danger` is Deco oxblood; `info` a muted teal-blue.
 *   - `radius.*` collapses to `'0' / '0' / '4px'` and `elevation.*` uses
 *     warm shadows tinted toward the ivory's umber.
 */
export const palette: Palette = {
  id: 'art-deco-ivory',
  name: 'Art Deco / Ivory',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f4ecd8',
        raised: '#faf3e2',
        sunken: '#e9dfc6',
        overlay: '#faf3e2',
        scrim: 'rgba(40, 30, 14, 0.45)',
      },
      content: {
        primary: '#10302c',
        secondary: '#3f5a54',
        muted: '#7a7458',
        inverse: '#f4ecd8',
        link: '#9a7b2e',
      },
      border: {
        subtle: 'rgba(16, 48, 44, 0.14)',
        default: 'rgba(16, 48, 44, 0.30)',
        strong: '#9a7b2e',
        focus: '#9a7b2e',
      },
      intent: {
        primary: { bg: '#c8a96a', content: '#10302c', border: '#9a7b2e', bgHover: '#bd9c57', bgActive: '#a88a4e' },
        neutral: { bg: '#e7dcc0', content: '#10302c', border: 'rgba(16, 48, 44, 0.28)', bgHover: '#ddd0ae', bgActive: '#d3c49c' },
        success: { bg: '#2f6f48', content: '#f4ecd8', border: '#235235', bgHover: '#286140', bgActive: '#235235' },
        warning: { bg: '#c8a96a', content: '#10302c', border: '#9a7b2e', bgHover: '#bd9c57', bgActive: '#a88a4e' },
        danger:  { bg: '#8a2233', content: '#f4ecd8', border: '#6b1828', bgHover: '#7a1e2d', bgActive: '#6b1828' },
        info:    { bg: '#2e5a72', content: '#f4ecd8', border: '#1f4258', bgHover: '#295065', bgActive: '#1f4258' },
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
      sm: '0',
      md: '0',
      lg: '4px',
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
      low: { boxShadow: '0 1px 2px rgba(40, 30, 14, 0.14)' },
      medium: { boxShadow: '0 4px 8px rgba(40, 30, 14, 0.16), 0 2px 4px rgba(40, 30, 14, 0.10)' },
      high: { boxShadow: '0 10px 18px rgba(40, 30, 14, 0.18), 0 4px 6px rgba(40, 30, 14, 0.10)' },
      overlay: { boxShadow: '0 20px 32px rgba(40, 30, 14, 0.22), 0 10px 14px rgba(40, 30, 14, 0.12)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Poiret One", "Limelight", "Bodoni 72", "Didot", "Georgia", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3.25rem',  weight: 400, lineHeight: '1.05', tracking: '0.04em',  textTransform: 'uppercase' },
        title:      { family: 'display', size: '2.25rem',  weight: 400, lineHeight: '1.15', tracking: '0.03em',  textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.5rem',   weight: 400, lineHeight: '1.25', tracking: '0.02em',  textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4',  tracking: '0.08em',  textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.12em',  textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.4',  tracking: '0.02em' },
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
        spring: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '3px', offset: '2px', color: '#9a7b2e', style: 'solid' },
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
