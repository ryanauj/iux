// ABOUTME: Text diff viewer with four presentation modes — side-by-side panes, unified inline with char-level highlighting, interactive chunk-accept/reject editor, and three-way merge picker.

import { useMemo, useState } from 'react'
import './DiffView.css'

// ABOUTME: Presentation mode: 'side-by-side' shows original and modified in two panes, 'inline' interleaves changed lines with char-level highlights, 'chunked' lets the user accept/reject each change block, 'three-way' presents base/ours/theirs columns with per-chunk picks.
export type DiffViewVariant = 'side-by-side' | 'inline' | 'chunked' | 'three-way'

// ABOUTME: Props for DiffView — variant selects the presentation mode; two-way variants use a/b strings, three-way uses base/ours/theirs strings.
export interface DiffViewProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: DiffViewVariant
  /** Two-way variants: original and modified. */
  a?: string
  b?: string

  /** Three-way: base + two divergent sides. */
  base?: string
  ours?: string
  theirs?: string

  className?: string
}

// ABOUTME: A tagged-union token produced by diffLines: 'eq' for unchanged lines, 'del' for lines removed from a, 'add' for lines inserted in b.
export type LineOp =
  | { type: 'eq'; line: string }
  | { type: 'del'; line: string }
  | { type: 'add'; line: string }

// ABOUTME: Computes a line-level LCS diff between two strings, returning an array of LineOp tokens tagged as 'eq', 'del', or 'add'; used by all variants to produce the base sequence of changes.
export function diffLines(aText: string, bText: string): LineOp[] {
  const a = aText.split('\n')
  const b = bText.split('\n')
  const n = a.length
  const m = b.length
  const dp: Uint32Array[] = []
  for (let i = 0; i <= n; i++) dp.push(new Uint32Array(m + 1))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (a[i] === b[j]) dp[i][j] = dp[i + 1][j + 1] + 1
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const ops: LineOp[] = []
  let i = 0, j = 0
  while (i < n && j < m) {
    if (a[i] === b[j]) { ops.push({ type: 'eq', line: a[i] }); i++; j++ }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { ops.push({ type: 'del', line: a[i] }); i++ }
    else { ops.push({ type: 'add', line: b[j] }); j++ }
  }
  while (i < n) { ops.push({ type: 'del', line: a[i] }); i++ }
  while (j < m) { ops.push({ type: 'add', line: b[j] }); j++ }
  return ops
}

// ---------- Char LCS (within a changed line) ----------

// ABOUTME: A contiguous run of characters tagged as 'eq' (unchanged), 'del' (removed from a), or 'add' (inserted in b); paired arrays of these are produced by diffChars and rendered as highlighted spans in the inline variant.
interface CharSpan { type: 'eq' | 'del' | 'add'; text: string }

// ABOUTME: Computes character-level LCS diff between two strings, returning parallel delSpans and addSpans arrays used by the 'inline' variant to highlight intra-line changes.
function diffChars(a: string, b: string): { delSpans: CharSpan[]; addSpans: CharSpan[] } {
  const n = a.length
  const m = b.length
  const dp: Uint32Array[] = []
  for (let i = 0; i <= n; i++) dp.push(new Uint32Array(m + 1))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (a[i] === b[j]) dp[i][j] = dp[i + 1][j + 1] + 1
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const delSpans: CharSpan[] = []
  const addSpans: CharSpan[] = []
  let i = 0, j = 0
  let bufA = '', bufB = ''
  const flushEq = () => {
    if (bufA) { delSpans.push({ type: 'eq', text: bufA }); bufA = '' }
    if (bufB) { addSpans.push({ type: 'eq', text: bufB }); bufB = '' }
  }
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      bufA += a[i]; bufB += b[j]; i++; j++
    } else {
      flushEq()
      if (dp[i + 1][j] >= dp[i][j + 1]) {
        let acc = ''
        while (i < n && (j >= m || a[i] !== b[j]) && dp[i + 1][j] >= dp[i][j + 1]) { acc += a[i]; i++ }
        delSpans.push({ type: 'del', text: acc })
      } else {
        let acc = ''
        while (j < m && (i >= n || a[i] !== b[j]) && dp[i + 1][j] < dp[i][j + 1]) { acc += b[j]; j++ }
        addSpans.push({ type: 'add', text: acc })
      }
    }
  }
  if (i < n) { flushEq(); delSpans.push({ type: 'del', text: a.slice(i) }) }
  else if (j < m) { flushEq(); addSpans.push({ type: 'add', text: b.slice(j) }) }
  else flushEq()
  return { delSpans, addSpans }
}

// ---------- Chunking ----------

// ABOUTME: A contiguous block of related LineOp tokens, tagged as changed (contains del or add lines) or unchanged; used as the unit of accept/reject interaction in chunked mode and column rendering in three-way mode.
interface DiffChunk {
  id: string
  ops: LineOp[]
  /** True if this chunk has both add+del lines (potential merge). */
  changed: boolean
}

