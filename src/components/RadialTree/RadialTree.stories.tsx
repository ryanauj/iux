import type { ReactNode } from 'react'
import { RadialTree, type RadialTreeVariant, type RadialTreeNode } from './RadialTree'

export const VARIANTS: RadialTreeVariant[] = ['straight', 'curved', 'compact']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const TAXONOMY: RadialTreeNode = {
  id: 'life', label: 'Life', children: [
    { id: 'plant', label: 'Plantae', children: [
      { id: 'moss', label: 'Mosses' },
      { id: 'fern', label: 'Ferns' },
      { id: 'conif', label: 'Conifers' },
      { id: 'flow', label: 'Flowering' },
    ]},
    { id: 'animal', label: 'Animalia', children: [
      { id: 'inv', label: 'Invertebrates', children: [
        { id: 'mol', label: 'Mollusca' },
        { id: 'arth', label: 'Arthropoda' },
        { id: 'cni', label: 'Cnidaria' },
      ]},
      { id: 'vert', label: 'Vertebrates', children: [
        { id: 'fish', label: 'Fish' },
        { id: 'amph', label: 'Amphibians' },
        { id: 'rept', label: 'Reptiles' },
        { id: 'bird', label: 'Birds' },
        { id: 'mam', label: 'Mammals' },
      ]},
    ]},
    { id: 'fungi', label: 'Fungi', children: [
      { id: 'asco', label: 'Ascomycota' },
      { id: 'basi', label: 'Basidiomycota' },
    ]},
    { id: 'prot', label: 'Protista', children: [
      { id: 'alg', label: 'Algae' },
      { id: 'amoeb', label: 'Amoeba' },
    ]},
  ],
}

const DENSE: RadialTreeNode = {
  id: 'r', label: 'root', children: Array.from({ length: 8 }).map((_, g) => ({
    id: `g${g}`, label: `g${g}`, children: Array.from({ length: 6 }).map((_, j) => ({
      id: `g${g}-${j}`, label: `${g}.${j}`,
    })),
  })),
}

export function RadialTreeStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'straight' && (
              <Cell label="taxonomy of life">
                <RadialTree variant="straight" root={TAXONOMY} width={460} height={460} />
              </Cell>
            )}
            {variant === 'curved' && (
              <Cell label="curved-edge sweep">
                <RadialTree variant="curved" root={TAXONOMY} width={460} height={460} />
              </Cell>
            )}
            {variant === 'compact' && (
              <Cell label="48 leaves, compact ring">
                <RadialTree variant="compact" root={DENSE} width={460} height={460} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
