import { Link } from 'react-router'
import ArtImage from '../components/ArtImage'
import { artist, site } from '../data/site'
import { ImageReveal, Reveal, SplitText } from '../components/Motion'
import { useT } from '../i18n'

// The artist, briefly: a photograph from the workshop, the short biography and how a work is made.
export default function ArtistIntro() {
  const t = useT()
  return (
    <section aria-labelledby="artist-title" className="wrap pb-28 md:pb-40">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <figure className="col-span-12 sm:col-span-8 md:col-span-5">
          <ImageReveal>
            <ArtImage image={artist.portrait} ratio="4/5" sizes="(min-width: 768px) 40vw, 100vw" />
          </ImageReveal>
          <figcaption className="caption mt-3">{t(artist.portrait.alt)}</figcaption>
        </figure>
        <div className="col-span-12 self-end md:col-span-5 md:col-start-7 lg:col-span-4 lg:col-start-8">
          <p className="caption mb-3">{t(site.role)}</p>
          <SplitText as="h2" id="artist-title" className="display text-[clamp(2.6rem,1.6rem+3vw,4.4rem)] leading-none" text={site.name} />
          <p className="caption mt-3">{t(site.basedIn)}</p>
          <Reveal>
            <p className="mt-8 text-[1.02rem]">{t(artist.shortBio)}</p>
            <p className="mt-4 text-[1.02rem] text-ink-soft">{t(artist.statementFull[0])}</p>
          </Reveal>
          <Link to="/about" className="text-link mt-8 inline-block text-[0.95rem]">{t('About {name}', { name: site.name })}</Link>
        </div>
      </div>
    </section>
  )
}
