import { Link } from 'react-router'
import { Marquee, Reveal } from '../components/Motion'
import { artist } from '../data/site'
import { projectBySlug, workPath } from '../data/projects'
import { useT } from '../i18n'

/*
  What the papers said: the headlines of the press coverage, in English, Hindi and Marathi, drifting
  across the page (a CSS transform, paused under the pointer), with a link to the clippings on the
  work's page. Headlines are the papers' own words, from artist.press in src/data/site.js.
*/
export default function PressBand() {
  const t = useT()
  const items = artist.press
  const work = projectBySlug[items[0]?.work]
  if (!items.length || !work) return null
  return (
    <section aria-labelledby="pressband-title" className="overflow-hidden border-y border-stone py-20 md:py-28">
      <div className="wrap flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="pressband-title" className="caption">{t('In the press, on the {title}', { title: work.title })}</h2>
        <Link to={`${workPath(work)}#press-title`} className="text-link text-[0.95rem]">{t('Read the clippings')}</Link>
      </div>
      <Marquee seconds={70} className="mt-10 md:mt-14">
        {items.map((x) => (
          <span key={x.image} className="flex items-baseline gap-5 pr-16">
            <span className="label-title whitespace-nowrap text-[clamp(2.2rem,1.4rem+3vw,4.4rem)] leading-none">“{x.title}”</span>
            <span className="caption whitespace-nowrap">{t(x.outlet.split(',')[0])}</span>
            <span aria-hidden="true" className="ml-11 text-geru">✦</span>
          </span>
        ))}
      </Marquee>
      {/* The headlines as a list for screen readers, since the moving band is hidden from them. */}
      <ul className="sr-only">
        {items.map((x) => <li key={x.image}>“{x.title}”, {t(x.outlet)}</li>)}
      </ul>
      <div className="wrap mt-10 md:mt-14">
        <Reveal as="p" className="max-w-[60ch] text-[1rem]">
        {t('The {title} was unveiled in Nagpur on 6 January 2015 by a senior hawker, Gajanan Meshram, in the presence of the Chief Minister of Maharashtra, Devendra Fadnavis.', { title: work.title })}
        </Reveal>
      </div>
    </section>
  )
}
