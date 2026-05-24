import type { Palette } from '../tokens/semantic.contract'

/**
 * Cel-shaded (Shonen) — saturated orange / blue / black register, the
 * classic shonen anime color triad. Every surface reads as a flat-fill
 * cel bounded by a hard ink outline; shading, where it exists, is a
 * single darker shape with a hard edge (no gradient). The engine's
 * load-bearing visual is the always-present ink line on every card
 * edge and every interactive control — exactly the affordance cue a
 * cel-animated frame uses to separate elements from the background.
 *
 * Anchored on the new `cel-shaded` engine. The engine exercises three
 * contract slots no previous palette put to work:
 *
 *   - `effect.outline.color` — the hard ink outline color (`#0a0a0a`).
 *   - `effect.outline.width` — the outline width (`3px`).
 *   - `effect.shadowStyle`   — `'hard'`, the two-tone cel-shading signal.
 *
 * The engine block in `src/styles.css` reads the outline tokens to paint
 * a literal `outline:` halo on raised surfaces and interactive controls;
 * the shadowStyle signal documents that `elevation.*` paints hard-offset
 * two-tone shadows rather than soft drop shadows. The palette ALSO sets
 * `color.border.default` to the same ink and `borderWidth.thick` to the
 * same width — so any component that already reads `--border-width-thick`
 * + `--color-border-default` (Card, Modal, Drawer, Toast) gets the
 * outline naturally; the engine block fills in the gaps for components
 * that read thinner border tokens.
 */
