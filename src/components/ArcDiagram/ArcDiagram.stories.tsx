import type { ReactNode } from 'react'
import { ArcDiagram, type ArcDiagramVariant, type ArcNode, type ArcEdge } from './ArcDiagram'

export const VARIANTS: ArcDiagramVariant[] = ['simple', 'weighted', 'bipartite']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '34rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const COAUTH_NODES: ArcNode[] = [
  { id: 'a', label: 'Alex', group: 'eng' },
  { id: 'b', label: 'Bren', group: 'eng' },
  { id: 'c', label: 'Cira', group: 'eng' },
  { id: 'd', label: 'Dani', group: 'design' },
  { id: 'e', label: 'Evan', group: 'design' },
  { id: 'f', label: 'Fern', group: 'pm' },
  { id: 'g', label: 'Gus', group: 'pm' },
  { id: 'h', label: 'Hana', group: 'data' },
]

const COAUTH_EDGES: ArcEdge[] = [
  { from: 'a', to: 'b', value: 6 }, { from: 'a', to: 'c', value: 4 }, { from: 'b', to: 'd', value: 3 },
  { from: 'c', to: 'e', value: 2 }, { from: 'd', to: 'f', value: 5 }, { from: 'e', to: 'g', value: 4 },
  { from: 'f', to: 'h', value: 6 }, { from: 'g', to: 'h', value: 3 }, { from: 'a', to: 'h', value: 2 },
  { from: 'b', to: 'g', value: 5 }, { from: 'c', to: 'f', value: 4 },
]

const PEOPLE: ArcNode[] = [
  { id: 'a', label: 'Alex', group: 'people' },
  { id: 'b', label: 'Bren', group: 'people' },
  { id: 'c', label: 'Cira', group: 'people' },
  { id: 'd', label: 'Dani', group: 'people' },
  { id: 'e', label: 'Evan', group: 'people' },
]

const PROJECTS: ArcNode[] = [
  { id: 'auth', label: 'auth', group: 'projects' },
  { id: 'pay', label: 'payments', group: 'projects' },
  { id: 'cat', label: 'catalog', group: 'projects' },
  { id: 'rec', label: 'reco', group: 'projects' },
]

const MEMBERSHIPS: ArcEdge[] = [
  { from: 'a', to: 'auth' }, { from: 'a', to: 'pay' },
  { from: 'b', to: 'pay' }, { from: 'b', to: 'cat' },
  { from: 'c', to: 'cat' }, { from: 'c', to: 'rec' },
  { from: 'd', to: 'auth' }, { from: 'd', to: 'rec' },
  { from: 'e', to: 'pay' }, { from: 'e', to: 'rec' },
]

export function ArcDiagramStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'simple' && (
              <Cell label="co-authorship — uniform arcs">
                <ArcDiagram variant="simple" nodes={COAUTH_NODES} edges={COAUTH_EDGES} width={560} height={260} />
              </Cell>
            )}
            {variant === 'weighted' && (
              <Cell label="co-authorship, arc stroke = shared PRs">
                <ArcDiagram variant="weighted" nodes={COAUTH_NODES} edges={COAUTH_EDGES} width={560} height={260} />
              </Cell>
            )}
            {variant === 'bipartite' && (
              <Cell label="people ↔ projects membership">
                <ArcDiagram variant="bipartite" nodes={[...PEOPLE, ...PROJECTS]} edges={MEMBERSHIPS} width={560} height={260} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
