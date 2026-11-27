import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { Pause, Play } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import ArtImage, { srcSetOf } from '../components/ArtImage'
import { images } from '../data/images'
import { useT } from '../i18n'
import { ease, easeInOut } from '../components/Motion'
import { site } from '../data/site'
import { projectBySlug, workPath } from '../data/projects'
import { dateRange, featuredExhibition, statusOf } from '../data/exhibitions'
import { useMedia, useReducedMotion } from '../lib/media'
import { useToday } from '../lib/useToday'

/*
  The opening plate, in two scenes that take turns:
    "The artist" - the cut-out portrait stands at the right, the name is set in two lines on the left.
    "The work"   - one work stands on the name, which runs across the floor in a single line.
  On wide screens the letters of the name glide between the two arrangements; on phones the name
  stays stacked and the portrait and the work change places above it, standing on the name.
  The scenes change every SCENE_MS, pause while the hero is off screen or when the visitor presses
  pause, and do not change by themselves with reduced motion.
  The opening entrance (the name's letters, the portrait, the text) is CSS (.enter-up, .enter-fade
  in global.css), so on a first visit it plays as soon as the page arrives, before any script.
  `heroSlug` picks what scene 02 shows: any work's slug from projects.js, or 'kiran-adate' (the
  portrait, an unlisted entry there) - an unlisted entry links to About instead of a work page.

  The life of the work: when the work has its own dated making photographs (`making` in
  projects.js), scene 02 first walks through them, each for STAGE_MS, from the bare frame to the
  unveiling, with the date and stage under the title, then settles on the finished work and holds
  (frame 2.6 s, then 1.6 s a stage, finished from 9 s to 12 s).
  Real photographs only, never generated footage: this is the work itself. With reduced motion
  only the finished work is shown.
*/
const SCENE_MS = [8000, 12000] // the artist; the work (its life, then the finished work)
const STAGE_MS = 1600
const FIRST_STAGE_MS = 2600 // the first stage also waits for the scene's reveal to lift
export const heroSlug = 'sculpture-of-hawker'
// Where each making photograph is cropped to the hero's 3:4 frame, so the work stays in view.
const STAGE_POSITION = { 'kiran/hawker-welding': '30% 50%', 'kiran/hawker-unveiling': '50% 45%' }

// Scene 01's cut-out portrait, from images.js like every other photo.
const portrait = { ...images['portrait/kiran-adate'], alt: `Portrait of ${site.name}` }

