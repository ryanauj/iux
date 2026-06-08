// ABOUTME: Scrubable playhead timeline with four variants: basic (single drag track), snap (tick-scale ruler with marker snap-to), multi (per-track lanes with mute/solo controls), and keyframes (per-track value curves with shift-click keyframe add and drag-to-move).

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import './Timeline.css'

// ABOUTME: Interaction mode — basic is a simple drag scrubber; snap adds a pixel-per-second tick ruler and snaps the playhead to nearby markers; multi shows per-track lanes with mute/solo; keyframes adds value-curve lanes with draggable diamond keyframes.
export type TimelineVariant = 'basic' | 'snap' | 'multi' | 'keyframes'

// ABOUTME: A named position marker on the timeline: a time in seconds and an optional label shown as a tooltip; used by the snap variant for magnet-snap zones.
export interface TimelineMarker {
  at: number
  label?: string
}

// ABOUTME: A named lane in the multi or keyframes variant, with an optional CSS color, muted flag, and soloed flag; mute/solo state changes fire onTrackChange.
export interface TimelineTrack {
  id: string
  name: string
  /** Custom CSS color string (avoid hex literals — use oklch / rgb / hsl). */
  color?: string
  muted?: boolean
  soloed?: boolean
}

// ABOUTME: A single keyframe on a track: its trackId, time position (seconds), and a 0–1 normalized value used for the vertical position on the curve lane.
export interface TimelineKeyframe {
  trackId: string
  at: number
  /** 0..1 normalized value. */
  value: number
}

// ABOUTME: Props for Timeline — total duration in seconds, controlled/uncontrolled playhead time, marker list with optional snap, per-track list with change callback, keyframe list with add/change callbacks, zoom scale, and variant.
export interface TimelineProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: TimelineVariant
  duration: number
  time?: number
  defaultTime?: number
  onTimeChange?: (t: number) => void

  markers?: TimelineMarker[]
  snapToMarkers?: boolean

  tracks?: TimelineTrack[]
  onTrackChange?: (id: string, patch: Partial<TimelineTrack>) => void

  keyframes?: TimelineKeyframe[]
  onKeyframeChange?: (kf: TimelineKeyframe) => void
  onKeyframeAdd?: (kf: TimelineKeyframe) => void

  /** Pixels per second. Drives the tick scale on `snap`. */
  zoom?: number
  className?: string
}

// ABOUTME: Formats a time value in seconds as M:SS.S (e.g. "1:04.3"), zero-padding the seconds portion so columns align.
function fmt(t: number): string {
  const m = Math.floor(t / 60)
  const s = (t - m * 60).toFixed(1)
  return `${m}:${s.padStart(4, '0')}`
}

// ABOUTME: Renders a time readout header above a pointer-capture drag track; snap variant adds a computed tick array and marker pins; multi and keyframes variants render per-track lane rows with an overlaid playhead line.
/**
 * Uses a single `dragRef` to distinguish time-scrub drags from keyframe drags.
 * The snap variant computes tick spacing from the `zoom` (px/s) prop and
 * snaps the playhead within 4% of duration of the nearest marker.
 * In the keyframes variant, Shift+click on empty lane area fires `onKeyframeAdd`
 * and existing diamond markers are pointer-drag repositioned via `onKeyframeChange`.
 */
