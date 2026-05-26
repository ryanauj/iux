import type { Palette } from '../tokens/semantic.contract'

/**
 * Nordic Frost — Flat engine tuned for a cool Scandinavian / arctic
 * register. Pale glacier-blue field, deep arctic-navy primary, frost-grey
 * neutrals, sea-foam green success, copper warning, low-saturation berry
 * danger. The cooler sibling of Scandinavian Royal Modern: same Nordic
 * restraint, but the field carries a literal blue cast (glacier ice
 * vs. bleached oak) and gold drops out entirely.
 *
 *   - `surface.base` is glacier ice (`#eef4f7`); `surface.raised` lifts
 *     to a barely-tinted near-white (`#fafcfd`). `surface.sunken` drops
 *     to `#dde6ec` for input wells. The whole field has a 2-3% cyan tint
 *     — the cooler-than-paper register the rest of the palette depends on.
 *   - `intent.primary.bg` is arctic navy (`#1f3a5c`) — deeper and slightly
 *     more saturated than Scandinavian Royal's navy. `intent.success` is
 *     pine forest (`#2d6a4f`); `intent.warning` is brushed copper
 *     (`#b87333`); `intent.danger` is winter berry (`#a23039`);
 *     `intent.info` is icy mid-blue (`#2563a0`).
 *   - `typography.family.display` and `family.ui` are both Inter — the
 *     palette commits to a single grotesque sans throughout, no serif.
 *   - `radius.*` widens slightly (`md = 8px`, `lg = 14px`) — modern Nordic
 *     interface design favours softer curves than Swiss / Bauhaus.
 *   - `elevation.*` shadows tint toward the primary navy
 *     (`rgba(31, 58, 92, 0.10)`) so cards lift as polished steel above
 *     pale ice, not as neutral panels.
 */
export const palette: Palette = {
  id: 'nordic-frost',
  name: 'Nordic Frost',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#eef4f7',
        raised: '#fafcfd',
        sunken: '#dde6ec',
        overlay: '#fafcfd',
        scrim: 'rgba(14, 34, 54, 0.48)',
      },
      content: {
        primary: '#0e2236',
        secondary: '#3a4d62',
        muted: '#6a7d92',
        inverse: '#fafcfd',
        link: '#1f3a5c',
      },
      border: {
        subtle: '#dde6ec',
        default: '#c2cfd9',
        strong: '#1f3a5c',
        focus: '#1f3a5c',
      },
      intent: {
        primary: { bg: '#1f3a5c', content: '#fafcfd', border: '#162a44', bgHover: '#162a44', bgActive: '#0d1c30' },
        neutral: { bg: '#dde6ec', content: '#0e2236', border: '#c2cfd9', bgHover: '#c2cfd9', bgActive: '#a3b3c0' },
        success: { bg: '#2d6a4f', content: '#fafcfd', border: '#1f4d39', bgHover: '#1f4d39', bgActive: '#143626' },
        warning: { bg: '#b87333', content: '#fafcfd', border: '#925926', bgHover: '#925926', bgActive: '#6b401a' },
        danger:  { bg: '#a23039', content: '#fafcfd', border: '#7d242b', bgHover: '#7d242b', bgActive: '#5a191e' },
        info:    { bg: '#2563a0', content: '#fafcfd', border: '#1c4b7a', bgHover: '#1c4b7a', bgActive: '#143657' },
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
      thin: '1px',
      thick: '2px',
      heavy: '3px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '0 1px 2px rgba(31, 58, 92, 0.08)' },
      medium: { boxShadow: '0 4px 10px rgba(31, 58, 92, 0.10), 0 2px 4px rgba(31, 58, 92, 0.06)' },
      high: { boxShadow: '0 12px 22px rgba(31, 58, 92, 0.14), 0 4px 8px rgba(31, 58, 92, 0.08)' },
      overlay: { boxShadow: '0 24px 36px rgba(14, 34, 54, 0.18), 0 10px 14px rgba(14, 34, 54, 0.08)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 600, lineHeight: '1.1',  tracking: '-0.02em' },
        title:      { family: 'display', size: '2rem',     weight: 600, lineHeight: '1.2',  tracking: '-0.015em' },
        heading:    { family: 'display', size: '1.375rem', weight: 600, lineHeight: '1.3',  tracking: '-0.005em' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 500, lineHeight: '1.4',  tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4',  tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '120ms',
        base: '200ms',
        slow: '320ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#1f3a5c', style: 'solid' },
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
