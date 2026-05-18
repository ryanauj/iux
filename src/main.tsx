import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './lib/theme/ThemeProvider'
import { readGlobalTheme } from './lib/theme/themes'
import './lib/styles/tokens.css'
import './lib/styles/components.css'
import './lib/styles/themes/default.css'
import './lib/styles/themes/light.css'
import './lib/styles/themes/terminal.css'
import './styles.css'

// Apply the saved theme before the React tree mounts so there's no flash.
document.documentElement.dataset.theme = readGlobalTheme()

async function startMockServer() {
  const { worker } = await import('./server/browser')
  await worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
    onUnhandledRequest: 'bypass',
    quiet: true,
  })
}

async function bootstrap() {
  await startMockServer()
  const root = document.getElementById('root')
  if (!root) throw new Error('root element missing')
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>,
  )
}

bootstrap()
