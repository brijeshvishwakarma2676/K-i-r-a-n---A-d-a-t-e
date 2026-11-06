import { useState } from 'react'
import { Link, useParams } from 'react-router'
import Seo from '../components/Seo'
import ArtImage from '../components/ArtImage'
import Masonry from '../components/Masonry'
import { ClipReveal, Parallax, SplitText } from '../components/Motion'
import Invitation from '../sections/Invitation'
import Tone from '../components/Tone'
import NotFound from './NotFound'
import { disciplineBySlug, disciplines } from '../data/disciplines'
import { projectsFor } from '../data/projects'

/*
  One template, four art directions, one per body of work. `discipline.variant` chooses the
  opening composition and the feature block:
    monument  - sculpture: tall plate beside the title, then the work in its setting
    landscape - vessels: wide garden plate with the title set into it, then a garden view
    relief    - reliefs: a dark room with the wall raked by light, then relief and field
    drawing   - architectural works: a drawing-sheet grid and the vocabulary of forms
*/
export default function Discipline() {
  const { slug } = useParams()
  const d = disciplineBySlug[slug]
  if (!d) return <NotFound />
  const list = projectsFor(d.slug)

  const Opening = { monument: MonumentOpening, landscape: LandscapeOpening, relief: ReliefOpening, drawing: DrawingOpening }[d.variant]
  const Feature = { monument: MonumentFeature, landscape: LandscapeFeature, relief: ReliefFeature, drawing: DrawingFeature }[d.variant]

  return (
    <div style={{ '--accent': d.accent }}>
      <Seo title={d.name} description={d.intro} />
      <Tone name="light">
        <Opening d={d} />
        <Body d={d} />
      </Tone>
      <Tone name="night"><Feature d={d} /></Tone>
      <Tone name="clay"><WorksGrid d={d} list={list} /></Tone>
      <Tone name="light">
        <OtherDisciplines current={d.slug} />
        <Invitation />
      </Tone>
    </div>
  )
}

function Title({ d, className = '' }) {
  return (
    <SplitText
      as="h1"
      className={`display text-[clamp(3.2rem,1.6rem+6vw,8rem)] font-light leading-[0.88] ${className}`}
      text={d.name}
      immediate
      delay={0.3}
    />
  )
}

function Crumb({ d, dark }) {
  return (
    <nav aria-label="Breadcrumb" className="caption mb-6">
      <Link to="/works" className={`hover:underline ${dark ? 'text-basalt-soft' : ''}`}>Works</Link>
      <span aria-hidden="true" className="mx-2">/</span>
      <span aria-current="page">{d.shortName}</span>
    </nav>
  )
}

/* ---------------------------------------------------------------- openings */

function MonumentOpening({ d }) {
  return (
    <header className="wrap grid grid-cols-12 gap-x-6 gap-y-12 pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+4rem)]">
      <div className="col-span-12 flex flex-col justify-end md:col-span-5 md:pb-6">
        <Crumb d={d} />
        <Title d={d} />
        <p className="display mt-8 text-[1.6rem] italic leading-snug text-[var(--accent)]">{d.headline}</p>
        <p className="mt-6 max-w-[44ch] text-[1.02rem]">{d.intro}</p>
      </div>
      <div className="col-span-12 md:col-span-6 md:col-start-7">
        <ClipReveal>
          <ArtImage image={d.cover} ratio="4/5" priority sizes="50vw" />
        </ClipReveal>
      </div>
    </header>
  )
}

function LandscapeOpening({ d }) {
  return (
    <header className="pt-[calc(var(--header-h)+env(safe-area-inset-top,0px))]">
      <div className="relative">
        <ClipReveal>
          <Parallax amount={4} className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]">
            <ArtImage image={d.cover} fill priority sizes="100vw" />
          </Parallax>
        </ClipReveal>
        <div className="wrap relative -mt-28 sm:-mt-40 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
          <div className="max-w-[40rem] bg-limestone px-6 pb-8 pt-8 sm:px-10 sm:pt-10">
            <Crumb d={d} />
            <Title d={d} />
            <p className="display mt-6 text-[1.5rem] italic leading-snug text-[var(--accent)]">{d.headline}</p>
          </div>
        </div>
      </div>
      <div className="wrap grid grid-cols-12 gap-x-6 pt-10 lg:pt-16">
        <p className="col-span-12 max-w-[48ch] text-[1.05rem] md:col-span-6 md:col-start-1 lg:col-start-2 lg:px-10">{d.intro}</p>
      </div>
    </header>
  )
}

