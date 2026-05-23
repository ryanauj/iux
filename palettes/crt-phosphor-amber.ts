import type { Palette } from '../tokens/semantic.contract'

/**
 * CRT / Phosphor (Amber) — the "easier on the eyes" amber-screen variant
 * that DEC VT220s and Wyse terminals shipped as an alternative to green.
 * Same engine as the green palette: scanline overlay, phosphor glow,
 * phosphor-decay motion regime — only the single phosphor color changes.
 *
 * That same-engine / different-token relationship is what
 * `FINALIZED-PALETTES.md` calls Group B: proving the engine generalizes
 * by shipping the next plausible config alongside the canonical one.
 */
export const palette: Palette = {
  id: 'crt-phosphor-amber',
  name: 'CRT / Phosphor (Amber)',
  engine: 'crt-phosphor',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#0a0500',
        raised: '#180c02',
        sunken: '#0c0700',
        overlay: '#1f1004',
        scrim: 'rgba(10, 5, 0, 0.82)',
      },
      content: {
        primary: '#ffb347',
        secondary: 'rgba(255, 179, 71, 0.74)',
        muted: 'rgba(255, 179, 71, 0.44)',
        inverse: '#0a0500',
        link: '#ffc97a',
      },
      border: {
        subtle: 'rgba(255, 179, 71, 0.18)',
        default: 'rgba(255, 179, 71, 0.34)',
        strong: 'rgba(255, 179, 71, 0.58)',
        focus: '#ffb347',
      },
      intent: {
        primary: {
          bg: 'rgba(255, 179, 71, 0.16)',
          content: '#ffd9a0',
          border: '#ffb347',
          bgHover: 'rgba(255, 179, 71, 0.26)',
          bgActive: 'rgba(255, 179, 71, 0.38)',
        },
        neutral: {
          bg: 'rgba(255, 179, 71, 0.06)',
          content: '#ffb347',
          border: 'rgba(255, 179, 71, 0.24)',
          bgHover: 'rgba(255, 179, 71, 0.12)',
          bgActive: 'rgba(255, 179, 71, 0.20)',
        },
        success: {
          bg: 'rgba(255, 179, 71, 0.22)',
          content: '#ffd9a0',
          border: '#ffb347',
          bgHover: 'rgba(255, 179, 71, 0.32)',
          bgActive: 'rgba(255, 179, 71, 0.44)',
        },
        warning: {
          bg: 'rgba(255, 179, 71, 0.14)',
          content: '#ffb347',
          border: 'rgba(255, 179, 71, 0.62)',
          bgHover: 'rgba(255, 179, 71, 0.22)',
          bgActive: 'rgba(255, 179, 71, 0.30)',
        },
        danger: {
          bg: 'rgba(255, 179, 71, 0.10)',
          content: '#ffb347',
          border: 'rgba(255, 179, 71, 0.85)',
          bgHover: 'rgba(255, 179, 71, 0.18)',
          bgActive: 'rgba(255, 179, 71, 0.28)',
        },
        info: {
          bg: 'rgba(255, 179, 71, 0.10)',
          content: '#ffb347',
          border: 'rgba(255, 179, 71, 0.40)',
          bgHover: 'rgba(255, 179, 71, 0.16)',
          bgActive: 'rgba(255, 179, 71, 0.24)',
        },
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
      lg: '2px',
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
      flat: { boxShadow: 'inset 0 0 0 1px rgba(255, 179, 71, 0.20)' },
      low: { boxShadow: 'inset 0 0 0 1px rgba(255, 179, 71, 0.28), 0 0 6px rgba(255, 179, 71, 0.20)' },
      medium: { boxShadow: 'inset 0 0 0 1px rgba(255, 179, 71, 0.38), 0 0 14px rgba(255, 179, 71, 0.28)' },
      high: { boxShadow: 'inset 0 0 0 1px rgba(255, 179, 71, 0.50), 0 0 24px rgba(255, 179, 71, 0.36)' },
      overlay: { boxShadow: 'inset 0 0 0 1px rgba(255, 179, 71, 0.62), 0 0 40px rgba(255, 179, 71, 0.42), 0 24px 60px rgba(10, 5, 0, 0.70)' },
    },
    typography: {
      family: {
        ui: '"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
        display: '"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
        mono: '"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
        hand: '"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace',
      },
      role: {
        display:    { family: 'display', size: '2.5rem',   weight: 400, lineHeight: '1.1', tracking: '0.04em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '1.75rem',  weight: 400, lineHeight: '1.2', tracking: '0.04em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.25rem',  weight: 400, lineHeight: '1.3', tracking: '0.04em', textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.4', tracking: '0.04em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.5', tracking: '0.02em' },
        label:      { family: 'ui',      size: '0.875rem', weight: 400, lineHeight: '1.4', tracking: '0.10em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4', tracking: '0.08em', textTransform: 'uppercase' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5', tracking: '0.05em' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '100ms',
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
      decay: '80ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '1px', offset: '2px', color: '#ffb347', style: 'glow' },
      overlay: {
        image: 'repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0.35) 1px, rgba(0, 0, 0, 0.35) 2px), repeating-linear-gradient(to bottom, rgba(255, 179, 71, 0) 0, rgba(255, 179, 71, 0) 3px, rgba(255, 179, 71, 0.04) 3px, rgba(255, 179, 71, 0.04) 4px)',
        size: 'auto',
        blend: 'screen',
      },
      glow: {
        radius: '6px',
        color: 'rgba(255, 179, 71, 0.65)',
        intensity: 0.7,
      },
      pixelGrid: '0',
      strokeVariance: '0',
    },
  },
}
