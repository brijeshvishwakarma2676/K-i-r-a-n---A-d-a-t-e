import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { motion } from 'framer-motion'
import { Expand } from 'lucide-react'
import Seo from '../components/Seo'
import ArtImage, { photo, srcFor } from '../components/ArtImage'
import ProjectCard from '../components/ProjectCard'
import Lightbox from '../components/Lightbox'
import { ClipReveal, ease } from '../components/Motion'
import Invitation from '../sections/Invitation'
import Tone from '../components/Tone'
import NotFound from './NotFound'
import { disciplineBySlug } from '../data/disciplines'
import { projectBySlug, projectsFor, workPath } from '../data/projects'
import { exhibitions, yearOf } from '../data/exhibitions'
import { site } from '../data/site'

// Further photographs of a work alternate between these placements so a set reads as a spread.
const spread = [
  { cls: 'md:col-span-6', ratio: 'natural' },
  { cls: 'md:col-span-5 md:col-start-8 md:mt-[18%]', ratio: 'natural' },
  { cls: 'md:col-span-5 md:col-start-2', ratio: 'natural' },
]

export default function Project() {
  const { slug, work } = useParams()
  const p = projectBySlug[work]
  const [open, setOpen] = useState(null)
  if (!p || p.discipline !== slug || p.listed === false) return <NotFound />

  const d = disciplineBySlug[p.discipline]
  const siblings = projectsFor(p.discipline)
  const idx = siblings.findIndex((x) => x.slug === p.slug)
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length]
  const next = siblings[(idx + 1) % siblings.length]
  const sameGroup = siblings.filter((x) => x.slug !== p.slug && x.group && x.group === p.group)
  const related = (sameGroup.length >= 3 ? sameGroup : siblings.filter((x) => x.slug !== p.slug)).slice(0, 3)
  const images = [p.cover, ...p.gallery]
  const shownIn = exhibitions.filter((x) => x.works.includes(p.slug))
  const groupName = d.groups?.find((g) => g.slug === p.group)?.name
  const segmentName = p.segment && d.vocabulary?.find((v) => v.title.toLowerCase().startsWith(p.segment.split('-')[0]))?.title

  // The wall label: only what is known is shown.
  const facts = [
    { term: 'Body of work', value: d.name },
    { term: 'Subject', value: groupName || segmentName },
    { term: 'Medium', value: p.medium },
    { term: 'Dimensions', value: p.dimensions },
    { term: 'Year', value: p.year },
    { term: 'Location', value: p.location },
  ].filter((f) => f.value)

  return (
    <article style={{ '--accent': d.accent }}>
      <Seo
        title={p.title}
        description={`${p.title}${p.medium ? `, ${p.medium}` : ''}: ${d.name.toLowerCase()} by ${site.name}, ${site.basedIn}.`}
        image={srcFor(p.cover) ? `${site.url}${srcFor(p.cover)}` : undefined}
      />

      <div data-tone="light" className="wrap grid grid-cols-12 gap-x-6 gap-y-10 pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
        <ClipReveal className="col-span-12 md:col-span-7">
          <button type="button" onClick={() => setOpen(0)} className="group relative block w-full cursor-zoom-in text-left" aria-label={`View ${p.title} full screen`}>
            <div style={photo(p.cover) ? { maxWidth: `calc(80svh * ${photo(p.cover).w / photo(p.cover).h})` } : undefined}>
              <ArtImage image={p.cover} ratio="natural" priority sizes="(min-width: 768px) 58vw, 100vw" />
            </div>
            <ExpandHint />
          </button>
        </ClipReveal>

        <header className="col-span-12 self-end md:col-span-5 md:col-start-8 md:pb-2 lg:col-span-4 lg:col-start-9">
          <nav aria-label="Breadcrumb" className="caption">
            <Link to="/works" className="hover:underline">Works</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link to={`/works/${d.slug}`} className="hover:underline">{d.name}</Link>
          </nav>
          <motion.h1
            className="label-title mt-5 text-[clamp(2.4rem,1.4rem+3.2vw,4.6rem)] font-light leading-[0.95]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease }}
          >
            {p.title}
            {p.year && <span className="display not-italic">, {p.year}</span>}
          </motion.h1>

          <dl className="mt-8 border-t border-stone">
            {facts.map((f) => (
              <div key={f.term} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-stone py-3">
                <dt className="caption">{f.term}</dt>
                <dd className="text-[0.98rem] tabular-nums">{f.value}</dd>
              </div>
            ))}
          </dl>

          {p.description ? (
            <div className="prose-body mt-8 text-[1rem]">
              {p.description.map((t) => <p key={t}>{t}</p>)}
            </div>
          ) : null}

          {shownIn.length > 0 && (
            <div className="mt-8">
              <h2 className="caption">Exhibited</h2>
              <ul className="mt-2 text-[0.95rem]">
                {shownIn.map((x) => (
                  <li key={x.slug} className="border-b border-stone py-2">
                    <Link to="/exhibitions" className="hover:text-geru">
                      <span className="label-title text-[1.14em]">{x.title}</span>, {x.venue}, {x.city}, {yearOf(x)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link to={`/contact?work=${p.slug}`} className="arrow-link mt-10">Ask about this work</Link>
        </header>
      </div>

      {p.gallery.length > 0 && (
        <section data-tone="night" aria-label="More views" className="wrap py-24 md:py-32">
          <h2 className="caption mb-10">Further views</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-12">
            {p.gallery.map((im, i) => {
              const s = spread[i % spread.length]
              return (
                <figure key={im.id} className={s.cls}>
                  <button type="button" onClick={() => setOpen(i + 1)} className="group relative block w-full cursor-zoom-in" aria-label={`View ${im.caption} full screen`}>
                    <ArtImage image={im} ratio={s.ratio} sizes="50vw" />
                    <ExpandHint />
                  </button>
                  <figcaption className="caption mt-3">{im.caption}</figcaption>
                </figure>
              )
            })}
          </div>
        </section>
      )}

      <nav data-tone="light" aria-label="More works" className={`wrap grid grid-cols-2 border-y border-stone ${p.gallery.length ? '' : 'mt-24 md:mt-32'}`}>
        <Link to={workPath(prev)} className="group border-r border-stone py-8 pr-4 md:py-12">
          <span className="caption block">Previous</span>
          <span className="label-title mt-2 block text-[clamp(1.4rem,1rem+1.6vw,2.4rem)] leading-tight group-hover:text-geru">{prev.title}</span>
        </Link>
        <Link to={workPath(next)} className="group py-8 pl-4 text-right md:py-12">
          <span className="caption block">Next</span>
          <span className="label-title mt-2 block text-[clamp(1.4rem,1rem+1.6vw,2.4rem)] leading-tight group-hover:text-geru">{next.title}</span>
        </Link>
      </nav>

      {related.length > 0 && (
        <section data-tone="clay" aria-labelledby="related-title" className="wrap py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="related-title" className="display text-[clamp(2rem,1.4rem+2vw,3.2rem)]">
              Also in {(groupName || d.name).toLowerCase()}
            </h2>
            <Link to={`/works/${d.slug}`} className="text-link text-[0.95rem]">All {d.shortName.toLowerCase()}</Link>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ProjectCard key={r.slug} project={r} ratio="4/5" showDiscipline={false} sizes="33vw" />
            ))}
          </div>
        </section>
      )}

      <Tone name="light">
        <Invitation title="For this work, or a commission of your own." linkLabel="Ask about this work" to={`/contact?work=${p.slug}`} />
      </Tone>

      <Lightbox images={images} index={open} onIndex={setOpen} onClose={() => setOpen(null)} title={p.title} />
    </article>
  )
}

function ExpandHint() {
  return (
    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-limestone/85 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100">
      <Expand size={15} strokeWidth={1.4} aria-hidden="true" />
    </span>
  )
}
