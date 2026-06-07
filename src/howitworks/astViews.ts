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
import type { AstFile, AstGraph } from './generated/astGraph.types'

// ABOUTME: GRAPH — an exported value.
export const GRAPH = graphData as AstGraph

// ABOUTME: FILE_BY_ID — an exported value.
/** Every file keyed by its repo-relative id. */
export const FILE_BY_ID: Map<string, AstFile> = new Map(GRAPH.files.map(f => [f.id, f]))

// ABOUTME: fileLabel — a helper function.
/** The basename a file is shown as, e.g. `Button.tsx`. */
export const fileLabel = (id: string): string => FILE_BY_ID.get(id)?.name ?? id.split('/').pop() ?? id

// ABOUTME: FILES_BY_AREA — an exported value.
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

// ABOUTME: IMPORTS_OF — an exported value.
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

// ABOUTME: IMPORTED_BY — an exported value.
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

// ABOUTME: importsOf — a helper function.
export const importsOf = (id: string): string[] => IMPORTS_OF.get(id) ?? []
// ABOUTME: importedBy — a helper function.
export const importedBy = (id: string): string[] => IMPORTED_BY.get(id) ?? []

// ABOUTME: AreaLink — an interface.
/** One directed area→area dependency, with the file links behind it. */
export interface AreaLink {
  count: number
  pairs: { source: string; target: string }[]
}

// ABOUTME: AREA_MATRIX — an exported value.
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

// ABOUTME: AREA_MATRIX_MAX — an exported value.
/** Largest single area→area count, for scaling the matrix heat. */
export const AREA_MATRIX_MAX: number = (() => {
  let max = 1
  for (const row of AREA_MATRIX.values()) for (const cell of row.values()) max = Math.max(max, cell.count)
  return max
})()

// ABOUTME: fileMatches — a helper function.
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

// ABOUTME: MOST_CONNECTED_FILE — an exported value.
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
