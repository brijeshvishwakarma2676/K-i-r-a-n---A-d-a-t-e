import { Link } from 'react-router'
import ArtImage from '../components/ArtImage'
import { ClipReveal, Parallax, Reveal, SplitText } from '../components/Motion'
import { disciplineBySlug } from '../data/disciplines'
import { projectBySlug, workPath } from '../data/projects'

// One work given the full width of the screen, the way a museum gives a major piece its own room.
// `view` picks which photograph of the work to show (0 is the cover).
export default function Monument({ slug = 'lion-of-machine-parts', view = 0, text }) {
  const p = projectBySlug[slug]
  const image = [p.cover, ...p.gallery][view] || p.cover
  const d = disciplineBySlug[p.discipline]
  return (
    <section aria-labelledby="monument-title" className="pb-28 md:pb-40">
      <ClipReveal>
        <Parallax amount={5} className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]">
          <ArtImage image={image} fill sizes="100vw" />
        </Parallax>
      </ClipReveal>
      <div className="wrap mt-6 grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="col-span-12 md:col-span-6">
          <SplitText as="h2" id="monument-title" className="label-title text-[clamp(2rem,4vw,3.25rem)] leading-none" text={p.title} />
          <p className="caption mt-3">
            {[d.name, p.medium, p.code].filter(Boolean).join('. ')}
          </p>
        </div>
        <Reveal as="p" delay={0.15} className="col-span-12 max-w-[46ch] text-[0.98rem] md:col-span-4 md:col-start-8">
          {text || 'A lion built from machine parts. Shown here finished; its page also shows it taking shape in the workshop.'}
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
