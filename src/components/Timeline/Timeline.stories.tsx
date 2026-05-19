import { useState, type ReactNode } from 'react'
import { Timeline, type TimelineKeyframe, type TimelineTrack, type TimelineVariant } from './Timeline'

const VARIANTS: TimelineVariant[] = ['basic', 'snap', 'multi', 'keyframes']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '40rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function BasicStateful() {
  const [t, setT] = useState(2)
  return <Timeline variant="basic" duration={30} time={t} onTimeChange={setT} />
}

function SnapStateful() {
  const [t, setT] = useState(2)
  return (
    <Timeline
      variant="snap"
      duration={60}
      time={t}
      onTimeChange={setT}
      markers={[
        { at: 0, label: 'Start' },
        { at: 15, label: 'Chapter 2' },
        { at: 30, label: 'Chapter 3' },
        { at: 45, label: 'Chapter 4' },
        { at: 60, label: 'End' },
      ]}
      zoom={20}
    />
  )
}

function MultiStateful() {
  const [t, setT] = useState(4)
  const [tracks, setTracks] = useState<TimelineTrack[]>([
    { id: 'a', name: 'Bass', color: 'oklch(70% 0.16 30)' },
    { id: 'b', name: 'Drums', color: 'oklch(70% 0.16 160)' },
    { id: 'c', name: 'Vox', color: 'oklch(70% 0.16 250)' },
  ])
  return (
    <Timeline
      variant="multi"
      duration={30}
      time={t}
      onTimeChange={setT}
      tracks={tracks}
      onTrackChange={(id, patch) => setTracks(prev => prev.map(tr => tr.id === id ? { ...tr, ...patch } : tr))}
    />
  )
}

function KeyframesStateful() {
  const [t, setT] = useState(4)
  const [tracks] = useState<TimelineTrack[]>([
    { id: 'opacity', name: 'Opacity', color: 'oklch(70% 0.16 250)' },
    { id: 'scale',   name: 'Scale',   color: 'oklch(70% 0.16 60)'  },
  ])
  const [kfs, setKfs] = useState<TimelineKeyframe[]>([
    { trackId: 'opacity', at: 0, value: 0 },
    { trackId: 'opacity', at: 10, value: 1 },
    { trackId: 'opacity', at: 20, value: 0.5 },
    { trackId: 'scale', at: 0, value: 0.5 },
    { trackId: 'scale', at: 15, value: 1 },
  ])
  return (
    <Timeline
      variant="keyframes"
      duration={20}
      time={t}
      onTimeChange={setT}
      tracks={tracks}
      keyframes={kfs}
      onKeyframeChange={kf => {
        setKfs(prev => {
          const idx = prev.findIndex(k => k.trackId === kf.trackId && Math.abs(k.at - kf.at) < 0.2)
          if (idx >= 0) {
            const next = prev.slice()
            next[idx] = kf
            return next
          }
          return [...prev, kf]
        })
      }}
      onKeyframeAdd={kf => setKfs(prev => [...prev, kf])}
    />
  )
}

export function TimelineStories() {
  return (
    <div className="stories__component">
      {VARIANTS.map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'basic' && <Cell label="drag the track to scrub"><BasicStateful /></Cell>}
            {variant === 'snap' && <Cell label="tick scale + markers + snap"><SnapStateful /></Cell>}
            {variant === 'multi' && <Cell label="multi-track + mute/solo"><MultiStateful /></Cell>}
            {variant === 'keyframes' && <Cell label="drag values; Shift+click empty area to add"><KeyframesStateful /></Cell>}
          </div>
        </section>
      ))}
    </div>
  )
}