export function Timeline({
  variant = 'basic',
  duration,
  time,
  defaultTime = 0,
  onTimeChange,
  markers = [],
  snapToMarkers = true,
  tracks = [],
  onTrackChange,
  keyframes = [],
  onKeyframeChange,
  onKeyframeAdd,
  zoom = 60,
  className,
}: TimelineProps) {
  const isControlled = time !== undefined
  const [innerTime, setInnerTime] = useState(defaultTime)
  const currentTime = isControlled ? time! : innerTime

  const commitTime = useCallback((t: number) => {
    let next = Math.max(0, Math.min(duration, t))
    if (variant === 'snap' && snapToMarkers && markers.length > 0) {
      // Snap to nearest marker if within 10% of duration.
      let best = next
      let bestD = duration
      for (const m of markers) {
        const d = Math.abs(m.at - next)
        if (d < bestD) { best = m.at; bestD = d }
      }
      if (bestD < duration * 0.04) next = best
    }
    if (!isControlled) setInnerTime(next)
    onTimeChange?.(next)
  }, [duration, variant, snapToMarkers, markers, isControlled, onTimeChange])

  // ---------- Track-area drag for time scrub ----------
  const trackRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<{ kind: 'time' | 'kf'; kfIdx?: number } | null>(null)

  const pxToTime = useCallback((clientX: number): number => {
    const el = trackRef.current
    if (!el) return 0
    const r = el.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - r.left) / r.width))
    return ratio * duration
  }, [duration])

  const handleTrackDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
    dragRef.current = { kind: 'time' }
    commitTime(pxToTime(event.clientX))
  }
  const handleTrackMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    if (dragRef.current.kind === 'time') commitTime(pxToTime(event.clientX))
  }
  const handleTrackUp = () => { dragRef.current = null }

  // ---------- Keyframe drag ----------
  const handleKfDown = (event: ReactPointerEvent<HTMLDivElement>, idx: number) => {
    if (variant !== 'keyframes') return
    event.stopPropagation()
    event.preventDefault()
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
    dragRef.current = { kind: 'kf', kfIdx: idx }
  }
  const handleKfMove = (event: ReactPointerEvent<HTMLDivElement>, trackId: string, laneEl: HTMLElement | null) => {
    if (!dragRef.current || dragRef.current.kind !== 'kf' || dragRef.current.kfIdx === undefined) return
    const idx = dragRef.current.kfIdx
    const kf = keyframes[idx]
    if (!kf) return
    const rect = laneEl?.getBoundingClientRect()
    if (!rect) return
    const newValue = Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height))
    const newTime = Math.max(0, Math.min(duration, ((event.clientX - rect.left) / rect.width) * duration))
    onKeyframeChange?.({ trackId, at: newTime, value: newValue })
  }
  const handleKfUp = () => { dragRef.current = null }

  // ---------- Tick scale (snap variant) ----------
  const ticks = useMemo<number[]>(() => {
    if (variant !== 'snap') return []
    // Choose tick step so we render ~10-20 ticks across the width based on zoom.
    const targetTickCount = Math.max(6, Math.min(40, Math.round((zoom * duration) / 60)))
    const step = duration / targetTickCount
    const out: number[] = []
    for (let t = 0; t <= duration + 0.0001; t += step) out.push(t)
    return out
  }, [variant, duration, zoom])

  const pct = (t: number) => `${(t / duration) * 100}%`

  const classes = ['iux-timeline', `iux-timeline--${variant}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="iux-timeline__header">
        <span className="iux-timeline__readout">{fmt(currentTime)} / {fmt(duration)}</span>
        {variant === 'snap' && (
          <span className="iux-timeline__zoom">{zoom} px/s</span>
        )}
      </div>

      {(variant === 'basic' || variant === 'snap') && (
        <div
          ref={trackRef}
          className="iux-timeline__track"
          onPointerDown={handleTrackDown}
          onPointerMove={handleTrackMove}
          onPointerUp={handleTrackUp}
          onPointerCancel={handleTrackUp}
        >
          {variant === 'snap' && ticks.map((t, i) => (
            <span key={i} className="iux-timeline__tick" style={{ insetInlineStart: pct(t) }} aria-hidden="true" />
          ))}
          {variant === 'snap' && markers.map((m, i) => (
            <span key={`m-${i}`} className="iux-timeline__marker" style={{ insetInlineStart: pct(m.at) }} title={m.label} />
          ))}
          <span className="iux-timeline__playhead" style={{ insetInlineStart: pct(currentTime) }} aria-hidden="true" />
        </div>
      )}

      {variant === 'multi' && (
        <div className="iux-timeline__multi">
          <div className="iux-timeline__lanes">
            {tracks.map(t => (
              <div key={t.id} className="iux-timeline__lane-row">
                <div className="iux-timeline__lane-meta">
                  <span className="iux-timeline__lane-swatch" style={{ ['--iux-lane-color' as string]: t.color ?? 'var(--color-intent-primary-bg)' } as CSSProperties} />
                  <span className="iux-timeline__lane-name">{t.name}</span>
                  <button
                    type="button"
                    className={['iux-timeline__lane-btn', t.muted && 'is-active'].filter(Boolean).join(' ')}
                    onClick={() => onTrackChange?.(t.id, { muted: !t.muted })}
                  >M</button>
                  <button
                    type="button"
                    className={['iux-timeline__lane-btn', t.soloed && 'is-active'].filter(Boolean).join(' ')}
                    onClick={() => onTrackChange?.(t.id, { soloed: !t.soloed })}
                  >S</button>
                </div>
                <div
                  className="iux-timeline__lane"
                  onPointerDown={handleTrackDown}
                  onPointerMove={handleTrackMove}
                  onPointerUp={handleTrackUp}
                  onPointerCancel={handleTrackUp}
                  ref={el => { if (!trackRef.current) trackRef.current = el }}
                  style={{ ['--iux-lane-color' as string]: t.color ?? 'var(--color-intent-primary-bg)' } as CSSProperties}
                />
              </div>
            ))}
          </div>
          <div className="iux-timeline__multi-playhead" style={{ insetInlineStart: pct(currentTime) }} aria-hidden="true" />
        </div>
      )}

      {variant === 'keyframes' && tracks.length > 0 && (
        <div className="iux-timeline__multi">
          <div className="iux-timeline__lanes">
            {tracks.map(t => {
              const tkfs = keyframes
                .map((k, i) => ({ k, i }))
                .filter(({ k }) => k.trackId === t.id)
                .sort((a, b) => a.k.at - b.k.at)
              return (
                <div key={t.id} className="iux-timeline__lane-row">
                  <div className="iux-timeline__lane-meta">
                    <span className="iux-timeline__lane-swatch" style={{ ['--iux-lane-color' as string]: t.color ?? 'var(--color-intent-primary-bg)' } as CSSProperties} />
                    <span className="iux-timeline__lane-name">{t.name}</span>
                  </div>
                  <div
                    className="iux-timeline__lane iux-timeline__lane--kf"
                    ref={el => { if (!trackRef.current) trackRef.current = el }}
                    style={{ ['--iux-lane-color' as string]: t.color ?? 'var(--color-intent-primary-bg)' } as CSSProperties}
                    onPointerDown={ev => {
                      // Click empty area to add keyframe at click position.
                      handleTrackDown(ev)
                      const r = (ev.currentTarget as HTMLElement).getBoundingClientRect()
                      const v = Math.max(0, Math.min(1, 1 - (ev.clientY - r.top) / r.height))
                      const at = Math.max(0, Math.min(duration, ((ev.clientX - r.left) / r.width) * duration))
                      if (ev.shiftKey) onKeyframeAdd?.({ trackId: t.id, at, value: v })
                    }}
                    onPointerMove={ev => {
                      handleTrackMove(ev)
                      handleKfMove(ev, t.id, ev.currentTarget as HTMLElement)
                    }}
                    onPointerUp={() => { handleTrackUp(); handleKfUp() }}
                    onPointerCancel={() => { handleTrackUp(); handleKfUp() }}
                  >
                    {tkfs.length > 1 && (
                      <CurvePolyline kfs={tkfs.map(x => x.k)} duration={duration} />
                    )}
                    {tkfs.map(({ k, i }) => (
                      <div
                        key={i}
                        className="iux-timeline__keyframe"
                        style={{
                          insetInlineStart: pct(k.at),
                          insetBlockStart: `${(1 - k.value) * 100}%`,
                        }}
                        onPointerDown={ev => handleKfDown(ev, i)}
                        title={`${fmt(k.at)} = ${(k.value * 100).toFixed(0)}%`}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="iux-timeline__multi-playhead" style={{ insetInlineStart: pct(currentTime) }} aria-hidden="true" />
          <p className="iux-timeline__hint">Drag keyframes. Shift+click empty area to add.</p>
        </div>
      )}
    </div>
  )
}

// ABOUTME: Renders a normalized SVG polyline through the keyframes of a single track lane, connecting their time/value positions in a 0–100 viewBox so the curve stretches freely to fill the lane.
function CurvePolyline({ kfs, duration }: { kfs: TimelineKeyframe[]; duration: number }) {
  const points = kfs.map(k => `${(k.at / duration) * 100},${(1 - k.value) * 100}`).join(' ')
  return (
    <svg className="iux-timeline__curve" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  )
}
