/*
  Smooth scrolling: mouse wheels and trackpads glide to a stop instead of moving in steps. Touch
  screens keep the phone's own scrolling, and visitors who ask for less motion keep the browser's
  default. The page still scrolls the window, so everything that follows the scroll position
  (framer-motion's useScroll, the progress line, the header) works unchanged.

  Started by main.jsx once the page is up and the browser is idle, never during pre-rendering.
  Lenis (about 10 kB) downloads only on devices with a mouse or trackpad: on a phone it would do
  nothing, so phones never load it. An area that scrolls by itself takes `data-lenis-prevent`
  (the mobile menu's list), or `data-lenis-prevent-horizontal` for a strip that scrolls sideways.
*/
let lenis = null
let started = false

export function startSmoothScroll() {
  if (started || typeof window === 'undefined') return
  started = true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!window.matchMedia('(any-pointer: fine)').matches) return
  import('lenis')
    .then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, autoRaf: true })
      if (locks.size) lenis.stop()
    })
    .catch(() => {}) // the page simply keeps the browser's own scrolling
}

// Overlays (the mobile menu, the photo viewer) hold a lock; scrolling resumes when none remain.
const locks = new Set()
export function lockScroll(key, locked) {
  if (locked) locks.add(key)
  else locks.delete(key)
  if (!lenis) return
  if (locks.size) lenis.stop()
  else lenis.start()
}

// To the top at once, as a new page comes in; also ends any glide still under way.
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}
