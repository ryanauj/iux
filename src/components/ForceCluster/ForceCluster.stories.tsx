import type { ReactNode } from 'react'
import { ForceCluster, type ForceClusterVariant, type ForceNode, type ForceEdge } from './ForceCluster'

export const VARIANTS: ForceClusterVariant[] = ['hull', 'shaded', 'labeled']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '36rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const PROD_NODES: ForceNode[] = [
  { id: 'eng-a', label: 'Ada',    group: 'engineering', weight: 8 },
  { id: 'eng-b', label: 'Bex',    group: 'engineering', weight: 6 },
  { id: 'eng-c', label: 'Cy',     group: 'engineering', weight: 5 },
  { id: 'eng-d', label: 'Dani',   group: 'engineering', weight: 7 },
  { id: 'eng-e', label: 'Eli',    group: 'engineering', weight: 4 },
  { id: 'des-a', label: 'Fern',   group: 'design',      weight: 6 },
  { id: 'des-b', label: 'Gus',    group: 'design',      weight: 5 },
  { id: 'des-c', label: 'Hana',   group: 'design',      weight: 4 },
  { id: 'pm-a',  label: 'Ira',    group: 'product',     weight: 7 },
  { id: 'pm-b',  label: 'Jess',   group: 'product',     weight: 6 },
  { id: 'pm-c',  label: 'Kel',    group: 'product',     weight: 5 },
  { id: 'mk-a',  label: 'Lin',    group: 'marketing',   weight: 5 },
  { id: 'mk-b',  label: 'Mae',    group: 'marketing',   weight: 4 },
]

const PROD_EDGES: ForceEdge[] = [
  { from: 'eng-a', to: 'eng-b' }, { from: 'eng-b', to: 'eng-c' }, { from: 'eng-c', to: 'eng-d' },
  { from: 'eng-a', to: 'eng-d' }, { from: 'eng-d', to: 'eng-e' }, { from: 'eng-a', to: 'eng-e' },
  { from: 'des-a', to: 'des-b' }, { from: 'des-b', to: 'des-c' }, { from: 'des-a', to: 'des-c' },
  { from: 'pm-a',  to: 'pm-b'  }, { from: 'pm-b',  to: 'pm-c'  }, { from: 'pm-a',  to: 'pm-c'  },
  { from: 'mk-a',  to: 'mk-b'  },
  // Inter-cluster collaboration:
  { from: 'pm-a',  to: 'eng-a', value: 3 },
  { from: 'pm-a',  to: 'des-a', value: 3 },
  { from: 'pm-b',  to: 'eng-c', value: 2 },
  { from: 'des-a', to: 'eng-b', value: 2 },
  { from: 'mk-a',  to: 'pm-c',  value: 2 },
  { from: 'mk-b',  to: 'des-c', value: 2 },
]

const PAPERS_NODES: ForceNode[] = Array.from({ length: 18 }).map((_, i) => {
  const groupIdx = Math.floor(i / 6)
  const group = ['neural', 'symbolic', 'systems'][groupIdx]
  return { id: `p${i}`, label: `p${i}`, group, weight: 1 + ((i * 7) % 4) }
})

const PAPERS_EDGES: ForceEdge[] = []
for (let g = 0; g < 3; g++) {
  for (let i = 0; i < 5; i++) {
    PAPERS_EDGES.push({ from: `p${g * 6 + i}`, to: `p${g * 6 + i + 1}` })
  }
}
PAPERS_EDGES.push({ from: 'p2', to: 'p8', value: 2 })
PAPERS_EDGES.push({ from: 'p4', to: 'p14', value: 2 })
PAPERS_EDGES.push({ from: 'p10', to: 'p16', value: 2 })
PAPERS_EDGES.push({ from: 'p1', to: 'p12', value: 1 })

export function ForceClusterStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'hull' && (
              <Cell label="org collaboration, hull only">
                <ForceCluster variant="hull" nodes={PROD_NODES} edges={PROD_EDGES} width={600} height={400} />
              </Cell>
            )}
            {variant === 'shaded' && (
              <Cell label="citation map, shaded clusters">
                <ForceCluster variant="shaded" nodes={PAPERS_NODES} edges={PAPERS_EDGES} width={600} height={400} />
              </Cell>
            )}
            {variant === 'labeled' && (
              <Cell label="org with cluster labels">
                <ForceCluster variant="labeled" nodes={PROD_NODES} edges={PROD_EDGES} width={600} height={400} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
