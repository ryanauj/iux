// ABOUTME: Domain types for the Promptbook app — a library for saving and displaying prompts and the prompting strategies behind them.

/**
 * Domain types for the Promptbook app — a library for saving and
 * displaying prompts and the prompting strategies behind them.
 */

/** Top-level grouping for a saved prompt. */
// ABOUTME: Top-level grouping for a saved prompt.
export type PromptCategory =
  | 'writing'
  | 'coding'
  | 'analysis'
  | 'research'
  | 'roleplay'
  | 'meta'

// ABOUTME: Ordered list of all prompt categories with their display labels, used by Library filters and PromptForm's category Select.
export const PROMPT_CATEGORIES: { value: PromptCategory; label: string }[] = [
  { value: 'writing', label: 'Writing' },
  { value: 'coding', label: 'Coding' },
  { value: 'analysis', label: 'Analysis' },
  { value: 'research', label: 'Research' },
  { value: 'roleplay', label: 'Role-play' },
  { value: 'meta', label: 'Meta' },
]

// ABOUTME: A saved prompt the user can read, copy, fill, and edit.
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

// ABOUTME: The four top-level groupings for prompting strategies (reasoning, structure, context, reliability).
export type StrategyCategory =
  | 'reasoning'
  | 'structure'
  | 'context'
  | 'reliability'

// ABOUTME: Ordered list of all strategy categories with their display labels, used by the Strategies page filter and StrategyDetail badge.
export const STRATEGY_CATEGORIES: { value: StrategyCategory; label: string }[] = [
  { value: 'reasoning', label: 'Reasoning' },
  { value: 'structure', label: 'Structure' },
  { value: 'context', label: 'Context' },
  { value: 'reliability', label: 'Reliability' },
]

// ABOUTME: A static prompting strategy entry: name, tagline, category, summary prose, when-to-use bullets, a copy-paste template with `{{variable}}` slots, a worked example, tags, and related strategy ids.
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
