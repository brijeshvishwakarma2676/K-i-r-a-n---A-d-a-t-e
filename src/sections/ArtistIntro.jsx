import { Link } from 'react-router'
import ArtImage from '../components/ArtImage'
import { artist, site } from '../data/site'
import { projects } from '../data/projects'
import { disciplines } from '../data/disciplines'
import { Counter, ImageReveal, Reveal } from '../components/Motion'

// Figures taken from the site's own data, so they stay true as works are added.
const figures = [
  { n: projects.length, label: 'works in the catalogue' },
  { n: disciplines.length, label: 'bodies of work' },
  { n: artist.commissions.length, label: 'clients on record' },
  { n: artist.facility.length, label: 'workshop units' },
]
import { SplitText } from '../components/Motion'

export default function ArtistIntro() {
  return (
    <section aria-labelledby="artist-title" className="wrap pb-28 md:pb-40">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <figure className="col-span-12 sm:col-span-8 md:col-span-5">
          <ImageReveal>
            <ArtImage image={artist.portrait} ratio="4/5" sizes="40vw" />
          </ImageReveal>
          <figcaption className="caption mt-3">{artist.portrait.alt}</figcaption>
        </figure>
        <div className="col-span-12 self-end md:col-span-5 md:col-start-7 lg:col-span-4 lg:col-start-8">
          <SplitText as="h2" id="artist-title" className="display text-[clamp(2.6rem,1.6rem+3vw,4.4rem)] leading-none" text="The artist and the studio" />
          <p className="caption mt-3">{site.studio}. {site.studioRole}, {site.basedIn}, since {site.since}.</p>
          <Reveal>
            <p className="mt-8 text-[1.02rem]">{artist.shortBio}</p>
            <p className="mt-4 text-[1.02rem] text-ink-soft">{artist.practice[1]}</p>
          </Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-stone pt-6">
            {figures.map((f) => (
              <div key={f.label} className="flex flex-col gap-2">
                <dt className="caption">{f.label}</dt>
                <dd className="display order-first text-[clamp(2.4rem,1.8rem+1.8vw,3.4rem)] leading-none">
                  <Counter to={f.n} className="lining-nums" />
                </dd>
              </div>
            ))}
          </dl>
          <Link to="/about" className="text-link mt-8 inline-block text-[0.95rem]">About {site.name}</Link>
        </div>
      </div>
    </section>
  )
}
