import { useMemo } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { paletteTags } from '../../palettes/tags'
import { descriptions } from '../../palettes/descriptions'
import {
  DEFAULT_GROUPS,
  DEFAULT_GROUP_NAMES,
  FAVORITES_GROUP,
} from '../../palettes/defaultGroups'
import { usePersistedPref } from './usePersistedPref'
import { usePersistedJSON } from './usePersistedJSON'

/* ─────────────────────────── tag derivation ─────────────────────────── */

/**
 * Id prefixes that signal an implicit "family" larger than a single
 * palette. Surfaced as auto-tags so the user can pick "show me all
 * pixel-art" without us hand-authoring it in `palettes/tags.ts`.
 */
const INFERRED_PREFIXES = ['pixel-art', 'cel-shaded', 'crt-phosphor', 'liquid-glass'] as const

const PALETTE_IDS = Object.keys(palettes) as PaletteId[]
const PALETTE_ID_SET = new Set<string>(PALETTE_IDS)

export function isPaletteId(value: string): value is PaletteId {
  return PALETTE_ID_SET.has(value)
}

function inferPrefix(id: PaletteId): string | null {
  for (const prefix of INFERRED_PREFIXES) {
    if (id.startsWith(`${prefix}-`)) return prefix
  }
  return null
}

function tokenizeAliases(aliases: readonly string[] | undefined): string[] {
  if (!aliases) return []
  const out: string[] = []
  for (const raw of aliases) {
    const lower = raw.toLowerCase().trim()
    if (lower.length === 0) continue
    out.push(lower)
  }
  return out
}

const tagCache = new Map<PaletteId, string[]>()

export function getPaletteTags(id: PaletteId): string[] {
  const cached = tagCache.get(id)
  if (cached) return cached
  const palette = palettes[id]
  const set = new Set<string>()
  for (const t of paletteTags[id] ?? []) set.add(t.toLowerCase())
  set.add(palette.engine.toLowerCase())
  set.add(palette.a11y)
  const prefix = inferPrefix(id)
  if (prefix) set.add(prefix)
  for (const alias of tokenizeAliases(descriptions[id]?.recallAliases)) set.add(alias)
  const list = Array.from(set).sort()
  tagCache.set(id, list)
  return list
}

/**
 * Map from tag → palette ids that carry it. Built once at module load
 * since the palette registry is static. Used by both the active-group
 * cycling helper and the tag-chip filter in the picker popover.
 */
export const tagToPaletteIds: Map<string, PaletteId[]> = (() => {
  const map = new Map<string, PaletteId[]>()
  for (const id of PALETTE_IDS) {
    for (const tag of getPaletteTags(id)) {
      let bucket = map.get(tag)
      if (!bucket) {
        bucket = []
        map.set(tag, bucket)
      }
      bucket.push(id)
    }
  }
  return map
})()

export const allTags: string[] = Array.from(tagToPaletteIds.keys()).sort()

/* ──────────────────────────── search ──────────────────────────── */

/**
 * Rank palette ids against a query, matching name + id + tags. Empty
 * query returns the registry in its declaration order. The ranking
 * prefers name-prefix > id-prefix > tag-match > substring so a user
 * typing "pix" sees `pixel-art-*` before something with "pixel" buried
 * deep in its aliases.
 */
export function searchPalettes(query: string): PaletteId[] {
  const q = query.trim().toLowerCase()
  if (!q) return PALETTE_IDS.slice()
  const scored: { id: PaletteId; score: number }[] = []
  for (const id of PALETTE_IDS) {
    const name = palettes[id].name.toLowerCase()
    const tags = getPaletteTags(id)
    let score = -1
    if (name.startsWith(q)) score = 4
    else if (id.startsWith(q)) score = 3
    else if (tags.some(t => t === q || t.startsWith(q))) score = 2
    else if (name.includes(q) || id.includes(q) || tags.some(t => t.includes(q))) score = 1
    if (score >= 0) scored.push({ id, score })
  }
  scored.sort((a, b) => b.score - a.score)
  return scored.map(s => s.id)
}

/* ─────────────────────────── persistence ─────────────────────────── */

export const PINNED_GROUPS_KEY = 'iux-palette-pinned-groups'
export const ACTIVE_GROUP_KEY = 'iux-palette-active-group'
export const CUSTOM_GROUPS_KEY = 'iux-palette-custom-groups'
export const PINNING_MODE_KEY = 'iux-palette-pinning-mode'

export type PinningMode = 'pinned' | 'active' | 'both'

const isPinningMode = (raw: string): raw is PinningMode =>
  raw === 'pinned' || raw === 'active' || raw === 'both'

const isStringArray = (parsed: unknown): parsed is string[] =>
  Array.isArray(parsed) && parsed.every(v => typeof v === 'string')

