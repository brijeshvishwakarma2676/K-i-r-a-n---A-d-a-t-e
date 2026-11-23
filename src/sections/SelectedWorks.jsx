import { Link } from 'react-router'
import ProjectCard from '../components/ProjectCard'
import { projectBySlug } from '../data/projects'
import { SplitText } from '../components/Motion'
import { useT } from '../i18n'

// Hand-placed rather than a uniform grid: each work gets a size and position of its own.
// This is the first look at the work, so only the strongest, sharpest photographs go here (large
// files, clean backgrounds, nothing in the way). Kiran Adate's own recent pieces lead.
// Ratios follow each photograph's own orientation so nothing important is cropped away.
// `view` picks another of the work's photographs (0 = its cover).
const layout = [
  { slug: 'freedom', ratio: '4/5', cls: 'md:col-span-7' },
  { slug: 'lit-relief-in-a-lounge', ratio: '4/3', cls: 'md:col-span-5 md:col-start-8 md:mt-[38%]' },
  { slug: 'beyond-boundaries', ratio: '3/4', cls: 'md:col-span-4 md:col-start-2' },
  { slug: 'expectant-couple', ratio: '4/5', cls: 'md:col-span-5 md:col-start-7 md:mt-[18%]' },
  { slug: 'extraction-of-negative-energy', ratio: '3/4', cls: 'md:col-span-4 md:col-start-1' },
  { slug: 'sculpture-of-hawker', view: 1, ratio: '4/3', cls: 'md:col-span-6 md:col-start-6 md:mt-[16%]' },
  { slug: 'eternal-orbit', ratio: '3/4', cls: 'md:col-span-4 md:col-start-3' },
  { slug: 'hugging', ratio: '3/4', cls: 'md:col-span-4 md:col-start-8 md:mt-[14%]' },
]

export default function SelectedWorks() {
  const t = useT()
  return (
    <section aria-labelledby="selected-title" className="wrap py-28 md:py-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SplitText as="h2" id="selected-title" className="display text-[clamp(2.4rem,1.4rem+3.6vw,4.6rem)]" text="Selected works" />
        <Link to="/works" className="text-link text-[0.95rem]">{t('All works')}</Link>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-16 md:mt-24 md:grid-cols-12 md:gap-y-24">
        {layout.map(({ slug, view = 0, ratio, cls }) => {
          const p = projectBySlug[slug]
          return <ProjectCard key={slug} project={p} image={[p.cover, ...p.gallery][view]} ratio={ratio} className={cls} sizes="(min-width: 768px) 50vw, 100vw" />
        })}
      </div>
    </section>
  )
}
