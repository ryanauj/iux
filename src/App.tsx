import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { Stories } from './stories'
import { Viz } from './stories/viz'
import { Quiz } from './stories/quiz'
import { Doctrine } from './stories/doctrine'
import { useHashLocation } from './apps/router'
import { AppsRouter } from './apps/AppsRouter'
import { EnginesIndex } from './guides/engines'
import { EngineGuide } from './guides/engines/EngineGuide'
import { ENGINE_GUIDES, type EngineGuideId } from './guides/engines/registry'
import { TestsPage } from './tests/TestsPage'

function HomeRoute() {
  const location = useHashLocation()
  if (location.path.startsWith('/apps')) {
    return <AppsRouter location={location} />
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
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/engines" element={<EnginesIndex />} />
      <Route path="/engines/:engineId" element={<EngineGuideRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
