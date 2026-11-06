import { Link } from 'react-router'
import ArtImage from '../components/ArtImage'
import { artist, site } from '../data/site'
import { ImageReveal, Reveal, SplitText } from '../components/Motion'

// The artist, briefly: a photograph from the workshop, the short biography and how a work is made.
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
          <SplitText as="h2" id="artist-title" className="display text-[clamp(2.6rem,1.6rem+3vw,4.4rem)] leading-none" text={site.name} />
          <p className="caption mt-3">{site.role}, {site.basedIn}</p>
          <Reveal>
            <p className="mt-8 text-[1.02rem]">{artist.shortBio}</p>
            <p className="mt-4 text-[1.02rem] text-ink-soft">{artist.practice[0]}</p>
          </Reveal>
          <Link to="/about" className="text-link mt-8 inline-block text-[0.95rem]">About {site.name}</Link>
        </div>
      </div>
    </section>
  )
}
