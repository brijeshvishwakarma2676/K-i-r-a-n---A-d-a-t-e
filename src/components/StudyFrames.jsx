import AmbientVideo from './AmbientVideo'

/*
  Frames for the moving studies (/material and the home page), each shaped like something in a
  sculptor's world rather than a video player: no controls, no play buttons, no thumbnails. The
  clips are generated studies of material (VIDEO-GENERATION.md), never a work or its making.
*/
const clip = (name) => ({ src: `/ambient/${name}.mp4`, poster: `/ambient/${name}.webp` })

// A band of carving set along a wall, like a frieze: the clip in a stone border.
export function Frieze({ name, className = '' }) {
  return (
    <div className={`bg-stone p-1.5 md:p-2.5 ${className}`}>
      <div className="relative aspect-[16/9] overflow-hidden bg-basalt sm:aspect-[880/300]">
        <AmbientVideo {...clip(name)} className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  )
}

// An arched niche in a wall, the clip standing in it as a work would, on a low plinth.
export function Niche({ name, className = '', ratio = '3/5' }) {
  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-t-full bg-basalt shadow-[inset_0_0_40px_rgb(0_0_0/0.5)]" style={{ aspectRatio: ratio }}>
        <AmbientVideo {...clip(name)} className="absolute inset-0 h-full w-full" />
        <span aria-hidden="true" className="absolute inset-0 rounded-t-full shadow-[inset_0_14px_30px_rgb(0_0_0/0.45)]" />
      </div>
      <div aria-hidden="true" className="-mx-[6%] h-3 bg-[#3A3834] shadow-[0_18px_30px_-12px_rgb(0_0_0/0.6)] md:h-4" />
    </div>
  )
}

// A museum wall label: number (optional), title, then what it is.
export function StudyLabel({ n, title, children, className = '' }) {
  return (
    <p className={`caption flex gap-4 ${className}`}>
      {n && <span className="tabular-nums">{n}</span>}
      <span>
        <span className="label-title text-[1.2em]">{title}</span>
        <br />
        {children}
      </span>
    </p>
  )
}



// A wide, low view across the whole page, like standing at the edge of a stone yard.
export function Panorama({ name, className = '' }) {
  return (
    <div className={`relative aspect-[4/3] overflow-hidden bg-basalt sm:aspect-[21/9] ${className}`}>
      <AmbientVideo {...clip(name)} className="absolute inset-0 h-full w-full" />
    </div>
  )
}

// A panel mounted in a deep paper border, the way a relief tile is shown on a wall.
export function Mounted({ name, className = '' }) {
  return (
    <div className={`bg-paper p-[6%] shadow-[0_24px_50px_-28px_rgb(0_0_0/0.45)] ${className}`}>
      <div className="relative aspect-square overflow-hidden bg-basalt shadow-[inset_0_2px_8px_rgb(0_0_0/0.35)]">
        <AmbientVideo {...clip(name)} className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  )
}

// Looking down into a round stone basin: the clip in a circle with a carved rim.
export function Basin({ name, className = '' }) {
  return (
    <div className={`rounded-full bg-[#8E8574] p-[3.5%] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] ${className}`}>
      <div className="relative aspect-square overflow-hidden rounded-full bg-basalt">
        <AmbientVideo {...clip(name)} className="absolute inset-0 h-full w-full scale-[1.15]" />
        <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-[inset_0_10px_40px_rgb(0_0_0/0.65)]" />
      </div>
    </div>
  )
}

// Seen through a workshop window: three panes, a frame and a sill.
export function Window({ name, className = '' }) {
  return (
    <div className={className}>
      <div className="relative aspect-[4/3] overflow-hidden border-[10px] border-[#5A4A3A] bg-basalt sm:aspect-[16/9] md:border-[14px]">
        <AmbientVideo {...clip(name)} className="absolute inset-0 h-full w-full" />
        <span aria-hidden="true" className="absolute inset-y-0 left-1/3 w-2 -translate-x-1/2 bg-[#5A4A3A] md:w-3" />
        <span aria-hidden="true" className="absolute inset-y-0 left-2/3 w-2 -translate-x-1/2 bg-[#5A4A3A] md:w-3" />
      </div>
      <div aria-hidden="true" className="-mx-[3%] h-4 bg-[#6B5A48] shadow-[0_16px_24px_-14px_rgb(0_0_0/0.5)] md:h-5" />
    </div>
  )
}
export { clip }
