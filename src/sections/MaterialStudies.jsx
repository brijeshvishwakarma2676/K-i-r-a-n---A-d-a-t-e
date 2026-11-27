import { Link } from 'react-router'
import { Frieze, Niche, StudyLabel } from '../components/StudyFrames'
import { Reveal, SplitText } from '../components/Motion'
import { useT } from '../i18n'

/*
  Home: the way into the moving studies (/material), with two studies of its own, framed as they
  are on that page: an uncarved block standing in a niche, and water bringing out the veins of
  marble as a frieze (VIDEO-GENERATION.md, H3 and H4). Generated studies of material, not his works,
  so they sit apart from "From block to statue", which shows the real making of a real work.
*/
export default function MaterialStudies() {
  const t = useT()
  return (
    <section aria-labelledby="studies-title" className="room-dark py-28 md:py-40">
      <div className="wrap grid grid-cols-12 items-end gap-x-6 gap-y-12">
        <div className="col-span-12 md:col-span-6">
          <p className="caption mb-4">{t('Moving studies')}</p>
          <SplitText as="h2" id="studies-title" className="display text-[clamp(2.4rem,1.4rem+3.6vw,4.6rem)]" text="Material and light" />
          <Reveal as="p" className="mt-6 max-w-[44ch] text-[1.04rem]">
            {t('Silent studies of stone, bronze, steel and the hand, shown slowly, the way a material is looked at in the workshop.')}
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/material" className="arrow-link mt-10 flex w-fit">{t('See the studies')}</Link>
          </Reveal>
        </div>
        <Reveal className="col-span-8 col-start-3 sm:col-span-5 sm:col-start-5 md:col-span-3 md:col-start-9">
          <Niche name="home-block" />
          <StudyLabel title={t('The block')} className="mt-8">{t('Marble, uncarved, at dawn')}</StudyLabel>
        </Reveal>
      </div>
      <Reveal className="mt-20 md:mt-28 md:px-[var(--gutter)]">
        <Frieze name="home-water" />
      </Reveal>
      <div className="wrap mt-5">
        <StudyLabel title={t('Wet stone')}>{t('Water brings out the veins')}</StudyLabel>
      </div>
    </section>
  )
}
