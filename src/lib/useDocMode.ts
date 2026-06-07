// ABOUTME: Persisted documentation voice pref — plain prose vs. technical engineering language — shared across all doctrine and engine-guide surfaces.

import { usePersistedPref } from './usePersistedPref'

// ABOUTME: The two documentation voices available across doctrine and engine guides: plain everyday-English prose or technical engineering text with token names and CSS jargon.
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

// ABOUTME: localStorage key under which the selected DocMode is stored.
export const DOC_MODE_KEY = 'iux-doc-mode'
// ABOUTME: The DocMode used when nothing has been persisted — opens every guide in the plain, everyday-English voice.
export const DEFAULT_DOC_MODE: DocMode = 'plain'

const DOC_MODES = new Set<string>(['plain', 'technical'])

// ABOUTME: Type guard for DocMode — passed to usePersistedPref to reject invalid storage values.
export function isDocMode(value: string): value is DocMode {
  return DOC_MODES.has(value)
}

// ABOUTME: Returns the persisted DocMode and a setter; persists across reloads and syncs across tabs via usePersistedPref.
export function useDocMode() {
  return usePersistedPref<DocMode>(DOC_MODE_KEY, DEFAULT_DOC_MODE, isDocMode)
}
