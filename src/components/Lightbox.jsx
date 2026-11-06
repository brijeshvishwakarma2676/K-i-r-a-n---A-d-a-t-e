import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import ArtImage, { photo, srcFor } from './ArtImage'
import useLockBody from '../hooks/useLockBody'
import useFocusTrap from '../hooks/useFocusTrap'
import { ease } from './Motion'

/*
  Full-screen viewer for a set of images. Arrow keys and swipe move between images,
  Escape closes. `index` null means closed.
*/
export default function Lightbox({ images, index, onClose, onIndex, title }) {
  return <AnimatePresence>{index !== null && <Viewer {...{ images, index, onClose, onIndex, title }} />}</AnimatePresence>
}

function Viewer({ images, index, onClose, onIndex, title }) {
  const ref = useRef(null)
  const [dir, setDir] = useState(0)
  useLockBody(true)
  useFocusTrap(ref, true, onClose)

  const go = useCallback(
    (step) => {
      setDir(step)
      onIndex((index + step + images.length) % images.length)
    },
    [index, images.length, onIndex],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const image = images[index]

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${title}: image ${index + 1} of ${images.length}`}
      className="on-dark fixed inset-0 z-[70] flex flex-col bg-[#1b1a18] text-bone pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="caption tabular-nums">
          {index + 1} / {images.length}
        </p>
        <button type="button" onClick={onClose} className="-mr-2 flex items-center gap-2 p-2 text-[0.85rem]">
          Close <X size={18} strokeWidth={1.25} aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.figure
            key={index}
            custom={dir}
            className="flex h-full max-h-full w-full items-center justify-center"
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.55, ease }}
            drag={images.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1)
              else if (info.offset.x > 60) go(-1)
            }}
          >
            {image.src || image.id ? (
              <img
                src={srcFor(image)}
                srcSet={photo(image) ? Object.entries(photo(image).files).map(([w, u]) => `${u} ${w}w`).join(', ') : image.srcSet}
                sizes="90vw"
                alt={image.alt}
                className="max-h-full max-w-full object-contain"
                draggable="false"
              />
            ) : (
              <div className="aspect-[4/3] max-h-full max-w-full" style={{ height: 'min(100%, 70vw)' }}>
                <ArtImage image={image} ratio="4/3" className="!h-full !w-full" sizes="90vw" />
              </div>
            )}
          </motion.figure>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 hidden -translate-y-1/2 p-3 text-bone/70 hover:text-bone md:block">
              <ChevronLeft size={28} strokeWidth={1} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-2 top-1/2 hidden -translate-y-1/2 p-3 text-bone/70 hover:text-bone md:block">
              <ChevronRight size={28} strokeWidth={1} />
            </button>
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-6 px-5 py-5 md:px-8">
        <p className="text-[0.95rem]">{image.caption || image.alt}</p>
        {images.length > 1 && (
          <div className="flex gap-1 md:hidden">
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="p-2"><ChevronLeft size={22} strokeWidth={1.25} /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className="p-2"><ChevronRight size={22} strokeWidth={1.25} /></button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
