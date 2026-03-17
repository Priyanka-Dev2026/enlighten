import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/styles/index.css'
import './lenis' // Initialize Lenis eagerly — must be before App mounts
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}

// Wait for Typekit (Adobe Fonts) to finish loading.
// Typekit adds wf-active or wf-inactive to <html> when complete.
const waitForTypekit = () => new Promise((resolve) => {
  const html = document.documentElement
  if (html.classList.contains('wf-active') || html.classList.contains('wf-inactive')) {
    resolve()
    return
  }
  const observer = new MutationObserver(() => {
    if (html.classList.contains('wf-active') || html.classList.contains('wf-inactive')) {
      observer.disconnect()
      resolve()
    }
  })
  observer.observe(html, { attributes: true, attributeFilter: ['class'] })
  setTimeout(resolve, 800) // Don't wait more than 800ms — Typekit is often blocked by ad blockers
})

// Wait for all fonts before mounting React.
//
// WHY THIS MATTERS FOR SAFARI:
// All fonts use font-display: swap. Safari renders with fallback font metrics,
// then swaps when the real font loads. SplitType (used for reveal animations)
// runs during useGSAP (useLayoutEffect) and splits text based on current font
// metrics. If the custom font isn't loaded yet, SplitType creates wrong line/
// char splits → animations fire at incorrect positions or skip entirely.
// This is intermittent (works when fonts are cached, breaks on cold load).
// Chrome is more tolerant of font swaps; Safari is not.
//
// By waiting here, fonts are guaranteed loaded before any component mounts
// and before any SplitType call runs.
// NOTE: Typekit (Adobe Fonts) is often blocked by ad blockers — its wait is
// capped at 800ms so a blocked CDN never causes a 3s blank screen.
Promise.race([
  Promise.all([document.fonts.ready, waitForTypekit()]),
  new Promise((resolve) => setTimeout(resolve, 1500)), // Overall 1.5s safety cap
]).then(renderApp)