// ABOUTME: Groups a flat LineOp array into DiffChunk blocks — each run of non-eq operations forms one changed chunk, each eq line its own unchanged chunk; provides the unit of interaction for chunked and three-way variants.
function chunkOps(ops: LineOp[]): DiffChunk[] {
  const out: DiffChunk[] = []
  let buf: LineOp[] = []
  let i = 0
  for (const op of ops) {
    if (op.type === 'eq') {
      if (buf.length > 0) {
        out.push({ id: `c${i++}`, ops: buf, changed: true })
        buf = []
      }
      out.push({ id: `c${i++}`, ops: [op], changed: false })
    } else {
      buf.push(op)
    }
  }
  if (buf.length > 0) out.push({ id: `c${i++}`, ops: buf, changed: true })
  return out
}

// ABOUTME: Renders a diff in the chosen mode: side-by-side panes, inline with char-level span highlights for adjacent del+add pairs, a chunked accept/reject UI with a live merged preview, or a three-column three-way picker.
/**
 * Two-way variants (side-by-side, inline, chunked) run `diffLines(a, b)` and
 * chunk the result into eq/changed blocks. In 'chunked' mode each changed block
 * stores a pick ('a' to reject or 'b' to accept) in local state, and the
 * merged result is shown in a `<details>` disclosure. The 'three-way' variant
 * independently diffs base→ours and base→theirs, then renders three `Column`
 * sub-components that let the user pick which side's version of each chunk to
 * keep. The `LineOp` union and `diffLines` are exported for external use.
 */
export function DiffView({
  variant = 'side-by-side',
  a = '',
  b = '',
  base = '',
  ours = '',
  theirs = '',
  className,
}: DiffViewProps) {
  const twoWayOps = useMemo(() => {
    if (variant === 'three-way') return []
    return diffLines(a, b)
  }, [variant, a, b])

  const chunks = useMemo(() => chunkOps(twoWayOps), [twoWayOps])

  // chunked variant: per-chunk pick of 'a' (reject change) or 'b' (accept)
  const [picks, setPicks] = useState<Record<string, 'a' | 'b'>>({})

  const accepted = useMemo<string>(() => {
    if (variant !== 'chunked') return b
    const out: string[] = []
    for (const ch of chunks) {
      if (!ch.changed) { out.push(ch.ops[0].line); continue }
      const pick = picks[ch.id] ?? 'b'
      for (const op of ch.ops) {
        if (pick === 'a' && op.type === 'del') out.push(op.line)
        if (pick === 'b' && op.type === 'add') out.push(op.line)
      }
    }
    return out.join('\n')
  }, [variant, chunks, picks, b])

  // three-way state
  const threeWay = useMemo(() => {
    if (variant !== 'three-way') return null
    const oursOps = diffLines(base, ours)
    const theirsOps = diffLines(base, theirs)
    const oursChunks = chunkOps(oursOps)
    const theirsChunks = chunkOps(theirsOps)
    return { oursChunks, theirsChunks }
  }, [variant, base, ours, theirs])

  const [threeWayPicks, setThreeWayPicks] = useState<Record<string, 'ours' | 'theirs' | 'base'>>({})

  const classes = ['iux-diff', `iux-diff--${variant}`, className].filter(Boolean).join(' ')

  // ---------- Render ----------

  if (variant === 'three-way' && threeWay) {
    return (
      <div className={classes}>
        <div className="iux-diff__threeway">
          <Column title="Ours" chunks={threeWay.oursChunks} picks={threeWayPicks} side="ours" onPick={(id, side) => setThreeWayPicks(p => ({ ...p, [id]: side }))} />
          <Column title="Base" chunks={chunkOps(diffLines(base, base))} picks={threeWayPicks} side="base" onPick={(id, side) => setThreeWayPicks(p => ({ ...p, [id]: side }))} />
          <Column title="Theirs" chunks={threeWay.theirsChunks} picks={threeWayPicks} side="theirs" onPick={(id, side) => setThreeWayPicks(p => ({ ...p, [id]: side }))} />
        </div>
      </div>
    )
  }

  if (variant === 'side-by-side') {
    return (
      <div className={classes}>
        <pre className="iux-diff__pane iux-diff__pane--a">
          {twoWayOps.map((op, i) => (op.type === 'add' ? null : (
            <span key={i} className={`iux-diff__line iux-diff__line--${op.type}`}>
              <span className="iux-diff__gutter">{op.type === 'del' ? '−' : ' '}</span>
              <span className="iux-diff__content">{op.line}</span>
            </span>
          )))}
        </pre>
        <pre className="iux-diff__pane iux-diff__pane--b">
          {twoWayOps.map((op, i) => (op.type === 'del' ? null : (
            <span key={i} className={`iux-diff__line iux-diff__line--${op.type === 'eq' ? 'eq' : 'add'}`}>
              <span className="iux-diff__gutter">{op.type === 'add' ? '+' : ' '}</span>
              <span className="iux-diff__content">{op.line}</span>
            </span>
          )))}
        </pre>
      </div>
    )
  }

  if (variant === 'inline') {
    // Pair consecutive del+add for char-level highlight.
    const rendered: React.ReactNode[] = []
    let i = 0
    while (i < twoWayOps.length) {
      const op = twoWayOps[i]
      if (op.type === 'del' && twoWayOps[i + 1]?.type === 'add') {
        const next = twoWayOps[i + 1] as LineOp & { type: 'add' }
        const { delSpans, addSpans } = diffChars(op.line, next.line)
        rendered.push(
          <span key={`p-d-${i}`} className="iux-diff__line iux-diff__line--del">
            <span className="iux-diff__gutter">−</span>
            <span className="iux-diff__content">
              {delSpans.map((s, k) => (
                <span key={k} className={s.type === 'eq' ? '' : 'iux-diff__char--del'}>{s.text}</span>
              ))}
            </span>
          </span>,
          <span key={`p-a-${i}`} className="iux-diff__line iux-diff__line--add">
            <span className="iux-diff__gutter">+</span>
            <span className="iux-diff__content">
              {addSpans.map((s, k) => (
                <span key={k} className={s.type === 'eq' ? '' : 'iux-diff__char--add'}>{s.text}</span>
              ))}
            </span>
          </span>,
        )
        i += 2
        continue
      }
      rendered.push(
        <span key={i} className={`iux-diff__line iux-diff__line--${op.type}`}>
          <span className="iux-diff__gutter">{op.type === 'add' ? '+' : op.type === 'del' ? '−' : ' '}</span>
          <span className="iux-diff__content">{op.line}</span>
        </span>,
      )
      i++
    }
    return <pre className={classes + ' iux-diff__pane'}>{rendered}</pre>
  }

  // chunked
  return (
    <div className={classes}>
      <div className="iux-diff__chunked">
        {chunks.map(ch => {
          if (!ch.changed) {
            return (
              <pre key={ch.id} className="iux-diff__chunk iux-diff__chunk--eq">
                <span className="iux-diff__line iux-diff__line--eq">
                  <span className="iux-diff__gutter"> </span>
                  <span className="iux-diff__content">{ch.ops[0].line}</span>
                </span>
              </pre>
            )
          }
          const pick = picks[ch.id] ?? 'b'
          return (
            <div key={ch.id} className="iux-diff__chunk iux-diff__chunk--changed">
              <pre className="iux-diff__chunk-pane">
                {ch.ops.map((op, i) => (
                  <span key={i} className={`iux-diff__line iux-diff__line--${op.type}`}>
                    <span className="iux-diff__gutter">{op.type === 'add' ? '+' : op.type === 'del' ? '−' : ' '}</span>
                    <span className="iux-diff__content">{op.line}</span>
                  </span>
                ))}
              </pre>
              <div className="iux-diff__chunk-actions">
                <button type="button" className={pick === 'a' ? 'is-picked' : ''} onClick={() => setPicks(p => ({ ...p, [ch.id]: 'a' }))}>Reject</button>
                <button type="button" className={pick === 'b' ? 'is-picked' : ''} onClick={() => setPicks(p => ({ ...p, [ch.id]: 'b' }))}>Accept</button>
              </div>
            </div>
          )
        })}
      </div>
      <details className="iux-diff__merged">
        <summary>Merged result</summary>
        <pre>{accepted}</pre>
      </details>
    </div>
  )
}