export const palette: Palette = {
  id: 'cel-shaded-shonen',
  name: 'Cel-shaded (Shonen)',
  engine: 'cel-shaded',
  a11y: 'pass',
  tokens: {
    color: {
      // Cream-paper base, white raised — the cel field is "the lit
      // surface" and gets the higher value; sunken (input wells) drops
      // back to a warm beige so it reads as a recessed cel. Scrim is
      // deep navy at 60% so a modal opening feels like the camera
      // pulling focus, not the lights going out.
      surface: {
        base: '#fef6e4',
        raised: '#ffffff',
        sunken: '#f5e7c3',
        overlay: '#ffffff',
        scrim: 'rgba(12, 20, 56, 0.62)',
      },
      // Ink-black body, mid-ink secondary, mid-grey muted. Inverse is
      // cream so white text on saturated fills still reads as "the
      // letter painted on the cel," not as a white square. Link is the
      // shonen-orange accent.
      content: {
        primary: '#0a0a0a',
        secondary: '#1f1f1f',
        muted: '#5a5a5a',
        inverse: '#fef6e4',
        link: '#ea580c',
      },
      // Every border slot is ink. The cardstock / Memphis pattern of
      // "borders are the outline" applies directly: hairline / thin /
      // strong all point at the same ink, so every component reading
      // ANY border color gets the same cel-shaded outline. Focus is
      // the shonen-blue accent so it reads against the orange/black
      // intent palette.
      border: {
        subtle: '#0a0a0a',
        default: '#0a0a0a',
        strong: '#0a0a0a',
        focus: '#1d4ed8',
      },
      // Saturated triad: orange-primary, ink-neutral (the protagonist's
      // black jacket), blue-info (sky / hero aura), red-danger
      // (rival / battle damage), green-success (chakra / health),
      // yellow-warning (alert / power-up). Every `border` is ink so
      // the cel outline is the same regardless of intent.
      intent: {
        primary: { bg: '#f97316', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#ea580c', bgActive: '#c2410c' },
        neutral: { bg: '#fef6e4', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#f5e7c3', bgActive: '#e2d3a8' },
        success: { bg: '#22c55e', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#16a34a', bgActive: '#15803d' },
        warning: { bg: '#fbbf24', content: '#0a0a0a', border: '#0a0a0a', bgHover: '#f59e0b', bgActive: '#d97706' },
        danger:  { bg: '#ef4444', content: '#fef6e4', border: '#0a0a0a', bgHover: '#dc2626', bgActive: '#b91c1c' },
        info:    { bg: '#3b82f6', content: '#fef6e4', border: '#0a0a0a', bgHover: '#2563eb', bgActive: '#1d4ed8' },
      },
    },
    // Standard step. Cel-shaded layouts don't need extra breathing room;
    // the ink outlines do the separation work that whitespace usually does.
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
    // Modest radius — cels can have rounded corners (think character
    // panels with rounded edges), but the outline reads better at a
    // tighter curve. `pill` / `full` work the same as Flat.
    radius: {
      none: '0',
      sm: '4px',
      md: '8px',
      lg: '12px',
      pill: '999px',
      full: '9999px',
    },
    // `thick` is the outline width every card / panel consumes via
    // `--border-width-thick`. `thin` is the outline buttons / inputs
    // consume. Both land at the same visual weight as the engine's
    // `--outline-width` so the outline reads as uniform.
    borderWidth: {
      '0': '0',
      hairline: '1px',
      thin: '2px',
      thick: '3px',
      heavy: '4px',
    },
    // Hard-offset two-tone shadows — the cel-shaded shading regime. The
    // shadow is a single darker shape offset down-right with no blur,
    // no spread; the same way a cel-animated frame draws shading as one
    // hard-edged darker region. The shadow color stays ink-black so the
    // shadow reads as "the cel below" rather than as ambient lighting.
    elevation: {
      flat: { boxShadow: 'none' },
      low: { boxShadow: '3px 3px 0 #0a0a0a' },
      medium: { boxShadow: '5px 5px 0 #0a0a0a' },
      high: { boxShadow: '7px 7px 0 #0a0a0a' },
      overlay: { boxShadow: '8px 8px 0 #0a0a0a, 0 24px 48px rgba(10, 10, 10, 0.35)' },
    },
    typography: {
      family: {
        // Heavy display sans for headings (Archivo Black — the shonen
        // logo weight); crisp humanist sans for body (Inter / system).
        // Mono for code. `pixel` / `hand` alias to the body stack so
        // the slots stay defined without becoming load-bearing.
        ui: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: '"Archivo Black", "Bebas Neue", "Helvetica Neue", Arial Black, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        pixel: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        hand: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
      // Weight contrast is the brief: heavy display, crisp body. Display
      // roles use the heavy sans uppercased; body / caption stay on the
      // humanist sans at normal weight. Labels go uppercase for the
      // chapter-title / level-up affordance.
      role: {
        display:    { family: 'display', size: '3rem',    weight: 900, lineHeight: '0.95', tracking: '-0.02em', textTransform: 'uppercase' },
        title:      { family: 'display', size: '2.25rem', weight: 900, lineHeight: '1.0',  tracking: '-0.01em', textTransform: 'uppercase' },
        heading:    { family: 'display', size: '1.5rem',  weight: 900, lineHeight: '1.15', tracking: '0',       textTransform: 'uppercase' },
        subheading: { family: 'ui',      size: '1.125rem',weight: 700, lineHeight: '1.3',  tracking: '0' },
        body:       { family: 'ui',      size: '1rem',    weight: 500, lineHeight: '1.5',  tracking: '0' },
        label:      { family: 'ui',      size: '0.875rem',weight: 700, lineHeight: '1.3',  tracking: '0.04em',  textTransform: 'uppercase' },
        caption:    { family: 'ui',      size: '0.75rem', weight: 600, lineHeight: '1.4',  tracking: '0.02em' },
        code:       { family: 'mono',    size: '0.875rem',weight: 500, lineHeight: '1.5',  tracking: '0' },
      },
    },
    // Snap-fast motion — cel animation is on the 8s/12s; the camera
    // doesn't ease in. Spring slot keeps a small overshoot so press
    // interactions land with a panel-jiggle.
    motion: {
      duration: {
        instant: '0ms',
        fast: '80ms',
        base: '140ms',
        slow: '220ms',
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
      // Focus ring is the shonen-blue accent at a heavy 3px width — the
      // outline is already 3px ink, so the focus indicator escalates by
      // switching color rather than thickness. Solid style; the engine
      // doesn't repaint focus.
      focusRing: { width: '3px', offset: '2px', color: '#1d4ed8', style: 'solid' },
      overlay: { image: 'none', size: 'auto', blend: 'normal' },
      glow: { radius: '0', color: 'transparent', intensity: 0 },
      pixelGrid: '0',
      strokeVariance: '0',
      paperEdgeColor: 'transparent',
      paperEdgeWidth: '0',
      // The engine signals. The outline color/width are the ink line
      // the engine block paints around interactive controls; the
      // shadowStyle records that elevation paints hard-offset two-tone
      // shading rather than soft drop shadows.
      outline: { color: '#0a0a0a', width: '3px' },
      shadowStyle: 'hard',
      // Aurora engine no-op signals. `atmosphereGradient: 'none'` and
      // `luminanceCenter: 'transparent'` mean the engine CSS that paints
      // the gradient and luminance glow at `.palette-root[data-palette^='aurora']`
      // doesn't paint here. `surfaceBy: 'border'` records that this palette
      // demarcates surfaces with a stroke (the default), not with light density.
      atmosphereGradient: 'none',
      luminanceCenter: 'transparent',
      surfaceBy: 'border',
      gridUnitX: '0',
      gridUnitY: '0',
      borderStyle: 'css',
    },
  },
}
