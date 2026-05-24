import type { Palette } from '../tokens/semantic.contract'

/**
 * Graffiti / Marble — Flat engine paired with the marble overlay from
 * `marble-royal-flat` and a graffiti display font on `family.display`.
 * The deliberately confrontational palette: gallery-marble surfaces
 * under fluorescent spray-paint accents and a Permanent Marker display
 * face. The two references — museum plinth and street tag — never blend;
 * they collide. Ships `experimental` because the fluorescent accents
 * only pass AA against black inverse content, which is documented as
 * the intentional contrast trap that gives the palette its teaching
 * value (see README).
 *
 *   - `surface.base` is a cool grey marble fallback (`#e8e6e3`); the
 *     marble pattern is delivered at the palette root via
 *     `effect.overlay.image` — the same stacked-gradient procedural
 *     texture Marble Royal Flat ships, so the two palettes share the
 *     same overlay recipe. `surface.raised` brightens to `#f2f0ec`.
 *   - `intent.primary.bg` is fluorescent magenta `#ff2dad` with **black**
 *     inverse content (`#0a0a0a`) — magenta + white falls below AA, so
 *     the palette pins black on the saturated accent. `intent.warning.bg`
 *     is fluorescent lime `#c6ff00` with the same black inverse.
 *     `intent.danger` is a saturated graffiti red (`#ff1f3a`).
 *   - `typography.family.display` is Permanent Marker / Bungee — a
 *     spray-paint webfont that carries its tagged edge variation natively.
 *     `family.body` is Inter for legibility: the contrast between the
 *     vandal-display and the legible-body is the palette's point. The
 *     concept doc flagged a possible new `effect.spray.*` engine slot;
 *     it's not needed here because the display font does the work.
 *   - `elevation.*` keeps the Flat / Classic soft drop shadow recipe
 *     with a warmer tint (`rgba(60, 40, 20, 0.12)` at `low`), so cards
 *     sit on the marble like vandalised plaques.
 *   - `effect.overlay.image` is the same procedural marble used by
 *     palette `marble-royal-flat`; `blend: 'multiply'` keeps cards'
 *     brighter `surface.raised` punching through.
 *   - **A11y caveat (documented, intentional):** `intent.primary.content`
 *     is black not white. If a component wires `onPrimary` to white
 *     anywhere it will fail AA on the fluorescent fill. The mismatch is
 *     the teaching example: the palette is a contrast trap that documents
 *     itself — the README's a11y section enumerates the exact contrast
 *     ratios.
 */
export const palette: Palette = {
  id: 'graffiti-marble',
  name: 'Graffiti / Marble',
  engine: 'flat',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#e8e6e3',
        raised: '#f2f0ec',
        sunken: '#d8d5d0',
        overlay: '#f5f3ef',
        scrim: 'rgba(20, 10, 30, 0.52)',
      },
      content: {
        primary: '#0a0a0a',
        secondary: '#3a3a3a',
        muted: '#6a6a6a',
        inverse: '#0a0a0a',
        link: '#ff2dad',
      },
      border: {
        subtle: 'rgba(60, 40, 20, 0.14)',
        default: 'rgba(60, 40, 20, 0.28)',
        strong: '#0a0a0a',
        focus: '#ff2dad',
      },
      intent: {
        primary: { bg: '#ff2dad', content: '#0a0a0a', border: '#c8208a', bgHover: '#e0269a', bgActive: '#a81a72' },
        neutral: { bg: '#d8d5d0', content: '#0a0a0a', border: 'rgba(60, 40, 20, 0.28)', bgHover: '#c9c5be', bgActive: '#b6b1a8' },
        success: { bg: '#1fa84a', content: '#0a0a0a', border: '#178038', bgHover: '#178038', bgActive: '#0f5e28' },
        warning: { bg: '#c6ff00', content: '#0a0a0a', border: '#9cc800', bgHover: '#a8d400', bgActive: '#80a400' },
        danger:  { bg: '#ff1f3a', content: '#0a0a0a', border: '#c8182d', bgHover: '#e01a32', bgActive: '#a81325' },
        info:    { bg: '#2dafff', content: '#0a0a0a', border: '#208ac8', bgHover: '#269ae0', bgActive: '#1a72a8' },
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
      sm: '4px',
      md: '6px',
      lg: '10px',
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
      low: { boxShadow: '0 1px 2px rgba(60, 40, 20, 0.12)' },
      medium: { boxShadow: '0 4px 8px rgba(60, 40, 20, 0.14), 0 2px 4px rgba(60, 40, 20, 0.06)' },
      high: { boxShadow: '0 10px 20px rgba(60, 40, 20, 0.18), 0 4px 8px rgba(60, 40, 20, 0.08)' },
      overlay: { boxShadow: '0 24px 40px rgba(60, 40, 20, 0.26), 0 12px 16px rgba(60, 40, 20, 0.12)' },
    },
    typography: {
      family: {
        ui: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        display: '"Permanent Marker", "Bungee", "Bungee Spice", "Impact", "Anton", "Oswald", sans-serif',
        mono: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace',
        pixel: '"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif',
        hand: '"Permanent Marker", "Bungee", "Caveat", "Patrick Hand", cursive',
      },
      role: {
        display:    { family: 'display', size: '3.5rem',  weight: 400, lineHeight: '1',    tracking: '0.01em',  textTransform: 'uppercase' },
        title:      { family: 'display', size: '2.5rem',  weight: 400, lineHeight: '1.05', tracking: '0.01em',  textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.625rem',weight: 400, lineHeight: '1.15', tracking: '0.01em',  textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1rem',    weight: 700, lineHeight: '1.4',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem',weight: 700, lineHeight: '1.4', tracking: '0.06em', textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.8125rem',weight: 400, lineHeight: '1.4', tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5',  tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '120ms',
        base: '200ms',
        slow: '320ms',
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
      focusRing: { width: '3px', offset: '2px', color: '#ff2dad', style: 'solid' },
      overlay: {
        image:
          'radial-gradient(ellipse 80% 30% at 22% 18%, rgba(156, 122, 43, 0.10) 0%, transparent 60%), ' +
          'radial-gradient(ellipse 60% 40% at 78% 64%, rgba(156, 122, 43, 0.08) 0%, transparent 55%), ' +
          'radial-gradient(ellipse 40% 50% at 50% 100%, rgba(60, 40, 20, 0.06) 0%, transparent 70%), ' +
          'radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.20) 0%, transparent 40%), ' +
          'radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.16) 0%, transparent 45%)',
        size: '720px 720px',
        blend: 'multiply',
      },
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
