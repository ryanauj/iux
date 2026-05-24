import type { Palette } from '../tokens/semantic.contract'

/**
 * Frutiger Aero — Y2K / late-2000s OS register on the Glassmorphism
 * engine. The defining choice is a bright aqua-mint `surface.base`
 * (`#7ee2ce`) — the closest single color to the lime-aqua-cloud
 * gradient the era's wallpapers carried — paired with high-alpha
 * white `raised` surfaces that read as cloud over water. Radii are
 * pillowed (`sm 10 / md 14 / lg 22`) and `motion.easing.spring` is
 * bouncier than the standard glass spring, in keeping with the
 * optimistic register. `elevation.*` is gloss-forward like Aero but
 * uses a teal shadow (`rgba(11,74,64,…)`) instead of Vista's blue
 * so the panels feel lit from inside a tropical lagoon.
 */
export const palette: Palette = {
  id: 'frutiger-aero',
  name: 'Frutiger Aero',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#7ee2ce',
        raised: 'rgba(255, 255, 255, 0.55)',
        sunken: 'rgba(255, 255, 255, 0.32)',
        overlay: 'rgba(255, 255, 255, 0.72)',
        scrim: 'rgba(11, 74, 64, 0.42)',
      },
      content: {
        primary: '#08312a',
        secondary: 'rgba(8, 49, 42, 0.78)',
        muted: 'rgba(8, 49, 42, 0.55)',
        inverse: '#fdfffe',
        link: '#0e7490',
      },
      border: {
        subtle: 'rgba(255, 255, 255, 0.60)',
        default: 'rgba(255, 255, 255, 0.78)',
        strong: 'rgba(186, 255, 234, 0.92)',
        focus: '#06b6d4',
      },
      intent: {
        primary: { bg: 'rgba(56, 189, 248, 0.88)', content: '#082f49', border: 'rgba(255, 255, 255, 0.72)', bgHover: 'rgba(56, 189, 248, 0.98)', bgActive: 'rgba(14, 165, 233, 0.98)' },
        neutral: { bg: 'rgba(255, 255, 255, 0.55)', content: '#08312a', border: 'rgba(255, 255, 255, 0.72)', bgHover: 'rgba(255, 255, 255, 0.70)', bgActive: 'rgba(255, 255, 255, 0.84)' },
        success: { bg: 'rgba(134, 239, 172, 0.92)', content: '#14532d', border: 'rgba(255, 255, 255, 0.72)', bgHover: 'rgba(134, 239, 172, 1)', bgActive: 'rgba(74, 222, 128, 1)' },
        warning: { bg: 'rgba(253, 186, 116, 0.92)', content: '#7c2d12', border: 'rgba(255, 255, 255, 0.72)', bgHover: 'rgba(253, 186, 116, 1)', bgActive: 'rgba(251, 146, 60, 1)' },
        danger:  { bg: 'rgba(244, 114, 182, 0.92)', content: '#831843', border: 'rgba(255, 255, 255, 0.72)', bgHover: 'rgba(244, 114, 182, 1)', bgActive: 'rgba(236, 72, 153, 1)' },
        info:    { bg: 'rgba(165, 243, 252, 0.92)', content: '#083344', border: 'rgba(255, 255, 255, 0.72)', bgHover: 'rgba(165, 243, 252, 1)', bgActive: 'rgba(103, 232, 249, 1)' },
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
      flat: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.55)' },
      low: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.70), 0 2px 6px rgba(11, 74, 64, 0.18)' },
      medium: { boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.78), inset 0 -1px 0 rgba(11, 74, 64, 0.12), 0 6px 16px rgba(11, 74, 64, 0.22)' },
      high: { boxShadow: 'inset 0 2px 0 rgba(255, 255, 255, 0.82), inset 0 -2px 0 rgba(11, 74, 64, 0.16), 0 12px 26px rgba(11, 74, 64, 0.28)' },
      overlay: { boxShadow: 'inset 0 2px 0 rgba(255, 255, 255, 0.88), inset 0 -2px 0 rgba(11, 74, 64, 0.20), 0 20px 44px rgba(11, 74, 64, 0.36)' },
    },
    typography: {
      family: {
        ui: '"Frutiger", "Frutiger LT Std", "Myriad Pro", "Lucida Grande", "Helvetica Neue", Arial, sans-serif',
        display: '"Frutiger", "Frutiger LT Std", "Myriad Pro", "Lucida Grande", "Helvetica Neue", Arial, sans-serif',
        mono: '"Andale Mono", "Lucida Console", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Frutiger", "Frutiger LT Std", "Myriad Pro", "Lucida Grande", "Helvetica Neue", Arial, sans-serif',
        hand: '"Frutiger", "Frutiger LT Std", "Myriad Pro", "Lucida Grande", "Helvetica Neue", Arial, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 600, lineHeight: '1.1',  tracking: '-0.01em' },
        title:      { family: 'display', size: '1.875rem',weight: 600, lineHeight: '1.2',  tracking: '0' },
        heading:    { family: 'display', size: '1.25rem', weight: 600, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.4',  tracking: '0.01em' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.55', tracking: '0.01em' },
        label:      { family: 'ui',      size: '0.875rem',weight: 500, lineHeight: '1.4',  tracking: '0.02em' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '240ms',
        slow: '420ms',
      },
      easing: {
        standard: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.7, 0.55, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'blur(6px)', md: 'blur(14px)', lg: 'blur(26px)' },
      focusRing: { width: '2px', offset: '2px', color: '#06b6d4', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      // Aurora engine no-op signals. `atmosphereGradient: 'none'` and
      // `luminanceCenter: 'transparent'` mean the engine CSS that paints
      // the gradient and luminance glow at `.palette-root[data-palette^='aurora']`
      // doesn't paint here. `surfaceBy: 'border'` records that this palette
      // demarcates surfaces with a stroke (the default), not with light density.
      atmosphereGradient: 'none',
      luminanceCenter: 'transparent',
      surfaceBy: 'border',
    },
  },
}
