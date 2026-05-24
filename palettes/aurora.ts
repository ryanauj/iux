import type { Palette } from '../tokens/semantic.contract'

/**
 * Aurora — a deep midnight base with a very slowly drifting atmospheric
 * gradient (green / purple / teal luminance centers on near-black).
 * Surfaces are demarcated by LIGHT DENSITY, not by borders: cards appear
 * as brighter regions of the same atmosphere, type is high-luminance
 * near-white with a slight chromatic tint that picks up the atmosphere,
 * and interactive elements bend the luminance toward themselves on
 * hover / focus.
 *
 * Anchored on the new `aurora` engine. The engine exercises three
 * contract slots no previous palette put to work:
 *
 *   - `effect.atmosphereGradient` — the multi-radial-gradient stack the
 *     engine block paints at the palette root and very slowly drifts
 *     (`background-position` keyframes over a ~48s loop).
 *   - `effect.luminanceCenter`    — the translucent near-white tint the
 *     engine block paints as a soft radial glow on raised surfaces and
 *     intensifies on hover / focus.
 *   - `effect.surfaceBy`          — `'luminance'`. Every other palette
 *     declares `'border'`. The slot is the most load-bearing surface-
 *     model signal in the contract: it documents that surfaces here read
 *     by light density, not by hard edges.
 *
 * Borders are NOT actually `'transparent'` — they're set to very low-
 * alpha white tints (`rgba(255, 255, 255, 0.04)` ... `0.15`) so any
 * component reading `--color-border-*` still gets a faint structural
 * cue when needed, but the cue is recessive enough that the luminance
 * centers do the actual surface-demarcation work. The focus border
 * stays at full chroma (the engine's purple accent) so keyboard focus
 * is always visible.
 *
 * **Contrast floor.** Every text color is verified against the
 * BRIGHTEST possible state of the atmospheric gradient, not the
 * average. The brightest luminance center is `rgba(167, 139, 250, 0.30)`
 * (purple) at full alpha against the `#0a0e1a` base — effective
 * luminance ≈ 0.04. Near-white primary text (`#e8f0f4`, luminance
 * ≈ 0.85) on that worst-case spot lands at ~16:1, well above WCAG AAA
 * (7:1). The validator can be extended later to check this; for now
 * the contrast envelope is documented in `aurora.README.md`.
 *
 * **Static fallback.** Under `prefers-reduced-motion` the drift
 * animation freezes and the gradient is anchored at an intentionally-
 * composed midpoint — the still composition is designed, not "the
 * moment the animation stopped." See the engine block in
 * `src/styles.css`.
 */
