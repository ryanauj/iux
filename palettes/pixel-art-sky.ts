import type { Palette } from '../tokens/semantic.contract'

/**
 * Pixel Art (Sky) — a light-ground register of the `pixel-art` engine in
 * the cozy-indie spirit of Cottagecore, but cool and airy: a pale-sky
 * field with a single dominant blue highlight carrying primary, focus,
 * and links. Square corners, bitmap glyphs via Press Start 2P, hard
 * offsets, `steps(1, end)` motion — the same engine as the NES / Game Boy
 * / Cottagecore registers; only `color.*` and `space.*` change.
 *
 * Not a hardware-locked palette — an art-direction register. The blue
 * dominant is the "colour highlight" version of the light-ground idea:
 * a near-white ground with the saturation moved into the accent rather
 * than the surface, while the other intents keep their conventional hues
 * so the UI stays readable. Ships `a11y: 'experimental'` with the rest of
 * the pixel-art family (the bitmap font at small role sizes is the
 * engine-level caveat).
 *
 *   sky field:   #eaf2fb
 *   sky frame:   #2f5f96
 *   ink (text):  #182b40  — dark navy, not pure black
 *   accent blue: #2563eb
 */
export const palette: Palette = {
  id: 'pixel-art-sky',
  name: 'Pixel Art (Sky)',
  engine: 'pixel-art',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#eaf2fb',
        raised: '#f3f9fe',
        sunken: '#cfe0f2',
        overlay: '#eaf2fb',
        scrim: 'rgba(20, 40, 70, 0.62)',
      },
      content: {
        primary: '#182b40',
        secondary: '#34506e',
        muted: '#5c7896',
        inverse: '#eaf2fb',
        link: '#2563eb',
      },
      border: {
        subtle: '#c3d8ee',
        default: '#6f9bc8',
        strong: '#2f5f96',
        focus: '#2563eb',
      },
      intent: {
        primary: {
          bg: '#2563eb',
          content: '#eaf2fb',
          border: '#182b40',
          bgHover: '#3b78f0',
          bgActive: '#1d4ed8',
        },
        neutral: {
          bg: '#6f9bc8',
          content: '#182b40',
          border: '#2f5f96',
          bgHover: '#87aed6',
          bgActive: '#5784b4',
        },
        success: {
          bg: '#3fa34d',
          content: '#eaf2fb',
          border: '#182b40',
          bgHover: '#4fb85d',
          bgActive: '#2f8a3d',
        },
        warning: {
          bg: '#e0a82e',
          content: '#182b40',
          border: '#2f5f96',
          bgHover: '#f0bb44',
          bgActive: '#c08f1e',
        },
        danger: {
          bg: '#d14b3c',
          content: '#eaf2fb',
          border: '#182b40',
          bgHover: '#e0603c',
          bgActive: '#b03828',
        },
        info: {
          bg: '#3aa0c8',
          content: '#eaf2fb',
          border: '#182b40',
          bgHover: '#4fb4dc',
          bgActive: '#2f88aa',
        },
      },
    },
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
    // Hard offsets in the sky-frame blue rather than pure black — the
    // mid-blue shadow against the pale field reads as a carved frame.
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '2px 2px 0 #2f5f96' },
      medium: { boxShadow: '4px 4px 0 #2f5f96' },
      high: { boxShadow: '4px 4px 0 #2f5f96, 8px 8px 0 #6f9bc8' },
      overlay: { boxShadow: '0 0 0 2px #182b40, 4px 4px 0 #2f5f96' },
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
      focusRing: { width: '4px', offset: '0', color: '#2563eb', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '8px',
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
