import { Link } from 'react-router'
import { artist, site } from '../data/site'
import { Reveal, ScrollWords } from '../components/Motion'

export default function Statement() {
  return (
    <section className="wrap py-28 md:py-44" aria-labelledby="statement-title">
      <h2 id="statement-title" className="sr-only">About the work</h2>
      <div className="grid grid-cols-12 gap-x-6">
        <figure className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-9 lg:col-start-3">
          <blockquote className="display text-[clamp(1.9rem,1.2rem+2.8vw,3.7rem)] leading-[1.08] tracking-[-0.01em]">
            <ScrollWords text={artist.statement} />
          </blockquote>
          <Reveal as="figcaption" className="mt-10 flex flex-wrap items-baseline justify-between gap-6">
            <span className="caption">On the work of {site.name}</span>
            <Link to="/about" className="text-link text-[0.95rem]">About {site.name}</Link>
          </Reveal>
        </figure>
      </div>
    </section>
  )
}
