// ABOUTME: The styling-treatment registry for Recipe Flow — each Treatment is one way to style the same graph (edge shape, animation, arrowheads, background, and the scoped CSS class) so the gallery can swap looks without touching the data.

import { BackgroundVariant, MarkerType } from '@xyflow/react'

/**
 * A treatment is a complete visual recipe for the graph: which React Flow edge
 * router to use, whether edges animate or carry arrowheads, what the canvas
 * background looks like, and a `canvasClass` that scopes all the node/edge CSS
 * for that look. The node renderers (`components/nodes.tsx`) are deliberately
 * treatment-agnostic — every visual difference between treatments lives in the
 * scoped CSS keyed by `canvasClass`, so adding a treatment is mostly a CSS
 * exercise plus one entry here.
 */

// ABOUTME: How a treatment paints the React Flow background — the dot/line/cross variant (or null for none) plus its gap and dot/line size.
export interface TreatmentBackground {
  variant: BackgroundVariant | null
  gap: number
  size: number
}

// ABOUTME: One styling treatment — its id/name/blurb for the picker, the edge router and animation/arrow flags, the background spec, and the `canvasClass` that scopes its CSS.
export interface Treatment {
  /** Stable id used in the URL (`?t=`) and the picker. */
  id: string
  /** Display name in the treatment picker. */
  name: string
  /** One-line description of the look. */
  blurb: string
  /** React Flow edge router applied via defaultEdgeOptions. */
  edgeType: 'default' | 'smoothstep' | 'straight' | 'step'
  /** Marching-ants animation on edges. */
  animated: boolean
  /** Draw arrowheads at edge ends. */
  marker: boolean
  /** Canvas background spec. */
  background: TreatmentBackground
  /** CSS class applied to the canvas wrapper; every treatment style is scoped under it. */
  canvasClass: string
}

// ABOUTME: The six built-in treatments (cards, neon, brutalist, blueprint, glass, pill) — the gallery of styling looks the app cycles through.
export const TREATMENTS: Treatment[] = [
  {
    id: 'cards',
    name: 'Recipe Cards',
    blurb: 'Clean elevated cards, soft rounded edges, gentle curved links.',
    edgeType: 'smoothstep',
    animated: false,
    marker: false,
    background: { variant: BackgroundVariant.Dots, gap: 26, size: 1 },
    canvasClass: 'flow--cards',
  },
  {
    id: 'neon',
    name: 'Neon Kitchen',
    blurb: 'Dark canvas, glowing borders, animated electric links.',
    edgeType: 'default',
    animated: true,
    marker: false,
    background: { variant: BackgroundVariant.Dots, gap: 20, size: 1 },
    canvasClass: 'flow--neon',
  },
  {
    id: 'brutalist',
    name: 'Index Cards',
    blurb: 'Hard offset shadows, thick borders, blunt straight arrows.',
    edgeType: 'straight',
    animated: false,
    marker: true,
    background: { variant: BackgroundVariant.Cross, gap: 36, size: 6 },
    canvasClass: 'flow--brutalist',
  },
  {
    id: 'blueprint',
    name: 'Schematic',
    blurb: 'Hairline mono nodes, right-angle routing, technical grid.',
    edgeType: 'step',
    animated: false,
    marker: true,
    background: { variant: BackgroundVariant.Lines, gap: 28, size: 1 },
    canvasClass: 'flow--blueprint',
  },
  {
    id: 'glass',
    name: 'Frosted',
    blurb: 'Translucent blurred panels over soft flowing curves.',
    edgeType: 'default',
    animated: false,
    marker: false,
    background: { variant: BackgroundVariant.Dots, gap: 22, size: 1 },
    canvasClass: 'flow--glass',
  },
  {
    id: 'pill',
    name: 'Transit Map',
    blurb: 'Nodes collapse to pills linked by thick coloured lines.',
    edgeType: 'default',
    animated: false,
    marker: false,
    background: { variant: null, gap: 24, size: 1 },
    canvasClass: 'flow--pill',
  },
]

// ABOUTME: The id of the treatment shown on first load.
export const DEFAULT_TREATMENT_ID = 'cards'

// ABOUTME: Looks up a treatment by id, falling back to the default when the id is unknown (e.g. a stale `?t=` URL param).
export function getTreatment(id: string | null | undefined): Treatment {
  return TREATMENTS.find(t => t.id === id) ?? TREATMENTS.find(t => t.id === DEFAULT_TREATMENT_ID)!
}

// ABOUTME: Marker color token reused by every arrowhead-bearing treatment so arrowheads re-theme with the palette.
const MARKER_COLOR = 'var(--color-border-strong)'

// ABOUTME: Builds the React Flow defaultEdgeOptions for a treatment — wiring its edge router, animation, and (optional) palette-themed arrowhead in one place.
export function edgeOptionsFor(treatment: Treatment) {
  return {
    type: treatment.edgeType,
    animated: treatment.animated,
    markerEnd: treatment.marker
      ? { type: MarkerType.ArrowClosed, color: MARKER_COLOR, width: 18, height: 18 }
      : undefined,
  }
}
