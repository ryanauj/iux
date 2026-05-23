import type { Palette } from '../tokens/semantic.contract'

/**
 * Liquid Glass — Dark variant. Same Apple WWDC25 register as the light
 * sibling — softer `backdropBlur`, lighter shadows, refraction-tinted
 * hairlines — inverted to a near-black `surface.base`. White-tinted
 * `raised` alphas drop to 0.06–0.14 (vs the light variant's 0.28–0.68)
 * because the lower the base luminance, the less white you can layer in
 * before the panel reads as opaque grey rather than glass.
 */
export const palette: Palette = {
  id: 'liquid-glass-dark',
  name: 'Liquid Glass (Dark)',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#0f1218',
        raised: 'rgba(255, 255, 255, 0.06)',
        sunken: 'rgba(255, 255, 255, 0.03)',
        overlay: 'rgba(255, 255, 255, 0.10)',
        scrim: 'rgba(0, 0, 0, 0.50)',
      },
      content: {
        primary: '#f8fafc',
        secondary: 'rgba(248, 250, 252, 0.74)',
        muted: 'rgba(248, 250, 252, 0.48)',
        inverse: '#0f172a',
        link: '#7dd3fc',
      },
      border: {
        subtle: 'rgba(255, 255, 255, 0.08)',
        default: 'rgba(125, 211, 252, 0.20)',
        strong: 'rgba(125, 211, 252, 0.42)',
        focus: '#7dd3fc',
      },
      intent: {
        primary: { bg: 'rgba(125, 211, 252, 0.85)', content: '#0c4a6e', border: 'rgba(255, 255, 255, 0.32)', bgHover: 'rgba(125, 211, 252, 0.95)', bgActive: 'rgba(56, 189, 248, 0.95)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.08)', content: '#f8fafc', border: 'rgba(255, 255, 255, 0.18)', bgHover: 'rgba(255, 255, 255, 0.14)', bgActive: 'rgba(255, 255, 255, 0.22)' },
        success: { bg: 'rgba(134, 239, 172, 0.85)', content: '#052e16', border: 'rgba(255, 255, 255, 0.32)', bgHover: 'rgba(134, 239, 172, 0.95)', bgActive: 'rgba(74, 222, 128, 0.95)' },
        warning: { bg: 'rgba(253, 224, 71, 0.85)', content: '#422006', border: 'rgba(255, 255, 255, 0.32)', bgHover: 'rgba(253, 224, 71, 0.95)', bgActive: 'rgba(250, 204, 21, 0.95)' },
        danger:  { bg: 'rgba(252, 165, 165, 0.85)', content: '#450a0a', border: 'rgba(255, 255, 255, 0.32)', bgHover: 'rgba(252, 165, 165, 0.95)', bgActive: 'rgba(248, 113, 113, 0.95)' },
        info:    { bg: 'rgba(165, 243, 252, 0.85)', content: '#083344', border: 'rgba(255, 255, 255, 0.32)', bgHover: 'rgba(165, 243, 252, 0.95)', bgActive: 'rgba(103, 232, 249, 0.95)' },
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
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.10), 0 2px 6px rgba(0, 0, 0, 0.20)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 6px 16px rgba(0, 0, 0, 0.28)' },
      high: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.20), 0 12px 28px rgba(0, 0, 0, 0.36)' },
      overlay: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.26), 0 20px 44px rgba(0, 0, 0, 0.50)' },
    },
    typography: {
      family: {
        ui: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Helvetica, Arial, sans-serif',
        display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Helvetica, Arial, sans-serif',
        mono: '"SF Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Helvetica, Arial, sans-serif',
        hand: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Helvetica, Arial, sans-serif',
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
      focusRing: { width: '2px', offset: '2px', color: '#7dd3fc', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
    },
  },
}
