// Prints the pictures used for link previews, as JSON, for scripts/make-share-images.py:
// the site's default picture and each work's cover, with the largest WebP file of each.
import { images } from '../src/data/images.js'
import { projects } from '../src/data/projects.js'

const largest = (id) => {
  const files = images[id].files
  return files[Math.max(...Object.keys(files).map(Number))]
}
const list = [
  { name: 'kiran-adate', file: largest('kiran/freedom-of-press-day'), focus: 0.5 },
  ...projects.map((p) => ({ name: p.slug, file: largest(p.cover.id), focus: 0.35 })),
]
console.log(JSON.stringify(list))
