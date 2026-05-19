import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import './Slider.css'

export type SliderVariant = 'single' | 'ticks' | 'range' | 'curve'

export interface SliderProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: SliderVariant

  /** Single / ticks / curve value. */
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void

  /** Range variant value. */
  range?: [number, number]
  defaultRange?: [number, number]
  onRangeChange?: (range: [number, number]) => void

  min?: number
  max?: number
  step?: number
  /** ticks variant: explicit tick positions. Defaults to one-tick-per-step. */
  ticks?: number[]
  /** ticks variant: snap drag/keyboard to the nearest tick. */
  snap?: boolean

  /** curve variant: y-values sampled across [min, max]. */
  curve?: number[]
  /** Format helper for the value bubble / readout. */
  formatValue?: (n: number) => string

  label?: string
  hint?: string
  disabled?: boolean
  id?: string
  className?: string
  /** Story-only: lock the visual to a pseudo-state. */
  stateLock?: 'hover' | 'focus' | 'active'
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n))
}

function quantize(n: number, min: number, step: number) {
  if (!step || step <= 0) return n
  return min + Math.round((n - min) / step) * step
}

function snapTo(n: number, ticks: number[]): number {
  if (ticks.length === 0) return n
  let best = ticks[0]
  let bestD = Math.abs(n - best)
  for (let i = 1; i < ticks.length; i++) {
    const d = Math.abs(n - ticks[i])
    if (d < bestD) { best = ticks[i]; bestD = d }
  }
  return best
}

