import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import ArtImage from './ArtImage'
import { Stagger } from './Motion'
import { projectBySlug, workPath } from '../data/projects'
import { artist, site } from '../data/site'
import { useT } from '../i18n'

/*
  Where to see the work: a surveyor's chart of western and central India (a plain latitude and
  longitude grid, no borders) with the workshop near Mumbai and each public work, joined by the
  road each piece travelled. Below, a card per work with its place and a link to directions.
  Positions come from artist.publicWorks and site.workshop in src/data/site.js.
*/
const box = { lonMin: 72, lonMax: 80.5, latMin: 18.4, latMax: 22.2 }
const W = 850
const H = Math.round(((box.latMax - box.latMin) / (box.lonMax - box.lonMin)) * W * 1.07)
const x = (lon) => ((lon - box.lonMin) / (box.lonMax - box.lonMin)) * W
const y = (lat) => ((box.latMax - lat) / (box.latMax - box.latMin)) * H

// Straight-line distance in km, for the note under the chart.
function km(a, b) {
  const r = Math.PI / 180
  const d = Math.sin(((b.lat - a.lat) * r) / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lon - a.lon) * r) / 2) ** 2
  return Math.round((12742 * Math.asin(Math.sqrt(d))) / 50) * 50
}

export default function PublicWorksMap({ className = '' }) {
  const t = useT()
  const reduce = useReducedMotion()
  const home = site.workshop
  const works = artist.publicWorks.map((w) => ({ ...w, p: projectBySlug[w.slug] }))
  const far = Math.max(...works.map((w) => km(home, w)))

  return (
    <div className={className}>
      <figure>
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="group" aria-labelledby="pw-map-title">
          <title id="pw-map-title">
            {t('Chart: the workshop at Nalasopara, near Mumbai, and the public works at {towns}, about {km} km away.', { towns: works.map((w) => t(w.town)).join(t(' and ')), km: far })}
          </title>
          {/* Graticule: a line every degree */}
          <g stroke="currentColor" strokeOpacity="0.1" strokeWidth="1">
            {Array.from({ length: Math.floor(box.lonMax) - Math.ceil(box.lonMin) + 1 }, (_, i) => Math.ceil(box.lonMin) + i).map((lon) => (
              <line key={`lon${lon}`} x1={x(lon)} x2={x(lon)} y1="0" y2={H} />
            ))}
            {Array.from({ length: Math.floor(box.latMax) - Math.ceil(box.latMin) + 1 }, (_, i) => Math.ceil(box.latMin) + i).map((lat) => (
              <line key={`lat${lat}`} y1={y(lat)} y2={y(lat)} x1="0" x2={W} />
            ))}
          </g>
          <g className="caption" fill="currentColor" fillOpacity="0.45" fontSize="11">
            {[19, 20, 21, 22].map((lat) => <text key={lat} x="6" y={y(lat) - 6}>{lat}° N</text>)}
            {[73, 75, 77, 79].map((lon) => <text key={lon} x={x(lon) + 6} y={H - 8}>{lon}° E</text>)}
          </g>
          <text x={x(72.35)} y={y(21.6)} className="display" fontSize="22" fontStyle="italic" fill="currentColor" fillOpacity="0.35">{t('Arabian Sea')}</text>

          {/* The road each work travelled, drawn when the chart comes into view */}
          {works.map((w, i) => {
            const [x1, y1, x2, y2] = [x(home.lon), y(home.lat), x(w.lon), y(w.lat)]
            const d = `M${x1},${y1} Q${(x1 + x2) / 2},${Math.min(y1, y2) - 70 - i * 40} ${x2},${y2}`
            return (
              <motion.path
                key={w.slug}
                d={d}
                fill="none"
                stroke="var(--color-geru)"
                strokeWidth="1.5"
                strokeDasharray="5 6"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 2.2, delay: 0.3 + i * 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )
          })}

          {/* The workshop */}
          <g transform={`translate(${x(home.lon)},${y(home.lat)})`}>
            <rect x="-6" y="-6" width="12" height="12" fill="var(--color-ink)" />
            <text x="16" y="-4" className="display" fontSize="24" fill="currentColor">{t('Workshop')}</text>
            <text x="16" y="16" className="caption" fontSize="12" fill="currentColor" fillOpacity="0.65">{t('Nalasopara, near Mumbai')}</text>
          </g>

          {/* The public works; the second label sits below its point so the two do not collide */}
          {works.map((w, i) => (
            <a key={w.slug} href={w.map} target="_blank" rel="noreferrer" aria-label={t('{title}, {town}: open in Google Maps', { title: w.p.title, town: w.town })}>
              <g transform={`translate(${x(w.lon)},${y(w.lat)})`} className="transition-opacity hover:opacity-70">
                <circle r="13" fill="var(--color-geru)" fillOpacity="0.15" />
                <circle r="6" fill="var(--color-geru)" />
                <text x="-18" y={i === 0 ? 30 : -14} textAnchor="end" className="display" fontSize="22" fontStyle="italic" fill="currentColor">{t(w.p.title)}</text>
                <text x="-18" y={i === 0 ? 48 : -36} textAnchor="end" className="caption" fontSize="12" fill="currentColor" fillOpacity="0.65">{t(w.town)}</text>
              </g>
            </a>
          ))}
        </svg>
        <figcaption className="caption mt-4">
          {t('Made in the workshop near Mumbai and set up about {km} km away in Nagpur. Positions are approximate; the links give directions.', { km: far })}
        </figcaption>
      </figure>

      <Stagger as="ul" itemAs="li" className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2">
        {works.map((w) => (
          <article key={w.slug} className="grid grid-cols-[7.5rem_1fr] gap-5 sm:grid-cols-[9rem_1fr]">
            <Link to={workPath(w.p)} className="block">
              <ArtImage image={w.p.cover} ratio="3/4" sizes="9rem" />
            </Link>
            <div>
              <p className="caption tabular-nums">{w.year}</p>
              <h3 className="label-title mt-1 text-[1.6rem] leading-tight">
                <Link to={workPath(w.p)} className="hover:text-geru">{t(w.p.title)}</Link>
              </h3>
              <p className="mt-2 text-[0.95rem]">{t(w.place)}</p>
              <a href={w.map} target="_blank" rel="noreferrer" className="text-link mt-4 text-[0.95rem]">{t('Directions')} ↗</a>
            </div>
          </article>
        ))}
      </Stagger>
    </div>
  )
}
