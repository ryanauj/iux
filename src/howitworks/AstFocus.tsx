// ABOUTME: Focus view — one file or member at a time with its dependency
// ABOUTME: neighbours as tappable cards/chips, the walked path kept as saveable breadcrumbs.

import { Fragment, useMemo, useState } from 'react'
import {
  FILE_BY_ID,
  importedBy,
  importersOfMember,
  importMembersOf,
  importsOf,
  isMemberNode,
  memberNodeId,
  nodeLabel,
  parseNodeId,
  searchNodes,
} from './astViews'
import { saveFlow } from './flows'
import { memberKindColor, memberKindGlyph } from './astGraphNodes'

// ABOUTME: Props for AstFocus: the controlled breadcrumb trail (file or member node ids, root first) and a callback to replace it.
/** The breadcrumb trail is owned by the parent switcher so the Flows view can
 * drop a saved trail straight into Focus. The last id is the focused node — a
 * file (`src/foo.ts`) or a member (`src/foo.ts#bar`). */
export interface AstFocusProps {
  trail: string[]
  onTrailChange: (trail: string[]) => void
}

// ABOUTME: Shows a single focused file or member flanked by "Depends on" / "Used by" neighbours; "Depends on" cards drill into the exact methods/classes/types imported (importMembersOf) and a focused member's "Used by" lists the files that import it (importersOfMember). Tapping any card or member chip extends a breadcrumb trail you can backtrack and save as a flow.
/**
 * A single focused node fills the screen. When it's a **file**, its summary and
 * members show between "Depends on" ({@link importMembersOf}, rendered as the
 * dependency files with the specific members imported from each as selectable
 * chips) and "Used by" ({@link importedBy}) cards; each member row is itself
 * selectable and carries how many files import it. When it's a **member**, its
 * "Used by" is the precise set of files that import that method/class/type
 * ({@link importersOfMember}), while "Depends on" stays the containing file's
 * outgoing member dependencies so the walk continues. Tapping any card or chip
 * moves focus there and appends it to the breadcrumb trail, so reading the
 * graph becomes a drill-in you can retrace by clicking a crumb (or, for a node
 * already on the trail, by tapping its card to jump back). Once the trail has
 * more than one node it can be named and saved with {@link saveFlow}, after
 * which the Flows view replays it end-to-end.
 */
