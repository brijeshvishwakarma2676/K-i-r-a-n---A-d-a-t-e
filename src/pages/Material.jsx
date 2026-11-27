import { useState } from 'react'
import { Link } from 'react-router'
import { Pause, Play } from 'lucide-react'
import Seo from '../components/Seo'
import AmbientVideo, { AmbientPause } from '../components/AmbientVideo'
import { Basin, Frieze, Mounted, Niche, Panorama, StudyLabel, Window, clip } from '../components/StudyFrames'
import { Reveal, SplitText } from '../components/Motion'
import Invitation from '../sections/Invitation'
import { site } from '../data/site'
import { useReducedMotion } from '../lib/media'
import { useT } from '../i18n'

/*
  Material and light: the moving studies, walked through like the rooms of a small exhibition,
  each shown in its own way (a wall, a yard, a slab, a frieze, a mounted tile, a basin, a niche, a
  pair of plates, a window, an empty plinth) and none like a video player. Every clip is a generated study of material (VIDEO-GENERATION.md): silent, looping,
  playing only while on screen. None shows a work of his or its making, and the page says so.
*/
// Stone first, from the yard to the last strike; then water and the metals; then the workshop at
// rest and the empty plinth, waiting for a work.
const studies = [
  { id: 'touch', title: 'Touch', what: 'Marble and the hand' },
  { id: 'yard', title: 'The yard', what: 'Marble blocks in a stone yard, at dawn' },
  { id: 'surface', title: 'Surface', what: 'Marble, split and chiselled, at sunrise' },
  { id: 'chip', title: 'Chip', what: 'Chisel and marble' },
  { id: 'hand', title: 'The hand', what: 'The chisel, held' },
  { id: 'relief', title: 'Relief', what: 'A carved wall in raking light' },
  { id: 'water', title: 'Water', what: 'Water over dark stone' },
  { id: 'light', title: 'Light', what: 'Polished stainless steel' },
  { id: 'patina', title: 'Patina', what: 'Cast bronze, rubbed back' },
  { id: 'weather', title: 'Weather', what: 'Weathering steel and stainless steel, in rain' },
  { id: 'workshop', title: 'The workshop', what: 'The bench at the end of the day' },
  { id: 'plinth', title: 'The plinth', what: 'An empty plinth in a white room' },
].map((s, i) => ({ ...s, n: String(i + 1).padStart(2, '0') }))
const [touch, yard, surface, chip, hand, relief, water, light, patina, weather, workshop, plinth] = studies

const H2 = 'display text-[clamp(3rem,1.6rem+5vw,7rem)] font-light leading-[0.9]'

