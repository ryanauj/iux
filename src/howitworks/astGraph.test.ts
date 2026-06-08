import { describe, expect, it } from 'vitest'
import graphData from './generated/ast-graph.json'
import type { AstGraph, MemberKind } from './generated/astGraph.types'
import { areaNodeId, buildGraph, fileNodeId, regionNodeId } from './astGraphLayout'
import {
  importersOfMember,
  importMembersOf,
  isMemberNode,
  memberNodeId,
  nodeLabel,
  parseNodeId,
  searchNodes,
} from './astViews'

const GRAPH = graphData as AstGraph

const KINDS: MemberKind[] = ['component', 'function', 'class', 'const', 'type', 'interface', 'enum']

describe('generated AST graph', () => {
  it('has self-consistent stats', () => {
    expect(GRAPH.schemaVersion).toBe(2)
    expect(GRAPH.stats.areas).toBe(GRAPH.areas.length)
    expect(GRAPH.stats.files).toBe(GRAPH.files.length)
    expect(GRAPH.stats.imports).toBe(GRAPH.imports.length)
    const memberTotal = GRAPH.files.reduce((n, f) => n + f.members.length, 0)
    expect(GRAPH.stats.members).toBe(memberTotal)
    const memberEdgeTotal = GRAPH.imports.reduce((n, imp) => n + imp.members.length, 0)
    expect(GRAPH.stats.memberEdges).toBe(memberEdgeTotal)
  })

  it('groups every file under a declared area', () => {
    const areaIds = new Set(GRAPH.areas.map(a => a.id))
    for (const f of GRAPH.files) expect(areaIds.has(f.area)).toBe(true)
  })

  it('only emits import edges between known files, with no self-edges', () => {
    const fileIds = new Set(GRAPH.files.map(f => f.id))
    for (const imp of GRAPH.imports) {
      expect(fileIds.has(imp.source)).toBe(true)
      expect(fileIds.has(imp.target)).toBe(true)
      expect(imp.source).not.toBe(imp.target)
    }
  })

  it('only names real exported members on import edges, sorted and unique', () => {
    const exportedByFile = new Map(
      GRAPH.files.map(f => [f.id, new Set(f.members.filter(m => m.exported).map(m => m.name))]),
    )
    for (const imp of GRAPH.imports) {
      const exported = exportedByFile.get(imp.target)!
      for (const name of imp.members) expect(exported.has(name)).toBe(true)
      // Unique.
      expect(new Set(imp.members).size).toBe(imp.members.length)
      // Sorted.
      expect(imp.members).toEqual([...imp.members].sort((a, b) => a.localeCompare(b)))
    }
  })

  it('resolves a known member edge (AstFocus imports importsOf from astViews)', () => {
    const edge = GRAPH.imports.find(
      i => i.source === 'src/howitworks/AstFocus.tsx' && i.target === 'src/howitworks/astViews.ts',
    )
    expect(edge).toBeTruthy()
    expect(edge!.members).toContain('importsOf')
    expect(edge!.members).toContain('importedBy')
  })

  it('uses only known member kinds', () => {
    for (const f of GRAPH.files) {
      for (const m of f.members) expect(KINDS).toContain(m.kind)
    }
  })

  it('reports aboutme coverage that matches the data', () => {
    const docFiles = GRAPH.files.filter(f => typeof f.about === 'string' && f.about.length > 0).length
    const docMembers = GRAPH.files.reduce(
      (n, f) => n + f.members.filter(m => typeof m.about === 'string' && m.about!.length > 0).length,
      0,
    )
    expect(GRAPH.stats.documentedFiles).toBe(docFiles)
    expect(GRAPH.stats.documentedMembers).toBe(docMembers)
  })

  it('is sorted deterministically', () => {
    const areaIds = GRAPH.areas.map(a => a.id)
    expect(areaIds).toEqual([...areaIds].sort((a, b) => a.localeCompare(b)))
    const fileIds = GRAPH.files.map(f => f.id)
    expect(fileIds).toEqual([...fileIds].sort((a, b) => a.localeCompare(b)))
  })
})

