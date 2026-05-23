import type { Palette } from '../tokens/semantic.contract'

/**
 * Swiss / International Style — flat engine collapsed to a three-color
 * field: pure white `surface.*`, pure black borders & body, signal red
 * (`#e30613`) as the only accent and the only attention color. Every
 * intent that isn't `danger`/`primary` collapses to either red or black;
 * the palette deliberately surrenders semantic-color distinction in
 * service of typographic hierarchy. `radius.*` is `0` for everything but
 * `full` — the grid does the visual organizing, not curves. Display
 * family is Helvetica Neue / Helvetica / Arial — the period-correct
 * grotesque the style is named for.
 */
export const palette: Palette = {
  id: 'swiss-international',
  name: 'Swiss / International Style',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#ffffff',
        raised: '#ffffff',
        sunken: '#ffffff',
        overlay: '#ffffff',
        scrim: 'rgba(0, 0, 0, 0.55)',
      },
      content: {
        primary: '#000000',
        secondary: '#000000',
        muted: '#737373',
        inverse: '#ffffff',
        link: '#e30613',
      },
      border: {
        subtle: '#000000',
        default: '#000000',
        strong: '#000000',
        focus: '#e30613',
      },
      intent: {
        primary: { bg: '#e30613', content: '#ffffff', border: '#e30613', bgHover: '#c1050f', bgActive: '#a0040c' },
        neutral: { bg: '#ffffff', content: '#000000', border: '#000000', bgHover: '#f5f5f5', bgActive: '#e8e8e8' },
        success: { bg: '#000000', content: '#ffffff', border: '#000000', bgHover: '#1a1a1a', bgActive: '#333333' },
        warning: { bg: '#e30613', content: '#ffffff', border: '#e30613', bgHover: '#c1050f', bgActive: '#a0040c' },
        danger:  { bg: '#e30613', content: '#ffffff', border: '#e30613', bgHover: '#c1050f', bgActive: '#a0040c' },
        info:    { bg: '#000000', content: '#ffffff', border: '#000000', bgHover: '#1a1a1a', bgActive: '#333333' },
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
      sm: '0',
      md: '0',
      lg: '0',
      pill: '0',
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
      flat: { boxShadow: 'none' },
      low: { boxShadow: 'none' },
      medium: { boxShadow: 'none' },
      high: { boxShadow: 'none' },
      overlay: { boxShadow: '0 0 0 1px #000000' },
    },
    typography: {
      family: {
        ui: '"Helvetica Neue", "Helvetica", "Arial", "Liberation Sans", sans-serif',
        display: '"Helvetica Neue", "Helvetica", "Arial", "Liberation Sans", sans-serif',
        mono: '"Courier", "Courier New", "Liberation Mono", ui-monospace, monospace',
        pixel: '"Helvetica Neue", "Helvetica", "Arial", "Liberation Sans", sans-serif',
      },
      role: {
        display:    { family: 'display', size: '4rem',    weight: 700, lineHeight: '1.0',  tracking: '-0.03em' },
        title:      { family: 'display', size: '2.5rem',  weight: 700, lineHeight: '1.05', tracking: '-0.02em' },
        heading:    { family: 'display', size: '1.5rem',  weight: 700, lineHeight: '1.2',  tracking: '-0.01em' },
        subheading: { family: 'ui',      size: '1rem',    weight: 700, lineHeight: '1.3',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem', weight: 500, lineHeight: '1.4', tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4', tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '100ms',
        base: '160ms',
        slow: '240ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#e30613', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
    },
  },
}
