import { palettes, type PaletteId } from '../../palettes'
import type { Palette, SemanticTokens } from '../../tokens/semantic.contract'
import { usePersistedJSON } from './usePersistedJSON'
import { DEFAULT_SELECTED_STYLE, readSelectedStyle } from './persistedStyle'

/**
 * Custom palette "patterns" — the prototype pattern for styles.
 *
 * A custom pattern is a *clone* of a built-in palette plus a sparse set of
 * token overrides. Built-in palettes stay hardcoded and immutable; custom
 * patterns live in localStorage and are reconstructed at read time by deep-
 * merging their overrides onto the base palette's tokens. Because the override
 * set is sparse, a pattern is compact enough to encode in a URL for sharing
 * (see `patternCodec.ts`).
 *
 * The widened `StyleId` (built-in `PaletteId` *or* `custom:<slug>`) flows
 * through the picker and the global "selected style" without touching the
 * strict `PaletteId` union the rest of the app relies on — `resolveStyle`
 * is the single seam that turns either kind of id into a concrete `Palette`.
 */

// ─────────────────────────────── id types ───────────────────────────────

export const CUSTOM_PREFIX = 'custom:'

/** A user-defined pattern id, namespaced so it never collides with a built-in. */
export type CustomPatternId = `custom:${string}`

/** Either a built-in palette id or a custom pattern id. */
export type StyleId = PaletteId | CustomPatternId

export function isCustomPatternId(value: string): value is CustomPatternId {
  return value.startsWith(CUSTOM_PREFIX) && value.length > CUSTOM_PREFIX.length
}

const PALETTE_ID_SET = new Set<string>(Object.keys(palettes))

/** Local built-in check that doesn't pull in the `persistedStyle` guard. */
export function isBuiltInPaletteId(value: string): value is PaletteId {
  return PALETTE_ID_SET.has(value)
}

// ───────────────────────────── override types ───────────────────────────

export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T

/** A sparse patch over the token contract — only the edited leaves are present. */
export type TokenOverrides = DeepPartial<SemanticTokens>

/** A stored custom pattern: a name, the built-in it clones, and the overrides. */
export interface CustomPattern {
  id: CustomPatternId
  name: string
  base: PaletteId
  overrides: TokenOverrides
}

export type CustomPatternMap = Record<string, CustomPattern>

// ──────────────────────────── object utilities ──────────────────────────

export function isPlainObject(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x)
}

/**
 * Deep-merge `overrides` onto `base`, returning a new object. Plain objects
 * are merged recursively; every other value (string, number — i.e. every
 * token leaf) is replaced. `base` is never mutated.
 */
export function deepMerge<T>(base: T, overrides: DeepPartial<T> | undefined): T {
  if (overrides === undefined) return base
  if (!isPlainObject(base) || !isPlainObject(overrides)) return overrides as T
  const out: Record<string, unknown> = { ...base }
  for (const key of Object.keys(overrides)) {
    const o = (overrides as Record<string, unknown>)[key]
    if (o === undefined) continue
    const b = (base as Record<string, unknown>)[key]
    out[key] = isPlainObject(b) && isPlainObject(o)
      ? deepMerge(b, o as DeepPartial<typeof b>)
      : o
  }
  return out as T
}

/** Read a dotted path (`color.surface.base`) out of a nested object. */
export function getAtPath(obj: unknown, path: string): unknown {
  let cur: unknown = obj
  for (const seg of path.split('.')) {
    if (!isPlainObject(cur)) return undefined
    cur = cur[seg]
  }
  return cur
}

/**
 * Immutably set a dotted path, creating intermediate objects as needed.
 * Used to build the sparse override tree one edited leaf at a time.
 */
export function setAtPath<T extends object>(obj: T, path: string, value: unknown): T {
  const segs = path.split('.')
  const out: Record<string, unknown> = isPlainObject(obj) ? { ...obj } : {}
  let cur = out
  for (let i = 0; i < segs.length - 1; i++) {
    const seg = segs[i]
    const next = cur[seg]
    cur[seg] = isPlainObject(next) ? { ...next } : {}
    cur = cur[seg] as Record<string, unknown>
  }
  cur[segs[segs.length - 1]] = value
  return out as T
}

/**
 * Immutably delete a dotted path, pruning any intermediate objects left
 * empty. Used when a knob is reset to its base value so overrides stay sparse.
 */
export function deleteAtPath<T extends object>(obj: T, path: string): T {
  if (!isPlainObject(obj)) return obj
  const segs = path.split('.')
  const out: Record<string, unknown> = { ...obj }
  if (segs.length === 1) {
    delete out[segs[0]]
    return out as T
  }
  const head = segs[0]
  const child = out[head]
  if (isPlainObject(child)) {
    const pruned = deleteAtPath(child, segs.slice(1).join('.'))
    if (Object.keys(pruned).length === 0) delete out[head]
    else out[head] = pruned
  }
  return out as T
}

