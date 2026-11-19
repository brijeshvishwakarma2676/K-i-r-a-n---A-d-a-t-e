import { Link } from 'react-router'
import Seo from '../components/Seo'
import ArtImage from '../components/ArtImage'
import { projects, projectBySlug } from '../data/projects'
import { disciplineBySlug } from '../data/disciplines'
import { exhibitions, yearOf } from '../data/exhibitions'
import { artist, site } from '../data/site'

/*
  The portfolio as a document: A4 landscape sheets made from the same data as the site, to save
  as a PDF from the browser (or with scripts/make-portfolio-pdf.mjs, which writes
  public/kiran-adate-portfolio.pdf). On screen the sheets are shown one under another.
*/
const PDF = site.portfolioPdf

// Works given a sheet of their own, in this order, with the photograph to use and the width of its
// column (wide for a landscape photograph, so the statue and its plaque fit uncropped).
const FEATURE = ['statue-of-freedom-of-press', 'sculpture-of-hawker']
const FEATURE_LAYOUT = {
  'statue-of-freedom-of-press': { image: 'kiran/freedom-of-press-day', cols: 'grid-cols-[1.75fr_1fr]' },
  'sculpture-of-hawker': { cols: 'grid-cols-[1.2fr_1fr]' },
}
const PAIRS = [['expectant-couple', 'standing-couple'], ['reclining-couple', 'two-torsos']]
const shown = new Set([...FEATURE, ...PAIRS.flat()])
const rest = projects.filter((p) => !shown.has(p.slug))
const perSheet = 12
const indexSheets = Array.from({ length: Math.ceil(rest.length / perSheet) }, (_, i) => rest.slice(i * perSheet, (i + 1) * perSheet))
const year = new Date().getFullYear()

const label = (p) => [disciplineBySlug[p.discipline]?.name, p.medium, p.year].filter(Boolean).join(', ')

