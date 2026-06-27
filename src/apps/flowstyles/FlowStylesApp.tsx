// ABOUTME: Root shell for the Recipe Flow app — wraps the styled React Flow canvas in PaletteRoot, reads the palette/motion/treatment from the URL, and renders the header plus the floating palette/motion controls.

import { useRef } from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { buildPaletteField, isStyleId, useSelectedStyle } from '../../lib/persistedStyle'
import { resolveStyle, type StyleId } from '../../lib/customPatterns'
import { Link } from '../Link'
import { replaceParams, type HashLocation } from '../router'
import {
  DraggableControls,
  OpenControlsHint,
  useControlsStyle,
  type Field,
} from '../../components/DraggableControls/DraggableControls'
import {
  DEFAULT_MOTION_SCALE,
  MOTION_FIELD_OPTIONS,
  resolveMotionScale,
} from '../../theme/motionScales'
import { RecipeFlow } from './components/RecipeFlow'
import { getTreatment } from './treatments'
import { SHAKSHUKA } from './data/shakshuka'
import './flowstyles-app.css'

// ABOUTME: Props for FlowStylesApp; carries the full HashLocation so the app can read palette, motion, and treatment query params.
interface FlowStylesAppProps {
  location: HashLocation
}

// ABOUTME: Root shell for the Recipe Flow gallery — resolves palette/motion/treatment from the URL (seeding the persisted style on first mount), renders the brand header and the styled canvas, and exposes palette + motion in a floating DraggableControls panel.
/**
 * The treatment is held in the URL (`?t=`) so a particular look is shareable;
 * the canvas itself owns the picker and writes back through `onTreatmentChange`.
 * Palette and motion follow the same URL-wins-then-persisted pattern as the
 * other mini-apps, so navigating in from the apps directory keeps the chosen
 * look.
 */
export function FlowStylesApp({ location }: FlowStylesAppProps) {
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()

  const paletteParam = location.params.get('palette')
  const styleId: StyleId =
    paletteParam && isStyleId(paletteParam) ? paletteParam : selectedStyle
  const palette = resolveStyle(styleId)
  const motionScale = resolveMotionScale(location.params.get('motion'))
  const treatment = getTreatment(location.params.get('t'))

  const didSeedFromUrl = useRef(false)
  if (!didSeedFromUrl.current) {
    didSeedFromUrl.current = true
    if (paletteParam && styleId !== selectedStyle) {
      setSelectedStyle(styleId)
    }
  }

  const handlePaletteChange = (next: string) => {
    if (isStyleId(next)) setSelectedStyle(next)
    replaceParams({ palette: next })
  }

  const handleMotionChange = (next: string) => {
    replaceParams({ motion: Number(next) === DEFAULT_MOTION_SCALE ? undefined : next })
  }

  const handleTreatmentChange = (id: string) => {
    replaceParams({ t: id })
  }

  const fields: Field[] = [
    buildPaletteField(styleId, handlePaletteChange),
    {
      key: 'motion',
      label: 'Motion',
      short: 'M',
      value: String(motionScale),
      options: MOTION_FIELD_OPTIONS.map(o => ({ ...o })),
      onChange: handleMotionChange,
    },
  ]

  return (
    <PaletteRoot palette={palette} as="section" motionScale={motionScale}>
      <div className="flowstyles-app">
        <header className="flowstyles-app__header">
          <div className="flowstyles-app__brand">
            <span className="flowstyles-app__brand-mark" aria-hidden="true">
              ◍
            </span>
            <span className="flowstyles-app__brand-text">
              <span className="flowstyles-app__brand-name">Recipe Flow</span>
              <span className="flowstyles-app__brand-tagline">
                One recipe graph, styled many ways with React Flow
              </span>
            </span>
          </div>
          <span className="flowstyles-app__spacer" />
          <Link to="/apps" className="flowstyles-app__exit">
            ← Apps
          </Link>
          <OpenControlsHint />
        </header>
        <main className="flowstyles-app__main">
          <ReactFlowProvider>
            <RecipeFlow
              recipe={SHAKSHUKA}
              treatment={treatment}
              onTreatmentChange={handleTreatmentChange}
            />
          </ReactFlowProvider>
        </main>
      </div>
      <DraggableControls
        style={controlsStyle}
        onStyleChange={setControlsStyle}
        fields={fields}
      />
    </PaletteRoot>
  )
}
