import { Shell } from './app/Shell'
import { StoreProvider } from './app/StoreContext'

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}