// ABOUTME: Props for the Column sub-component in three-way mode — the column title, the DiffChunk array to render, a shared picks record keyed by chunk id, the side this column represents, and an onPick callback.
interface ColumnProps {
  title: string
  chunks: DiffChunk[]
  picks: Record<string, 'ours' | 'theirs' | 'base'>
  side: 'ours' | 'theirs' | 'base'
  onPick: (id: string, side: 'ours' | 'theirs' | 'base') => void
}

// ABOUTME: Renders one column in the three-way merge UI — a titled section containing diff lines for each chunk, with a "Pick <side>" button on changed chunks that fires onPick and highlights the chosen version.
function Column({ title, chunks, picks, side, onPick }: ColumnProps) {
  return (
    <section className="iux-diff__column">
      <h4 className="iux-diff__column-title">{title}</h4>
      <pre className="iux-diff__pane">
        {chunks.map(ch => {
          const isPicked = picks[ch.id] === side
          return (
            <span key={ch.id} className={['iux-diff__chunk-row', isPicked && 'is-picked'].filter(Boolean).join(' ')}>
              {ch.ops.map((op, i) => (
                <span key={i} className={`iux-diff__line iux-diff__line--${op.type}`}>
                  <span className="iux-diff__gutter">{op.type === 'add' ? '+' : op.type === 'del' ? '−' : ' '}</span>
                  <span className="iux-diff__content">{op.line}</span>
                </span>
              ))}
              {ch.changed && (
                <button
                  type="button"
                  className={['iux-diff__threeway-pick', isPicked && 'is-picked'].filter(Boolean).join(' ')}
                  onClick={() => onPick(ch.id, side)}
                >Pick {title.toLowerCase()}</button>
              )}
            </span>
          )
        })}
      </pre>
    </section>
  )
}
