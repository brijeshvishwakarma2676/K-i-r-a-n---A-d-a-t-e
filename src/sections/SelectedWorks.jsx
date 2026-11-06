import { Link } from 'react-router'
import ProjectCard from '../components/ProjectCard'
import { projectBySlug } from '../data/projects'
import { SplitText } from '../components/Motion'

// Hand-placed rather than a uniform grid: each work gets a size and position of its own.
// Ratios follow each photograph's own orientation so nothing important is cropped away.
const layout = [
  { slug: 'leaning-figure-with-a-silver-mane', ratio: '4/5', cls: 'md:col-span-7' },
  { slug: 'dancers-relief-lobby-wall', ratio: '4/3', cls: 'md:col-span-5 md:col-start-8 md:mt-[38%]' },
  { slug: 'seated-buddha', ratio: '3/4', cls: 'md:col-span-4 md:col-start-2' },
  { slug: 'metal-leaf-wall-installation', ratio: '4/3', cls: 'md:col-span-6 md:col-start-7 md:mt-[24%]' },
  { slug: 'figure-on-a-bicycle', ratio: '3/4', cls: 'md:col-span-4 md:col-start-1' },
  { slug: 'rhinoceros-in-metal-mesh', ratio: '4/3', cls: 'md:col-span-6 md:col-start-6 md:mt-[16%]' },
  { slug: 'stylised-ganesha', ratio: '3/4', cls: 'md:col-span-4 md:col-start-3' },
  { slug: 'sliced-figures-on-a-rock', ratio: '4/3', cls: 'md:col-span-5 md:col-start-8 md:mt-[20%]' },
]

export default function SelectedWorks() {
  return (
    <section aria-labelledby="selected-title" className="wrap py-28 md:py-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SplitText as="h2" id="selected-title" className="display text-[clamp(2.4rem,1.4rem+3.6vw,4.6rem)]" text="Selected works" />
        <Link to="/works" className="text-link text-[0.95rem]">All works</Link>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-16 md:mt-24 md:grid-cols-12 md:gap-y-24">
        {layout.map(({ slug, ratio, cls }) => (
          <ProjectCard key={slug} project={projectBySlug[slug]} ratio={ratio} className={cls} sizes="(min-width: 768px) 50vw, 100vw" />
        ))}
      </div>
    </section>
  )
}
