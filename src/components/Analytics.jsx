import { useEffect } from 'react'
import { site } from '../data/site'

/*
  Loads a cookie-free visitor counter once, after the page has loaded, when one is configured in
  site.analytics (src/data/site.js). Both services count page changes in this single-page app by
  themselves (they follow the browser's history).
*/
export default function Analytics() {
  useEffect(() => {
    const { cloudflareToken, plausibleDomain } = site.analytics || {}
    if (!cloudflareToken && !plausibleDomain) return
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return
    const s = document.createElement('script')
    s.defer = true
    if (cloudflareToken) {
      s.src = 'https://static.cloudflareinsights.com/beacon.min.js'
      s.dataset.cfBeacon = JSON.stringify({ token: cloudflareToken, spa: true })
    } else {
      s.src = 'https://plausible.io/js/script.js'
      s.dataset.domain = plausibleDomain
    }
    document.head.appendChild(s)
  }, [])
  return null
}
