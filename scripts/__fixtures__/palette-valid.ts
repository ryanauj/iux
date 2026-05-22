import type { Palette } from '../../tokens/semantic.contract'

/**
 * Fixture: a structurally-complete palette. `scripts/test-gates.ts` runs the
 * validator on this object and expects zero errors.
 */
export const palette: Palette = {
  id: 'fixture-valid',
  name: 'Fixture (valid)',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#ffffff',
        raised: '#ffffff',
        sunken: '#f5f5f5',
        overlay: '#ffffff',
        scrim: 'rgba(0,0,0,0.5)',
      },
      content: {
        primary: '#111111',
        secondary: '#444444',
        muted: '#777777',
        inverse: '#ffffff',
        link: '#1d4ed8',
      },
      border: {
        subtle: '#eeeeee',
        default: '#cccccc',
        strong: '#999999',
        focus: '#1d4ed8',
      },
      intent: {
        primary: { bg: '#1d4ed8', content: '#ffffff', border: '#1d4ed8', bgHover: '#1e40af', bgActive: '#1e3a8a' },
        neutral: { bg: '#eeeeee', content: '#111111', border: '#cccccc', bgHover: '#dddddd', bgActive: '#bbbbbb' },
        success: { bg: '#15803d', content: '#ffffff', border: '#166534', bgHover: '#166534', bgActive: '#14532d' },
        warning: { bg: '#b45309', content: '#ffffff', border: '#92400e', bgHover: '#92400e', bgActive: '#78350f' },
        danger:  { bg: '#b91c1c', content: '#ffffff', border: '#991b1b', bgHover: '#991b1b', bgActive: '#7f1d1d' },
        info:    { bg: '#0e7490', content: '#ffffff', border: '#155e75', bgHover: '#155e75', bgActive: '#164e63' },
      },
    },
    space: { '0': '0', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '24px', '6': '32px', '7': '48px', '8': '64px' },
    radius: { none: '0', sm: '4px', md: '6px', lg: '10px', pill: '999px', full: '9999px' },
    borderWidth: { '0': '0', hairline: '1px', thin: '1px', thick: '2px', heavy: '3px' },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
      medium: { boxShadow: '0 4px 6px rgba(0,0,0,0.08)' },
      high: { boxShadow: '0 10px 15px rgba(0,0,0,0.1)' },
      overlay: { boxShadow: '0 20px 25px rgba(0,0,0,0.12)' },
    },
    typography: {
      family: {
        ui: 'system-ui, sans-serif',
        display: 'system-ui, sans-serif',
        mono: 'ui-monospace, monospace',
      },
      role: {
        display:    { family: 'display', size: '2.5rem',   weight: 700, lineHeight: '1.1', tracking: '-0.02em' },
        title:      { family: 'display', size: '1.75rem',  weight: 700, lineHeight: '1.2', tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.25rem',  weight: 600, lineHeight: '1.3', tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.5', tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem', weight: 500, lineHeight: '1.4', tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4', tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5', tracking: '0' },
      },
    },
    motion: {
      duration: { instant: '0ms', fast: '120ms', base: '200ms', slow: '320ms' },
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
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#1d4ed8', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
    },
  },
}
