import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { useReducedMotion } from '../lib/media'
import ArtImage, { photo } from './ArtImage'
import { Reveal } from './Motion'
import { useT } from '../i18n'

/*
  How a work was made, as a timeline (dated, or naming the work each photograph shows): a rule runs down the page and fills in geru as the
  visitor reads (a transform, so it costs nothing to animate). Each step has its date, a short
  label and note, and optionally a photograph that opens full screen through `onOpen(image)`.
  `steps` are a work's `making` entries (see src/data/projects.js).
*/
export default function MakingTimeline({ steps, onOpen, className = '' }) {
  const t = useT()
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  // The rule and the dots sit in the middle of the 4th grid column, the gap between date and photo.
  const rule = 'absolute bottom-2 top-2 left-[0.39rem] w-px md:left-[calc(100%*7/24-0.3125rem-0.5px)]'

  return (
    <ol ref={ref} className={`relative ${className}`}>
      <span aria-hidden="true" className={`${rule} bg-ink/15`} />
      <motion.span aria-hidden="true" className={`${rule} origin-top bg-geru`} style={reduce ? undefined : { scaleY: scrollYProgress }} />
      {steps.map((s, i) => {
        const size = s.image && photo(s.image)
        return (
          <Reveal as="li" key={`${s.label}-${i}`} className="relative grid grid-cols-12 gap-x-0 pb-16 pl-9 md:gap-x-6 last:pb-0 md:pb-24 md:pl-0">
            <span aria-hidden="true" className="absolute left-0 top-[0.35rem] h-[0.8rem] w-[0.8rem] rounded-full border border-geru bg-limestone md:left-[calc(100%*7/24-0.3125rem-0.4rem)]" />
            <div className="col-span-12 md:col-span-3 md:pr-10 md:text-right">
              {s.date && <p className="caption tabular-nums">{t(s.date)}</p>}
              <h3 className={`display ${s.date ? 'mt-1' : ''} text-[clamp(1.7rem,1.3rem+1.2vw,2.4rem)] leading-none`}>{t(s.label)}</h3>
            </div>
            {s.image && (
              <div className="col-span-12 mt-5 md:col-span-6 md:col-start-5 md:mt-0 lg:col-span-5 lg:col-start-5">
                <button type="button" onClick={() => onOpen?.(s.image)} className="group block w-full cursor-zoom-in" aria-label={t('View {title} full screen', { title: t(s.label) })}>
                  <div className="sheen overflow-hidden" style={size ? { maxWidth: `calc(62svh * ${size.w / size.h})` } : undefined}>
                    <div className="transition-transform duration-[1.2s] ease-gallery group-hover:scale-[1.04]">
                      <ArtImage image={s.image} ratio="natural" sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 90vw" />
                    </div>
                  </div>
                </button>
              </div>
            )}
            <p className={`col-span-12 max-w-[48ch] text-[1rem] md:col-span-6 md:col-start-5 ${s.image ? 'mt-4 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:self-end' : 'mt-3 md:mt-0'}`}>{t(s.note)}</p>
          </Reveal>
        )
      })}
    </ol>
  )
}
