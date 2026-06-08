// ABOUTME: Focus view — one file at a time with its dependency neighbours as
// ABOUTME: tappable cards, the walked path kept as saveable breadcrumbs.

import { Fragment, useMemo, useState } from 'react'
import {
  GRAPH,
  FILE_BY_ID,
  fileLabel,
  fileMatches,
  importedBy,
  importsOf,
} from './astViews'
import { saveFlow } from './flows'
import { memberKindColor, memberKindGlyph } from './astGraphNodes'

// ABOUTME: Props for AstFocus: the controlled breadcrumb trail (file ids, root first) and a callback to replace it.
/** The breadcrumb trail is owned by the parent switcher so the Flows view can
 * drop a saved trail straight into Focus. The last id is the focused file. */
export interface AstFocusProps {
  trail: string[]
  onTrailChange: (trail: string[]) => void
}

// ABOUTME: Shows a single file's summary and members between "Depends on" / "Used by" neighbour cards (from importsOf / importedBy); tapping a card extends a breadcrumb trail you can click to backtrack and save to localStorage as a reusable flow.
/**
 * A single focused file fills the screen — its summary and members — flanked
 * by "Depends on" ({@link importsOf}) and "Used by" ({@link importedBy})
 * neighbour cards. It opens on the app entry point so every walk starts where
 * the app boots; the jump box filters with {@link fileMatches}. Tapping a card
 * moves focus there and appends it to the breadcrumb trail, so reading the
 * graph becomes a drill-in you can retrace by clicking any crumb (or, for a
 * file already on the trail, by tapping its card to jump back). Once the trail
 * has more than one file it can be named and saved with {@link saveFlow}, after
 * which the Flows view replays it as an end-to-end story — the same import
 * links the Outline shows as chips and the Matrix aggregates by area, here
 * walked one hop at a time and kept as a path.
 */
export function AstFocus({ trail, onTrailChange }: AstFocusProps) {
  const [query, setQuery] = useState('')
  const [naming, setNaming] = useState(false)
  const [flowName, setFlowName] = useState('')
  const [savedName, setSavedName] = useState<string | null>(null)

  const focusId = trail[trail.length - 1] ?? ''
  const file = FILE_BY_ID.get(focusId)
  const deps = importsOf(focusId)
  const used = importedBy(focusId)

  // Walking to a file already on the trail backtracks to it (no cycles in the
  // breadcrumbs); a new file extends the path. Either way the save UI resets.
  const go = (id: string) => {
    if (id === focusId) return
    const seen = trail.indexOf(id)
    onTrailChange(seen >= 0 ? trail.slice(0, seen + 1) : [...trail, id])
    setQuery('')
    setNaming(false)
    setSavedName(null)
  }

  // Clicking a crumb truncates the trail back to that file.
  const goToCrumb = (index: number) => {
    if (index === trail.length - 1) return
    onTrailChange(trail.slice(0, index + 1))
    setNaming(false)
    setSavedName(null)
  }

  const beginSave = () => {
    setFlowName(`${fileLabel(trail[0])} → ${fileLabel(focusId)}`)
    setSavedName(null)
    setNaming(true)
  }

  const commitSave = () => {
    const saved = saveFlow(flowName, trail)
    setNaming(false)
    if (saved) setSavedName(saved.name)
  }

  const q = query.trim().toLowerCase()
  const matches = useMemo(() => {
    if (!q) return []
    return GRAPH.files.filter(f => fileMatches(f, q)).slice(0, 8)
  }, [q])

  const NeighbourCard = ({ id }: { id: string }) => {
    const f = FILE_BY_ID.get(id)
    if (!f) return null
    const onTrail = trail.includes(id)
    return (
      <button
        type="button"
        className={`astv-card${onTrail ? ' is-on-trail' : ''}`}
        onClick={() => go(id)}
        title={onTrail ? `${id} — already on your trail (tap to backtrack)` : id}
      >
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

      <nav className="astv-focus__crumbs" aria-label="Breadcrumb">
        <ol className="astv-focus__crumb-list">
          {trail.map((id, i) => (
            <Fragment key={`${id}#${i}`}>
              {i > 0 && (
                <li className="astv-focus__crumb-sep" aria-hidden="true">
                  ›
                </li>
              )}
              <li>
                <button
                  type="button"
                  className="astv-focus__crumb"
                  aria-current={i === trail.length - 1 ? 'page' : undefined}
                  onClick={() => goToCrumb(i)}
                >
                  {fileLabel(id)}
                </button>
              </li>
            </Fragment>
          ))}
        </ol>

        {trail.length > 1 &&
          (naming ? (
            <form
              className="astv-focus__save-form"
              onSubmit={e => {
                e.preventDefault()
                commitSave()
              }}
            >
              <input
                className="astg__search astv-focus__save-input"
                type="text"
                placeholder="Name this flow…"
                value={flowName}
                onChange={e => setFlowName(e.target.value)}
                aria-label="Flow name"
                autoFocus
              />
              <button type="submit" className="astg__btn is-active">
                Save
              </button>
              <button type="button" className="astg__btn" onClick={() => setNaming(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <button type="button" className="astg__btn astv-focus__save" onClick={beginSave}>
              ☆ Save flow
            </button>
          ))}
      </nav>

      {savedName && (
        <p className="astv-focus__saved" role="status">
          Saved “{savedName}” — find it under the <strong>Flows</strong> tab.
        </p>
      )}

      {trail.length === 1 && (
        <p className="astv-focus__hint">
          Starting at the app entry point. Tap any <strong>Depends on</strong> or{' '}
          <strong>Used by</strong> card to walk the import graph one hop at a time — your path
          builds up as <strong>breadcrumbs</strong> you can click to backtrack and{' '}
          <strong>save as a flow</strong>.
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
