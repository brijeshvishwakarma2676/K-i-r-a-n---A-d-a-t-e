import { Children, useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

/*
  The site's motion vocabulary. Everything is slow and eased, like light moving across a gallery
  wall, and everything falls back to a still page when the visitor asks for reduced motion.
*/
const ease = [0.22, 1, 0.36, 1]
const easeInOut = [0.76, 0, 0.24, 1]
const view = { once: true, margin: '0px 0px -12% 0px' }

// Reveals large images by opening a clip from the bottom edge. Used only on key plates.
export function ClipReveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(18% 0% 0% 0%)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={view}
      transition={{ duration: 1.3, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

// An image uncovered from below while it settles from a slight zoom: used on every work card.
export function ImageReveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={view}
      transition={{ duration: 1.2, ease: easeInOut, delay }}
    >
      <motion.div
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={view}
        transition={{ duration: 1.8, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
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

// Quiet fade for text blocks that follow an image reveal.
export function FadeIn({ children, className = '', delay = 0, as = 'div' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  if (reduce) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={view}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </Tag>
  )
}

// Fades a block in while it rises a little into place.
export function Reveal({ children, className = '', delay = 0, y = 28, as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  if (reduce) {
    const Plain = as
    return <Plain className={className} {...rest}>{children}</Plain>
  }
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 1.1, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Children appear one after another. Each direct child is wrapped, so pass list items as `as`.
export function Stagger({ children, className = '', as = 'div', itemAs = 'div', itemClassName = '', step = 0.08, y = 24, ...rest }) {
  const reduce = useReducedMotion()
  const items = Children.toArray(children)
  if (reduce) {
    const Plain = as
    const Item = itemAs
    return (
      <Plain className={className} {...rest}>
        {items.map((c, i) => <Item key={c.key ?? i} className={itemClassName}>{c}</Item>)}
      </Plain>
    )
  }
  const Tag = motion[as]
  const Item = motion[itemAs]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={view}
      variants={{ show: { transition: { staggerChildren: step } } }}
      {...rest}
    >
      {items.map((c, i) => (
        <Item
          key={c.key ?? i}
          className={itemClassName}
          variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 1, ease } } }}
        >
          {c}
        </Item>
      ))}
    </Tag>
  )
}

/*
  A heading whose words rise one by one out of a mask. `text` must be a plain string.
  `immediate` plays on mount (page titles); otherwise it plays when scrolled into view.
*/
export function SplitText({ text, as = 'h2', className = '', delay = 0, step = 0.07, immediate = false, ...rest }) {
  const reduce = useReducedMotion()
  if (reduce) {
    const Plain = as
    return <Plain className={className} {...rest}>{text}</Plain>
  }
  const Tag = motion[as]
  const words = String(text).split(' ')
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: view }
  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ show: { transition: { staggerChildren: step, delayChildren: delay } } }}
      {...rest}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="-mb-[0.14em] -mr-[0.06em] inline-block overflow-hidden pb-[0.14em] pr-[0.06em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: '110%', rotate: 2 }, show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease } } }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}

// A passage whose words brighten one after another as it is scrolled through.
export function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.55'] })
  if (reduce) return <p className={className}>{text}</p>
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
            {i < words.length - 1 && ' '}
          </Word>
        ))}
      </span>
    </p>
  )
}

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

// A number that counts up from zero the first time it comes into view.
export function Counter({ to, duration = 2, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const value = useMotionValue(0)
  const shown = useTransform(value, (v) => Math.round(v))
  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(value, to, { duration, ease })
    return () => controls.stop()
  }, [inView, reduce, to, duration, value])
  return (
    <motion.span ref={ref} className={`tabular-nums ${className}`}>
      {reduce ? to : shown}
    </motion.span>
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
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-geru"
      style={{ scaleX }}
    />
  )
}

export { ease, easeInOut }
