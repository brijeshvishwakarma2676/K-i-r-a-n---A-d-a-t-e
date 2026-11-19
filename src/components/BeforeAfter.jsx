import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import ArtImage, { photo } from './ArtImage'
import { useT } from '../i18n'

/*
  Before and after: two photographs of a work stacked, the earlier one on top and cut away at a
  divider that the visitor drags (or moves with the arrow keys) to compare the raw material with
  the finished piece. `before` and `after` are { image, label }; both photos should share a shape.
*/
export default function BeforeAfter({ before, after, title, className = '' }) {
  const t = useT()
  const box = useRef(null)
  const at = useMotionValue(50) // the divider's position, % from the left
  const clip = useTransform(at, (v) => `inset(0 ${100 - v}% 0 0)`)
  const left = useTransform(at, (v) => `${v}%`)
  const drag = useRef(false)
  const meta = photo(before.image)

  const fromPointer = (e) => {
    const r = box.current.getBoundingClientRect()
    at.set(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)))
  }

  return (
    <figure className={className}>
      <div
        ref={box}
        className="relative cursor-ew-resize touch-pan-y select-none overflow-hidden [&_img]:pointer-events-none"
        style={{ aspectRatio: meta ? `${meta.w} / ${meta.h}` : '4 / 3' }}
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return
          e.preventDefault()
          drag.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          fromPointer(e)
        }}
        onPointerMove={(e) => drag.current && fromPointer(e)}
        onPointerUp={() => (drag.current = false)}
        onPointerCancel={() => (drag.current = false)}
      >
        <div className="absolute inset-0"><ArtImage image={after.image} fill sizes="(min-width: 768px) 60vw, 100vw" /></div>
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <ArtImage image={before.image} fill sizes="(min-width: 768px) 60vw, 100vw" />
        </motion.div>

        <span className="caption pointer-events-none absolute left-3 top-3 bg-[#1b1a18]/70 px-2.5 py-1.5 !text-[#ECE7DD]">{before.label}</span>
        <span className="caption pointer-events-none absolute right-3 top-3 bg-[#1b1a18]/70 px-2.5 py-1.5 !text-[#ECE7DD]">{after.label}</span>

        <motion.div
          role="slider"
          tabIndex={0}
          aria-label={t('Compare {a} with {b}', { a: before.label.toLowerCase(), b: after.label.toLowerCase() })}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          aria-valuetext={t('Drag or use the arrow keys')}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 20 : 5
            if (e.key === 'ArrowLeft') { e.preventDefault(); at.set(Math.max(0, at.get() - step)) }
            if (e.key === 'ArrowRight') { e.preventDefault(); at.set(Math.min(100, at.get() + step)) }
          }}
          className="absolute inset-y-0 -ml-px w-0.5 bg-[#ECE7DD] outline-none"
          style={{ left }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ECE7DD] text-[0.9rem] text-[#22211E] shadow-[0_6px_20px_rgb(0_0_0/0.3)] [[role=slider]:focus-visible_&]:outline [[role=slider]:focus-visible_&]:outline-2 [[role=slider]:focus-visible_&]:outline-geru">
            ↔
          </span>
        </motion.div>
      </div>
      <figcaption className="caption mt-4">{title}: {t('drag across the photograph to compare.')}</figcaption>
    </figure>
  )
}
