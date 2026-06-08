// ABOUTME: The AST explorer's view switcher plus its interactive React Flow graph (the Outline/Focus/Matrix views live in their own files).

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  type Node,
  type NodeMouseHandler,
  type ReactFlowInstance,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import graphData from './generated/ast-graph.json'
import type { AstGraph as AstGraphData } from './generated/astGraph.types'
import {
  buildGraph,
  type AstEdge,
  type AstNode,
  type AstNodeData,
} from './astGraphLayout'
import { astNodeTypes, MEMBER_KIND_ORDER, memberKindColor, memberKindGlyph } from './astGraphNodes'
import { AstOutline } from './AstOutline'
import { AstFocus } from './AstFocus'
import { AstMatrix } from './AstMatrix'
import { AstFlows } from './AstFlows'
import { DEFAULT_FOCUS_FILE } from './astViews'
import './astGraph.css'

// ABOUTME: The generated graph JSON typed as AstGraph — the dataset this viewer reads.
const GRAPH = graphData as AstGraphData

// ABOUTME: File ids whose name, dir, summary, or any member matches the search query — drives node highlighting and auto-open.
/** Files whose name or any member name contains the query (case-insensitive). */
function matchFiles(query: string): Set<string> {
  const q = query.trim().toLowerCase()
  if (!q) return new Set()
  const out = new Set<string>()
  for (const f of GRAPH.files) {
    if (
      f.name.toLowerCase().includes(q) ||
      f.dir.toLowerCase().includes(q) ||
      (f.about?.toLowerCase().includes(q) ?? false)
    ) {
      out.add(f.id)
      continue
    }
    if (f.members.some(m => m.name.toLowerCase().includes(q) || (m.about?.toLowerCase().includes(q) ?? false)))
      out.add(f.id)
  }
  return out
}

// ABOUTME: Lookup from file id to its area, used to auto-open the areas that contain search matches.
const areaOfFileId = new Map(GRAPH.files.map(f => [f.id, f.area]))

// ABOUTME: The interactive React Flow canvas: search, expand/collapse, auto-layout, selection highlighting, and palette-themed nodes.
function GraphView() {
  const [expandedAreas, setExpandedAreas] = useState<Set<string>>(new Set())
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  // Auto-layout is on by default: the collapsed overview is otherwise a tall
  // single column that fitView shrinks to an unreadable ribbon. Arranging the
  // clusters by their import dependencies fills the canvas 2-dimensionally, so
  // the zoomed-out map is legible on arrival. Toggle it off for the
  // deterministic grid/stack.
  const [autoLayout, setAutoLayout] = useState(true)
  const [fitToken, setFitToken] = useState(0)
  const rf = useRef<ReactFlowInstance<AstNode, AstEdge> | null>(null)

  const matchedFiles = useMemo(() => matchFiles(query), [query])

  // A search auto-opens the areas (and files) that contain matches so the
  // result is visible without manual drilling — derived, not stored, so it
  // collapses again when the query clears.
  const effectiveAreas = useMemo(() => {
    if (matchedFiles.size === 0) return expandedAreas
    const next = new Set(expandedAreas)
    for (const id of matchedFiles) {
      const a = areaOfFileId.get(id)
      if (a) next.add(a)
    }
    return next
  }, [expandedAreas, matchedFiles])

  const effectiveFiles = useMemo(() => {
    if (matchedFiles.size === 0) return expandedFiles
    return new Set([...expandedFiles, ...matchedFiles])
  }, [expandedFiles, matchedFiles])

  const built = useMemo(
    () => buildGraph(GRAPH, { expandedAreas: effectiveAreas, expandedFiles: effectiveFiles, matchedFiles, autoLayout }),
    [effectiveAreas, effectiveFiles, matchedFiles, autoLayout],
  )

  // Re-point edge styling to the current selection: the selected node's
  // edges are emphasised, the rest recede. Pure styling — recomputed when
  // selection or the built graph changes.
  const styledEdges = useMemo<AstEdge[]>(() => {
    return built.edges.map(e => {
      const active = selectedId != null && (e.source === selectedId || e.target === selectedId)
      const weight = e.data?.weight ?? 1
      const width = Math.min(3.5, 1 + Math.log2(weight + 1))
      const dim = selectedId != null && !active
      return {
        ...e,
        zIndex: active ? 2000 : 0,
        style: {
          stroke: active
            ? 'var(--color-intent-primary-border, var(--color-border-strong))'
            : 'var(--color-border-default)',
          strokeWidth: active ? width + 0.75 : width,
          opacity: dim ? 0.12 : active ? 0.95 : 0.4,
        },
      }
    })
  }, [built.edges, selectedId])

  const onNodeClick = useCallback<NodeMouseHandler<AstNode>>((_evt, node: Node<AstNodeData>) => {
    const data = node.data
    setSelectedId(node.id)
    if (data.kind === 'area') {
      setExpandedAreas(prev => {
        const next = new Set(prev)
        next.add(data.area)
        return next
      })
    } else if (data.kind === 'file') {
      setExpandedFiles(prev => {
        const next = new Set(prev)
        if (next.has(data.file.id)) next.delete(data.file.id)
        else next.add(data.file.id)
        return next
      })
    }
  }, [])

  const collapseArea = useCallback((area: string) => {
    setExpandedAreas(prev => {
      const next = new Set(prev)
      next.delete(area)
      return next
    })
    setSelectedId(null)
  }, [])

  // The region header's chevron isn't a node click target, so wire a
  // delegated handler: tapping a region collapses its area.
  const onPaneNodeClickCapture = useCallback<NodeMouseHandler<AstNode>>((_evt, node: Node<AstNodeData>) => {
    if (node.data.kind === 'region') collapseArea(node.data.area)
  }, [collapseArea])

  const expandAllAreas = useCallback(() => {
    setExpandedAreas(new Set(GRAPH.areas.map(a => a.id)))
    setFitToken(t => t + 1)
  }, [])

  const collapseAll = useCallback(() => {
    setExpandedAreas(new Set())
    setExpandedFiles(new Set())
    setSelectedId(null)
    setQuery('')
    setFitToken(t => t + 1)
  }, [])

  const toggleAutoLayout = useCallback(() => {
    setAutoLayout(v => !v)
    setFitToken(t => t + 1)
  }, [])

  useEffect(() => {
    if (fitToken === 0) return
    const id = window.setTimeout(() => rf.current?.fitView({ duration: 400, padding: 0.12 }), 0)
    return () => window.clearTimeout(id)
  }, [fitToken])

  return (
    <>
      <div className="astg__toolbar">
        <input
          className="astg__search"
          type="search"
          inputMode="search"
          placeholder="Search files & members…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search files and members"
        />
        <div className="astg__toolbar-actions">
          <button
            type="button"
            className={`astg__btn${autoLayout ? ' is-active' : ''}`}
            onClick={toggleAutoLayout}
            aria-pressed={autoLayout}
            title="Arrange clusters by their import dependencies"
          >
            Auto layout
          </button>
          <button type="button" className="astg__btn" onClick={expandAllAreas}>
            Expand all
          </button>
          <button type="button" className="astg__btn" onClick={collapseAll}>
            Reset
          </button>
        </div>
      </div>

      <div className="astg__legend" role="list" aria-label="Member kinds">
        {MEMBER_KIND_ORDER.map(kind => (
          <span key={kind} className="astg__legend-item" role="listitem">
            <span className="astg__legend-dot" style={{ color: memberKindColor(kind) }} aria-hidden="true">
              {memberKindGlyph(kind)}
            </span>
            {kind}
          </span>
        ))}
      </div>

      <div className="astg__canvas">
        <ReactFlow<AstNode, AstEdge>
          nodes={built.nodes}
          edges={styledEdges}
          nodeTypes={astNodeTypes}
          onNodeClick={(evt, node) => {
            onNodeClick(evt, node)
            onPaneNodeClickCapture(evt, node)
          }}
          onInit={inst => {
            rf.current = inst
          }}
          onPaneClick={() => setSelectedId(null)}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.05}
          maxZoom={2.5}
          nodesDraggable={false}
          nodesConnectable={false}
          elevateNodesOnSelect={false}
          panOnScroll
          selectionOnDrag={false}
        >
          <Background variant={BackgroundVariant.Dots} gap={28} size={1} />
          <Controls showInteractive={false} />
          <MiniMap pannable zoomable className="astg__minimap" nodeStrokeWidth={2} />
        </ReactFlow>
      </div>
    </>
  )
}

