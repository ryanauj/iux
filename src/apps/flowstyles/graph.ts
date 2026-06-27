// ABOUTME: Pure layout engine for Recipe Flow — turns a Recipe into positioned React Flow nodes and edges (recipe + ingredient + step nodes; start, sequence, and usage edges) that every treatment renders.

import type { Edge, Node } from '@xyflow/react'
import type { Ingredient, Recipe, Step } from './types'

/**
 * Builds the recipe graph once, independent of any treatment. Steps lay out
 * left-to-right as a cooking timeline, with the recipe card pinned at the
 * start; the ingredients float in a row across the top and drop down into the
 * steps that consume them. The result is a pure function of the recipe, so a
 * treatment switch only swaps node renderers and edge options — never the
 * geometry. Selection highlighting and dimming are applied downstream in
 * `RecipeFlow`, keeping this builder free of view state.
 */

// ABOUTME: Data carried by the single recipe header node — the whole Recipe, shown as a title card at the start of the timeline.
export interface RecipeNodeData {
  kind: 'recipe'
  recipe: Recipe
  [key: string]: unknown
}

// ABOUTME: Data carried by an ingredient node — the ingredient plus how many steps consume it (the fan-out count shown as a badge).
export interface IngredientNodeData {
  kind: 'ingredient'
  ingredient: Ingredient
  /** Number of steps that use this ingredient (its edge fan-out). */
  useCount: number
  [key: string]: unknown
}

// ABOUTME: Data carried by a step node — the step plus its resolved ingredient objects, so a step can render its own ingredient chips without re-looking-up the recipe.
export interface StepNodeData {
  kind: 'step'
  step: Step
  /** The ingredient objects this step uses, resolved from `step.uses`. */
  ingredients: Ingredient[]
  [key: string]: unknown
}

// ABOUTME: Union of every Recipe Flow node's data payload (recipe, ingredient, or step).
export type FlowNodeData = RecipeNodeData | IngredientNodeData | StepNodeData
// ABOUTME: A React Flow node specialised to the recipe graph's data.
export type FlowNode = Node<FlowNodeData>

// ABOUTME: Which relationship an edge represents — `start` (recipe→first step), `sequence` (step→next step), or `usage` (ingredient→step). Treatments and highlighting key off this.
export type EdgeKind = 'start' | 'sequence' | 'usage'

// ABOUTME: Data carried by every edge — its EdgeKind plus, for usage edges, the ingredient id it represents (so selecting an ingredient can light up exactly its edges).
export interface FlowEdgeData {
  kind: EdgeKind
  /** For `usage` edges, the ingredient id; lets ingredient selection match its own edges. */
  ingredientId?: string
  [key: string]: unknown
}
// ABOUTME: A React Flow edge specialised to the recipe graph's data.
export type FlowEdge = Edge<FlowEdgeData>

// ABOUTME: Stable handle ids shared by the node renderers and the edge builder so every treatment anchors edges to the same ports.
export const HANDLES = {
  /** Recipe card's outgoing port into the first step. */
  start: 'start',
  /** Step's incoming port from the previous step / recipe (left edge). */
  seqIn: 'seq-in',
  /** Step's outgoing port to the next step (right edge). */
  seqOut: 'seq-out',
  /** Step's incoming port for ingredient-usage edges (top edge). */
  useIn: 'use-in',
  /** Ingredient's outgoing port into the steps below (bottom edge). */
  useOut: 'use-out',
} as const

// ABOUTME: Layout spacing constants (in flow units) — the horizontal gap between steps, the row heights for ingredients and steps, and the left margin.
const LAYOUT = {
  stepGapX: 320,
  stepRowY: 360,
  ingredientRowY: 24,
  marginX: 40,
} as const

// ABOUTME: Builds the full set of positioned nodes and edges for a recipe — one recipe node, one node per ingredient, one per step, plus start/sequence/usage edges.
/**
 * Produces the positioned graph. Ingredients spread evenly across the top so
 * their usage edges fan down without crossing more than necessary; steps march
 * left to right; the recipe card sits one slot left of step 1.
 */
export function buildRecipeGraph(recipe: Recipe): { nodes: FlowNode[]; edges: FlowEdge[] } {
  const byId = new Map(recipe.ingredients.map(i => [i.id, i]))
  const useCount = new Map<string, number>()
  for (const step of recipe.steps) {
    for (const ing of step.uses) useCount.set(ing, (useCount.get(ing) ?? 0) + 1)
  }

  const nodes: FlowNode[] = []
  const edges: FlowEdge[] = []

  // Recipe header card sits at timeline slot -1.
  nodes.push({
    id: 'recipe',
    type: 'recipe',
    position: { x: LAYOUT.marginX, y: LAYOUT.stepRowY },
    data: { kind: 'recipe', recipe },
  })

  // Steps: a left-to-right row starting one slot right of the recipe card.
  recipe.steps.forEach((step, i) => {
    nodes.push({
      id: step.id,
      type: 'step',
      position: { x: LAYOUT.marginX + (i + 1) * LAYOUT.stepGapX, y: LAYOUT.stepRowY },
      data: {
        kind: 'step',
        step,
        ingredients: step.uses.map(id => byId.get(id)).filter((x): x is Ingredient => Boolean(x)),
      },
    })

    if (i === 0) {
      edges.push({
        id: 'e-start',
        source: 'recipe',
        sourceHandle: HANDLES.start,
        target: step.id,
        targetHandle: HANDLES.seqIn,
        data: { kind: 'start' },
      })
    } else {
      const prev = recipe.steps[i - 1]
      edges.push({
        id: `e-seq-${prev.id}-${step.id}`,
        source: prev.id,
        sourceHandle: HANDLES.seqOut,
        target: step.id,
        targetHandle: HANDLES.seqIn,
        data: { kind: 'sequence' },
      })
    }
  })

  // Ingredients: a row across the top, spread over the full width of the steps.
  const span = (recipe.steps.length + 1) * LAYOUT.stepGapX
  const slot = span / (recipe.ingredients.length + 1)
  recipe.ingredients.forEach((ingredient, j) => {
    nodes.push({
      id: `ing-${ingredient.id}`,
      type: 'ingredient',
      position: { x: LAYOUT.marginX + (j + 1) * slot, y: LAYOUT.ingredientRowY },
      data: { kind: 'ingredient', ingredient, useCount: useCount.get(ingredient.id) ?? 0 },
    })
  })

  // Usage edges: each step pulls its ingredients down from the top row.
  for (const step of recipe.steps) {
    for (const ingId of step.uses) {
      edges.push({
        id: `e-use-${ingId}-${step.id}`,
        source: `ing-${ingId}`,
        sourceHandle: HANDLES.useOut,
        target: step.id,
        targetHandle: HANDLES.useIn,
        data: { kind: 'usage', ingredientId: ingId },
      })
    }
  }

  return { nodes, edges }
}