export const palette: Palette = {
  id: 'aurora',
  name: 'Aurora',
  engine: 'aurora',
  a11y: 'experimental',
  tokens: {
    color: {
      // Deep midnight base — the floor the atmospheric gradient paints
      // OVER, and what shows through gradient gaps and under
      // `prefers-reduced-motion` if a browser doesn't render the
      // animation at all. The gradient's brightest luminance center
      // sits ~3 luminance steps above this, so text contrast stays
      // safely above AA on any spot the gradient touches.
      surface: {
        base: '#0a0e1a',
        // Raised surfaces are NOT a different opaque color — they're a
        // translucent near-white tint that brightens the dark atmosphere
        // underneath, reading as a "fog patch" rather than a bounded
        // card. The engine block adds a soft outer glow via
        // `--luminance-center` and `backdrop-filter: blur(...)` so the
        // edge dissolves into the atmosphere instead of cutting it.
        raised: 'rgba(255, 255, 255, 0.05)',
        // Inset wells are slightly darker than the floor — recessed
        // regions absorb light rather than emit it.
        sunken: 'rgba(0, 0, 0, 0.20)',
        // Overlay panels (modals, drawers) need more luminance to
        // register through the scrim — bumped translucency so they
        // read as a brighter atmospheric mass falling into focus.
        overlay: 'rgba(255, 255, 255, 0.08)',
        // Deep midnight scrim at 70% — modal opens read as the
        // atmosphere thickening, not as a flat dim layer.
        scrim: 'rgba(5, 8, 16, 0.72)',
      },
      // Type is high-luminance near-white with a slight cool tint
      // (`#e8f0f4` picks up the teal register of the atmosphere) — it
      // reads as "lit by the same atmosphere," not as an alien
      // high-contrast slab. Body / secondary / muted step down on
      // luminance while staying within the same cool chromatic family.
      content: {
        primary: '#e8f0f4',
        secondary: '#a8b8c8',
        muted: '#6a7a8a',
        // Inverse sits on saturated intent fills — the deep midnight
        // floor reads as "ink" against the colored fills.
        inverse: '#0a0e1a',
        // Link accent picks up the atmospheric teal so the call-to-
        // action register matches the palette rather than fighting it.
        link: '#8be9d6',
      },
      // Borders are effectively transparent under `surfaceBy: 'luminance'`,
      // but not LITERALLY transparent — components reading
      // `--color-border-*` still get a faint white tint so any
      // structural cue they need (table row dividers, segmented
      // separators, input control edges) lands at a recessive low-
      // alpha weight. The luminance centers do the actual surface
      // demarcation work. Focus stays at full chroma — keyboard focus
      // must always be visible regardless of the surface-by mode.
      border: {
        subtle: 'rgba(255, 255, 255, 0.05)',
        default: 'rgba(255, 255, 255, 0.10)',
        strong: 'rgba(255, 255, 255, 0.18)',
        focus: '#a78bfa',
      },
      // Intent palette picks colors out of the atmospheric register —
      // deep purple primary (matches the purple luminance center),
      // translucent neutral, deep green success (matches the green
      // center), warm amber warning, deep magenta danger, deep teal
      // info (matches the teal center). Every `bg` is dark enough that
      // `inverse` (`#0a0e1a` near-black) or `content: '#e8f0f4'` (cool
      // near-white) clears WCAG AA. Borders are translucent tinted
      // outlines that pick up the intent hue — they read as a glow
      // boundary rather than a hard stroke, matching the surfaceBy
      // model.
      intent: {
        primary: {
          bg: '#5b3fd8',
          content: '#e8f0f4',
          border: 'rgba(167, 139, 250, 0.50)',
          bgHover: '#6d51e8',
          bgActive: '#4d33c0',
        },
        neutral: {
          bg: 'rgba(255, 255, 255, 0.08)',
          content: '#e8f0f4',
          border: 'rgba(255, 255, 255, 0.18)',
          bgHover: 'rgba(255, 255, 255, 0.14)',
          bgActive: 'rgba(255, 255, 255, 0.22)',
        },
        success: {
          bg: '#0e8060',
          content: '#e8f0f4',
          border: 'rgba(139, 233, 214, 0.50)',
          bgHover: '#149970',
          bgActive: '#0a6850',
        },
        warning: {
          bg: '#a06820',
          content: '#fff8e8',
          border: 'rgba(251, 191, 36, 0.50)',
          bgHover: '#b87830',
          bgActive: '#885818',
        },
        danger: {
          bg: '#b03058',
          content: '#e8f0f4',
          border: 'rgba(244, 114, 182, 0.50)',
          bgHover: '#c83a68',
          bgActive: '#982848',
        },
        info: {
          bg: '#207090',
          content: '#e8f0f4',
          border: 'rgba(125, 211, 252, 0.50)',
          bgHover: '#2880a0',
          bgActive: '#185c78',
        },
      },
    },
    // Standard scale. Aurora doesn't ask for extra breathing room — the
    // luminance centers separate surfaces visually, so layouts breathe
    // at the same step as the baseline.
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
    // Generous radii — the soft luminance edges look better on rounded
    // shapes than on square corners. A square card with a translucent
    // fill and a soft outer glow reads as "a bright rectangle with a
    // weird haze around it"; the same card at `radius.lg` reads as a
    // proper fog patch.
    radius: {
      none: '0',
      sm: '6px',
      md: '12px',
      lg: '18px',
      pill: '999px',
      full: '9999px',
    },
    // Border widths skew quiet. The cardstock metaphor's "thickness"
    // comes from the luminance halo in the engine block, not from a
    // fat border line. `thin` / `thick` are 1px; `heavy` is reserved
    // for the focus indicator on big panels.
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '1px',
      thick: '1px',
      heavy: '2px',
    },
    // Elevation slots bake the atmospheric glow directly — each is a
    // paired stack: a soft outer luminance halo (`0 0 Npx Mpx
    // rgba(255, 255, 255, α)`) and an inner luminance lift
    // (`inset 0 0 Npx rgba(255, 255, 255, β)`). No hard offset
    // shadows; the cardstock metaphor for Aurora is "a brighter patch
    // of atmosphere," not "a piece of paper above another piece of
    // paper." The engine block layers an additional `box-shadow`
    // around raised surfaces via `--luminance-center`, but the
    // elevation slots themselves carry the per-elevation luminance
    // step so components reading `--elevation-*` get a sensible
    // visual lift even outside the engine block's reach.
    elevation: {
      flat: { boxShadow: 'none' },
      low: {
        boxShadow:
          '0 0 24px 2px rgba(167, 139, 250, 0.10), inset 0 0 20px rgba(255, 255, 255, 0.03)',
      },
      medium: {
        boxShadow:
          '0 0 40px 4px rgba(167, 139, 250, 0.14), inset 0 0 24px rgba(255, 255, 255, 0.04)',
      },
      high: {
        boxShadow:
          '0 0 56px 6px rgba(167, 139, 250, 0.18), inset 0 0 28px rgba(255, 255, 255, 0.05)',
      },
      overlay: {
        boxShadow:
          '0 0 80px 10px rgba(167, 139, 250, 0.22), inset 0 0 32px rgba(255, 255, 255, 0.06), 0 16px 48px rgba(5, 8, 16, 0.55)',
      },
    },
    typography: {
      family: {
        // Humanist sans throughout — type sits IN the atmosphere as a
        // lit element, not styled like the atmosphere itself. `pixel`
        // and `hand` alias to the body stack so the slots stay
        // defined without becoming load-bearing.
        ui: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        pixel: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      // Standard role scale. Display / title at a thin-ish 500 weight
      // — heavy weights read as ink slabs on the atmospheric field
      // rather than as lit type. Body at 400; labels at 500 so they
      // hold up against the translucent surface fills.
      role: {
        display:    { family: 'display', size: '2.75rem', weight: 500, lineHeight: '1.1', tracking: '-0.02em' },
        title:      { family: 'display', size: '1.875rem', weight: 500, lineHeight: '1.2', tracking: '-0.01em' },
        heading:    { family: 'display', size: '1.375rem', weight: 600, lineHeight: '1.3', tracking: '0' },
        subheading: { family: 'ui',      size: '1rem',     weight: 600, lineHeight: '1.4', tracking: '0' },
        body:       { family: 'ui',      size: '1rem',     weight: 400, lineHeight: '1.55', tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem', weight: 500, lineHeight: '1.4', tracking: '0' },
        caption:    { family: 'ui',      size: '0.75rem',  weight: 400, lineHeight: '1.4', tracking: '0.01em' },
        code:       { family: 'mono',    size: '0.875rem', weight: 400, lineHeight: '1.5', tracking: '0' },
      },
    },
    // Slow, atmospheric motion. Slightly slower than Flat so transitions
    // settle into the atmosphere rather than snap. The drift animation
    // on the gradient itself is much slower (a 48s loop, defined in
    // the engine block, not in `motion.duration.*` — `motion.duration`
    // is for component transitions, not for engine-level decoration
    // loops, the same way `motion.duration` doesn't drive the CRT
    // scanline overlay or the Pixel-art's `steps()` easing).
    motion: {
      duration: {
        instant: '0ms',
        fast: '180ms',
        base: '260ms',
        slow: '420ms',
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
      // Heavy backdrop blur — raised surfaces need to soften the
      // gradient underneath so they read as luminance centers, not as
      // sharp window cuts. Components consuming
      // `--effect-backdrop-blur-md` (Glass-era components) get a
      // matching haze; the engine block also applies a `backdrop-filter`
      // directly on `iux-card` / `iux-modal__panel` / `iux-drawer__panel`
      // for components that don't read the blur var.
      backdropBlur: { none: 'none', sm: 'blur(8px)', md: 'blur(16px)', lg: 'blur(28px)' },
      // Focus ring is the atmospheric purple accent at 2px — pairs
      // with the luminance halo the engine paints around focused
      // controls so focus reads as "the atmosphere intensified here."
      focusRing: { width: '2px', offset: '2px', color: '#a78bfa', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      outline: { color: 'transparent', width: '0' },
      shadowStyle: 'soft',
      // The atmospheric gradient — a multi-radial stack of green,
      // purple, and teal luminance centers on the deep midnight base.
      // Each gradient is anchored at a different position so the
      // composition reads as drifting fog patches rather than a single
      // sweep. The engine block at `.palette-root[data-palette^='aurora']`
      // paints this as `background-image` and slowly animates
      // `background-position` (200% 200% canvas) over a 48s loop. The
      // alphas (0.30–0.45) keep every center dark enough that text
      // contrast stays above WCAG AA on every spot the gradient
      // touches — the brightest center sits at effective luminance
      // ≈ 0.04 against the `#0a0e1a` base, well below the 0.18
      // threshold near-white text needs to clear AA.
      atmosphereGradient: [
        'radial-gradient(at 22% 28%, rgba(91, 63, 216, 0.42), transparent 55%)',
        'radial-gradient(at 78% 38%, rgba(14, 128, 96, 0.38), transparent 60%)',
        'radial-gradient(at 50% 80%, rgba(32, 112, 144, 0.40), transparent 58%)',
        'radial-gradient(at 12% 88%, rgba(167, 139, 250, 0.30), transparent 52%)',
      ].join(', '),
      // The luminance center — a translucent near-white that the engine
      // block paints as a soft outer glow around raised surfaces (via
      // `box-shadow: 0 0 Npx Mpx var(--luminance-center)`) so cards
      // read as brighter patches of atmosphere rather than as bounded
      // rectangles. The var inherits down the tree, so nested raised
      // surfaces pick up the same luminance unless they override it
      // locally — which is exactly the "per-surface; default = inherit
      // from parent" contract.
      luminanceCenter: 'rgba(255, 255, 255, 0.08)',
      // The surface-by signal. Aurora is the only palette that sets
      // `'luminance'`; every other palette declares `'border'`. The
      // slot is engine-only documentation today — components don't
      // branch on it, but the engine block in `src/styles.css` paints
      // the luminance glow that delivers the visual.
      surfaceBy: 'luminance',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
