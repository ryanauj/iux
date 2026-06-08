// ABOUTME: Pure formatting helpers for the Promptbook app: variable extraction and template filling for `{{slot}}` syntax, body snippet truncation, category label lookup, ISO date formatting, and variable-name humanisation.

import { PROMPT_CATEGORIES, STRATEGY_CATEGORIES } from './types'
import type { PromptCategory, StrategyCategory } from './types'

// ABOUTME: Pull every distinct `{{variable}}` name out of a template body, in order.
/** Pull every distinct `{{variable}}` name out of a template body, in order. */
export function extractVariables(body: string): string[] {
  const out: string[] = []
  const seen = new Set<string>()
  const re = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g
  let m: RegExpExecArray | null
  while ((m = re.exec(body)) !== null) {
    const name = m[1]
    if (!seen.has(name)) {
      seen.add(name)
      out.push(name)
    }
  }
  return out
}

// ABOUTME: Substitute `{{var}}` placeholders with provided values.
/** Substitute `{{var}}` placeholders with provided values. Blank values are left as the placeholder so the gap is visible. */
export function fillTemplate(body: string, values: Record<string, string>): string {
  return body.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (whole, name) => {
    const v = values[name]
    return v && v.trim() !== '' ? v : whole
  })
}

// ABOUTME: A short single-line snippet for cards, with placeholders kept readable.
/** A short single-line snippet for cards, with placeholders kept readable. */
export function snippet(body: string, max = 140): string {
  const oneLine = body.replace(/\s+/g, ' ').trim()
  return oneLine.length > max ? `${oneLine.slice(0, max - 1).trimEnd()}…` : oneLine
}

// ABOUTME: Returns the display label for a PromptCategory value (e.g. 'roleplay' → 'Role-play'), used by PromptCard and PromptDetail badges.
export function promptCategoryLabel(c: PromptCategory): string {
  return PROMPT_CATEGORIES.find(x => x.value === c)?.label ?? c
}

// ABOUTME: Returns the display label for a StrategyCategory value (e.g. 'reasoning' → 'Reasoning'), used by Strategies, StrategyDetail, and PromptForm badges.
export function strategyCategoryLabel(c: StrategyCategory): string {
  return STRATEGY_CATEGORIES.find(x => x.value === c)?.label ?? c
}

// ABOUTME: Intl.DateTimeFormat instance configured for short US dates (e.g. "May 20, 2026"), shared by formatDate to avoid re-creating the formatter on every call.
const DATE_FMT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

// ABOUTME: Formats an ISO date string as a short US locale date (e.g. "May 20, 2026"); returns the raw string if parsing fails. Used by PromptCard and PromptDetail to display created/updated timestamps.
export function formatDate(iso: string): string {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? iso : DATE_FMT.format(d)
}

// ABOUTME: Variable-name → human label ("real_input" → "Real input").
/** Variable-name → human label ("real_input" → "Real input"). */
export function humanizeVar(name: string): string {
  const spaced = name.replace(/_/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}
