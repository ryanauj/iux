// ABOUTME: EngineGuide — a React component (guides).

import { useCallback, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { resolveStyle } from '../../lib/customPatterns'
import { Stepper, type StepperStep } from '../../components/Stepper/Stepper'
import { AppShell } from '../../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../../components/AppShell/navLinks'
import {
  NAV_LAYOUT_OPTIONS,
  useNavLayout,
  type NavLayoutId,
} from '../../components/AppShell/navLayouts'
import {
  DraggableControls,
  useControlsStyle,
  type Field,
} from '../../components/DraggableControls/DraggableControls'
import { buildPaletteField, useSelectedStyle } from '../../lib/persistedStyle'
import { useDocMode } from '../../lib/useDocMode'
import { DocModeToggle } from '../../components/DocModeToggle/DocModeToggle'
import { descriptions } from '../../../palettes/descriptions'
import type { StyleDescription } from '../../../tokens/style-description.contract'
import type { DocMode } from '../../lib/useDocMode'
import type { EngineGuideMeta } from './types'
import './guides.css'

interface PalettePanelProps {
  description: StyleDescription
  paletteName: string
  mode: DocMode
}

function PalettePanel({ description, paletteName, mode }: PalettePanelProps) {
  if (mode === 'plain' && description.plain) {
    const { tagline, summary, lookingLike } = description.plain
    return (
      <section className="iux-palette-panel" aria-label={`About ${paletteName}`}>
        <p className="iux-palette-panel__eyebrow">About this palette · plain English</p>
        <h2 className="iux-palette-panel__title">{paletteName}</h2>
        <p className="iux-palette-panel__tagline">{tagline}</p>
        <p className="iux-palette-panel__summary">{summary}</p>
        {lookingLike && lookingLike.length > 0 && (
          <>
            <p className="iux-palette-panel__list-heading">What to look for</p>
            <ul className="iux-palette-panel__list">
              {lookingLike.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </section>
    )
  }

  return (
    <section className="iux-palette-panel" aria-label={`About ${paletteName}`}>
      <p className="iux-palette-panel__eyebrow">About this palette</p>
      <h2 className="iux-palette-panel__title">{paletteName}</h2>
      <p className="iux-palette-panel__tagline">{description.tagline}</p>
      <p className="iux-palette-panel__summary">{description.summary}</p>
    </section>
  )
}

interface EngineGuideProps {
  guide: EngineGuideMeta
}

// ABOUTME: EngineGuide — a React component.
export function EngineGuide({ guide }: EngineGuideProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()
  const [docMode, setDocMode] = useDocMode()
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const requestedStep = searchParams.get('step')
  const fallbackId = guide.steps[0]?.id ?? ''
  const currentId = guide.steps.some(s => s.id === requestedStep)
    ? (requestedStep as string)
    : fallbackId
  const demoDescription = descriptions[guide.demoPalette.id as keyof typeof descriptions]

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
        title: docMode === 'plain' && s.plainTitle ? s.plainTitle : s.title,
        description: docMode === 'plain' ? undefined : s.description,
        content: (
          <div className="iux-engine-guide__step">
            <div className="iux-engine-guide__step-body">
              {docMode === 'plain' ? (s.plainBody ?? s.body) : s.body}
            </div>
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
    [guide.steps, guide.demoPalette, docMode],
  )

  const [navLayout, setNavLayout] = useNavLayout()
  const brand = (
    <h1 className="iux-engine-guide__brand-title">iux — engines</h1>
  )

  const chromeField: Field = buildPaletteField(selectedStyle, setSelectedStyle)
  const navLayoutField: Field = {
    key: 'navLayout',
    label: 'Nav',
    short: 'N',
    value: navLayout,
    options: NAV_LAYOUT_OPTIONS.map(o => ({ value: o.value, label: o.label })),
    onChange: v => setNavLayout(v as NavLayoutId),
  }
  const fields: Field[] = [chromeField, navLayoutField]

  return (
    <PaletteRoot palette={resolveStyle(selectedStyle)} as="section" className="iux-engine-guide-shell">
      <AppShell
        layoutId={navLayout}
        brand={brand}
        nav={APP_SHELL_NAV}
        activeId="engines"
      >
        <main className="iux-engine-guide">
          <DraggableControls
            style={controlsStyle}
            onStyleChange={setControlsStyle}
            fields={fields}
          />
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
            <div className="iux-engine-guide__header-top">
              <p className="iux-engine-guide__eyebrow">Rendering engine · walkthrough</p>
              <DocModeToggle value={docMode} onChange={setDocMode} />
            </div>
            <h1 className="iux-engine-guide__title">{guide.name}</h1>
            <p className="iux-engine-guide__summary">
              {docMode === 'plain' ? (guide.plainSummary ?? guide.summary) : guide.summary}
            </p>
            <p className="iux-engine-guide__demo-meta">
              Demo palette: <strong>{guide.demoPalette.name}</strong>
              {' · '}
              <Link to={`/?palette=${guide.demoPalette.id}&view=per-palette`}>
                Open in Stories →
              </Link>
            </p>
          </header>

          {demoDescription && (
            <PalettePanel
              description={demoDescription}
              paletteName={guide.demoPalette.name}
              mode={docMode}
            />
          )}

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
