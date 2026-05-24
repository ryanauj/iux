import { useCallback, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { palettes } from '../../../palettes'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { Stepper, type StepperStep } from '../../components/Stepper/Stepper'
import { AppShell } from '../../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../../components/AppShell/navLinks'
import { useNavLayout } from '../../components/AppShell/navLayouts'
import { useSelectedStyle } from '../../lib/persistedStyle'
import type { EngineGuideMeta } from './types'
import './guides.css'

interface EngineGuideProps {
  guide: EngineGuideMeta
}

export function EngineGuide({ guide }: EngineGuideProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedStyle] = useSelectedStyle()
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

  const [navLayout] = useNavLayout()
  const brand = (
    <h1 className="iux-engine-guide__brand-title">iux — engines</h1>
  )

  return (
    <PaletteRoot palette={palettes[selectedStyle]} as="section" className="iux-engine-guide-shell">
      <AppShell
        layoutId={navLayout}
        brand={brand}
        nav={APP_SHELL_NAV}
        activeId="engines"
      >
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
      </AppShell>
    </PaletteRoot>
  )
}
