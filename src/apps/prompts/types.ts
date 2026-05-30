/**
 * Domain types for the Promptbook app — a library for saving and
 * displaying prompts and the prompting strategies behind them.
 */

/** Top-level grouping for a saved prompt. */
export type PromptCategory =
  | 'writing'
  | 'coding'
  | 'analysis'
  | 'research'
  | 'roleplay'
  | 'meta'

export const PROMPT_CATEGORIES: { value: PromptCategory; label: string }[] = [
  { value: 'writing', label: 'Writing' },
  { value: 'coding', label: 'Coding' },
  { value: 'analysis', label: 'Analysis' },
  { value: 'research', label: 'Research' },
  { value: 'roleplay', label: 'Role-play' },
  { value: 'meta', label: 'Meta' },
]

/** A saved prompt the user can read, copy, fill, and edit. */
export interface Prompt {
  id: string
  title: string
  /** The prompt text. May contain `{{variable}}` placeholders. */
  body: string
  category: PromptCategory
  /** Free-form target models this prompt was written for. */
  models: string[]
  tags: string[]
  /** Strategy ids this prompt demonstrates. */
  strategyIds: string[]
  notes?: string
  favorite: boolean
  /** ISO date the prompt was first saved. */
  createdAt: string
  /** ISO date of the most recent edit. */
  updatedAt: string
}

/** A reusable prompting technique with a template and worked example. */
export type StrategyCategory =
  | 'reasoning'
  | 'structure'
  | 'context'
  | 'reliability'

export const STRATEGY_CATEGORIES: { value: StrategyCategory; label: string }[] = [
  { value: 'reasoning', label: 'Reasoning' },
  { value: 'structure', label: 'Structure' },
  { value: 'context', label: 'Context' },
  { value: 'reliability', label: 'Reliability' },
]

export interface Strategy {
  id: string
  name: string
  /** One-line description shown on cards. */
  tagline: string
  category: StrategyCategory
  /** A paragraph on what the technique is and why it works. */
  summary: string
  /** Bullet points: when this strategy earns its keep. */
  whenToUse: string[]
  /** A copy-paste skeleton, usually with `{{variable}}` slots. */
  template: string
  /** A short filled-in example of the template in action. */
  example: string
  tags: string[]
  /** Related strategy ids for cross-linking. */
  related: string[]
}
