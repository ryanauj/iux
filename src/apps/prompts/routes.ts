// ABOUTME: Centralised route helpers for the Promptbook app: PROMPTS_BASE path constant, promptRoutes builder object, discriminated PromptsRoute union, and matchPromptsRoute parser — every link and route decision in the app goes through these.

/**
 * Centralised route helpers for the Promptbook app. Every link is built
 * through these so the URL shape lives in one place.
 */

// ABOUTME: Base path prefix for all Promptbook hash routes.
export const PROMPTS_BASE = '/apps/prompts'

// ABOUTME: Factory functions that produce every Promptbook URL (library, prompt detail, edit, new, strategies, strategy detail) — import this instead of hand-writing path strings.
export const promptRoutes = {
  library: () => PROMPTS_BASE,
  prompt: (id: string) => `${PROMPTS_BASE}/p/${id}`,
  edit: (id: string) => `${PROMPTS_BASE}/p/${id}/edit`,
  newPrompt: () => `${PROMPTS_BASE}/new`,
  strategies: () => `${PROMPTS_BASE}/strategies`,
  strategy: (id: string) => `${PROMPTS_BASE}/strategies/${id}`,
} as const

// ABOUTME: Discriminated union of all valid Promptbook route states (library, prompt, edit, new, strategies, strategy, notFound) — narrowed by matchPromptsRoute and consumed by PromptsApp's RouteContent switch.
export type PromptsRoute =
  | { kind: 'library' }
  | { kind: 'prompt'; id: string }
  | { kind: 'edit'; id: string }
  | { kind: 'new' }
  | { kind: 'strategies' }
  | { kind: 'strategy'; id: string }
  | { kind: 'notFound' }

// ABOUTME: Parses the segments AFTER `apps/prompts` into a discriminated route.
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
