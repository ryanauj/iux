// ABOUTME: Shared graph indexes and helpers for the alternative (mobile)
// ABOUTME: AST views — outline, focus, and matrix — derived from the graph.

/**
 * The "how it works" graph is naturally a network, which forces pan-and-zoom
 * on a phone. These indexes let the alternative views present the same data —
 * the area → file → member hierarchy plus file→file import links — as plain
 * lists, a single-focus navigator, and an area dependency matrix, all of which
 * scroll vertically and never need a viewport transform.
 *
 * Everything here is derived once at module load from the generated graph, so
 * the views stay cheap to render.
 */
import graphData from './generated/ast-graph.json'
import type { AstFile, AstGraph, AstMember } from './generated/astGraph.types'

// ABOUTME: The generated graph JSON, typed as AstGraph — the one dataset every index and view below derives from.
/**
 * The generated graph JSON (`ast-graph.json`) widened to its `AstGraph`
 * type. Everything else in this module — and the Outline, Focus, and Matrix
 * views that import them — is derived from this single value, so the views
 * never re-parse or re-shape the source data themselves.
 */
export const GRAPH = graphData as AstGraph

// ABOUTME: Every file keyed by its repo-relative id.
/** Every file keyed by its repo-relative id. */
export const FILE_BY_ID: Map<string, AstFile> = new Map(GRAPH.files.map(f => [f.id, f]))

// ABOUTME: The basename a file is shown as (e.g. Button.tsx), falling back to the id's last segment.
/** The basename a file is shown as, e.g. `Button.tsx`. */
export const fileLabel = (id: string): string => FILE_BY_ID.get(id)?.name ?? id.split('/').pop() ?? id

// ABOUTME: Files grouped by their top-level area, preserving the graph's stable order.
/** Files grouped by their top-level area, preserving the graph's stable order. */
export const FILES_BY_AREA: Map<string, AstFile[]> = (() => {
  const m = new Map<string, AstFile[]>()
  for (const f of GRAPH.files) {
    const list = m.get(f.area) ?? []
    list.push(f)
    m.set(f.area, list)
  }
  return m
})()

// ABOUTME: Outgoing import targets for each file (the files it depends on).
/** Outgoing import targets for each file (the files it depends on). */
export const IMPORTS_OF: Map<string, string[]> = (() => {
  const m = new Map<string, string[]>()
  for (const imp of GRAPH.imports) {
    const list = m.get(imp.source) ?? []
    list.push(imp.target)
    m.set(imp.source, list)
  }
  return m
})()

// ABOUTME: Incoming import sources for each file (the files that depend on it).
/** Incoming import sources for each file (the files that depend on it). */
export const IMPORTED_BY: Map<string, string[]> = (() => {
  const m = new Map<string, string[]>()
  for (const imp of GRAPH.imports) {
    const list = m.get(imp.target) ?? []
    list.push(imp.source)
    m.set(imp.target, list)
  }
  return m
})()

// ABOUTME: The files a given file depends on — backs the Outline's "Imports" chips and Focus's "Depends on" cards.
/** Outgoing dependencies of `id` (the files it imports), or `[]` if none.
 * The Outline renders these as "Imports" chips and Focus as "Depends on"
 * cards, so this one lookup is the source for every outgoing link in both. */
export const importsOf = (id: string): string[] => IMPORTS_OF.get(id) ?? []
// ABOUTME: The files that depend on a given file — backs the Outline's "Imported by" chips and Focus's "Used by" cards.
/** Incoming dependents of `id` (the files that import it), or `[]` if none.
 * The Outline renders these as "Imported by" chips and Focus as "Used by"
 * cards — the inverse direction of {@link importsOf}. */
export const importedBy = (id: string): string[] => IMPORTED_BY.get(id) ?? []

// ── Member-level graph nodes ───────────────────────────────────────────────
//
// A graph "node" is either a file (its id, e.g. `src/foo.ts`) or one of its
// members (`src/foo.ts#bar`). Trails, search results, and the Focus target all
// speak this one id space, so a method/class/type is as selectable as the file
// it lives in. File ids never contain `#`, so the marker is unambiguous.

// ABOUTME: The node id for a member: its file id and member name joined by `#` (e.g. src/foo.ts#bar).
/** The composite node id for a member: `fileId#memberName`. */
export const memberNodeId = (fileId: string, name: string): string => `${fileId}#${name}`

// ABOUTME: Whether a node id points at a member (contains `#`) rather than a whole file.
/** True when `id` is a member node (`fileId#name`), false for a plain file id. */
export const isMemberNode = (id: string): boolean => id.includes('#')

