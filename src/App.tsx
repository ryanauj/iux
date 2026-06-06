import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { Stories } from './stories'
import { Viz } from './stories/viz'
import { Quiz } from './stories/quiz'
import { Doctrine } from './stories/doctrine'
import { HowItWorks } from './stories/howitworks'
import { useHashLocation } from './apps/router'
import { AppsRouter } from './apps/AppsRouter'
import { EnginesIndex } from './guides/engines'
import { EngineGuide } from './guides/engines/EngineGuide'
import { ENGINE_GUIDES, type EngineGuideId } from './guides/engines/registry'
import { PalettesIndex } from './guides/palettes/PalettesIndex'
import { PaletteDesignPageRoute } from './guides/palettes/PaletteDesignPage'
import { TestsPage } from './tests/TestsPage'
import { SettingsPage } from './settings/SettingsPage'
import { StyleEditorPage } from './editor/StyleEditorPage'
import { useSharedPatternHydration } from './lib/useSharedPatternHydration'

function HomeRoute() {
  const location = useHashLocation()
  if (location.path.startsWith('/apps')) {
    return <AppsRouter location={location} />
  }
  if (location.path === '/editor' || location.path.startsWith('/editor/')) {
    return <StyleEditorPage />
  }
  if (location.path === '/viz' || location.path.startsWith('/viz/')) {
    return <Viz />
  }
  if (location.path === '/quiz' || location.path.startsWith('/quiz/')) {
    return <Quiz />
  }
  if (location.path === '/tests' || location.path.startsWith('/tests/')) {
    return <TestsPage />
  }
  if (location.path === '/doctrine' || location.path.startsWith('/doctrine/')) {
    return <Doctrine />
  }
  if (location.path === '/how-it-works' || location.path.startsWith('/how-it-works/')) {
    return <HowItWorks />
  }
  if (location.path === '/settings' || location.path.startsWith('/settings/')) {
    return <SettingsPage />
  }
  return <Stories />
}

function EngineGuideRoute() {
  const { engineId } = useParams<{ engineId: string }>()
  const guide = engineId && (engineId in ENGINE_GUIDES)
    ? ENGINE_GUIDES[engineId as EngineGuideId]
    : null
  if (!guide) return <Navigate to="/engines" replace />
  return <EngineGuide guide={guide} />
}

export default function App() {
  useSharedPatternHydration()
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/engines" element={<EnginesIndex />} />
      <Route path="/engines/:engineId" element={<EngineGuideRoute />} />
      <Route path="/palettes" element={<PalettesIndex />} />
      <Route path="/palettes/:paletteId/design" element={<PaletteDesignPageRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
