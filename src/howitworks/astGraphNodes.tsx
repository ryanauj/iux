import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { MemberKind } from './generated/astGraph.types'
import type { AreaNodeData, AreaRegionNodeData, FileNodeData } from './astGraphLayout'

/**
 * Custom React Flow nodes for the AST graph. Every colour comes from a
 * contract token variable so the graph re-themes with the active palette,
 * exactly like the rest of the site.
 *
 * Edges attach to a pair of hidden handles pinned to each node's centre;
 * because React Flow paints edges beneath nodes, only the span between two
 * node bodies shows — giving a clean "floating" dependency line without a
 * custom edge renderer.
 */

const KIND_COLOR: Record<MemberKind, string> = {
  component: 'var(--color-intent-info-border, var(--color-border-strong))',
  function: 'var(--color-intent-primary-border, var(--color-border-strong))',
  class: 'var(--color-intent-warning-border, var(--color-border-strong))',
  const: 'var(--color-content-muted)',
  type: 'var(--color-intent-success-border, var(--color-border-strong))',
  interface: 'var(--color-intent-success-border, var(--color-border-strong))',
  enum: 'var(--color-intent-danger-border, var(--color-border-strong))',
}

const KIND_GLYPH: Record<MemberKind, string> = {
  component: 'C',
  function: 'ƒ',
  class: 'K',
  const: 'v',
  type: 'T',
  interface: 'I',
  enum: 'E',
}

export const MEMBER_KIND_ORDER: MemberKind[] = [
  'component',
  'function',
  'class',
  'const',
  'type',
  'interface',
  'enum',
]

export const memberKindColor = (kind: MemberKind) => KIND_COLOR[kind]
export const memberKindGlyph = (kind: MemberKind) => KIND_GLYPH[kind]

/** Centre-pinned, visually-hidden handles shared by connectable nodes. */
function CenterHandles() {
  const style = { left: '50%', top: '50%', opacity: 0, pointerEvents: 'none' as const }
  return (
    <>
      <Handle type="target" position={Position.Top} style={style} isConnectable={false} />
      <Handle type="source" position={Position.Bottom} style={style} isConnectable={false} />
    </>
  )
}

export function AreaNode({ data, selected }: NodeProps) {
  const d = data as AreaNodeData
  return (
    <div className={`astg-area${selected ? ' is-selected' : ''}`}>
      <CenterHandles />
      <span className="astg-area__chevron" aria-hidden="true">
        ▸
      </span>
      <span className="astg-area__label">{d.label}</span>
      <span className="astg-area__counts">
        {d.fileCount} files · {d.memberCount} members
      </span>
      <span className="astg-area__hint">tap to open</span>
    </div>
  )
}

export function RegionNode({ data }: NodeProps) {
  const d = data as AreaRegionNodeData
  return (
    <div className="astg-region">
      <div className="astg-region__head">
        <span className="astg-region__chevron" aria-hidden="true">
          ▾
        </span>
        <span className="astg-region__label">{d.label}</span>
        <span className="astg-region__counts">
          {d.fileCount} files · {d.memberCount} members
        </span>
      </div>
    </div>
  )
}

export function FileNode({ data, selected }: NodeProps) {
  const d = data as FileNodeData
  const { file, expanded, matched } = d
  const cls = ['astg-file']
  if (selected) cls.push('is-selected')
  if (matched) cls.push('is-matched')
  if (expanded) cls.push('is-expanded')
  return (
    <div className={cls.join(' ')}>
      <CenterHandles />
      <div className="astg-file__head">
        <span className="astg-file__chevron" aria-hidden="true">
          {expanded ? '▾' : '▸'}
        </span>
        <div className="astg-file__titles">
          <span className="astg-file__name">{file.name}</span>
          <span className="astg-file__dir">{file.dir}</span>
        </div>
        <span className="astg-file__count" title={`${file.members.length} members`}>
          {file.members.length}
        </span>
      </div>
      <div className="astg-file__badges">
        <span className="astg-file__badge" title="lines of code">
          {file.loc} loc
        </span>
        {file.importCount > 0 && (
          <span className="astg-file__badge" title="internal imports">
            ↘ {file.importCount}
          </span>
        )}
        {file.externalCount > 0 && (
          <span className="astg-file__badge astg-file__badge--ext" title="external imports">
            ↗ {file.externalCount}
          </span>
        )}
      </div>
      {expanded && (
        <ul className="astg-file__members">
          {file.members.map(m => (
            <li key={m.name} className="astg-file__member">
              <span
                className="astg-file__member-dot"
                style={{ color: KIND_COLOR[m.kind] }}
                title={m.kind}
                aria-hidden="true"
              >
                {KIND_GLYPH[m.kind]}
              </span>
              <span className={`astg-file__member-name${m.exported ? ' is-exported' : ''}`}>{m.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const astNodeTypes = {
  area: AreaNode,
  region: RegionNode,
  file: FileNode,
}
