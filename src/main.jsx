import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createMemoryRouter, RouterProvider } from 'react-router'
import { routes } from './routes'
import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/archivo/wdth.css'
// Devanagari for the Hindi and Marathi versions; each file downloads only when such text is shown.
import '@fontsource-variable/noto-serif-devanagari/wght.css'
import '@fontsource-variable/noto-sans-devanagari/wght.css'
import './styles/global.css'

// VITE_MEMORY_ROUTER=true builds a single-file preview that keeps routes in memory.
const router =
  import.meta.env.VITE_MEMORY_ROUTER === 'true' ? createMemoryRouter(routes) : createBrowserRouter(routes)

// Pages arrive pre-rendered (scripts/prerender.mjs). The app takes over once the router has
// loaded the current page's code, so the pre-rendered page stays on screen until then.
function start() {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
if (router.state.initialized) start()
else {
  const stop = router.subscribe((state) => {
    if (!state.initialized) return
    stop()
    start()
  })
}
