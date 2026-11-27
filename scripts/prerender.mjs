/*
  Pre-renders every page to its own HTML file after the build, and writes sitemap.xml.

    npm run build     (runs vite build, the server build, then this script)

  Each page gets its full content, its own <title>, description, canonical link, link-preview tags
  and structured data, so search engines and WhatsApp/LinkedIn previews see the real page. In the
  browser the app then takes over as usual (src/main.jsx).
*/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const server = path.join(root, 'dist-ssr')
const entry = fs.readdirSync(server).find((f) => /^entry-server\.m?js$/.test(f))
const { render, paths, shortLinks } = await import(pathToFileURL(path.join(server, entry)).href)

// Every WebP photograph needs its AVIF copy, which browsers that read AVIF are given instead.
const webps = fs.readdirSync(path.join(dist, 'img'), { recursive: true }).filter((f) => f.endsWith('.webp'))
const noAvif = webps.filter((f) => !fs.existsSync(path.join(dist, 'img', f.replace(/\.webp$/, '.avif'))))
if (noAvif.length) throw new Error(`${noAvif.length} images have no AVIF copy (e.g. ${noAvif[0]}). Run: sh scripts/make-avif.sh`)

// Fetch the three fonts used on first paint (Latin: the display face upright and italic, and the
// text face) with the page instead of after the CSS.
const fonts = fs.readdirSync(path.join(dist, 'assets')).filter((f) => /^(cormorant-garamond-latin-wght-(normal|italic)|archivo-latin-wdth-normal)-.*\.woff2$/.test(f))
const preload = fonts.map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`).join('\n    ')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8').replace('<link rel="stylesheet"', `${preload}\n    <link rel="stylesheet"`)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function page(html, head) {
  const tags = [
    `<title>${esc(head.title)}</title>`,
    `<meta name="description" content="${esc(head.description)}" />`,
    `<link rel="canonical" href="${esc(head.url)}" />`,
    `<meta property="og:title" content="${esc(head.title)}" />`,
    `<meta property="og:description" content="${esc(head.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${esc(head.url)}" />`,
    `<meta property="og:image" content="${esc(head.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(head.imageAlt)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:site_name" content="Sculptor Kiran Adate" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(head.title)}" />`,
    `<meta name="twitter:description" content="${esc(head.description)}" />`,
    `<meta name="twitter:image" content="${esc(head.image)}" />`,
    head.noindex && `<meta name="robots" content="noindex" />`,
    head.jsonLd && `<script type="application/ld+json" id="json-ld">${JSON.stringify(head.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean).join('\n    ')
  return template
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<meta name="description"[^>]*>\s*/, '')
    .replace('</head>', `  ${tags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
}

const urls = []
for (const p of paths) {
  const { html, head, status } = await render(p)
  if (status !== 200) throw new Error(`${p} rendered with status ${status}`)
  const share = new URL(head.image).pathname
  if (share.startsWith('/share/') && !fs.existsSync(path.join(dist, share)))
    throw new Error(`${p}: no link-preview picture ${share}. Run: python3 -I scripts/make-share-images.py`)
  const ld = [].concat(head.jsonLd || [])
  const filmLd = ld.find((x) => x.video)
  const video = filmLd && new URL(filmLd.video.contentUrl).pathname
  if (video && !fs.existsSync(path.join(dist, video)))
    throw new Error(`${p}: the film ${video} is not in public/. Run: sh scripts/make-film.sh <footage> <name>`)
  const file = p === '/' ? path.join(dist, 'index.html') : path.join(dist, p, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page(html, head))
  // A work's photographs go into the sitemap with its page, for image search.
  const artwork = ld.find((x) => x['@type'] === 'VisualArtwork')
  urls.push({ loc: head.url, images: artwork ? [].concat(artwork.image || []) : [] })
}

// The not-found page, for the host to serve on unknown addresses.
const missing = await render('/this-page-does-not-exist')
fs.writeFileSync(path.join(dist, '404.html'), page(missing.html, missing.head))

// No <lastmod>: a build date on every page would tell search engines that everything changed on
// every build, and they learn to ignore it. Work pages list their photographs (image sitemap).
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls
    .map((u) => `  <url><loc>${esc(u.loc)}</loc>${u.images.map((i) => `<image:image><image:loc>${esc(i)}</image:loc></image:image>`).join('')}</url>`)
    .join('\n')}\n</urlset>\n`,
)
const origin = new URL(urls[0].loc).origin

// Short links (src/data/shortLinks.js) as permanent redirects the host answers before any page
// loads: /freedom → /works/sculpture/freedom. Both the lower- and upper-case spelling of each.
const redirects = Object.entries(shortLinks).flatMap(([k, to]) => [...new Set([k, k.toUpperCase()])].map((key) => `/${key} ${to} 301`))
const own = fs.existsSync(path.join(root, 'public', '_redirects')) ? fs.readFileSync(path.join(root, 'public', '_redirects'), 'utf8').trimEnd() : ''
fs.writeFileSync(path.join(dist, '_redirects'), `${own}\n\n# Short links, written by scripts/prerender.mjs\n${redirects.join('\n')}\n`)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
// The service worker (scripts/sw.js): every script and style sheet of this build, and the fonts of
// the first paint, are stored on the visitor's device when the site is first opened. The language
// dictionaries (only for Hindi and Marathi readers) are stored when first used instead.
const assets = fs.readdirSync(path.join(dist, 'assets'))
const code = assets
  .filter((f) => (/\.(js|css)$/.test(f) && !/^(hi|mr)-/.test(f)) || /^(cormorant-garamond-latin-wght-(normal|italic)|archivo-latin-wdth-normal)-.*\.woff2$/.test(f))
  .map((f) => `/assets/${f}`)
const version = (await import('node:crypto')).createHash('sha1').update(assets.sort().join()).digest('hex').slice(0, 10)
fs.writeFileSync(
  path.join(dist, 'sw.js'),
  fs.readFileSync(path.join(root, 'scripts', 'sw.js'), 'utf8').replace("'__VERSION__'", JSON.stringify(version)).replace('__CODE__', JSON.stringify(code)),
)

fs.rmSync(server, { recursive: true, force: true })
console.log(`Pre-rendered ${urls.length} pages, 404.html, sitemap.xml, ${Object.keys(shortLinks).length} short links, and sw.js (${code.length} files)`)
