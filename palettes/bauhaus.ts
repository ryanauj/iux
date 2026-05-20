import type { Palette } from '../tokens/semantic.contract'

/**
 * Bauhaus — flat engine restricted to the school's three-primary palette:
 * Bauhaus red (`#e2241a`), yellow (`#f7c100`), blue (`#1c4eba`), against
 * cream `surface.base` (`#f5f1e8`) with ink-black borders. `radius.*` is
 * forced to either `0` (every named radius) or `9999px` (`full`) — no
 * curve in between, which is the form-language rule the movement
 * enforced ("primary geometric shapes only"). `elevation.*` is `none`
 * at every slot except `overlay` (a 2px black ring); depth comes from
 * shape and color block, not light simulation. Typography is a geometric
 * sans (Futura / Avenir Next) with uppercase headings.
 */
export const palette: Palette = {
  id: 'bauhaus',
  name: 'Bauhaus',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#f5f1e8',
        raised: '#ffffff',
        sunken: '#ece6d3',
        overlay: '#ffffff',
        scrim: 'rgba(10, 10, 10, 0.55)',
      },
      content: {
        primary: '#0a0a0a',
        secondary: '#1a1a1a',
        muted: '#5a5a5a',
        inverse: '#ffffff',
        link: '#1c4eba',
      },
      border: {
        subtle: '#0a0a0a',
        default: '#0a0a0a',
        strong: '#0a0a0a',
        focus: '#e2241a',
      },
      intent: {
        primary: { bg: '#1c4eba', content: '#ffffff', border: '#0a0a0a', bgHover: '#1a44a0', bgActive: '#143580' },
        neutral: { bg: '#f5f1e8', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ece6d3', bgActive: '#d8d0b8' },
        success: { bg: '#1c4eba', content: '#ffffff', border: '#0a0a0a', bgHover: '#1a44a0', bgActive: '#143580' },
        warning: { bg: '#f7c100', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#dba900', bgActive: '#b88f00' },
        danger:  { bg: '#e2241a', content: '#ffffff', border: '#0a0a0a', bgHover: '#c11f16', bgActive: '#9c1812' },
        info:    { bg: '#1c4eba', content: '#ffffff', border: '#0a0a0a', bgHover: '#1a44a0', bgActive: '#143580' },
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
      pill: '9999px',
      full: '9999px',
    },
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '2px',
      thick: '3px',
      heavy: '4px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: 'none' },
      medium: { boxShadow: 'none' },
      high: { boxShadow: 'none' },
      overlay: { boxShadow: '0 0 0 2px #0a0a0a' },
    },
    typography: {
      family: {
        ui: '"Futura", "Avenir Next", "Avenir", "Century Gothic", "Helvetica Neue", sans-serif',
        display: '"Futura", "Avenir Next", "Avenir", "Century Gothic", "Helvetica Neue", sans-serif',
        mono: '"Courier", "Courier New", "Liberation Mono", ui-monospace, monospace',
      },
      role: {
        display:    { family: 'display', size: '4rem',    weight: 700, lineHeight: '0.95', tracking: '-0.03em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '2.5rem',  weight: 700, lineHeight: '1.0',  tracking: '-0.02em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.5rem',  weight: 600, lineHeight: '1.2',  tracking: '0',      textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',    weight: 600, lineHeight: '1.3',  tracking: '0.04em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem', weight: 600, lineHeight: '1.4', tracking: '0.06em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 500, lineHeight: '1.4', tracking: '0.04em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '120ms',
        base: '200ms',
        slow: '300ms',
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
      focusRing: { width: '2px', offset: '2px', color: '#e2241a', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
    },
  },
}
