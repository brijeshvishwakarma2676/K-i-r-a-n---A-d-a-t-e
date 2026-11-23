import { useLayoutEffect } from 'react'

/*
  Scroll reveals, done by the browser's CSS rather than a JavaScript animation per element.

  An element that should appear as it is scrolled to gets a reveal class (rv-rise, rv-clip, …;
  see "Reveals" in src/styles/global.css) and calls useReveal(ref). Its normal, finished look is
  the default, so the pre-rendered HTML, and a page without JavaScript, show everything.
  useReveal sets data-reveal="out" (the start of the reveal: hidden, lowered, covered) on elements
  that are not yet on screen, and one shared IntersectionObserver sets data-reveal="in" as each
  one arrives, which plays the CSS transition. React never sets data-reveal, so re-renders keep it.

  On the first page of a visit the content is already painted from the HTML: only what is below
  the screen is hidden, and that is decided by an observer (no layout measuring) so nothing on
  screen flickers. After that, on pages opened inside the site, everything starts hidden and
  plays in. Visitors who ask for less motion see everything at once.
*/
let revealer = null // shows elements as they come into view
let sorter = null // first page only: hides what is not on screen yet
let firstPage = true

function reveal() {
  revealer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.dataset.reveal = 'in'
        revealer.unobserve(e.target)
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  )
  return revealer
}

function sort() {
  sorter ??= new IntersectionObserver((entries) => {
    for (const e of entries) {
      sorter.unobserve(e.target)
      if (!e.isIntersecting) hide(e.target)
    }
  })
  return sorter
}

function hide(el) {
  el.dataset.reveal = 'out'
  reveal().observe(el)
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useReveal(ref, enabled = true) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!enabled || !el || typeof IntersectionObserver === 'undefined' || reduced()) return
    if (firstPage) sort().observe(el)
    else hide(el)
    return () => {
      sorter?.unobserve(el)
      revealer?.unobserve(el)
    }
  }, [ref, enabled])
}

// Called once the first page has been taken over (RootLayout).
export function endFirstPage() {
  firstPage = false
}
