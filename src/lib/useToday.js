import { useSyncExternalStore } from 'react'

/*
  Today's date as YYYY-MM-DD, for anything that changes with the date (an exhibition's status, the
  year in the footer). Pages are pre-rendered at build time, so while React takes over a page it
  uses the build date (__BUILD_DATE__, set in vite.config.js) to match the HTML, then the real date.
*/
const build = typeof __BUILD_DATE__ === 'string' ? __BUILD_DATE__ : null
const now = () => new Date().toISOString().slice(0, 10)
const never = () => () => {}

export const useToday = () => useSyncExternalStore(never, now, () => build ?? now())
