import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigate, useNavigationType, useOutlet } from 'react-router'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useReducedMotion } from '../lib/media'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Analytics from '../components/Analytics'
import { LangProvider, useT } from '../i18n'
import { ScrollProgress, ease, easeInOut } from '../components/Motion'
import { scrollToTop, scrollToY } from '../lib/smoothScroll'
import { endFirstPage } from '../lib/reveal'
import { markHydrated } from '../hooks/useHydrated'
import { site } from '../data/site'
import { disciplineBySlug } from '../data/disciplines'
import { projectBySlug } from '../data/projects'

// True only while the very first page of a visit is being drawn: no curtain, no fade then.
let firstVisit = true
function useFirstPaint() {
  const first = useRef(firstVisit).current
  useEffect(() => {
    firstVisit = false
    endFirstPage() // from now on, new content plays its reveals (src/lib/reveal.js)
    markHydrated() // and pages read the address and history state from their first render
  }, [])
  return first
}

const PAGES = { works: 'Works', exhibitions: 'Exhibitions', material: 'Material and light', about: 'About', contact: 'Contact', portfolio: 'Portfolio' }

// The name shown on the curtain while the next page comes in.
function labelFor(pathname) {
  const [first, slug, work] = pathname.split('/').filter(Boolean)
  if (!first) return site.name
  if (first === 'works' && work) return projectBySlug[work]?.title || 'Works'
  if (first === 'works' && slug) return disciplineBySlug[slug]?.name || 'Works'
  return PAGES[first] || site.name
}

/*
  Where each page was left. Every step in the history has its own key; when a step is left its
  scroll position is kept here, and Back (or Forward) to that step returns to it once the page is
  drawn. A new page (a link, the menu, search) still opens at the top.
*/
const scrollFor = new Map()
let restoreTo = null
if (typeof window !== 'undefined') {
  // The site returns to the position itself, after the page change; the browser's own attempt
  // would move the old page first.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  // Kept for the visit, so a reload also returns to where the page was.
  try {
    for (const [k, y] of Object.entries(JSON.parse(sessionStorage.getItem('scroll') || '{}'))) scrollFor.set(k, y)
  } catch { /* private mode: positions last for this page only */ }
  const reload = performance.getEntriesByType?.('navigation')[0]?.type === 'reload'
  const key = history.state?.key
  if (reload && key && scrollFor.has(key)) restoreTo = scrollFor.get(key)
  addEventListener('pagehide', () => {
    const k = history.state?.key
    if (k) scrollFor.set(k, window.scrollY)
    try {
      sessionStorage.setItem('scroll', JSON.stringify(Object.fromEntries([...scrollFor].slice(-50))))
    } catch { /* ignore */ }
  })
}

function useScrollMemory() {
  const location = useLocation()
  const type = useNavigationType()
  const ref = useRef({ type, key: location.key })
  ref.current = { type, key: location.key }
  // Remember the position of the step being left (runs before the next page replaces it).
  useLayoutEffect(() => {
    const key = location.key
    return () => scrollFor.set(key, window.scrollY)
  }, [location.key])
  // Called when the old page has gone: decide where the new one starts.
  return () => {
    const { type: how, key } = ref.current
    if (how === 'POP' && scrollFor.has(key)) restoreTo = scrollFor.get(key)
    else {
      restoreTo = null
      scrollToTop()
    }
  }
}

// An overlay left open in the history (menu, search, viewer) is dropped when the page is reloaded.
function useDropStaleOverlay() {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (!location.state?.overlay) return
    const { overlay: _, ...rest } = location.state
    navigate({ pathname: location.pathname, search: location.search, hash: location.hash }, { replace: true, state: rest, preventScrollReset: true })
    // Only on the first load.
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export default function RootLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  const startPage = useScrollMemory()
  useDropStaleOverlay()

  return (
    <LangProvider>
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <ScrollProgress />
      <Analytics />
      <Header />
      <AnimatePresence mode="wait" onExitComplete={() => {
          startPage()
          // Move keyboard and screen reader focus to the new page's content.
          document.getElementById('main')?.focus({ preventScroll: true })
        }}>
        <div key={location.pathname}>
          <Page>{outlet}</Page>
          <Curtain />
        </div>
      </AnimatePresence>
    </MotionConfig>
    </LangProvider>
  )
}

function SkipLink() {
  const t = useT()
  return <a href="#main" className="skip-link">{t('Skip to content')}</a>
}

// One page and the footer. They fade in under the lifting curtain, except on the first visit.
function Page({ children }) {
  const first = useFirstPaint()
  // Back to a page: return to where it was left, once it is drawn, and again as late content
  // (images, sections drawn on approach) settles its height.
  useEffect(() => {
    const y = restoreTo
    if (y == null) return
    restoreTo = null
    scrollToY(y)
    // Images and sections drawn on approach can still change the page's height: keep returning to
    // the spot while it does, until it is reached and steady, the visitor scrolls, or 2.5 s pass.
    const ro = new ResizeObserver(() => {
      if (Math.abs(window.scrollY - y) > 4) scrollToY(y)
    })
    ro.observe(document.body)
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown']
    const stop = () => {
      ro.disconnect()
      clearTimeout(timer)
      events.forEach((e) => removeEventListener(e, stop))
    }
    const timer = setTimeout(stop, 2500)
    events.forEach((e) => addEventListener(e, stop, { passive: true }))
    return stop
  }, [])
  return (
    <motion.div
      initial={first ? false : { opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease, delay: 0.25 } }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease } }}
    >
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </motion.div>
  )
}

/*
  Between pages a basalt curtain rises from the floor, carrying the name of the page being
  opened, then lifts away. On the first visit it starts lifted; with reduced motion it is not drawn.
  The curtain is two panels scaled vertically (one rises on leaving, one lifts on arriving), which
  the GPU animates without repainting the screen.
*/
function Curtain() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const t = useT()
  const first = useFirstPaint()
  if (reduce) return null
  return (
    <div aria-hidden="true" className="curtain on-dark pointer-events-none fixed inset-0 z-[80] flex items-end text-bone">
      {/* Arriving: covers the screen, then lifts towards the top */}
      <motion.div
        className="absolute inset-0 bg-basalt"
        style={{ originY: 0 }}
        initial={first ? false : { scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.8, ease: easeInOut, delay: 0.1 } }}
      />
      {/* Leaving: rises from the floor to cover the screen */}
      <motion.div
        className="absolute inset-0 bg-basalt"
        style={{ originY: 1 }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.6, ease: easeInOut } }}
      />
      <motion.div
        className="wrap relative pb-[8svh]"
        initial={first ? false : { opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -30, transition: { duration: 0.5, ease, delay: 0.1 } }}
        exit={{ opacity: [0, 1], y: [40, 0], transition: { duration: 0.6, ease, delay: 0.1 } }}
      >
        <p className="caption">{t('Sculptor {name}', { name: t(site.name) })}</p>
        <p className="display mt-3 max-w-[14ch] text-[clamp(2.8rem,1.6rem+5vw,7rem)] font-light leading-[0.9]">
          {t(labelFor(pathname))}
        </p>
      </motion.div>
    </div>
  )
}
