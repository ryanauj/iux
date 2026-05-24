import type { ReactNode } from 'react'
import { ChordDiagram, type ChordDiagramVariant, type ChordNode, type ChordLink } from './ChordDiagram'

export const VARIANTS: ChordDiagramVariant[] = ['simple', 'weighted', 'highlighted']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const REGION_NODES: ChordNode[] = [
  { id: 'us', label: 'US' },
  { id: 'eu', label: 'EU' },
  { id: 'apac', label: 'APAC' },
  { id: 'latam', label: 'LATAM' },
  { id: 'mena', label: 'MENA' },
  { id: 'afr', label: 'AFR' },
]

const REGION_LINKS: ChordLink[] = [
  { from: 'us', to: 'eu', value: 18 },
  { from: 'us', to: 'apac', value: 12 },
  { from: 'us', to: 'latam', value: 9 },
  { from: 'us', to: 'mena', value: 3 },
  { from: 'eu', to: 'apac', value: 8 },
  { from: 'eu', to: 'mena', value: 6 },
  { from: 'eu', to: 'afr', value: 4 },
  { from: 'apac', to: 'latam', value: 4 },
  { from: 'apac', to: 'mena', value: 3 },
  { from: 'mena', to: 'afr', value: 5 },
  { from: 'latam', to: 'afr', value: 2 },
]

const TOPIC_NODES: ChordNode[] = [
  { id: 'auth', label: 'auth' },
  { id: 'pay', label: 'payments' },
  { id: 'cat', label: 'catalog' },
  { id: 'srch', label: 'search' },
  { id: 'rec', label: 'reco' },
]

const TOPIC_LINKS: ChordLink[] = [
  { from: 'auth', to: 'pay', value: 6 },
  { from: 'auth', to: 'cat', value: 4 },
  { from: 'auth', to: 'srch', value: 3 },
  { from: 'pay', to: 'cat', value: 7, highlight: true },
  { from: 'pay', to: 'rec', value: 5, highlight: true },
  { from: 'cat', to: 'srch', value: 8 },
  { from: 'cat', to: 'rec', value: 6 },
  { from: 'srch', to: 'rec', value: 5 },
]

export function ChordDiagramStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'simple' && (
              <Cell label="who-talks-to-whom across teams">
                <ChordDiagram variant="simple" nodes={TOPIC_NODES} links={TOPIC_LINKS} width={400} height={400} />
              </Cell>
            )}
            {variant === 'weighted' && (
              <Cell label="cross-region traffic, opacity = volume">
                <ChordDiagram variant="weighted" nodes={REGION_NODES} links={REGION_LINKS} width={420} height={420} />
              </Cell>
            )}
            {variant === 'highlighted' && (
              <Cell label="walking a path: payments → catalog → reco">
                <ChordDiagram variant="highlighted" nodes={TOPIC_NODES} links={TOPIC_LINKS} width={400} height={400} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
