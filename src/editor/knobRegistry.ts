// ABOUTME: The curated set of token "knobs" the style editor exposes.

/**
 * The curated set of token "knobs" the style editor exposes.
 *
 * This is intentionally data-driven: the editor renders generically from
 * `kind`, and `deepMerge` / `setAtPath` (in `customPatterns.ts`) already
 * handle arbitrary depth — so adding a knob later is a one-line append here,
 * with no editor, resolver, or codec change. The initial set covers the
 * high-impact basics (colors, radius, spacing, border widths, font families,
 * motion speed) per the product decision; the contract has ~100 more leaves
 * any of which can be slotted in the same way.
 */

// ABOUTME: KnobKind — a type alias.
export type KnobKind = 'color' | 'length' | 'text' | 'select' | 'font'

// ABOUTME: KnobOption — an interface.
export interface KnobOption {
  value: string
  label: string
}

// ABOUTME: Knob — an interface.
export interface Knob {
  /** Dotted path into `SemanticTokens`, e.g. `color.surface.base`. */
  path: string
  label: string
  /** Section heading the editor groups knobs under. */
  group: string
  kind: KnobKind
  /** Required for `kind: 'select'`. */
  options?: KnobOption[]
}

// ABOUTME: LengthUnit — an interface.
/**
 * Units the length-knob slider can pick, with a sensible slider range and
 * step for each. The editor raises `max` to fit a larger current value (e.g.
 * a `999px` pill radius) so the slider stays usable, and falls back to the
 * text input for values that don't parse as `<number><unit>`.
 */
export interface LengthUnit {
  /** The unit suffix appended to the number. `''` = unitless (e.g. `0`). */
  value: string
  label: string
  min: number
  max: number
  step: number
}

// ABOUTME: LENGTH_UNITS — an exported value.
export const LENGTH_UNITS: LengthUnit[] = [
  { value: 'px', label: 'px', min: 0, max: 96, step: 1 },
  { value: 'rem', label: 'rem', min: 0, max: 6, step: 0.0625 },
  { value: 'em', label: 'em', min: 0, max: 6, step: 0.0625 },
  { value: '%', label: '%', min: 0, max: 100, step: 1 },
  { value: 'ms', label: 'ms', min: 0, max: 2000, step: 10 },
  { value: 's', label: 's', min: 0, max: 3, step: 0.05 },
  { value: 'ch', label: 'ch', min: 0, max: 80, step: 1 },
  { value: 'lh', label: 'lh', min: 0, max: 4, step: 0.1 },
  { value: '', label: '—', min: 0, max: 100, step: 1 },
]

// ABOUTME: FONT_FAMILY_OPTIONS — an exported value.
/**
 * Curated single-family options for the font-stack builder. The `font` knob
 * composes an ordered, rearrangeable list of these into a CSS stack; the
 * current value's families are injected as options too so nothing is lost.
 */
export const FONT_FAMILY_OPTIONS: KnobOption[] = [
  { value: 'system-ui', label: 'System UI' },
  { value: '-apple-system', label: 'Apple system' },
  { value: '"Segoe UI"', label: 'Segoe UI' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Inter', label: 'Inter' },
  { value: '"Helvetica Neue"', label: 'Helvetica Neue' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Georgia', label: 'Georgia' },
  { value: '"Times New Roman"', label: 'Times New Roman' },
  { value: '"Courier New"', label: 'Courier New' },
  { value: 'ui-monospace', label: 'UI Monospace' },
  { value: 'Menlo', label: 'Menlo' },
  { value: 'Monaco', label: 'Monaco' },
  { value: 'Caveat', label: 'Caveat (hand)' },
  { value: '"Press Start 2P"', label: 'Press Start 2P (pixel)' },
  { value: 'sans-serif', label: 'sans-serif (generic)' },
  { value: 'serif', label: 'serif (generic)' },
  { value: 'monospace', label: 'monospace (generic)' },
  { value: 'cursive', label: 'cursive (generic)' },
]

// ABOUTME: KNOB_GROUPS — an exported value.
export const KNOB_GROUPS = [
  'Surface',
  'Content',
  'Borders',
  'Intents',
  'Radius',
  'Spacing',
  'Border width',
  'Typography',
  'Motion',
  'Effects',
] as const

const INTENTS = ['primary', 'neutral', 'success', 'warning', 'danger', 'info'] as const

// ABOUTME: KNOBS — an exported value.
export const KNOBS: Knob[] = [
  // ── Surface ──
  { path: 'color.surface.base', label: 'Page background', group: 'Surface', kind: 'color' },
  { path: 'color.surface.raised', label: 'Raised (cards)', group: 'Surface', kind: 'color' },
  { path: 'color.surface.sunken', label: 'Sunken (wells)', group: 'Surface', kind: 'color' },

  // ── Content ──
  { path: 'color.content.primary', label: 'Primary text', group: 'Content', kind: 'color' },
  { path: 'color.content.secondary', label: 'Secondary text', group: 'Content', kind: 'color' },
  { path: 'color.content.link', label: 'Link', group: 'Content', kind: 'color' },

  // ── Borders ──
  { path: 'color.border.default', label: 'Default border', group: 'Borders', kind: 'color' },
  { path: 'color.border.focus', label: 'Focus ring', group: 'Borders', kind: 'color' },

  // ── Intents (the background of each intent) ──
  ...INTENTS.map((intent): Knob => ({
    path: `color.intent.${intent}.bg`,
    label: `${intent[0].toUpperCase()}${intent.slice(1)}`,
    group: 'Intents',
    kind: 'color',
  })),

  // ── Radius ──
  { path: 'radius.sm', label: 'Small', group: 'Radius', kind: 'length' },
  { path: 'radius.md', label: 'Medium', group: 'Radius', kind: 'length' },
  { path: 'radius.lg', label: 'Large', group: 'Radius', kind: 'length' },
  { path: 'radius.pill', label: 'Pill', group: 'Radius', kind: 'length' },

  // ── Spacing scale ──
  { path: 'space.2', label: 'Space 2', group: 'Spacing', kind: 'length' },
  { path: 'space.3', label: 'Space 3', group: 'Spacing', kind: 'length' },
  { path: 'space.4', label: 'Space 4', group: 'Spacing', kind: 'length' },
  { path: 'space.5', label: 'Space 5', group: 'Spacing', kind: 'length' },

  // ── Border widths ──
  { path: 'borderWidth.thin', label: 'Thin', group: 'Border width', kind: 'length' },
  { path: 'borderWidth.thick', label: 'Thick', group: 'Border width', kind: 'length' },
  { path: 'borderWidth.heavy', label: 'Heavy', group: 'Border width', kind: 'length' },

  // ── Typography families (reorderable font-stack builder) ──
  { path: 'typography.family.ui', label: 'UI font', group: 'Typography', kind: 'font' },
  { path: 'typography.family.display', label: 'Display font', group: 'Typography', kind: 'font' },
  { path: 'typography.family.mono', label: 'Mono font', group: 'Typography', kind: 'font' },

  // ── Motion ──
  { path: 'motion.duration.base', label: 'Base duration', group: 'Motion', kind: 'length' },
  { path: 'motion.duration.fast', label: 'Fast duration', group: 'Motion', kind: 'length' },

  // ── Effects (a `select` knob, to demonstrate the kind) ──
  {
    path: 'effect.shadowStyle',
    label: 'Shadow style',
    group: 'Effects',
    kind: 'select',
    options: [
      { value: 'soft', label: 'Soft' },
      { value: 'hard', label: 'Hard (cel)' },
    ],
  },
]
