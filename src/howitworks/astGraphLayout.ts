// ABOUTME: Deterministic layout engine that turns the AST graph into positioned nodes and edges.

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
 *
 * An optional auto-layout pass re-positions the top-level clusters by their
 * import dependencies (a deterministic force-directed simulation) instead of
 * the default vertical stack — see `applyForceLayout`.
 */
import type { Edge, Node } from '@xyflow/react'
import type { AstFile, AstGraph } from './generated/astGraph.types'

// ABOUTME: Data carried by a collapsed area cluster node.
export interface AreaNodeData {
  kind: 'area'
  area: string
  label: string
  fileCount: number
  memberCount: number
  [key: string]: unknown
}

// ABOUTME: Data carried by an expanded area's region container node.
export interface AreaRegionNodeData {
  kind: 'region'
  area: string
  label: string
  fileCount: number
  memberCount: number
  [key: string]: unknown
}

// ABOUTME: Data carried by a file node, including its members, expand state, and member-selection wiring.
export interface FileNodeData {
  kind: 'file'
  file: AstFile
  expanded: boolean
  /** Matches the active search query (drives highlight). */
  matched: boolean
  /** The selected member node id (`fileId#name`), if any, so the matching
   *  member row in this file renders highlighted. Injected per render, not by
   *  {@link buildGraph}, to keep the layout a pure function of its inputs. */
  selectedMember?: string | null
  /** Selects a member node when its row is tapped, lighting up the files that
   *  import that exact method/class/type. Also injected per render. */
  onMemberClick?: (memberId: string) => void
  [key: string]: unknown
}

// ABOUTME: Union of every node kind's data payload.
export type AstNodeData = AreaNodeData | AreaRegionNodeData | FileNodeData
// ABOUTME: A React Flow node specialised to this graph's data.
export type AstNode = Node<AstNodeData>
// ABOUTME: A React Flow edge carrying an aggregated import weight.
export type AstEdge = Edge<{ weight: number }>

// ── Geometry constants (px in flow coordinates) ────────────────────────
// ABOUTME: Width of a collapsed area cluster node.
const AREA_W = 260
// ABOUTME: Height of a collapsed area cluster node.
const AREA_H = 156
// ABOUTME: Width of a file node (same collapsed or expanded).
const FILE_W = 232
// ABOUTME: Height of a collapsed (members-hidden) file node.
const FILE_COLLAPSED_H = 116
// ABOUTME: Height of a file node's header above its member list.
const FILE_HEAD_H = 92
// ABOUTME: Height each member row adds to an expanded file node.
const MEMBER_ROW_H = 40
// ABOUTME: Bottom padding below the last member row in an expanded file.
const FILE_PAD_B = 14
// ABOUTME: Gap between sibling nodes in the file grid.
const GAP = 24
// ABOUTME: Inner padding between a region's edge and its file grid.
const REGION_PAD = 22
// ABOUTME: Height reserved for an expanded region's header strip.
const REGION_HEAD = 46
// ABOUTME: Vertical gap between stacked top-level clusters.
const AREA_STACK_GAP = 48
// ABOUTME: Maximum columns in an expanded area's file grid.
const MAX_COLS = 4

// ABOUTME: Computes a file node's height from its member count and expand state.
export function fileHeight(file: AstFile, expanded: boolean): number {
  if (!expanded) return FILE_COLLAPSED_H
  return FILE_HEAD_H + Math.max(1, file.members.length) * MEMBER_ROW_H + FILE_PAD_B
}

// ABOUTME: Chooses a near-square column count for a file grid of `count` files, capped at MAX_COLS.
function columnsFor(count: number): number {
  return Math.min(MAX_COLS, Math.max(1, Math.ceil(Math.sqrt(count))))
}

// ABOUTME: Stable node id for a collapsed area cluster.
export const areaNodeId = (area: string) => `area:${area}`
// ABOUTME: Stable node id for an expanded area's region container.
export const regionNodeId = (area: string) => `region:${area}`
// ABOUTME: Stable node id for a file node.
export const fileNodeId = (id: string) => `file:${id}`

// ABOUTME: Inputs to buildGraph: which areas/files are open, search matches, and auto-layout.
export interface BuildOptions {
  expandedAreas: Set<string>
  expandedFiles: Set<string>
  /** File ids that match the active search query (empty = no search). */
  matchedFiles: Set<string>
  /**
   * Arrange the top-level clusters by their import dependencies (a
   * deterministic force-directed pass) instead of the default vertical
   * stack. Off by default so the layout stays a stable grid.
   */
  autoLayout?: boolean
}

// ABOUTME: The nodes and edges produced by buildGraph.
export interface BuiltGraph {
  nodes: AstNode[]
  edges: AstEdge[]
}

// ABOUTME: Builds positioned React Flow nodes and edges for the current expand/auto-layout state.
export function buildGraph(graph: AstGraph, opts: BuildOptions): BuiltGraph {
  const { expandedAreas, expandedFiles, matchedFiles, autoLayout } = opts
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

  if (autoLayout) applyForceLayout(nodes, edges)

  return { nodes, edges }
}

/**
 * Re-position the top-level clusters (area / region nodes — those without a
 * parent) by their import dependencies, so related parts of the codebase sit
 * near each other instead of in a flat column. Child file nodes keep their
 * parent-relative positions, so they ride along when their region moves.
 *
 * A compact Fruchterman–Reingold simulation: edges pull connected clusters
 * together, every pair pushes apart, and a cooling schedule settles it. The
 * seed (clusters on a circle, ordered by id) and the iteration count are
 * fixed, so the same graph always lands in the same place — no randomness.
 */
