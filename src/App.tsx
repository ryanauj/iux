import { Stories } from './stories'
import { Viz } from './stories/viz'
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
  return <Stories />
}
