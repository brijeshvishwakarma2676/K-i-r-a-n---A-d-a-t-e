import { Link } from 'react-router'
import ArtImage from '../components/ArtImage'
import { ClipReveal, Parallax, Reveal, SplitText } from '../components/Motion'
import { disciplineBySlug } from '../data/disciplines'
import { projectBySlug, workPath } from '../data/projects'
import { useT } from '../i18n'

// One work given a room of its own, the way a museum hangs a major piece. `view` picks which
// photograph of the work to show (0 is the cover); `position` frames it and `aspect` sets the plate's
// shape. The default shows the whole 4:3 daylight photograph, from the figures' heads to the plaque,
// full width on phones and as a large centred plate on wider screens.
export default function Monument({ slug = 'statue-of-freedom-of-press', view = 2, position = '50% 50%', aspect = 'aspect-[4/3]', text }) {
  const t = useT()
  const p = projectBySlug[slug]
  const image = { ...([p.cover, ...p.gallery][view] || p.cover), position }
  const d = disciplineBySlug[p.discipline]
  return (
    <section aria-labelledby="monument-title" className="pb-28 md:pb-40">
      <ClipReveal className="mx-auto max-w-[76rem] md:px-[var(--gutter)]">
        <Parallax amount={1.5} className={aspect}>
          <ArtImage image={image} fill sizes="(min-width: 76rem) 76rem, 100vw" />
        </Parallax>
      </ClipReveal>
      <div className="mx-auto mt-6 grid max-w-[76rem] grid-cols-12 gap-x-6 gap-y-4 px-[var(--gutter)]">
        <div className="col-span-12 md:col-span-6">
          <SplitText as="h2" id="monument-title" className="label-title text-[clamp(2rem,4vw,3.25rem)] leading-none" text={p.title} />
          <p className="caption mt-3">
            {[t(d.name), t(p.medium), p.year].filter(Boolean).join('. ')}
          </p>
        </div>
        <Reveal as="p" delay={0.15} className="col-span-12 max-w-[46ch] text-[0.98rem] md:col-span-4 md:col-start-8">
          {t(text || 'Two figures reading the newspaper, carved in stone in 2006–07. The statue stands at Lokmat Media’s printing press in Butibori, Nagpur; its page follows it from the raw block to the finished work.')}
        </Reveal>
        <div className="col-span-12 md:col-span-1 md:col-start-12 md:justify-self-end">
          <Link to={workPath(p)} className="text-link whitespace-nowrap text-[0.95rem]">
            {t('View work')}
          </Link>
        </div>
      </div>
    </section>
  )
}
