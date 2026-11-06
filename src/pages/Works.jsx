import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import Seo from '../components/Seo'
import ProjectCard from '../components/ProjectCard'
import Masonry from '../components/Masonry'
import Invitation from '../sections/Invitation'
import Tone from '../components/Tone'
import { ease, SplitText } from '../components/Motion'
import { disciplines } from '../data/disciplines'
import { projects, projectsFor } from '../data/projects'
import { site } from '../data/site'

// Two hand-composed arrangements, alternated chapter by chapter so no two read the same.
const arrangements = [
  [
    { cls: 'md:col-span-7', ratio: '4/5' },
    { cls: 'md:col-span-4 md:col-start-9 md:mt-[34%]', ratio: '3/4' },
    { cls: 'md:col-span-5 md:col-start-2', ratio: '1/1' },
    { cls: 'md:col-span-5 md:col-start-8 md:mt-[20%]', ratio: '4/5' },
    { cls: 'md:col-span-6 md:col-start-3', ratio: '16/10' },
  ],
  [
    { cls: 'md:col-span-5 md:mt-[22%]', ratio: '3/4' },
    { cls: 'md:col-span-6 md:col-start-7', ratio: '4/5' },
    { cls: 'md:col-span-7 md:col-start-1', ratio: '16/10' },
    { cls: 'md:col-span-4 md:col-start-9 md:mt-[14%]', ratio: '1/1' },
    { cls: 'md:col-span-5 md:col-start-4', ratio: '4/5' },
  ],
]

export default function Works() {
  const [filter, setFilter] = useState('all')
  const options = [{ slug: 'all', shortName: 'All', count: projects.length }, ...disciplines.map((d) => ({ ...d, count: projectsFor(d.slug).length }))]

  return (
    <>
      <Seo title="Works" description="Selected sculpture and relief murals by Kiran Adate, Mumbai." />
      <header data-tone="light" className="wrap pb-14 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+6rem)]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <SplitText as="h1" className="display col-span-12 text-[clamp(4rem,2rem+9vw,11rem)] font-light leading-[0.82] md:col-span-7" text="Works" immediate delay={0.3} />
          <p className="col-span-12 max-w-[46ch] self-end text-[1.02rem] md:col-span-4 md:col-start-9">
            A selection of sculpture and relief murals, in steel, stone, bronze and fibre.
          </p>
        </div>

        <div role="group" aria-label="Show works by body of work" className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-b border-stone md:mt-20">
          {options.map((o) => (
            <button
              key={o.slug}
              type="button"
              aria-pressed={filter === o.slug}
              onClick={() => setFilter(o.slug)}
              className={`-mb-px flex items-baseline gap-1.5 border-b pb-3 text-[1.35rem] display transition-colors duration-300 ${
                filter === o.slug ? 'border-ink italic text-ink' : 'border-transparent text-ink-soft hover:text-ink'
              }`}
            >
              {o.shortName}
              <sup className="font-sans text-[0.68rem] not-italic tabular-nums opacity-70">{o.count}</sup>
            </button>
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }}>
          {filter === 'all' ? (
            disciplines.map((d, ci) => <Chapter key={d.slug} d={d} arrangement={arrangements[ci % 2]} tone={ROOMS[ci % ROOMS.length]} />)
          ) : (
            <Tone name={ROOMS[Math.max(0, disciplines.findIndex((d) => d.slug === filter)) % ROOMS.length]} className="wrap pb-20 pt-6">
              <Masonry projects={projectsFor(filter)} />
              <Link to={`/works/${filter}`} className="text-link text-[0.95rem]">
                About {disciplines.find((d) => d.slug === filter)?.name.toLowerCase()}
              </Link>
            </Tone>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="wrap caption pt-10">
        {site.products.note} by the studio are on{' '}
        <a href={site.products.url} target="_blank" rel="noreferrer" className="text-link">{site.products.name}</a>.
      </p>
      <div className="pt-16">
        <Invitation />
      </div>
    </>
  )
}

// Each chapter shows five works, featured ones first, and links to the full body of work.
// Chapters take turns between rooms, so the page changes colour from one body of work to the next.
const ROOMS = ['clay', 'stone']

function Chapter({ d, arrangement, tone }) {
  const all = projectsFor(d.slug)
  const list = [...all.filter((p) => p.featured), ...all.filter((p) => !p.featured)].slice(0, arrangement.length)
  return (
    <section data-tone={tone} aria-labelledby={`ch-${d.slug}`} className="wrap border-t border-stone py-20 md:py-28">
      <div className="grid grid-cols-12 items-end gap-x-6 gap-y-5">
        <SplitText as="h2" id={`ch-${d.slug}`} className="display col-span-12 text-[clamp(2.4rem,1.4rem+3vw,4.2rem)] leading-none md:col-span-7" text={d.name} />
        <div className="col-span-12 md:col-span-4 md:col-start-9">
          <p className="display text-[1.3rem] italic" style={{ color: d.accent }}>{d.headline}</p>
          <p className="caption mt-2">{d.materials.join(', ')}</p>
          <Link to={`/works/${d.slug}`} className="text-link mt-3 inline-block text-[0.9rem]">
            About {d.shortName.toLowerCase()}
          </Link>
        </div>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 md:mt-20 md:grid-cols-12 md:gap-y-20">
        {list.map((p, i) => {
          const a = arrangement[i % arrangement.length]
          return <ProjectCard key={p.slug} project={p} ratio={a.ratio} className={a.cls} showDiscipline={false} sizes="(min-width: 768px) 50vw, 100vw" />
        })}
      </div>
      {all.length > list.length && (
        <Link to={`/works/${d.slug}`} className="arrow-link mt-16 md:mt-20">
          All {all.length} works in {d.shortName.toLowerCase()}
        </Link>
      )}
    </section>
  )
}
