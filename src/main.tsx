// ABOUTME: Browser entry point — mounts the React app into the DOM.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('root element missing')
// Vite's `base` (`/iux/`) is the URL prefix the app is served under. Strip the
// trailing slash for the router basename so paths like `/engines/flat` match
// even when hosted under `/iux/engines/flat`.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
