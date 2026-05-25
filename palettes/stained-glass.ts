import type { Palette } from '../tokens/semantic.contract'

/**
 * Cathedral / Stained Glass — Flat engine tuned for the gothic-window
 * register. Lead-black field, saturated jewel-tone intents (cobalt, ruby,
 * emerald, amber, amethyst), heavy lead borders on every raised surface.
 * The first palette in the set whose `border.*` carries as much visual
 * load as `intent.*` — the lead came is the geometry, the colour is the
 * light coming through.
 *
 *   - `surface.base` is lead-black (`#0d0a14`) — the colour of oxidised
 *     lead came viewed against a dim narthex. `surface.raised` lifts
 *     one notch to `#16131e`; `surface.sunken` darkens to `#0a0810`.
 *   - `border.default` is `#2a2436` (visible lead at 2 px); `border.strong`
 *     is `#3e364e` (heavy lead at the cardinal joins). `borderWidth.thick`
 *     is `'3px'` so the lead reads as structural, not decorative.
 *   - Every intent is a saturated medieval-glass jewel tone with high-
 *     contrast inverse content. `intent.info` is cobalt (`#1f4ec8`),
 *     `success` is emerald (`#1f7a4a`), `warning` is amber (`#c4801a`),
 *     `danger` is ruby (`#a8221a`), `primary` is amethyst (`#6a2ea0`).
 *     The five-colour set evokes a Chartres-cathedral rose window; the
 *     desaturated `neutral` keeps the lead in the foreground when no
 *     intent is active.
 *   - `typography.family.display` is a gothic-feel serif (UnifrakturMaguntia
 *     pulls in too hard for digital reading, so Cinzel takes the slot at
 *     uppercase tracking for the high-ceremony register). `family.body`
 *     is Cormorant for long-form reading; `family.ui` is Inter for controls.
 *   - `radius.*` collapses to `'0' / '0' / '2px'` — leaded-glass joinery
 *     is straight cuts, never curves. `pill` stays for tags that need it.
 *   - A11y is `experimental`: the cobalt + ruby intents pass 3:1 against
 *     white inverse content at standard sizes but sit close to the floor;
 *     `intent.primary` (amethyst) is the most fragile. The README documents
 *     the constraint as the teaching example for "jewel tones look great
 *     and contrast-fail quietly."
 */
export const palette: Palette = {
  id: 'stained-glass',
  name: 'Cathedral / Stained Glass',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#0d0a14',
        raised: '#16131e',
        sunken: '#0a0810',
        overlay: '#16131e',
        scrim: 'rgba(4, 3, 8, 0.70)',
      },
      content: {
        primary: '#e8e2ee',
        secondary: '#bab2c6',
        muted: '#7e7588',
        inverse: '#ffffff',
        link: '#d8b042',
      },
      border: {
        subtle: '#1f1c28',
        default: '#2a2436',
        strong: '#3e364e',
        focus: '#d8b042',
      },
      intent: {
        primary: { bg: '#6a2ea0', content: '#ffffff', border: '#4e2278', bgHover: '#7c38b8', bgActive: '#4e2278' },
        neutral: { bg: '#1f1c28', content: '#e8e2ee', border: '#3e364e', bgHover: '#2a2436', bgActive: '#3e364e' },
        success: { bg: '#1f7a4a', content: '#ffffff', border: '#155a35', bgHover: '#155a35', bgActive: '#0e3f24' },
        warning: { bg: '#c4801a', content: '#ffffff', border: '#9a6212', bgHover: '#9a6212', bgActive: '#70470c' },
        danger:  { bg: '#a8221a', content: '#ffffff', border: '#811a14', bgHover: '#811a14', bgActive: '#5c120e' },
        info:    { bg: '#1f4ec8', content: '#ffffff', border: '#16399a', bgHover: '#16399a', bgActive: '#0e286e' },
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
      thin: '2px',
      thick: '3px',
      heavy: '4px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '0 0 0 1px #2a2436' },
      medium: { boxShadow: '0 4px 8px rgba(4, 3, 8, 0.55), 0 0 0 1px #2a2436' },
      high: { boxShadow: '0 10px 18px rgba(4, 3, 8, 0.65), 0 0 0 1px #2a2436' },
      overlay: { boxShadow: '0 20px 32px rgba(4, 3, 8, 0.75), 0 0 0 1px #3e364e' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Cinzel", "Cormorant Garamond", "Trajan Pro", "Georgia", serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
      },
      role: {
        display:    { family: 'display', size: '3rem',     weight: 600, lineHeight: '1.1',  tracking: '0.05em',  textTransform: 'uppercase' },
        title:      { family: 'display', size: '2.125rem', weight: 600, lineHeight: '1.2',  tracking: '0.04em',  textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.5rem',   weight: 500, lineHeight: '1.3',  tracking: '0.03em',  textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4',  tracking: '0.08em',  textTransform: 'uppercase' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.6',  tracking: '0' },
        label:      { family: 'ui',      size: '0.75rem',  weight: 600, lineHeight: '1.4',  tracking: '0.10em',  textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.4',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '140ms',
        base: '220ms',
        slow: '380ms',
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
      focusRing: { width: '3px', offset: '2px', color: '#d8b042', style: 'solid' },
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
