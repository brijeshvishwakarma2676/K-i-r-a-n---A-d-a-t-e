import { useRef } from 'react'
import { Link } from 'react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ArtImage from '../components/ArtImage'
import AmbientVideo from '../components/AmbientVideo'
import { clip } from '../components/StudyFrames'
import { disciplineBySlug } from '../data/disciplines'
import { projectBySlug, workPath } from '../data/projects'

import { SplitText } from '../components/Motion'
import { useT } from '../i18n'

// Works seen where they stand: [work slug, which photo of it]. Only works from the portfolio, and
// none already shown in Selected works above.
const sited = [
  ['ribbon-in-a-reception-lobby', 0],
  ['runner-around-a-column', 0],
  ['dancers-relief-lobby-wall', 0],
  ['columns-of-climbing-figures', 0],
  ['carved-relief-wall-full-length', 0],
  ['polished-oval-with-an-opening', 0],
  ['metal-leaf-wall-installation', 0],
  ['tall-standing-figure', 0],
]

// Works in their places, scrolled sideways at the reader's pace (no scroll hijacking). The heading
// stands over an empty lobby with the morning sun moving across it: a generated mood clip
// (VIDEO-GENERATION.md, H2), home page only, showing a place waiting for a work, never a work.
export default function InPlace() {
  const t = useT()
  const track = useRef(null)
  const scroll = (dir) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="inplace-title" className="pb-28 md:pb-40">
      <div className="relative isolate overflow-hidden">
      <AmbientVideo {...clip('home-lobby')} className="absolute inset-0 -z-20 h-full w-full" style={{ objectPosition: '50% 60%' }} />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-limestone)_0%,color-mix(in_srgb,var(--color-limestone)_70%,transparent)_40%,color-mix(in_srgb,var(--color-limestone)_5%,transparent)_100%)]" />
      <div className="wrap flex min-h-[42svh] flex-wrap items-end justify-between gap-6 pt-36 md:min-h-[54svh] md:pt-44">
        <div>
          <SplitText as="h2" id="inplace-title" className="display text-[clamp(2.4rem,1.4rem+3.6vw,4.6rem)]" text="In place" />
          <p className="mt-4 max-w-[50ch] text-[1rem]">
            {t('A sculpture is finished only when it stands in its place: a lobby, a stairwell, a garden, a park.')}
          </p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => scroll(-1)} aria-label={t('Scroll back')} className="border border-ink/30 p-3 transition-colors hover:bg-ink hover:text-paper">
            <ChevronLeft size={18} strokeWidth={1.25} />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label={t('Scroll forward')} className="border border-ink/30 p-3 transition-colors hover:bg-ink hover:text-paper">
            <ChevronRight size={18} strokeWidth={1.25} />
          </button>
        </div>
      </div>
      </div>

      <ul
        ref={track}
        data-lenis-prevent-horizontal
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] md:gap-8"
        aria-label={t('Works in place')}
      >
        {sited.map(([slug, view], i) => {
          const p = projectBySlug[slug]
          if (!p || p.listed === false) return null
          const image = [p.cover, ...p.gallery][view] || p.cover
          const wide = i % 3 === 1
          return (
            <li key={slug} className={`shrink-0 snap-start ${wide ? 'w-[86vw] md:w-[52vw]' : 'w-[72vw] md:w-[30vw]'}`}>
              <Link to={workPath(p)} className="group block">
                <div className="sheen overflow-hidden">
                  <div className="transition-transform duration-[1.2s] ease-gallery group-hover:scale-[1.045]">
                    <ArtImage image={image} ratio={wide ? '16/10' : '4/5'} sizes={wide ? '(min-width: 768px) 52vw, 86vw' : '(min-width: 768px) 30vw, 72vw'} />
                  </div>
                </div>
                <p className="mt-4 text-[1.1rem] transition-colors duration-300 group-hover:text-geru">
                  <span className="label-title text-[1.14em]">{t(p.title)}</span>
                </p>
                <p className="caption">{t(disciplineBySlug[p.discipline].name)}</p>
              </Link>
            </li>
          )
        })}
      </ul>

    </section>
  )
}
