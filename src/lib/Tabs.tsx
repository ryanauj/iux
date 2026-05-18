import type { ReactNode } from 'react'

export interface TabSpec<T extends string = string> {
  id: T
  label: ReactNode
  count?: number
  disabled?: boolean
}

type Variant = 'underline' | 'pill'

interface Props<T extends string = string> {
  tabs: TabSpec<T>[]
  active: T
  onChange: (id: T) => void
  variant?: Variant
  className?: string
  ariaLabel?: string
  children?: ReactNode
}

export default function Tabs<T extends string = string>({
  tabs,
  active,
  onChange,
  variant = 'underline',
  className,
  ariaLabel,
  children,
}: Props<T>) {
  const classes = [
    'iux-tabs',
    `iux-tabs--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={classes} role='tablist' aria-label={ariaLabel}>
      {tabs.map((tab) => {
        const isActive = tab.id === active
        const tabClass = [
          'iux-tabs__tab',
          isActive && 'iux-tabs__tab--active',
        ]
          .filter(Boolean)
          .join(' ')
        return (
          <button
            key={tab.id}
            type='button'
            role='tab'
            aria-selected={isActive}
            className={tabClass}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
          >
            <span className='iux-tabs__label'>{tab.label}</span>
            {tab.count !== undefined && (
              <span className='iux-tabs__count'>{tab.count}</span>
            )}
          </button>
        )
      })}
      {children && <div className='iux-tabs__trailing'>{children}</div>}
    </div>
  )
}
