import { Link } from 'react-router'
import { site } from '../data/site'
import { Reveal } from '../components/Motion'
import { SplitText } from '../components/Motion'

// The quiet closing line used at the end of most pages: an address, not a sales pitch.
export default function Invitation({
  title = 'For works, commissions and exhibitions.',
  linkLabel = 'Get in touch',
  to = '/contact',
}) {
  return (
    <section aria-labelledby="invitation-title" className="border-t border-stone">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-8 py-24 md:py-32">
        <SplitText as="h2" id="invitation-title" className="display col-span-12 text-[clamp(2rem,1.2rem+2.8vw,3.8rem)] leading-[1.02] md:col-span-7" text={title} />
        <Reveal delay={0.2} className="col-span-12 self-end md:col-span-4 md:col-start-9">
          <Link to={to} className="arrow-link">{linkLabel}</Link>
          <p className="mt-4 text-[0.95rem] text-ink-soft">
            <a href={`mailto:${site.email}`} className="text-link">{site.email}</a>
          </p>
          {site.representation && (
            <p className="caption mt-3">
              Represented by {site.representation.name}, {site.representation.city}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
