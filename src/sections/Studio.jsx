import { Link } from 'react-router'
import ArtImage from '../components/ArtImage'
import { Reveal, SplitText } from '../components/Motion'
import { projectBySlug, workPath } from '../data/projects'

// How a work is made, shown with one work: the Statue of Freedom of Press, from the raw block in
// the stone yard to the finished statue. Photographs are the client's own, dated from the camera.
const work = projectBySlug['statue-of-freedom-of-press']
const steps = [
  { id: 'kiran/freedom-of-press-block', label: 'The block', note: 'Splitting the stone, November 2006' },
  { id: 'kiran/freedom-of-press-team', label: 'Roughing out', note: 'Cutting the block to shape, November 2006' },
  { id: 'kiran/freedom-of-press-dust', label: 'Carving', note: 'Working the forms, December 2006' },
  { id: 'kiran/freedom-of-press-carving', label: 'The figures', note: 'The figures and the newspaper, December 2006' },
  { id: 'kiran/freedom-of-press-in-the-yard', label: 'Finished', note: 'In the stone yard, March 2007', position: '50% 30%' },
]

export default function Studio() {
  return (
    <section aria-labelledby="studio-title" className="bg-stone/70 py-28 md:py-40">
      <div className="wrap">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <SplitText as="h2" id="studio-title" className="display col-span-12 text-[clamp(2.4rem,1.4rem+3.6vw,4.6rem)] md:col-span-6" text="From block to statue" />
          <Reveal className="col-span-12 max-w-[52ch] self-end md:col-span-5 md:col-start-8">
            <p className="text-[1.02rem]">
              A work begins with a sketch, a reference or an idea, and a small model that fixes the form. Then it is carved, cast or welded in the workshop and finished by hand. Here, the{' '}
              <Link to={workPath(work)} className="text-link">{work.title}</Link>, from block to statue.
            </p>
          </Reveal>
        </div>

        <ol className="no-scrollbar -mx-[var(--gutter)] mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] md:mx-0 md:mt-24 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.08} className="group w-[68vw] shrink-0 snap-start sm:w-[40vw] md:w-auto">
              <div className="sheen overflow-hidden">
                <div className="transition-transform duration-[1.2s] ease-gallery group-hover:scale-[1.06]">
                  <ArtImage image={{ id: s.id, alt: `${work.title}: ${s.note}`, position: s.position }} ratio="3/4" sizes="(min-width: 768px) 20vw, 68vw" />
                </div>
              </div>
              <p className="caption mt-4 tabular-nums">0{i + 1}</p>
              <h3 className="display mt-1 text-[1.6rem] leading-none">{s.label}</h3>
              <p className="caption mt-2 max-w-[30ch]">{s.note}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