// ABOUTME: A node id split into its file id and (for member nodes) member name.
/** A node id broken into its file id and, for member nodes, the member name. */
export interface ParsedNode {
  fileId: string
  member?: string
}

// ABOUTME: Splits a node id into its file id and optional member name.
/** Split a node id into `{ fileId, member? }`; `member` is absent for files. */
export const parseNodeId = (id: string): ParsedNode => {
  const hash = id.indexOf('#')
  return hash === -1 ? { fileId: id } : { fileId: id.slice(0, hash), member: id.slice(hash + 1) }
}

// ABOUTME: Every member keyed by its node id, paired with the file it lives in.
/** Lookup from a member node id to the member and its owning file. */
export const MEMBER_BY_ID: Map<string, { file: AstFile; member: AstMember }> = (() => {
  const m = new Map<string, { file: AstFile; member: AstMember }>()
  for (const f of GRAPH.files) for (const mem of f.members) m.set(memberNodeId(f.id, mem.name), { file: f, member: mem })
  return m
})()

// ABOUTME: The short label for any node — the member name for a member, else the file basename.
/** The display label for a node: the member name, or the file's basename. */
export const nodeLabel = (id: string): string => {
  const { fileId, member } = parseNodeId(id)
  return member ?? fileLabel(fileId)
}

// ABOUTME: Whether a node id resolves to a real file or member in the graph.
/** Whether `id` resolves to a known file or member node. */
export const nodeExists = (id: string): boolean => (isMemberNode(id) ? MEMBER_BY_ID.has(id) : FILE_BY_ID.has(id))

// ABOUTME: One file's outgoing member dependencies on a single target file.
/** The members a file imports from one specific target file. */
export interface MemberDepGroup {
  target: string
  members: string[]
}

// ABOUTME: Per file, the named members it imports, grouped by the target file they live in.
/** Per file, its outgoing member dependencies grouped by target file, built
 * once from the import edges' `members`. Each target appears once (edges are
 * deduplicated per pair). */
export const IMPORT_MEMBERS_OF: Map<string, MemberDepGroup[]> = (() => {
  const m = new Map<string, MemberDepGroup[]>()
  for (const imp of GRAPH.imports) {
    if (imp.members.length === 0) continue
    const list = m.get(imp.source) ?? []
    list.push({ target: imp.target, members: imp.members })
    m.set(imp.source, list)
  }
  return m
})()

// ABOUTME: The members a file imports, grouped by target file — backs Focus's "Depends on" member chips.
/** A file's outgoing member dependencies grouped by target file, or `[]`. The
 * Focus view renders these as selectable chips under each "Depends on" card, so
 * tapping one focuses that exact method/class/type. */
export const importMembersOf = (fileId: string): MemberDepGroup[] => IMPORT_MEMBERS_OF.get(fileId) ?? []

// ABOUTME: Per member node id, the file ids that import that member by name (its incoming dependents).
/** Per member node id, the files that import it by name, built once from the
 * import edges — the precise, per-member inverse of {@link importMembersOf}. */
export const MEMBER_IMPORTED_BY: Map<string, string[]> = (() => {
  const m = new Map<string, string[]>()
  for (const imp of GRAPH.imports) {
    for (const name of imp.members) {
      const key = memberNodeId(imp.target, name)
      const list = m.get(key) ?? []
      list.push(imp.source)
      m.set(key, list)
    }
  }
  return m
})()

// ABOUTME: The files that import a given member by name — backs the member's "Used by" / "Imported by" lists.
/** The files that import the member `memberId` by name, or `[]`. Backs the
 * Focus "Used by" cards when a member is focused and the Outline's per-member
 * "Imported by" chips. */
export const importersOfMember = (memberId: string): string[] => MEMBER_IMPORTED_BY.get(memberId) ?? []

// ABOUTME: One search hit: a file, or a member within a file (with its owning file).
/** A single search result — a file, or a member node carrying its owning file
 * so the hit can show the member's kind glyph and jump to its node. */
export interface NodeMatch {
  id: string
  file: AstFile
  member?: AstMember
}

// ABOUTME: Searches files and members by name/dir/summary, ranked best-match first — the member-aware search behind Focus's jump box.
/**
 * Free-text search across both files and members, returning at most `limit`
 * hits ranked best-first: a name that starts with the query beats one that
 * merely contains it, which beats a summary-only match; ties break by shorter
 * name then node id, so the result is stable. Unlike {@link fileMatches} (which
 * only ever yields files), this surfaces methods/classes/types as selectable
 * results in their own right.
 */
