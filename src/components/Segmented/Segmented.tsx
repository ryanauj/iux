import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import './Segmented.css'

export type SegmentedVariant = 'pill' | 'rich' | 'animated' | 'overflow'

export interface SegmentedItem {
  value: string
  label: ReactNode
  icon?: ReactNode
  badge?: ReactNode
  disabled?: boolean
}

export interface SegmentedProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: SegmentedVariant
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  items: SegmentedItem[]
  size?: 'sm' | 'md' | 'lg'
  ariaLabel?: string
  className?: string
}

export function Segmented({
  variant = 'pill',
  value,
  defaultValue,
  onValueChange,
  items,
  size = 'md',
  ariaLabel,
  className,
}: SegmentedProps) {
  const isControlled = value !== undefined
  const [innerValue, setInnerValue] = useState<string>(defaultValue ?? items[0]?.value ?? '')
  const currentValue = isControlled ? value! : innerValue

  const commit = useCallback((next: string) => {
    if (!isControlled) setInnerValue(next)
    onValueChange?.(next)
  }, [isControlled, onValueChange])

  const rootRef = useRef<HTMLDivElement | null>(null)
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  // ---------- Sliding indicator (animated variant) ----------
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)
  useLayoutEffect(() => {
    if (variant !== 'animated') return
    const el = buttonRefs.current[currentValue]
    const root = rootRef.current
    if (!el || !root) return
    const r = el.getBoundingClientRect()
    const rr = root.getBoundingClientRect()
    setIndicator({ left: r.left - rr.left, width: r.width })
  }, [variant, currentValue, items])

  // ---------- Overflow detection ----------
  const [overflowValues, setOverflowValues] = useState<string[]>([])
  const [moreOpen, setMoreOpen] = useState(false)
  useEffect(() => {
    if (variant !== 'overflow') return
    const root = rootRef.current
    if (!root) return
    const compute = () => {
      const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-segment-value]'))
      const rootRight = root.getBoundingClientRect().right
      const moreBtn = root.querySelector<HTMLButtonElement>('.iux-segmented__more')
      const moreW = moreBtn?.getBoundingClientRect().width ?? 0
      const overflow: string[] = []
      buttons.forEach(b => {
        const r = b.getBoundingClientRect()
        if (r.right > rootRight - moreW - 8) overflow.push(b.dataset.segmentValue ?? '')
      })
      setOverflowValues(overflow)
    }
    compute()
    const obs = new ResizeObserver(compute)
    obs.observe(root)
    return () => obs.disconnect()
  }, [variant, items, currentValue])

  // ---------- Keyboard ----------
  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabled = items.filter(i => !i.disabled)
    if (enabled.length === 0) return
    const idx = enabled.findIndex(i => i.value === currentValue)
    let next = idx
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (idx + 1) % enabled.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (idx - 1 + enabled.length) % enabled.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = enabled.length - 1
    else return
    event.preventDefault()
    const n = enabled[next]
    commit(n.value)
    buttonRefs.current[n.value]?.focus()
  }

  const classes = [
    'iux-segmented',
    `iux-segmented--${variant}`,
    `iux-segmented--size-${size}`,
    className,
  ].filter(Boolean).join(' ')

  const indicatorStyle: CSSProperties | undefined = variant === 'animated' && indicator
    ? { transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }
    : undefined

  return (
    <div
      ref={rootRef}
      role="radiogroup"
      aria-label={ariaLabel}
      className={classes}
      onKeyDown={handleKey}
    >
      {variant === 'animated' && indicator && (
        <span className="iux-segmented__indicator" aria-hidden="true" style={indicatorStyle} />
      )}
      {items.map(item => {
        const selected = item.value === currentValue
        return (
          <button
            key={item.value}
            ref={el => { buttonRefs.current[item.value] = el }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-disabled={item.disabled || undefined}
            disabled={item.disabled}
            tabIndex={selected ? 0 : -1}
            data-segment-value={item.value}
            className={[
              'iux-segmented__segment',
              selected && 'is-selected',
            ].filter(Boolean).join(' ')}
            onClick={() => !item.disabled && commit(item.value)}
          >
            {item.icon && <span className="iux-segmented__icon" aria-hidden="true">{item.icon}</span>}
            <span className="iux-segmented__label">{item.label}</span>
            {item.badge !== undefined && <span className="iux-segmented__badge">{item.badge}</span>}
          </button>
        )
      })}

      {variant === 'overflow' && (
        <button
          type="button"
          className="iux-segmented__more"
          aria-haspopup="menu"
          aria-expanded={moreOpen}
          onClick={() => setMoreOpen(o => !o)}
          data-visible={overflowValues.length > 0 ? 'true' : 'false'}
        >▾</button>
      )}

      {variant === 'overflow' && moreOpen && overflowValues.length > 0 && (
        <div className="iux-segmented__more-menu" role="menu">
          {items.filter(i => overflowValues.includes(i.value)).map(item => (
            <button
              key={item.value}
              type="button"
              role="menuitem"
              className="iux-segmented__more-item"
              onClick={() => {
                commit(item.value)
                setMoreOpen(false)
              }}
            >
              {item.icon && <span className="iux-segmented__icon" aria-hidden="true">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
