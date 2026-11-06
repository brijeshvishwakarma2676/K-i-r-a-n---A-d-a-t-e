import { useEffect, useRef, useState } from 'react'
import Plate from './Plate'
import { images } from '../data/images'

/*
  Shows a photograph of the studio's work.
    image.id   - a photo id from src/data/images.js (responsive WebP files in public/img)
    image.src  - or any other URL
    otherwise  - a generated placeholder plate (image.plate), labelled as a placeholder

  `ratio` is "w/h", or "natural" for the photo's own proportions. Pass `fill` to stretch into
  a positioned parent instead. `image.position` sets object-position; `image.fit: 'contain'`
  shows the whole photo (for posters and documents).
*/
export const photo = (image) => (image?.id ? images[image.id] : null)

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
  const [loaded, setLoaded] = useState(false)

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

  if (!image) return null
  const style = fill ? {} : { aspectRatio: `${w} / ${h}` }
  if (meta) style.backgroundColor = image.fit === 'contain' ? undefined : meta.color

  let src = image.src
  let srcSet = image.srcSet
  if (meta) {
    src = srcFor(image)
    srcSet = Object.entries(meta.files).map(([width, url]) => `${url} ${width}w`).join(', ')
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${isPlate ? 'grain bg-stone' : ''} ${fill ? 'h-full w-full' : ''} ${className}`} style={style}>
      {src ? (
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full transition-[opacity,scale] duration-[1.1s] ease-gallery ${image.fit === 'contain' ? 'object-contain' : 'object-cover'} ${loaded || priority ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'}`}
          style={image.position ? { objectPosition: image.position } : undefined}
        />
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
