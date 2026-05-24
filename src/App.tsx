import { Stories } from './stories'
import { Viz } from './stories/viz'
import { Quiz } from './stories/quiz'
import { useHashLocation } from './apps/router'
import { AppsRouter } from './apps/AppsRouter'

export default function App() {
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
  return <Stories />
}