export default function Material() {
  const t = useT()
  const reduce = useReducedMotion()
  const [held, setHeld] = useState(false)

  return (
    <AmbientPause.Provider value={held}>
      <Seo
        title="Material and light"
        description="Moving studies of stone, bronze, steel, light and the hand: silent loops, shown the way a material is seen in a sculptor's workshop."
      />

      {/* 01 Touch: the whole first wall */}
      <header id={touch.id} className="on-dark relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-basalt text-bone">
        <AmbientVideo
          {...clip('hand-on-stone')}
          className="absolute inset-0 -z-20 h-full w-full scale-[1.03] blur-[1.5px] brightness-[0.72]"
        />
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(20_19_18/0.9),rgb(20_19_18/0.35)_55%,rgb(20_19_18/0.15))]" />
        <div className="wrap grid grid-cols-12 gap-x-6 gap-y-10 pb-12 pt-[calc(var(--header-h)+4rem)] md:pb-16">
          <div className="col-span-12 md:col-span-8">
            <p className="caption mb-4">{t('Moving studies')}</p>
            <SplitText as="h1" immediate delay={0.2} className="display text-[clamp(3.2rem,1.6rem+6.4vw,8.5rem)] font-light leading-[0.88]" text="Material and light" />
            <Reveal as="p" delay={0.5} className="lede mt-8 max-w-[30ch]">
              {t('Before a block is cut, it is read with the hand: its grain, its weight, where it will give.')}
            </Reveal>
          </div>
          <div className="col-span-12 flex flex-col justify-end gap-8 md:col-span-3 md:col-start-10">
            <nav aria-label={t('The studies')}>
              <ol className="grid grid-cols-2 gap-x-6 border-t border-bone/20 md:gap-x-4">
                {studies.map((s) => (
                  <li key={s.id} className="border-b border-bone/20">
                    <a href={`#${s.id}`} className="flex gap-3 py-2 text-[0.98rem] transition-colors hover:text-[#E3B48F]">
                      <span className="caption tabular-nums">{s.n}</span>
                      <span className="label-title text-[1.14em]">{t(s.title)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            {!reduce && (
              <button
                type="button"
                onClick={() => setHeld((h) => !h)}
                aria-pressed={held}
                className="caption flex w-fit items-center gap-2 transition-colors hover:text-bone"
              >
                {held ? <Play size={13} strokeWidth={1.5} /> : <Pause size={13} strokeWidth={1.5} />}
                {t(held ? 'Play the studies' : 'Pause the studies')}
              </button>
            )}
            <StudyLabel n={touch.n} title={t(touch.title)}>{t(touch.what)}</StudyLabel>
          </div>
        </div>
      </header>

      {/* 02 The yard: a wide, low view across the stone */}
      <section id={yard.id} aria-labelledby="yard-title" className="cv-auto py-28 md:py-40">
        <div className="wrap grid grid-cols-12 gap-x-6 gap-y-8">
          <SplitText as="h2" id="yard-title" className={`${H2} col-span-12 md:col-span-5`} text={yard.title} />
          <Reveal as="p" className="lede col-span-12 max-w-[30ch] self-end md:col-span-6 md:col-start-7">
            {t('A work begins long before the first cut: in a yard of rough blocks, choosing the one with the right grain.')}
          </Reveal>
        </div>
        <Reveal className="mt-14 md:mt-20">
          <Panorama name="stone-yard" />
        </Reveal>
        <div className="wrap mt-5">
          <StudyLabel n={yard.n} title={t(yard.title)}>{t(yard.what)}</StudyLabel>
        </div>
      </section>

      {/* 03 Surface: a slab laid on the bench, its edge showing */}
      <section id={surface.id} aria-labelledby="surface-title" className="cv-auto room-clay py-28 md:py-40">
        <div className="wrap grid grid-cols-12 items-end gap-x-6 gap-y-10">
          <Reveal className="col-span-12 md:col-span-8">
            <div className="relative aspect-[4/3] overflow-hidden bg-basalt sm:aspect-[16/9]">
              <AmbientVideo {...clip('stone-surface')} className="absolute inset-0 h-full w-full" />
            </div>
            <div aria-hidden="true" className="h-3 bg-[linear-gradient(to_bottom,#B9B1A2,#D2CBBE)] md:h-5" />
          </Reveal>
          <div className="col-span-12 md:col-span-4">
            <SplitText as="h2" id="surface-title" className={H2} text={surface.title} />
            <Reveal as="p" className="mt-6 max-w-[34ch] text-[1.15rem] leading-relaxed">
              {t('Low sun finds every groove the chisel left, and every crystal it did not touch.')}
            </Reveal>
            <StudyLabel n={surface.n} title={t(surface.title)} className="mt-8">{t(surface.what)}</StudyLabel>
          </div>
        </div>
      </section>

      {/* 04 Chip: a frieze, set along the wall */}
      <section id={chip.id} aria-labelledby="chip-title" className="cv-auto py-28 md:py-40">
        <div className="wrap grid grid-cols-12 gap-x-6 gap-y-8">
          <SplitText as="h2" id="chip-title" className={`${H2} col-span-12 md:col-span-5`} text={chip.title} />
          <Reveal as="p" className="lede col-span-12 max-w-[28ch] self-end md:col-span-6 md:col-start-7">
            {t('Stone is only ever taken away, a chip at a time. Nothing can be put back.')}
          </Reveal>
        </div>
        <Reveal className="mt-14 md:mt-20 md:px-[var(--gutter)]">
          <Frieze name="stone-chips" />
        </Reveal>
        <div className="wrap mt-5">
          <StudyLabel n={chip.n} title={t(chip.title)}>{t(chip.what)}</StudyLabel>
        </div>
      </section>

      {/* 05 The hand: at the bench, beside a single line */}
      <section id={hand.id} aria-labelledby="hand-title" className="cv-auto room-clay py-28 md:py-40">
        <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-10 sm:col-span-6 md:col-span-4 md:col-start-2">
            <div className="relative aspect-[3/4] overflow-hidden bg-basalt">
              <AmbientVideo {...clip('hand-chisel')} className="absolute inset-0 h-full w-full" />
            </div>
            <StudyLabel n={hand.n} title={t(hand.title)} className="mt-4">{t(hand.what)}</StudyLabel>
          </Reveal>
          <div className="order-first col-span-12 flex flex-col justify-center md:order-none md:col-span-6 md:col-start-7">
            <SplitText as="h2" id="hand-title" className={H2} text={hand.title} />
            <Reveal as="p" className="lede mt-8 max-w-[26ch]">
              {t('Machines can rough out a form. The last of it is always done by hand.')}
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06 Relief: a tile mounted on the wall */}
      <section id={relief.id} aria-labelledby="relief-title" className="cv-auto py-28 md:py-40">
        <div className="wrap grid grid-cols-12 items-center gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <SplitText as="h2" id="relief-title" className={H2} text={relief.title} />
            <Reveal as="p" className="lede mt-8 max-w-[26ch]">
              {t('A relief lives on raking light: a few centimetres of carving, and the shadows read from across the room.')}
            </Reveal>
            <StudyLabel n={relief.n} title={t(relief.title)} className="mt-10">{t(relief.what)}</StudyLabel>
          </div>
          <Reveal className="col-span-11 sm:col-span-8 md:col-span-6 md:col-start-7">
            <Mounted name="relief-wall" />
          </Reveal>
        </div>
      </section>

      {/* 07 Water: looking down into a stone basin */}
      <section id={water.id} aria-labelledby="water-title" className="cv-auto room-clay py-28 md:py-40">
        <div className="wrap grid grid-cols-12 items-center gap-x-6 gap-y-12">
          <Reveal className="col-span-10 col-start-2 sm:col-span-8 sm:col-start-3 md:col-span-5 md:col-start-2">
            <Basin name="water-stone" />
          </Reveal>
          <div className="order-first col-span-12 md:order-none md:col-span-5 md:col-start-8">
            <SplitText as="h2" id="water-title" className={H2} text={water.title} />
            <Reveal as="p" className="lede mt-8 max-w-[26ch]">
              {t('Stone keeps still, water keeps moving over it. In a garden, the two make the work together.')}
            </Reveal>
            <StudyLabel n={water.n} title={t(water.title)} className="mt-10">{t(water.what)}</StudyLabel>
          </div>
        </div>
      </section>

      {/* 08 Light: a niche in a dark wall */}
      <section id={light.id} aria-labelledby="light-title" className="cv-auto room-dark py-28 md:py-40">
        <div className="wrap grid grid-cols-12 items-end gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <SplitText as="h2" id="light-title" className={H2} text={light.title} />
          </div>
          <Reveal className="col-span-8 col-start-3 sm:col-span-6 sm:col-start-4 md:col-span-4 md:col-start-5">
            <Niche name="steel-light" />
          </Reveal>
          <div className="col-span-12 md:col-span-3 md:col-start-10">
            <Reveal as="p" className="text-[1.15rem] leading-relaxed">
              {t('Polished steel has no colour of its own. It carries the room, and whoever walks past it.')}
            </Reveal>
            <StudyLabel n={light.n} title={t(light.title)} className="mt-8">{t(light.what)}</StudyLabel>
          </div>
        </div>
      </section>

      {/* 09 Patina: the whole wall, the light travelling over it */}
      <section id={patina.id} aria-labelledby="patina-title" className="on-dark relative isolate overflow-hidden bg-basalt text-bone">
        <AmbientVideo {...clip('bronze-patina')} className="absolute inset-0 -z-20 h-full w-full" />
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(20_19_18/0.8),rgb(20_19_18/0.1)_55%,transparent)]" />
        <div className="wrap grid min-h-[80svh] grid-cols-12 items-end gap-x-6 gap-y-8 pb-12 pt-40 md:min-h-[92svh] md:pb-16">
          <div className="col-span-12 md:col-span-7">
            <SplitText as="h2" id="patina-title" className={H2} text={patina.title} />
            <Reveal as="p" className="lede mt-6 max-w-[28ch]">
              {t('Bronze is poured once, then finished by hand: the high points rubbed bright, the hollows left to darken.')}
            </Reveal>
          </div>
          <StudyLabel n={patina.n} title={t(patina.title)} className="col-span-12 md:col-span-3 md:col-start-10">{t(patina.what)}</StudyLabel>
        </div>
      </section>

      {/* 10 Weather: one clip hung as a pair of plates, each steel on its own */}
      <section id={weather.id} aria-labelledby="weather-title" className="cv-auto py-28 md:py-40">
        <div className="wrap grid grid-cols-12 gap-x-6 gap-y-8">
          <SplitText as="h2" id="weather-title" className={`${H2} col-span-12 md:col-span-5`} text={weather.title} />
          <Reveal as="p" className="lede col-span-12 max-w-[30ch] self-end md:col-span-6 md:col-start-7">
            {t('Two steels in the same rain: one takes the weather into its colour, the other lets it run off.')}
          </Reveal>
        </div>
        <div className="wrap mt-14 grid grid-cols-2 gap-3 sm:gap-6 md:mt-20 md:w-[min(100%,64rem)]">
          {[
            ['0% 50%', 'Weathering steel'],
            ['100% 50%', 'Stainless steel'],
          ].map(([position, name], i) => (
            <Reveal key={name} delay={i * 0.12}>
              <div className="relative aspect-[3/4] overflow-hidden bg-basalt">
                <AmbientVideo {...clip('rain-two-steels')} className="absolute inset-0 h-full w-full" style={{ objectPosition: position }} />
              </div>
              <p className="caption mt-3">{t(name)}</p>
            </Reveal>
          ))}
        </div>
        <div className="wrap mt-8">
          <StudyLabel n={weather.n} title={t(weather.title)}>{t(weather.what)}</StudyLabel>
        </div>
      </section>

      {/* 11 The workshop: seen through its window */}
      <section id={workshop.id} aria-labelledby="workshop-title" className="cv-auto room-clay py-28 md:py-40">
        <div className="wrap grid grid-cols-12 gap-x-6 gap-y-8">
          <SplitText as="h2" id="workshop-title" className={`${H2} col-span-12 md:col-span-6`} text={workshop.title} />
          <Reveal as="p" className="lede col-span-12 max-w-[28ch] self-end md:col-span-5 md:col-start-8">
            {t('At the end of the day the tools are laid out again, in order, for the morning.')}
          </Reveal>
        </div>
        <Reveal className="wrap mt-14 md:mt-20">
          <Window name="workshop-bench" className="md:mx-auto md:w-[84%]" />
        </Reveal>
        <div className="wrap mt-6 md:pl-[calc(var(--gutter)+8%)]">
          <StudyLabel n={workshop.n} title={t(workshop.title)}>{t(workshop.what)}</StudyLabel>
        </div>
      </section>

      {/* 12 The plinth: the last room is empty, and leads to the works */}
      <section id={plinth.id} aria-labelledby="plinth-title" className="relative isolate overflow-hidden bg-[#BDB7AD]">
        <AmbientVideo {...clip('empty-plinth')} className="absolute inset-0 -z-20 h-full w-full" />
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(236_231_221/0.55),transparent_45%)]" />
        <div className="wrap flex min-h-[88svh] flex-col justify-between gap-12 pb-10 pt-24 text-[#22211E] md:min-h-[96svh] md:pb-14 md:pt-28">
          <div>
            <SplitText as="h2" id="plinth-title" className={H2} text={plinth.title} />
            <Reveal as="p" className="lede mt-6 max-w-[24ch]">{t('Every plinth is waiting for its work.')}</Reveal>
            <Reveal delay={0.15}>
              <Link to="/works" className="arrow-link mt-10 flex w-fit">{t('See the works')}</Link>
            </Reveal>
          </div>
          <StudyLabel n={plinth.n} title={t(plinth.title)} className="!text-[#3E3B35]">{t(plinth.what)}</StudyLabel>
        </div>
      </section>

      {/* What these are, plainly */}
      <section aria-label={t('About these studies')} className="wrap py-16 md:py-20">
        <p className="caption max-w-[70ch]">
          {t('These are studies of material and light, made with generative video. They show no work by {name} and no moment of its making: his works are shown in photographs, in Works.', { name: site.name })}
        </p>
      </section>

      <Invitation film={false} />
    </AmbientPause.Provider>
  )
}
