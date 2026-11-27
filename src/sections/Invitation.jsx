import { Link } from 'react-router'
import { site } from '../data/site'
import { Reveal } from '../components/Motion'
import { SplitText } from '../components/Motion'
import AmbientVideo from '../components/AmbientVideo'
import { useT } from '../i18n'

/*
  The quiet closing line used at the end of most pages: an address, not a sales pitch.
  Behind it, softened and darkened, a hand resting on carved marble (a generated mood clip, see
  VIDEO-GENERATION.md, V1): mood only. Work pages pass film={false}, so it can never read as the
  making of that work.
*/
export default function Invitation({
  title = 'For works, commissions and exhibitions.',
  linkLabel = 'Get in touch',
  to = '/contact',
  film = true,
}) {
  const t = useT()
  return (
    <section
      aria-labelledby="invitation-title"
      className={film ? 'on-dark relative isolate overflow-hidden bg-basalt text-bone' : 'border-t border-stone'}
    >
      {film && (
        <>
          <AmbientVideo
            src="/ambient/hand-on-stone.mp4"
            poster="/ambient/hand-on-stone.webp"
            className="absolute inset-0 -z-20 h-full w-full scale-[1.06] blur-[4px] brightness-[0.72] saturate-[0.9]"
          />
          {/* Darker towards the text, so it reads on every frame */}
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(20_19_18/0.62)_0%,rgb(20_19_18/0.2)_55%,rgb(20_19_18/0.45)_100%)]" />
        </>
      )}
      <div className={`wrap grid grid-cols-12 gap-x-6 gap-y-8 ${film ? 'py-32 md:py-44' : 'py-24 md:py-32'}`}>
        <SplitText as="h2" id="invitation-title" className="display col-span-12 text-[clamp(2rem,1.2rem+2.8vw,3.8rem)] leading-[1.02] md:col-span-7" text={title} />
        <Reveal delay={0.2} className="col-span-12 self-end md:col-span-4 md:col-start-9">
          <Link to={to} className="arrow-link">{t(linkLabel)}</Link>
          <p className={`mt-4 text-[0.95rem] ${film ? 'text-bone/75' : 'text-ink-soft'}`}>
            <a href={`mailto:${site.email}`} className="text-link">{site.email}</a>
          </p>
          {site.representation && (
            <p className="caption mt-3">
              {t('Represented by')} {site.representation.name}, {site.representation.city}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
