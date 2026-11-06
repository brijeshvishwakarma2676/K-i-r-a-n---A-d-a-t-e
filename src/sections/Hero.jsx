import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Pause, Play } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import ArtImage from '../components/ArtImage'
import { images } from '../data/images'
import { ease, easeInOut } from '../components/Motion'
import { site } from '../data/site'
import { projectBySlug, workPath } from '../data/projects'
import { dateRange, featuredExhibition, statusOf } from '../data/exhibitions'

/*
  The opening plate, in two scenes that take turns:
    "The artist" - the cut-out portrait stands at the right, the name is set in two lines on the left.
    "The work"   - one work stands on the name, which runs across the floor in a single line.
  On wide screens the letters of the name glide between the two arrangements; on phones the name
  stays stacked and the portrait and the work change places above it, standing on the name.
  The scenes change every SCENE_MS, pause while the hero is off screen or when the visitor presses
  pause, and do not change by themselves with reduced motion.
  `heroSlug` picks what scene 02 shows: any work's slug from projects.js, or 'kiran-adate' (the
  portrait, an unlisted entry there) - an unlisted entry links to About instead of a work page.
*/
const SCENE_MS = 8000
const heroSlug = 'twisted-ribbon-form'

// Scene 01's cut-out portrait, from images.js like every other photo.
const portrait = { ...images['portrait/kiran-adate'], alt: `Portrait of ${site.name}` }

