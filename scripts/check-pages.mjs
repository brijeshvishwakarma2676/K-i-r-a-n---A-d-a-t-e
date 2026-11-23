/*
  Opens every page of the built site, in English and in Hindi, and checks that the browser takes
  over the pre-rendered page instead of redrawing it, with no errors or warnings in the console.

    npm run build && npx vite preview --port 4417     (in another terminal)
    PLAYWRIGHT=/path/to/node_modules/playwright/index.mjs node scripts/check-pages.mjs

  For the details of a mismatch, build with React's development checks first:
  NODE_ENV=development npm run build. `vite preview` serves /about (no trailing slash) with the
  home page's HTML, so pages are opened as /about/ here. Exits with 1 if any page has a problem.
  Needs Playwright with Chromium; PLAYWRIGHT may be left out when playwright is installed.
*/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const base = process.env.BASE || 'http://localhost:4417'
const { chromium } = await import(process.env.PLAYWRIGHT || 'playwright')

const xml = fs.readFileSync(path.join(root, 'dist', 'sitemap.xml'), 'utf8')
const paths = [...xml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/')
paths.push('/portfolio')

const browser = await chromium.launch()
let bad = 0
for (const lang of ['en', 'hi']) {
  const context = await browser.newContext({ viewport: { width: 1366, height: 800 } })
  if (lang !== 'en') await context.addInitScript((l) => localStorage.setItem('lang', l), lang)
  const page = await context.newPage()
  let messages = []
  page.on('pageerror', (e) => messages.push(`error: ${e.message}`))
  page.on('console', (m) => ['error', 'warning'].includes(m.type()) && messages.push(`${m.type()}: ${m.text().slice(0, 400)}`))
  for (const p of paths) {
    messages = []
    await page.goto(base + (p === '/' ? p : `${p}/`), { waitUntil: 'domcontentloaded' })
    // Mark the pre-rendered page's first element; if React redraws the page, the mark is gone.
    await page.evaluate(() => {
      const first = document.querySelector('#root > *')
      if (first) first.__fromHtml = true
    })
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(300)
    const r = await page.evaluate(() => ({ kept: !!document.querySelector('#root > *')?.__fromHtml, lang: document.documentElement.lang }))
    const wantLang = p === '/portfolio' ? 'en' : lang // the portfolio is English only
    if (!r.kept || r.lang !== wantLang || messages.length) {
      bad++
      console.log(`PROBLEM ${lang} ${p}: ${!r.kept ? 'redrawn; ' : ''}${r.lang !== wantLang ? `lang=${r.lang}; ` : ''}${messages.join(' | ')}`)
    }
  }
  await context.close()
}
await browser.close()
console.log(`${paths.length * 2} page loads, ${bad} with problems`)
process.exit(bad ? 1 : 0)
