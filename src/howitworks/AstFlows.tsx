// ABOUTME: Flows view — saved Focus breadcrumb trails replayed as numbered,
// ABOUTME: end-to-end walks through the import graph, reopenable in Focus.

import { Fragment } from 'react'
import { FILE_BY_ID, fileLabel } from './astViews'
import { deleteFlow, useFlows } from './flows'

// ABOUTME: Props for AstFlows: a callback that drops a saved trail back into the Focus view.
/** The Flows list can hand a saved trail to the parent switcher, which loads
 * it into Focus and switches there. */
export interface AstFlowsProps {
  onOpenFlow: (trail: string[]) => void
}

// ABOUTME: Lists every saved flow from localStorage and unrolls its trail into a numbered file-by-file story (each step's name, area, and summary); each flow can be reopened in Focus or deleted.
/**
 * The companion to Focus: where Focus is the live walk, Flows is the library of
 * walks you kept. It reads the persisted trails through {@link useFlows} (so it
 * updates the instant one is saved or deleted) and unrolls each into an ordered
 * list of steps — file name, area, and ABOUTME summary per hop — so a saved
 * path reads as a narrated route from the entry point to the destination.
 * "Open in Focus" replays it ({@link AstFlowsProps.onOpenFlow}); "Delete"
 * forgets it ({@link deleteFlow}).
 */
export function AstFlows({ onOpenFlow }: AstFlowsProps) {
  const flows = useFlows()

  if (flows.length === 0) {
    return (
      <div className="astv">
        <div className="astv-flows__empty">
          <h3 className="astv-flows__empty-title">No saved flows yet</h3>
          <p className="astv-flows__empty-body">
            Open the <strong>Focus</strong> tab and tap <strong>Depends on</strong> /{' '}
            <strong>Used by</strong> cards to walk from one file to the next. The path you
            walk shows up as breadcrumbs; hit <strong>☆ Save flow</strong> to keep it here
            as a reusable, end-to-end trail through the codebase.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="astv astv-flows">
      <p className="astv-flows__hint">
        Saved walks through the import graph. Each flow is the breadcrumb trail you walked in
        Focus, unrolled as an end-to-end route — reopen one to keep exploring from where it
        ends.
      </p>

      {flows.map(flow => (
        <section className="astv-flows__item" key={flow.id}>
          <header className="astv-flows__head">
            <div className="astv-flows__title-wrap">
              <h3 className="astv-flows__name">{flow.name}</h3>
              <p className="astv-flows__meta">
                {flow.trail.length} steps · {fileLabel(flow.trail[0])} →{' '}
                {fileLabel(flow.trail[flow.trail.length - 1])}
              </p>
            </div>
            <div className="astv-flows__actions">
              <button
                type="button"
                className="astg__btn is-active"
                onClick={() => onOpenFlow(flow.trail)}
              >
                Open in Focus
              </button>
              <button type="button" className="astg__btn" onClick={() => deleteFlow(flow.id)}>
                Delete
              </button>
            </div>
          </header>

          <ol className="astv-flows__steps">
            {flow.trail.map((id, i) => {
              const f = FILE_BY_ID.get(id)
              return (
                <Fragment key={`${id}#${i}`}>
                  {i > 0 && (
                    <li className="astv-flows__arrow" aria-hidden="true">
                      ↓
                    </li>
                  )}
                  <li className="astv-flows__step">
                    <span className="astv-flows__step-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="astv-flows__step-text">
                      <span className="astv-flows__step-name">
                        {f?.name ?? fileLabel(id)}
                        {f && <span className="astv-flows__step-area">{f.area}</span>}
                      </span>
                      {f?.about && <span className="astv-flows__step-about">{f.about}</span>}
                    </span>
                  </li>
                </Fragment>
              )
            })}
          </ol>
        </section>
      ))}
    </div>
  )
}
