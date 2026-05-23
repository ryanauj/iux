import type { Palette } from '../tokens/semantic.contract'

/**
 * Pixel-art (Hyper Light Drifter) — the modern synth-noir register.
 * Deep indigo fields, hot magenta accents, electric teal highlights,
 * pale cream content. Inspired by Heart Machine's 2016 indie
 * (Alx Preston / Disasterpeace) and the wider neon-pastel pixel
 * wave (Sayonara Wild Hearts, Sundered, Eastward at dusk).
 *
 * Same `pixel-art` engine as NES/Game Boy — sharp corners, bitmap
 * font, `steps(1, end)` easings. What makes the register modern is
 * the colour temperature: every pair runs cool-on-dark with a hot
 * accent, which is the post-CRT, post-LCD palette indie pixel art
 * settled into after the 2010s.
 *
 *   indigo field:   #1a0e2e
 *   raised panel:   #2d1b48
 *   magenta accent: #ff3993  (signature drifter pink)
 *   teal highlight: #52e0c5
 *   cream content:  #f4e7d6
 *   blood danger:   #ff2d4a
 */
export const palette: Palette = {
  id: 'pixel-art-hyperlight',
  name: 'Pixel Art (Hyper Light)',
  engine: 'pixel-art',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#1a0e2e',
        raised: '#2d1b48',
        sunken: '#100820',
        overlay: '#2d1b48',
        scrim: 'rgba(13, 10, 26, 0.86)',
      },
      content: {
        primary: '#f4e7d6',
        secondary: '#f7c5c5',
        muted: '#8e6e9c',
        inverse: '#1a0e2e',
        link: '#52e0c5',
      },
      border: {
        subtle: '#3a2658',
        default: '#5a3f7a',
        strong: '#ff3993',
        focus: '#ff3993',
      },
      // Intents lean on the drifter palette: magenta = primary action
      // (the protagonist's blade), teal = success/info (collected
      // shards), amber = warning (waning sun), blood-red = danger.
      // No alpha — pixel-art doesn't tint, it swaps.
      intent: {
        primary: {
          bg: '#ff3993',
          content: '#f4e7d6',
          border: '#f4e7d6',
          bgHover: '#ff5ca8',
          bgActive: '#c8266e',
        },
        neutral: {
          bg: '#3a2658',
          content: '#f4e7d6',
          border: '#5a3f7a',
          bgHover: '#5a3f7a',
          bgActive: '#1a0e2e',
        },
        success: {
          bg: '#52e0c5',
          content: '#1a0e2e',
          border: '#f4e7d6',
          bgHover: '#7af0d8',
          bgActive: '#33b8a0',
        },
        warning: {
          bg: '#f4c843',
          content: '#1a0e2e',
          border: '#f4e7d6',
          bgHover: '#f8d870',
          bgActive: '#c89020',
        },
        danger: {
          bg: '#ff2d4a',
          content: '#f4e7d6',
          border: '#f4e7d6',
          bgHover: '#ff5070',
          bgActive: '#c81830',
        },
        info: {
          bg: '#33d9c4',
          content: '#1a0e2e',
          border: '#f4e7d6',
          bgHover: '#5ce8d4',
          bgActive: '#1ca890',
        },
      },
    },
    // HLD's screen real estate is generous (1080p target with 2× /
    // 3× sprite scaling). We keep the engine 8px grid but lean
    // larger on block gaps so HUD elements feel architectural,
    // not console-tight.
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
    // Hard offsets in deep indigo, with a magenta cast on `high` —
    // the signature drifter "blade glow" silhouette without the
    // anti-aliased halo (which the engine forbids).
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '2px 2px 0 #100820' },
      medium: { boxShadow: '4px 4px 0 #100820' },
      high: { boxShadow: '4px 4px 0 #100820, 8px 8px 0 #ff3993' },
      overlay: { boxShadow: '0 0 0 2px #ff3993, 4px 4px 0 #100820' },
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
      focusRing: { width: '4px', offset: '0', color: '#ff3993', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '8px',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
    },
  },
}
