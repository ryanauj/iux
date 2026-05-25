import type { ReactNode } from 'react'
import { IndentTree, type IndentTreeVariant, type IndentTreeNode } from './IndentTree'

export const VARIANTS: IndentTreeVariant[] = ['plain', 'guides', 'meta']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const FS: IndentTreeNode = {
  id: 'root', label: 'iux/', children: [
    { id: 'src', label: 'src/', children: [
      { id: 'comp', label: 'components/', children: [
        { id: 'button', label: 'Button/', meta: '12 KB', weight: 12 },
        { id: 'card', label: 'Card/', meta: '9 KB', weight: 9 },
        { id: 'nodelink', label: 'NodeLink/', meta: '28 KB', weight: 28 },
        { id: 'tree', label: 'Tree/', meta: '14 KB', weight: 14 },
      ]},
      { id: 'apps', label: 'apps/', children: [
        { id: 'sports', label: 'sports/', meta: '46 KB', weight: 46 },
      ]},
      { id: 'styles', label: 'styles.css', meta: '52 KB', weight: 52 },
    ]},
    { id: 'palettes', label: 'palettes/', children: [
      { id: 'editorial', label: 'editorial.ts', meta: '6 KB', weight: 6 },
      { id: 'memphis', label: 'memphis.ts', meta: '7 KB', weight: 7 },
      { id: 'aurora', label: 'aurora.ts', meta: '8 KB', weight: 8 },
    ]},
    { id: 'readme', label: 'README.md', meta: '29 KB', weight: 29 },
  ],
}

const ORG: IndentTreeNode = {
  id: 'co', label: 'Company', intent: 'neutral', children: [
    { id: 'eng', label: 'Engineering', intent: 'primary', children: [
      { id: 'web', label: 'Web', meta: '14' },
      { id: 'mob', label: 'Mobile', meta: '8' },
      { id: 'infra', label: 'Infrastructure', meta: '11' },
    ]},
    { id: 'des', label: 'Design', intent: 'info', children: [
      { id: 'sys', label: 'Design systems', meta: '4' },
      { id: 'brand', label: 'Brand', meta: '3' },
    ]},
    { id: 'pm', label: 'Product', intent: 'success', children: [
      { id: 'core', label: 'Core', meta: '6' },
      { id: 'growth', label: 'Growth', meta: '4' },
    ]},
  ],
}

export function IndentTreeStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'plain' && (
              <Cell label="org tree, plain indent">
                <IndentTree variant="plain" root={ORG} width={440} />
              </Cell>
            )}
            {variant === 'guides' && (
              <Cell label="repo tree with guide rules">
                <IndentTree variant="guides" root={FS} width={460} />
              </Cell>
            )}
            {variant === 'meta' && (
              <Cell label="du -sh: guides + size bars">
                <IndentTree variant="meta" root={FS} width={520} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
