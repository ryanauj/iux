import type { Palette } from '../tokens/semantic.contract'

/**
 * Linear Workspace — Flat engine tuned for the modern productivity-SaaS
 * register the Linear.app / Height / Vercel-dashboard generation defined.
 * Near-white field with a cool grey tint, Linear-indigo primary, tight
 * UI density, Inter throughout, soft 1px hairline elevations. The
 * "calm productivity tool" aesthetic — no decoration, every pixel
 * load-bearing.
 *
 *   - `surface.base` is `#fbfbfc` (the cool off-white Linear uses for
 *     the app shell). `surface.raised` is pure white (`#ffffff`).
 *     `surface.sunken` drops to `#f4f4f6` for input wells.
 *   - `intent.primary.bg` is Linear's signature indigo (`#5e6ad2`) —
 *     the "Iris" purple-blue. `intent.info` is the canonical product
 *     blue (`#2563eb`); `intent.success` is mid-emerald (`#2d8a5f`);
 *     `intent.warning` is amber (`#c5710d`); `intent.danger` is a
 *     desaturated rose-red (`#d63a3a`).
 *   - `typography.family.*` is Inter throughout — display, body, ui all
 *     route to the same stack. The display weights climb to 700 for
 *     headings; body sits at 14px (`0.875rem`) so the productivity-tool
 *     density reads correctly.
 *   - `radius.*` follows modern SaaS norms (`sm = 4px / md = 6px / lg = 8px`)
 *     — softer than Swiss, tighter than Sage Studio.
 *   - `elevation.low` is a near-invisible 1 px hairline ring; `medium`
 *     adds a subtle cool-tinted drop shadow. The "popover that sits 4 px
 *     above the canvas" register, not the "card that lifts a paper-
 *     thickness" register.
 */
export const palette: Palette = {
  id: 'linear-workspace',
  name: 'Linear Workspace',
  engine: 'flat',
  a11y: 'pass',
  tokens: {
    color: {
      surface: {
        base: '#fbfbfc',
        raised: '#ffffff',
        sunken: '#f4f4f6',
        overlay: '#ffffff',
        scrim: 'rgba(17, 20, 27, 0.50)',
      },
      content: {
        primary: '#11141b',
        secondary: '#555a66',
        muted: '#8a8e98',
        inverse: '#ffffff',
        link: '#5e6ad2',
      },
      border: {
        subtle: '#ececef',
        default: '#d8d8dd',
        strong: '#11141b',
        focus: '#5e6ad2',
      },
      intent: {
        primary: { bg: '#5e6ad2', content: '#ffffff', border: '#4a55b8', bgHover: '#4a55b8', bgActive: '#3a449c' },
        neutral: { bg: '#f4f4f6', content: '#11141b', border: '#d8d8dd', bgHover: '#ececef', bgActive: '#d8d8dd' },
        success: { bg: '#2d8a5f', content: '#ffffff', border: '#22704b', bgHover: '#22704b', bgActive: '#185538' },
        warning: { bg: '#c5710d', content: '#ffffff', border: '#9c5808', bgHover: '#9c5808', bgActive: '#744106' },
        danger:  { bg: '#d63a3a', content: '#ffffff', border: '#b02a2a', bgHover: '#b02a2a', bgActive: '#871f1f' },
        info:    { bg: '#2563eb', content: '#ffffff', border: '#1e4ec0', bgHover: '#1e4ec0', bgActive: '#173b94' },
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
      sm: '4px',
      md: '6px',
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
      flat: { boxShadow: 'none' },
      low: { boxShadow: '0 0 0 1px rgba(17, 20, 27, 0.06)' },
      medium: { boxShadow: '0 1px 3px rgba(17, 20, 27, 0.06), 0 0 0 1px rgba(17, 20, 27, 0.06)' },
      high: { boxShadow: '0 8px 16px rgba(17, 20, 27, 0.10), 0 2px 4px rgba(17, 20, 27, 0.06)' },
      overlay: { boxShadow: '0 16px 32px rgba(17, 20, 27, 0.14), 0 6px 10px rgba(17, 20, 27, 0.06)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '2.5rem',  weight: 700, lineHeight: '1.1',  tracking: '-0.02em' },
        title:      { family: 'display', size: '1.75rem', weight: 700, lineHeight: '1.2',  tracking: '-0.015em' },
        heading:    { family: 'display', size: '1.25rem', weight: 600, lineHeight: '1.3',  tracking: '-0.005em' },
        subheading: { family: 'ui',      size: '0.9375rem',weight: 600, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '0.875rem',weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 500, lineHeight: '1.4',  tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4',  tracking: '0' },
        code:       { family: 'mono',    size: '0.8125rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
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
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#5e6ad2', style: 'solid' },
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
