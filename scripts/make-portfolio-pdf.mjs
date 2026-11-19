/*
  Saves the portfolio page (/portfolio) as public/kiran-adate-portfolio.pdf, the file the site's
  "Download portfolio" links point to. Run after `npm run build` whenever works or texts change:

    PLAYWRIGHT=/path/to/node_modules/playwright/index.mjs node scripts/make-portfolio-pdf.mjs

  It needs Playwright with Chromium (`npx playwright install chromium`); PLAYWRIGHT may be left
  out when the playwright package is installed in this project. Then run `npm run build` again so
  the new PDF is copied into dist.
*/
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { chromium } = await import(process.env.PLAYWRIGHT || 'playwright')
const port = 4419
const server = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], { cwd: root, stdio: 'ignore' })
try {
  await new Promise((r) => setTimeout(r, 2500))
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(`http://localhost:${port}/portfolio/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  // Wait until every photograph has loaded.
  await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 30000 })
  const out = path.join(root, 'public', 'kiran-adate-portfolio.pdf')
  const raw = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-')), 'raw.pdf')
  await page.pdf({ path: raw, preferCSSPageSize: true, printBackground: true })
  await browser.close()
  // Chromium stores WebP photographs uncompressed; Ghostscript, when installed, recompresses them
  // as JPEG (about 27 MB down to 2 MB).
  const gs = spawnSync('gs', ['-q', '-sDEVICE=pdfwrite', '-dCompatibilityLevel=1.6', '-dPDFSETTINGS=/ebook',
    '-dColorImageResolution=200', '-dDownsampleColorImages=true', '-dAutoFilterColorImages=false',
    '-dColorImageFilter=/DCTEncode', '-dJPEGQ=82', '-dNOPAUSE', '-dBATCH', `-sOutputFile=${out}`, raw], { stdio: 'inherit' })
  if (gs.status === 0) fs.rmSync(raw)
  else {
    fs.copyFileSync(raw, out)
    console.warn('Ghostscript (gs) failed or is not installed: the PDF is not compressed.', gs.error?.message || '')
  }
  console.log(`Wrote ${path.relative(root, out)} (${(fs.statSync(out).size / 1e6).toFixed(1)} MB)`)
} finally {
  server.kill()
}
