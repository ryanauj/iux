import type { Palette } from '../tokens/semantic.contract'

/**
 * Cardstock (Layered) — every surface reads as a piece of cut cardstock
 * laid over another piece of cardstock. Pastel/muted field (sage,
 * butter, dusty rose, slate, cream); clean modern sans set as ink on
 * the paper; borders are the cut edge.
 *
 * Anchored on the new `cardstock` engine. The engine exercises two
 * contract slots no previous palette put to work:
 *
 *   - `effect.paperEdgeColor` — the cut-edge darker rule color.
 *   - `effect.paperEdgeWidth` — the thickness of that rule.
 *
 * The engine block in `src/styles.css` is intentionally thin: the
 * Cardstock metaphor is delivered by `elevation.*` directly. Each
 * elevation slot is a paired stack — an `inset -1px -1px 0` rule for
 * the bottom/right cut-edge thickness, plus a tight zero-blur drop
 * shadow for the gap to the layer below. No diffuse blooms, no glow,
 * no heavy spread. Cards float above cards quietly.
 *
 * The `--paper-edge-color` / `--paper-edge-width` vars exist as
 * engine-only signals — they document the same value baked into the
 * elevation stack, so future paper-aware components (a custom `Divider`
 * drawing a cut-edge between sections, a `PageBreak` faking torn paper)
 * can read the engine's intended edge directly without re-deriving it
 * from the shadow string.
 */
