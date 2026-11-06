import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createMemoryRouter, RouterProvider } from 'react-router'
import { routes } from './routes'
import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/archivo/wdth.css'
import './styles/global.css'

// VITE_MEMORY_ROUTER=true builds a single-file preview that keeps routes in memory.
const router =
  import.meta.env.VITE_MEMORY_ROUTER === 'true' ? createMemoryRouter(routes) : createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
