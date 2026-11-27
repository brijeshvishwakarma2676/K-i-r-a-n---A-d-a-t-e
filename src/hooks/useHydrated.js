import { useEffect, useState } from 'react'

/*
  False only during the very first render of a visit, while React takes over the pre-rendered
  page: anything that depends on the address's ?query, the browser's history state or this tab's
  storage must match the pre-rendered HTML then, and can show itself one moment later. On every
  later page the app draws from scratch, so it is true from the first render (no flash).
*/
let hydrated = false
export const markHydrated = () => {
  hydrated = true
}

export default function useHydrated() {
  const [ready, setReady] = useState(hydrated)
  useEffect(() => setReady(true), [])
  return ready
}
