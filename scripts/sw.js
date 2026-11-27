/*
  The site's service worker: keeps the site's files on the visitor's device, so that changing page,
  coming back, or opening the site again takes them from there instead of the network.

  This is a template. scripts/prerender.mjs fills in VERSION (changes with every build) and CODE
  (every script, style sheet and first-paint font of this build) and writes it to dist/sw.js.

    Pages (HTML)              from the network first, so a new version is always seen; the device's
                              copy is used only when there is no connection.
    Code, fonts (/assets/)    left to the browser's own cache while online, which is quickest (the
                              names change with every build, so the host lets browsers keep them a
                              year, public/_headers); a copy is stored when the site is first opened
                              and used when there is no connection.
    Photographs (/img/)       left to the browser's own cache (also kept a year).
    Clips (/ambient/)         stored whole the first time each plays, then played from the device,
                              answering the player's "part of the file" requests from the stored copy
                              (browsers otherwise fetch a clip again in parts).
    Important media           the hero's photographs and the home page's clips are fetched quietly
                              after the first page has opened (the page sends the list): photographs
                              into the browser's cache, clips into the stored copies. Never on a data
                              saver or a 2G connection.

  To switch it off on the live site: replace dist/sw.js with
    self.addEventListener('install', () => self.skipWaiting())
    self.addEventListener('activate', () => self.registration.unregister())
*/
const VERSION = '__VERSION__'
const CODE = __CODE__
const SHELL = `code-${VERSION}`
const PAGES = `pages-${VERSION}`
const MEDIA = 'media-v1' // kept across builds: photographs and clips do not change with the code
const MEDIA_LIMIT = 40 // clips; the oldest go first beyond this

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(SHELL).then((cache) => Promise.allSettled(CODE.map((url) => cache.add(url)))),
      // The home page, so the site opens even without a connection (pages are otherwise stored as
      // they are visited).
      caches.open(PAGES).then((cache) => cache.add('/')).catch(() => {}),
    ]).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => ![SHELL, PAGES, MEDIA].includes(k)).map((k) => caches.delete(k))))
      // The browser asks the network for a page while this worker is still starting up.
      .then(() => self.registration.navigationPreload?.enable())
      .then(() => self.clients.claim()),
  )
})

// The page sends { type: 'warm', urls } once it has opened: fetch those in the background.
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'warm' || !Array.isArray(event.data.urls)) return
  const c = self.navigator.connection
  if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))) return
  event.waitUntil(
    caches.open(MEDIA).then(async (cache) => {
      for (const url of event.data.urls) {
        const clip = url.startsWith('/ambient/') && url.endsWith('.mp4')
        if (clip && (await cache.match(url, { ignoreVary: true }))) continue
        try {
          const res = await fetch(url, { priority: 'low' }) // fills the browser's cache on the way
          if (clip && res.ok) await cache.put(url, res)
        } catch {
          return // offline or interrupted: try again on the next visit
        }
      }
      await trim(cache)
    }),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return
  if (req.mode === 'navigate') return event.respondWith(page(req, event.preloadResponse))
  // Online, code and photographs come from the browser's own cache or the network, untouched.
  if (url.pathname.startsWith('/assets/')) {
    if (self.navigator.onLine !== false) return
    return event.respondWith(stored(req, SHELL))
  }
  if (url.pathname.startsWith('/ambient/') && url.pathname.endsWith('.mp4')) return event.respondWith(clip(req, url))
})

// Pages: the network first (with a short wait), the stored copy only without a connection.
async function page(req, preloaded) {
  const cache = await caches.open(PAGES)
  try {
    const res = (await preloaded) || (await fetch(req))
    if (res.ok && res.type === 'basic') cache.put(req, res.clone())
    return res
  } catch {
    return (await cache.match(req, { ignoreSearch: true, ignoreVary: true })) || (await cache.match('/', { ignoreVary: true })) || Response.error()
  }
}

// Files whose names change with their content: the stored copy, else fetch and store.
async function stored(req, name) {
  const cache = await caches.open(name)
  // ignoreVary: a stored copy is the same file whichever page or font loader asks for it.
  const hit = await cache.match(req, { ignoreVary: true })
  if (hit) return hit
  const res = await fetch(req)
  if (res.ok && res.type === 'basic') await cache.put(req, res.clone())
  return res
}

// Clips: stored whole, then each "bytes=a-b" request from the player is answered from the copy.
async function clip(req, url) {
  const cache = await caches.open(MEDIA)
  const key = url.origin + url.pathname
  let full = await cache.match(key, { ignoreVary: true })
  if (!full) {
    const res = await fetch(key)
    if (!res.ok) return fetch(req)
    await cache.put(key, res.clone())
    trim(cache)
    full = res
  }
  const range = req.headers.get('range')
  if (!range) return full
  const body = await full.arrayBuffer()
  const size = body.byteLength
  const m = /bytes=(\d*)-(\d*)/.exec(range)
  let start = m && m[1] ? Number(m[1]) : 0
  let end = m && m[2] ? Number(m[2]) : size - 1
  if (m && !m[1] && m[2]) {
    start = Math.max(0, size - Number(m[2]))
    end = size - 1
  }
  end = Math.min(end, size - 1)
  if (start > end || start >= size) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } })
  return new Response(body.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': full.headers.get('Content-Type') || 'video/mp4',
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes',
    },
  })
}

async function trim(cache) {
  const keys = await cache.keys()
  for (const k of keys.slice(0, Math.max(0, keys.length - MEDIA_LIMIT))) await cache.delete(k)
}
