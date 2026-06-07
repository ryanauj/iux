// ABOUTME: Outline view — an indented disclosure list of areas, files, members
// ABOUTME: and each file's import links, built for vertical scrolling on mobile.

import { useMemo, useState } from 'react'
import {
  GRAPH,
  FILE_BY_ID,
  FILES_BY_AREA,
  fileLabel,
  fileMatches,
  importedBy,
  importsOf,
} from './astViews'
import { memberKindColor, memberKindGlyph } from './astGraphNodes'

const elementId = (fileId: string) => `astv-of-${fileId}`

// ABOUTME: AstOutline — a React component.
/**
 * The graph as a nested list: tap an area to reveal its files, tap a file to
 * reveal its members and the files it imports / is imported by. Links are
 * tappable chips that jump to the target file, so the dependency structure is
 * navigable without ever leaving the vertical scroll.
 */
export function AstOutline() {
  const [query, setQuery] = useState('')
  const [openAreas, setOpenAreas] = useState<Set<string>>(new Set())
  const [openFiles, setOpenFiles] = useState<Set<string>>(new Set())

  const q = query.trim().toLowerCase()

  // While searching, only matching files show and their areas/files auto-open.
  const matched = useMemo(() => {
    if (!q) return null
    const set = new Set<string>()
    for (const f of GRAPH.files) if (fileMatches(f, q)) set.add(f.id)
    return set
  }, [q])

  const toggleArea = (id: string) =>
    setOpenAreas(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  const toggleFile = (id: string) =>
    setOpenFiles(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const jumpTo = (id: string) => {
    const area = FILE_BY_ID.get(id)?.area
    if (area) setOpenAreas(prev => new Set(prev).add(area))
    setOpenFiles(prev => new Set(prev).add(id))
    setQuery('')
    requestAnimationFrame(() => {
      document.getElementById(elementId(id))?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  const areaOpen = (id: string) => (matched ? true : openAreas.has(id))
  const fileOpen = (id: string) => (matched ? true : openFiles.has(id))

  const LinkRow = ({ label, ids }: { label: string; ids: string[] }) =>
    ids.length === 0 ? null : (
      <div className="astv-links">
        <span className="astv-links__label">
          {label} <span className="astv-links__count">{ids.length}</span>
        </span>
        <div className="astv-links__chips">
          {ids.map(id => (
            <button key={id} type="button" className="astv-chip" onClick={() => jumpTo(id)} title={id}>
              {fileLabel(id)}
            </button>
          ))}
        </div>
      </div>
    )

  return (
    <div className="astv">
      <input
        className="astg__search"
        type="search"
        inputMode="search"
        placeholder="Search files & members…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="Search files and members"
      />

      <div className="astv-outline" role="tree">
        {GRAPH.areas.map(area => {
          const files = (FILES_BY_AREA.get(area.id) ?? []).filter(f => !matched || matched.has(f.id))
          if (matched && files.length === 0) return null
          const open = areaOpen(area.id)
          return (
            <section className="astv-area" key={area.id} role="treeitem" aria-expanded={open}>
              <button type="button" className="astv-area__head" onClick={() => toggleArea(area.id)}>
                <span className="astv-tw" aria-hidden="true">
                  {open ? '▾' : '▸'}
                </span>
                <span className="astv-area__name">{area.label}</span>
                <span className="astv-area__counts">
                  {area.fileCount} files · {area.memberCount} members
                </span>
              </button>

              {open && (
                <ul className="astv-files">
                  {files.map(file => {
                    const fopen = fileOpen(file.id)
                    const deps = importsOf(file.id)
                    const used = importedBy(file.id)
                    return (
                      <li className="astv-file" key={file.id} id={elementId(file.id)}>
                        <button type="button" className="astv-file__head" onClick={() => toggleFile(file.id)}>
                          <span className="astv-tw" aria-hidden="true">
                            {fopen ? '▾' : '▸'}
                          </span>
                          <span className="astv-file__titles">
                            <span className="astv-file__name">{file.name}</span>
                            {file.about && <span className="astv-file__about">{file.about}</span>}
                          </span>
                          <span className="astv-file__count">{file.members.length}</span>
                        </button>

                        {fopen && (
                          <div className="astv-file__body">
                            {file.members.length > 0 && (
                              <ul className="astv-members">
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
                                      <span className={`astv-member__name${m.exported ? ' is-exported' : ''}`}>
                                        {m.name}
                                      </span>
                                      {m.about && <span className="astv-member__about">{m.about}</span>}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            <LinkRow label="Imports" ids={deps} />
                            <LinkRow label="Imported by" ids={used} />
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
