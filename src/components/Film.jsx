import { useState } from 'react'
import ArtImage from './ArtImage'
import { useT } from '../i18n'

/*
  A film of the work: a still from the work's photographs with a play button, replaced by the
  video when the visitor presses it. Nothing of the video downloads until then, and it never starts
  by itself or with sound unasked. `film` is the work's { src, poster, caption, captions?, length? }
  as built in src/data/projects.js; files live in public/film (see scripts/make-film.sh).
*/
export default function Film({ film, title, className = '' }) {
  const t = useT()
  const [playing, setPlaying] = useState(false)

  return (
    <figure className={className}>
      <div className="relative aspect-video overflow-hidden bg-[#1b1a18]">
        {playing ? (
          <video
            className="absolute inset-0 h-full w-full"
            src={film.src}
            controls
            autoPlay
            playsInline
            preload="auto"
            aria-label={t('Film: {title}', { title })}
          >
            {film.captions && <track kind="captions" src={film.captions} srcLang="en" label="English" default />}
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 block w-full cursor-pointer text-left"
            aria-label={t('Play the film: {title}', { title })}
          >
            <ArtImage image={film.poster} fill sizes="(min-width: 768px) 80vw, 100vw" />
            <span className="absolute inset-0 bg-[#1b1a18]/25 transition-colors duration-500 group-hover:bg-[#1b1a18]/10" />
            <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ECE7DD] text-[#22211E] shadow-[0_10px_30px_rgb(0_0_0/0.35)] transition-transform duration-500 group-hover:scale-105 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-geru md:h-24 md:w-24">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor" /></svg>
            </span>
            {film.length && (
              <span className="caption absolute bottom-3 right-3 bg-[#1b1a18]/70 px-2.5 py-1.5 tabular-nums !text-[#ECE7DD]">{film.length}</span>
            )}
          </button>
        )}
      </div>
      {film.caption && <figcaption className="caption mt-4">{t(film.caption)}</figcaption>}
    </figure>
  )
}
