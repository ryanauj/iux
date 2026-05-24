import { useCallback, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { palette as flatClassic } from '../../../palettes/flat-classic'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { Stepper, type StepperStep } from '../../components/Stepper/Stepper'
import type { EngineGuideMeta } from './types'
import './guides.css'

interface EngineGuideProps {
  guide: EngineGuideMeta
}

export function EngineGuide({ guide }: EngineGuideProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedStep = searchParams.get('step')
  const fallbackId = guide.steps[0]?.id ?? ''
  const currentId = guide.steps.some(s => s.id === requestedStep)
    ? (requestedStep as string)
    : fallbackId

  const handleStepChange = useCallback(
    (id: string) => {
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev)
          if (id === fallbackId) next.delete('step')
          else next.set('step', id)
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams, fallbackId],
  )

  const stepperSteps: StepperStep[] = useMemo(
    () =>
      guide.steps.map(s => ({
        id: s.id,
        title: s.title,
        description: s.description,
        content: (
          <div className="iux-engine-guide__step">
            <div className="iux-engine-guide__step-body">{s.body}</div>
            <PaletteRoot
              palette={guide.demoPalette}
              as="section"
              className="iux-engine-guide__demo"
            >
              {s.demo}
            </PaletteRoot>
          </div>
        ),
      })),
    [guide.steps, guide.demoPalette],
  )

  return (
    <PaletteRoot palette={flatClassic} as="section" className="iux-engine-guide-shell">
      <main className="iux-engine-guide">
        <nav className="iux-engine-guide__crumbs" aria-label="Breadcrumb">
          <Link to="/" className="iux-engine-guide__crumb">Stories</Link>
          <span className="iux-engine-guide__crumb-sep" aria-hidden="true">/</span>
          <Link to="/engines" className="iux-engine-guide__crumb">Engines</Link>
          <span className="iux-engine-guide__crumb-sep" aria-hidden="true">/</span>
          <span className="iux-engine-guide__crumb iux-engine-guide__crumb--current" aria-current="page">
            {guide.name}
          </span>
        </nav>

        <header className="iux-engine-guide__header">
          <p className="iux-engine-guide__eyebrow">Rendering engine · walkthrough</p>
          <h1 className="iux-engine-guide__title">{guide.name}</h1>
          <p className="iux-engine-guide__summary">{guide.summary}</p>
          <p className="iux-engine-guide__demo-meta">
            Demo palette: <strong>{guide.demoPalette.name}</strong>
            {' · '}
            <Link to={`/?palette=${guide.demoPalette.id}&view=per-palette`}>
              Open in Stories →
            </Link>
          </p>
        </header>

        <Stepper
          variant="linear"
          steps={stepperSteps}
          currentId={currentId}
          onCurrentChange={handleStepChange}
          ariaLabel={`${guide.name} engine walkthrough`}
          className="iux-engine-guide__stepper"
        />
      </main>
    </PaletteRoot>
  )
}
