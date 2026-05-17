import { useEffect, useState } from 'react'
import type { DemoMeta } from '../demos'

export default function DemoShell({ demo }: { demo: DemoMeta }) {
  const [persisted, setPersisted] = useState(false)
  const [resetTick, setResetTick] = useState(0)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancelled = false
    demo.controls.getPersisted().then((v) => {
      if (!cancelled) setPersisted(v)
    })
    return () => {
      cancelled = true
    }
  }, [demo])

  async function togglePersist() {
    const next = !persisted
    setPersisted(next)
    setBusy(true)
    try {
      await demo.controls.setPersisted(next)
    } catch {
      setPersisted(!next)
    } finally {
      setBusy(false)
    }
  }

  async function reset() {
    if (!confirm('Reset this demo to its empty starting state?')) return
    setBusy(true)
    try {
      await demo.controls.reset()
      setResetTick((t) => t + 1)
    } finally {
      setBusy(false)
    }
  }

  const Component = demo.Component

  return (
    <div className='shell'>
      <div className='shell__bar'>
        <a className='shell__back' href='#/'>
          ← all demos
        </a>
        <div className='shell__title'>
          <h2>{demo.name}</h2>
          <p>{demo.blurb}</p>
        </div>
        <div className='shell__controls'>
          <label className='shell__toggle'>
            <input
              type='checkbox'
              checked={persisted}
              onChange={togglePersist}
              disabled={busy}
            />
            <span>persist across reloads</span>
          </label>
          <button
            type='button'
            className='shell__reset'
            onClick={reset}
            disabled={busy}
          >
            reset demo
          </button>
        </div>
      </div>
      <div className='shell__content'>
        <Component key={resetTick} />
      </div>
    </div>
  )
}