function pctOf(value: number, min: number, max: number): number {
  if (max === min) return 0
  return ((value - min) / (max - min)) * 100
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    variant = 'single',
    value,
    defaultValue,
    onChange,
    range,
    defaultRange,
    onRangeChange,
    min = 0,
    max = 100,
    step = 1,
    ticks,
    snap = false,
    curve,
    formatValue,
    label,
    hint,
    disabled,
    id,
    className,
    stateLock,
  },
  ref,
) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  const trackRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement)

  // ---------- Single value state ----------
  const isControlled = value !== undefined
  const [innerValue, setInnerValue] = useState<number>(defaultValue ?? min)
  const currentValue = isControlled ? value! : innerValue

  // ---------- Range value state ----------
  const isRangeControlled = range !== undefined
  const [innerRange, setInnerRange] = useState<[number, number]>(defaultRange ?? [min, max])
  const currentRange = isRangeControlled ? range! : innerRange

  // ---------- Snapping ----------
  const resolvedTicks = useMemo<number[]>(() => {
    if (ticks && ticks.length > 0) return ticks
    if (variant !== 'ticks') return []
    const out: number[] = []
    for (let v = min; v <= max + 1e-9; v += step) out.push(Number(v.toFixed(6)))
    return out
  }, [ticks, min, max, step, variant])

  const applySnap = useCallback(
    (n: number): number => {
      const q = quantize(n, min, step)
      const clamped = clamp(q, min, max)
      if (snap && resolvedTicks.length > 0) return snapTo(clamped, resolvedTicks)
      return clamped
    },
    [min, max, step, snap, resolvedTicks],
  )

  const commitValue = useCallback(
    (next: number) => {
      const v = applySnap(next)
      if (!isControlled) setInnerValue(v)
      onChange?.(v)
    },
    [applySnap, isControlled, onChange],
  )

  const commitRange = useCallback(
    (next: [number, number]) => {
      const a = applySnap(next[0])
      const b = applySnap(next[1])
      const pair: [number, number] = a <= b ? [a, b] : [b, a]
      if (!isRangeControlled) setInnerRange(pair)
      onRangeChange?.(pair)
    },
    [applySnap, isRangeControlled, onRangeChange],
  )

  // ---------- Pointer dragging ----------
  const draggingRef = useRef<'single' | 'min' | 'max' | null>(null)

  const positionToValue = useCallback(
    (clientX: number): number => {
      const el = trackRef.current
      if (!el) return min
      const rect = el.getBoundingClientRect()
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1)
      return min + ratio * (max - min)
    },
    [min, max],
  )

  const handleTrackPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (disabled) return
      event.preventDefault()
      ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
      const v = positionToValue(event.clientX)
      if (variant === 'range') {
        // Decide which thumb is closer.
        const [lo, hi] = currentRange
        const closer = Math.abs(v - lo) <= Math.abs(v - hi) ? 'min' : 'max'
        draggingRef.current = closer
        commitRange(closer === 'min' ? [v, hi] : [lo, v])
      } else {
        draggingRef.current = 'single'
        commitValue(v)
      }
    },
    [disabled, variant, positionToValue, currentRange, commitRange, commitValue],
  )

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current || disabled) return
      const v = positionToValue(event.clientX)
      if (draggingRef.current === 'single') commitValue(v)
      else if (draggingRef.current === 'min') commitRange([v, currentRange[1]])
      else commitRange([currentRange[0], v])
    },
    [disabled, positionToValue, commitValue, commitRange, currentRange],
  )

  const handlePointerUp = useCallback(() => {
    draggingRef.current = null
  }, [])

  // ---------- Keyboard ----------
  const handleKey = useCallback(
    (which: 'single' | 'min' | 'max') =>
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return
        const big = (max - min) / 10
        const stepBy = (delta: number) => {
          if (which === 'single') {
            commitValue(currentValue + delta)
          } else if (which === 'min') {
            commitRange([currentRange[0] + delta, currentRange[1]])
          } else {
            commitRange([currentRange[0], currentRange[1] + delta])
          }
        }
        switch (event.key) {
          case 'ArrowLeft': case 'ArrowDown': event.preventDefault(); stepBy(-step); break
          case 'ArrowRight': case 'ArrowUp': event.preventDefault(); stepBy(step); break
          case 'PageDown': event.preventDefault(); stepBy(-big); break
          case 'PageUp': event.preventDefault(); stepBy(big); break
          case 'Home':
            event.preventDefault()
            if (which === 'single') commitValue(min)
            else if (which === 'min') commitRange([min, currentRange[1]])
            else commitRange([currentRange[0], min])
            break
          case 'End':
            event.preventDefault()
            if (which === 'single') commitValue(max)
            else if (which === 'min') commitRange([currentRange[0], max])
            else commitRange([currentRange[0], max])
            break
        }
      },
    [disabled, step, max, min, currentValue, currentRange, commitValue, commitRange],
  )

  // ---------- Cleanup pointer listeners on unmount (defensive). ----------
  useEffect(() => {
    return () => { draggingRef.current = null }
  }, [])

  const fmt = formatValue ?? ((n: number) => String(Math.round(n * 100) / 100))

  // ---------- Render geometry ----------
  const singlePct = pctOf(currentValue, min, max)
  const rangeLoPct = pctOf(currentRange[0], min, max)
  const rangeHiPct = pctOf(currentRange[1], min, max)

  const classes = [
    'iux-slider',
    `iux-slider--${variant}`,
    disabled && 'is-disabled',
    stateLock && `is-${stateLock}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={rootRef} className={classes} data-variant={variant}>
      <div className="iux-slider__header">
        {label && <label htmlFor={inputId} className="iux-slider__label">{label}</label>}
        <span className="iux-slider__readout">
          {variant === 'range'
            ? `${fmt(currentRange[0])} – ${fmt(currentRange[1])}`
            : fmt(currentValue)}
        </span>
      </div>

      <div
        ref={trackRef}
        className="iux-slider__track"
        onPointerDown={handleTrackPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {variant === 'curve' && curve && curve.length > 1 && (
          <CurveBackdrop curve={curve} />
        )}

        {variant !== 'range' ? (
          <span className="iux-slider__fill" style={{ width: `${singlePct}%` }} />
        ) : (
          <span
            className="iux-slider__fill"
            style={{ insetInlineStart: `${rangeLoPct}%`, width: `${rangeHiPct - rangeLoPct}%` }}
          />
        )}

        {variant === 'ticks' && resolvedTicks.map(t => (
          <span
            key={t}
            className="iux-slider__tick"
            data-active={currentValue >= t ? 'true' : 'false'}
            style={{ insetInlineStart: `${pctOf(t, min, max)}%` }}
            aria-hidden="true"
          />
        ))}

        {variant === 'range' ? (
          <>
            <Thumb
              id={`${inputId}-min`}
              ariaLabel={`${label ?? 'Slider'} minimum`}
              percent={rangeLoPct}
              value={currentRange[0]}
              min={min}
              max={currentRange[1]}
              disabled={disabled}
              onKeyDown={handleKey('min')}
              showBubble={stateLock !== undefined}
              format={fmt}
            />
            <Thumb
              id={`${inputId}-max`}
              ariaLabel={`${label ?? 'Slider'} maximum`}
              percent={rangeHiPct}
              value={currentRange[1]}
              min={currentRange[0]}
              max={max}
              disabled={disabled}
              onKeyDown={handleKey('max')}
              showBubble={stateLock !== undefined}
              format={fmt}
            />
          </>
        ) : (
          <Thumb
            id={inputId}
            ariaLabel={label}
            percent={singlePct}
            value={currentValue}
            min={min}
            max={max}
            disabled={disabled}
            onKeyDown={handleKey('single')}
            showBubble={stateLock !== undefined}
            format={fmt}
          />
        )}
      </div>

      {hint && <span className="iux-slider__hint">{hint}</span>}
    </div>
  )
})

interface ThumbProps {
  id: string
  ariaLabel?: string
  percent: number
  value: number
  min: number
  max: number
  disabled?: boolean
  showBubble?: boolean
  format: (n: number) => string
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
}

function Thumb({ id, ariaLabel, percent, value, min, max, disabled, showBubble, format, onKeyDown }: ThumbProps) {
  return (
    <div
      id={id}
      className="iux-slider__thumb"
      style={{ insetInlineStart: `${percent}%` }}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={format(value)}
      onKeyDown={onKeyDown}
    >
      <span className="iux-slider__bubble" data-visible={showBubble ? 'true' : undefined} aria-hidden="true">
        {format(value)}
      </span>
    </div>
  )
}

interface CurveBackdropProps {
  curve: number[]
}

function CurveBackdrop({ curve }: CurveBackdropProps) {
  const lo = Math.min(...curve)
  const hi = Math.max(...curve)
  const range = hi - lo || 1
  // 100 wide × 24 tall viewBox is enough resolution and lets the SVG scale.
  const w = 100
  const h = 24
  const points = curve.map((v, i) => {
    const x = (i / (curve.length - 1)) * w
    const y = h - ((v - lo) / range) * h
    return `${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ')
  return (
    <svg className="iux-slider__curve" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
