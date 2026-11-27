import { Link } from 'react-router'
import Seo from '../components/Seo'
import Plate from '../components/LazyPlate'
import { SplitText } from '../components/Motion'
import { T } from '../i18n'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="This page is not on the site. The works of sculptor Kiran Adate, Mumbai, are in Works: sculpture and relief murals in stone, bronze and steel." noindex />
      <section className="wrap grid min-h-[90svh] grid-cols-12 items-end gap-x-6 gap-y-10 pb-24 pt-[calc(var(--header-h)+3rem)]">
        <div className="col-span-12 md:col-span-6">
          <SplitText as="h1" className="display text-[clamp(3rem,2rem+5vw,7rem)] font-light leading-[0.9]" text="This page is not in the collection." immediate delay={0.3} />
          <p className="mt-6 max-w-[42ch] text-[1.02rem]"><T>The link may be out of date, or the work may have moved.</T></p>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            <Link to="/works" className="arrow-link"><T>See the works</T></Link>
            <Link to="/" className="arrow-link"><T>Home</T></Link>
          </div>
        </div>
        <div className="col-span-8 col-start-3 md:col-span-4 md:col-start-9" aria-hidden="true">
          <Plate kind="sculpture" variant="cairn" material="stone" scene="none" ratio={3 / 4} seed={404} />
        </div>
      </section>
    </>
  )
}
