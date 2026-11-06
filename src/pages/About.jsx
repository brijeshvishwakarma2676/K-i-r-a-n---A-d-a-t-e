import { Link } from 'react-router'
import Seo from '../components/Seo'
import ArtImage from '../components/ArtImage'
import { ClipReveal, Parallax, Reveal, ScrollWords, SplitText } from '../components/Motion'
import Invitation from '../sections/Invitation'
import Tone from '../components/Tone'
import { artist, site } from '../data/site'
import { materials } from '../data/disciplines'
import { dateRange, exhibitions } from '../data/exhibitions'

// A work at full width between the statement and the materials.
const siteImage = { id: 'gallery/sculptures/57', alt: 'Leaning figure with a silver mane, in a garden', position: '50% 55%' }
const workshopImage = { id: 'gallery/sculptures/54', alt: 'A Gandhi statue in the workshop, before finishing' }

const shows = [...exhibitions].sort((a, b) => (a.start < b.start ? 1 : -1))

export default function About() {
  return (
    <>
      <Seo title="About" description={artist.shortBio} />

      <Tone name="light" as="header" className="wrap grid grid-cols-12 gap-x-6 gap-y-12 pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <div className="col-span-12 flex flex-col md:col-span-7">
          <SplitText
            as="h1"
            className="display text-[clamp(3.6rem,1.8rem+7.4vw,9.5rem)] font-light leading-[0.84]"
            text={site.name}
            immediate
            delay={0.3}
            step={0.12}
          />
          <p className="caption mt-4">
            {site.role}, {site.basedIn}. Studio: {site.studio}, since {site.since}.
          </p>
          <Reveal as="p" delay={0.6} className="lede mt-auto max-w-[32ch] pt-12">{artist.shortBio}</Reveal>
        </div>
        <figure className="col-span-10 col-start-3 sm:col-span-7 sm:col-start-6 md:col-span-4 md:col-start-9">
          <ArtImage image={artist.portrait} ratio="3/4" priority sizes="33vw" />
          <figcaption className="caption mt-3">{artist.portrait.alt}</figcaption>
        </figure>
      </Tone>

      <Tone name="night">
      <section aria-labelledby="statement-title" className="wrap py-28 md:py-40">
        <figure className="grid grid-cols-12 gap-x-6">
          <h2 id="statement-title" className="caption col-span-12 mb-8 md:col-span-10 md:col-start-2">On the work</h2>
          <blockquote className="display col-span-12 text-[clamp(2rem,1.2rem+2.8vw,3.8rem)] italic leading-[1.08] md:col-span-10 md:col-start-2">
            <ScrollWords text={artist.statement} />
          </blockquote>
        </figure>

        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-32">
          <div className="col-span-12 md:col-span-4">
            <SplitText as="h2" className="display text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)]" text="The practice" />
            <p className="mt-6 max-w-[30ch] text-[1.15rem] italic text-ink-soft display">From a sketch to the finished piece.</p>
          </div>
          <Reveal className="prose-body col-span-12 text-[1.06rem] md:col-span-6 md:col-start-6">
            {artist.practice.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-label="On site">
        <ClipReveal>
          <Parallax amount={5} className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
            <ArtImage image={siteImage} fill sizes="100vw" />
          </Parallax>
        </ClipReveal>
        <p className="wrap caption mt-4">{siteImage.alt}</p>
      </section>
      </Tone>

      <Tone name="stone">
      <section aria-labelledby="materials-title" className="wrap py-28 md:py-40">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <SplitText as="h2" id="materials-title" className="display text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)]" text="Materials" />
            <p className="mt-6 max-w-[46ch] text-[1.04rem]">{artist.materialsNote}</p>
          </div>
          <ul className="col-span-12 md:col-span-6 md:col-start-7">
            {materials.map((m) => (
              <li key={m.name} className="grid grid-cols-[4.5rem_1fr] items-center gap-5 border-b border-stone py-4 first:border-t">
                <ArtImage image={{ src: null, alt: `${m.name} surface`, plate: m.plate }} ratio="1/1" tag={false} />
                <div>
                  <h3 className="display text-[1.5rem] leading-none">{m.name}</h3>
                  <p className="caption mt-1.5">{m.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      </Tone>
      <Tone name="clay">
      <section aria-labelledby="workshop-title" className="py-28 md:py-40">
        <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12">
          <figure className="col-span-12 sm:col-span-8 md:col-span-4">
            <ArtImage image={workshopImage} ratio="3/4" sizes="33vw" />
            <figcaption className="caption mt-3">{workshopImage.alt}</figcaption>
          </figure>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <SplitText as="h2" id="workshop-title" className="display text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)]" text="The workshop" />
            <Reveal as="p" className="mt-6 max-w-[52ch] text-[1.04rem]">
              The work is made in the workshop of {site.studio}, the studio {site.name} leads, at {site.workshop.lines[1]}, near {site.basedIn}. Studio visits are by appointment.
            </Reveal>
          </div>
        </div>
      </section>

      </Tone>
      <Tone name="light">
      <section aria-labelledby="record-title" className="wrap py-28 md:py-40">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <SplitText as="h2" id="record-title" className="display text-[clamp(2.2rem,1.4rem+2.8vw,3.8rem)]" text="Record" />
            <Link to="/exhibitions" className="text-link mt-8 inline-block text-[0.95rem]">Exhibitions</Link>
          </div>
          <div className="col-span-12 space-y-16 md:col-span-7 md:col-start-6">
            <CvList
              title="Studio"
              rows={[
                { year: site.since, text: `${site.studio} founded in ${site.basedIn}` },
              ]}
            />
            <CvList
              title="Exhibitions"
              rows={shows.map((x) => ({
                year: x.start.slice(0, 4),
                text: (
                  <>
                    <span className="label-title text-[1.14em]">{x.title}</span>, {x.kind.toLowerCase()}, {x.venue}, {x.city}. {dateRange(x)}
                  </>
                ),
              }))}
            />
            <div>
              <h3 className="caption">Selected commissions</h3>
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
      </Tone>
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
