import { disciplines } from './disciplines'
import { projects, workPath } from './projects'

/*
  Short links: one word after the domain that leads straight to a work or a body of work, easy to
  say on the phone, type from a card or print under a photograph.

    /freedom        →  /works/sculpture/freedom          (every work's own name)
    /IFA-SC-041     →  /works/sculpture/sculpture-of-hawker   (the studio's catalogue codes)
    /sculpture      →  /works/sculpture                   (each body of work)
    /hawker         →  /works/sculpture/sculpture-of-hawker   (a few names people actually say)

  Letter case does not matter. In the browser they are followed by the router (src/routes.jsx);
  on the live site the host answers them with a permanent redirect before any page loads
  (scripts/prerender.mjs writes them into dist/_redirects).
*/

// Familiar names for works whose page name is long. Add more as people ask for them.
const ALIASES = {
  hawker: 'sculpture-of-hawker',
  'freedom-of-press': 'statue-of-freedom-of-press',
  gandhi: 'gandhi-statue',
  saraswati: 'saraswati-with-veena',
}

// The site's own top-level pages: a short link may never take one of these names.
const PAGES = ['works', 'exhibitions', 'material', 'about', 'contact', 'portfolio']

const table = {}
function add(key, to) {
  const k = key.toLowerCase()
  if (PAGES.includes(k)) throw new Error(`Short link /${key} would hide the ${k} page`)
  if (table[k] && table[k] !== to) throw new Error(`Short link /${key} points to both ${table[k]} and ${to}`)
  table[k] = to
}

for (const d of disciplines) add(d.slug, `/works/${d.slug}`)
for (const p of projects) {
  add(p.slug, workPath(p))
  for (const code of new Set([p.code, ...(p.codes || [])].filter(Boolean))) add(code, workPath(p))
}
const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))
for (const [alias, slug] of Object.entries(ALIASES)) {
  if (!bySlug[slug]) throw new Error(`Short link /${alias}: no work ${slug}`)
  add(alias, workPath(bySlug[slug]))
}

export const shortLinks = table
export const shortLinkFor = (key) => table[String(key).toLowerCase()] || null
