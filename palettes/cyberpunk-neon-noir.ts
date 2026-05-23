import type { Palette } from '../tokens/semantic.contract'

/**
 * Cyberpunk Neon-Noir — rainy-window register on the Glassmorphism
 * engine. Near-black `surface.base` (`#08070d`), magenta-cast
 * translucent raised surfaces (`rgba(244,114,182,0.06 → 0.10)`),
 * and dual magenta+cyan accents pushed through `border.*` and
 * `elevation.*` as paired glows. `effect.focusRing.style = 'glow'`
 * — the focus ring is meant to render as a `box-shadow` halo, not an
 * outline. Radii are sharp (`sm 2 / md 4 / lg 8`) so the neon edges
 * read as etched rather than rounded.
 */
export const palette: Palette = {
  id: 'cyberpunk-neon-noir',
  name: 'Cyberpunk Neon-Noir',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#08070d',
        raised: 'rgba(244, 114, 182, 0.06)',
        sunken: 'rgba(244, 114, 182, 0.03)',
        overlay: 'rgba(34, 11, 40, 0.85)',
        scrim: 'rgba(0, 0, 0, 0.80)',
      },
      content: {
        primary: '#fce7f3',
        secondary: 'rgba(252, 231, 243, 0.74)',
        muted: 'rgba(252, 231, 243, 0.46)',
        inverse: '#08070d',
        link: '#22d3ee',
      },
      border: {
        subtle: 'rgba(244, 114, 182, 0.16)',
        default: 'rgba(244, 114, 182, 0.32)',
        strong: 'rgba(34, 211, 238, 0.55)',
        focus: '#f0abfc',
      },
      intent: {
        primary: { bg: 'rgba(244, 114, 182, 0.18)', content: '#fbcfe8', border: '#f0abfc', bgHover: 'rgba(244, 114, 182, 0.28)', bgActive: 'rgba(244, 114, 182, 0.42)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.04)', content: '#fce7f3', border: 'rgba(244, 114, 182, 0.22)', bgHover: 'rgba(255, 255, 255, 0.08)', bgActive: 'rgba(255, 255, 255, 0.12)' },
        success: { bg: 'rgba(74, 222, 128, 0.18)',  content: '#bbf7d0', border: '#4ade80', bgHover: 'rgba(74, 222, 128, 0.28)',  bgActive: 'rgba(74, 222, 128, 0.42)' },
        warning: { bg: 'rgba(251, 191, 36, 0.18)',  content: '#fef3c7', border: '#fbbf24', bgHover: 'rgba(251, 191, 36, 0.28)',  bgActive: 'rgba(251, 191, 36, 0.42)' },
        danger:  { bg: 'rgba(248, 113, 113, 0.18)', content: '#fecaca', border: '#f87171', bgHover: 'rgba(248, 113, 113, 0.28)', bgActive: 'rgba(248, 113, 113, 0.42)' },
        info:    { bg: 'rgba(34, 211, 238, 0.18)',  content: '#a5f3fc', border: '#22d3ee', bgHover: 'rgba(34, 211, 238, 0.28)',  bgActive: 'rgba(34, 211, 238, 0.42)' },
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
      sm: '2px',
      md: '4px',
      lg: '8px',
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(244, 114, 182, 0.18)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(244, 114, 182, 0.26), 0 0 10px rgba(244, 114, 182, 0.18), 0 0 4px rgba(34, 211, 238, 0.10)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(244, 114, 182, 0.34), 0 0 18px rgba(244, 114, 182, 0.26), 0 0 8px rgba(34, 211, 238, 0.16)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(244, 114, 182, 0.42), 0 0 28px rgba(244, 114, 182, 0.32), 0 0 14px rgba(34, 211, 238, 0.20)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(244, 114, 182, 0.55), 0 0 44px rgba(244, 114, 182, 0.40), 0 0 22px rgba(34, 211, 238, 0.26), 0 24px 60px rgba(0, 0, 0, 0.70)' },
    },
    typography: {
      family: {
        ui: '"Rajdhani", "Eurostile", "Bank Gothic", "Helvetica Neue", Helvetica, Arial, sans-serif',
        display: '"Rajdhani", "Eurostile", "Bank Gothic", "Helvetica Neue", Helvetica, Arial, sans-serif',
        mono: '"Share Tech Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
        pixel: '"Rajdhani", "Eurostile", "Bank Gothic", "Helvetica Neue", Helvetica, Arial, sans-serif',
        hand: '"Rajdhani", "Eurostile", "Bank Gothic", "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 600, lineHeight: '1.1',  tracking: '0.04em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.875rem',weight: 600, lineHeight: '1.2',  tracking: '0.04em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.25rem', weight: 600, lineHeight: '1.3',  tracking: '0.06em', textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.4',  tracking: '0.06em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.5', tracking: '0.02em' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4', tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0.08em', textTransform: 'uppercase' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0.05em', textTransform: 'uppercase' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '90ms',
        base: '180ms',
        slow: '300ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'blur(4px)', md: 'blur(10px)', lg: 'blur(18px)' },
      focusRing: { width: '2px', offset: '2px', color: '#f0abfc', style: 'glow' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
    },
  },
}
