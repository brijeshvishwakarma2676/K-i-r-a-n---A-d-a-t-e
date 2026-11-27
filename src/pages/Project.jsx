import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Expand } from 'lucide-react'
import Seo, { breadcrumbLd, fitDescription, ids, shareImageFor } from '../components/Seo'
import ArtImage, { photo, srcFor } from '../components/ArtImage'
import ProjectCard from '../components/ProjectCard'
import Lightbox from '../components/Lightbox'
import { ClipReveal, SplitText } from '../components/Motion'
import Invitation from '../sections/Invitation'
import PressClippings from '../components/PressClippings'
import MakingTimeline from '../components/MakingTimeline'
import Turnaround from '../components/Turnaround'
import BeforeAfter from '../components/BeforeAfter'
import Film from '../components/Film'
import NotFound from './NotFound'
import { disciplineBySlug } from '../data/disciplines'
import { projectBySlug, projectsFor, workPath } from '../data/projects'
import { exhibitions, yearOf } from '../data/exhibitions'
import { artist, site, whatsappLink } from '../data/site'
import { useT } from '../i18n'

// '2:40' → 'PT2M40S', the length format search engines read.
/*
  The work's search snippet: what it is, in what, by whom, and where; then the start of its own
  description, so each work's snippet is its own (Google shows about 155 characters).
    Freedom: stainless steel 316 sculpture by Kiran Adate, Mumbai. Freedom is the expression of
    liberation, hope, and the courage to rise beyond limitations…
*/
function workSnippet(p, d) {
  const material = p.medium && p.medium.split(/,| \+ /)[0].trim().toLowerCase()
  const kind = d.slug === 'murals' ? 'relief mural' : 'sculpture'
  const year = p.year ? ` (${p.year})` : ''
  const where = p.location || site.basedIn
  const head = `${p.title}${year}: ${material ? `${material} ${kind}` : kind} by ${site.name}, ${where}.`
  const more = p.description?.join(' ') || `Photographs and details of the work, from the studio of ${site.studio}.`
  return fitDescription(`${head} ${more}`)
}

