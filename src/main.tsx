// ABOUTME: Browser entry point — mounts the React app into the DOM.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

// ABOUTME: The DOM element the React root is mounted into; throws if the element is missing so a misconfigured HTML file fails loudly.
const root = document.getElementById('root')
if (!root) throw new Error('root element missing')
// Vite's `base` (`/iux/`) is the URL prefix the app is served under. Strip the
// trailing slash for the router basename so paths like `/engines/flat` match
// even when hosted under `/iux/engines/flat`.
// ABOUTME: BrowserRouter basename derived from Vite's BASE_URL with the trailing slash stripped so path matching works correctly under the /iux/ deploy prefix.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
