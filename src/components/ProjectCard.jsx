import { Link } from 'react-router'
import ArtImage from './ArtImage'
import { ImageReveal } from './Motion'
import { disciplineBySlug } from '../data/disciplines'
import { fullJourney, workPath } from '../data/projects'
import { useT } from '../i18n'

// A work in a grid, captioned like a gallery wall label: title, then medium and size where known.
// `image` shows another of the work's photographs instead of its cover. A work whose page tells
// its whole story in its own photographs (fullJourney in projects.js) carries a "Full journey" tag.
export default function ProjectCard({ project, image = project.cover, ratio = '4/5', className = '', showDiscipline = true, sizes }) {
  const t = useT()
  const d = disciplineBySlug[project.discipline]
  const label = [t(project.medium), project.dimensions].filter(Boolean).join(' · ')
  return (
    <Link to={workPath(project)} className={`group block ${className}`}>
      <div className="relative">
        <ImageReveal>
          <div className="sheen overflow-hidden">
            <div className="transition-transform duration-[1.2s] ease-gallery group-hover:scale-[1.045]">
              <ArtImage image={image} ratio={ratio} sizes={sizes} />
            </div>
          </div>
        </ImageReveal>
        {fullJourney(project) && (
          <span className="pointer-events-none absolute left-3 top-3 z-20 inline-flex items-center gap-2 bg-limestone/90 journey-tag px-2.5 py-1.5 text-ink backdrop-blur-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-geru" />
            {t('Full journey')}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-[1.4rem] leading-tight md:text-[1.55rem]">
        <span className="label-title bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-gallery [background-image:linear-gradient(currentColor,currentColor)] group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]">
          {t(project.title)}
        </span>
        {project.year && <span className="display">, {project.year}</span>}
      </h3>
      <p className="caption mt-1 transition-transform duration-500 ease-gallery group-hover:translate-x-1">
        {showDiscipline && d && <span className="mr-3 text-geru">{t(d.shortName)}</span>}
        {label}
      </p>
    </Link>
  )
}