export default function Hero() {
  const t = useT()
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const wide = useMedia('(min-width: 768px)') // screens at least `md` wide
  const inView = useInView(ref, { amount: 0.35 })
  const work = projectBySlug[heroSlug]
  const isWorkPage = work.listed !== false
  const SCENES = [t('The artist'), t(isWorkPage ? 'The work' : 'The portrait')]
  // The work's life: its dated making photographs, then the finished work.
  const stages = [
    ...((work.ownMaking && work.making) || []).filter((m) => m.image).map((m) => ({
      image: { ...m.image, alt: `${t(work.title)}: ${t(m.label)}, ${t(m.date)}`, position: STAGE_POSITION[m.image.id] },
      note: `${t(m.date)} · ${t(m.label)}`,
    })),
    { image: work.cover, note: null },
  ]
  const last = stages.length - 1

  // Scene and its timer. `progress` runs 0 to 1 across one scene and drives the indicator line.
  const [scene, setScene] = useState(0)
  const [paused, setPaused] = useState(false)
  // Which stage of the work's life is showing; changes only when a stage begins.
  const [stage, setStage] = useState(0)
  const firstScene = useRef(true)
  const progress = useMotionValue(0)
  const running = !paused && !reduce && inView
  useAnimationFrame((_, delta) => {
    if (!running) return
    const next = progress.get() + delta / SCENE_MS[scene]
    if (next >= 1) {
      progress.set(0)
      firstScene.current = false
      setStage(0)
      setScene((s) => (s + 1) % SCENES.length)
    } else progress.set(next)
  })
  useMotionValueEvent(progress, 'change', (v) => {
    if (scene !== 1) return
    const ms = v * SCENE_MS[1]
    const s = ms < FIRST_STAGE_MS ? 0 : Math.min(last, 1 + Math.floor((ms - FIRST_STAGE_MS) / STAGE_MS))
    if (s !== stage) setStage(s)
  })
  const shown = reduce ? last : stage
  const go = (i) => {
    firstScene.current = false
    progress.set(0)
    setStage(0)
    setScene(i)
  }

  // Scroll: the name rises and fades; on wide screens the portrait sinks (its cut edge stays below
  // the floor) and the work rises; on phones both move with the name they stand on.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const sinkY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const riseY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25])

  // Gallery light that follows the pointer; figure and name shift a few pixels in opposite
  // directions with it, so the figure seems to stand in front of the wall.
  const px = useMotionValue(0.7)
  const py = useMotionValue(0.3)
  const sx = useSpring(px, { stiffness: 40, damping: 18 })
  const sy = useSpring(py, { stiffness: 40, damping: 18 })
  // The light is one soft disc moved by transform (the GPU composites it), centred on the pointer.
  const lightX = useTransform(sx, (v) => `calc(${v * 100}vw - 50%)`)
  const lightY = useTransform(sy, (v) => `calc(${v * 100}svh - 50%)`)
  const figureX = useTransform(sx, [0, 1], [-12, 12])
  const nameX = useTransform(sx, [0, 1], [8, -8])
  const rotY = useTransform(sx, [0, 1], [-6, 6])
  const rotX = useTransform(sy, [0, 1], [5, -5])
  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }

  const today = useToday()
  const show = featuredExhibition(today)
  const showStatus = show && statusOf(show, today)
  const words = site.name.split(' ')
  const enterDelay = firstScene.current ? 0.35 : 0.15
  const isWork = scene === 1
  let n = 0

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      data-live={inView ? 'true' : 'false'}
      className="relative isolate flex h-[100svh] min-h-[640px] flex-col overflow-hidden"
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
    >
      {/* Gallery light falling across the wall, drifting after the pointer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 -z-10 h-[110vmax] w-[110vmax] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.6),rgb(255_255_255/0.2)_55%,transparent)]"
        style={{ x: reduce ? 'calc(70vw - 50%)' : lightX, y: reduce ? 'calc(30svh - 50%)' : lightY }}
      />

      <div className="wrap relative z-20 grid grid-cols-12 gap-x-6 pt-[calc(var(--header-h)+env(safe-area-inset-top,0px)+1.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
        <div className="enter-fade col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-4" style={{ '--enter-delay': '0.9s' }}>
          <p className="lede max-w-[18ch]">{t(site.tagline)}</p>
          <p className="caption mt-4 max-w-[34ch] md:mt-5 md:max-w-[30ch] [@media(max-height:700px)_and_(max-width:767px)]:hidden">
            {t('Carved, cast and welded in the studio’s own workshop near Mumbai.')}
          </p>
          {show && showStatus !== 'past' && (
            <Link to="/exhibitions" className="group mt-7 block max-w-[30ch]">
              <span className="caption block">{t(showStatus === 'current' ? 'Now showing' : 'Opening soon')}</span>
              <span className="mt-1 block text-[0.98rem] leading-snug">
                <span className="label-title text-[1.15rem] group-hover:text-geru">{t(show.title)}</span>
                <span className="block text-ink-soft">{t(show.venue)}, {t(show.city)}. {dateRange(show)}</span>
              </span>
            </Link>
          )}

          {/* Scene controls: choose a scene, watch its time run out, or pause the change */}
          <div role="group" aria-label={t('Opening views')} className="mt-6 flex items-end gap-5 md:mt-9">
            {SCENES.map((label, i) => (
              <button
                key={label}
                type="button"
                aria-pressed={scene === i}
                onClick={() => go(i)}
                className={`group w-[6.5rem] text-left transition-colors duration-300 ${scene === i ? 'text-ink' : 'text-ink-soft hover:text-ink'}`}
              >
                <span className="caption block text-current">
                  <span className="tabular-nums">0{i + 1}</span>
                  <span className="ml-2">{label}</span>
                </span>
                <span className="relative mt-2 block h-px overflow-hidden bg-ink/15">
                  <motion.span
                    className="absolute inset-0 origin-left bg-geru"
                    style={{ scaleX: scene === i ? (reduce || paused ? 1 : progress) : 0 }}
                  />
                </span>
              </button>
            ))}
            {!reduce && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={t(paused ? 'Play the opening views' : 'Pause the opening views')}
                className="-mb-1 p-1.5 text-ink-soft transition-colors hover:text-ink"
              >
                {paused ? <Play size={13} strokeWidth={1.5} /> : <Pause size={13} strokeWidth={1.5} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* The stage: above the name on phones, the whole hero on wide screens */}
      <div className="relative z-10 mt-4 min-h-0 flex-1 md:pointer-events-none md:absolute md:inset-0 md:mt-0" aria-live={running ? 'off' : 'polite'}>
        <AnimatePresence>
          {scene === 0 ? (
            <motion.figure
              key="artist"
              aria-roledescription="slide"
              aria-label={t('{n} of {total}, {name}', { n: 1, total: 2, name: SCENES[0] })}
              style={reduce ? undefined : { x: figureX, y: wide ? sinkY : nameY }}
              className="absolute inset-0 md:inset-auto md:bottom-0 md:right-[5vw] md:h-[min(90svh,62vw)] lg:right-[7vw]"
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.8, ease } }}
            >
              {/* Warm light breathing behind the figure */}
              <span
                aria-hidden="true"
                className="glow-breathe pointer-events-none absolute bottom-[-10%] right-[4vw] -z-10 aspect-square h-[110%] translate-x-[15%] rounded-full bg-[radial-gradient(closest-side,rgb(201_140_96/0.42),rgb(138_59_38/0.1)_58%,transparent)] md:right-auto md:left-[55%] md:-translate-x-1/2"
              />
              {/* The figure rises out of the floor inside this mask */}
              <div className="absolute bottom-0 right-[4vw] h-full overflow-hidden md:relative md:right-0">
                <picture className="contents">
                <source type="image/avif" srcSet={srcSetOf(portrait.files, true)} sizes="(min-width: 768px) 46vw, 80vw" />
                <img
                  src={portrait.files[800]}
                  srcSet={srcSetOf(portrait.files)}
                  sizes="(min-width: 768px) 46vw, 80vw"
                  width={portrait.w}
                  height={portrait.h}
                  alt={portrait.alt}
                  fetchPriority="high"
                  decoding="async"
                  className="enter-up block h-full w-auto max-w-none"
                  style={{ '--enter-from': '100%', '--enter-dur': '1.5s', '--enter-ease': 'var(--ease-gallery-in-out)', '--enter-delay': `${enterDelay}s` }}
                />
                </picture>
              </div>
            </motion.figure>
          ) : (
            <motion.figure
              key="work"
              aria-roledescription="slide"
              aria-label={t('{n} of {total}, {name}', { n: 2, total: 2, name: SCENES[1] })}
              style={reduce ? undefined : { y: wide ? riseY : nameY }}
              className="absolute inset-0 md:inset-auto md:bottom-[calc(2svh+14vw+1.5rem)] md:right-[15vw] md:h-[min(62svh,calc(100svh-var(--header-h)-5rem-2svh-14vw))] lg:right-[17vw]"
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.8, ease } }}
            >
              <Link
                to={isWorkPage ? workPath(work) : '/about'}
                className="group pointer-events-auto absolute inset-0 block md:relative md:inset-auto md:h-full"
                aria-label={t(isWorkPage ? '{title}, view the work' : '{title}, about the artist', { title: work.title })}
              >
                <span aria-hidden="true" className="glow-breathe pointer-events-none absolute right-0 top-0 -z-10 aspect-square h-[100%] rounded-full bg-[radial-gradient(closest-side,rgb(201_140_96/0.4),rgb(138_59_38/0.1)_55%,transparent)] md:-inset-[18%] md:h-auto md:aspect-auto" />
                <motion.div
                  className="sheen absolute bottom-12 right-[4vw] top-0 aspect-[3/4] overflow-hidden shadow-[0_30px_60px_-30px_rgb(34_33_30/0.55)] transition-shadow duration-700 group-hover:shadow-[0_40px_80px_-30px_rgb(34_33_30/0.7)] md:relative md:inset-auto md:h-full"
                  style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformPerspective: 1100 }}
                >
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-10 bg-[var(--reveal,var(--color-limestone))]"
                      style={{ originY: 0 }}
                      initial={{ scaleY: 1 }}
                      animate={{ scaleY: 0 }}
                      transition={{ duration: 1.4, ease: easeInOut, delay: enterDelay }}
                    />
                  )}
                  <motion.div
                    className="h-full transition-transform duration-[1.2s] ease-gallery group-hover:scale-[1.04]"
                    initial={reduce ? false : { scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.8, ease, delay: enterDelay }}
                  >
                    {/* Each stage lies over the ones before it and fades in on top, so the frame never dims */}
                    {stages.map((st, i) => (
                      <div
                        key={st.image.id}
                        aria-hidden={i !== shown}
                        className="absolute inset-0"
                        style={{
                          zIndex: i,
                          opacity: i <= shown ? 1 : 0,
                          transform: i === shown ? 'scale(1)' : 'scale(1.06)',
                          transition: 'opacity 0.9s ease, transform 2.6s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <ArtImage image={st.image} fill priority={i === 0 || i === last} sizes="(min-width: 768px) 30vw, 70vw" />
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
                <motion.span
                  className="absolute bottom-0 right-[4vw] block text-right md:bottom-auto md:left-full md:right-auto md:top-0 md:w-[11rem] md:pl-5 md:text-left"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease, delay: enterDelay + 0.6 }}
                >
                  <span className="label-title block text-[1.05rem] leading-tight group-hover:text-geru md:text-[1.2rem]">{work.title}</span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={stages[shown].note || 'finished'}
                      className="caption mt-1 block"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.35 }}
                    >
                      {stages[shown].note || (isWorkPage ? [work.medium, work.year].filter(Boolean).join(', ') || 'Sculpture' : t(site.short))}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>
              </Link>
            </motion.figure>
          )}
        </AnimatePresence>
      </div>

      {/* The name along the floor: two lines beside the artist, one line beneath the work */}
      <motion.h1
        id="hero-title"
        style={reduce ? undefined : { y: nameY, x: nameX, opacity: fade }}
        className="display latin relative z-0 mt-auto px-[var(--gutter)] pb-[3svh] font-light leading-[0.82] tracking-[-0.03em] md:z-20 md:pb-[2svh]"
      >
        <span className="sr-only">{t('Sculptor {name}, {city}', { name: t(site.name), city: t(site.basedIn) })}</span>
        <span aria-hidden="true" className={`caption enter-fade mb-[0.6em] block text-[0.85rem] tracking-[0.22em] md:text-[0.95rem] ${isWork ? 'md:text-center' : ''}`} style={{ '--enter-delay': '0.35s' }}>
          {t(site.role)}
        </span>
        <span
          aria-hidden="true"
          className={`flex flex-col items-start text-[25vw] ${isWork ? 'md:flex-row md:justify-center md:gap-[0.2em] md:text-[15vw]' : 'md:text-[min(17vw,24svh)]'}`}
        >
          {words.map((word, wi) => (
            <motion.span
              key={wi}
              layout={!reduce}
              transition={{ layout: { duration: 1.3, ease: easeInOut } }}
              className="flex whitespace-nowrap"
            >
              {word.split('').map((ch) => {
                const i = n++
                return (
                  <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
                    <span className="enter-up inline-block" style={{ '--enter-delay': `${(0.1 + i * 0.045).toFixed(3)}s` }}>
                      {ch}
                    </span>
                  </span>
                )
              })}
            </motion.span>
          ))}
        </span>
      </motion.h1>
    </section>
  )
}
