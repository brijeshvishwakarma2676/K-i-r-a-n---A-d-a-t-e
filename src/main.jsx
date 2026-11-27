import { StrictMode, startTransition } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, createMemoryRouter, RouterProvider } from 'react-router'
import { prefetchPages, routes } from './routes'
import { importantMedia } from './lib/warm'
import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/archivo/wdth.css'
// Devanagari for the Hindi and Marathi versions; each file downloads only when such text is shown.
import '@fontsource-variable/noto-serif-devanagari/wght.css'
import '@fontsource-variable/noto-sans-devanagari/wght.css'
import 'lenis/dist/lenis.css'
import './styles/global.css'
import { startSmoothScroll } from './lib/smoothScroll'
import { preloadSavedLanguage } from './i18n'

preloadSavedLanguage()

// VITE_MEMORY_ROUTER=true builds a single-file preview that keeps routes in memory.
const router =
  import.meta.env.VITE_MEMORY_ROUTER === 'true' ? createMemoryRouter(routes) : createBrowserRouter(routes)

/*
  Pages arrive pre-rendered (scripts/prerender.mjs). Once the router has loaded the current page's
  code, React takes over the page that is already on screen (hydration) instead of drawing it
  again, and does so as a transition, in small slices that leave the browser free to scroll and
  respond between them. Where there is no pre-rendered page (the dev server, the single-file
  preview) it draws the app from scratch. Smooth scrolling starts afterwards, when the browser is idle.
*/
function start() {
  const root = document.getElementById('root')
  const app = (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
  if (root.hasChildNodes()) {
    startTransition(() => {
      hydrateRoot(root, app, {
        // A page that differs from its HTML (e.g. built before a date it depends on) is redrawn
        // by React; report it so it can be fixed rather than slow the page unnoticed.
        onRecoverableError: (error) => console.warn('Page redrawn instead of reused:', error),
      })
    })
  } else createRoot(root).render(app)
  const idle = window.requestIdleCallback || ((f) => setTimeout(f, 200))
  idle(startSmoothScroll, { timeout: 2000 })
  // Then, while the visitor looks at the first page: the code of every other page, and (through the
  // service worker) the photographs and clips that come next. Nothing here delays the first page.
  idle(prefetchPages, { timeout: 4000 })
  keepOnDevice()
}

/*
  The service worker (scripts/sw.js, written to dist/sw.js at build) keeps the site's files on the
  device. Only on the built site: the dev server serves files that change on every save.
*/
function keepOnDevice() {
  if (!import.meta.env.PROD || import.meta.env.VITE_MEMORY_ROUTER === 'true' || !('serviceWorker' in navigator)) return
  const go = () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
    navigator.serviceWorker.ready.then((reg) => {
      const idle = window.requestIdleCallback || ((f) => setTimeout(f, 1500))
      idle(() => reg.active?.postMessage({ type: 'warm', urls: importantMedia() }), { timeout: 5000 })
    })
  }
  if (document.readyState === 'complete') go()
  else addEventListener('load', go, { once: true })
}
if (router.state.initialized) start()
else {
  const stop = router.subscribe((state) => {
    if (!state.initialized) return
    stop()
    start()
  })
}
