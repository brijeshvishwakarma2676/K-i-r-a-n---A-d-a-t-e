import { Link } from 'react-router'
import ArtImage from '../components/ArtImage'
import { ClipReveal, Parallax, Reveal, SplitText } from '../components/Motion'
import { disciplineBySlug } from '../data/disciplines'
import { projectBySlug, workPath } from '../data/projects'

// One work given the full width of the screen, the way a museum gives a major piece its own room.
// `view` picks which photograph of the work to show (0 is the cover); `position` frames it in the
// band and `aspect` sets the band's shape on large screens (a 4:3 photograph needs 16:9 to keep
// a whole statue in view; 21:9 suits wide photographs).
export default function Monument({ slug = 'statue-of-freedom-of-press', view = 2, position = '50% 28%', aspect = 'lg:aspect-[16/9]', text }) {
  const p = projectBySlug[slug]
  const image = { ...([p.cover, ...p.gallery][view] || p.cover), position }
  const d = disciplineBySlug[p.discipline]
  return (
    <section aria-labelledby="monument-title" className="pb-28 md:pb-40">
      <ClipReveal>
        <Parallax amount={4} className={`aspect-[4/5] sm:aspect-[16/10] ${aspect}`}>
          <ArtImage image={image} fill sizes="100vw" />
        </Parallax>
      </ClipReveal>
      <div className="wrap mt-6 grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="col-span-12 md:col-span-6">
          <SplitText as="h2" id="monument-title" className="label-title text-[clamp(2rem,4vw,3.25rem)] leading-none" text={p.title} />
          <p className="caption mt-3">
            {[d.name, p.medium, p.year].filter(Boolean).join('. ')}
          </p>
        </div>
        <Reveal as="p" delay={0.15} className="col-span-12 max-w-[46ch] text-[0.98rem] md:col-span-4 md:col-start-8">
          {text || 'Two figures reading the newspaper, carved in stone in 2006–07. The statue stands at Lokmat Media’s printing press in Butibori, Nagpur; its page follows it from the block to the night it was first lit.'}
        </Reveal>
        <div className="col-span-12 md:col-span-1 md:col-start-12 md:justify-self-end">
          <Link to={workPath(p)} className="text-link whitespace-nowrap text-[0.95rem]">
            View work
          </Link>
        </div>
      </div>
    </section>
  )
}
