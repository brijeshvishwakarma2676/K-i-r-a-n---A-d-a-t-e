import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Plate from './LazyPlate'
import { images } from '../data/images'

/*
  Shows a photograph of the studio's work.
    image.id   - a photo id from src/data/images.js (responsive WebP files in public/img)
    image.src  - or any other URL
    otherwise  - a generated placeholder plate (image.plate), labelled as a placeholder

  A photo is visible as soon as it has loaded, including in the pre-rendered HTML. One still loading
  when the page starts is marked data-wait (hidden, see global.css) and fades in when it arrives;
  that is done on the element itself, so no image re-renders the page.

  `ratio` is "w/h", or "natural" for the photo's own proportions. Pass `fill` to stretch into
  a positioned parent instead. `image.position` sets object-position; `image.fit: 'contain'`
  shows the whole photo (for posters and documents).
*/
export const photo = (image) => (image?.id ? images[image.id] : null)

/*
  Every WebP in public/img has an AVIF copy beside it (scripts/make-avif.sh), about half the size.
  `srcSetOf(files)` lists the WebP files for srcset; `srcSetOf(files, true)` the AVIF copies, given
  in a <picture> <source> so browsers that read AVIF take it and the rest fall back to WebP.
  The <picture> is display: contents, so the <img> sizes against the same box as before.
*/
export const srcSetOf = (files, avif = false) =>
  Object.entries(files)
    .map(([w, url]) => `${avif ? url.replace(/\.webp$/, '.avif') : url} ${w}w`)
    .join(', ')

export function srcFor(image, max = 1600) {
  const meta = photo(image)
  if (!meta) return image?.src || null
  const widths = Object.keys(meta.files).map(Number).sort((a, b) => a - b)
  const w = widths.filter((x) => x <= max).pop() || widths[0]
  return meta.files[w]
}

export default function ArtImage({
  image,
  ratio = '4/5',
  fill = false,
  className = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  tag = true,
}) {
  const ref = useRef(null)
  const meta = photo(image)
  const natural = ratio === 'natural' && meta
  const [w, h] = natural ? [meta.w, meta.h] : String(ratio === 'natural' ? '4/5' : ratio).split('/').map(Number)
  const [measured, setMeasured] = useState(null)
  const isPlate = image && !meta && !image.src
  const img = useRef(null)

  useEffect(() => {
    if (!isPlate || !ref.current || typeof ResizeObserver === 'undefined') return
    const el = ref.current
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) {
        const r = Math.round((width / height) * 20) / 20
        setMeasured((prev) => (prev === r ? prev : r))
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [isPlate])

  useLayoutEffect(() => {
    const el = img.current
    if (!el || priority || el.complete) return
    el.dataset.wait = ''
    const done = () => delete el.dataset.wait
    el.addEventListener('load', done, { once: true })
    el.addEventListener('error', done, { once: true })
    return () => {
      el.removeEventListener('load', done)
      el.removeEventListener('error', done)
    }
  }, [image?.id, image?.src, priority])

  if (!image) return null
  const style = fill ? {} : { aspectRatio: `${w} / ${h}` }
  if (meta) style.backgroundColor = image.fit === 'contain' ? undefined : meta.color

  let src = image.src
  let srcSet = image.srcSet
  if (meta) {
    src = srcFor(image)
    srcSet = srcSetOf(meta.files)
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${isPlate ? 'grain bg-stone' : ''} ${fill ? 'h-full w-full' : ''} ${className}`} style={style}>
      {src ? (
        <picture className="contents">
        {meta && <source type="image/avif" srcSet={srcSetOf(meta.files, true)} sizes={sizes} />}
        <img
          ref={img}
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className={`art-img absolute inset-0 h-full w-full transition-[opacity,scale] duration-[1.1s] ease-gallery ${image.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
          style={image.position ? { objectPosition: image.position } : undefined}
        />
        </picture>
      ) : (
        <Plate {...image.plate} ratio={measured || w / h} title={image.alt} className="absolute inset-0 h-full w-full" />
      )}
      {isPlate && tag && (
        <span
          className={`pointer-events-none absolute z-10 bg-[#E7E3DA]/85 px-1.5 py-0.5 text-[10px] leading-none tracking-[0.02em] text-[#5D5950] ${
            fill ? 'bottom-[8%] left-[calc(var(--gutter)+1%)]' : 'bottom-2 left-2'
          }`}
        >
          Placeholder image
        </span>
      )}
    </div>
  )
}
