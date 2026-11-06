import { useRef } from 'react'
import { Link } from 'react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ArtImage from '../components/ArtImage'
import { disciplineBySlug } from '../data/disciplines'
import { projectBySlug, workPath } from '../data/projects'

import { SplitText } from '../components/Motion'

// Works seen where they stand: [work slug, which photo of it]. Only works from the portfolio.
const sited = [
  ['runner-around-a-column', 0],
  ['dancers-relief-lobby-wall', 0],
  ['columns-of-climbing-figures', 0],
  ['carved-relief-wall-full-length', 0],
  ['sliced-figures-on-a-rock', 0],
  ['metal-leaf-wall-installation', 0],
  ['tall-standing-figure', 0],
  ['abstract-ring-form', 0],
]

// Works in their places, scrolled sideways at the reader's pace (no scroll hijacking).
export default function InPlace() {
  const track = useRef(null)
  const scroll = (dir) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="inplace-title" className="py-28 md:py-40">
      <div className="wrap flex flex-wrap items-end justify-between gap-6">
        <div>
          <SplitText as="h2" id="inplace-title" className="display text-[clamp(2.4rem,1.4rem+3.6vw,4.6rem)]" text="In place" />
          <p className="mt-4 max-w-[50ch] text-[1rem]">
            Works in the places they were made for: a lobby, a stairwell, a garden, a park.
          </p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll back" className="border border-ink/30 p-3 transition-colors hover:bg-ink hover:text-paper">
            <ChevronLeft size={18} strokeWidth={1.25} />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll forward" className="border border-ink/30 p-3 transition-colors hover:bg-ink hover:text-paper">
            <ChevronRight size={18} strokeWidth={1.25} />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] md:gap-8"
        aria-label="Works in place"
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
                    <ArtImage image={image} ratio={wide ? '16/10' : '4/5'} sizes="50vw" />
                  </div>
                </div>
                <p className="mt-4 text-[1.1rem] transition-colors duration-300 group-hover:text-geru">
                  <span className="label-title text-[1.14em]">{p.title}</span>
                </p>
                <p className="caption">{disciplineBySlug[p.discipline].name}</p>
              </Link>
            </li>
          )
        })}
      </ul>

    </section>
  )
}
