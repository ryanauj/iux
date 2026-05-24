import type { ReactNode } from 'react'
import { EdgeBundle, type EdgeBundleVariant, type EdgeBundleNode, type EdgeBundleEdge } from './EdgeBundle'

export const VARIANTS: EdgeBundleVariant[] = ['simple', 'bundled', 'directional']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '30rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const PKG_TREE: EdgeBundleNode = {
  id: 'root', label: 'src',
  children: [
    { id: 'auth', label: 'auth', children: [
      { id: 'auth.login', label: 'login' },
      { id: 'auth.signup', label: 'signup' },
      { id: 'auth.session', label: 'session' },
    ] },
    { id: 'orders', label: 'orders', children: [
      { id: 'orders.cart', label: 'cart' },
      { id: 'orders.checkout', label: 'checkout' },
      { id: 'orders.history', label: 'history' },
    ] },
    { id: 'pay', label: 'payments', children: [
      { id: 'pay.charge', label: 'charge' },
      { id: 'pay.refund', label: 'refund' },
      { id: 'pay.invoice', label: 'invoice' },
    ] },
    { id: 'cat', label: 'catalog', children: [
      { id: 'cat.search', label: 'search' },
      { id: 'cat.detail', label: 'detail' },
      { id: 'cat.reco', label: 'reco' },
    ] },
    { id: 'inf', label: 'infra', children: [
      { id: 'inf.db', label: 'db' },
      { id: 'inf.cache', label: 'cache' },
      { id: 'inf.log', label: 'log' },
    ] },
  ],
}

const DEPS: EdgeBundleEdge[] = [
  { from: 'auth.login', to: 'inf.db' }, { from: 'auth.login', to: 'auth.session' },
  { from: 'auth.signup', to: 'inf.db' }, { from: 'auth.session', to: 'inf.cache' },
  { from: 'orders.cart', to: 'cat.search' }, { from: 'orders.cart', to: 'cat.detail' },
  { from: 'orders.checkout', to: 'pay.charge' }, { from: 'orders.checkout', to: 'auth.session' },
  { from: 'orders.checkout', to: 'inf.db' }, { from: 'orders.history', to: 'inf.db' },
  { from: 'pay.charge', to: 'inf.db' }, { from: 'pay.charge', to: 'inf.log' },
  { from: 'pay.refund', to: 'pay.charge' }, { from: 'pay.invoice', to: 'orders.history' },
  { from: 'cat.search', to: 'inf.cache' }, { from: 'cat.search', to: 'inf.db' },
  { from: 'cat.detail', to: 'inf.db' }, { from: 'cat.reco', to: 'cat.detail' },
  { from: 'cat.reco', to: 'orders.history' },
]

export function EdgeBundleStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'simple' && (
              <Cell label="raw chord lines — hairball, no bundling">
                <EdgeBundle variant="simple" root={PKG_TREE} edges={DEPS} width={460} height={460} />
              </Cell>
            )}
            {variant === 'bundled' && (
              <Cell label="pulled to LCA — ridges follow the tree">
                <EdgeBundle variant="bundled" root={PKG_TREE} edges={DEPS} width={460} height={460} />
              </Cell>
            )}
            {variant === 'directional' && (
              <Cell label="bundled, edges tinted by source module">
                <EdgeBundle variant="directional" root={PKG_TREE} edges={DEPS} width={460} height={460} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
