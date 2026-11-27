import { Link } from 'react-router'
import Seo, { personLd } from '../components/Seo'
import PublicWorksMap from '../components/PublicWorksMap'
import ArtImage from '../components/ArtImage'
import AmbientVideo from '../components/AmbientVideo'
import { ClipReveal, Parallax, Reveal, ScrollWords, SplitText } from '../components/Motion'
import Invitation from '../sections/Invitation'
import PressClippings from '../components/PressClippings'
import { artist, site } from '../data/site'
import { useLang, useT } from '../i18n'
import { materials } from '../data/disciplines'
import { dateRange, exhibitions } from '../data/exhibitions'
import { projectBySlug, workPath } from '../data/projects'

// A work at full width between the statement and the materials.
const siteImage = { id: 'kiran/freedom-of-press-night-close', alt: 'Statue of Freedom of Press, Butibori, Nagpur, at night', position: '50% 18%' }
const workshopImage = { id: 'kiran/hawker-workshop', alt: 'Building up the Sculpture of Hawker in the workshop, 2007' }

const shows = [...exhibitions].sort((a, b) => (a.start < b.start ? 1 : -1))

export default function About() {
  const t = useT()
  const { lang } = useLang()
  return (
    <>
      <Seo title="About" description={artist.shortBio} jsonLd={personLd(artist)} />

      <header className="wrap grid grid-cols-12 gap-x-6 gap-y-12 pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <div className="col-span-12 flex flex-col md:col-span-7">
          <p className="caption mb-4">{t(site.role)}</p>
          <SplitText
            as="h1"
            className="display text-[clamp(3.6rem,1.8rem+7.4vw,9.5rem)] font-light leading-[0.84]"
            text={site.name}
            immediate
            delay={0.3}
            step={0.12}
          />
          <p className="caption mt-4">
            {t('Mumbai. Studio: {studio}, since {year}.', { studio: site.studio, year: site.since })}
          </p>
          <Reveal as="p" delay={0.6} className="lede mt-auto max-w-[32ch] pt-12">{t(artist.shortBio)}</Reveal>
        </div>
        <figure className="col-span-10 col-start-3 sm:col-span-7 sm:col-start-6 md:col-span-4 md:col-start-9">
          <ArtImage image={artist.portrait} ratio="3/4" priority sizes="(min-width: 768px) 33vw, 85vw" />
          <figcaption className="caption mt-3">{t(artist.portrait.alt)}</figcaption>
        </figure>
      </header>

      <section aria-labelledby="statement-title" className="cv-auto room-dark"><div className="wrap py-28 md:py-40">
        <figure className="grid grid-cols-12 gap-x-6">
          <h2 id="statement-title" className="caption col-span-12 mb-8 md:col-span-10 md:col-start-2">{t('On the work')}</h2>
          <blockquote className="display col-span-12 text-[clamp(2rem,1.2rem+2.8vw,3.8rem)] italic leading-[1.08] md:col-span-10 md:col-start-2">
            <ScrollWords text={artist.statement} />
          </blockquote>
          <figcaption className="caption col-span-12 mt-8 md:col-span-10 md:col-start-2">{t(artist.statementSource)}</figcaption>
        </figure>

        {/* Kiran Adate's own words, from his artist profile */}
        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-32">
          <div className="col-span-12 md:col-span-4">
            <SplitText as="h2" className="display text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)]" text="Artist statement" />
          </div>
          <Reveal className="prose-body col-span-12 text-[1.06rem] md:col-span-6 md:col-start-6">
            {artist.statementFull.map((p) => (
              <p key={p}>{t(p)}</p>
            ))}
          </Reveal>
        </div>
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-28">
          <div className="col-span-12 md:col-span-4">
            <SplitText as="h2" className="display text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)]" text="Contemporary artistic vision" />
          </div>
          <Reveal className="prose-body col-span-12 text-[1.06rem] md:col-span-6 md:col-start-6">
            <p>{t(artist.vision)}</p>
          </Reveal>
        </div>
      </div></section>

      <section aria-label={t('On site')} className="cv-auto">
        <ClipReveal>
          <Parallax amount={5} className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
            <ArtImage image={siteImage} fill sizes="100vw" />
          </Parallax>
        </ClipReveal>
        <p className="wrap caption mt-4">{t(siteImage.alt)}</p>
      </section>

      <section aria-labelledby="where-title" className="wrap pt-28 md:pt-40">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <SplitText as="h2" id="where-title" className="display col-span-12 text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)] md:col-span-6" text="Where to see the work" />
          <p className="col-span-12 max-w-[44ch] self-end text-[1.02rem] md:col-span-5 md:col-start-8">{t('The public works stand in the open, where anyone can visit them.')}</p>
        </div>
        <PublicWorksMap className="mt-14 md:mt-20" />
      </section>

      <section aria-labelledby="materials-title" className="cv-auto wrap py-28 md:py-40">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <SplitText as="h2" id="materials-title" className="display text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)]" text="Mediums & material exploration" />
            <p className="mt-6 max-w-[46ch] text-[1.04rem]">{t(artist.materialsNote)}</p>
          </div>
          <ul className="col-span-12 md:col-span-6 md:col-start-7">
            {materials.map((m) => (
              <li key={m.name} className="grid grid-cols-[4.5rem_1fr] items-center gap-5 border-b border-stone py-4 first:border-t">
                <ArtImage image={{ src: null, alt: `${m.name} surface`, plate: m.plate }} ratio="1/1" tag={false} />
                <div>
                  <h3 className="display text-[1.5rem] leading-none">{t(m.name)}</h3>
                  <p className="caption mt-1.5">{t(m.note)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Light sliding along polished steel: a generated mood clip of the material (VIDEO-GENERATION.md, V2), not a work. */}
        <figure className="mt-16 md:mt-24">
          <div className="relative aspect-[4/3] overflow-hidden bg-basalt sm:aspect-[16/9] lg:aspect-[21/9]">
            <AmbientVideo src="/ambient/steel-light.mp4" poster="/ambient/steel-light.webp" className="absolute inset-0 h-full w-full" />
          </div>
          <figcaption className="caption mt-3">{t(materials[0].name)}</figcaption>
        </figure>
      </section>

      <section aria-labelledby="workshop-title" className="cv-auto bg-paper py-28 md:py-40">
        <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12">
          <figure className="col-span-12 sm:col-span-8 md:col-span-4">
            <ArtImage image={workshopImage} ratio="3/4" sizes="(min-width: 768px) 33vw, 100vw" />
            <figcaption className="caption mt-3">{t(workshopImage.alt)}</figcaption>
          </figure>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <SplitText as="h2" id="workshop-title" className="display text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)]" text="The workshop" />
            <Reveal as="p" className="mt-6 max-w-[52ch] text-[1.04rem]">
              {t('The work is made in the workshop of {studio}, the studio {name} leads, at {place}, near {city}. Studio visits are by appointment.', { studio: site.studio, name: site.name, place: site.workshop.lines[1], city: site.basedIn })}
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="record-title" className="cv-auto wrap py-28 md:py-40">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <SplitText as="h2" id="record-title" className="display text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)]" text="Record" />
            <Link to="/exhibitions" className="text-link mt-8 inline-block text-[0.95rem]">{t('Exhibitions')}</Link>
            <a href={site.portfolioPdf} download className="arrow-link mt-8 flex w-fit">{t('Download portfolio (PDF)')}</a>
          </div>
          <div className="col-span-12 space-y-16 md:col-span-7 md:col-start-6">
            <CvList title={t('Education')} rows={[{ year: artist.education.year, text: `${t(artist.education.course)}, ${t(artist.education.school)}` }]} />
            <CvList
              title={t('Public works')}
              rows={artist.publicWorks.map((w) => ({
                year: w.year,
                text: (
                  <>
                    <Link to={workPath(projectBySlug[w.slug])} className="label-title text-[1.14em] hover:text-geru">{t(projectBySlug[w.slug].title)}</Link>, {t(w.place)}
                  </>
                ),
              }))}
            />
            <CvList
              title={t('Studio')}
              rows={[
                { year: site.since, text: t('{studio} founded in {city}', { studio: site.studio, city: site.basedIn }) },
              ]}
            />
            <CvList
              title={t('Exhibitions')}
              rows={shows.map((x) => ({
                year: x.start.slice(0, 4),
                text: (
                  <>
                    <span className="label-title text-[1.14em]">{t(x.title)}</span>, {t(x.kind).toLowerCase()}, {t(x.venue)}, {t(x.city)}. {dateRange(x, lang)}
                  </>
                ),
              }))}
            />
            <div>
              <h3 className="caption">{t('Press')}</h3>
              <PressClippings items={artist.press} className="mt-4" />
            </div>
            <div>
              <h3 className="caption">{t('Selected commissions')}</h3>
              <ul className="mt-3 columns-1 gap-x-8 sm:columns-2">
                {artist.commissions.map((c) => (
                  <li key={c} className="break-inside-avoid border-b border-stone py-2.5 text-[0.98rem]">{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Invitation />
    </>
  )
}

function CvList({ title, rows }) {
  if (!rows.length) return null
  return (
    <div>
      <h3 className="caption">{title}</h3>
      <ol className="mt-3">
        {rows.map((r, i) => (
          <li key={i} className="grid grid-cols-[4.5rem_1fr] gap-6 border-b border-stone py-3 first:border-t">
            <span className="text-[0.95rem] tabular-nums text-ink-soft">{r.year}</span>
            <span className="text-[1rem]">{r.text}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
