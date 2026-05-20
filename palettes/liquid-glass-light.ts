import type { Palette } from '../tokens/semantic.contract'

/**
 * Liquid Glass — Light variant. Apple WWDC25 register on the Glassmorphism
 * engine: softer `backdropBlur.*` magnitudes (4 / 10 / 20 vs classic's
 * 6 / 14 / 24), markedly lighter `elevation.*` shadows, and borders that
 * carry a faint sky-cyan refraction tint instead of pure white hairlines.
 * `surface.base` is a cool neutral grey that lets the white-tinted
 * `raised` panels read as material rather than fog.
 */
export const palette: Palette = {
  id: 'liquid-glass-light',
  name: 'Liquid Glass (Light)',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#e6e9f2',
        raised: 'rgba(255, 255, 255, 0.50)',
        sunken: 'rgba(255, 255, 255, 0.28)',
        overlay: 'rgba(255, 255, 255, 0.68)',
        scrim: 'rgba(15, 23, 42, 0.24)',
      },
      content: {
        primary: '#0f172a',
        secondary: 'rgba(15, 23, 42, 0.72)',
        muted: 'rgba(15, 23, 42, 0.48)',
        inverse: '#f8fafc',
        link: '#0284c7',
      },
      border: {
        subtle: 'rgba(255, 255, 255, 0.55)',
        default: 'rgba(186, 230, 253, 0.60)',
        strong: 'rgba(125, 211, 252, 0.80)',
        focus: '#0ea5e9',
      },
      intent: {
        primary: { bg: 'rgba(186, 230, 253, 0.85)', content: '#0c4a6e', border: 'rgba(255, 255, 255, 0.65)', bgHover: 'rgba(186, 230, 253, 0.95)', bgActive: 'rgba(125, 211, 252, 0.95)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.50)', content: '#0f172a', border: 'rgba(255, 255, 255, 0.65)', bgHover: 'rgba(255, 255, 255, 0.65)', bgActive: 'rgba(255, 255, 255, 0.80)' },
        success: { bg: 'rgba(187, 247, 208, 0.88)', content: '#14532d', border: 'rgba(255, 255, 255, 0.65)', bgHover: 'rgba(187, 247, 208, 1)', bgActive: 'rgba(134, 239, 172, 1)' },
        warning: { bg: 'rgba(254, 240, 138, 0.88)', content: '#713f12', border: 'rgba(255, 255, 255, 0.65)', bgHover: 'rgba(254, 240, 138, 1)', bgActive: 'rgba(253, 224, 71, 1)' },
        danger:  { bg: 'rgba(254, 202, 202, 0.88)', content: '#7f1d1d', border: 'rgba(255, 255, 255, 0.65)', bgHover: 'rgba(254, 202, 202, 1)', bgActive: 'rgba(252, 165, 165, 1)' },
        info:    { bg: 'rgba(186, 230, 253, 0.88)', content: '#0c4a6e', border: 'rgba(255, 255, 255, 0.65)', bgHover: 'rgba(186, 230, 253, 1)', bgActive: 'rgba(125, 211, 252, 1)' },
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
      sm: '10px',
      md: '14px',
      lg: '22px',
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
      flat: { boxShadow: 'none' },
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.50), 0 1px 4px rgba(15, 23, 42, 0.08)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 4px 12px rgba(15, 23, 42, 0.10)' },
      high: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.60), 0 8px 20px rgba(15, 23, 42, 0.14)' },
      overlay: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.65), 0 16px 32px rgba(15, 23, 42, 0.20)' },
    },
    typography: {
      family: {
        ui: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Helvetica, Arial, sans-serif',
        display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Helvetica, Arial, sans-serif',
        mono: '"SF Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
      },
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 700, lineHeight: '1.08', tracking: '-0.022em' },
        title:      { family: 'display', size: '1.875rem',weight: 600, lineHeight: '1.18', tracking: '-0.015em' },
        heading:    { family: 'display', size: '1.25rem', weight: 600, lineHeight: '1.3',  tracking: '-0.005em' },
        subheading: { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 500, lineHeight: '1.4',  tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
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
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'blur(4px)', md: 'blur(10px)', lg: 'blur(20px)' },
      focusRing: { width: '2px', offset: '2px', color: '#0ea5e9', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
    },
  },
}