// ABOUTME: The five view modes and their tab labels/hints, rendered by the AstGraph switcher.
const VIEW_OPTIONS = [
  { id: 'focus', label: 'Focus', hint: 'One file and its neighbours' },
  { id: 'flows', label: 'Flows', hint: 'Saved breadcrumb trails' },
  { id: 'graph', label: 'Graph', hint: 'Force-directed network' },
  { id: 'outline', label: 'Outline', hint: 'Nested list of areas, files, links' },
  { id: 'matrix', label: 'Matrix', hint: 'Area-to-area dependency grid' },
] as const

// ABOUTME: The id of one of the five views ('focus' | 'flows' | 'graph' | 'outline' | 'matrix').
type ViewMode = (typeof VIEW_OPTIONS)[number]['id']

// ABOUTME: The AST viewer shell: a view switcher defaulting to Focus, over the focus, flows, graph, outline, and matrix views; owns the Focus breadcrumb trail so a saved flow can be replayed in Focus.
/**
 * Focus is the default entry: the page opens on a single file ({@link
 * DEFAULT_FOCUS_FILE}, the app entry point) and the reader walks outward, the
 * Graph/Outline/Matrix being alternative whole-map presentations a tab away.
 * The Focus breadcrumb trail lives here, not in `AstFocus`, so the Flows view's
 * "Open in Focus" can drop a saved trail into Focus and switch to it.
 */
export function AstGraph() {
  const [view, setView] = useState<ViewMode>('focus')
  const [focusTrail, setFocusTrail] = useState<string[]>(() => [DEFAULT_FOCUS_FILE])

  const openFlow = (trail: string[]) => {
    if (trail.length > 0) setFocusTrail(trail)
    setView('focus')
  }

  return (
    <div className="astg">
      <div className="astg__views" role="tablist" aria-label="View mode">
        {VIEW_OPTIONS.map(opt => (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={view === opt.id}
            className={`astg__view-btn${view === opt.id ? ' is-active' : ''}`}
            onClick={() => setView(opt.id)}
            title={opt.hint}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {view === 'focus' && <AstFocus trail={focusTrail} onTrailChange={setFocusTrail} />}
      {view === 'flows' && <AstFlows onOpenFlow={openFlow} />}
      {view === 'graph' && (
        <ReactFlowProvider>
          <GraphView />
        </ReactFlowProvider>
      )}
      {view === 'outline' && <AstOutline />}
      {view === 'matrix' && <AstMatrix />}
    </div>
  )
}