export default function Portfolio() {
  return (
    <main className="portfolio bg-[#d5d0c6] py-10 print:bg-transparent print:py-0">
      <Seo title="Portfolio" description={`Portfolio of ${site.name}, sculptor, ${site.basedIn}: selected works, public works and press.`} />
      <nav aria-label="Portfolio" className="mx-auto mb-8 flex max-w-[297mm] flex-wrap items-center justify-between gap-4 px-4 print:hidden">
        <Link to="/" className="text-link text-[0.95rem]">← {site.name}</Link>
        <div className="flex flex-wrap gap-3">
          <a href={PDF} download className="btn btn-solid">Download PDF</a>
          <button type="button" onClick={() => window.print()} className="btn">Print</button>
        </div>
      </nav>

      {/* Cover */}
      <Sheet className="grid grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-between p-[14mm]">
          <p className="caption">Portfolio, {year}</p>
          <div>
            <h1 className="display text-[64pt] leading-[0.9]">{site.name}</h1>
            <p className="display mt-4 text-[20pt] italic">{site.tagline}</p>
          </div>
          <p className="caption">{site.role}, {site.basedIn} · {site.url.replace('https://', '')}</p>
        </div>
        <div className="relative pt-[10mm]">
          <ArtImage image={{ id: 'portrait/kiran-adate', alt: `Portrait of ${site.name}`, fit: 'contain', position: '50% 100%' }} fill priority sizes="150mm" />
        </div>
      </Sheet>

      {/* About */}
      <Sheet className="grid grid-cols-[1fr_1.15fr] gap-[12mm] p-[14mm]">
        <div className="flex flex-col">
          <h2 className="display text-[30pt]">About</h2>
          <p className="mt-5 text-[10.5pt] leading-relaxed">{artist.shortBio}</p>
          <blockquote className="display mt-6 border-l-2 border-geru pl-5 text-[14pt] italic leading-snug">
            “{artist.quote.text}”
            <footer className="caption mt-2 not-italic">{site.name}, {artist.quote.source}</footer>
          </blockquote>
          <div className="mt-auto pt-6"><ArtImage image={artist.portrait} ratio="16/9" priority sizes="120mm" /></div>
        </div>
        <div className="text-[9.5pt]">
          <Record title="Education" rows={[['', artist.education]]} />
          <Record title="Public works" rows={artist.publicWorks.map((w) => [w.year, `${projectBySlug[w.slug].title}, ${w.place}`])} />
          <Record title="Exhibitions" rows={exhibitions.map((x) => [yearOf(x), `${x.title}, ${x.kind.toLowerCase()}, ${x.venue}, ${x.city}`])} />
          <Record title="Press" rows={artist.press.map((x) => [x.year, `${x.title}. ${x.outlet}`])} />
          <Record title="Studio" rows={[[site.since, `${site.studio}, ${site.basedIn}; workshop at Nalasopara`]]} />
        </div>
      </Sheet>

      {/* Major works, a sheet each */}
      {FEATURE.map((slug) => {
        const p = projectBySlug[slug]
        const side = p.making?.filter((s) => s.image).slice(0, 3) || []
        const layout = FEATURE_LAYOUT[slug] || {}
        return (
          <Sheet key={slug} className={`grid gap-[10mm] p-[12mm] ${layout.cols || 'grid-cols-[1.35fr_1fr]'}`}>
            <div className="min-h-0">
              <ArtImage image={layout.image ? { id: layout.image, alt: p.cover.alt } : p.cover} fill priority sizes="180mm" className="!h-full" />
            </div>
            <div className="flex min-h-0 flex-col">
              <p className="caption">{label(p)}</p>
              <h2 className="label-title mt-1 text-[26pt] leading-tight">{p.title}</h2>
              {p.location && <p className="caption mt-1">{p.location}</p>}
              <div className="mt-4 space-y-2 text-[9.5pt] leading-relaxed">{p.description?.map((t) => <p key={t}>{t}</p>)}</div>
              {side.length > 0 && (
                <div className="mt-auto pt-4">
                  <p className="caption mb-2">The making</p>
                  <div className="grid grid-cols-3 gap-2">
                    {side.map((s) => (
                      <figure key={s.label}>
                        <ArtImage image={s.image} ratio="1/1" priority sizes="40mm" />
                        <figcaption className="caption mt-1 !text-[7pt]">{s.label}, {s.date}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Sheet>
        )
      })}

      {/* Stone works, two to a sheet */}
      {PAIRS.map((pair) => (
        <Sheet key={pair[0]} className="grid grid-cols-2 gap-[10mm] p-[12mm]">
          {pair.map((slug) => {
            const p = projectBySlug[slug]
            return (
              <figure key={slug} className="flex min-h-0 flex-col">
                <div className="min-h-0 flex-1"><ArtImage image={p.cover} fill priority sizes="130mm" /></div>
                <figcaption className="mt-3">
                  <span className="label-title text-[15pt]">{p.title}</span>
                  <span className="caption ml-2">{label(p)}</span>
                </figcaption>
              </figure>
            )
          })}
        </Sheet>
      ))}

      {/* Index of further works */}
      {indexSheets.map((list, i) => (
        <Sheet key={i} className="flex flex-col p-[12mm]">
          <h2 className="display text-[20pt]">Selected works{indexSheets.length > 1 ? ` (${i + 1} of ${indexSheets.length})` : ''}</h2>
          <ul className="mt-5 grid min-h-0 flex-1 grid-cols-6 grid-rows-2 gap-x-[5mm] gap-y-[6mm]">
            {list.map((p) => (
              <li key={p.slug} className="flex min-h-0 flex-col">
                <div className="min-h-0 flex-1"><ArtImage image={p.cover} fill priority sizes="45mm" /></div>
                <p className="label-title mt-1.5 text-[9pt] leading-tight">{p.title}</p>
                <p className="caption !text-[7pt]">{label(p)}</p>
              </li>
            ))}
          </ul>
        </Sheet>
      ))}

      {/* Press */}
      <Sheet className="flex flex-col p-[12mm]">
        <h2 className="display text-[20pt]">In the press</h2>
        <ul className="my-auto grid grid-cols-5 gap-[5mm]">
          {artist.press.map((x) => (
            <li key={x.image}>
              <div className="aspect-square bg-paper p-1"><ArtImage image={{ id: x.image, alt: x.title, fit: 'contain' }} fill priority sizes="55mm" /></div>
              <p className="label-title mt-2 text-[9.5pt] leading-tight">{x.title}</p>
              <p className="caption !text-[7pt]">{x.outlet}</p>
            </li>
          ))}
        </ul>
      </Sheet>

      {/* Contact */}
      <Sheet className="grid grid-cols-[1fr_1fr] gap-[12mm] p-[14mm]">
        <div className="flex flex-col justify-between">
          <h2 className="display text-[40pt] leading-[0.95]">For works, commissions and exhibitions.</h2>
          <div className="space-y-1 text-[11pt]">
            <p>{site.email}</p>
            {site.phones.map((ph) => <p key={ph.tel}>{ph.label}</p>)}
            <p className="caption pt-2">{site.url.replace('https://', '')}</p>
          </div>
        </div>
        <div className="flex flex-col justify-end gap-6 text-[10pt]">
          {[site.office, site.workshop].map((a) => (
            <address key={a.label} className="not-italic">
              <p className="caption">{a.label}</p>
              {a.lines.map((l) => <p key={l}>{l}</p>)}
            </address>
          ))}
          <p className="caption">{site.visits}</p>
        </div>
      </Sheet>
    </main>
  )
}

function Sheet({ children, className = '' }) {
  return (
    <section className={`sheet relative mx-auto mb-8 h-[210mm] w-[297mm] overflow-hidden bg-limestone shadow-[0_10px_40px_-20px_rgb(0_0_0/0.5)] print:mb-0 print:shadow-none ${className}`}>
      {children}
    </section>
  )
}

function Record({ title, rows }) {
  return (
    <div className="mb-5">
      <h3 className="caption mb-1.5 border-b border-stone pb-1">{title}</h3>
      {rows.map(([y, t], i) => (
        <p key={i} className="grid grid-cols-[3.2rem_1fr] gap-2 py-0.5 leading-snug">
          <span className="tabular-nums text-ink-soft">{y}</span>
          <span>{t}</span>
        </p>
      ))}
    </div>
  )
}
