import { useEffect, useState } from 'react'
import type { DemoMeta } from '../demos'
import { Toggle } from '../lib'
import Button from '../lib/Button'
import ThemeSelector from '../lib/theme/ThemeSelector'
import { useDemoTheme } from '../lib/theme/useTheme'

export default function DemoShell({ demo }: { demo: DemoMeta }) {
  const [persisted, setPersisted] = useState(false)
  const [resetTick, setResetTick] = useState(0)
  const [busy, setBusy] = useState(false)
  const { override } = useDemoTheme(demo.id)

  const hasControls = !!demo.controls

  useEffect(() => {
    if (!demo.controls) return
    let cancelled = false
    demo.controls.getPersisted().then((v) => {
      if (!cancelled) setPersisted(v)
    })
    return () => {
      cancelled = true
    }
  }, [demo])

  async function togglePersist() {
    if (!demo.controls) return
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
    if (!demo.controls) return
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
    <div className='shell' data-theme={override ?? undefined}>
      <div className='shell__bar'>
        <a className='shell__back' href='#/'>
          ← all demos
        </a>
        <div className='shell__title'>
          <h2>{demo.name}</h2>
          <p>{demo.blurb}</p>
        </div>
        <div className='shell__controls'>
          <ThemeSelector scope='demo' demoId={demo.id} />
          {hasControls && (
            <>
              <Toggle
                checked={persisted}
                onChange={togglePersist}
                disabled={busy}
                label='persist across reloads'
              />
              <Button
                variant='ghost'
                size='sm'
                onClick={reset}
                disabled={busy}
              >
                reset demo
              </Button>
            </>
          )}
        </div>
      </div>
      <div className='shell__content'>
        <Component key={resetTick} />
      </div>
    </div>
  )
}
