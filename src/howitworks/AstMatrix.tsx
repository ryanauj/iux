// ABOUTME: Matrix view — a compact area×area dependency heat-grid that fits a
// ABOUTME: phone, with a tap-to-expand drawer of the file links behind a cell.

import { useState, type ReactNode } from 'react'
import { GRAPH, AREA_MATRIX, AREA_MATRIX_MAX, fileLabel } from './astViews'

/** Short axis code for an area, e.g. `components` → `cmp`, `(root)` → `rt`. */
function areaCode(id: string): string {
  if (id === '(root)') return 'rt'
  return id.replace(/[^a-z]/gi, '').slice(0, 3).toLowerCase()
}

// ABOUTME: Rows are the importing area, columns the imported area; a cell's shade is how many file→file imports cross from row to column.
/**
 * Rows are the importing area, columns the imported area; a cell's shade is how
 * many file→file imports cross from row to column. The whole 14×14 grid fits a
 * narrow screen with no panning, giving a bird's-eye of which parts of the
 * codebase lean on which. Tapping a cell opens the exact file links behind it.
 */
export function AstMatrix() {
  const areas = GRAPH.areas
  const [sel, setSel] = useState<{ from: string; to: string } | null>(null)

  const cell = (from: string, to: string) => AREA_MATRIX.get(from)?.get(to)
  const selected = sel ? cell(sel.from, sel.to) : null

  return (
    <div className="astv">
      <p className="astv-matrix__hint">
        Rows import columns. Darker cells carry more file-to-file imports — tap one to list them.
      </p>

      <div className="astv-matrix__scroll">
        <div
          className="astv-matrix"
          style={{ gridTemplateColumns: `var(--astv-rowlabel) repeat(${areas.length}, 1fr)` }}
          role="grid"
        >
          {/* Header row: corner + column codes */}
          <span className="astv-matrix__corner" aria-hidden="true" />
          {areas.map(a => (
            <span key={a.id} className="astv-matrix__colhead" title={a.label}>
              {areaCode(a.id)}
            </span>
          ))}

          {/* Body rows */}
          {areas.map(from => (
            <Row key={from.id} fromId={from.id} fromLabel={from.label}>
              {areas.map(to => {
                const c = cell(from.id, to.id)
                const count = c?.count ?? 0
                const intensity = count === 0 ? 0 : Math.sqrt(count) / Math.sqrt(AREA_MATRIX_MAX)
                const isSel = sel?.from === from.id && sel?.to === to.id
                const isDiag = from.id === to.id
                return (
                  <button
                    key={to.id}
                    type="button"
                    className={`astv-cell${isSel ? ' is-selected' : ''}${isDiag ? ' is-diag' : ''}`}
                    onClick={() => setSel(count ? { from: from.id, to: to.id } : null)}
                    disabled={count === 0}
                    title={`${from.label} → ${to.label}: ${count}`}
                    aria-label={`${from.label} imports ${to.label}, ${count} links`}
                  >
                    <span className="astv-cell__fill" style={{ opacity: intensity * 0.9 }} aria-hidden="true" />
                    {count > 0 && <span className="astv-cell__n">{count}</span>}
                  </button>
                )
              })}
            </Row>
          ))}
        </div>
      </div>

      {sel && selected && (
        <div className="astv-matrix__drawer">
          <div className="astv-matrix__drawer-head">
            <span>
              <strong>{sel.from}</strong> → <strong>{sel.to}</strong>
              <span className="astv-links__count">{selected.count}</span>
            </span>
            <button type="button" className="astg__btn" onClick={() => setSel(null)}>
              Close
            </button>
          </div>
          <ul className="astv-matrix__pairs">
            {selected.pairs.map(p => (
              <li key={`${p.source}->${p.target}`} className="astv-matrix__pair">
                <span className="astv-matrix__pair-src">{fileLabel(p.source)}</span>
                <span className="astv-matrix__pair-arrow" aria-hidden="true">
                  →
                </span>
                <span className="astv-matrix__pair-dst">{fileLabel(p.target)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function Row({
  fromId,
  fromLabel,
  children,
}: {
  fromId: string
  fromLabel: string
  children: ReactNode
}) {
  return (
    <>
      <span className="astv-matrix__rowhead" title={fromId}>
        {fromLabel}
      </span>
      {children}
    </>
  )
}
