import type { Palette } from '../tokens/semantic.contract'

/**
 * Terminal-TUI — the engine that treats the character grid as a design
 * token. Layout snaps to integer character cells (`--grid-unit-x = '1ch'`,
 * `--grid-unit-y = '1lh'`), every raised surface renders its outline with
 * box-drawing glyphs instead of CSS borders (`--border-style: character`),
 * and every role of typography stays on monospace.
 *
 * The engine shares DNA with CRT / Phosphor — same mono-on-dark aesthetic
 * roots — but solves a different problem. CRT is nostalgic: the scanline
 * overlay and phosphor glow exist to make the screen look like a vacuum
 * tube. TUI is functional: the character grid exists because terminal
 * applications are dense, keyboard-driven, and don't want anything
 * decorative competing with the data. There is no glow, no scanline, no
 * decay regime. Just cells and characters.
 *
 *   - `surface.*` is a soft near-black field with very slight tonal
 *     differentiation between layers. Surfaces don't rely on fills to
 *     read — they rely on box-drawing borders.
 *   - `content.primary` is a warm near-white (`#e8e6e3`) — the default
 *     terminal foreground in most modern emulators. Semantic colors
 *     (`#ff6b6b` red for errors, `#ffd23f` amber for warnings, `#51cf66`
 *     green for success) are reserved for text that needs to carry
 *     meaning; everything else stays monochrome.
 *   - `content.link` is a fourth semantic color (`#74c0fc` blue) — the
 *     only decorative-looking slot that's actually carrying meaning
 *     (it marks an interactive textual affordance).
 *   - Every `color.intent.*` collapses fills to a single light tonal
 *     tint of the monochrome base. The intent's BORDER carries the
 *     semantic color (red, amber, green, blue, neutral grey). This is
 *     the TUI rule: color encodes state, the fill stays neutral.
 *   - `space.*` is anchored to character cells. `1` = `0.5ch`, `2` = `1ch`,
 *     `3` = `1.5ch`, etc. Components composing through `space.*` land on
 *     half-cell grid; the engine's character-border decoration consumes
 *     a full cell.
 *   - `radius.*` is all `'0'`. Terminal applications don't round corners.
 *   - `borderWidth.*` is `'1px'` for `hairline`/`thin`/`thick` — the box-
 *     drawing glyphs `─` and `│` render as 1px lines in any modern
 *     monospace font, so the engine's CSS-border edges (drawn on
 *     non-corner sides) align with the character corners pixel-for-pixel.
 *     `heavy` is `'2px'` for cases that want to read as a heavier rule
 *     (using `═` / `║` semantics, conceptually).
 *   - `typography.family.*` aliases EVERY family slot to the same mono
 *     stack. The font choice is load-bearing: `Iosevka Term` is the
 *     primary (a free, open-licensed monospace tuned for terminals);
 *     fallbacks chain through other free monos (`JetBrains Mono`,
 *     `IBM Plex Mono`, `Fira Code`) and OS defaults. The engine bundles
 *     `IBM Plex Mono` via the same Google Fonts CDN pattern as the
 *     other engines that need a load-bearing typeface; if Iosevka isn't
 *     present locally, the chain falls back to it.
 *   - `motion.*` is fast and linear. Terminals snap; they don't ease.
 *     Durations are `0ms`/`40ms`/`80ms`/`140ms` and every easing slot
 *     collapses to `linear`. No `decay` (that's the CRT regime).
 *   - `effect.borderStyle = 'character'` is the engine's load-bearing
 *     contract addition. Components that read it via container style
 *     queries (Card, Modal, Table) render their borders as four corner
 *     glyphs at the corners and CSS line strokes between them.
 *   - `effect.gridUnitX = '1ch'` and `gridUnitY = '1lh'` pin layout to
 *     character cells. Engine block in `src/styles.css` reads these to
 *     align padding and corner-glyph positions.
 *
 * The contrast envelope: `#e8e6e3` body text on `#0c0e10` lands at ~16:1,
 * the semantic red / amber / green / blue land at ~5–8:1, and every
 * border stays at ≥ 3:1 against the surface — AAA on body, AA on
 * decorative chrome.
 *
 * Tagged `experimental` because the character-grid border requires a
 * monospace font available client-side AND a browser that honours
 * `@container style()` queries — see the palette README for the full
 * support matrix.
 */
