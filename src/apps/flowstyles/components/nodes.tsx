// ABOUTME: The custom React Flow node renderers for Recipe Flow — RecipeNode, IngredientNode, and StepNode plus the nodeTypes map; the markup is treatment-agnostic and every look comes from CSS scoped by the canvas class.

import { Handle, Position, type NodeProps } from '@xyflow/react'
import {
  HANDLES,
  type IngredientNodeData,
  type RecipeNodeData,
  type StepNodeData,
} from '../graph'

/**
 * One structural set of node components, reused by every treatment. The DOM is
 * the same regardless of look — a recipe card, ingredient chips, and step cards
 * with their ingredient lists — and the active treatment's scoped CSS
 * (`.flow--neon .rf-step`, etc.) does all the restyling. Keeping the markup
 * shared is the point of the showcase: it demonstrates how far pure CSS can
 * move the same React Flow graph.
 *
 * Class hooks every treatment can target:
 *   `.rf-recipe`, `.rf-ingredient`, `.rf-step` (+ phase/pantry modifiers).
 */

// ABOUTME: Renders the recipe header node — title, blurb, and serving/time meta — pinned at the start of the timeline with a single outgoing handle into step one.
export function RecipeNode({ data }: NodeProps) {
  const { recipe } = data as RecipeNodeData
  return (
    <div className="rf-recipe">
      <span className="rf-recipe__eyebrow">Recipe</span>
      <h3 className="rf-recipe__title">{recipe.title}</h3>
      <p className="rf-recipe__blurb">{recipe.blurb}</p>
      <div className="rf-recipe__meta">
        <span className="rf-recipe__meta-item">
          <strong>{recipe.servings}</strong> servings
        </span>
        <span className="rf-recipe__meta-item">
          <strong>{recipe.totalMinutes}</strong> min
        </span>
        <span className="rf-recipe__meta-item">
          <strong>{recipe.steps.length}</strong> steps
        </span>
      </div>
      <Handle type="source" position={Position.Right} id={HANDLES.start} isConnectable={false} />
    </div>
  )
}

// ABOUTME: Renders an ingredient node — name, quantity, optional prep note, and a fan-out badge counting the steps that use it — with one outgoing handle dropping into the steps below.
export function IngredientNode({ data }: NodeProps) {
  const { ingredient, useCount } = data as IngredientNodeData
  const cls = ['rf-ingredient']
  if (ingredient.pantry) cls.push('rf-ingredient--pantry')
  return (
    <div className={cls.join(' ')}>
      <div className="rf-ingredient__body">
        <span className="rf-ingredient__name">{ingredient.name}</span>
        <span className="rf-ingredient__amount">{ingredient.amount}</span>
        {ingredient.note && <span className="rf-ingredient__note">{ingredient.note}</span>}
      </div>
      {useCount > 1 && (
        <span className="rf-ingredient__badge" title={`Used in ${useCount} steps`}>
          ×{useCount}
        </span>
      )}
      <Handle type="source" position={Position.Bottom} id={HANDLES.useOut} isConnectable={false} />
    </div>
  )
}

// ABOUTME: Renders a step node — its order number, title, instruction, optional minutes, and the chips of ingredients it uses — with sequence handles on the sides and a usage handle on top.
export function StepNode({ data }: NodeProps) {
  const { step, ingredients } = data as StepNodeData
  return (
    <div className={`rf-step rf-step--${step.phase}`}>
      <Handle type="target" position={Position.Left} id={HANDLES.seqIn} isConnectable={false} />
      <Handle type="target" position={Position.Top} id={HANDLES.useIn} isConnectable={false} />
      <div className="rf-step__head">
        <span className="rf-step__order" aria-hidden="true">
          {step.order}
        </span>
        <span className="rf-step__title">{step.title}</span>
        {step.minutes != null && <span className="rf-step__time">{step.minutes}′</span>}
      </div>
      <p className="rf-step__detail">{step.detail}</p>
      {ingredients.length > 0 && (
        <ul className="rf-step__chips">
          {ingredients.map(ing => (
            <li
              key={ing.id}
              className={`rf-step__chip${ing.pantry ? ' rf-step__chip--pantry' : ''}`}
            >
              {ing.name}
            </li>
          ))}
        </ul>
      )}
      <Handle type="source" position={Position.Right} id={HANDLES.seqOut} isConnectable={false} />
    </div>
  )
}

// ABOUTME: Maps React Flow node-type keys to their renderer components for the recipe graph.
export const recipeNodeTypes = {
  recipe: RecipeNode,
  ingredient: IngredientNode,
  step: StepNode,
}
