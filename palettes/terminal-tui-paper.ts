import type { Palette } from '../tokens/semantic.contract'

/**
 * Terminal / Paper — the daylight inversion of `terminal-tui`. Same
 * Terminal-TUI engine, same load-bearing character grid (`gridUnitX =
 * '1ch'`, `gridUnitY = '1lh'`, `borderStyle = 'character'`), same
 * mono-everything typography — but the soft near-black field flips to
 * warm paper and the warm near-white foreground flips to near-black
 * ink. It reads as a terminal session printed on paper, or a man-page
 * rendered to a light theme.
 *
 *   - `surface.*` is a warm paper field with very slight tonal steps
 *     between layers. As in the dark original, surfaces read by their
 *     box-drawing borders, not by fill.
 *   - `content.primary` is a warm near-black ink (`#1f1d18`); semantic
 *     colours are the DARKENED 700-level variants (`#15803d` green,
 *     `#a16207` amber, `#b91c1c` red, `#1d4ed8` blue) so they keep
 *     ≥ 4.5:1 against the paper instead of the bright tints the dark
 *     theme could afford.
 *   - `content.link` is the same blue that marks an interactive textual
 *     affordance.
 *   - Every `color.intent.*` keeps the TUI rule: the fill collapses to a
 *     faint neutral tint, the BORDER carries the semantic colour, and
 *     `content` carries the darkened semantic ink. Colour encodes state;
 *     the fill stays neutral.
 *   - `space.*`, `radius.*`, `borderWidth.*`, `motion.*` and the mono
 *     `typography.family.*` stack are identical to the dark original —
 *     only the colour layer changes.
 */
export const palette: Palette = {
  id: 'terminal-tui-paper',
  name: 'Terminal / Paper',
  engine: 'terminal-tui',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#f7f4ec',
        raised: '#f7f4ec',
        sunken: '#efe9dc',
        overlay: '#fbf9f3',
        scrim: 'rgba(40, 36, 28, 0.42)',
      },
      content: {
        primary: '#1f1d18',
        secondary: 'rgba(31, 29, 24, 0.74)',
        muted: 'rgba(31, 29, 24, 0.50)',
        inverse: '#f7f4ec',
        link: '#1d4ed8',
      },
      border: {
        subtle: 'rgba(31, 29, 24, 0.28)',
        default: 'rgba(31, 29, 24, 0.55)',
        strong: 'rgba(31, 29, 24, 0.78)',
        focus: '#1d4ed8',
      },
      intent: {
        primary: {
          bg: 'rgba(29, 78, 216, 0.08)',
          content: '#1f1d18',
          border: '#1d4ed8',
          bgHover: 'rgba(29, 78, 216, 0.14)',
          bgActive: 'rgba(29, 78, 216, 0.22)',
        },
        neutral: {
          bg: 'rgba(31, 29, 24, 0.05)',
          content: '#1f1d18',
          border: 'rgba(31, 29, 24, 0.55)',
          bgHover: 'rgba(31, 29, 24, 0.09)',
          bgActive: 'rgba(31, 29, 24, 0.14)',
        },
        success: {
          bg: 'rgba(21, 128, 61, 0.08)',
          content: '#15803d',
          border: '#15803d',
          bgHover: 'rgba(21, 128, 61, 0.14)',
          bgActive: 'rgba(21, 128, 61, 0.22)',
        },
        warning: {
          bg: 'rgba(161, 98, 7, 0.08)',
          content: '#a16207',
          border: '#a16207',
          bgHover: 'rgba(161, 98, 7, 0.14)',
          bgActive: 'rgba(161, 98, 7, 0.22)',
        },
        danger: {
          bg: 'rgba(185, 28, 28, 0.08)',
          content: '#b91c1c',
          border: '#b91c1c',
          bgHover: 'rgba(185, 28, 28, 0.14)',
          bgActive: 'rgba(185, 28, 28, 0.22)',
        },
        info: {
          bg: 'rgba(29, 78, 216, 0.07)',
          content: '#1d4ed8',
          border: '#1d4ed8',
          bgHover: 'rgba(29, 78, 216, 0.14)',
          bgActive: 'rgba(29, 78, 216, 0.22)',
        },
      },
    },
    space: {
      '0': '0',
      '1': '0.5ch',
      '2': '1ch',
      '3': '1.5ch',
      '4': '2ch',
      '5': '3ch',
      '6': '4ch',
      '7': '6ch',
      '8': '8ch',
    },
    radius: {
      none: '0',
      sm: '0',
      md: '0',
      lg: '0',
      pill: '0',
      full: '0',
    },
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '1px',
      thick: '1px',
      heavy: '2px',
    },
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: 'none' },
      medium: { boxShadow: 'none' },
      high: { boxShadow: 'none' },
      overlay: { boxShadow: 'none' },
    },
    typography: {
      family: {
        ui: '"Iosevka Term", "JetBrains Mono", "IBM Plex Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
        display: '"Iosevka Term", "JetBrains Mono", "IBM Plex Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
        mono: '"Iosevka Term", "JetBrains Mono", "IBM Plex Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
        pixel: '"Iosevka Term", "JetBrains Mono", "IBM Plex Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
        hand: '"Iosevka Term", "JetBrains Mono", "IBM Plex Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace',
      },
      role: {
        display:    { family: 'display', size: '1.5rem',    weight: 700, lineHeight: '1.2', tracking: '0' },
        title:      { family: 'display', size: '1.25rem',   weight: 700, lineHeight: '1.2', tracking: '0' },
        heading:    { family: 'display', size: '1rem',      weight: 700, lineHeight: '1.3', tracking: '0' },
        subheading: { family: 'ui',      size: '0.9375rem', weight: 700, lineHeight: '1.3', tracking: '0' },
        body:       { family: 'ui',      size: '0.875rem',  weight: 400, lineHeight: '1.5', tracking: '0' },
        label:      { family: 'ui',      size: '0.8125rem', weight: 700, lineHeight: '1.3', tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem',   weight: 400, lineHeight: '1.3', tracking: '0' },
        code:       { family: 'mono',    size: '0.875rem',  weight: 400, lineHeight: '1.5', tracking: '0' },
      },
    },
    motion: {
      duration: {
        instant: '0ms',
        fast: '40ms',
        base: '80ms',
        slow: '140ms',
      },
      easing: {
        standard: 'linear',
        in: 'linear',
        out: 'linear',
        inOut: 'linear',
        spring: 'linear',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      focusRing: { width: '1px', offset: '0', color: '#1d4ed8', style: 'solid' },
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
      gridUnitX: '1ch',
      gridUnitY: '1lh',
      borderStyle: 'character',
    },
  },
}
