import type { Palette } from '../tokens/semantic.contract'

/**
 * Pixel-art (SNES / 16-bit JRPG) — the canonical Super Nintendo
 * dialog-box register. Deep-blue window gradient, white inner-bevel
 * outline, gold accent, bright HP/MP/EXP intents. Anchored on the
 * UI vocabulary of Chrono Trigger (1995), Final Fantasy VI (1994),
 * and Secret of Mana (1993) — the era when 15-bit BGR colour and
 * mode-7 layering let game UIs paint richer palettes than the NES.
 *
 * Same `pixel-art` engine as NES/Game Boy. The visual difference is
 * entirely in `color.*`: the deeper, more-saturated blue base reads
 * as a recessed dialog window, and the gold focus / white inner
 * outline together produce the "menu cursor" affordance.
 *
 *   dialog blue:    #1c3878
 *   inner outline:  #f8f8f8  (the white pixel border every SNES dialog used)
 *   gold accent:    #f8c040  (HP/MP bars, menu cursor highlight)
 *   HP green:       #28a838
 *   MP red:         #d83040
 */
export const palette: Palette = {
  id: 'pixel-art-snes',
  name: 'Pixel Art (SNES)',
  engine: 'pixel-art',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#1c3878',
        raised: '#2848a0',
        sunken: '#0c1c48',
        overlay: '#2848a0',
        scrim: 'rgba(8, 16, 40, 0.82)',
      },
      content: {
        primary: '#f8f8f8',
        secondary: '#c0c0e0',
        muted: '#7878a0',
        inverse: '#1c3878',
        link: '#f8d040',
      },
      border: {
        subtle: '#3858a8',
        default: '#7898d8',
        strong: '#f8f8f8',
        focus: '#f8c040',
      },
      // Intents map to JRPG status: blue = command, green = HP,
      // red = damage, gold = exp/quest, cyan = magic. Every bg gets
      // a white inner border (set via `border.strong`) which is the
      // SNES dialog-frame idiom.
      intent: {
        primary: {
          bg: '#3858a8',
          content: '#f8f8f8',
          border: '#f8f8f8',
          bgHover: '#5878c8',
          bgActive: '#1c3878',
        },
        neutral: {
          bg: '#5868a8',
          content: '#f8f8f8',
          border: '#f8f8f8',
          bgHover: '#7888c0',
          bgActive: '#3848a8',
        },
        success: {
          bg: '#28a838',
          content: '#f8f8f8',
          border: '#f8f8f8',
          bgHover: '#48c858',
          bgActive: '#188828',
        },
        warning: {
          bg: '#f8c040',
          content: '#1c3878',
          border: '#f8f8f8',
          bgHover: '#f8d860',
          bgActive: '#c89820',
        },
        danger: {
          bg: '#d83040',
          content: '#f8f8f8',
          border: '#f8f8f8',
          bgHover: '#f85060',
          bgActive: '#a82030',
        },
        info: {
          bg: '#3898d8',
          content: '#f8f8f8',
          border: '#f8f8f8',
          bgHover: '#58b8f8',
          bgActive: '#1878b8',
        },
      },
    },
    // SNES tiles are 8×8 like NES, but UI cells were typically
    // composited at 16×16. Inline gaps stay on the 4/8 sub-step;
    // block gaps lean to 16/24 so menu items feel like dialog rows.
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '16px',
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
    // Hard offsets in the deepest blue. The `overlay` recipe stacks
    // a white outline on top of the drop — that's the SNES dialog
    // signature: white inner bevel, dark drop shadow underneath.
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '2px 2px 0 #0c1c48' },
      medium: { boxShadow: '4px 4px 0 #0c1c48' },
      high: { boxShadow: '4px 4px 0 #0c1c48, 8px 8px 0 #1c3878' },
      overlay: { boxShadow: '0 0 0 2px #f8f8f8, 4px 4px 0 #0c1c48' },
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
      // SNES PAL/NTSC at 50/60Hz — same per-frame ladder.
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
      focusRing: { width: '4px', offset: '0', color: '#f8c040', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '8px',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
    },
  },
}
