// ABOUTME: Focus view — one file at a time with its dependency neighbours as
// ABOUTME: tappable cards, traversing the import graph one hop at a time.

import { useMemo, useState } from 'react'
import {
  GRAPH,
  FILE_BY_ID,
  MOST_CONNECTED_FILE,
  fileMatches,
  importedBy,
  importsOf,
} from './astViews'
import { memberKindColor, memberKindGlyph } from './astGraphNodes'

// ABOUTME: A single focused file fills the screen — its summary and members — flanked by "Depends on" and "Used by" neighbour cards.
/**
 * A single focused file fills the screen — its summary and members — flanked
 * by "Depends on" and "Used by" neighbour cards. Tapping a card moves focus
 * there and records the hop, so reading the graph becomes a familiar
 * drill-in / back navigation instead of a pan across a canvas.
 */
export function AstFocus() {
  const [focusId, setFocusId] = useState(MOST_CONNECTED_FILE)
  const [history, setHistory] = useState<string[]>([])
  const [query, setQuery] = useState('')

  const file = FILE_BY_ID.get(focusId)
  const deps = importsOf(focusId)
  const used = importedBy(focusId)

  const go = (id: string) => {
    if (id === focusId) return
    setHistory(h => [...h, focusId])
    setFocusId(id)
    setQuery('')
  }
  const back = () => {
    if (history.length === 0) return
    setFocusId(history[history.length - 1])
    setHistory(history.slice(0, -1))
  }

  const q = query.trim().toLowerCase()
  const matches = useMemo(() => {
    if (!q) return []
    return GRAPH.files.filter(f => fileMatches(f, q)).slice(0, 8)
  }, [q])

  const NeighbourCard = ({ id }: { id: string }) => {
    const f = FILE_BY_ID.get(id)
    if (!f) return null
    return (
      <button type="button" className="astv-card" onClick={() => go(id)} title={id}>
        <span className="astv-card__top">
          <span className="astv-card__name">{f.name}</span>
          <span className="astv-card__area">{f.area}</span>
        </span>
        {f.about && <span className="astv-card__about">{f.about}</span>}
      </button>
    )
  }

  return (
    <div className="astv">
      <div className="astv-focus__bar">
        {history.length > 0 && (
          <button type="button" className="astg__btn astv-focus__back" onClick={back}>
            ← Back
          </button>
        )}
        <div className="astv-focus__search">
          <input
            className="astg__search"
            type="search"
            inputMode="search"
            placeholder="Jump to a file…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Jump to a file"
          />
          {matches.length > 0 && (
            <ul className="astv-focus__results" role="listbox">
              {matches.map(m => (
                <li key={m.id}>
                  <button type="button" className="astv-focus__result" onClick={() => go(m.id)}>
                    <span className="astv-focus__result-name">{m.name}</span>
                    <span className="astv-focus__result-dir">{m.dir}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {history.length === 0 && (
        <p className="astv-focus__hint">
          Starting at the most-connected file. Tap any <strong>Depends on</strong> or{' '}
          <strong>Used by</strong> card to walk the import graph one hop at a time — a{' '}
          <strong>Back</strong> button appears once you do.
        </p>
      )}

      {file && (
        <article className="astv-focus">
          <header className="astv-focus__head">
            <span className="astv-focus__area">{file.area}</span>
            <h3 className="astv-focus__name">{file.name}</h3>
            <p className="astv-focus__dir">{file.dir}</p>
            {file.about && <p className="astv-focus__about">{file.about}</p>}
          </header>

          {file.members.length > 0 && (
            <ul className="astv-members astv-focus__members">
              {file.members.map(m => (
                <li className="astv-member" key={m.name}>
                  <span
                    className="astv-member__dot"
                    style={{ color: memberKindColor(m.kind) }}
                    title={m.kind}
                    aria-hidden="true"
                  >
                    {memberKindGlyph(m.kind)}
                  </span>
                  <span className="astv-member__text">
                    <span className={`astv-member__name${m.exported ? ' is-exported' : ''}`}>{m.name}</span>
                    {m.about && <span className="astv-member__about">{m.about}</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="astv-focus__links">
            <section className="astv-focus__col">
              <h4 className="astv-focus__col-title">
                Depends on <span className="astv-links__count">{deps.length}</span>
              </h4>
              {deps.length === 0 ? (
                <p className="astv-focus__empty">No internal imports.</p>
              ) : (
                deps.map(id => <NeighbourCard key={id} id={id} />)
              )}
            </section>
            <section className="astv-focus__col">
              <h4 className="astv-focus__col-title">
                Used by <span className="astv-links__count">{used.length}</span>
              </h4>
              {used.length === 0 ? (
                <p className="astv-focus__empty">Nothing imports this yet.</p>
              ) : (
                used.map(id => <NeighbourCard key={id} id={id} />)
              )}
            </section>
          </div>
        </article>
      )}
    </div>
  )
}