export const palette: Palette = {
  id: 'cardstock-layered',
  name: 'Cardstock (Layered)',
  engine: 'cardstock',
  a11y: 'experimental',
  tokens: {
    color: {
      // Cream paper field; raised surfaces brighter so cards read as a
      // fresh piece of cardstock laid over the page. Sunken is sage-
      // tinted cream — recessed wells (inputs, sub-panels) feel printed
      // ON the cardstock rather than separate from it. Scrim is slate
      // ink at 55% alpha so modal opens feel like a sheet falling on
      // the deck, not like the page itself dimming out.
      surface: {
        base: '#f5f0e2',
        raised: '#fbf7ec',
        sunken: '#ede7d5',
        overlay: '#fdfbf3',
        scrim: 'rgba(45, 53, 67, 0.55)',
      },
      // Clean modern sans set as ink on the paper. Slate ink for body
      // (~12:1 on raised cream — clears AAA), mid-slate for secondary,
      // dusty rose for the link accent so the call-to-action register
      // matches the muted palette without screaming.
      content: {
        primary: '#2d3543',
        secondary: '#566479',
        muted: '#8a93a3',
        inverse: '#fbf7ec',
        link: '#7d4a47',
      },
      // Borders are the cut edge — quiet, low-saturation, in the slate
      // / cream-darker family. `default` is the standard cut-edge that
      // cards consume via `--border-width-thick`; `strong` ramps to a
      // deeper slate for emphasis (focus targets, errored inputs).
      border: {
        subtle: '#e2d9c2',
        default: '#b8ad94',
        strong: '#6b6b5e',
        focus: '#7d4a47',
      },
      // Muted-pastel intent set — sage / cream / deeper-sage / butter /
      // dusty-rose / slate-blue. Each `border` is one luminance step
      // darker than its `bg` so the cut-edge of the intent button reads
      // as the same paper layer convention as everything else.
      intent: {
        primary: {
          bg: '#6b8a6b',
          content: '#fbf7ec',
          border: '#4f6e4f',
          bgHover: '#7b9a7b',
          bgActive: '#5a7a5a',
        },
        neutral: {
          bg: '#e8e0c9',
          content: '#2d3543',
          border: '#c5bba5',
          bgHover: '#d8d0b9',
          bgActive: '#b8ad94',
        },
        success: {
          bg: '#588558',
          content: '#fbf7ec',
          border: '#3f6b3f',
          bgHover: '#689568',
          bgActive: '#4a7a4a',
        },
        warning: {
          bg: '#c69a4e',
          content: '#2d3543',
          border: '#9a7838',
          bgHover: '#d6aa5e',
          bgActive: '#a8853e',
        },
        danger: {
          bg: '#a85a59',
          content: '#fbf7ec',
          border: '#7d4040',
          bgHover: '#b86a69',
          bgActive: '#904a49',
        },
        info: {
          bg: '#6b7b8c',
          content: '#fbf7ec',
          border: '#4d5b6c',
          bgHover: '#7b8b9c',
          bgActive: '#5d6d7e',
        },
      },
    },
    // Standard Flat-equivalent scale — cardstock layouts breathe at the
    // same step as the baseline. The paper metaphor doesn't ask for
    // more whitespace; the cut-edges already separate layers.
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
    // Cardstock can be cut square OR rounded with shears. `sm` / `md` /
    // `lg` are on a real scale so components asking for round corners
    // get them naturally. `pill` / `full` work too — a circle stencil
    // cut from cardstock is just a heavily-rounded card.
    radius: {
      none: '0',
      sm: '4px',
      md: '8px',
      lg: '14px',
      pill: '999px',
      full: '9999px',
    },
    // Border widths skew quiet. The cardstock metaphor's "thickness"
    // comes from the inset shadow in `elevation.*`, not from a fat
    // border line. `thick` (consumed by `iux-card`) is 2px — enough to
    // read as a cut edge without fighting the inset rule. `heavy` is
    // reserved for keyboard-focus emphasis on big panels.
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '1px',
      thick: '2px',
      heavy: '3px',
    },
    // Elevation is the engine's load-bearing token group. Each slot is
    // a paired stack:
    //
    //   1. `inset -Npx -Npx 0 rgba(slate, α)` — the cut-edge darker
    //      rule along bottom/right, painted INSIDE the surface. This
    //      gives the cardstock its visible "thickness." α grows with
    //      elevation: a higher layer reads as a slightly thicker piece
    //      of stock.
    //   2. `0 Mpx 0 rgba(slate, β)` — a tight zero-blur drop shadow
    //      offset down by M px, creating the gap to the layer below.
    //      No blur, no spread; a real piece of cardstock casts a hard
    //      close shadow on the surface it sits on.
    //
    // Shadows are tinted toward slate ink (`rgba(45, 53, 67, …)`)
    // rather than pure black — the paper-warm field would crush black
    // shadows visually. No glow, no diffuse shadows, no rim lighting.
    elevation: {
      flat: { boxShadow: 'none' },
      low: {
        boxShadow:
          'inset -1px -1px 0 rgba(45, 53, 67, 0.18), 0 1px 0 rgba(45, 53, 67, 0.08)',
      },
      medium: {
        boxShadow:
          'inset -1px -1px 0 rgba(45, 53, 67, 0.20), 0 2px 0 rgba(45, 53, 67, 0.10)',
      },
      high: {
        boxShadow:
          'inset -1px -1px 0 rgba(45, 53, 67, 0.22), 0 4px 0 rgba(45, 53, 67, 0.12)',
      },
      overlay: {
        boxShadow:
          'inset -2px -2px 0 rgba(45, 53, 67, 0.24), 0 8px 0 rgba(45, 53, 67, 0.14)',
      },
    },
    typography: {
      family: {
        // Clean modern sans throughout — type sits ON the paper, not
        // styled like paper itself. The brief is explicit: a sans
        // treated as ink. `pixel` and `hand` alias to the same stack so
        // the slots stay defined without becoming load-bearing.
        ui: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        pixel: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      // Standard role scale — no editorial-style serif display, no
      // tight uppercase tracking. The paper metaphor doesn't change
      // how type behaves, only what it sits on.
      role: {
        display:    { family: 'display', size: '2.5rem',  weight: 700, lineHeight: '1.1', tracking: '-0.02em' },
        title:      { family: 'display', size: '1.75rem', weight: 700, lineHeight: '1.2', tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.25rem', weight: 600, lineHeight: '1.3', tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',    weight: 600, lineHeight: '1.4', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 400, lineHeight: '1.5', tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 500, lineHeight: '1.4', tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 400, lineHeight: '1.4', tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 400, lineHeight: '1.5', tracking: '0' },
      },
    },
    // Motion is quiet. Slightly slower than Flat — paper takes a beat
    // to settle when it lands. No spring overshoot in the standard
    // easings; the spring slot keeps a small bounce-back for components
    // that explicitly opt into it.
    motion: {
      duration: {
        instant: '0ms',
        fast: '150ms',
        base: '220ms',
        slow: '340ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
      },
      decay: '0ms',
    },
    effect: {
      backdropBlur: { none: 'none', sm: 'none', md: 'none', lg: 'none' },
      // Focus ring is the dusty-rose accent — high enough chroma to
      // read against the muted field without breaking the pastel
      // register. `solid` style; the engine doesn't repaint focus.
      focusRing: { width: '2px', offset: '2px', color: '#7d4a47', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      // The engine signal. Components don't read these directly today
      // — the same color/width is baked into `elevation.*` because the
      // inset cut-edge is geometrically inseparable from the rest of
      // the shadow stack. The slots exist for future paper-aware
      // components, and document the intended edge so a reviewer can
      // see "this palette draws a 1px slate-ink rule along bottom/right"
      // without parsing the shadow string.
      paperEdgeColor: 'rgba(45, 53, 67, 0.18)',
      paperEdgeWidth: '1px',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      // Aurora engine no-op signals. `atmosphereGradient: 'none'` and
      // `luminanceCenter: 'transparent'` mean the engine CSS that paints
      // the gradient and luminance glow at `.palette-root[data-palette^='aurora']`
      // doesn't paint here. `surfaceBy: 'border'` records that this palette
      // demarcates surfaces with a stroke (the default), not with light density.
      atmosphereGradient: 'none',
      luminanceCenter: 'transparent',
      surfaceBy: 'border',
    },
  },
}
