import { useEffect, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ScrollProgress, ease, easeInOut } from '../components/Motion'
import { site } from '../data/site'
import { disciplineBySlug } from '../data/disciplines'
import { projectBySlug } from '../data/projects'

// True only while the very first page of a visit is being drawn: no curtain, no fade then.
let firstVisit = true
function useFirstPaint() {
  const first = useRef(firstVisit).current
  useEffect(() => {
    firstVisit = false
  }, [])
  return first
}

const PAGES = { works: 'Works', exhibitions: 'Exhibitions', about: 'About', contact: 'Contact' }

// The name shown on the curtain while the next page comes in.
function labelFor(pathname) {
  const [first, slug, work] = pathname.split('/').filter(Boolean)
  if (!first) return site.name
  if (first === 'works' && work) return projectBySlug[work]?.title || 'Works'
  if (first === 'works' && slug) return disciplineBySlug[slug]?.name || 'Works'
  return PAGES[first] || site.name
}

export default function RootLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <Header />
      <AnimatePresence mode="wait" onExitComplete={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
          // Move keyboard and screen reader focus to the new page's content.
          document.getElementById('main')?.focus({ preventScroll: true })
        }}>
        <div key={location.pathname}>
          <Page>{outlet}</Page>
          <Curtain />
        </div>
      </AnimatePresence>
    </MotionConfig>
  )
}

// One page and the footer. They fade in under the lifting curtain, except on the first visit.
function Page({ children }) {
  const first = useFirstPaint()
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
*/
function Curtain() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const first = useFirstPaint()
  if (reduce) return null
  return (
    <motion.div
      aria-hidden="true"
      className="on-dark pointer-events-none fixed inset-0 z-[80] flex items-end bg-basalt text-bone"
      initial={first ? false : { clipPath: 'inset(0% 0% 0% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.8, ease: easeInOut, delay: 0.1 } }}
      exit={{ clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'], transition: { duration: 0.6, ease: easeInOut } }}
    >
      <motion.div
        className="wrap pb-[8svh]"
        initial={first ? false : { opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -30, transition: { duration: 0.5, ease, delay: 0.1 } }}
        exit={{ opacity: [0, 1], y: [40, 0], transition: { duration: 0.6, ease, delay: 0.1 } }}
      >
        <p className="caption">{site.name}</p>
        <p className="display mt-3 max-w-[14ch] text-[clamp(2.8rem,1.6rem+5vw,7rem)] font-light leading-[0.9]">
          {labelFor(pathname)}
        </p>
      </motion.div>
    </motion.div>
  )
}
