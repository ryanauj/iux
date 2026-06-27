// ABOUTME: The interactive Recipe Flow canvas — renders the recipe graph in the chosen treatment, with a treatment picker, a legend, and click-to-highlight that lights an ingredient's usages (or a step's neighbours) and dims the rest.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type NodeMouseHandler,
  type ReactFlowInstance,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  buildRecipeGraph,
  type FlowEdge,
  type FlowNode,
} from '../graph'
import { edgeOptionsFor, TREATMENTS, type Treatment } from '../treatments'
import { recipeNodeTypes } from './nodes'
import type { Recipe } from '../types'

// ABOUTME: The current selection in the canvas — an ingredient node, a step node, or nothing — used to compute the highlight/dim styling.
interface Selection {
  kind: 'ingredient' | 'step'
  nodeId: string
  label: string
}

// ABOUTME: Props for RecipeFlow — the recipe to render, the active treatment, and a callback to change it (so the URL can stay in sync).
interface RecipeFlowProps {
  recipe: Recipe
  treatment: Treatment
  onTreatmentChange: (id: string) => void
}

// ABOUTME: The legend entries for step phases, shown beneath the picker so the phase colour-coding reads without trial and error.
const PHASE_LEGEND: { phase: string; label: string }[] = [
  { phase: 'prep', label: 'Prep' },
  { phase: 'cook', label: 'Cook' },
  { phase: 'finish', label: 'Finish' },
]

// ABOUTME: Renders the styled React Flow canvas for a recipe — the picker, legend, and graph — and owns the selection state that drives edge/node highlighting; same data across every treatment, only the look changes.
/**
 * Owns two pieces of view state on top of the pure graph from
 * {@link buildRecipeGraph}: the selection (which node is focused) and a fit
 * token that refits the viewport after a treatment switch resizes the nodes.
 * Nodes and edges are derived each render — node `type` comes from the layout,
 * the highlight `className` from the selection, and edge router/animation/arrow
 * options from the active treatment — so neither the geometry nor the data is
 * ever rebuilt when the look changes.
 */
export function RecipeFlow({ recipe, treatment, onTreatmentChange }: RecipeFlowProps) {
  const base = useMemo(() => buildRecipeGraph(recipe), [recipe])
  const [selection, setSelection] = useState<Selection | null>(null)
  const [fitToken, setFitToken] = useState(0)
  const rf = useRef<ReactFlowInstance<FlowNode, FlowEdge> | null>(null)

  // The nodes and edges directly touched by the current selection. For an
  // ingredient that's its usage edges (and the steps they reach); for a step
  // it's every edge incident to it (its ingredients and its neighbours).
  const highlight = useMemo(() => {
    if (!selection) return null
    const edgeIds = new Set<string>()
    const nodeIds = new Set<string>([selection.nodeId])
    for (const e of base.edges) {
      const incident =
        selection.kind === 'ingredient'
          ? e.data?.kind === 'usage' && e.source === selection.nodeId
          : e.source === selection.nodeId || e.target === selection.nodeId
      if (incident) {
        edgeIds.add(e.id)
        nodeIds.add(e.source)
        nodeIds.add(e.target)
      }
    }
    return { edgeIds, nodeIds }
  }, [selection, base.edges])

  const nodes = useMemo<FlowNode[]>(
    () =>
      base.nodes.map(n => {
        if (!highlight) return n
        const state = highlight.nodeIds.has(n.id) ? 'is-active' : 'is-dim'
        return { ...n, className: state }
      }),
    [base.nodes, highlight],
  )

  const edges = useMemo<FlowEdge[]>(() => {
    const opts = edgeOptionsFor(treatment)
    return base.edges.map(e => {
      const kind = e.data?.kind ?? 'sequence'
      const cls = ['rf-edge', `rf-edge--${kind}`]
      if (highlight) cls.push(highlight.edgeIds.has(e.id) ? 'is-active' : 'is-dim')
      return {
        ...e,
        type: opts.type,
        animated: opts.animated,
        markerEnd: opts.markerEnd,
        className: cls.join(' '),
      }
    })
  }, [base.edges, treatment, highlight])

  const onNodeClick = useCallback<NodeMouseHandler<FlowNode>>((_evt, node) => {
    const data = node.data
    if (data.kind === 'ingredient') {
      setSelection({ kind: 'ingredient', nodeId: node.id, label: data.ingredient.name })
    } else if (data.kind === 'step') {
      setSelection({ kind: 'step', nodeId: node.id, label: data.step.title })
    } else {
      setSelection(null)
    }
  }, [])

  const clearSelection = useCallback(() => setSelection(null), [])

  // A treatment switch can shrink (pill) or grow (cards) the nodes; refit so
  // the graph stays framed instead of drifting off-canvas.
  useEffect(() => {
    setFitToken(t => t + 1)
  }, [treatment.id])

  useEffect(() => {
    if (fitToken === 0) return
    const id = window.setTimeout(() => rf.current?.fitView({ duration: 400, padding: 0.14 }), 0)
    return () => window.clearTimeout(id)
  }, [fitToken])

  return (
    <div className="rfx">
      <div className="rfx__picker" role="tablist" aria-label="Styling treatment">
        {TREATMENTS.map(t => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === treatment.id}
            className={`rfx__treatment${t.id === treatment.id ? ' is-active' : ''}`}
            onClick={() => onTreatmentChange(t.id)}
          >
            <span className="rfx__treatment-name">{t.name}</span>
            <span className="rfx__treatment-blurb">{t.blurb}</span>
          </button>
        ))}
      </div>

      <div className="rfx__legend">
        <div className="rfx__legend-group" role="list" aria-label="Step phases">
          {PHASE_LEGEND.map(p => (
            <span key={p.phase} className="rfx__legend-item" role="listitem">
              <span className={`rfx__swatch rfx__swatch--${p.phase}`} aria-hidden="true" />
              {p.label}
            </span>
          ))}
        </div>
        <div className="rfx__legend-group" role="list" aria-label="Link kinds">
          <span className="rfx__legend-item" role="listitem">
            <span className="rfx__line rfx__line--sequence" aria-hidden="true" />
            Step order
          </span>
          <span className="rfx__legend-item" role="listitem">
            <span className="rfx__line rfx__line--usage" aria-hidden="true" />
            Ingredient use
          </span>
        </div>
        <span className="rfx__hint">
          {selection ? (
            <button type="button" className="rfx__clear" onClick={clearSelection}>
              Showing <strong>{selection.label}</strong> — clear ✕
            </button>
          ) : (
            'Tap an ingredient or step to trace its links'
          )}
        </span>
      </div>

      <div className={`rfx__canvas ${treatment.canvasClass}`}>
        <ReactFlow<FlowNode, FlowEdge>
          nodes={nodes}
          edges={edges}
          nodeTypes={recipeNodeTypes}
          onNodeClick={onNodeClick}
          onPaneClick={clearSelection}
          onInit={inst => {
            rf.current = inst
          }}
          fitView
          fitViewOptions={{ padding: 0.14 }}
          minZoom={0.2}
          maxZoom={2}
          nodesDraggable={false}
          nodesConnectable={false}
          elevateNodesOnSelect={false}
          panOnScroll
          proOptions={{ hideAttribution: true }}
        >
          {treatment.background.variant != null && (
            <Background
              variant={treatment.background.variant}
              gap={treatment.background.gap}
              size={treatment.background.size}
            />
          )}
          <Controls showInteractive={false} />
          <MiniMap pannable zoomable className="rfx__minimap" nodeStrokeWidth={2} />
        </ReactFlow>
      </div>
    </div>
  )
}
