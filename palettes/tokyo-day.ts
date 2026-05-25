import type { Palette } from '../tokens/semantic.contract'

/**
 * Tokyo / Day — Flat engine tuned for the daytime signage register of
 * Tokyo's transit and street systems. White field, JIS-signage red plus
 * JR-East green plus JR-East blue carrying the semantic triad, condensed
 * gothic display, tight 4 px grid. The "Shibuya-crossing at noon"
 * intensity: saturated, signage-grade colour reserved for state.
 *
 *   - `surface.base` is `#ffffff`; `surface.raised` is `#fafafa` —
 *     cooler than Flat / Classic's `#f4f5f7`. Borders are hairline
 *     `#e0e0e0` rules — the colour of a printed signage backplate.
 *   - Intents take their colours from the JIS signage system and JR-East
 *     line palette: deep JR-East green (`#007c38`) carries `intent.primary`
 *     and `intent.success` — Tokyo's transit signage conflates "go" and
 *     "primary", and the deeper green keeps white inverse text readable
 *     at WCAG UI contrast; JR-East blue (`#0084c8`) carries `intent.info`;
 *     JIS signal red (`#c8102e`) carries `intent.danger`; JIS signal
 *     yellow (`#ffd400`) carries `intent.warning`. Every saturated intent
 *     ships with white inverse content.
 *   - `space.*` is snapped to a 4 px grid throughout (`1: '4px'`,
 *     `2: '8px'`, ... `8: '64px'`) — the same as Flat / Classic at the
 *     low end, but every step lands on an integer multiple of 4 with no
 *     intermediate values. The tighter feel is signage-like.
 *   - `radius.*` keeps `lg: '10px'` for cards but tightens `sm`/`md` to
 *     `'2px'` / `'4px'` — the JIS-signage register favours hard rounded
 *     rectangles rather than pill-soft buttons.
 *   - `typography.family.display` is Barlow Condensed (condensed gothic
 *     sans, the signage register); `family.ui` and `family.body` are
 *     Inter / Noto Sans JP — Inter for Latin, with Noto Sans JP as the
 *     CJK fallback the palette ships even though the showcase renders
 *     only Latin text.
 *   - `elevation.*` uses Flat / Classic's recipe with a slightly cooler
 *     shadow tint (`rgba(15, 30, 40, 0.08)` at `low`) so cards lift
 *     visibly against the cool white field.
 */
export const palette: Palette = {
  id: 'tokyo-day',
  name: 'Tokyo / Day',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#ffffff',
        raised: '#fafafa',
        sunken: '#f0f0f0',
        overlay: '#ffffff',
        scrim: 'rgba(15, 30, 40, 0.46)',
      },
      content: {
        primary: '#1a1a1a',
        secondary: '#454545',
        muted: '#7a7a7a',
        inverse: '#ffffff',
        link: '#0084c8',
      },
      border: {
        subtle: '#ececec',
        default: '#e0e0e0',
        strong: '#9c9c9c',
        focus: '#0084c8',
      },
      intent: {
        primary: { bg: '#007c38', content: '#ffffff', border: '#006a2f', bgHover: '#006a2f', bgActive: '#005224' },
        neutral: { bg: '#f0f0f0', content: '#1a1a1a', border: '#e0e0e0', bgHover: '#e0e0e0', bgActive: '#c8c8c8' },
        success: { bg: '#007c38', content: '#ffffff', border: '#006a2f', bgHover: '#006a2f', bgActive: '#005224' },
        warning: { bg: '#ffd400', content: '#1a1a1a', border: '#d4af00', bgHover: '#ebc200', bgActive: '#c4a300' },
        danger:  { bg: '#c8102e', content: '#ffffff', border: '#a40d26', bgHover: '#b00e29', bgActive: '#8a0b20' },
        info:    { bg: '#0084c8', content: '#ffffff', border: '#006ba4', bgHover: '#0074b0', bgActive: '#005a8a' },
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
      lg: '10px',
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
      low: { boxShadow: '0 1px 2px rgba(15, 30, 40, 0.08)' },
      medium: { boxShadow: '0 4px 6px rgba(15, 30, 40, 0.10), 0 2px 4px rgba(15, 30, 40, 0.05)' },
      high: { boxShadow: '0 10px 15px rgba(15, 30, 40, 0.12), 0 4px 6px rgba(15, 30, 40, 0.06)' },
      overlay: { boxShadow: '0 20px 25px rgba(15, 30, 40, 0.14), 0 10px 10px rgba(15, 30, 40, 0.05)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Noto Sans JP", "Hiragino Sans", "Yu Gothic UI", "Helvetica Neue", system-ui, sans-serif',
        display: '"Barlow Condensed", "Oswald", "Roboto Condensed", "Helvetica Neue Condensed", "Arial Narrow", sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Noto Sans JP", "Hiragino Sans", "Yu Gothic UI", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Noto Sans JP", "Hiragino Sans", "Yu Gothic UI", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 700, lineHeight: '1.05', tracking: '0',       textTransform: 'uppercase' },
        title:      { family: 'display', size: '2rem',     weight: 700, lineHeight: '1.15', tracking: '0',       textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.375rem', weight: 700, lineHeight: '1.25', tracking: '0',       textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 700, lineHeight: '1.4',  tracking: '0.06em',  textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.8125rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '100ms',
        base: '180ms',
        slow: '280ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#0084c8', style: 'solid' },
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
