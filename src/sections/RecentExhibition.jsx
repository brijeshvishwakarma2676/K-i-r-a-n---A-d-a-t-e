import { Link } from 'react-router'
import ArtImage from '../components/ArtImage'
import { ClipReveal, SplitText } from '../components/Motion'
import { dateRange, featuredExhibition, statusOf } from '../data/exhibitions'
import { projectBySlug, workPath } from '../data/projects'

const LABEL = { current: 'Now showing', upcoming: 'Opening soon', past: 'Exhibition' }

// The current exhibition, or the next one, or the most recent. Chosen from today's date.
export default function RecentExhibition() {
  const x = featuredExhibition()
  if (!x) return null
  const shown = x.works.map((s) => projectBySlug[s]).filter(Boolean)

  return (
    <section aria-labelledby="exhibition-title" className="wrap py-28 md:py-40">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-7">
          {x.image && (
            <ClipReveal>
              <ArtImage image={x.image} ratio="natural" sizes="(min-width: 768px) 58vw, 100vw" />
            </ClipReveal>
          )}
        </div>
        <div className="col-span-12 flex flex-col md:col-span-4 md:col-start-9">
          <p className="caption">{LABEL[statusOf(x)]}</p>
          <SplitText as="h2" id="exhibition-title" className="label-title mt-4 text-[clamp(2.4rem,1.6rem+2.6vw,4rem)] leading-[0.98]" text={x.title} />
          <p className="mt-5 text-[1.02rem]">
            {x.kind}
            <br />
            {x.venue}, {x.city}
            <br />
            <span className="text-ink-soft">{dateRange(x)}</span>
          </p>
          <p className="mt-6 max-w-[40ch] text-[1rem] text-ink-soft">{x.text}</p>
          {shown.length > 0 && (
            <div className="mt-8">
              <h3 className="caption">Works in the exhibition</h3>
              <ul className="mt-2 text-[0.98rem]">
                {shown.map((p) => (
                  <li key={p.slug} className="border-b border-stone py-2">
                    <Link to={workPath(p)} className="hover:text-geru">
                      <span className="label-title text-[1.14em]">{p.title}</span>, {p.year}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link to="/exhibitions" className="text-link mt-10 self-start text-[0.95rem]">All exhibitions</Link>
        </div>
      </div>
    </section>
  )
}
