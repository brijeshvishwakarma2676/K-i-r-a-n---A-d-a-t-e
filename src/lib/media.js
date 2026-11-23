import { useSyncExternalStore } from 'react'

/*
  Browser facts that the pre-rendered HTML cannot know (screen width, the visitor's motion setting).
  While React takes over a pre-rendered page it must draw exactly what the HTML shows, so these
  hooks answer `server` during that first render and the real value straight after. Reading
  window.matchMedia inside useState instead would make the first render differ from the HTML.
*/
export function useMedia(query, server = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => server,
  )
}

export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')

// False on the server and while React takes over the pre-rendered page; true from then on.
const never = () => () => {}
export const useHydrated = () => useSyncExternalStore(never, () => true, () => false)

// Outside React (event handlers, effects).
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