export function AstFocus({ trail, onTrailChange }: AstFocusProps) {
  const [query, setQuery] = useState('')
  const [naming, setNaming] = useState(false)
  const [flowName, setFlowName] = useState('')
  const [savedName, setSavedName] = useState<string | null>(null)

  const focusId = trail[trail.length - 1] ?? ''
  const { fileId, member: memberName } = parseNodeId(focusId)
  const file = FILE_BY_ID.get(fileId)
  const member = memberName ? file?.members.find(m => m.name === memberName) : undefined

  // "Depends on" is always the containing file's outgoing member dependencies,
  // so a focused member still lets you walk into what its file imports. Every
  // dependency file shows, with the specific members imported from it as chips.
  const depGroups = useMemo(() => {
    const byTarget = new Map(importMembersOf(fileId).map(g => [g.target, g.members]))
    return importsOf(fileId).map(target => ({ target, members: byTarget.get(target) ?? [] }))
  }, [fileId])

  // "Used by" is precise to the focus: for a member, the files that import that
  // exact member; for a file, the files that import the file.
  const usedBy = member ? importersOfMember(focusId) : importedBy(fileId)

  // Walking to a node already on the trail backtracks to it (no cycles in the
  // breadcrumbs); a new node extends the path. Either way the save UI resets.
  const go = (id: string) => {
    if (id === focusId) return
    const seen = trail.indexOf(id)
    onTrailChange(seen >= 0 ? trail.slice(0, seen + 1) : [...trail, id])
    setQuery('')
    setNaming(false)
    setSavedName(null)
  }

  // Clicking a crumb truncates the trail back to that node.
  const goToCrumb = (index: number) => {
    if (index === trail.length - 1) return
    onTrailChange(trail.slice(0, index + 1))
    setNaming(false)
    setSavedName(null)
  }

  const beginSave = () => {
    setFlowName(`${nodeLabel(trail[0])} → ${nodeLabel(focusId)}`)
    setSavedName(null)
    setNaming(true)
  }

  const commitSave = () => {
    const saved = saveFlow(flowName, trail)
    setNaming(false)
    if (saved) setSavedName(saved.name)
  }

  const q = query.trim().toLowerCase()
  const matches = useMemo(() => searchNodes(q, 10), [q])

  // A dependency file plus the exact members imported from it. The card jumps to
  // the file; each chip jumps to that member node — both extend the trail.
  const DepCard = ({ target, members }: { target: string; members: string[] }) => {
    const f = FILE_BY_ID.get(target)
    if (!f) return null
    const onTrail = trail.includes(target)
    return (
      <div className="astv-dep">
        <button
          type="button"
          className={`astv-card${onTrail ? ' is-on-trail' : ''}`}
          onClick={() => go(target)}
          title={onTrail ? `${target} — already on your trail (tap to backtrack)` : target}
        >
          <span className="astv-card__top">
            <span className="astv-card__name">{f.name}</span>
            <span className="astv-card__area">{f.area}</span>
          </span>
          {f.about && <span className="astv-card__about">{f.about}</span>}
        </button>
        {members.length > 0 && (
          <div className="astv-dep__chips">
            {members.map(name => (
              <MemberChip key={name} fileId={target} name={name} />
            ))}
          </div>
        )}
      </div>
    )
  }

  // A single imported member, rendered as a selectable chip with its kind glyph.
  const MemberChip = ({ fileId: fid, name }: { fileId: string; name: string }) => {
    const id = memberNodeId(fid, name)
    const m = FILE_BY_ID.get(fid)?.members.find(x => x.name === name)
    const onTrail = trail.includes(id)
    return (
      <button
        type="button"
        className={`astv-mchip${onTrail ? ' is-on-trail' : ''}`}
        onClick={() => go(id)}
        title={onTrail ? `${name} — already on your trail (tap to backtrack)` : `${name} — ${m?.kind ?? 'member'}`}
      >
        {m && (
          <span className="astv-mchip__dot" style={{ color: memberKindColor(m.kind) }} aria-hidden="true">
            {memberKindGlyph(m.kind)}
          </span>
        )}
        <span className="astv-mchip__name">{name}</span>
      </button>
    )
  }

  // A plain file card (used by the "Used by" column, which lists whole files).
  const FileCard = ({ id }: { id: string }) => {
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
            placeholder="Jump to a file or member…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Jump to a file or member"
          />
          {matches.length > 0 && (
            <ul className="astv-focus__results" role="listbox">
              {matches.map(m => (
                <li key={m.id}>
                  <button type="button" className="astv-focus__result" onClick={() => go(m.id)}>
                    <span className="astv-focus__result-top">
                      {m.member && (
                        <span
                          className="astv-focus__result-dot"
                          style={{ color: memberKindColor(m.member.kind) }}
                          aria-hidden="true"
                        >
                          {memberKindGlyph(m.member.kind)}
                        </span>
                      )}
                      <span className="astv-focus__result-name">{m.member ? m.member.name : m.file.name}</span>
                    </span>
                    <span className="astv-focus__result-dir">{m.member ? m.file.name : m.file.dir}</span>
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
                  className={`astv-focus__crumb${isMemberNode(id) ? ' is-member' : ''}`}
                  aria-current={i === trail.length - 1 ? 'page' : undefined}
                  onClick={() => goToCrumb(i)}
                  title={id}
                >
                  {nodeLabel(id)}
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
          <strong>Used by</strong> card to walk the import graph one hop at a time — drill into a{' '}
          <strong>method, class or type</strong> via its chip, and your path builds up as{' '}
          <strong>breadcrumbs</strong> you can click to backtrack and <strong>save as a flow</strong>.
        </p>
      )}

      {file && (
        <article className="astv-focus">
          {member ? (
            <header className="astv-focus__head astv-focus__head--member">
              <span className="astv-focus__member-kind" style={{ color: memberKindColor(member.kind) }}>
                <span aria-hidden="true">{memberKindGlyph(member.kind)}</span> {member.kind}
              </span>
              <h3 className="astv-focus__name">{member.name}</h3>
              <p className="astv-focus__dir">
                in{' '}
                <button type="button" className="astv-focus__in-file" onClick={() => go(fileId)} title={fileId}>
                  {file.name}
                </button>{' '}
                · {file.area}
              </p>
              {member.about && <p className="astv-focus__about">{member.about}</p>}
            </header>
          ) : (
            <header className="astv-focus__head">
              <span className="astv-focus__area">{file.area}</span>
              <h3 className="astv-focus__name">{file.name}</h3>
              <p className="astv-focus__dir">{file.dir}</p>
              {file.about && <p className="astv-focus__about">{file.about}</p>}
            </header>
          )}

          {!member && file.members.length > 0 && (
            <ul className="astv-members astv-focus__members">
              {file.members.map(m => {
                const usedCount = importersOfMember(memberNodeId(file.id, m.name)).length
                return (
                  <li className="astv-member" key={m.name}>
                    <button
                      type="button"
                      className="astv-member__btn"
                      onClick={() => go(memberNodeId(file.id, m.name))}
                      title={`Focus ${m.name} — ${m.kind}`}
                    >
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
                      {usedCount > 0 && (
                        <span className="astv-member__used" title={`Imported by ${usedCount} file(s)`}>
                          ↩ {usedCount}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          <div className="astv-focus__links">
            <section className="astv-focus__col">
              <h4 className="astv-focus__col-title">
                {member ? `${file.name} depends on` : 'Depends on'}{' '}
                <span className="astv-links__count">{depGroups.length}</span>
              </h4>
              {depGroups.length === 0 ? (
                <p className="astv-focus__empty">No internal imports.</p>
              ) : (
                depGroups.map(g => <DepCard key={g.target} target={g.target} members={g.members} />)
              )}
            </section>
            <section className="astv-focus__col">
              <h4 className="astv-focus__col-title">
                {member ? 'Imported by' : 'Used by'} <span className="astv-links__count">{usedBy.length}</span>
              </h4>
              {usedBy.length === 0 ? (
                <p className="astv-focus__empty">
                  {member ? 'Nothing imports this member by name yet.' : 'Nothing imports this yet.'}
                </p>
              ) : (
                usedBy.map(id => <FileCard key={id} id={id} />)
              )}
            </section>
          </div>
        </article>
      )}
    </div>
  )
}
