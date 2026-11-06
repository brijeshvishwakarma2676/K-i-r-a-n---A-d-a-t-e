import { Link } from 'react-router'
import Seo from '../components/Seo'
import ArtImage from '../components/ArtImage'
import { ClipReveal, SplitText } from '../components/Motion'
import Invitation from '../sections/Invitation'
import { dateRange, exhibitions, statusOf, yearOf } from '../data/exhibitions'
import { projectBySlug, workPath } from '../data/projects'

const LABEL = { current: 'Now showing', upcoming: 'Upcoming' }

export default function Exhibitions() {
  const sorted = [...exhibitions].sort((a, b) => (a.start < b.start ? 1 : -1))
  const live = sorted.filter((x) => statusOf(x) !== 'past')
  const past = sorted.filter((x) => statusOf(x) === 'past')
  const years = [...new Set(past.map(yearOf))]

  return (
    <>
      <Seo title="Exhibitions" description="Solo and group exhibitions, sculpture camps and residencies." />

      <header className="wrap pb-10 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+6rem)]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <SplitText
            as="h1"
            className="display col-span-12 text-[clamp(3.6rem,1.8rem+8vw,10rem)] font-light leading-[0.84] md:col-span-8"
            text="Exhibitions"
            immediate
            delay={0.3}
          />
          <p className="col-span-12 max-w-[42ch] self-end text-[1.02rem] md:col-span-4">
            Solo and group exhibitions, sculpture camps and residencies.
          </p>
        </div>
      </header>

      {live.map((x) => (
        <section key={x.slug} aria-labelledby={`x-${x.slug}`} className="wrap py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            {x.image && (
              <div className="col-span-12 md:col-span-8">
                <ClipReveal>
                  <ArtImage image={x.image} ratio="16/10" priority sizes="(min-width: 768px) 66vw, 100vw" />
                </ClipReveal>
              </div>
            )}
            <div className={`col-span-12 self-end ${x.image ? 'md:col-span-4' : 'md:col-span-8'}`}>
              <p className="caption text-geru">{LABEL[statusOf(x)]}</p>
              <h2 id={`x-${x.slug}`} className="label-title mt-3 text-[clamp(2.4rem,1.6rem+2.6vw,4rem)] leading-[0.98]">{x.title}</h2>
              <p className="mt-5 text-[1.02rem]">
                {x.kind}
                <br />
                {x.venue}, {x.city}
                <br />
                <span className="text-ink-soft">{dateRange(x)}</span>
              </p>
              <p className="mt-6 max-w-[40ch] text-ink-soft">{x.text}</p>
              <ShownWorks x={x} />
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="past-title" className="wrap pb-24 pt-12 md:pb-32">
        <h2 id="past-title" className="caption border-b border-stone pb-4">Past</h2>
        {years.map((y) => (
          <div key={y} className="grid grid-cols-12 gap-x-6 border-b border-stone py-10 md:py-14">
            <p className="display col-span-12 text-[2.4rem] leading-none tabular-nums text-ink-soft md:col-span-2">{y}</p>
            <ul className="col-span-12 mt-6 space-y-12 md:col-span-10 md:mt-0">
              {past.filter((x) => yearOf(x) === y).map((x) => (
                <li key={x.slug} className="grid grid-cols-12 gap-x-6 gap-y-5">
                  <div className="col-span-12 md:col-span-6">
                    <p className="caption">{x.kind}</p>
                    <h3 className="label-title mt-1 text-[clamp(1.7rem,1.3rem+1.2vw,2.4rem)] leading-tight">{x.title}</h3>
                    <p className="mt-2 text-[0.98rem]">
                      {x.venue}, {x.city}. <span className="text-ink-soft">{dateRange(x)}</span>
                    </p>
                    <p className="mt-3 max-w-[48ch] text-[0.95rem] text-ink-soft">{x.text}</p>
                    <ShownWorks x={x} />
                  </div>
                  {x.image && (
                    <div className="col-span-8 sm:col-span-6 md:col-span-4 md:col-start-9">
                      <ArtImage image={x.image} ratio="4/3" sizes="(min-width: 768px) 25vw, 66vw" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <Invitation title="For exhibitions, loans and curatorial enquiries." />
    </>
  )
}

function ShownWorks({ x }) {
  const works = x.works.map((s) => projectBySlug[s]).filter(Boolean)
  if (!works.length) return null
  return (
    <p className="caption mt-4">
      Works shown:{' '}
      {works.map((p, i) => (
        <span key={p.slug}>
          {i > 0 && ', '}
          <Link to={workPath(p)} className="underline decoration-ink/25 underline-offset-4 hover:text-geru">
            {p.title}
          </Link>
        </span>
      ))}
    </p>
  )
}
