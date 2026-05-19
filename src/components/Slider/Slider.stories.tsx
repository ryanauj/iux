import { useState, type ReactNode } from 'react'
import { Slider, type SliderVariant } from './Slider'

export const VARIANTS: SliderVariant[] = ['single', 'ticks', 'range', 'curve']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '20rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function StatefulSingle({ initial = 32 }: { initial?: number }) {
  const [v, setV] = useState(initial)
  return <Slider variant="single" label="Volume" value={v} onChange={setV} />
}

function StatefulRange({ initial = [20, 75] as [number, number] }) {
  const [r, setR] = useState<[number, number]>(initial)
  return <Slider variant="range" label="Price" range={r} onRangeChange={setR} formatValue={n => `$${Math.round(n)}`} />
}

// A simple gamma-like curve sampled across the range.
const GAMMA_CURVE = Array.from({ length: 21 }, (_, i) => {
  const x = i / 20
  return Math.pow(x, 2.2) * 100
})

function StatefulCurve() {
  const [v, setV] = useState(40)
  const idx = Math.round((v / 100) * (GAMMA_CURVE.length - 1))
  const out = Math.round(GAMMA_CURVE[idx])
  return (
    <Slider
      variant="curve"
      label="Gamma input"
      value={v}
      onChange={setV}
      curve={GAMMA_CURVE}
      formatValue={n => `${Math.round(n)} → ${out}`}
      hint="Track shows output curve. Thumb scrubs input."
    />
  )
}

export function SliderStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'single' && (
              <>
                <Cell label="default"><StatefulSingle /></Cell>
                <Cell label="hover"><Slider variant="single" label="Volume" defaultValue={60} stateLock="hover" /></Cell>
                <Cell label="focus"><Slider variant="single" label="Volume" defaultValue={60} stateLock="focus" /></Cell>
                <Cell label="disabled"><Slider variant="single" label="Volume" defaultValue={60} disabled /></Cell>
              </>
            )}
            {variant === 'ticks' && (
              <>
                <Cell label="step 10">
                  <Slider variant="ticks" label="Quality" min={0} max={100} step={10} defaultValue={40} snap />
                </Cell>
                <Cell label="custom ticks">
                  <Slider
                    variant="ticks"
                    label="Brush size"
                    min={0}
                    max={100}
                    step={1}
                    ticks={[0, 25, 50, 75, 100]}
                    snap
                    defaultValue={25}
                  />
                </Cell>
                <Cell label="hint">
                  <Slider variant="ticks" label="Score" min={0} max={5} step={1} defaultValue={3} hint="0-5 stars" />
                </Cell>
              </>
            )}
            {variant === 'range' && (
              <>
                <Cell label="default"><StatefulRange /></Cell>
                <Cell label="focus min">
                  <Slider variant="range" label="Price" range={[20, 75]} stateLock="focus" formatValue={n => `$${Math.round(n)}`} />
                </Cell>
                <Cell label="disabled">
                  <Slider variant="range" label="Price" range={[20, 75]} disabled formatValue={n => `$${Math.round(n)}`} />
                </Cell>
              </>
            )}
            {variant === 'curve' && (
              <>
                <Cell label="interactive"><StatefulCurve /></Cell>
                <Cell label="static at 75">
                  <Slider variant="curve" label="Gamma" value={75} curve={GAMMA_CURVE} stateLock="focus" />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
