// ABOUTME: Centralised route helpers for the Promptbook app.

/**
 * Centralised route helpers for the Promptbook app. Every link is built
 * through these so the URL shape lives in one place.
 */

// ABOUTME: PROMPTS_BASE — an exported value.
export const PROMPTS_BASE = '/apps/prompts'

// ABOUTME: promptRoutes — an exported value.
export const promptRoutes = {
  library: () => PROMPTS_BASE,
  prompt: (id: string) => `${PROMPTS_BASE}/p/${id}`,
  edit: (id: string) => `${PROMPTS_BASE}/p/${id}/edit`,
  newPrompt: () => `${PROMPTS_BASE}/new`,
  strategies: () => `${PROMPTS_BASE}/strategies`,
  strategy: (id: string) => `${PROMPTS_BASE}/strategies/${id}`,
} as const

// ABOUTME: PromptsRoute — a type alias.
export type PromptsRoute =
  | { kind: 'library' }
  | { kind: 'prompt'; id: string }
  | { kind: 'edit'; id: string }
  | { kind: 'new' }
  | { kind: 'strategies' }
  | { kind: 'strategy'; id: string }
  | { kind: 'notFound' }

// ABOUTME: matchPromptsRoute — a helper function.
/** Parses the segments AFTER `apps/prompts` into a discriminated route. */
export function matchPromptsRoute(segments: string[]): PromptsRoute {
  if (segments.length === 0) return { kind: 'library' }
  const [section, a, b] = segments
  switch (section) {
    case 'new':
      return { kind: 'new' }
    case 'p':
      if (!a) return { kind: 'notFound' }
      if (b === 'edit') return { kind: 'edit', id: a }
      return { kind: 'prompt', id: a }
    case 'strategies':
      if (!a) return { kind: 'strategies' }
      return { kind: 'strategy', id: a }
    default:
      return { kind: 'notFound' }
  }
}
