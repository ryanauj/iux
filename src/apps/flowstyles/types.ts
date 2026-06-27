// ABOUTME: Recipe-graph domain types for the Recipe Flow app — the Ingredient, Step, and Recipe shapes that every styling treatment renders as a React Flow graph.

/**
 * The recipe domain model. A {@link Recipe} is the whole dish; its
 * {@link Ingredient}s and ordered {@link Step}s are the graph's two node
 * families, and each step's `uses` array (ingredient ids) is what wires the
 * usage edges. The same dataset feeds every treatment — only the rendering
 * changes between them.
 */

// ABOUTME: A single ingredient line — id, display name, quantity string, optional prep note, and a `pantry` flag that marks staples (oil, salt) apart from the star ingredients for styling accents.
export interface Ingredient {
  /** Stable id referenced by a step's `uses` array. */
  id: string
  /** Display name, e.g. "San Marzano tomatoes". */
  name: string
  /** Human quantity string, e.g. "1 can (400g)". */
  amount: string
  /** Optional prep note shown under the name, e.g. "finely diced". */
  note?: string
  /** Pantry staple (oil/salt/spices) vs. a headline ingredient — drives a muted accent. */
  pantry?: boolean
}

// ABOUTME: The cooking phase a step belongs to (prep, cook, or finish) — used to colour-code step nodes by where they fall in the flow.
export type StepPhase = 'prep' | 'cook' | 'finish'

// ABOUTME: One ordered cooking step — its sequence index, short imperative title, full instruction, optional minutes, the ids of ingredients it consumes, and its phase.
export interface Step {
  /** Stable id used by sequence edges and selection. */
  id: string
  /** 1-based position in the method; drives left-to-right layout. */
  order: number
  /** Short imperative headline, e.g. "Bloom the spices". */
  title: string
  /** The full instruction sentence. */
  detail: string
  /** Optional active time for this step, in minutes. */
  minutes?: number
  /** Ingredient ids this step consumes — each becomes a usage edge. */
  uses: string[]
  /** Where the step falls in the cook: prep, cook, or finish. */
  phase: StepPhase
}

// ABOUTME: A whole recipe — title, blurb, servings, total time, its ingredient list, and its ordered steps; this is the single dataset every treatment in the gallery visualises.
export interface Recipe {
  id: string
  title: string
  /** One-line description shown in the header card. */
  blurb: string
  servings: number
  totalMinutes: number
  ingredients: Ingredient[]
  steps: Step[]
}
