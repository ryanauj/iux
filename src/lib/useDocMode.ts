import { usePersistedPref } from './usePersistedPref'

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

export const DOC_MODE_KEY = 'iux-doc-mode'
export const DEFAULT_DOC_MODE: DocMode = 'plain'

const DOC_MODES = new Set<string>(['plain', 'technical'])

export function isDocMode(value: string): value is DocMode {
  return DOC_MODES.has(value)
}

export function useDocMode() {
  return usePersistedPref<DocMode>(DOC_MODE_KEY, DEFAULT_DOC_MODE, isDocMode)
}
