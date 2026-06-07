// ABOUTME: useDocMode — a React hook (lib).

import { usePersistedPref } from './usePersistedPref'

// ABOUTME: Two voices for the same content: - `plain` — everyday-English prose for readers who don't speak CSS.
/**
 * Two voices for the same content:
 *  - `plain` — everyday-English prose for readers who don't speak CSS.
 *    Talks about how a palette feels and what it looks like.
 *  - `technical` — the original engineering prose with token names,
 *    CSS jargon, and code references.
 *
 * Default is `plain`: every doctrine and engine guide opens in the
 * approachable voice; readers who want the technical version flip the
 * toggle and the preference persists across visits and surfaces.
 */
export type DocMode = 'plain' | 'technical'

// ABOUTME: DOC_MODE_KEY — an exported value.
export const DOC_MODE_KEY = 'iux-doc-mode'
// ABOUTME: DEFAULT_DOC_MODE — an exported value.
export const DEFAULT_DOC_MODE: DocMode = 'plain'

const DOC_MODES = new Set<string>(['plain', 'technical'])

// ABOUTME: isDocMode — a helper function.
export function isDocMode(value: string): value is DocMode {
  return DOC_MODES.has(value)
}

// ABOUTME: useDocMode — a React hook.
export function useDocMode() {
  return usePersistedPref<DocMode>(DOC_MODE_KEY, DEFAULT_DOC_MODE, isDocMode)
}
