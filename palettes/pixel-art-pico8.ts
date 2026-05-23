import type { Palette } from '../tokens/semantic.contract'

/**
 * Pixel-art (PICO-8) — the Lexaloffle fantasy-console register. The
 * palette is literally fixed: 16 hard-coded colours chosen by Joseph
 * White in 2014, and any PICO-8 cart you've ever loaded paints from
 * exactly this set. No alpha, no in-between shades, no gradients.
 *
 *  0  #000000  black         8  #FF004D  red
 *  1  #1D2B53  dark-blue     9  #FFA300  orange
 *  2  #7E2553  dark-purple  10  #FFEC27  yellow
 *  3  #008751  dark-green   11  #00E436  green
 *  4  #AB5236  brown        12  #29ADFF  blue
 *  5  #5F574F  dark-grey    13  #83769C  indigo
 *  6  #C2C3C7  light-grey   14  #FF77A8  pink
 *  7  #FFF1E8  white        15  #FFCCAA  peach
 *
 * Same `pixel-art` engine as NES/Game Boy. The constraint is what
 * makes the register distinctive: hover/active states cannot fade
 * luminance, they have to jump to a neighbouring slot. That's the
 * PICO-8 idiom and it's preserved here.
 */
export const palette: Palette = {
  id: 'pixel-art-pico8',
  name: 'Pixel Art (PICO-8)',
  engine: 'pixel-art',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#1D2B53',
        raised: '#000000',
        sunken: '#000000',
        overlay: '#1D2B53',
        scrim: 'rgba(0, 0, 0, 0.78)',
      },
      content: {
        primary: '#FFF1E8',
        secondary: '#C2C3C7',
        muted: '#83769C',
        inverse: '#000000',
        link: '#29ADFF',
      },
      border: {
        subtle: '#5F574F',
        default: '#83769C',
        strong: '#C2C3C7',
        focus: '#FFEC27',
      },
      // Each intent owns one of the 16 slots. Hover/active jump to a
      // neighbouring slot rather than tinting — there is no #29ADFF
      // "darker", there's only the next index. This is the cartridge
      // idiom; emulating it through the contract is the point.
      intent: {
        primary: {
          bg: '#29ADFF',
          content: '#000000',
          border: '#FFF1E8',
          bgHover: '#83769C',
          bgActive: '#1D2B53',
        },
        neutral: {
          bg: '#5F574F',
          content: '#FFF1E8',
          border: '#C2C3C7',
          bgHover: '#83769C',
          bgActive: '#000000',
        },
        success: {
          bg: '#00E436',
          content: '#000000',
          border: '#FFF1E8',
          bgHover: '#FFEC27',
          bgActive: '#008751',
        },
        warning: {
          bg: '#FFEC27',
          content: '#000000',
          border: '#FFF1E8',
          bgHover: '#FFA300',
          bgActive: '#AB5236',
        },
        danger: {
          bg: '#FF004D',
          content: '#FFF1E8',
          border: '#FFF1E8',
          bgHover: '#FF77A8',
          bgActive: '#7E2553',
        },
        info: {
          bg: '#83769C',
          content: '#FFF1E8',
          border: '#FFF1E8',
          bgHover: '#29ADFF',
          bgActive: '#1D2B53',
        },
      },
    },
    // PICO-8's native canvas is 128×128 — the tightest grid of any
    // pixel-art register here. We keep the 8px engine step but
    // compress the inline scale so a Stepper / Tabs row still fits
    // a single PICO-8 screen at 1× scale.
    space: {
      '0': '0',
      '1': '4px',
      '2': '4px',
      '3': '8px',
      '4': '16px',
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
      thin: '2px',
      thick: '2px',
      heavy: '4px',
    },
    // Hard offsets in #000000 (slot 0). PICO-8 sprites cast a
    // one-pixel black shadow underneath; we scale it to the engine
    // grid but keep the single-colour cast.
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '2px 2px 0 #000000' },
      medium: { boxShadow: '4px 4px 0 #000000' },
      high: { boxShadow: '4px 4px 0 #000000, 8px 8px 0 #5F574F' },
      overlay: { boxShadow: '0 0 0 2px #000000, 4px 4px 0 #000000' },
    },
    typography: {
      family: {
        ui: '"Press Start 2P", "VT323", ui-monospace, monospace',
        display: '"Press Start 2P", "VT323", ui-monospace, monospace',
        mono: '"Press Start 2P", "VT323", ui-monospace, monospace',
        pixel: '"Press Start 2P", "VT323", ui-monospace, monospace',
        hand: '"Press Start 2P", "VT323", ui-monospace, monospace',
      },
      // PICO-8's native font is 3×5 px — far smaller than Press Start
      // 2P at 8px. We compress the role ladder so the visual density
      // matches the cart aesthetic, accepting that 8px is the floor
      // for our bitmap font.
      role: {
        display:    { family: 'pixel', size: '1.5rem', weight: 400, lineHeight: '1.5', tracking: '0' },
        title:      { family: 'pixel', size: '1rem',   weight: 400, lineHeight: '1.5', tracking: '0' },
        heading:    { family: 'pixel', size: '0.75rem',weight: 400, lineHeight: '1.5', tracking: '0' },
        subheading: { family: 'pixel', size: '0.75rem',weight: 400, lineHeight: '1.5', tracking: '0' },
        body:       { family: 'pixel', size: '0.5rem', weight: 400, lineHeight: '1.6', tracking: '0' },
        label:      { family: 'pixel', size: '0.5rem', weight: 400, lineHeight: '1.6', tracking: '0' },
        caption:    { family: 'pixel', size: '0.5rem', weight: 400, lineHeight: '1.6', tracking: '0' },
        code:       { family: 'pixel', size: '0.5rem', weight: 400, lineHeight: '1.6', tracking: '0' },
      },
    },
    motion: {
      // PICO-8 runs at 30 or 60 fps — same frame-multiple ladder as
      // NES; the cart spec allows both.
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
      focusRing: { width: '4px', offset: '0', color: '#FFEC27', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '8px',
      strokeVariance: '0',
    },
  },
}
