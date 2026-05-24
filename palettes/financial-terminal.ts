import type { Palette } from '../tokens/semantic.contract'

/**
 * Financial Terminal — flat engine in a generic trading-workstation
 * register: amber phosphor on a dark field, mono-typed labels, P&L
 * green/red as data. Reads as a financial terminal without copying any
 * single vendor's house style.
 *
 *   - `surface.*` tiers across a near-black field so cards, sunken
 *     wells, and dialogs separate from the page without breaking the
 *     "dark terminal" aesthetic. `base` stays pure black; `raised`
 *     warms one notch toward amber; `overlay` warms two notches so
 *     menus and modals pop clearly.
 *   - `content.primary` is the signature trading-amber (`#ffa028`).
 *     `secondary` and `muted` are alpha-graded amber, with `muted`
 *     pulled up to ≈ AA at body size — the previously-shipped 0.46
 *     alpha hit ≈ 2.6:1 and disappeared in too many components.
 *   - `intent.primary` and `intent.neutral` stay on amber so the
 *     primary affordance reads as "the terminal". `intent.warning`
 *     splits to yellow (`#ffd84a`) and `intent.info` to cool cyan
 *     (`#5ec8ff`) so the four intents stop collapsing into one hue —
 *     the legibility regression the all-amber lookalike suffered.
 *     `intent.success` (green) and `intent.danger` (red) still anchor
 *     the P&L axis.
 *   - `radius.*` is `0` across the board including `pill`/`full` — a
 *     terminal doesn't round anything.
 *   - `space.*` runs one notch tighter than the Flat default at the
 *     mid steps (`5 → 16px`, `6 → 24px`) so dense tables still carry
 *     more rows per page than an editorial layout, but the lower steps
 *     are no longer crushed (`1 → 4px`, not `2px`) so component
 *     internals can breathe.
 *   - `typography.family.ui` is a sans face (`Inter` + system) so body
 *     prose and form fields stay readable. `display` and `mono` (and
 *     `code`) remain on `IBM Plex Mono` — headings, labels, and
 *     numeric columns keep the terminal register; only the long-form
 *     body text gets a proportional face.
 *   - `motion.*` keeps linear easing but eases `fast`/`base`/`slow`
 *     to `60ms`/`120ms`/`200ms` so transitions register without
 *     feeling animated.
 *   - `effect.overlay.image` is `'none'` — no scanlines, no chrome,
 *     nothing painted on the root. The dense grid is whatever the
 *     components draw with their own borders.
 *
 * The semantic green (`#00c850`) and red (`#ff5454`) both land at ≈ 7:1
 * on the black field, so positive and negative deltas hit AAA at body
 * size without help from glow or weight changes.
 */
export const palette: Palette = {
  id: 'financial-terminal',
  name: 'Financial Terminal',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#000000',
        raised: '#0a0805',
        sunken: '#000000',
        overlay: '#18120a',
        scrim: 'rgba(0, 0, 0, 0.94)',
      },
      content: {
        primary: '#ffa028',
        secondary: 'rgba(255, 160, 40, 0.85)',
        muted: 'rgba(255, 160, 40, 0.66)',
        inverse: '#000000',
        link: '#ffc97a',
      },
      border: {
        subtle: 'rgba(255, 160, 40, 0.30)',
        default: 'rgba(255, 160, 40, 0.50)',
        strong: 'rgba(255, 160, 40, 0.80)',
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
          bg: 'rgba(255, 160, 40, 0.08)',
          content: '#ffa028',
          border: 'rgba(255, 160, 40, 0.42)',
          bgHover: 'rgba(255, 160, 40, 0.16)',
          bgActive: 'rgba(255, 160, 40, 0.28)',
        },
        success: {
          bg: 'rgba(0, 200, 80, 0.16)',
          content: '#00c850',
          border: '#00c850',
          bgHover: 'rgba(0, 200, 80, 0.26)',
          bgActive: 'rgba(0, 200, 80, 0.38)',
        },
        warning: {
          bg: 'rgba(255, 216, 74, 0.16)',
          content: '#ffd84a',
          border: '#ffd84a',
          bgHover: 'rgba(255, 216, 74, 0.26)',
          bgActive: 'rgba(255, 216, 74, 0.38)',
        },
        danger: {
          bg: 'rgba(255, 84, 84, 0.16)',
          content: '#ff5454',
          border: '#ff5454',
          bgHover: 'rgba(255, 84, 84, 0.26)',
          bgActive: 'rgba(255, 84, 84, 0.38)',
        },
        info: {
          bg: 'rgba(94, 200, 255, 0.14)',
          content: '#5ec8ff',
          border: '#5ec8ff',
          bgHover: 'rgba(94, 200, 255, 0.24)',
          bgActive: 'rgba(94, 200, 255, 0.36)',
        },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '6px',
      '3': '8px',
      '4': '12px',
      '5': '16px',
      '6': '24px',
      '7': '32px',
      '8': '48px',
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
      low: { boxShadow: 'inset 0 0 0 1px rgba(255, 160, 40, 0.30)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(255, 160, 40, 0.50)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(255, 160, 40, 0.70)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(255, 160, 40, 0.85)' },
    },
    typography: {
      family: {
        ui: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        display: '"IBM Plex Mono", "JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
        mono: '"IBM Plex Mono", "JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
        pixel: '"IBM Plex Mono", "JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
        hand: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      },
      role: {
        display:    { family: 'display', size: '1.5rem',    weight: 700, lineHeight: '1.2', tracking: '0',     textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.25rem',   weight: 700, lineHeight: '1.2', tracking: '0',     textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1rem',      weight: 700, lineHeight: '1.3', tracking: '0',     textTransform: 'uppercase' },
        subheading: { family: 'mono',    size: '0.875rem',  weight: 700, lineHeight: '1.3', tracking: '0.02em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.875rem',  weight: 400, lineHeight: '1.5', tracking: '0' },
        label:      { family: 'mono',    size: '0.75rem',   weight: 700, lineHeight: '1.2', tracking: '0.04em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',   weight: 400, lineHeight: '1.4', tracking: '0' },
        code:       { family: 'mono',    size: '0.8125rem', weight: 400, lineHeight: '1.4', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '60ms',
        base: '120ms',
        slow: '200ms',
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
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
