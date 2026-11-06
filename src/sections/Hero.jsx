import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import ArtImage from '../components/ArtImage'
import { ease } from '../components/Motion'
import { site } from '../data/site'
import { projectBySlug, workPath } from '../data/projects'
import { dateRange, featuredExhibition, statusOf } from '../data/exhibitions'

/*
  The opening plate. The studio's name is set at architectural scale along the floor of the
  screen, and one work stands on it, so the first thing a visitor sees is an object
  occupying space against the name. Change `heroSlug` to feature another work.
*/
const heroSlug = 'twisted-ribbon-form'

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const formY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25])

  // Gallery light that follows the pointer, and a slight turn of the work towards it.
  // Pointer is a 0 to 1 position across the hero; springs keep the movement slow.
  const px = useMotionValue(0.62)
  const py = useMotionValue(0.3)
  const sx = useSpring(px, { stiffness: 40, damping: 18 })
  const sy = useSpring(py, { stiffness: 40, damping: 18 })
  const lightX = useTransform(sx, (v) => `${v * 100}%`)
  const lightY = useTransform(sy, (v) => `${v * 100}%`)
  const light = useMotionTemplate`radial-gradient(ellipse 60% 55% at ${lightX} ${lightY}, rgb(255 255 255 / 0.62), transparent 70%)`
  const rotY = useTransform(sx, [0, 1], [-6, 6])
  const rotX = useTransform(sy, [0, 1], [5, -5])
  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const work = projectBySlug[heroSlug]
  const show = featuredExhibition()
  const showStatus = show && statusOf(show)
  const words = site.name.split(' ')
  let n = 0

  return (
    <section ref={ref} onPointerMove={onMove} className="relative isolate h-[100svh] min-h-[640px] overflow-hidden" aria-labelledby="hero-title">
      {/* Gallery light falling across the wall, drifting after the pointer */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: reduce ? 'radial-gradient(ellipse 70% 60% at 62% 30%, rgb(255 255 255 / 0.55), transparent 70%)' : light }}
      />

      <div className="wrap relative z-20 grid grid-cols-12 gap-x-6 pt-[calc(var(--header-h)+env(safe-area-inset-top,0px)+2rem)] md:pt-[calc(var(--header-h)+4rem)]">
        <motion.div
          className="col-span-7 md:col-span-5 lg:col-span-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.9 }}
        >
          <p className="lede max-w-[18ch]">{site.tagline}</p>
          <p className="caption mt-5 max-w-[30ch]">
            {site.role}, {site.basedIn}. Sculpture, murals and architectural art with the studio {site.studio}, since {site.since}.
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
        </motion.div>
      </div>

      {/* The name, set along the floor of the screen */}
      <motion.h1
        id="hero-title"
        style={reduce ? undefined : { y: nameY, opacity: fade }}
        className="display absolute inset-x-0 bottom-[3svh] z-0 px-[var(--gutter)] font-light leading-[0.82] tracking-[-0.03em] md:bottom-[2svh]"
      >
        <span className="sr-only">{site.name}, {site.role.toLowerCase()}, {site.basedIn}</span>
        <span aria-hidden="true" className="flex flex-col text-[25vw] md:flex-row md:justify-center md:gap-[0.2em] md:text-[15vw]">
          {words.map((word, wi) => (
            <span key={wi} className="flex whitespace-nowrap">
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
            </span>
          ))}
        </span>
      </motion.h1>

      {/* One work, standing on the name */}
      <motion.div
        style={reduce ? undefined : { y: formY }}
        className="absolute right-[var(--gutter)] top-[calc(var(--header-h)+1.5rem)] z-10 w-[38vw] sm:w-[34vw] md:top-auto md:bottom-[calc(2svh+14vw+1.5rem)] md:right-[15vw] md:w-auto md:h-[min(62svh,calc(100svh-var(--header-h)-5rem-2svh-14vw))] lg:right-[17vw]"
      >
        <motion.div
          className="h-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease, delay: 0.45 }}
        >
          <Link to={workPath(work)} className="group relative block h-full" aria-label={`${work.title}, view the work`}>
            {/* Warm light breathing behind the work */}
            <span aria-hidden="true" className="glow-breathe pointer-events-none absolute -inset-[18%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(201_140_96/0.45),rgb(138_59_38/0.12)_55%,transparent)] blur-2xl" />
            <motion.div
              className="sheen aspect-[3/4] h-full overflow-hidden shadow-[0_30px_60px_-30px_rgb(34_33_30/0.55)] transition-shadow duration-700 group-hover:shadow-[0_40px_80px_-30px_rgb(34_33_30/0.7)]"
              style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformPerspective: 1100 }}
            >
              <div className="h-full transition-transform duration-[1.2s] ease-gallery group-hover:scale-[1.04]">
                <ArtImage image={work.cover} fill priority sizes="(min-width: 768px) 30vw, 40vw" />
              </div>
            </motion.div>
            <span className="mt-3 block text-right md:absolute md:left-full md:top-0 md:mt-0 md:w-[11rem] md:pl-5 md:text-left">
              <span className="label-title block text-[1.05rem] leading-tight group-hover:text-geru md:text-[1.2rem]">{work.title}</span>
              <span className="caption mt-1 block">{work.code}</span>
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
