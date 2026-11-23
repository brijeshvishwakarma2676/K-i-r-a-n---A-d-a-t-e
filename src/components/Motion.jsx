import { Children, useEffect, useRef } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { useT } from '../i18n'
import { useReveal } from '../lib/reveal'
import { useReducedMotion } from '../lib/media'

/*
  The site's motion vocabulary. Everything is slow and eased, like light moving across a gallery
  wall, and everything falls back to a still page when the visitor asks for reduced motion.

  How it is built, for speed on modest phones:
    - Reveals as things come into view (ClipReveal, ImageReveal, Reveal, Stagger, SplitText) are
      CSS transitions started by one shared observer (src/lib/reveal.js), not a JavaScript
      animation per element. Their CSS is under "Reveals" in src/styles/global.css.
    - Entrances that play as a page opens (SplitText `immediate`) are CSS animations, so on the
      first visit they start as soon as the page's HTML and CSS arrive, without waiting for scripts.
    - framer-motion is kept for motion that follows the scroll position or the pointer
      (Parallax, ScrollWords, ScrollProgress), and elsewhere for page changes, drags and overlays.
  Only transform and opacity are animated: the GPU moves them without repainting the page.
*/
const ease = [0.22, 1, 0.36, 1]
const easeInOut = [0.76, 0, 0.24, 1]

const vars = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v != null))
const secs = (s) => (s ? `${s}s` : null)

// Reveals large images: the plate rises into view as a cover lifts off its upper part.
export function ClipReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <div ref={ref} className={`rv-clip relative overflow-hidden ${className}`} style={vars({ '--rv-delay': secs(delay) })}>
      {children}
      <span aria-hidden="true" className="reveal-cover pointer-events-none absolute inset-0 z-10 origin-top bg-[var(--reveal,var(--color-limestone))]" />
    </div>
  )
}

// An image uncovered from below while it settles from a slight zoom: used on every work card.
export function ImageReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <div ref={ref} className={`rv-image relative overflow-hidden ${className}`} style={vars({ '--rv-delay': secs(delay) })}>
      <div className="rv-zoom">{children}</div>
      <span aria-hidden="true" className="reveal-cover pointer-events-none absolute inset-0 z-10 origin-top bg-[var(--reveal,var(--color-limestone))]" />
    </div>
  )
}

// Gentle vertical drift of an image inside its frame while the frame scrolls past.
export function Parallax({ children, amount = 6, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={reduce ? undefined : { y, scale: 1 + (amount * 2.2) / 100 }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}

// Fades a block in while it rises a little into place.
export function Reveal({ children, className = '', delay = 0, y = 28, as: Tag = 'div', style, ...rest }) {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <Tag ref={ref} className={`rv-rise ${className}`} style={{ ...vars({ '--rv-delay': secs(delay), '--rv-y': y === 28 ? null : `${y}px` }), ...style }} {...rest}>
      {children}
    </Tag>
  )
}

// Children appear one after another. Each direct child is wrapped, so pass list items as `as`.
export function Stagger({ children, className = '', as: Tag = 'div', itemAs: Item = 'div', itemClassName = '', step = 0.08, y = 24, ...rest }) {
  const ref = useRef(null)
  useReveal(ref)
  const items = Children.toArray(children)
  return (
    <Tag ref={ref} className={`rv-stagger ${className}`} style={{ '--rv-step': `${step}s`, '--rv-y': `${y}px` }} {...rest}>
      {items.map((c, i) => (
        <Item key={c.key ?? i} className={`rv-item ${itemClassName}`} style={{ '--rv-i': i }}>
          {c}
        </Item>
      ))}
    </Tag>
  )
}

/*
  A heading whose words rise one by one out of a mask. `text` must be a plain string.
  `immediate` plays as the page opens (page titles); otherwise it plays when scrolled into view.
*/
export function SplitText({ text: english, as: Tag = 'h2', className = '', delay = 0, step = 0.07, immediate = false, ...rest }) {
  const ref = useRef(null)
  useReveal(ref, !immediate)
  const text = useT()(english) // headings translate themselves (src/i18n)
  const words = String(text).split(' ')
  return (
    <Tag
      ref={ref}
      className={`${immediate ? 'enter-words' : 'rv-words'} ${className}`}
      style={vars({ '--rv-delay': secs(delay), '--rv-step': step === 0.07 ? null : `${step}s` })}
      {...rest}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="-mb-[0.14em] -mr-[0.06em] inline-block overflow-hidden pb-[0.14em] pr-[0.06em] align-bottom">
            <span className="rv-word inline-block" style={{ '--rv-i': i }}>
              {w}
            </span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}

/*
  A passage whose words brighten one after another as it is scrolled through. The scroll position
  is written once per frame as --p on the paragraph; each word's opacity is worked out from it in
  CSS (.sw-word), so the words themselves are plain text. Without scripts every word is lit.
*/
export function ScrollWords({ text: english, className = '' }) {
  const ref = useRef(null)
  const text = useT()(english)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.55'] })
  const write = (v) => ref.current?.style.setProperty('--p', reduce ? 1 : v.toFixed(3))
  useMotionValueEvent(scrollYProgress, 'change', write)
  useEffect(() => write(scrollYProgress.get()))
  const words = text.split(' ')
  return (
    <p ref={ref} className={className} style={{ '--n': words.length }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="sw-word" style={{ '--i': i }}>
            {w}
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </p>
  )
}

// A band of words that drifts sideways without end and pauses under the pointer.
// The moving copies are hidden from assistive technology; give the list itself separately.
export function Marquee({ children, seconds = 60, reverse = false, className = '' }) {
  const reduce = useReducedMotion()
  if (reduce) return <div aria-hidden="true" className={`flex flex-wrap gap-x-8 ${className}`}>{children}</div>
  return (
    <div aria-hidden="true" className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max" style={{ '--marquee-dur': `${seconds}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        <div className="flex shrink-0 items-baseline">{children}</div>
        <div className="flex shrink-0 items-baseline">{children}</div>
      </div>
    </div>
  )
}

// A thin geru line along the top of the screen showing how far the page has been read.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-geru"
      style={{ scaleX }}
    />
  )
}

export { ease, easeInOut }
