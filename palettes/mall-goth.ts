import type { Palette } from '../tokens/semantic.contract'

/**
 * Mall-goth — flat engine on a near-black field tuned for deep purple
 * and blood red. `surface.base` (`#0a0608`) is one shade off pure black;
 * `raised` (`#13090f`) lifts with a slight magenta-purple cast. The
 * accent is blood red (`#a01f2c` / `#c41e2f`) used for `link`,
 * `border.strong`, `border.focus`, and the `primary` intent — and the
 * `info` intent collapses to a deep violet rather than the usual blue
 * because mall-goth's color world doesn't admit a bright accent. Display
 * family is condensed (Cinzel / UnifrakturCook fallbacks → serif
 * blackletter) and tracking on labels/captions is pushed wide to mimic
 * gig-poster credits. `space.*` is one notch tighter than Flat / Classic
 * to crowd panels the way the aesthetic crowds the page.
 */
export const palette: Palette = {
  id: 'mall-goth',
  name: 'Mall-goth',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#0a0608',
        raised: '#13090f',
        sunken: '#050204',
        overlay: '#1a0d14',
        scrim: 'rgba(0, 0, 0, 0.88)',
      },
      content: {
        primary: '#e8d4dc',
        secondary: 'rgba(232, 212, 220, 0.72)',
        muted: 'rgba(232, 212, 220, 0.44)',
        inverse: '#0a0608',
        link: '#c41e2f',
      },
      border: {
        subtle: 'rgba(160, 31, 44, 0.20)',
        default: 'rgba(160, 31, 44, 0.50)',
        strong: '#a01f2c',
        focus: '#c41e2f',
      },
      intent: {
        primary: { bg: '#a01f2c', content: '#f5e3e8', border: '#6f1019', bgHover: '#8a1923', bgActive: '#6f1019' },
        neutral: { bg: '#1a0f17', content: '#e8d4dc', border: 'rgba(160, 31, 44, 0.40)', bgHover: '#22141e', bgActive: '#2a1b27' },
        success: { bg: '#3a5a32', content: '#e8d4dc', border: '#2a4324', bgHover: '#2f4828', bgActive: '#1f3019' },
        warning: { bg: '#7a5500', content: '#f5e3c0', border: '#5a3e00', bgHover: '#5e4200', bgActive: '#3d2a00' },
        danger:  { bg: '#5a0510', content: '#f5e3e8', border: '#3a020a', bgHover: '#440410', bgActive: '#2a0208' },
        info:    { bg: '#3a1c4a', content: '#e8d4dc', border: '#2a1238', bgHover: '#2e1640', bgActive: '#1d0d2a' },
      },
    },
    space: {
      '0': '0',
      '1': '2px',
      '2': '6px',
      '3': '10px',
      '4': '14px',
      '5': '20px',
      '6': '28px',
      '7': '40px',
      '8': '56px',
    },
    radius: {
      none: '0',
      sm: '2px',
      md: '3px',
      lg: '4px',
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
      low: { boxShadow: '0 1px 0 rgba(0, 0, 0, 0.80)' },
      medium: { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.70)' },
      high: { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(160, 31, 44, 0.30)' },
      overlay: { boxShadow: '0 16px 48px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(160, 31, 44, 0.55)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
        display: '"Cinzel", "UnifrakturCook", "Bodoni Moda", "Trajan Pro", "Times New Roman", serif',
        mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',
      },
      role: {
        display:    { family: 'display', size: '3.75rem', weight: 700, lineHeight: '0.95', tracking: '-0.01em' },
        title:      { family: 'display', size: '2.5rem',  weight: 700, lineHeight: '1.0',  tracking: '0' },
        heading:    { family: 'display', size: '1.5rem',  weight: 600, lineHeight: '1.2',  tracking: '0.01em' },
        subheading: { family: 'ui',      size: '0.9375rem', weight: 600, lineHeight: '1.3', tracking: '0.12em', textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '0.9375rem', weight: 400, lineHeight: '1.5',  tracking: '0.01em' },
        label:      { family: 'ui',      size: '0.75rem',   weight: 600, lineHeight: '1.3',  tracking: '0.14em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.6875rem', weight: 500, lineHeight: '1.4',  tracking: '0.10em', textTransform: 'uppercase' },
        code:       { family: 'mono',    size: '0.8125rem', weight: 400, lineHeight: '1.45', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '160ms',
        base: '280ms',
        slow: '440ms',
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
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#c41e2f', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
    },
  },
}