export const palette: Palette = {
  id: 'terminal-tui',
  name: 'Terminal / TUI',
  engine: 'terminal-tui',
  a11y: 'experimental',
  tokens: {
    color: {
      surface: {
        base: '#0c0e10',
        raised: '#0c0e10',
        sunken: '#08090b',
        overlay: '#101317',
        scrim: 'rgba(8, 9, 11, 0.86)',
      },
      content: {
        primary: '#e8e6e3',
        secondary: 'rgba(232, 230, 227, 0.78)',
        muted: 'rgba(232, 230, 227, 0.48)',
        inverse: '#0c0e10',
        link: '#74c0fc',
      },
      border: {
        subtle: 'rgba(232, 230, 227, 0.22)',
        default: 'rgba(232, 230, 227, 0.46)',
        strong: 'rgba(232, 230, 227, 0.72)',
        focus: '#74c0fc',
      },
      intent: {
        primary: {
          bg: 'rgba(116, 192, 252, 0.10)',
          content: '#e8e6e3',
          border: '#74c0fc',
          bgHover: 'rgba(116, 192, 252, 0.18)',
          bgActive: 'rgba(116, 192, 252, 0.28)',
        },
        neutral: {
          bg: 'rgba(232, 230, 227, 0.06)',
          content: '#e8e6e3',
          border: 'rgba(232, 230, 227, 0.46)',
          bgHover: 'rgba(232, 230, 227, 0.10)',
          bgActive: 'rgba(232, 230, 227, 0.18)',
        },
        success: {
          bg: 'rgba(81, 207, 102, 0.10)',
          content: '#51cf66',
          border: '#51cf66',
          bgHover: 'rgba(81, 207, 102, 0.18)',
          bgActive: 'rgba(81, 207, 102, 0.28)',
        },
        warning: {
          bg: 'rgba(255, 210, 63, 0.10)',
          content: '#ffd23f',
          border: '#ffd23f',
          bgHover: 'rgba(255, 210, 63, 0.18)',
          bgActive: 'rgba(255, 210, 63, 0.28)',
        },
        danger: {
          bg: 'rgba(255, 107, 107, 0.10)',
          content: '#ff6b6b',
          border: '#ff6b6b',
          bgHover: 'rgba(255, 107, 107, 0.18)',
          bgActive: 'rgba(255, 107, 107, 0.28)',
        },
        info: {
          bg: 'rgba(116, 192, 252, 0.08)',
          content: '#74c0fc',
          border: '#74c0fc',
          bgHover: 'rgba(116, 192, 252, 0.16)',
          bgActive: 'rgba(116, 192, 252, 0.26)',
        },
      },
    },
    // Spacing anchored to character cells. `2` = `1ch` (one cell), `4` =
    // `2ch` (two cells), `6` = `3ch`. Components composing through
    // `space.*` land on half-cell boundaries; the character-border
    // decoration consumes a full cell separately.
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
        // Mono everywhere — the font choice is load-bearing. The engine
        // chains through `IBM Plex Mono` and other free monos before
        // falling back to OS monospaced defaults. `Iosevka Term` leads
        // the chain because it's tuned for terminal applications (denser
        // x-height, narrower glyphs) — present locally on developer
        // machines and as a free OFL face anyone can install.
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
      // Terminals snap. No easing curves, no decay regime — every
      // transition is linear and either zero or a small handful of ms.
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
      // Focus ring uses the link-blue accent — the same color that
      // marks interactive textual affordances. `solid` style; width is
      // the same 1px as every other border on the engine, so focus
      // reads as "the box edge changed color" rather than as a halo.
      focusRing: { width: '1px', offset: '0', color: '#74c0fc', style: 'solid' },
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
      // Terminal-TUI load-bearing additions. `gridUnitX = '1ch'` and
      // `gridUnitY = '1lh'` pin component layout to integer character
      // cells; engine block in `src/styles.css` reads these to align
      // padding and corner-glyph positions.
      gridUnitX: '1ch',
      gridUnitY: '1lh',
      // The borderStyle signal — components branch on this via container
      // style queries to switch from CSS borders to box-drawing
      // characters. The most load-bearing contract addition in the TUI
      // engine; every other palette declares `'css'` to opt out.
      borderStyle: 'character',
    },
  },
}
