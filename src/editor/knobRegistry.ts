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

export type KnobKind = 'color' | 'length' | 'text' | 'select'

export interface KnobOption {
  value: string
  label: string
}

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

  // ── Typography families ──
  { path: 'typography.family.ui', label: 'UI font', group: 'Typography', kind: 'text' },
  { path: 'typography.family.display', label: 'Display font', group: 'Typography', kind: 'text' },
  { path: 'typography.family.mono', label: 'Mono font', group: 'Typography', kind: 'text' },

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
