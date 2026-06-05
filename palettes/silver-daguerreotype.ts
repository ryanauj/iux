import type { Palette } from '../tokens/semantic.contract'

/**
 * Silver Daguerreotype — the polished-silver-plate register on the
 * Neumorphism engine. A daguerreotype is an image on a mirror-buffed
 * silver sheet: there is no paper, no ink — only one continuous metallic
 * surface, raised and recessed by light. That is exactly the Neumorphism
 * contract (a single tonal field where paired inner/outer shadows do all
 * the depth work), so this palette swaps the engine's cool blue-grey for
 * a warm silver-sepia and lets the chromatic intents live in the
 * foreground only, the way hand-tinted highlights sat on a daguerreotype.
 *
 * Ships `experimental` like the base Neumorphism palette — the tone-on-
 * tone surface knowingly cannot clear AA for body text.
 */
export const palette: Palette = {
  id: 'silver-daguerreotype',
  name: 'Silver Daguerreotype',
  engine: 'neumorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#dcd7cf',
        raised: '#dcd7cf',
        sunken: '#dcd7cf',
        overlay: '#dcd7cf',
        scrim: 'rgba(120, 110, 92, 0.55)',
      },
      content: {
        primary: '#4a4334',
        secondary: '#65604f',
        muted: '#938c78',
        inverse: '#fbf8f0',
        link: '#7a5b3a',
      },
      border: {
        subtle: '#dcd7cf',
        default: '#dcd7cf',
        strong: '#c6c0b3',
        focus: '#7a5b3a',
      },
      intent: {
        primary: { bg: '#dcd7cf', content: '#7a5b3a', border: '#dcd7cf', bgHover: '#dbd5cc', bgActive: '#d3cdc2' },
        neutral: { bg: '#dcd7cf', content: '#4a4334', border: '#dcd7cf', bgHover: '#dbd5cc', bgActive: '#d3cdc2' },
        success: { bg: '#dcd7cf', content: '#4f6b3e', border: '#dcd7cf', bgHover: '#dbd5cc', bgActive: '#d3cdc2' },
        warning: { bg: '#dcd7cf', content: '#9a6b1c', border: '#dcd7cf', bgHover: '#dbd5cc', bgActive: '#d3cdc2' },
        danger:  { bg: '#dcd7cf', content: '#9c3a2e', border: '#dcd7cf', bgHover: '#dbd5cc', bgActive: '#d3cdc2' },
        info:    { bg: '#dcd7cf', content: '#3f5e6b', border: '#dcd7cf', bgHover: '#dbd5cc', bgActive: '#d3cdc2' },
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
      sm: '6px',
      md: '12px',
      lg: '18px',
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
      flat: { boxShadow: 'inset 4px 4px 8px rgba(150, 138, 116, 0.55), inset -4px -4px 8px rgba(255, 252, 244, 0.85)' },
      low: { boxShadow: '4px 4px 8px rgba(150, 138, 116, 0.55), -4px -4px 8px rgba(255, 252, 244, 0.85)' },
      medium: { boxShadow: '8px 8px 16px rgba(150, 138, 116, 0.50), -8px -8px 16px rgba(255, 252, 244, 0.85)' },
      high: { boxShadow: '12px 12px 24px rgba(150, 138, 116, 0.46), -12px -12px 24px rgba(255, 252, 244, 0.85)' },
      overlay: { boxShadow: '20px 20px 40px rgba(150, 138, 116, 0.46), -20px -20px 40px rgba(255, 252, 244, 0.90)' },
    },
    typography: {
      family: {
        ui: '"Cormorant", "EB Garamond", "Hoefler Text", Georgia, serif',
        display: '"Cormorant", "EB Garamond", "Hoefler Text", Georgia, serif',
        mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '"Cormorant", Georgia, serif',
        hand: '"Cormorant", Georgia, serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',    weight: 600, lineHeight: '1.1',  tracking: '0.01em' },
        title:      { family: 'display', size: '2.125rem',weight: 600, lineHeight: '1.2',  tracking: '0.01em' },
        heading:    { family: 'display', size: '1.5rem',  weight: 600, lineHeight: '1.3',  tracking: '0.02em' },
        subheading: { family: 'ui',      size: '1.125rem',weight: 600, lineHeight: '1.4',  tracking: '0.01em' },
        body:       { family: 'ui',      size: '1.0625rem',weight: 500, lineHeight: '1.55',tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 600, lineHeight: '1.4',  tracking: '0.08em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 500, lineHeight: '1.4', tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 500, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '180ms',
        base: '300ms',
        slow: '480ms',
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '4px', color: '#7a5b3a', style: 'solid' },
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
