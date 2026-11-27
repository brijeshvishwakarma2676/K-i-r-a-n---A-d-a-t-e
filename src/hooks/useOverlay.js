import { useLocation, useNavigate } from 'react-router'
import useHydrated from './useHydrated'

/*
  An overlay (the mobile menu, search, the photo viewer) that behaves like a step in the browser's
  history, so the Back button, a phone's back gesture, Escape and the close button all close it,
  and Back never leaves the page while one is open.

  Opening adds a history entry for the same address, with the overlay's name in its history state
  (not in the address, so links and shared URLs stay clean). Closing steps back over it. Moving to
  another page from inside an overlay should *replace* that entry (`navigate(to, { replace: true })`,
  or `replace` on a <Link>), so Back from the new page returns to the page, not to the overlay.

    const viewer = useOverlay('photo')
    viewer.open           true while showing
    viewer.state          the history state, with anything passed to show/update ({ view: 2 })
    viewer.show({ view })  open (a new history step)
    viewer.update({ view }) change what it shows without a new step (next photo)
    viewer.hide()         close (one step back)

  Overlays start closed until the page has been taken over by the app, so the first render always
  matches the pre-rendered HTML; one left open in history when the page is reloaded is dropped
  (RootLayout).
*/
export default function useOverlay(name) {
  const location = useLocation()
  const navigate = useNavigate()
  const ready = useHydrated()

  const state = location.state || {}
  const here = { pathname: location.pathname, search: location.search, hash: location.hash }
  const open = ready && state.overlay === name

  const show = (extra = {}) => navigate(here, { state: { ...state, ...extra, overlay: name }, preventScrollReset: true })
  const update = (extra = {}) => navigate(here, { replace: true, state: { ...state, ...extra }, preventScrollReset: true })
  const hide = () => {
    // Step back over the entry show() added; if there is none (the very first entry), clear in place.
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate(here, { replace: true, state: { ...state, overlay: undefined }, preventScrollReset: true })
  }
  return { open, state, show, update, hide }
}
