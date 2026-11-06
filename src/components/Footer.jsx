import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ease } from './Motion'
import { site } from '../data/site'
import { disciplines } from '../data/disciplines'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="on-dark overflow-hidden bg-basalt text-bone">
      <div className="wrap pb-10 pt-20 md:pt-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-[clamp(1.8rem,1.3rem+1.6vw,2.6rem)] leading-tight">{site.name}</p>
            <p className="caption mt-2">{site.short}</p>
            <a href={`mailto:${site.email}`} className="text-link mt-8 inline-block text-[1.05rem] text-bone/90 hover:text-bone">
              {site.email}
            </a>
            <p className="mt-3 text-[0.95rem] text-bone/80">
              <a href={`tel:${site.phones[0].tel}`} className="tabular-nums hover:text-bone">{site.phones[0].label}</a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-6 md:col-start-7">
            <div>
              <h2 className="caption mb-4">Works</h2>
              <ul className="space-y-2 text-[0.9rem]">
                {disciplines.map((d) => (
                  <li key={d.slug}>
                    <Link to={`/works/${d.slug}`} className="text-bone/85 hover:text-bone">{d.shortName}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="caption mb-4">Site</h2>
              <ul className="space-y-2 text-[0.9rem]">
                <li><Link to="/exhibitions" className="text-bone/85 hover:text-bone">Exhibitions</Link></li>
                <li><Link to="/about" className="text-bone/85 hover:text-bone">About</Link></li>
                <li><Link to="/contact" className="text-bone/85 hover:text-bone">Contact</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="caption mb-4">Studio</h2>
              <p className="text-[0.9rem] leading-relaxed text-bone/85">
                {site.workshop.lines[1]}, near {site.basedIn}
              </p>
              <p className="caption mt-5 max-w-[24ch]">
                The studio’s architectural and garden work is on{' '}
                <a href={site.products.url} target="_blank" rel="noreferrer" className="underline decoration-bone/30 underline-offset-4 hover:text-bone">
                  {site.products.name}
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* The name, rising letter by letter as the page ends */}
        <motion.p
          aria-hidden="true"
          className="display mt-16 select-none whitespace-nowrap pb-[0.16em] text-center text-[13.5vw] font-light leading-[0.8] tracking-[-0.03em] text-bone/[0.08] md:mt-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -5% 0px' }}
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        >
          {site.name.split('').map((ch, i) => (
            <span key={i} className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em]">
              <motion.span
                className="inline-block whitespace-pre"
                variants={{ hidden: { y: '100%' }, show: { y: '0%', transition: { duration: 1.2, ease } } }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </motion.p>

        <div className="flex flex-col gap-2 border-t border-bone/15 pt-6 sm:flex-row sm:justify-between">
          <p className="caption">© {year} {site.name}</p>
          {site.credit && (
            <p className="caption">
              {site.credit.label}{' '}
              <a href={site.credit.url} target="_blank" rel="noreferrer" className="underline decoration-bone/30 underline-offset-4 hover:text-bone">
                {site.credit.name}
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