function ReliefOpening({ d }) {
  return (
    <header className="on-dark bg-basalt text-bone">
      <div className="wrap pb-14 pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <Crumb d={d} dark />
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <Title d={d} className="col-span-12 md:col-span-8" />
          <div className="col-span-12 self-end md:col-span-4">
            <p className="display text-[1.5rem] italic leading-snug text-[#D8BE8A]">{d.headline}</p>
            <p className="mt-5 max-w-[42ch] text-[1rem] text-bone/85">{d.intro}</p>
          </div>
        </div>
      </div>
      <ClipReveal>
        <Parallax amount={4} className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
          <ArtImage image={d.cover} fill priority sizes="100vw" />
        </Parallax>
      </ClipReveal>
      <div className="wrap py-5">
        <p className="caption">{d.cover.alt}</p>
      </div>
    </header>
  )
}

function DrawingOpening({ d }) {
  const types = d.vocabulary
  return (
    <header className="drawing-grid border-b border-steel/20 pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+4rem)]">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12 pb-16 md:pb-24">
        <div className="col-span-12 md:col-span-7">
          <Crumb d={d} />
          <Title d={d} className="max-w-[14ch]" />
          <p className="display mt-8 text-[1.6rem] italic leading-snug text-[var(--accent)]">{d.headline}</p>
          <p className="mt-6 max-w-[48ch] text-[1.02rem]">{d.intro}</p>
        </div>
        <aside className="col-span-12 self-end bg-limestone/90 p-6 md:col-span-4 md:col-start-9" aria-label="Vocabulary">
          <ArtImage image={d.cover} ratio="4/5" priority sizes="33vw" />
          <p className="caption mt-3">{d.cover.alt}</p>
          <h2 className="caption mt-6">Vocabulary</h2>
          <ul className="mt-2 text-[0.95rem]">
            {types.map((t) => (
              <li key={t.title} className="border-b border-steel/15 py-1.5">
                <span className="label-title">{t.title}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------- body */

function Body({ d }) {
  return (
    <section aria-label={`About ${d.shortName.toLowerCase()}`} className="wrap py-24 md:py-32">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2">
          <div className="prose-body text-[1.05rem]">
            {d.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="col-span-12 grid grid-cols-2 gap-8 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-8">
          <div>
            <h2 className="caption">Materials</h2>
            <ul className="mt-3 space-y-1.5 text-[0.98rem]">
              {d.materials.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- features */

function MonumentFeature({ d }) {
  return (
    <section aria-label="Sculpture in its setting" className="py-24 md:py-32">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-8">
          <ClipReveal>
            <Parallax amount={4} className="aspect-[4/3]">
              <ArtImage image={d.context} fill sizes="66vw" />
            </Parallax>
          </ClipReveal>
        </div>
        <div className="col-span-12 self-end md:col-span-3 md:col-start-10">
          <p className="display text-[clamp(1.6rem,1.1rem+1.4vw,2.3rem)] leading-[1.12]">{d.note}</p>
          <p className="caption mt-5">{d.context.alt}</p>
        </div>
      </div>
    </section>
  )
}

function LandscapeFeature({ d }) {
  return (
    <section aria-label={`${d.name} in their setting`} className="py-24 md:py-32">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 self-end md:col-span-4">
          {d.designs ? (
            <>
              <SplitText as="h2" className="display text-[clamp(1.8rem,1.2rem+1.6vw,2.6rem)] leading-[1.05]" text={d.note} />
              <dl className="mt-6">
                {d.designs.map((x) => (
                  <div key={x.title} className="border-t border-ink/20 py-4">
                    <dt className="label-title text-[1.35rem] leading-tight">{x.title}</dt>
                    <dd className="mt-1 text-[0.95rem] text-ink-soft">{x.text}</dd>
                  </div>
                ))}
              </dl>
            </>
          ) : (
            <p className="display text-[clamp(1.6rem,1.1rem+1.4vw,2.3rem)] leading-[1.12]">{d.note}</p>
          )}
          <p className="caption mt-5">{d.context.alt}</p>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <ClipReveal>
            <Parallax amount={4} className="aspect-[5/4]">
              <ArtImage image={d.context} fill sizes="60vw" />
            </Parallax>
          </ClipReveal>
        </div>
      </div>
    </section>
  )
}

function ReliefFeature({ d }) {
  return (
    <section aria-label="Murals and wall features" className="py-24 md:py-32">
      <div className="wrap">
        <dl className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          {d.definitions.map((def) => (
            <div key={def.term} className="border-t border-ink/25 pt-6">
              <dt className="display text-[clamp(2.2rem,1.4rem+2.4vw,3.4rem)] leading-none">{def.term}</dt>
              <dd className="mt-4 max-w-[42ch] text-[1.02rem]">{def.text}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-6 md:mt-28">
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <ClipReveal>
              <ArtImage image={d.context} ratio="5/4" sizes="60vw" />
            </ClipReveal>
          </div>
          <p className="display col-span-12 self-end text-[clamp(1.5rem,1.1rem+1.2vw,2.1rem)] leading-[1.15] md:order-first md:col-span-4">
            {d.note}
          </p>
        </div>
      </div>
    </section>
  )
}

function DrawingFeature({ d }) {
  return (
    <section aria-labelledby="catalogue-title" className="drawing-grid border-y border-steel/20 py-24 md:py-32">
      <div className="wrap">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <SplitText as="h2" id="catalogue-title" className="display col-span-12 text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)] md:col-span-6" text="A vocabulary of forms" />
          <p className="col-span-12 max-w-[46ch] self-end text-[1rem] md:col-span-5 md:col-start-8">
            The elements the studio makes in FRP and GRC. {d.note}
          </p>
        </div>
        <dl className="mt-14 grid gap-x-10 md:grid-cols-2">
          {d.vocabulary.map((t) => (
            <div key={t.title} className="grid grid-cols-[1fr_1.2fr] items-baseline gap-6 border-t border-steel/25 py-5">
              <dt className="label-title text-[clamp(1.4rem,1.1rem+0.8vw,1.9rem)] leading-tight">{t.title}</dt>
              <dd className="text-[0.95rem] text-ink-soft">{t.text}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-16 grid grid-cols-12 gap-x-6">
          <figure className="col-span-12 md:col-span-8 md:col-start-3">
            <ClipReveal>
              <ArtImage image={d.context} ratio="16/10" sizes="66vw" />
            </ClipReveal>
            <figcaption className="caption mt-3">{d.context.alt}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

// All the works in this body, with a subject filter where the body has groups.
function WorksGrid({ d, list }) {
  const [group, setGroup] = useState('all')
  const groups = (d.groups || []).map((g) => ({ ...g, count: list.filter((p) => p.group === g.slug).length })).filter((g) => g.count)
  const shown = group === 'all' ? list : list.filter((p) => p.group === group)
  return (
    <section aria-labelledby="projects-title" className="wrap py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SplitText as="h2" id="projects-title" className="display text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)]" text="Works" />
        <p className="caption">{list.length} works</p>
      </div>
      {groups.length > 1 && (
        <div role="group" aria-label="Show works by subject" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-stone">
          {[{ slug: 'all', name: 'All', count: list.length }, ...groups].map((g) => (
            <button
              key={g.slug}
              type="button"
              aria-pressed={group === g.slug}
              onClick={() => setGroup(g.slug)}
              className={`-mb-px border-b pb-2.5 text-[1.1rem] display transition-colors duration-300 ${
                group === g.slug ? 'border-ink italic text-ink' : 'border-transparent text-ink-soft hover:text-ink'
              }`}
            >
              {g.name} <sup className="font-sans text-[0.65rem] not-italic tabular-nums opacity-70">{g.count}</sup>
            </button>
          ))}
        </div>
      )}
      <div className="mt-14">
        <Masonry key={group} projects={shown} />
      </div>
    </section>
  )
}

function OtherDisciplines({ current }) {
  const others = disciplines.filter((d) => d.slug !== current)
  return (
    <nav aria-label="Other bodies of work" className="wrap pb-12">
      <ul className="grid gap-px border-y border-stone md:grid-cols-2">
        {others.map((d) => (
          <li key={d.slug}>
            <Link to={`/works/${d.slug}`} className="group flex h-full items-center gap-5 py-6 md:pr-6">
              <div className="w-20 shrink-0">
                <ArtImage image={d.cover} ratio="1/1" tag={false} sizes="80px" />
              </div>
              <span className="display text-[1.5rem] leading-tight group-hover:text-geru">{d.shortName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
