import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../lib/media'

/*
  A silent background loop: plays only while on screen, pauses when scrolled away, and shows its
  poster instead for visitors who ask for reduced motion or a data saver. Nothing but the poster
  downloads until the clip first comes near the screen. Never use it for a work's own film (see
  Film.jsx), and never caption a mood clip as the making of a particular work.
*/
export default function AmbientVideo({ src, poster, className = '', style }) {
  const ref = useRef(null)
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
        if (e.isIntersecting) {
          setNear(true)
          el.play?.().catch(() => {})
        } else el.pause?.()
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce, saveData])

  if (reduce || saveData) return <img src={poster} alt="" aria-hidden="true" className={`object-cover ${className}`} style={style} />

  return (
    <video
      ref={ref}
      className={`object-cover ${className}`}
      style={style}
      poster={poster}
      src={near ? src : undefined}
      autoPlay={near}
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