// ─────────────────────────────── resolution ─────────────────────────────

/**
 * The `data-palette` id a reconstructed custom palette carries. It keeps the
 * base id as a prefix so engine CSS scoped via `[data-palette^='cel-shaded']`
 * in `src/styles.css` still matches. React lists key off the `custom:<slug>`
 * id instead, so a shared `data-palette` between two patterns of the same
 * base is fine.
 */
export function customDataPaletteId(base: PaletteId): string {
  return `${base}--custom`
}

/**
 * Coerce any style id to a built-in `PaletteId` — itself if built-in, the
 * clone's base if it's a custom pattern, else the default. Used by catalog
 * surfaces (e.g. the showcase's per-palette filter) that must stay built-in
 * only even when the selected style is a custom pattern.
 */
export function baseOf(id: string, customs?: CustomPatternMap): PaletteId {
  if (isCustomPatternId(id)) {
    const rec = (customs ?? readCustomPatterns())[id]
    if (rec && isBuiltInPaletteId(rec.base)) return rec.base
  }
  if (isBuiltInPaletteId(id)) return id
  return DEFAULT_SELECTED_STYLE
}

/** Build the concrete `Palette` a base + name + overrides reconstruct to. */
export function buildWorkingPalette(
  base: PaletteId,
  name: string,
  overrides: TokenOverrides,
): Palette {
  const basePalette = palettes[base]
  return {
    ...basePalette,
    id: customDataPaletteId(base),
    name,
    tokens: deepMerge(basePalette.tokens, overrides),
  }
}

/**
 * The single seam from a style id (built-in or custom) to a concrete
 * `Palette` ready for `<PaletteRoot>`. Pass `customs` to resolve without
 * touching localStorage (e.g. when the caller already has the map from a
 * hook); otherwise it reads storage synchronously. Unknown ids fall back to
 * the selected style, then the default — never throwing or recursing.
 */
export function resolveStyle(id: string, customs?: CustomPatternMap): Palette {
  if (isCustomPatternId(id)) {
    const map = customs ?? readCustomPatterns()
    const rec = map[id]
    if (rec && isBuiltInPaletteId(rec.base)) {
      return buildWorkingPalette(rec.base, rec.name, rec.overrides)
    }
  }
  if (isBuiltInPaletteId(id)) return palettes[id]
  const selected = readSelectedStyle()
  return (isBuiltInPaletteId(selected) ? palettes[selected] : undefined)
    ?? palettes[DEFAULT_SELECTED_STYLE]
}

// ──────────────────────────────── storage ───────────────────────────────

export const CUSTOM_PATTERNS_KEY = 'iux-custom-patterns'

function isCustomPattern(x: unknown): x is CustomPattern {
  return (
    isPlainObject(x) &&
    typeof x.id === 'string' &&
    isCustomPatternId(x.id) &&
    typeof x.name === 'string' &&
    typeof x.base === 'string' &&
    isBuiltInPaletteId(x.base) &&
    isPlainObject(x.overrides)
  )
}

export function isCustomPatternMap(parsed: unknown): parsed is CustomPatternMap {
  if (!isPlainObject(parsed)) return false
  return Object.values(parsed).every(isCustomPattern)
}

/** Synchronous read for non-hook contexts (mirrors `readSelectedStyle`). */
export function readCustomPatterns(): CustomPatternMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(CUSTOM_PATTERNS_KEY)
    if (raw === null) return {}
    const parsed = JSON.parse(raw)
    if (isCustomPatternMap(parsed)) return parsed
  } catch {
    /* ignore */
  }
  return {}
}

/** localStorage-backed map of every custom pattern, synced across tabs. */
export function useCustomPatterns() {
  return usePersistedJSON<CustomPatternMap>(CUSTOM_PATTERNS_KEY, {}, isCustomPatternMap)
}

// ───────────────────────────── id generation ────────────────────────────

export function slugify(name: string): string {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || 'pattern'
}

export function makeCustomId(slug: string): CustomPatternId {
  return `${CUSTOM_PREFIX}${slug}`
}

/** A `custom:<slug>` id unique against `existing` (suffixes `-2`, `-3`, …). */
export function uniqueCustomId(name: string, existing: CustomPatternMap): CustomPatternId {
  const slug = slugify(name)
  let candidate = makeCustomId(slug)
  let n = 2
  while (existing[candidate]) {
    candidate = makeCustomId(`${slug}-${n}`)
    n += 1
  }
  return candidate
}
