import { images } from '../data/images'
import { projectBySlug } from '../data/projects'
import { pick } from '../components/AmbientVideo'
import { heroSlug } from '../sections/Hero'

/*
  The site's service worker (scripts/sw.js) keeps files on the visitor's device. Once the first
  page has opened, it is sent this list of what will be wanted next, to fetch quietly in the
  background: the hero's photographs of the work's life (scene 02 starts after 8 seconds) and the
  home page's clips with their stills. Each is the exact file this device will ask for: the photo
  width the browser will choose for its frame, in AVIF, and the clip in AV1 where it plays it.
*/
const HOME_CLIPS = ['home-dust', 'home-lobby', 'home-block', 'home-water', 'hand-on-stone']

function photoFor(id, share) {
  const meta = images[id]
  if (!meta) return null
  const want = innerWidth * share * (window.devicePixelRatio || 1)
  const widths = Object.keys(meta.files).map(Number).sort((a, b) => a - b)
  const w = widths.find((x) => x >= want) || widths[widths.length - 1]
  return meta.files[w].replace(/\.webp$/, '.avif')
}

export function importantMedia() {
  const work = projectBySlug[heroSlug]
  const share = innerWidth >= 768 ? 0.3 : 0.7 // the hero frame's `sizes`
  const stages = [...(work?.ownMaking ? work.making : []).map((m) => m.id), work?.cover?.id].filter(Boolean)
  return [
    ...stages.map((id) => photoFor(id, share)),
    ...HOME_CLIPS.flatMap((n) => [`/ambient/${n}.webp`, pick(`/ambient/${n}.mp4`)]),
  ].filter(Boolean)
}
