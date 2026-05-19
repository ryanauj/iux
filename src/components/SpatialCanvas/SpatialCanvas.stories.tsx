import { useEffect, useState, type ReactNode } from 'react'
import { SpatialCanvas, type CanvasObject, type CanvasVariant, type RemoteCursor } from './SpatialCanvas'

export const VARIANTS: CanvasVariant[] = ['pan', 'zoom', 'objects', 'collab']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '40rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const SHAPES: CanvasObject[] = [
  { id: 'a', x: 200, y: 200, w: 160, h: 100, label: 'Hero', color: 'oklch(70% 0.16 30)' },
  { id: 'b', x: 480, y: 260, w: 200, h: 140, label: 'About', color: 'oklch(70% 0.16 160)' },
  { id: 'c', x: 380, y: 480, w: 140, h: 80, label: 'Footer', color: 'oklch(70% 0.16 250)' },
  { id: 'd', x: 760, y: 480, w: 240, h: 120, label: 'CTA', color: 'oklch(70% 0.16 60)' },
  { id: 'e', x: 1100, y: 240, w: 180, h: 200, label: 'Side', color: 'oklch(70% 0.16 300)' },
]

function PanDemo() {
  return <SpatialCanvas variant="pan" width={520} height={300} objects={SHAPES} />
}

function ZoomDemo() {
  return <SpatialCanvas variant="zoom" width={520} height={300} objects={SHAPES} />
}

function ObjectsDemo() {
  const [objs, setObjs] = useState<CanvasObject[]>(SHAPES)
  return (
    <SpatialCanvas
      variant="objects"
      width={520}
      height={300}
      objects={objs}
      onObjectsChange={setObjs}
    />
  )
}

function CollabDemo() {
  const [objs, setObjs] = useState<CanvasObject[]>(SHAPES)
  const [cursors, setCursors] = useState<RemoteCursor[]>([
    { id: 'avery', name: 'Avery', color: 'oklch(70% 0.16 30)', x: 300, y: 300 },
    { id: 'blair', name: 'Blair', color: 'oklch(70% 0.16 160)', x: 600, y: 360 },
  ])
  useEffect(() => {
    const id = window.setInterval(() => {
      setCursors(prev => prev.map(c => ({
        ...c,
        x: Math.max(50, Math.min(1400, c.x + (Math.random() - 0.5) * 60)),
        y: Math.max(50, Math.min(900, c.y + (Math.random() - 0.5) * 60)),
      })))
    }, 600)
    return () => window.clearInterval(id)
  }, [])
  return (
    <SpatialCanvas
      variant="collab"
      width={520}
      height={300}
      objects={objs}
      onObjectsChange={setObjs}
      remoteCursors={cursors}
    />
  )
}

export function SpatialCanvasStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'pan' && <Cell label="drag to pan"><PanDemo /></Cell>}
            {variant === 'zoom' && <Cell label="ctrl/cmd + scroll = zoom; Fit jumps to bounds"><ZoomDemo /></Cell>}
            {variant === 'objects' && <Cell label="click to select, shift+drag for marquee"><ObjectsDemo /></Cell>}
            {variant === 'collab' && <Cell label="remote cursors animate"><CollabDemo /></Cell>}
          </div>
        </section>
      ))}
    </div>
  )
}
