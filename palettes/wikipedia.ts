import type { Palette } from '../tokens/semantic.contract'

/**
 * Wikipedia / Institutional — Editorial register on the flat engine, tuned
 * for the "this is a reference, not a product" feel. White paper background,
 * Linux-Libertine-style serif on `display`, Liberation-Sans-style sans on
 * `body` (the MediaWiki Vector skin's exact split), the classic `#3366cc`
 * link/primary blue. Elevation collapses to a single hairline rule on
 * `overlay`. Zero marketing polish — borders draw the document, type does
 * the rest.
 */
export const palette: Palette = {
  id: 'wikipedia',
  name: 'Wikipedia / Institutional',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#ffffff',
        raised: '#ffffff',
        sunken: '#f8f9fa',
        overlay: '#ffffff',
        scrim: 'rgba(32, 33, 34, 0.55)',
      },
      content: {
        primary: '#202122',
        secondary: '#54595d',
        muted: '#72777d',
        inverse: '#ffffff',
        link: '#3366cc',
      },
      border: {
        subtle: '#eaecf0',
        default: '#c8ccd1',
        strong: '#a2a9b1',
        focus: '#3366cc',
      },
      intent: {
        primary: { bg: '#3366cc', content: '#ffffff', border: '#2a4b9b', bgHover: '#447ff5', bgActive: '#2a4b9b' },
        neutral: { bg: '#f8f9fa', content: '#202122', border: '#a2a9b1', bgHover: '#eaecf0', bgActive: '#c8ccd1' },
        success: { bg: '#14784f', content: '#ffffff', border: '#0e5739', bgHover: '#0e5739', bgActive: '#0a4029' },
        warning: { bg: '#7d4a00', content: '#ffffff', border: '#5c3700', bgHover: '#5c3700', bgActive: '#3d2400' },
        danger:  { bg: '#b32424', content: '#ffffff', border: '#8b1c1c', bgHover: '#8b1c1c', bgActive: '#661414' },
        info:    { bg: '#3366cc', content: '#ffffff', border: '#2a4b9b', bgHover: '#447ff5', bgActive: '#2a4b9b' },
      },
    },
    space: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '20px',
      '6': '28px',
      '7': '40px',
      '8': '56px',
    },
    radius: {
      none: '0',
      sm: '2px',
      md: '2px',
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
      flat: { boxShadow: 'none' },
      low: { boxShadow: 'none' },
      medium: { boxShadow: 'none' },
      high: { boxShadow: 'none' },
      overlay: { boxShadow: '0 0 0 1px #a2a9b1' },
    },
    typography: {
      family: {
        ui: '"Liberation Sans", "Helvetica Neue", Arial, Helvetica, sans-serif',
        display: '"Linux Libertine", "Linux Libertine O", "Libertinus Serif", Georgia, "Times New Roman", Times, serif',
        mono: '"Liberation Mono", "Courier New", ui-monospace, SFMono-Regular, monospace',
        pixel: '"Liberation Sans", "Helvetica Neue", Arial, Helvetica, sans-serif',
        hand: '"Liberation Sans", "Helvetica Neue", Arial, Helvetica, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '1.8rem',   weight: 400, lineHeight: '1.3', tracking: '0' },
        title:      { family: 'display', size: '1.8rem',   weight: 400, lineHeight: '1.3', tracking: '0' },
        heading:    { family: 'display', size: '1.5rem',   weight: 400, lineHeight: '1.3', tracking: '0' },
        subheading: { family: 'display', size: '1.2rem',   weight: 400, lineHeight: '1.4', tracking: '0' },
        body:       { family: 'ui',      size: '0.875rem', weight: 400, lineHeight: '1.6', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 700, lineHeight: '1.4', tracking: '0' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.5', tracking: '0' },
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
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '1px', color: '#3366cc', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
    },
  },
}