const isCustomGroups = (parsed: unknown): parsed is Record<string, PaletteId[]> => {
  if (!parsed || typeof parsed !== 'object') return false
  for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (typeof key !== 'string') return false
    if (!Array.isArray(value)) return false
    for (const id of value) {
      if (typeof id !== 'string' || !isPaletteId(id)) return false
    }
  }
  return true
}

const isActiveGroupValue = (parsed: unknown): parsed is string | null =>
  parsed === null || typeof parsed === 'string'

export function usePinnedGroups() {
  return usePersistedJSON<string[]>(PINNED_GROUPS_KEY, [], isStringArray)
}

export function useActiveGroup() {
  return usePersistedJSON<string | null>(ACTIVE_GROUP_KEY, null, isActiveGroupValue)
}

export function useCustomGroups() {
  return usePersistedJSON<Record<string, PaletteId[]>>(
    CUSTOM_GROUPS_KEY,
    {},
    isCustomGroups,
  )
}

export function usePinningMode() {
  return usePersistedPref<PinningMode>(PINNING_MODE_KEY, 'both', isPinningMode)
}

/**
 * Resolve a group name to its palette-id members. Custom (user-edited)
 * groups win over identically-named defaults so an override fully
 * replaces the built-in list.
 */
export function resolveGroupMembers(
  name: string | null,
  groups: Record<string, PaletteId[]>,
): PaletteId[] {
  if (!name) return []
  return groups[name] ?? []
}

/* ───────────────────────── group helpers ───────────────────────── */

/**
 * The effective group map shown in the picker: every built-in default
 * group merged with the user's stored overrides. A stored entry under a
 * default name fully replaces the default's member list; user-added
 * groups live alongside the defaults under their own names.
 *
 * This is recomputed when stored groups change and is the single source
 * the picker reads — there's no "default vs custom" distinction in the
 * UI beyond `isDefaultGroup(name)`.
 */
export function useGroups(): [Record<string, PaletteId[]>, GroupsApi] {
  const [stored, setStored] = useCustomGroups()
  const merged = useMemo(() => {
    const out: Record<string, PaletteId[]> = {}
    for (const [name, ids] of Object.entries(DEFAULT_GROUPS)) out[name] = ids.slice()
    for (const [name, ids] of Object.entries(stored)) out[name] = ids.slice()
    return out
  }, [stored])

  const api = useMemo<GroupsApi>(() => {
    const writeGroup = (name: string, ids: PaletteId[]) => {
      const defaultIds = DEFAULT_GROUPS[name]
      /* If we'd just be re-storing the default values verbatim, drop the
       * override so the entry stays "clean" and a future default change
       * flows through. */
      if (defaultIds && sameIds(defaultIds, ids)) {
        if (!(name in stored)) return
        const next = { ...stored }
        delete next[name]
        setStored(next)
        return
      }
      setStored({ ...stored, [name]: ids })
    }

    const toggleMembership = (name: string, id: PaletteId) => {
      const current = merged[name] ?? []
      const exists = current.includes(id)
      const nextIds = exists ? current.filter(x => x !== id) : [...current, id]
      writeGroup(name, nextIds)
    }

    return {
      toggleMembership,
      toggleFavorite: (id: PaletteId) => toggleMembership(FAVORITES_GROUP, id),
      isFavorite: (id: PaletteId) => (merged[FAVORITES_GROUP] ?? []).includes(id),
      createGroup: (name: string, ids: PaletteId[]) => {
        if (!name.trim()) return
        setStored({ ...stored, [name]: ids })
      },
      deleteGroup: (name: string) => {
        if (!(name in stored)) return
        const next = { ...stored }
        delete next[name]
        setStored(next)
      },
      resetDefaults: () => {
        const next: Record<string, PaletteId[]> = {}
        for (const [name, ids] of Object.entries(stored)) {
          if (!DEFAULT_GROUP_NAMES.has(name)) next[name] = ids
        }
        setStored(next)
      },
    }
  }, [merged, stored, setStored])

  return [merged, api]
}

export interface GroupsApi {
  toggleMembership(name: string, id: PaletteId): void
  toggleFavorite(id: PaletteId): void
  isFavorite(id: PaletteId): boolean
  createGroup(name: string, ids: PaletteId[]): void
  deleteGroup(name: string): void
  resetDefaults(): void
}

export function isDefaultGroup(name: string): boolean {
  return DEFAULT_GROUP_NAMES.has(name)
}

function sameIds(a: readonly PaletteId[], b: readonly PaletteId[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

export { FAVORITES_GROUP }

/**
 * Cycle within a group, wrapping at both ends. If the current palette
 * isn't in the group, arrow-right jumps to the first member and
 * arrow-left jumps to the last — never silently does nothing.
 */
export function cycleInGroup(
  dir: -1 | 1,
  members: PaletteId[],
  current: PaletteId,
): PaletteId {
  if (members.length === 0) return current
  const i = members.indexOf(current)
  const next =
    i === -1
      ? dir === 1
        ? 0
        : members.length - 1
      : (i + dir + members.length) % members.length
  return members[next]
}
