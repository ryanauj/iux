import type { Palette } from '../tokens/semantic.contract'

/**
 * Arcane Vanguard — the futuristic-fantasy register on the glassmorphism
 * engine, in a luminous daylight read. Pale lilac field, translucent
 * violet-glass panels, an arcane-violet primary, and a rune-gold warning
 * — the "tech-meets-magic" palette of sci-fantasy shooters where energy
 * shields and spell glyphs share one HUD. Inspired by the light-magic
 * and ability HUDs of games like Destiny and Warframe rendered bright
 * and ceremonial rather than dark and cosmic.
 *
 *   lilac field:    #f8f6fd
 *   violet glass:   rgba(167, 139, 250, 0.12)
 *   arcane violet:  #8b5cf6  (primary / focus)
 *   rune gold:      #d9a014  (warning)
 *   rune green:     #10b981  (success)
 *   ink (text):     #241445
 */
export const palette: Palette = {
  id: 'arcane-vanguard',
  name: 'Arcane Vanguard',
  engine: 'glassmorphism',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f8f6fd',
        raised: 'rgba(167, 139, 250, 0.12)',
        sunken: 'rgba(49, 34, 82, 0.06)',
        overlay: 'rgba(255, 255, 255, 0.80)',
        scrim: 'rgba(30, 20, 50, 0.34)',
      },
      content: {
        primary: '#241445',
        secondary: 'rgba(36, 20, 69, 0.72)',
        muted: 'rgba(36, 20, 69, 0.50)',
        inverse: '#f8f6fd',
        link: '#7c3aed',
      },
      border: {
        subtle: 'rgba(124, 58, 237, 0.28)',
        default: 'rgba(124, 58, 237, 0.48)',
        strong: 'rgba(124, 58, 237, 0.70)',
        focus: '#8b5cf6',
      },
      intent: {
        primary: { bg: 'rgba(139, 92, 246, 0.46)', content: '#3b0764', border: '#8b5cf6', bgHover: 'rgba(139, 92, 246, 0.56)', bgActive: 'rgba(139, 92, 246, 0.66)' },
        neutral: { bg: 'rgba(49, 34, 82, 0.10)', content: '#241445', border: 'rgba(124, 58, 237, 0.32)', bgHover: 'rgba(49, 34, 82, 0.16)', bgActive: 'rgba(49, 34, 82, 0.22)' },
        success: { bg: 'rgba(16, 185, 129, 0.44)', content: '#064e3b', border: '#10b981', bgHover: 'rgba(16, 185, 129, 0.54)', bgActive: 'rgba(16, 185, 129, 0.64)' },
        warning: { bg: 'rgba(217, 160, 20, 0.48)', content: '#6b4a00', border: '#d9a014', bgHover: 'rgba(217, 160, 20, 0.58)', bgActive: 'rgba(217, 160, 20, 0.68)' },
        danger:  { bg: 'rgba(225, 29, 72, 0.46)', content: '#7a0f25', border: '#e11d48', bgHover: 'rgba(225, 29, 72, 0.56)', bgActive: 'rgba(225, 29, 72, 0.66)' },
        info:    { bg: 'rgba(79, 70, 229, 0.46)', content: '#312e81', border: '#4f46e5', bgHover: 'rgba(79, 70, 229, 0.56)', bgActive: 'rgba(79, 70, 229, 0.66)' },
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
      md: '6px',
      lg: '12px',
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(124, 58, 237, 0.24)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(124, 58, 237, 0.30), 0 1px 3px rgba(30, 20, 50, 0.08), 0 0 8px rgba(139, 92, 246, 0.10)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(124, 58, 237, 0.38), 0 4px 12px rgba(30, 20, 50, 0.10), 0 0 16px rgba(139, 92, 246, 0.12)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(124, 58, 237, 0.46), 0 8px 24px rgba(30, 20, 50, 0.12), 0 0 24px rgba(139, 92, 246, 0.14)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(124, 58, 237, 0.54), 0 24px 60px rgba(30, 20, 50, 0.20), 0 0 36px rgba(139, 92, 246, 0.16)' },
    },
    typography: {
      family: {
        ui: '"Exo 2", "Orbitron", "Inter", system-ui, sans-serif',
        display: '"Cinzel", "Exo 2", "Orbitron", "Inter", serif',
        mono: '"Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Exo 2", "Orbitron", "Inter", system-ui, sans-serif',
        hand: '"Exo 2", "Orbitron", "Inter", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.75rem',  weight: 600, lineHeight: '1.1',  tracking: '0.04em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.875rem', weight: 600, lineHeight: '1.2',  tracking: '0.04em', textTransform: 'uppercase' },
        heading:    { family: 'ui',      size: '1.25rem',  weight: 600, lineHeight: '1.3',  tracking: '0.04em', textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.45', tracking: '0.04em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.9375rem',weight: 400, lineHeight: '1.55', tracking: '0.01em' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 600, lineHeight: '1.4',  tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4',  tracking: '0.06em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0.03em' },
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
      backdropBlur: { none: 'none', sm: 'blur(4px)', md: 'blur(10px)', lg: 'blur(20px)' },
      focusRing: { width: '2px', offset: '2px', color: '#8b5cf6', style: 'glow' },
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