describe('member-level node indexes', () => {
  it('round-trips member node ids', () => {
    const id = memberNodeId('src/howitworks/astViews.ts', 'importsOf')
    expect(isMemberNode(id)).toBe(true)
    expect(parseNodeId(id)).toEqual({ fileId: 'src/howitworks/astViews.ts', member: 'importsOf' })
    expect(nodeLabel(id)).toBe('importsOf')
    expect(isMemberNode('src/howitworks/astViews.ts')).toBe(false)
    expect(parseNodeId('src/howitworks/astViews.ts')).toEqual({ fileId: 'src/howitworks/astViews.ts' })
  })

  it('importersOfMember is the inverse of importMembersOf', () => {
    // Every file that importMembersOf says depends on a member must appear in
    // that member's importersOfMember list, and vice versa.
    for (const f of GRAPH.files) {
      for (const group of importMembersOf(f.id)) {
        for (const name of group.members) {
          expect(importersOfMember(memberNodeId(group.target, name))).toContain(f.id)
        }
      }
    }
  })

  it('searchNodes surfaces members as selectable hits', () => {
    const hits = searchNodes('importsOf', 10)
    const exact = hits.find(h => h.member?.name === 'importsOf')
    expect(exact).toBeTruthy()
    expect(exact!.id).toBe(memberNodeId('src/howitworks/astViews.ts', 'importsOf'))
  })
})

describe('buildGraph layout', () => {
  const empty = { expandedAreas: new Set<string>(), expandedFiles: new Set<string>(), matchedFiles: new Set<string>() }

  it('renders one node per area when collapsed', () => {
    const { nodes, edges } = buildGraph(GRAPH, empty)
    expect(nodes).toHaveLength(GRAPH.areas.length)
    expect(nodes.every(n => n.type === 'area')).toBe(true)
    // Every edge connects two area nodes while everything is collapsed.
    for (const e of edges) {
      expect(e.source.startsWith('area:')).toBe(true)
      expect(e.target.startsWith('area:')).toBe(true)
    }
  })

  it('opens an area into a region plus its file nodes', () => {
    const area = GRAPH.areas.find(a => a.fileCount > 1)
    expect(area).toBeTruthy()
    const areaId = area!.id
    const files = GRAPH.files.filter(f => f.area === areaId)
    const { nodes } = buildGraph(GRAPH, { ...empty, expandedAreas: new Set([areaId]) })

    expect(nodes.some(n => n.id === regionNodeId(areaId) && n.type === 'region')).toBe(true)
    expect(nodes.some(n => n.id === areaNodeId(areaId))).toBe(false)
    for (const f of files) {
      const node = nodes.find(n => n.id === fileNodeId(f.id))
      expect(node?.type).toBe('file')
      expect(node?.parentId).toBe(regionNodeId(areaId))
    }
  })

  it('grows a file node when its members are expanded', () => {
    const file = GRAPH.files.find(f => f.members.length > 2)!
    const base = { ...empty, expandedAreas: new Set([file.area]) }
    const collapsed = buildGraph(GRAPH, base).nodes.find(n => n.id === fileNodeId(file.id))!
    const expanded = buildGraph(GRAPH, { ...base, expandedFiles: new Set([file.id]) }).nodes.find(
      n => n.id === fileNodeId(file.id),
    )!
    const h = (n: typeof collapsed) => Number(n.style?.height ?? 0)
    expect(h(expanded)).toBeGreaterThan(h(collapsed))
  })

  it('is a pure function of its inputs', () => {
    const opts = { ...empty, expandedAreas: new Set(['components']) }
    const a = buildGraph(GRAPH, opts)
    const b = buildGraph(GRAPH, opts)
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })

  it('auto layout repositions clusters but stays deterministic', () => {
    const stacked = buildGraph(GRAPH, empty)
    const a = buildGraph(GRAPH, { ...empty, autoLayout: true })
    const b = buildGraph(GRAPH, { ...empty, autoLayout: true })
    // Deterministic: identical inputs → identical positions.
    expect(JSON.stringify(a.nodes.map(n => n.position))).toBe(JSON.stringify(b.nodes.map(n => n.position)))
    // And it actually moves nodes off the default vertical stack.
    const moved = a.nodes.some((n, i) => {
      const s = stacked.nodes[i]
      return n.position.x !== s.position.x || n.position.y !== s.position.y
    })
    expect(moved).toBe(true)
  })
})
