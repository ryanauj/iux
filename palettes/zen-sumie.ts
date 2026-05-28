import type { Palette } from '../tokens/semantic.contract'

/**
 * Zen / Sumi-e — Sketch engine tuned for the East-Asian brush-and-ink
 * register. Rice-paper field, ink-black brush primary, single seal-red
 * accent, generous whitespace, restrained scale. The second register on
 * the Sketch engine (the first being Hand-drawn / Marker) — proves the
 * engine carries non-Western brushwork the same way the Pixel-art engine
 * carries non-console registers (PICO-8, Cottagecore).
 *
 *   - `surface.base` is unbleached rice paper (`#f4ecd8`); `surface.raised`
 *     is brighter washi (`#fbf5e7`); `sunken` drops to `#e6dcc2`. The
 *     Sketch engine's displacement filter applied at the palette root
 *     turns every stroked edge into a brush-feel approximation.
 *   - `intent.primary.bg` is brush ink (`#1a1612`) — the colour of
 *     ground sumi-e stick freshly applied. `intent.danger.bg` is seal
 *     vermilion (`#a8231c`) — the colour of a personal hanko stamp,
 *     traditionally the only saturated chromatic in a brush composition.
 *     `intent.warning` reuses the seal red at a slightly more orange
 *     tone (`#b8501a`). Other intents (`success`, `info`) stay
 *     monochromatic on the ink-black register so the seal red reads as
 *     unique.
 *   - `typography.family.display` and `family.hand` are brush-feel
 *     scripts (Ma Shan Zheng / Yuji Mai fallback). `family.body` is
 *     Noto Serif (the closest serif companion to East-Asian brush
 *     types). `family.ui` is Inter for controls that need to read at
 *     small sizes — the Sketch-engine wobble would crush form labels
 *     if everything routed through `family.hand`.
 *   - `space.*` widens at the high end (`6: '36px'`, `7: '56px'`,
 *     `8: '80px'`) — sumi-e composition relies on negative space
 *     (`ma`) as the primary organising element.
 *   - `elevation.*` stays close to flat: cards lift via ink-tinted
 *     shadow but the lift is small — the field is the canvas, not a
 *     stage above it. `radius.*` keeps the brush-curve-friendly
 *     defaults so the wobble pass doesn't crush hard corners.
 *   - `effect.strokeVariance` is `'1.0px'` (under the Hand-drawn /
 *     Marker `'1.6px'`) — brush strokes are wobbly but less than
 *     felt-tip marker. The token records that intent; the engine's SVG
 *     filter is shared from the same root definition, so both registers
 *     get the same single-octave, low-frequency sweep (no blur).
 */
export const palette: Palette = {
  id: 'zen-sumie',
  name: 'Zen / Sumi-e',
  engine: 'sketch',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f4ecd8',
        raised: '#fbf5e7',
        sunken: '#e6dcc2',
        overlay: '#fbf5e7',
        scrim: 'rgba(26, 22, 18, 0.50)',
      },
      content: {
        primary: '#1a1612',
        secondary: '#3e3830',
        muted: '#8a8278',
        inverse: '#fbf5e7',
        link: '#a8231c',
      },
      border: {
        subtle: '#dcd2b8',
        default: '#1a1612',
        strong: '#0a0806',
        focus: '#a8231c',
      },
      intent: {
        primary: { bg: '#1a1612', content: '#fbf5e7', border: '#0a0806', bgHover: '#0a0806', bgActive: '#000000' },
        neutral: { bg: '#e6dcc2', content: '#1a1612', border: '#bfb39a', bgHover: '#dcd2b8', bgActive: '#bfb39a' },
        success: { bg: '#2e5a3a', content: '#fbf5e7', border: '#1f4028', bgHover: '#1f4028', bgActive: '#142c1a' },
        warning: { bg: '#b8501a', content: '#fbf5e7', border: '#8e3d12', bgHover: '#8e3d12', bgActive: '#642a0c' },
        danger:  { bg: '#a8231c', content: '#fbf5e7', border: '#811a15', bgHover: '#811a15', bgActive: '#5c120e' },
        info:    { bg: '#2e4a5c', content: '#fbf5e7', border: '#1f3340', bgHover: '#1f3340', bgActive: '#14222a' },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '10px',
      '3': '16px',
      '4': '24px',
      '5': '30px',
      '6': '36px',
      '7': '56px',
      '8': '80px',
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
      low: { boxShadow: '1px 1px 0 rgba(26, 22, 18, 0.18)' },
      medium: { boxShadow: '2px 2px 0 rgba(26, 22, 18, 0.22), 0 3px 6px rgba(26, 22, 18, 0.06)' },
      high: { boxShadow: '3px 3px 0 rgba(26, 22, 18, 0.26), 0 8px 14px rgba(26, 22, 18, 0.10)' },
      overlay: { boxShadow: '3px 4px 0 rgba(26, 22, 18, 0.32), 0 16px 26px rgba(26, 22, 18, 0.16)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Noto Sans JP", "Helvetica Neue", system-ui, sans-serif',
        display: '"Ma Shan Zheng", "Yuji Mai", "Klee One", "Caveat", "Georgia", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Ma Shan Zheng", "Yuji Mai", "Klee One", "Caveat", cursive',
      },
      role: {
        display:    { family: 'hand',    size: '3.5rem',   weight: 400, lineHeight: '1.1',  tracking: '0.02em' },
        title:      { family: 'hand',    size: '2.5rem',   weight: 400, lineHeight: '1.15', tracking: '0.02em' },
        heading:    { family: 'hand',    size: '1.625rem', weight: 400, lineHeight: '1.3',  tracking: '0.01em' },
        subheading: { family: 'ui',      size: '1.0625rem',weight: 500, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.7',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 500, lineHeight: '1.4',  tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.5',  tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '160ms',
        base: '280ms',
        slow: '440ms',
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
      focusRing: { width: '3px', offset: '3px', color: '#a8231c', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '1.0px',
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
