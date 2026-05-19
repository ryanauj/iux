import { useState, type ReactNode } from 'react'
import { Bento, type BentoCell, type BentoVariant } from './Bento'

const VARIANTS: BentoVariant[] = ['static', 'reflow', 'drag', 'resize']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '40rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const STATIC: BentoCell[] = [
  { id: 'a', title: 'Stats', content: <strong>1,234 visitors today</strong>, cols: 2, rows: 1 },
  { id: 'b', title: 'Note', content: 'Just a small block.' },
  { id: 'c', title: 'Tasks', content: '3 open · 1 due', cols: 1, rows: 2 },
  { id: 'd', title: 'Chart', content: <Chart />, cols: 2, rows: 2 },
  { id: 'e', title: 'Tip', content: 'Bento layouts mix block sizes.' },
]

const REFLOW: BentoCell[] = [
  { id: 'a', title: 'Hero', content: 'Top-level message', prefCols: 4, prefRows: 1 },
  { id: 'b', title: 'A', content: 'Half-width', prefCols: 2 },
  { id: 'c', title: 'B', content: 'Half-width', prefCols: 2 },
  { id: 'd', title: 'Small 1', content: 'Q', prefCols: 1 },
  { id: 'e', title: 'Small 2', content: 'R', prefCols: 1 },
  { id: 'f', title: 'Small 3', content: 'S', prefCols: 1 },
  { id: 'g', title: 'Small 4', content: 'T', prefCols: 1 },
]

function DragStateful() {
  const [cells, setCells] = useState<BentoCell[]>([
    { id: '1', title: 'Drag me', content: 'I move', cols: 2, rows: 1 },
    { id: '2', title: 'Block', content: 'Swap with neighbor', cols: 1, rows: 1 },
    { id: '3', title: 'Wide', content: 'Wider tile', cols: 2, rows: 2 },
    { id: '4', title: 'Small', content: 'tiny', cols: 1, rows: 1 },
    { id: '5', title: 'Tall', content: 'narrow but tall', cols: 1, rows: 2 },
  ])
  return <Bento variant="drag" cells={cells} cols={4} rowHeight={96} onReorder={setCells} />
}

function ResizeStateful() {
  const [cells, setCells] = useState<BentoCell[]>([
    {
      id: '1',
      title: 'Numeric',
      content: <strong>42</strong>,
      cols: 1, rows: 1,
      legibleSizes: [{ cols: 1, rows: 1 }, { cols: 2, rows: 1 }, { cols: 2, rows: 2 }],
    },
    {
      id: '2',
      title: 'Chart',
      content: <Chart />,
      cols: 2, rows: 2,
      legibleSizes: [{ cols: 2, rows: 2 }, { cols: 3, rows: 2 }, { cols: 4, rows: 3 }],
    },
    {
      id: '3',
      title: 'List',
      content: <p>3 items…</p>,
      cols: 1, rows: 2,
      legibleSizes: [{ cols: 1, rows: 2 }, { cols: 1, rows: 3 }, { cols: 2, rows: 3 }],
    },
  ])
  return (
    <Bento
      variant="resize"
      cells={cells}
      cols={4}
      rowHeight={96}
      onResize={(id, cols, rows) => setCells(prev => prev.map(c => c.id === id ? { ...c, cols, rows } : c))}
    />
  )
}

function Chart() {
  // Tiny sparkline as inline SVG, theme-aware via currentColor.
  const points = [4, 7, 5, 9, 8, 12, 10, 14, 12, 16, 14, 18].map((v, i) => `${i * 8},${24 - v}`).join(' ')
  return (
    <svg viewBox="0 0 100 28" width="100%" height="48" preserveAspectRatio="none" style={{ color: 'var(--color-intent-primary-bg)' }}>
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BentoStories() {
  return (
    <div className="stories__component">
      {VARIANTS.map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'static' && <Cell label="explicit spans"><Bento variant="static" cells={STATIC} cols={4} /></Cell>}
            {variant === 'reflow' && <Cell label="prefCols flow"><Bento variant="reflow" cells={REFLOW} cols={4} /></Cell>}
            {variant === 'drag' && <Cell label="drag to swap"><DragStateful /></Cell>}
            {variant === 'resize' && <Cell label="SE handle snaps to legible sizes"><ResizeStateful /></Cell>}
          </div>
        </section>
      ))}
    </div>
  )
}
