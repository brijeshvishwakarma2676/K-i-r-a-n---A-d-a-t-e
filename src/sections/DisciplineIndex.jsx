import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import ArtImage from '../components/ArtImage'
import { ease, ImageReveal, SplitText } from '../components/Motion'
import { disciplines } from '../data/disciplines'

/*
  The four bodies of work, shown as rooms. On large screens the image stays
  in place while the text scrolls past, and the image changes to match the discipline in view.
  On small screens each discipline carries its own image.
*/
export default function DisciplineIndex() {
  const [active, setActive] = useState(0)
  const current = disciplines[active]

  return (
    <section aria-labelledby="disciplines-title" className="bg-paper py-28 md:py-40">
      <div className="wrap">
        <SplitText as="h2" id="disciplines-title" className="display text-[clamp(2.4rem,1.4rem+3.6vw,4.6rem)]" text="Bodies of work" />

        <div className="mt-16 grid grid-cols-12 gap-x-6 md:mt-24">
          <div className="col-span-6 hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <div className="relative aspect-[4/5]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, clipPath: 'inset(0 0 0 12%)' }}
                    animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease }}
                  >
                    <ArtImage image={current.cover} fill sizes="50vw" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="caption mt-3">{current.cover.alt}</p>
            </div>
          </div>

          <ol className="col-span-12 lg:col-span-5 lg:col-start-8">
            {disciplines.map((d, i) => (
              <Entry key={d.slug} d={d} index={i} onActive={setActive} active={active === i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Entry({ d, index, onActive, active }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <li
      ref={ref}
      className="border-t border-stone py-12 first:border-t-0 first:pt-0 lg:flex lg:min-h-[66vh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0"
      onMouseEnter={() => onActive(index)}
      onFocus={() => onActive(index)}
    >
      <ImageReveal className="mb-8 lg:hidden">
        <ArtImage image={d.cover} ratio="4/5" sizes="100vw" />
      </ImageReveal>
      <h3 className={`display text-[clamp(2.4rem,1.6rem+2.6vw,3.8rem)] leading-[0.98] transition-colors duration-700 ${active ? 'text-ink' : 'lg:text-ink-soft'}`}>
        {d.name}
      </h3>
      <p className="display mt-5 text-[1.45rem] italic leading-snug" style={{ color: d.accent }}>
        {d.headline}
      </p>
      <p className="mt-5 max-w-[48ch] text-[0.98rem]">{d.intro}</p>
      <p className="caption mt-5">{d.materials.join(', ')}</p>
      <Link to={`/works/${d.slug}`} className="text-link mt-8 self-start text-[0.95rem]">
        See the works
      </Link>
    </li>
  )
}
