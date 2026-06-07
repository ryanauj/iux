// ABOUTME: ContractsApp — a React component (apps).

import { useEffect, useMemo, useRef } from 'react'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { buildPaletteField, isStyleId, useSelectedStyle } from '../../lib/persistedStyle'
import { resolveStyle, type StyleId } from '../../lib/customPatterns'
import { pathSegments, replaceParams, type HashLocation } from '../router'
import {
  DraggableControls,
  useControlsStyle,
  type Field,
} from '../../components/DraggableControls/DraggableControls'
import {
  DEFAULT_MOTION_SCALE,
  MOTION_FIELD_OPTIONS,
  resolveMotionScale,
} from '../../theme/motionScales'
import { matchContractsRoute, type ContractsRoute } from './routes'
import {
  DEFAULT_LAYOUT,
  LAYOUT_OPTIONS,
  Shell,
  resolveLayoutId,
} from './shell'
import { Overview } from './pages/Overview'
import { Ladder } from './pages/Ladder'
import { Anatomy } from './pages/Anatomy'
import { MaxDeals } from './pages/MaxDeals'
import { Exceptions } from './pages/Exceptions'
import { LuxuryTax } from './pages/LuxuryTax'
import { Aprons } from './pages/Aprons'
import { Trades } from './pages/Trades'
import { TeamSheet } from './pages/TeamSheet'
import { NotFound } from './pages/NotFound'
import './contracts-app.css'

interface ContractsAppProps {
  location: HashLocation
}

// ABOUTME: ContractsApp — a React component.
export function ContractsApp({ location }: ContractsAppProps) {
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()

  // Drop the `apps/contracts` prefix and match the remainder.
  const route = useMemo(() => {
    const segs = pathSegments(location.path)
    return matchContractsRoute(segs.slice(2))
  }, [location.path])

  // Jump back to the top whenever the chapter changes — otherwise paging
  // forward lands you mid-page at the previous scroll offset. Keyed on the
  // path only, so palette/layout/motion tweaks don't yank the scroll.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.path])

  // URL wins on a fresh visit (pasted permalink); the site-wide persisted
  // style is the fallback so arriving from anywhere keeps the chosen look.
  const paletteParam = location.params.get('palette')
  const styleId: StyleId =
    paletteParam && isStyleId(paletteParam) ? paletteParam : selectedStyle
  const palette = resolveStyle(styleId)
  const motionScale = resolveMotionScale(location.params.get('motion'))

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

  const layoutId = resolveLayoutId(location.params.get('layout'))
  const handleLayoutChange = (next: string) => {
    const id = resolveLayoutId(next)
    replaceParams({ layout: id === DEFAULT_LAYOUT ? undefined : id })
  }

  const handleMotionChange = (next: string) => {
    replaceParams({
      motion: Number(next) === DEFAULT_MOTION_SCALE ? undefined : next,
    })
  }

  const floatingFields: Field[] = [
    buildPaletteField(styleId, handlePaletteChange),
    {
      key: 'layout',
      label: 'Layout',
      short: 'L',
      value: layoutId,
      options: LAYOUT_OPTIONS.map(o => ({ value: o.value, label: o.label })),
      onChange: handleLayoutChange,
    },
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
      <Shell layoutId={layoutId} route={route}>
        <RouteContent route={route} />
      </Shell>
      <DraggableControls
        style={controlsStyle}
        onStyleChange={setControlsStyle}
        fields={floatingFields}
      />
    </PaletteRoot>
  )
}

function RouteContent({ route }: { route: ContractsRoute }) {
  switch (route.kind) {
    case 'overview': return <Overview />
    case 'ladder': return <Ladder />
    case 'anatomy': return <Anatomy />
    case 'maxDeals': return <MaxDeals />
    case 'exceptions': return <Exceptions />
    case 'tax': return <LuxuryTax />
    case 'aprons': return <Aprons />
    case 'trades': return <Trades />
    case 'team': return <TeamSheet />
    case 'notFound': return <NotFound />
  }
}
