import type { Palette } from '../tokens/semantic.contract'

/**
 * Pixel-art (Game Boy DMG) — the canonical 4-tone green LCD register
 * shipped with the original Nintendo Game Boy (DMG-01, 1989). The DMG
 * screen rendered four shades on a yellow-green field; everything that
 * appears on this palette quantises to those four shades and intents
 * collapse onto luminance differences only.
 *
 * Same engine as Pixel-art (NES) — only `color.*` differs. The brief
 * calls for "ship one NES-style and one Game Boy-style variant," and
 * that same-engine / different-token relationship is what proves the
 * pixel-art engine generalises.
 *
 *   shade 0 (lightest):  #9bbc0f
 *   shade 1:             #8bac0f
 *   shade 2:             #306230
 *   shade 3 (darkest):   #0f380f
 *
 * Field is shade 0 (LCD-on, off-pixel), text and outlines are shade 3.
 */
export const palette: Palette = {
  id: 'pixel-art-gameboy',
  name: 'Pixel Art (Game Boy)',
  engine: 'pixel-art',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#9bbc0f',
        raised: '#9bbc0f',
        sunken: '#8bac0f',
        overlay: '#9bbc0f',
        scrim: 'rgba(15, 56, 15, 0.78)',
      },
      content: {
        primary: '#0f380f',
        secondary: '#306230',
        muted: '#306230',
        inverse: '#9bbc0f',
        link: '#0f380f',
      },
      border: {
        subtle: '#8bac0f',
        default: '#306230',
        strong: '#0f380f',
        focus: '#0f380f',
      },
      // DMG had no color intents — every "category" of UI was the same
      // shade as the rest of the screen, distinguished by border weight
      // and iconography. The intents here collapse onto those four
      // shades; success/warning/danger/info differ only in bg/border
      // luminance step. This is the "fails by design" demo the README
      // points to.
      intent: {
        primary: {
          bg: '#0f380f',
          content: '#9bbc0f',
          border: '#0f380f',
          bgHover: '#306230',
          bgActive: '#0f380f',
        },
        neutral: {
          bg: '#9bbc0f',
          content: '#0f380f',
          border: '#0f380f',
          bgHover: '#8bac0f',
          bgActive: '#306230',
        },
        success: {
          bg: '#306230',
          content: '#9bbc0f',
          border: '#0f380f',
          bgHover: '#0f380f',
          bgActive: '#0f380f',
        },
        warning: {
          bg: '#8bac0f',
          content: '#0f380f',
          border: '#0f380f',
          bgHover: '#306230',
          bgActive: '#0f380f',
        },
        danger: {
          bg: '#0f380f',
          content: '#9bbc0f',
          border: '#0f380f',
          bgHover: '#306230',
          bgActive: '#0f380f',
        },
        info: {
          bg: '#8bac0f',
          content: '#0f380f',
          border: '#306230',
          bgHover: '#306230',
          bgActive: '#0f380f',
        },
      },
    },
    // DMG's screen was 160×144 — a tighter grid than the NES's 256×240.
    // We keep the same 8px engine grid but compress the inline scale a
    // half-step at small ranks so dense UIs (Kanban tickets, Stepper
    // rails) still fit a phone viewport with the bitmap font.
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
    // Hard offsets only, in shade 3. No second-tier shadow — the DMG
    // had a single off-pixel cast and we honour that.
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '2px 2px 0 #0f380f' },
      medium: { boxShadow: '4px 4px 0 #0f380f' },
      high: { boxShadow: '4px 4px 0 #0f380f, 8px 8px 0 #306230' },
      overlay: { boxShadow: '0 0 0 2px #0f380f, 4px 4px 0 #0f380f' },
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
        display:    { family: 'pixel', size: '1.5rem', weight: 400, lineHeight: '1.5', tracking: '0' },
        title:      { family: 'pixel', size: '1rem',   weight: 400, lineHeight: '1.5', tracking: '0' },
        heading:    { family: 'pixel', size: '1rem',   weight: 400, lineHeight: '1.5', tracking: '0' },
        subheading: { family: 'pixel', size: '0.75rem',weight: 400, lineHeight: '1.6', tracking: '0' },
        body:       { family: 'pixel', size: '0.5rem', weight: 400, lineHeight: '1.6', tracking: '0' },
        label:      { family: 'pixel', size: '0.5rem', weight: 400, lineHeight: '1.6', tracking: '0' },
        caption:    { family: 'pixel', size: '0.5rem', weight: 400, lineHeight: '1.6', tracking: '0' },
        code:       { family: 'pixel', size: '0.5rem', weight: 400, lineHeight: '1.6', tracking: '0' },
      },
    },
    motion: {
      // DMG ran at ~59.7 Hz. Same per-frame scale as the NES variant.
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
      focusRing: { width: '4px', offset: '0', color: '#0f380f', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '8px',
      strokeVariance: '0',
    },
  },
}
