import ArtImage from '../components/ArtImage'
import { Reveal } from '../components/Motion'
import { materials } from '../data/disciplines'
import { SplitText } from '../components/Motion'

// The studio and its materials: what the work is made of, and how it is made.
export default function Studio() {
  return (
    <section aria-labelledby="studio-title" className="bg-stone/70 py-28 md:py-40">
      <div className="wrap">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <SplitText as="h2" id="studio-title" className="display col-span-12 text-[clamp(2.4rem,1.4rem+3.6vw,4.6rem)] md:col-span-6" text="In the studio" />
          <Reveal as="p" className="col-span-12 max-w-[52ch] self-end text-[1.02rem] md:col-span-5 md:col-start-8">
            A work begins with a sketch, a reference or an idea. The studio develops the design and 3D-prints a miniature for approval; then the piece is modelled, cast, welded or carved in its own workshop, finished by hand, and fixed on site.
          </Reveal>
        </div>

        <ul className="no-scrollbar -mx-[var(--gutter)] mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] md:mx-0 md:mt-24 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {materials.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 0.08} className="group w-[68vw] shrink-0 snap-start sm:w-[40vw] md:w-auto">
              <div className="sheen overflow-hidden">
                <div className="transition-transform duration-[1.2s] ease-gallery group-hover:scale-[1.06]">
                  <ArtImage image={{ src: null, alt: `${m.name} surface`, plate: m.plate }} ratio="1/1" tag={false} />
                </div>
              </div>
              <h3 className="display mt-4 text-[1.6rem] leading-none">{m.name}</h3>
              <p className="caption mt-2 max-w-[30ch]">{m.note}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
