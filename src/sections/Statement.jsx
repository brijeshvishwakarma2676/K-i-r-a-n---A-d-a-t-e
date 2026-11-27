import { Link } from 'react-router'
import { artist, site } from '../data/site'
import { Reveal, ScrollWords } from '../components/Motion'
import AmbientVideo from '../components/AmbientVideo'
import { clip } from '../components/StudyFrames'
import { useT } from '../i18n'

/*
  His words, over a beam of light with fine marble dust drifting in it: a generated mood clip
  (VIDEO-GENERATION.md, H1), home page only, kept dim and to the right so the words stay clear.
*/
export default function Statement() {
  const t = useT()
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="statement-title">
      <AmbientVideo {...clip('home-dust')} className="absolute inset-0 -z-20 h-full w-full" style={{ objectPosition: '70% 30%' }} />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgb(38_37_34/0.62)] md:bg-[linear-gradient(to_right,rgb(38_37_34/0.88)_0%,rgb(38_37_34/0.5)_45%,rgb(38_37_34/0.08)_100%)]" />
      <div className="wrap py-28 md:py-44">
      <h2 id="statement-title" className="sr-only">{t('In the artist’s words')}</h2>
      <div className="grid grid-cols-12 gap-x-6">
        <figure className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-9 lg:col-start-3">
          <blockquote className="display text-[clamp(1.9rem,1.2rem+2.8vw,3.7rem)] leading-[1.08] tracking-[-0.01em]">
            <ScrollWords key={t(artist.quote.text)} text={artist.quote.text} />
          </blockquote>
          <Reveal as="figcaption" className="mt-10 flex flex-wrap items-baseline justify-between gap-6">
            <span className="caption">{t('{name}, on the Sculpture of Hawker. {source}', { name: site.name, source: artist.quote.source })}</span>
            <Link to="/about" className="text-link text-[0.95rem]">{t('About {name}', { name: site.name })}</Link>
          </Reveal>
        </figure>
      </div>
      </div>
    </section>
  )
}
