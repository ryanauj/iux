import type { Palette } from '../tokens/semantic.contract'

/**
 * Pixel-art (Cottagecore) — the warm-pastoral register. Parchment
 * fields, wood-frame borders, harvest-gold accents, crop greens,
 * berry reds. The broad cozy-indie pixel idiom that emerged across
 * the late-2010s and 2020s: farm sims, life sims, illustrated
 * storybooks, "cottagecore" social media aesthetic — all sharing
 * the same warm-earth palette without belonging to any one title.
 *
 * Same `pixel-art` engine as NES/Game Boy — square corners, bitmap
 * font, hard offsets, `steps(1, end)` everywhere. The brief that
 * generalised across NTSC and DMG generalises here too: only
 * `color.*` (and a touch of `space.*`) changes.
 *
 * Unlike NES and Game Boy this is **not** a hardware-locked palette
 * — it's an art-direction register. No console gates the colours;
 * what gates them is the aesthetic. Warmth bias, no pure black,
 * earthy intents in place of saturated console primaries.
 *
 *   parchment field:  #fef0d4
 *   warm wood frame:  #7a4a1b
 *   harvest gold:     #dca830
 *   crop green:       #7cb43c
 *   berry red:        #c84830
 *   water blue:       #4878b8
 *   ink (text):       #3b2615  — warm dark brown, not pure black
 */
export const palette: Palette = {
  id: 'pixel-art-cottagecore',
  name: 'Pixel Art (Cottagecore)',
  engine: 'pixel-art',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#fef0d4',
        raised: '#fce5b8',
        sunken: '#dcb88c',
        overlay: '#fef0d4',
        scrim: 'rgba(59, 38, 21, 0.62)',
      },
      content: {
        primary: '#3b2615',
        secondary: '#5c3e22',
        muted: '#7a5638',
        inverse: '#fef0d4',
        link: '#4878b8',
      },
      border: {
        subtle: '#d8b888',
        default: '#a87838',
        strong: '#7a4a1b',
        focus: '#dca830',
      },
      // Intents map to the pastoral palette: green = grow, gold =
      // harvest, red = berry/forage, blue = water/river, brown =
      // wood/earth. Each one borrows from a place the warm-earth
      // pixel idiom routinely uses these hues.
      intent: {
        primary: {
          bg: '#3d6b2c',
          content: '#fef0d4',
          border: '#3b2615',
          bgHover: '#4f8838',
          bgActive: '#2a4a1e',
        },
        neutral: {
          bg: '#a87838',
          content: '#fef0d4',
          border: '#7a4a1b',
          bgHover: '#c08c48',
          bgActive: '#7a4a1b',
        },
        success: {
          bg: '#7cb43c',
          content: '#3b2615',
          border: '#3d6b2c',
          bgHover: '#94c850',
          bgActive: '#5a8a28',
        },
        warning: {
          bg: '#dca830',
          content: '#3b2615',
          border: '#7a4a1b',
          bgHover: '#f4c544',
          bgActive: '#a87820',
        },
        danger: {
          bg: '#c84830',
          content: '#fef0d4',
          border: '#3b2615',
          bgHover: '#e0603c',
          bgActive: '#8c2818',
        },
        info: {
          bg: '#4878b8',
          content: '#fef0d4',
          border: '#3b2615',
          bgHover: '#608cd0',
          bgActive: '#305898',
        },
      },
    },
    // The cottagecore idiom commonly authors sprites on a 16×16 grid
    // (twice NES). Inline gaps stay on the 4/8 sub-step so dense
    // components (Steppers, Pagination) still breathe; block-level
    // gaps lean a half-step wider than NES so card grids feel like
    // garden plots rather than console menus.
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
      '6': '48px',
      '7': '64px',
      '8': '96px',
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
      thin: '2px',
      thick: '2px',
      heavy: '4px',
    },
    // Hard offsets in warm wood-brown rather than pure black — the
    // brown shadow against parchment reads as a carved frame, which
    // is exactly how cottagecore pixel UIs paint their bevels.
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '2px 2px 0 #7a4a1b' },
      medium: { boxShadow: '4px 4px 0 #7a4a1b' },
      high: { boxShadow: '4px 4px 0 #7a4a1b, 8px 8px 0 #a87838' },
      overlay: { boxShadow: '0 0 0 2px #3b2615, 4px 4px 0 #7a4a1b' },
    },
    typography: {
      family: {
        ui: '"Press Start 2P", "VT323", ui-monospace, monospace',
        display: '"Press Start 2P", "VT323", ui-monospace, monospace',
        mono: '"Press Start 2P", "VT323", ui-monospace, monospace',
        pixel: '"Press Start 2P", "VT323", ui-monospace, monospace',
        hand: '"Press Start 2P", "VT323", ui-monospace, monospace',
      },
      role: {
        display:    { family: 'pixel', size: '2rem',   weight: 400, lineHeight: '1.5', tracking: '0' },
        title:      { family: 'pixel', size: '1.5rem', weight: 400, lineHeight: '1.5', tracking: '0' },
        heading:    { family: 'pixel', size: '1rem',   weight: 400, lineHeight: '1.5', tracking: '0' },
        subheading: { family: 'pixel', size: '1rem',   weight: 400, lineHeight: '1.5', tracking: '0' },
        body:       { family: 'pixel', size: '0.75rem',weight: 400, lineHeight: '1.6', tracking: '0' },
        label:      { family: 'pixel', size: '0.5rem', weight: 400, lineHeight: '1.6', tracking: '0' },
        caption:    { family: 'pixel', size: '0.5rem', weight: 400, lineHeight: '1.6', tracking: '0' },
        code:       { family: 'pixel', size: '0.75rem',weight: 400, lineHeight: '1.6', tracking: '0' },
      },
    },
    motion: {
      // Modern indie targets 60 fps — same per-frame ladder as the
      // hardware variants.
      duration: {
        instant: '0ms',
        fast: '32ms',
        base: '64ms',
        slow: '128ms',
      },
      easing: {
        standard: 'steps(1, end)',
        in: 'steps(1, end)',
        out: 'steps(1, end)',
        inOut: 'steps(1, end)',
        spring: 'steps(1, end)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '4px', offset: '0', color: '#dca830', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '8px',
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