// True on screens at least `md` wide, kept in step with resizing.
function useWide() {
  const query = '(min-width: 768px)'
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const wide = useWide()
  const inView = useInView(ref, { amount: 0.35 })
  const work = projectBySlug[heroSlug]
  const isWorkPage = work.listed !== false
  const SCENES = ['The artist', isWorkPage ? 'The work' : 'The portrait']

  // Scene and its timer. `progress` runs 0 to 1 across one scene and drives the indicator line.
  const [scene, setScene] = useState(0)
  const [paused, setPaused] = useState(false)
  const firstScene = useRef(true)
  const progress = useMotionValue(0)
  const running = !paused && !reduce && inView
  useAnimationFrame((_, delta) => {
    if (!running) return
    const next = progress.get() + delta / SCENE_MS
    if (next >= 1) {
      progress.set(0)
      firstScene.current = false
      setScene((s) => (s + 1) % SCENES.length)
    } else progress.set(next)
  })
  const go = (i) => {
    firstScene.current = false
    progress.set(0)
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
  const lightX = useTransform(sx, (v) => `${v * 100}%`)
  const lightY = useTransform(sy, (v) => `${v * 100}%`)
  const light = useMotionTemplate`radial-gradient(ellipse 60% 55% at ${lightX} ${lightY}, rgb(255 255 255 / 0.62), transparent 70%)`
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

  const show = featuredExhibition()
  const showStatus = show && statusOf(show)
  const words = site.name.split(' ')
  const enterDelay = firstScene.current ? 0.35 : 0.15
  const isWork = scene === 1
  let n = 0

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate flex h-[100svh] min-h-[640px] flex-col overflow-hidden"
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
    >
      {/* Gallery light falling across the wall, drifting after the pointer */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: reduce ? 'radial-gradient(ellipse 70% 60% at 70% 30%, rgb(255 255 255 / 0.55), transparent 70%)' : light }}
      />

      <div className="wrap relative z-20 grid grid-cols-12 gap-x-6 pt-[calc(var(--header-h)+env(safe-area-inset-top,0px)+1.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
        <motion.div
          className="col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.9 }}
        >
          <p className="lede max-w-[18ch]">{site.tagline}</p>
          <p className="caption mt-4 max-w-[34ch] md:mt-5 md:max-w-[30ch] [@media(max-height:700px)_and_(max-width:767px)]:hidden">
            {site.role}, {site.basedIn}. Figures, devotional forms, animals and abstract work, and relief murals.
          </p>
          {show && showStatus !== 'past' && (
            <Link to="/exhibitions" className="group mt-7 block max-w-[30ch]">
              <span className="caption block">{showStatus === 'current' ? 'Now showing' : 'Opening soon'}</span>
              <span className="mt-1 block text-[0.98rem] leading-snug">
                <span className="label-title text-[1.15rem] group-hover:text-geru">{show.title}</span>
                <span className="block text-ink-soft">{show.venue}, {show.city}. {dateRange(show)}</span>
              </span>
            </Link>
          )}

          {/* Scene controls: choose a scene, watch its time run out, or pause the change */}
          <div role="group" aria-label="Opening views" className="mt-6 flex items-end gap-5 md:mt-9">
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
                aria-label={paused ? 'Play the opening views' : 'Pause the opening views'}
                className="-mb-1 p-1.5 text-ink-soft transition-colors hover:text-ink"
              >
                {paused ? <Play size={13} strokeWidth={1.5} /> : <Pause size={13} strokeWidth={1.5} />}
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* The stage: above the name on phones, the whole hero on wide screens */}
      <div className="relative z-10 mt-4 min-h-0 flex-1 md:pointer-events-none md:absolute md:inset-0 md:mt-0" aria-live={running ? 'off' : 'polite'}>
        <AnimatePresence>
          {scene === 0 ? (
            <motion.figure
              key="artist"
              aria-roledescription="slide"
              aria-label={`1 of 2, ${SCENES[0]}`}
              style={reduce ? undefined : { x: figureX, y: wide ? sinkY : nameY }}
              className="absolute inset-0 md:inset-auto md:bottom-0 md:right-[5vw] md:h-[min(90svh,62vw)] lg:right-[7vw]"
              exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: 0.8, ease } }}
            >
              {/* Warm light breathing behind the figure */}
              <span
                aria-hidden="true"
                className="glow-breathe pointer-events-none absolute bottom-[-10%] right-[4vw] -z-10 aspect-square h-[110%] translate-x-[15%] rounded-full bg-[radial-gradient(closest-side,rgb(201_140_96/0.42),rgb(138_59_38/0.1)_58%,transparent)] blur-2xl md:right-auto md:left-[55%] md:-translate-x-1/2"
              />
              {/* The shadow sits on this wrapper so the image's reveal clip cannot cut it off */}
              <div className="absolute bottom-0 right-[4vw] h-full drop-shadow-[0_30px_40px_rgb(34_33_30/0.18)] md:relative md:right-0">
                <motion.img
                  src={portrait.files[800]}
                  srcSet={Object.entries(portrait.files).map(([w, url]) => `${url} ${w}w`).join(', ')}
                  sizes="(min-width: 768px) 46vw, 80vw"
                  width={portrait.w}
                  height={portrait.h}
                  alt={portrait.alt}
                  fetchPriority="high"
                  decoding="async"
                  className="block h-full w-auto max-w-none"
                  initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)', y: 40 }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', y: 0 }}
                  transition={{ clipPath: { duration: 1.5, ease: easeInOut, delay: enterDelay }, y: { duration: 1.8, ease, delay: enterDelay } }}
                />
              </div>
            </motion.figure>
          ) : (
            <motion.figure
              key="work"
              aria-roledescription="slide"
              aria-label={`2 of 2, ${SCENES[1]}`}
              style={reduce ? undefined : { y: wide ? riseY : nameY }}
              className="absolute inset-0 md:inset-auto md:bottom-[calc(2svh+14vw+1.5rem)] md:right-[15vw] md:h-[min(62svh,calc(100svh-var(--header-h)-5rem-2svh-14vw))] lg:right-[17vw]"
              exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: 0.8, ease } }}
            >
              <Link
                to={isWorkPage ? workPath(work) : '/about'}
                className="group pointer-events-auto absolute inset-0 block md:relative md:inset-auto md:h-full"
                aria-label={isWorkPage ? `${work.title}, view the work` : `${work.title}, about the artist`}
              >
                <span aria-hidden="true" className="glow-breathe pointer-events-none absolute right-0 top-0 -z-10 aspect-square h-[100%] rounded-full bg-[radial-gradient(closest-side,rgb(201_140_96/0.4),rgb(138_59_38/0.1)_55%,transparent)] blur-2xl md:-inset-[18%] md:h-auto md:aspect-auto" />
                <motion.div
                  className="sheen absolute bottom-12 right-[4vw] top-0 aspect-[3/4] overflow-hidden shadow-[0_30px_60px_-30px_rgb(34_33_30/0.55)] transition-shadow duration-700 group-hover:shadow-[0_40px_80px_-30px_rgb(34_33_30/0.7)] md:relative md:inset-auto md:h-full"
                  style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformPerspective: 1100 }}
                  initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  transition={{ duration: 1.4, ease: easeInOut, delay: enterDelay }}
                >
                  <motion.div
                    className="h-full transition-transform duration-[1.2s] ease-gallery group-hover:scale-[1.04]"
                    initial={reduce ? false : { scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.8, ease, delay: enterDelay }}
                  >
                    <ArtImage image={work.cover} fill priority sizes="(min-width: 768px) 30vw, 70vw" />
                  </motion.div>
                </motion.div>
                <motion.span
                  className="absolute bottom-0 right-[4vw] block text-right md:bottom-auto md:left-full md:right-auto md:top-0 md:w-[11rem] md:pl-5 md:text-left"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease, delay: enterDelay + 0.6 }}
                >
                  <span className="label-title block text-[1.05rem] leading-tight group-hover:text-geru md:text-[1.2rem]">{work.title}</span>
                  <span className="caption mt-1 block">{isWorkPage ? [work.medium, work.year].filter(Boolean).join(', ') || 'Sculpture' : site.short}</span>
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
        className="display relative z-0 mt-auto px-[var(--gutter)] pb-[3svh] font-light leading-[0.82] tracking-[-0.03em] md:z-20 md:pb-[2svh]"
      >
        <span className="sr-only">{site.name}, {site.role.toLowerCase()}, {site.basedIn}</span>
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
                    <motion.span
                      className="inline-block"
                      initial={{ y: '105%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1.2, ease, delay: 0.1 + i * 0.045 }}
                    >
                      {ch}
                    </motion.span>
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
