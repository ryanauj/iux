import type { ReactNode } from 'react'
import { Tree, type TreeVariant, type TreeNode } from './Tree'

export const VARIANTS: TreeVariant[] = ['vertical', 'horizontal', 'compact']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '36rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const ORG: TreeNode = {
  id: 'ceo', label: 'CEO',
  children: [
    {
      id: 'eng', label: 'Engineering',
      children: [
        { id: 'fe', label: 'Frontend' },
        { id: 'be', label: 'Backend', children: [{ id: 'sre', label: 'SRE' }, { id: 'data', label: 'Data' }] },
        { id: 'mob', label: 'Mobile' },
      ],
    },
    { id: 'design', label: 'Design', children: [{ id: 'brand', label: 'Brand' }, { id: 'prod', label: 'Product' }] },
    { id: 'pm', label: 'PM' },
    { id: 'go', label: 'GTM', children: [{ id: 'sales', label: 'Sales' }, { id: 'mktg', label: 'Marketing' }] },
  ],
}

const FILESYS: TreeNode = {
  id: 'root', label: 'src/',
  children: [
    { id: 'comp', label: 'components/', children: [
      { id: 'btn', label: 'Button.tsx' },
      { id: 'inp', label: 'TextInput.tsx' },
      { id: 'crd', label: 'Card.tsx' },
    ] },
    { id: 'apps', label: 'apps/', children: [
      { id: 'hh', label: 'hoops-hub/' },
      { id: 'fly', label: 'flyer/' },
    ] },
    { id: 'lib', label: 'lib/' },
    { id: 'styles', label: 'styles.css' },
  ],
}

const TAXONOMY: TreeNode = {
  id: 'life', label: 'Eukarya',
  children: [
    { id: 'p', label: 'Plants', children: [{ id: 'fl', label: 'Flowering' }, { id: 'nf', label: 'Non-flowering' }] },
    { id: 'a', label: 'Animals', children: [
      { id: 'v', label: 'Vertebrates', children: [
        { id: 'f', label: 'Fish' },
        { id: 'r', label: 'Reptiles' },
        { id: 'b', label: 'Birds' },
        { id: 'm', label: 'Mammals' },
      ] },
      { id: 'i', label: 'Invertebrates' },
    ] },
    { id: 'fu', label: 'Fungi' },
    { id: 'pr', label: 'Protists' },
  ],
}

export function TreeStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'vertical' && (
              <Cell label="org chart">
                <Tree variant="vertical" root={ORG} width={580} height={340} />
              </Cell>
            )}
            {variant === 'horizontal' && (
              <Cell label="file tree">
                <Tree variant="horizontal" root={FILESYS} width={580} height={300} />
              </Cell>
            )}
            {variant === 'compact' && (
              <Cell label="taxonomy — compact">
                <Tree variant="compact" root={TAXONOMY} width={580} height={300} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
