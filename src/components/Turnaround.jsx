import { useRef, useState } from 'react'
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'framer-motion'
import ArtImage from './ArtImage'
import { ease } from './Motion'
import { useT } from '../i18n'

/*
  Walk around a sculpture: photographs taken from points around it (front, side, back…) are
  stacked, and dragging across the picture cross-fades from one to the next, as if stepping around
  the work. Only opacity changes, so it stays smooth on modest devices. The stops below the picture
  (and the arrow keys on them) do the same without dragging. `views` are { image, label }.
*/
export default function Turnaround({ views, title, className = '' }) {
  const t = useT()
  const reduce = useReducedMotion()
  const last = views.length - 1
  const pos = useMotionValue(0)
  const [stop, setStop] = useState(0)
  const drag = useRef(null)
  const box = useRef(null)

  useMotionValueEvent(pos, 'change', (v) => setStop(Math.round(v)))

  const goTo = (i) => {
    const target = Math.max(0, Math.min(last, i))
    if (reduce) pos.set(target)
    else animate(pos, target, { duration: 0.7, ease })
  }

  // A drag across the whole picture walks from the first view to the last.
  const onDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.preventDefault() // stops the browser's own image dragging
    drag.current = { x: e.clientX, start: pos.get(), width: box.current.offsetWidth }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e) => {
    if (!drag.current) return
    const { x, start, width } = drag.current
    pos.set(Math.max(0, Math.min(last, start - ((e.clientX - x) / width) * last * 1.2)))
  }
  const onUp = () => {
    if (!drag.current) return
    drag.current = null
    goTo(Math.round(pos.get()))
  }

  return (
    <figure className={className}>
      <div
        ref={box}
        className="relative aspect-[3/4] cursor-grab [&_img]:pointer-events-none touch-pan-y select-none overflow-hidden active:cursor-grabbing"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        aria-hidden="true"
      >
        {views.map((v, i) => (
          <Layer key={v.image.id} pos={pos} i={i}>
            <ArtImage image={v.image} fill sizes="(min-width: 768px) 45vw, 100vw" />
          </Layer>
        ))}
        <span className="caption pointer-events-none absolute bottom-3 left-3 bg-[#1b1a18]/70 px-2.5 py-1.5 !text-[#ECE7DD]">
          ← {t('Drag to walk around')} →
        </span>
      </div>

      <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <span className="caption">{title}: {views[stop].label.toLowerCase()}</span>
        <span role="group" aria-label={t('Views of {title}', { title })} className="flex gap-2">
          {views.map((v, i) => (
            <button
              key={v.label}
              type="button"
              aria-pressed={stop === i}
              onClick={() => goTo(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') { e.preventDefault(); goTo(stop + 1) }
                if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(stop - 1) }
              }}
              className={`border px-3 py-1.5 text-[0.8rem] transition-colors ${stop === i ? 'border-ink bg-ink text-limestone' : 'border-ink/30 hover:border-ink'}`}
            >
              {v.label}
            </button>
          ))}
        </span>
      </figcaption>
      {/* The views as plain images for screen readers, since the stack itself is hidden. */}
      <ul className="sr-only">
        {views.map((v) => <li key={v.image.id}>{v.image.alt}</li>)}
      </ul>
    </figure>
  )
}

function Layer({ pos, i, children }) {
  const opacity = useTransform(pos, [i - 1, i, i + 1], [0, 1, 0])
  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      {children}
    </motion.div>
  )
}
