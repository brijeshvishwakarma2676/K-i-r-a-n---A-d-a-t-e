import { useEffect } from 'react'

// Keeps keyboard focus inside an open dialog and returns it to the trigger on close.
export default function useFocusTrap(ref, active, onClose) {
  useEffect(() => {
    if (!active || !ref.current) return
    const previous = document.activeElement
    const node = ref.current
    const focusables = () =>
      [...node.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    const first = focusables()[0]
    first?.focus({ preventScroll: true })

    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose?.()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (!items.length) return
      const start = items[0]
      const end = items[items.length - 1]
      if (e.shiftKey && document.activeElement === start) {
        e.preventDefault()
        end.focus()
      } else if (!e.shiftKey && document.activeElement === end) {
        e.preventDefault()
        start.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true })
    }
  }, [ref, active, onClose])
}
