import { useRef } from 'react'
import { Link } from 'react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ArtImage from '../components/ArtImage'
import { disciplineBySlug } from '../data/disciplines'
import { projectBySlug, workPath } from '../data/projects'
import { artist } from '../data/site'
import { Marquee, Reveal } from '../components/Motion'
import { SplitText } from '../components/Motion'

// Work in its place: [work slug, which photo of it]. Photos chosen for showing the setting.
const sited = [
  ['dancers-relief-lobby-wall', 0],
  ['illuminated-hand-on-a-building', 0],
  ['rock-waterfall', 0],
  ['3d-facade-panels', 0],
  ['eagle-and-sword-landmark', 0],
  ['sphere-fountain', 1],
  ['jali-gate-and-boundary-screen', 0],
  ['lattice-pergola', 0],
]

// Executed work, scrolled sideways at the reader's pace (no scroll hijacking), then the names
// of those who commissioned it.
const names = artist.commissions.map((c) => c.split(',')[0])
const half = Math.ceil(names.length / 2)

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
            Work made for one place: a lobby wall, a building front, a garden, an entrance. Indoor and outdoor, fixed on site by the studio’s own team.
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
          if (!p) return null
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

      <div className="mt-28 md:mt-40">
        <Reveal className="wrap">
          <h3 className="display text-[clamp(1.8rem,1.3rem+1.4vw,2.6rem)] leading-tight">Commissioned by</h3>
          <p className="caption mt-3">A selection, from the studio’s record</p>
        </Reveal>
        {/* The names drift past in two bands; the plain list below is what assistive technology reads. */}
        <ul className="sr-only">
          {names.map((c) => <li key={c}>{c}</li>)}
        </ul>
        <div className="mt-12 space-y-3 border-y border-stone py-8 md:space-y-5 md:py-10">
          {[names.slice(0, half), names.slice(half)].map((row, r) => (
            <Marquee key={r} seconds={70 + r * 12} reverse={r === 1}>
              {row.map((c) => (
                <span key={c} className="display flex items-baseline whitespace-nowrap text-[clamp(1.6rem,1.1rem+1.8vw,3rem)] leading-tight transition-colors duration-300 hover:text-geru">
                  {c}
                  <span className="mx-6 text-[0.6em] text-geru md:mx-10">✦</span>
                </span>
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  )
}
