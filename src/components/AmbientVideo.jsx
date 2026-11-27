import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../lib/media'

/*
  A silent background loop: plays only while on screen, pauses when scrolled away, and shows its
  poster instead for visitors who ask for reduced motion or a data saver. Nothing but the poster
  downloads until the clip first comes near the screen. Never use it for a work's own film (see
  Film.jsx), and never caption a mood clip as the making of a particular work.
*/
/*
  Every clip in /ambient has an AV1 copy beside it (name.av1.mp4): about half the size at the same
  or better quality. Browsers that can play AV1 take it; the rest (older Safari) get the H.264 file.
  Asked only on the client, after the clip comes near the screen, so pre-rendering is unaffected.
*/
let av1
const canAv1 = () => (av1 ??= document.createElement('video').canPlayType('video/mp4; codecs="av01.0.05M.10"') === 'probably')
const pick = (src) => (src?.startsWith('/ambient/') && canAv1() ? src.replace(/\.mp4$/, '.av1.mp4') : src)

// Set to true by a page's "pause motion" button: every clip inside holds its frame.
export const AmbientPause = createContext(false)

export default function AmbientVideo({ src, poster, className = '', style }) {
  const ref = useRef(null)
  const held = useContext(AmbientPause)
  const heldRef = useRef(held)
  const seen = useRef(false) // on screen now
  const reduce = useReducedMotion()
  const [near, setNear] = useState(false)
  // Read after the page is taken over, so the first render matches the pre-rendered HTML.
  const [saveData, setSaveData] = useState(false)
  useEffect(() => setSaveData(Boolean(navigator.connection?.saveData)), [])

  useEffect(() => {
    const el = ref.current
    if (!el || reduce || saveData) return
    const io = new IntersectionObserver(
      ([e]) => {
        seen.current = e.isIntersecting
        if (e.isIntersecting) {
          setNear(true)
          if (!heldRef.current) el.play?.().catch(() => {})
        } else el.pause?.()
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce, saveData])

  useEffect(() => {
    heldRef.current = held
    const el = ref.current
    if (!el) return
    if (held) el.pause?.()
    else if (seen.current) el.play?.().catch(() => {})
  }, [held])

  if (reduce || saveData) return <img src={poster} alt="" aria-hidden="true" className={`object-cover ${className}`} style={style} />

  return (
    <video
      ref={ref}
      className={`object-cover ${className}`}
      style={style}
      poster={poster}
      src={near ? pick(src) : undefined}
      autoPlay={near && !held}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    />
  )
}
