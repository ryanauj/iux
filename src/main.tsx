import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

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
      <App />
    </StrictMode>,
  )
}

bootstrap()