export function searchNodes(q: string, limit = 12): NodeMatch[] {
  const n = q.trim().toLowerCase()
  if (!n) return []
  const scored: { match: NodeMatch; score: number; label: string }[] = []
  const score = (name: string, about?: string): number => {
    const ln = name.toLowerCase()
    if (ln.startsWith(n)) return 0
    if (ln.includes(n)) return 1
    if (about?.toLowerCase().includes(n)) return 3
    return -1
  }
  for (const f of GRAPH.files) {
    const fileScore = Math.min(
      score(f.name, f.about),
      f.dir.toLowerCase().includes(n) ? 2 : Infinity,
    )
    if (Number.isFinite(fileScore) && fileScore >= 0) scored.push({ match: { id: f.id, file: f }, score: fileScore, label: f.name })
    for (const mem of f.members) {
      const s = score(mem.name, mem.about)
      if (s >= 0) scored.push({ match: { id: memberNodeId(f.id, mem.name), file: f, member: mem }, score: s, label: mem.name })
    }
  }
  scored.sort(
    (a, b) => a.score - b.score || a.label.length - b.label.length || a.match.id.localeCompare(b.match.id),
  )
  return scored.slice(0, limit).map(s => s.match)
}

// ABOUTME: One directed area→area dependency, with the file links behind it.
/** One directed area→area dependency, with the file links behind it. */
export interface AreaLink {
  count: number
  pairs: { source: string; target: string }[]
}

// ABOUTME: Area→area dependency matrix: `AREA_MATRIX.get(from)?.get(to)`.
/** Area→area dependency matrix: `AREA_MATRIX.get(from)?.get(to)`. */
export const AREA_MATRIX: Map<string, Map<string, AreaLink>> = (() => {
  const m = new Map<string, Map<string, AreaLink>>()
  for (const a of GRAPH.areas) m.set(a.id, new Map())
  for (const imp of GRAPH.imports) {
    const from = FILE_BY_ID.get(imp.source)?.area
    const to = FILE_BY_ID.get(imp.target)?.area
    if (!from || !to) continue
    const row = m.get(from)!
    const cell = row.get(to) ?? { count: 0, pairs: [] }
    cell.count++
    cell.pairs.push(imp)
    row.set(to, cell)
  }
  return m
})()

// ABOUTME: Largest single area→area count, for scaling the matrix heat.
/** Largest single area→area count, for scaling the matrix heat. */
export const AREA_MATRIX_MAX: number = (() => {
  let max = 1
  for (const row of AREA_MATRIX.values()) for (const cell of row.values()) max = Math.max(max, cell.count)
  return max
})()

// ABOUTME: Does a file match a free-text query across its name, dir, summary, members?
/** Does a file match a free-text query across its name, dir, summary, members? */
export function fileMatches(file: AstFile, q: string): boolean {
  if (!q) return true
  const n = q.toLowerCase()
  if (
    file.name.toLowerCase().includes(n) ||
    file.dir.toLowerCase().includes(n) ||
    (file.about?.toLowerCase().includes(n) ?? false)
  )
    return true
  return file.members.some(m => m.name.toLowerCase().includes(n) || (m.about?.toLowerCase().includes(n) ?? false))
}

// ABOUTME: A sensible starting file for the focus view: the most-connected one.
/** A sensible starting file for the focus view: the most-connected one. */
export const MOST_CONNECTED_FILE: string = (() => {
  let best = GRAPH.files[0]?.id ?? ''
  let bestScore = -1
  for (const f of GRAPH.files) {
    const score = importsOf(f.id).length + importedBy(f.id).length
    if (score > bestScore) {
      bestScore = score
      best = f.id
    }
  }
  return best
})()

// ABOUTME: The file the Focus view opens on — the app entry point (src/main.tsx) when present, so every breadcrumb trail starts where the app boots; falls back to the most-connected file.
/**
 * Where the Focus view's breadcrumb trail begins. The entry point
 * `src/main.tsx` is the natural root of any "how does the app get here?"
 * walk, so the first card is the boot file and every saved flow shares a
 * common origin. If the graph has no `src/main.tsx` (e.g. a renamed entry),
 * this falls back to {@link MOST_CONNECTED_FILE} so Focus always opens on a
 * real, link-rich node.
 */
export const DEFAULT_FOCUS_FILE: string = FILE_BY_ID.has('src/main.tsx')
  ? 'src/main.tsx'
  : MOST_CONNECTED_FILE
