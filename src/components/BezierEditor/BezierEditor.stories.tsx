import { useState, type ReactNode } from 'react'
import { BezierEditor, type BezierAnchor, type BezierPreset, type BezierVariant } from './BezierEditor'

const VARIANTS: BezierVariant[] = ['single', 'multi', 'snap', 'presets']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const TWO_ANCHORS: BezierAnchor[] = [
  { id: 'a', x: 0.05, y: 0.9, smooth: true, outHandle: { dx: 0.25, dy: -0.25 } },
  { id: 'b', x: 0.95, y: 0.1, smooth: true, inHandle: { dx: -0.25, dy: 0.25 } },
]

const MULTI_ANCHORS: BezierAnchor[] = [
  { id: 'a', x: 0.05, y: 0.9, smooth: true, outHandle: { dx: 0.1, dy: -0.1 } },
  { id: 'b', x: 0.35, y: 0.4, smooth: true, inHandle: { dx: -0.1, dy: 0.1 }, outHandle: { dx: 0.1, dy: -0.1 } },
  { id: 'c', x: 0.65, y: 0.6, smooth: true, inHandle: { dx: -0.1, dy: 0.1 }, outHandle: { dx: 0.1, dy: -0.1 } },
  { id: 'd', x: 0.95, y: 0.1, smooth: true, inHandle: { dx: -0.1, dy: 0.1 } },
]

const PRESETS: BezierPreset[] = [
  { name: 'easeOutCubic', anchors: [
    { id: 'a', x: 0, y: 1, smooth: true, outHandle: { dx: 0.215, dy: 0 } },
    { id: 'b', x: 1, y: 0, smooth: true, inHandle: { dx: -0.39, dy: -0.45 } },
  ]},
  { name: 'easeInQuint', anchors: [
    { id: 'a', x: 0, y: 1, smooth: true, outHandle: { dx: 0.755, dy: 0 } },
    { id: 'b', x: 1, y: 0, smooth: true, inHandle: { dx: -0.255, dy: -1 } },
  ]},
  { name: 'linear', anchors: [
    { id: 'a', x: 0, y: 1, smooth: false, outHandle: { dx: 0.333, dy: -0.333 } },
    { id: 'b', x: 1, y: 0, smooth: false, inHandle: { dx: -0.333, dy: 0.333 } },
  ]},
]

function SingleStateful() {
  const [anchors, setAnchors] = useState<BezierAnchor[]>(TWO_ANCHORS)
  return <BezierEditor variant="single" anchors={anchors} onAnchorsChange={setAnchors} width={280} height={180} />
}

function MultiStateful() {
  const [anchors, setAnchors] = useState<BezierAnchor[]>(MULTI_ANCHORS)
  return <BezierEditor variant="multi" anchors={anchors} onAnchorsChange={setAnchors} width={320} height={180} />
}

function SnapStateful() {
  const [anchors, setAnchors] = useState<BezierAnchor[]>(MULTI_ANCHORS)
  return <BezierEditor variant="snap" anchors={anchors} onAnchorsChange={setAnchors} width={320} height={180} gridSize={0.1} />
}

function PresetsStateful() {
  const [anchors, setAnchors] = useState<BezierAnchor[]>(TWO_ANCHORS)
  const [saved, setSaved] = useState<BezierPreset[]>(PRESETS)
  return (
    <BezierEditor
      variant="presets"
      anchors={anchors}
      onAnchorsChange={setAnchors}
      width={300}
      height={180}
      presets={saved}
      onApplyPreset={p => setAnchors(p.anchors)}
      onSavePreset={(name, a) => setSaved(prev => [...prev.filter(s => s.name !== name), { name, anchors: a }])}
    />
  )
}

export function BezierEditorStories() {
  return (
    <div className="stories__component">
      {VARIANTS.map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'single' && <Cell label="cubic segment"><SingleStateful /></Cell>}
            {variant === 'multi' && <Cell label="multi-segment + smooth/corner"><MultiStateful /></Cell>}
            {variant === 'snap' && <Cell label="grid + other-anchor snap"><SnapStateful /></Cell>}
            {variant === 'presets' && <Cell label="preset library"><PresetsStateful /></Cell>}
          </div>
        </section>
      ))}
    </div>
  )
}
