import { useEffect } from 'react'
import { lockScroll } from '../lib/smoothScroll'

// Prevents the page behind an overlay (menu, lightbox) from scrolling, smooth scrolling included.
export default function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return
    const key = Symbol('overlay')
    const { overflow, paddingRight } = document.body.style
    const bar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (bar > 0) document.body.style.paddingRight = `${bar}px`
    lockScroll(key, true)
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      lockScroll(key, false)
    }
  }, [locked])
}
