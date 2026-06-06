/**
 * Deterministic layout for the AST graph.
 *
 * Given the generated graph data and the current expand/collapse state,
 * this produces React Flow nodes + edges with fully computed positions.
 * It is a pure function of its inputs — the same state always yields the
 * same layout — so the visualization is reproducible, not physics-driven.
 *
 * Tiers, from collapsed to expanded:
 *   1. area    — one node per top-level `src/` directory (first paint).
 *   2. file    — when an area is expanded it becomes a labelled region
 *                holding a grid of file nodes.
 *   3. member  — when a file is expanded its node grows to list its
 *                members (components, functions, classes, consts, types).
 *
 * Edges are file→file imports, re-pointed to whichever node is currently
 * visible for each endpoint (its area node while collapsed, its file node
 * once expanded), then de-duplicated with a weight.
 */
import type { Edge, Node } from '@xyflow/react'
import type { AstFile, AstGraph } from './generated/astGraph.types'

export interface AreaNodeData {
  kind: 'area'
  area: string
  label: string
  fileCount: number
  memberCount: number
  [key: string]: unknown
}

export interface AreaRegionNodeData {
  kind: 'region'
  area: string
  label: string
  fileCount: number
  memberCount: number
  [key: string]: unknown
}

export interface FileNodeData {
  kind: 'file'
  file: AstFile
  expanded: boolean
  /** Matches the active search query (drives highlight). */
  matched: boolean
  [key: string]: unknown
}

export type AstNodeData = AreaNodeData | AreaRegionNodeData | FileNodeData
export type AstNode = Node<AstNodeData>
export type AstEdge = Edge<{ weight: number }>

// ── Geometry constants (px in flow coordinates) ────────────────────────
const AREA_W = 260
const AREA_H = 132
const FILE_W = 232
const FILE_COLLAPSED_H = 84
const FILE_HEAD_H = 60
const MEMBER_ROW_H = 24
const FILE_PAD_B = 14
const GAP = 24
const REGION_PAD = 22
const REGION_HEAD = 46
const AREA_STACK_GAP = 48
const MAX_COLS = 4

export function fileHeight(file: AstFile, expanded: boolean): number {
  if (!expanded) return FILE_COLLAPSED_H
  return FILE_HEAD_H + Math.max(1, file.members.length) * MEMBER_ROW_H + FILE_PAD_B
}

function columnsFor(count: number): number {
  return Math.min(MAX_COLS, Math.max(1, Math.ceil(Math.sqrt(count))))
}

export const areaNodeId = (area: string) => `area:${area}`
export const regionNodeId = (area: string) => `region:${area}`
export const fileNodeId = (id: string) => `file:${id}`

export interface BuildOptions {
  expandedAreas: Set<string>
  expandedFiles: Set<string>
  /** File ids that match the active search query (empty = no search). */
  matchedFiles: Set<string>
}

export interface BuiltGraph {
  nodes: AstNode[]
  edges: AstEdge[]
}

export function buildGraph(graph: AstGraph, opts: BuildOptions): BuiltGraph {
  const { expandedAreas, expandedFiles, matchedFiles } = opts
  const nodes: AstNode[] = []

  // Group files by area, preserving the generator's stable order.
  const filesByArea = new Map<string, AstFile[]>()
  for (const f of graph.files) {
    const list = filesByArea.get(f.area) ?? []
    list.push(f)
    filesByArea.set(f.area, list)
  }

  let cursorY = 0
  for (const area of graph.areas) {
    if (!expandedAreas.has(area.id)) {
      nodes.push({
        id: areaNodeId(area.id),
        type: 'area',
        position: { x: 0, y: cursorY },
        style: { width: AREA_W, height: AREA_H },
        data: { kind: 'area', area: area.id, label: area.label, fileCount: area.fileCount, memberCount: area.memberCount },
      })
      cursorY += AREA_H + AREA_STACK_GAP
      continue
    }

    // Expanded: lay the area's files out in a grid inside a region.
    const files = filesByArea.get(area.id) ?? []
    const cols = columnsFor(files.length)
    const placed: { file: AstFile; x: number; y: number; h: number }[] = []
    let rowY = REGION_HEAD + REGION_PAD
    let col = 0
    let rowHeights: number[] = []
    for (const file of files) {
      const h = fileHeight(file, expandedFiles.has(file.id))
      const x = REGION_PAD + col * (FILE_W + GAP)
      placed.push({ file, x, y: rowY, h })
      rowHeights.push(h)
      col++
      if (col === cols) {
        rowY += Math.max(...rowHeights) + GAP
        rowHeights = []
        col = 0
      }
    }
    if (rowHeights.length > 0) rowY += Math.max(...rowHeights) + GAP

    const regionW = REGION_PAD * 2 + cols * FILE_W + (cols - 1) * GAP
    const regionH = rowY + REGION_PAD - GAP

    nodes.push({
      id: regionNodeId(area.id),
      type: 'region',
      position: { x: 0, y: cursorY },
      data: { kind: 'region', area: area.id, label: area.label, fileCount: area.fileCount, memberCount: area.memberCount },
      style: { width: regionW, height: regionH },
      selectable: false,
      draggable: false,
      zIndex: 0,
    })

    for (const p of placed) {
      nodes.push({
        id: fileNodeId(p.file.id),
        type: 'file',
        parentId: regionNodeId(area.id),
        extent: 'parent',
        position: { x: p.x, y: p.y },
        style: { width: FILE_W, height: p.h },
        data: { kind: 'file', file: p.file, expanded: expandedFiles.has(p.file.id), matched: matchedFiles.has(p.file.id) },
        zIndex: 1,
      })
    }

    cursorY += regionH + AREA_STACK_GAP
  }

  // ── Edges ────────────────────────────────────────────────────────────
  const endpointFor = (fileId: string, area: string): string =>
    expandedAreas.has(area) ? fileNodeId(fileId) : areaNodeId(area)

  const areaOfFile = new Map(graph.files.map(f => [f.id, f.area]))
  const weights = new Map<string, { source: string; target: string; weight: number }>()
  for (const imp of graph.imports) {
    const sa = areaOfFile.get(imp.source)
    const ta = areaOfFile.get(imp.target)
    if (!sa || !ta) continue
    const s = endpointFor(imp.source, sa)
    const t = endpointFor(imp.target, ta)
    if (s === t) continue
    const key = `${s}|${t}`
    const existing = weights.get(key)
    if (existing) existing.weight++
    else weights.set(key, { source: s, target: t, weight: 1 })
  }

  const edges: AstEdge[] = [...weights.values()].map(e => ({
    id: `${e.source}->${e.target}`,
    source: e.source,
    target: e.target,
    data: { weight: e.weight },
    type: 'straight',
  }))

  return { nodes, edges }
}