const isoLength = (l) => {
  const [m, sec] = String(l).split(':').map(Number)
  return `PT${m}M${sec || 0}S`
}

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
  const t = useT()
  if (!p || p.discipline !== slug || p.listed === false) return <NotFound />

  const d = disciplineBySlug[p.discipline]
  const siblings = projectsFor(p.discipline)
  const idx = siblings.findIndex((x) => x.slug === p.slug)
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length]
  const next = siblings[(idx + 1) % siblings.length]
  const sameGroup = siblings.filter((x) => x.slug !== p.slug && x.group && x.group === p.group)
  const related = (sameGroup.length >= 3 ? sameGroup : siblings.filter((x) => x.slug !== p.slug)).slice(0, 3)
  const images = [p.cover, ...p.gallery]
  // Photographs of the making open in the same viewer, after the views of the finished work.
  const makingImages = (p.making || []).filter((s) => s.image).map((s) => s.image)
  // The viewer shows the making photographs with their caption in the visitor's language.
  const makingShown = (p.making || []).filter((s) => s.image).map((s) => ({ ...s.image, caption: `${[t(s.label), t(s.date)].filter(Boolean).join(', ')}. ${t(s.note)}` }))
  const viewer = [...images, ...makingShown]
  // Photos shown in the walk-around are not repeated among the further views.
  const turnIds = new Set((p.turnaround || []).map((t) => t.image.id))
  const further = p.gallery.filter((im) => !turnIds.has(im.id))
  const shownIn = exhibitions.filter((x) => x.works.includes(p.slug))
  const press = artist.press.filter((x) => x.work === p.slug)
  const publicWork = artist.publicWorks.find((w) => w.slug === p.slug)
  const groupName = d.groups?.find((g) => g.slug === p.group)?.name
  const segmentName = p.segment && d.vocabulary?.find((v) => v.title.toLowerCase().startsWith(p.segment.split('-')[0]))?.title

  // The wall label: only what is known is shown.
  const facts = [
    { term: 'Body of work', value: t(d.name) },
    { term: 'Subject', value: t(groupName || segmentName) },
    { term: 'Medium', value: t(p.medium) },
    { term: 'Technique', value: t(p.technique) },
    { term: 'Dimensions', value: p.dimensions },
    { term: 'Year', value: p.year },
    {
      term: 'Location',
      value: p.location && (publicWork ? <>{t(p.location)}<br /><a href={publicWork.map} target="_blank" rel="noreferrer" className="text-link mt-1 text-[0.9rem]">{t('Directions')} ↗</a></> : t(p.location)),
    },
  ].filter((f) => f.value)

  return (
    <article style={{ '--accent': d.accent }}>
      <Seo
        title={p.title}
        description={workSnippet(p, d)}
        image={shareImageFor(p)}
        jsonLd={[{
          '@context': 'https://schema.org',
          '@type': 'VisualArtwork',
          name: p.title,
          artform: d.name,
          creator: { '@type': 'Person', '@id': ids.person, name: site.name },
          ...(p.medium && { artMedium: p.medium }),
          ...(p.year && { dateCreated: String(p.year) }),
          ...(p.location && { locationCreated: { '@type': 'Place', name: p.location } }),
          ...(p.description && { description: p.description[0] }),
          image: [p.cover, ...p.gallery].map((im) => srcFor(im)).filter(Boolean).map((u) => `${site.url}${u}`),
          url: `${site.url}${workPath(p)}`,
          ...(p.film && {
            video: {
              '@type': 'VideoObject',
              name: `${p.title}: ${p.film.caption || 'film'}`,
              description: p.film.caption || p.title,
              thumbnailUrl: `${site.url}${srcFor(p.film.poster)}`,
              contentUrl: `${site.url}${p.film.src}`,
              uploadDate: p.film.date,
              ...(p.film.length && { duration: isoLength(p.film.length) }),
            },
          }),
        }, breadcrumbLd([{ name: 'Works', path: '/works' }, { name: d.name, path: `/works/${d.slug}` }, { name: p.title, path: workPath(p) }])]}
      />

      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-10 pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
        <ClipReveal className="col-span-12 md:col-span-7">
          <button type="button" onClick={() => setOpen(0)} className="group relative block w-full cursor-zoom-in text-left" aria-label={t('View {title} full screen', { title: p.title })}>
            <div style={photo(p.cover) ? { maxWidth: `calc(80svh * ${photo(p.cover).w / photo(p.cover).h})` } : undefined}>
              <ArtImage image={p.cover} ratio="natural" priority sizes="(min-width: 768px) 58vw, 100vw" />
            </div>
            <ExpandHint />
          </button>
        </ClipReveal>

        <header className="col-span-12 self-end md:col-span-5 md:col-start-8 md:pb-2 lg:col-span-4 lg:col-start-9">
          <nav aria-label={t('Breadcrumb')} className="caption">
            <Link to="/works" className="hover:underline">{t('Works')}</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link to={`/works/${d.slug}`} className="hover:underline">{t(d.name)}</Link>
          </nav>
          <h1 className="enter-rise label-title mt-5 text-[clamp(2.4rem,1.4rem+3.2vw,4.6rem)] font-light leading-[0.95]">
            {t(p.title)}
            {p.year && <span className="display not-italic">, {p.year}</span>}
          </h1>

          <dl className="mt-8 border-t border-stone">
            {facts.map((f) => (
              <div key={f.term} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-stone py-3">
                <dt className="caption">{t(f.term)}</dt>
                <dd className="text-[0.98rem] tabular-nums">{f.value}</dd>
              </div>
            ))}
          </dl>

          {p.description ? (
            <div className="prose-body mt-8 text-[1rem]">
              {p.description.map((x) => <p key={x}>{t(x)}</p>)}
            </div>
          ) : null}

          {shownIn.length > 0 && (
            <div className="mt-8">
              <h2 className="caption">{t('Exhibited')}</h2>
              <ul className="mt-2 text-[0.95rem]">
                {shownIn.map((x) => (
                  <li key={x.slug} className="border-b border-stone py-2">
                    <Link to="/exhibitions" className="hover:text-geru">
                      <span className="label-title text-[1.14em]">{t(x.title)}</span>, {t(x.venue)}, {t(x.city)}, {yearOf(x)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-4">
            <Link to={`/contact?work=${p.slug}`} className="arrow-link">{t('Ask about this work')}</Link>
            <a href={whatsappLink(p)} target="_blank" rel="noreferrer" className="text-link text-[0.95rem]">{t('or on WhatsApp')} ↗</a>
          </div>
        </header>
      </div>

      {p.gallery.length > 0 && (
        <section aria-label={t('More views')} className="cv-auto room-dark"><div className="wrap py-24 md:py-32">
          {p.turnaround && (
            <div className="mb-24 grid grid-cols-12 gap-x-6 gap-y-10 md:mb-32">
              <Turnaround views={p.turnaround.map((v) => ({ ...v, label: t(v.label) }))} title={t(p.title)} className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2" />
              <div className="col-span-12 self-center md:col-span-5 md:col-start-8">
                <SplitText as="h2" className="display text-[clamp(2.2rem,1.4rem+2.6vw,3.8rem)]" text="Walk around it" />
                <p className="mt-6 max-w-[40ch] text-[1.02rem]">{t('A sculpture has no front. Drag across the photograph, or choose a view, to walk around the {title}.', { title: p.title })}</p>
              </div>
            </div>
          )}
          {further.length > 0 && <h2 className="caption mb-10">{t('Further views')}</h2>}
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-12">
            {further.map((im, i) => {
              const s = spread[i % spread.length]
              return (
                <figure key={im.id} className={s.cls}>
                  <button type="button" onClick={() => setOpen(images.indexOf(im))} className="group relative block w-full cursor-zoom-in" aria-label={t('View {title} full screen', { title: im.caption })}>
                    <ArtImage image={im} ratio={s.ratio} sizes="(min-width: 768px) 50vw, 100vw" />
                    <ExpandHint />
                  </button>
                  <figcaption className="caption mt-3">{t(im.caption)}</figcaption>
                </figure>
              )
            })}
          </div>
        </div></section>
      )}

      {p.making && (
        <section aria-labelledby="making-title" className="cv-auto wrap py-24 md:py-36">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <SplitText as="h2" id="making-title" className="display col-span-12 text-[clamp(2.4rem,1.4rem+3.2vw,4.4rem)] md:col-span-6" text={p.makingTitle} />
            {p.makingIntro && <p className="col-span-12 max-w-[46ch] self-end text-[1.02rem] md:col-span-5 md:col-start-8">{t(p.makingIntro)}</p>}
          </div>
          {p.beforeAfter && (
            <BeforeAfter
              before={{ ...p.beforeAfter.before, label: t(p.beforeAfter.before.label) }}
              after={{ ...p.beforeAfter.after, label: t(p.beforeAfter.after.label) }}
              title={t(p.title)}
              className={`mt-14 md:mt-20 ${photo(p.beforeAfter.before.image)?.h > photo(p.beforeAfter.before.image)?.w ? 'max-w-[34rem]' : 'max-w-[60rem]'}`}
            />
          )}
          <MakingTimeline steps={p.making} onOpen={(im) => setOpen(images.length + makingImages.indexOf(im))} className="mt-16 md:mt-24" />
        </section>
      )}

      {p.film && (
        <section aria-labelledby="film-title" className="cv-auto room-dark"><div className="wrap py-24 md:py-32">
          <SplitText as="h2" id="film-title" className="display text-[clamp(2.4rem,1.4rem+3.2vw,4.4rem)]" text="On film" />
          <Film film={p.film} title={t(p.title)} className="mt-12 max-w-[72rem] md:mt-16" />
        </div></section>
      )}

      {press.length > 0 && (
        <section aria-labelledby="press-title" className="cv-auto room-clay"><div className="wrap py-20 md:py-28">
          <h2 id="press-title" className="display text-[clamp(2rem,1.4rem+2vw,3.2rem)]">{t('In the press')}</h2>
          <PressClippings items={press} className="mt-10 md:mt-14" />
        </div></section>
      )}

      <nav aria-label={t('More works')} className={`wrap grid grid-cols-2 border-y border-stone ${p.gallery.length ? '' : 'mt-24 md:mt-32'}`}>
        <Link to={workPath(prev)} className="group border-r border-stone py-8 pr-4 md:py-12">
          <span className="caption block">{t('Previous')}</span>
          <span className="label-title mt-2 block text-[clamp(1.4rem,1rem+1.6vw,2.4rem)] leading-tight group-hover:text-geru">{t(prev.title)}</span>
        </Link>
        <Link to={workPath(next)} className="group py-8 pl-4 text-right md:py-12">
          <span className="caption block">{t('Next')}</span>
          <span className="label-title mt-2 block text-[clamp(1.4rem,1rem+1.6vw,2.4rem)] leading-tight group-hover:text-geru">{t(next.title)}</span>
        </Link>
      </nav>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="cv-auto wrap py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="related-title" className="display text-[clamp(2rem,1.4rem+2vw,3.2rem)]">
              {t('Also in {topic}', { topic: t(groupName || d.name).toLowerCase() })}
            </h2>
            <Link to={`/works/${d.slug}`} className="text-link text-[0.95rem]">{t('All {topic}', { topic: t(d.shortName).toLowerCase() })}</Link>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ProjectCard key={r.slug} project={r} ratio="4/5" showDiscipline={false} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        </section>
      )}

      <Invitation title="For this work, or a commission of your own." linkLabel="Ask about this work" to={`/contact?work=${p.slug}`} film={false} />

      <Lightbox images={viewer} index={open} onIndex={setOpen} onClose={() => setOpen(null)} title={t(p.title)} />
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