// ABOUTME: Deterministically re-positions the top-level clusters by their import links (Fruchterman–Reingold + overlap resolution) for the auto-layout map.
function applyForceLayout(nodes: AstNode[], edges: AstEdge[]): void {
  const tops = nodes.filter(n => !n.parentId)
  if (tops.length <= 1) return

  // Every node maps to its top-level container (itself, or its parent region).
  const topOf = new Map<string, string>()
  for (const n of nodes) topOf.set(n.id, n.parentId ?? n.id)

  const sizeOf = (n: AstNode) => ({
    w: Number(n.style?.width ?? AREA_W),
    h: Number(n.style?.height ?? AREA_H),
  })

  // Aggregate edge weights between distinct clusters (undirected).
  const links = new Map<string, number>()
  for (const e of edges) {
    const a = topOf.get(e.source)
    const b = topOf.get(e.target)
    if (!a || !b || a === b) continue
    const key = a < b ? `${a}|${b}` : `${b}|${a}`
    links.set(key, (links.get(key) ?? 0) + (e.data?.weight ?? 1))
  }

  // Deterministic seed: clusters on a circle, ordered by id.
  const n = tops.length
  const radius = Math.max(420, n * 90)
  const pos = new Map<string, { x: number; y: number }>()
  tops
    .map(t => t.id)
    .sort((a, b) => a.localeCompare(b))
    .forEach((id, i) => {
      const ang = (i / n) * Math.PI * 2
      pos.set(id, { x: Math.cos(ang) * radius, y: Math.sin(ang) * radius })
    })

  const K = 360 // ideal cluster separation
  const ITERS = 320
  for (let it = 0; it < ITERS; it++) {
    const disp = new Map<string, { x: number; y: number }>()
    for (const t of tops) disp.set(t.id, { x: 0, y: 0 })

    // Repulsion between every pair.
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const a = tops[i].id
        const b = tops[j].id
        const pa = pos.get(a)!
        const pb = pos.get(b)!
        const dx = pa.x - pb.x
        const dy = pa.y - pb.y
        const dist = Math.hypot(dx, dy) || 0.01
        const force = (K * K) / dist
        const fx = (dx / dist) * force
        const fy = (dy / dist) * force
        const da = disp.get(a)!
        const db = disp.get(b)!
        da.x += fx
        da.y += fy
        db.x -= fx
        db.y -= fy
      }
    }

    // Attraction along import links (heavier links pull a touch harder).
    for (const [key, weight] of links) {
      const [a, b] = key.split('|')
      const pa = pos.get(a)
      const pb = pos.get(b)
      if (!pa || !pb) continue
      const dx = pa.x - pb.x
      const dy = pa.y - pb.y
      const dist = Math.hypot(dx, dy) || 0.01
      const force = ((dist * dist) / K) * Math.min(3, 0.6 + 0.2 * weight)
      const fx = (dx / dist) * force
      const fy = (dy / dist) * force
      disp.get(a)!.x -= fx
      disp.get(a)!.y -= fy
      disp.get(b)!.x += fx
      disp.get(b)!.y += fy
    }

    // Cap displacement by a cooling temperature.
    const temp = K * (1 - it / ITERS)
    for (const t of tops) {
      const d = disp.get(t.id)!
      const len = Math.hypot(d.x, d.y) || 0.01
      const step = Math.min(len, temp)
      const p = pos.get(t.id)!
      p.x += (d.x / len) * step
      p.y += (d.y / len) * step
    }
  }

  // Resolve any residual box overlaps so cluster nodes never cover each other
  // (the force pass minimises but doesn't guarantee separation, and expanded
  // regions are large). Each pass nudges overlapping pairs apart along their
  // axis of least penetration; it settles quickly and stays deterministic.
  for (let pass = 0; pass < 80; pass++) {
    let moved = false
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const pa = pos.get(tops[i].id)!
        const pb = pos.get(tops[j].id)!
        const sa = sizeOf(tops[i])
        const sb = sizeOf(tops[j])
        const dx = pb.x - pa.x
        const dy = pb.y - pa.y
        const overlapX = (sa.w + sb.w) / 2 + GAP - Math.abs(dx)
        const overlapY = (sa.h + sb.h) / 2 + GAP - Math.abs(dy)
        if (overlapX <= 0 || overlapY <= 0) continue
        if (overlapX < overlapY) {
          const shift = (dx < 0 ? -1 : 1) * (overlapX / 2)
          pa.x -= shift
          pb.x += shift
        } else {
          const shift = (dy < 0 ? -1 : 1) * (overlapY / 2)
          pa.y -= shift
          pb.y += shift
        }
        moved = true
      }
    }
    if (!moved) break
  }

  // Convert centre coordinates to React Flow's top-left origin, normalised to
  // a small margin so nothing lands at a negative offset.
  let minX = Infinity
  let minY = Infinity
  for (const t of tops) {
    const p = pos.get(t.id)!
    const s = sizeOf(t)
    minX = Math.min(minX, p.x - s.w / 2)
    minY = Math.min(minY, p.y - s.h / 2)
  }
  for (const t of tops) {
    const p = pos.get(t.id)!
    const s = sizeOf(t)
    t.position = { x: p.x - s.w / 2 - minX + 40, y: p.y - s.h / 2 - minY + 40 }
  }
}
