import type { ComponentEntry } from '../catalog'

function cfgStr(config: Record<string, unknown>, key: string, fallback = ''): string {
  const value = config[key]
  return typeof value === 'string' ? value : fallback
}

export default function ComponentPreview({ entry }: { entry: ComponentEntry }) {
  const c = entry.config
  switch (entry.kind) {
    case 'button': {
      const label = cfgStr(c, 'label', 'Button')
      const theme = cfgStr(c, 'theme', 'primary')
      const size = cfgStr(c, 'size', 'md')
      return (
        <button
          type='button'
          className={`sg-preview__btn sg-preview__btn--${theme} sg-preview__btn--${size}`}
        >
          {label}
        </button>
      )
    }
    case 'card': {
      return (
        <div
          className='sg-preview__card'
          style={{
            background: cfgStr(c, 'background', '#ffffff'),
            color: cfgStr(c, 'color', '#213547'),
            padding: cfgStr(c, 'padding', '1rem'),
            borderRadius: cfgStr(c, 'borderRadius', '6px'),
          }}
        >
          <strong>{cfgStr(c, 'label', 'Card title')}</strong>
          <div>{cfgStr(c, 'text', '')}</div>
        </div>
      )
    }
    case 'input': {
      return (
        <input
          className='sg-preview__input'
          placeholder={cfgStr(c, 'label', '')}
          readOnly
        />
      )
    }
    case 'chip': {
      return (
        <span
          className='sg-preview__chip'
          style={{
            background: cfgStr(c, 'background', '#e9ecef'),
            color: cfgStr(c, 'color', '#213547'),
          }}
        >
          {cfgStr(c, 'label', 'tag')}
        </span>
      )
    }
    case 'row': {
      return (
        <div className='sg-preview__row sg-row'>
          <span className='sg-preview__stub'>one</span>
          <span className='sg-preview__stub'>two</span>
          <span className='sg-preview__stub'>three</span>
        </div>
      )
    }
  }
}
