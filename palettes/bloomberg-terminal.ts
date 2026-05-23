import type { Palette } from '../tokens/semantic.contract'

/**
 * Bloomberg Terminal — flat engine collapsed to the pure-black field and
 * single-phosphor amber type a financial terminal ships. The "information
 * density as aesthetic" register: every decorative slot is starved so the
 * data has nowhere to hide.
 *
 *   - `surface.*` is uniform `#000000` — `base`, `raised`, `sunken`, and
 *     `overlay` are all the same pure black. Surfaces are differentiated
 *     by hairline frames inside `elevation.*`, never by depth or fill.
 *   - `content.primary` is the signature Bloomberg amber (`#ffa028`);
 *     `secondary` and `muted` are alpha-graded amber. `link` is a brighter
 *     amber so it reads as "more amber than the surrounding amber" rather
 *     than as a different hue.
 *   - `intent.primary` / `neutral` / `warning` / `info` collapse to amber:
 *     they're the same phosphor as everything else, distinguished only by
 *     border weight and bg opacity. `intent.success` (green) and
 *     `intent.danger` (red) are the only two non-amber colors and they
 *     exist strictly to read as DATA — positive/negative deltas — not as
 *     decoration. There is no sixth/seventh "brand" color anywhere.
 *   - `radius.*` is `0` across the board including `pill`/`full` — a
 *     terminal doesn't round anything.
 *   - `space.*` is tightened from the Flat default (`1 → 2px`, `4 → 8px`)
 *     so dense tables and grids carry as much information per row as
 *     possible.
 *   - `typography.family.*` aliases every slot to a tabular monospace
 *     (`IBM Plex Mono` fallback chain) — there is no proportional face
 *     anywhere in the palette. Display roles are uppercase, body roles
 *     are not, both stay on mono.
 *   - `motion.*` collapses to linear easing with `fast`/`base`/`slow`
 *     held to `0ms`/`60ms`/`120ms` — terminals snap, they don't ease.
 *   - `effect.overlay.image` is `'none'` — no scanlines, no chrome,
 *     nothing painted on the root. The dense grid is whatever the
 *     components draw with their own borders.
 *
 * The semantic green (`#00c850`) and red (`#ff5454`) both land at ≈ 7:1
 * on the black field, so positive and negative deltas hit AAA at body
 * size without help from glow or weight changes.
 */
export const palette: Palette = {
  id: 'bloomberg-terminal',
  name: 'Bloomberg Terminal',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#000000',
        raised: '#000000',
        sunken: '#000000',
        overlay: '#000000',
        scrim: 'rgba(0, 0, 0, 0.94)',
      },
      content: {
        primary: '#ffa028',
        secondary: 'rgba(255, 160, 40, 0.78)',
        muted: 'rgba(255, 160, 40, 0.46)',
        inverse: '#000000',
        link: '#ffc97a',
      },
      border: {
        subtle: 'rgba(255, 160, 40, 0.18)',
        default: 'rgba(255, 160, 40, 0.36)',
        strong: 'rgba(255, 160, 40, 0.68)',
        focus: '#ffa028',
      },
      intent: {
        primary: {
          bg: 'rgba(255, 160, 40, 0.18)',
          content: '#ffa028',
          border: '#ffa028',
          bgHover: 'rgba(255, 160, 40, 0.28)',
          bgActive: 'rgba(255, 160, 40, 0.42)',
        },
        neutral: {
          bg: 'rgba(255, 160, 40, 0.06)',
          content: '#ffa028',
          border: 'rgba(255, 160, 40, 0.30)',
          bgHover: 'rgba(255, 160, 40, 0.12)',
          bgActive: 'rgba(255, 160, 40, 0.22)',
        },
        success: {
          bg: 'rgba(0, 200, 80, 0.14)',
          content: '#00c850',
          border: '#00c850',
          bgHover: 'rgba(0, 200, 80, 0.24)',
          bgActive: 'rgba(0, 200, 80, 0.36)',
        },
        warning: {
          bg: 'rgba(255, 160, 40, 0.18)',
          content: '#ffa028',
          border: '#ffa028',
          bgHover: 'rgba(255, 160, 40, 0.28)',
          bgActive: 'rgba(255, 160, 40, 0.42)',
        },
        danger: {
          bg: 'rgba(255, 84, 84, 0.14)',
          content: '#ff5454',
          border: '#ff5454',
          bgHover: 'rgba(255, 84, 84, 0.24)',
          bgActive: 'rgba(255, 84, 84, 0.36)',
        },
        info: {
          bg: 'rgba(255, 160, 40, 0.08)',
          content: '#ffa028',
          border: 'rgba(255, 160, 40, 0.46)',
          bgHover: 'rgba(255, 160, 40, 0.16)',
          bgActive: 'rgba(255, 160, 40, 0.26)',
        },
      },
    },
    space: {
      '0': '0',
      '1': '2px',
      '2': '4px',
      '3': '6px',
      '4': '8px',
      '5': '12px',
      '6': '16px',
      '7': '24px',
      '8': '32px',
    },
    radius: {
      none: '0',
      sm: '0',
      md: '0',
      lg: '0',
      pill: '0',
      full: '0',
    },
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '1px',
      thick: '1px',
      heavy: '2px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(255, 160, 40, 0.20)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(255, 160, 40, 0.34)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(255, 160, 40, 0.50)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(255, 160, 40, 0.68)' },
    },
    typography: {
      family: {
        ui: '"IBM Plex Mono", "JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
        display: '"IBM Plex Mono", "JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
        mono: '"IBM Plex Mono", "JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
        pixel: '"IBM Plex Mono", "JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
        hand: '"IBM Plex Mono", "JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
      },
      role: {
        display:    { family: 'display', size: '1.5rem',    weight: 700, lineHeight: '1.2', tracking: '0',     textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.25rem',   weight: 700, lineHeight: '1.2', tracking: '0',     textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1rem',      weight: 700, lineHeight: '1.3', tracking: '0',     textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '0.875rem',  weight: 700, lineHeight: '1.3', tracking: '0',     textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.8125rem', weight: 400, lineHeight: '1.4', tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',   weight: 700, lineHeight: '1.2', tracking: '0.04em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.6875rem', weight: 400, lineHeight: '1.2', tracking: '0' },
        code:       { family: 'mono',    size: '0.8125rem', weight: 400, lineHeight: '1.4', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '0ms',
        base: '60ms',
        slow: '120ms',
      },
      easing: {
        standard: 'linear',
        in: 'linear',
        out: 'linear',
        inOut: 'linear',
        spring: 'linear',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '1px', offset: '0', color: '#ffa028', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      // Aurora engine no-op signals. `atmosphereGradient: 'none'` and
      // `luminanceCenter: 'transparent'` mean the engine CSS that paints
      // the gradient and luminance glow at `.palette-root[data-palette^='aurora']`
      // doesn't paint here. `surfaceBy: 'border'` records that this palette
      // demarcates surfaces with a stroke (the default), not with light density.
      atmosphereGradient: 'none',
      luminanceCenter: 'transparent',
      surfaceBy: 'border',
    },
  },
}
