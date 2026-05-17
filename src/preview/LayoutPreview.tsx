import type { CSSProperties } from 'react'
import type { ComponentEntry, LayoutEntry } from '../catalog'

const JUSTIFY_MAP: Record<NonNullable<LayoutEntry['config']['justify']>, CSSProperties['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
}

const ALIGN_MAP: Record<NonNullable<LayoutEntry['config']['align']>, CSSProperties['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
}

function stubFor(kind: ComponentEntry['kind'], label: string) {
  switch (kind) {
    case 'button':
      return (
        <button
          type='button'
          className='sg-preview__btn sg-preview__btn--primary sg-preview__btn--sm'
        >
          {label}
        </button>
      )
    case 'card':
      return (
        <div className='sg-preview__card sg-preview__card--stub'>
          <strong>{label}</strong>
        </div>
      )
    case 'chip':
      return <span className='sg-preview__chip'>{label}</span>
    case 'input':
      return <input className='sg-preview__input' placeholder={label} readOnly />
    case 'row':
      return <span className='sg-preview__stub'>{label}</span>
  }
}

export default function LayoutPreview({ entry }: { entry: LayoutEntry }) {
  const c = entry.config
  const style: CSSProperties = {
    display: c.container,
    gap: typeof c.gap === 'number' ? `${c.gap}px` : undefined,
    width: '100%',
  }

  if (c.container === 'flex') {
    style.flexDirection = c.direction
    style.flexWrap = c.wrap ? 'wrap' : undefined
    style.justifyContent = c.justify ? JUSTIFY_MAP[c.justify] : undefined
    style.alignItems = c.align ? ALIGN_MAP[c.align] : undefined
  } else {
    style.gridTemplateColumns = c.columns
  }

  return (
    <div style={style}>
      {c.children.map((child, i) => (
        <div key={i}>{stubFor(child.kind, child.label ?? '…')}</div>
      ))}
    </div>
  )
}
