import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react'
import ArtImage, { photo, srcFor, srcSetOf } from './ArtImage'
import useLockBody from '../hooks/useLockBody'
import useFocusTrap from '../hooks/useFocusTrap'
import useHydrated from '../hooks/useHydrated'
import { ease } from './Motion'
import { useT } from '../i18n'

/*
  Full-screen viewer for a set of images. Arrow keys and swipe move between images, Escape
  closes; each image can be zoomed and moved (ZoomFrame, below). `index` null means closed.

  Drawn into <body>, not where it is used: a section with content-visibility (cv-auto), a transform
  or a filter would otherwise become the frame of its "fixed, full screen" layer, so the viewer
  would be as tall as that section and scroll away with it (the press clippings on About).
  It only ever opens in the browser, after the page has been taken over (useOverlay).
*/
export default function Lightbox({ images, index, onClose, onIndex, title }) {
  // Nothing until the app has taken over the page, so the first render matches the pre-rendered HTML.
  const ready = useHydrated()
  if (!ready) return null
  return createPortal(<AnimatePresence>{index !== null && <Viewer {...{ images, index, onClose, onIndex, title }} />}</AnimatePresence>, document.body)
}

function Viewer({ images, index, onClose, onIndex, title }) {
  const t = useT()
  const ref = useRef(null)
  const zoom = useRef(null) // the shown photograph's zoom controls (ZoomFrame)
  const [dir, setDir] = useState(0)
  const [scale, setScale] = useState(1)
  useLockBody(true)
  useFocusTrap(ref, true, onClose)

  const go = useCallback(
    (step) => {
      setDir(step)
      setScale(1)
      onIndex((index + step + images.length) % images.length)
    },
    [index, images.length, onIndex],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === '+' || e.key === '=') zoom.current?.by(STEP)
      else if (e.key === '-' || e.key === '_') zoom.current?.by(1 / STEP)
      else if (e.key === '0') zoom.current?.reset()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const image = images[index]
  const sizes = `${Math.round(90 * scale)}vw` // a sharper file is fetched as the photograph is enlarged

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={t('{title}: image {n} of {total}', { title, n: index + 1, total: images.length })}
      data-lenis-prevent
      className="on-dark fixed inset-0 z-[70] flex flex-col bg-[#1b1a18] text-bone pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <div className="relative z-10 flex items-center justify-between gap-4 px-5 py-4 md:px-8">
        <p className="caption tabular-nums">
          {index + 1} / {images.length}
        </p>
        <div className="flex items-center gap-1 md:gap-3">
          <button type="button" onClick={() => zoom.current?.by(1 / STEP)} disabled={scale <= 1} aria-label={t('Zoom out')} className="p-2 text-bone/80 hover:text-bone disabled:opacity-30">
            <ZoomOut size={20} strokeWidth={1.25} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => zoom.current?.reset()} disabled={scale <= 1} aria-label={t('Fit to screen')} className="caption w-12 py-2 text-center tabular-nums !text-bone/80 disabled:!text-bone/40">
            {Math.round(scale * 100)}%
          </button>
          <button type="button" onClick={() => zoom.current?.by(STEP)} disabled={scale >= MAX} aria-label={t('Zoom in')} className="p-2 text-bone/80 hover:text-bone disabled:opacity-30">
            <ZoomIn size={20} strokeWidth={1.25} aria-hidden="true" />
          </button>
          <button type="button" onClick={onClose} className="-mr-2 ml-2 flex items-center gap-2 p-2 text-[0.85rem] md:ml-4">
            {t('Close')} <X size={18} strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 md:px-24">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            custom={dir}
            className="flex h-full max-h-full w-full items-center justify-center"
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.55, ease }}
          >
            <ZoomFrame api={zoom} onScale={setScale} onSwipe={images.length > 1 ? go : null}>
              {(target) =>
                image.src || image.id ? (
                  <picture className="contents">
                    {photo(image) && <source type="image/avif" srcSet={srcSetOf(photo(image).files, true)} sizes={sizes} />}
                    <img
                      ref={target}
                      src={srcFor(image)}
                      srcSet={photo(image) ? srcSetOf(photo(image).files) : image.srcSet}
                      sizes={sizes}
                      alt={image.alt}
                      className="max-h-full max-w-full object-contain"
                      draggable="false"
                    />
                  </picture>
                ) : (
                  <div ref={target} className="aspect-[4/3] max-h-full max-w-full" style={{ height: 'min(100%, 70vw)' }}>
                    <ArtImage image={image} ratio="4/3" className="!h-full !w-full" sizes="90vw" />
                  </div>
                )
              }
            </ZoomFrame>
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && scale <= 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={t('Previous image')} className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 p-3 text-bone/70 hover:text-bone md:block">
              <ChevronLeft size={28} strokeWidth={1} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={t('Next image')} className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 p-3 text-bone/70 hover:text-bone md:block">
              <ChevronRight size={28} strokeWidth={1} />
            </button>
          </>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-between gap-6 px-5 py-5 md:px-8">
        <p className="text-[0.95rem]">{t(image.caption || image.alt)}</p>
        {images.length > 1 && (
          <div className="flex shrink-0 gap-1 md:hidden">
            <button type="button" onClick={() => go(-1)} aria-label={t('Previous image')} className="p-2"><ChevronLeft size={22} strokeWidth={1.25} /></button>
            <button type="button" onClick={() => go(1)} aria-label={t('Next image')} className="p-2"><ChevronRight size={22} strokeWidth={1.25} /></button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const MAX = 4 // largest enlargement
const STEP = 1.6 // one press of + or −
const TAP = 2.5 // a click or double tap enlarges to this
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

/*
  Zoom and pan for one photograph, by hand:
    mouse         click to enlarge where clicked (click again to fit), wheel or trackpad pinch to
                  zoom around the pointer, drag to move when enlarged
    touch         pinch, double tap to enlarge where tapped (again to fit), one finger to move
    keys          + and − (and 0 to fit), through the buttons above
  At fit size a sideways drag or swipe moves to the next or previous photograph instead.
  The transform is written straight to the element while a hand is on it (no re-render per move);
  the scale is reported to the viewer when a gesture ends, for the buttons and the sharper file.
*/
function ZoomFrame({ children, api, onScale, onSwipe }) {
  const frame = useRef(null)
  const target = useRef(null)
  const view = useRef({ s: 1, x: 0, y: 0 })
  const hands = useRef(new Map()) // pointerId -> { x, y }
  const gesture = useRef(null)
  const lastTap = useRef(null)
  const [zoomed, setZoomed] = useState(false)

  // Where a screen point sits, measured from the frame's centre (the photograph's centre at rest).
  const local = (cx, cy) => {
    const r = frame.current.getBoundingClientRect()
    return { x: cx - r.left - r.width / 2, y: cy - r.top - r.height / 2 }
  }
  // How far the photograph may move at scale s: no further than its edges.
  const bounds = (s) => {
    const f = frame.current, el = target.current
    return { x: Math.max(0, (el.offsetWidth * s - f.clientWidth) / 2), y: Math.max(0, (el.offsetHeight * s - f.clientHeight) / 2) }
  }
  const paint = (time = 0) => {
    const el = target.current
    if (!el) return
    const { s, x, y } = view.current
    el.style.transition = time ? `transform ${time}s cubic-bezier(0.22, 1, 0.36, 1)` : 'none'
    el.style.transform = s === 1 && !x && !y ? '' : `translate3d(${x}px, ${y}px, 0) scale(${s})`
  }
  const settle = (time = 0.35) => {
    const v = view.current
    if (v.s < 1.02) Object.assign(v, { s: 1, x: 0, y: 0 })
    const b = bounds(v.s)
    v.x = clamp(v.x, -b.x, b.x)
    v.y = clamp(v.y, -b.y, b.y)
    paint(time)
    setZoomed(v.s > 1)
    onScale(v.s)
  }
  // Zoom to s keeping the point p (from the centre) where it is.
  const zoomAt = (s, p) => {
    const v = view.current
    const next = clamp(s, 1, MAX)
    v.x = p.x - ((p.x - v.x) * next) / v.s
    v.y = p.y - ((p.y - v.y) * next) / v.s
    v.s = next
  }

  useEffect(() => {
    api.current = {
      owner: frame,
      by: (k) => {
        zoomAt(view.current.s * k, { x: 0, y: 0 })
        settle()
      },
      reset: () => {
        Object.assign(view.current, { s: 1, x: 0, y: 0 })
        settle()
      },
    }
    return () => {
      if (api.current?.owner === frame) api.current = null
    }
  })

  // Wheel and trackpad pinch (which arrives as a wheel with Ctrl held). Not passive, to keep the
  // browser from zooming the whole page.
  useEffect(() => {
    const f = frame.current
    const onWheel = (e) => {
      e.preventDefault()
      const k = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0022))
      zoomAt(view.current.s * k, local(e.clientX, e.clientY))
      settle(0.12)
    }
    f.addEventListener('wheel', onWheel, { passive: false })
    return () => f.removeEventListener('wheel', onWheel)
  })

  const down = (e) => {
    if (e.button > 0) return
    frame.current.setPointerCapture?.(e.pointerId)
    hands.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const v = view.current
    const pts = [...hands.current.values()]
    if (pts.length === 1) gesture.current = { kind: 'one', start: pts[0], from: { ...v }, at: e.timeStamp, moved: false }
    else if (pts.length === 2) {
      const [a, b] = pts
      gesture.current = { kind: 'pinch', dist: Math.hypot(a.x - b.x, a.y - b.y), from: { ...v }, mid: local((a.x + b.x) / 2, (a.y + b.y) / 2), moved: true }
    }
  }
  const move = (e) => {
    if (!hands.current.has(e.pointerId)) return
    hands.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const g = gesture.current
    if (!g) return
    const v = view.current
    const pts = [...hands.current.values()]
    if (g.kind === 'pinch' && pts.length >= 2) {
      const [a, b] = pts
      const mid = local((a.x + b.x) / 2, (a.y + b.y) / 2)
      // The point first under the fingers stays under them as they spread and move.
      const s = clamp((g.from.s * Math.hypot(a.x - b.x, a.y - b.y)) / g.dist, 0.85, MAX * 1.15)
      v.s = s
      v.x = mid.x - ((g.mid.x - g.from.x) * s) / g.from.s
      v.y = mid.y - ((g.mid.y - g.from.y) * s) / g.from.s
      paint()
    } else if (g.kind === 'one') {
      const dx = e.clientX - g.start.x, dy = e.clientY - g.start.y
      if (!g.moved && Math.hypot(dx, dy) < 6) return
      g.moved = true
      if (g.from.s > 1) {
        // Move the enlarged photograph, with a little give past its edges.
        const b = bounds(v.s)
        const give = (val, lim) => (Math.abs(val) <= lim ? val : Math.sign(val) * (lim + (Math.abs(val) - lim) * 0.35))
        v.x = give(g.from.x + dx, b.x)
        v.y = give(g.from.y + dy, b.y)
      } else if (onSwipe) {
        v.x = dx * 0.6 // follow a sideways swipe a little
      }
      paint()
    }
  }
  const up = (e) => {
    if (!hands.current.delete(e.pointerId)) return
    const g = gesture.current
    const v = view.current
    if (g?.kind === 'pinch') {
      if (hands.current.size === 1) {
        // One finger left on the glass: carry on moving with it.
        const [p] = [...hands.current.values()]
        gesture.current = { kind: 'one', start: p, from: { ...v }, at: e.timeStamp, moved: true }
        return
      }
      gesture.current = null
      return settle()
    }
    if (g?.kind !== 'one' || hands.current.size) return
    gesture.current = null
    if (g.moved) {
      if (g.from.s <= 1 && onSwipe) {
        const dx = e.clientX - g.start.x
        const quick = e.timeStamp - g.at < 260 && Math.abs(dx) > 30
        if (Math.abs(dx) > 70 || quick) return onSwipe(dx < 0 ? 1 : -1)
      }
      return settle()
    }
    // A tap. A mouse click toggles; on touch it takes two taps (one tap is left to the page).
    const p = local(e.clientX, e.clientY)
    const toggle = () => {
      if (v.s > 1) Object.assign(v, { s: 1, x: 0, y: 0 })
      else zoomAt(TAP, p)
      settle()
    }
    if (e.pointerType === 'mouse') return toggle()
    const prev = lastTap.current
    if (prev && e.timeStamp - prev.at < 320 && Math.hypot(e.clientX - prev.x, e.clientY - prev.y) < 30) {
      lastTap.current = null
      toggle()
    } else lastTap.current = { at: e.timeStamp, x: e.clientX, y: e.clientY }
  }

  return (
    <div
      ref={frame}
      className={`flex h-full w-full touch-none select-none items-center justify-center ${zoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    >
      {children(target)}
    </div>
  )
}
