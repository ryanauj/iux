import { Stories } from './stories'
import { useHashLocation } from './apps/router'
import { AppsRouter } from './apps/AppsRouter'

export default function App() {
  const location = useHashLocation()
  if (location.path.startsWith('/apps')) {
    return <AppsRouter location={location} />
  }
  return <Stories />
}
