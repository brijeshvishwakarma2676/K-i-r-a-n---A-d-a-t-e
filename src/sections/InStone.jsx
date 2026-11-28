import { Link } from 'react-router'
import ProjectCard from '../components/ProjectCard'
import { projectBySlug, stoneWorks } from '../data/projects'
import { SplitText } from '../components/Motion'
import { useT } from '../i18n'

/*
  In stone: Kiran Adate's carved stone figures, on the home page in a room of their own (the
  clay-coloured room), straight after the opening and the stone monument, before Selected works:
  the stone work is the first body of work a visitor meets. Three works in one row, hand
  placed like Selected works, so the page grows by about one screen; the rest of the stone
  works are one click away (/works?material=stone).
  The two black-marble figures lead (each from a single block, in his own profile), then a couple
  carved in the open. Ratios keep each standing figure whole, head to base.
*/
const layout = [
  { slug: 'hugging', ratio: '2/3', cls: 'col-span-2 md:col-span-4 md:col-start-2' },
  { slug: 'spectator', ratio: '2/3', cls: 'md:col-span-3 md:col-start-7 md:mt-[14%]' },
  { slug: 'standing-couple', ratio: '3/4', cls: 'md:col-span-3 md:col-start-10 md:mt-[32%]' },
]

export default function InStone() {
  const t = useT()
  return (
    <section aria-labelledby="stone-title" className="room-clay">
      <div className="wrap py-28 md:py-40">
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
          <SplitText as="h2" id="stone-title" className="display col-span-12 text-[clamp(2.4rem,1.4rem+3.6vw,4.6rem)] md:col-span-6" text="In stone" />
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <p className="max-w-[44ch] text-[1.02rem]">
              {t('Stone is where the work began. Figures carved by hand: in black marble, each from a single block, and couples worked out of the stone with the marks of the tools left in the surface.')}
            </p>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-20 md:grid-cols-12 md:gap-x-6">
          {layout.map(({ slug, ratio, cls }) => (
            <ProjectCard key={slug} project={projectBySlug[slug]} ratio={ratio} className={cls} showDiscipline={false} sizes="(min-width: 768px) 34vw, 100vw" />
          ))}
        </div>
        <Link to="/works?material=stone" className="arrow-link mt-16 flex w-fit md:mt-20">
          {t('All {n} works in stone', { n: stoneWorks.length })}
        </Link>
      </div>
    </section>
  )
}
