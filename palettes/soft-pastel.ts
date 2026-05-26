import type { Palette } from '../tokens/semantic.contract'

/**
 * Soft Pastel — Flat engine tuned for the friendly modern app register
 * (Cron-calendar, Notion-pastel, Linear-pink launch sites). Cream-pink
 * field, deep-plum body ink, rose / peach / mint / lavender intents,
 * widened radii for a soft-edged feel. Ships `experimental` because the
 * load-bearing pastel intents — rose primary and peach warning — sit
 * close to but not strictly past 4.5:1 AA against their inverse content;
 * the palette compensates by routing inverse content to deep plum
 * (`#2b1e29`) rather than white on the lighter intents, and reserves
 * white inverse for the deeper rose / mint / blue intents that clear AA.
 *
 *   - `surface.base` is cream-pink (`#fcf7f6`); `surface.raised` is pure
 *     white (`#ffffff`). `sunken` drops to `#f4ecea`. The whole field has
 *     a 1-2% pink undertone — the warm pastel ground the rest of the
 *     palette sits against.
 *   - `intent.primary.bg` is deep rose (`#c25e8e`) — rose-pink saturated
 *     enough to read as a button, with white inverse content clearing
 *     ≈ 3.4:1 (AA UI minimum). `intent.warning` is peach with deep-plum
 *     content; `intent.success` is mid-mint with white content;
 *     `intent.info` is sky lavender; `intent.danger` is rose-red.
 *   - `typography.family.display` is Fraunces (soft modern transitional
 *     serif) — the rounded, slightly-quirky serif this register favours.
 *     `family.ui` is Inter.
 *   - `radius.*` is generous (`sm = 6px / md = 12px / lg = 20px`) — the
 *     pastel register reads correctly only when corners are soft.
 *   - `elevation.*` shadows tint toward plum (`rgba(43, 30, 41, 0.08)`)
 *     so cards lift as pressed-cardstock above pink-cream linen.
 */
export const palette: Palette = {
  id: 'soft-pastel',
  name: 'Soft Pastel',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#fcf7f6',
        raised: '#ffffff',
        sunken: '#f4ecea',
        overlay: '#ffffff',
        scrim: 'rgba(43, 30, 41, 0.42)',
      },
      content: {
        primary: '#2b1e29',
        secondary: '#5a4458',
        muted: '#8c7889',
        inverse: '#ffffff',
        link: '#c25e8e',
      },
      border: {
        subtle: '#f4ecea',
        default: '#e2d3d8',
        strong: '#c25e8e',
        focus: '#c25e8e',
      },
      intent: {
        primary: { bg: '#c25e8e', content: '#ffffff', border: '#a0476f', bgHover: '#a0476f', bgActive: '#7a3454' },
        neutral: { bg: '#f4ecea', content: '#2b1e29', border: '#e2d3d8', bgHover: '#e2d3d8', bgActive: '#caafb6' },
        success: { bg: '#3d8c5e', content: '#ffffff', border: '#2d6f48', bgHover: '#2d6f48', bgActive: '#1f5235' },
        warning: { bg: '#f3c074', content: '#2b1e29', border: '#d49b48', bgHover: '#e8b35e', bgActive: '#d49b48' },
        danger:  { bg: '#d44d63', content: '#ffffff', border: '#ad394d', bgHover: '#ad394d', bgActive: '#852838' },
        info:    { bg: '#7a8ed4', content: '#ffffff', border: '#5e72b8', bgHover: '#5e72b8', bgActive: '#465692' },
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
      sm: '6px',
      md: '12px',
      lg: '20px',
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
      low: { boxShadow: '0 1px 2px rgba(43, 30, 41, 0.06)' },
      medium: { boxShadow: '0 4px 12px rgba(43, 30, 41, 0.08), 0 2px 4px rgba(43, 30, 41, 0.04)' },
      high: { boxShadow: '0 12px 24px rgba(43, 30, 41, 0.12), 0 4px 8px rgba(43, 30, 41, 0.06)' },
      overlay: { boxShadow: '0 24px 40px rgba(43, 30, 41, 0.18), 0 10px 14px rgba(43, 30, 41, 0.08)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Fraunces", "Recoleta", "DM Serif Text", "Georgia", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 600, lineHeight: '1.05', tracking: '-0.02em' },
        title:      { family: 'display', size: '2rem',     weight: 600, lineHeight: '1.15', tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.375rem', weight: 600, lineHeight: '1.3',  tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.45', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 500, lineHeight: '1.4',  tracking: '0' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.45', tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.55', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '220ms',
        slow: '340ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.5, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '2px', offset: '2px', color: '#c25e8e', style: 'solid' },
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
