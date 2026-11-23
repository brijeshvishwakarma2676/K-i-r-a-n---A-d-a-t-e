import { lazy, Suspense } from 'react'
import { useHydrated } from '../lib/media'

/*
  The generated placeholder plates (Plate.jsx, about 60 kB) download only on pages that show one,
  not with every page of the site. They are drawn once the page has started: the pre-rendered
  HTML shows the plate's frame in its stone colour, and the drawing follows. (Pre-rendering
  cannot wait for a file to download, so drawing them in the HTML would make React redraw them.)
*/
const Plate = lazy(() => import('./Plate'))

export default function LazyPlate(props) {
  const hydrated = useHydrated()
  if (!hydrated) return null
  return (
    <Suspense fallback={null}>
      <Plate {...props} />
    </Suspense>
  )
}
