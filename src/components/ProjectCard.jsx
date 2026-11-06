import { Link } from 'react-router'
import ArtImage from './ArtImage'
import { ImageReveal } from './Motion'
import { disciplineBySlug } from '../data/disciplines'
import { workPath } from '../data/projects'

// A work in a grid, captioned like a gallery wall label: title, then medium and catalogue number.
export default function ProjectCard({ project, ratio = '4/5', className = '', showDiscipline = true, sizes }) {
  const d = disciplineBySlug[project.discipline]
  const label = [project.medium, project.code].filter(Boolean).join(' · ')
  return (
    <Link to={workPath(project)} className={`group block ${className}`}>
      <ImageReveal>
        <div className="sheen overflow-hidden">
          <div className="transition-[filter,transform] duration-[1.2s] ease-gallery group-hover:scale-[1.045] group-hover:brightness-[1.06]">
            <ArtImage image={project.cover} ratio={ratio} sizes={sizes} />
          </div>
        </div>
      </ImageReveal>
      <h3 className="mt-4 text-[1.4rem] leading-tight md:text-[1.55rem]">
        <span className="label-title bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-gallery [background-image:linear-gradient(currentColor,currentColor)] group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]">
          {project.title}
        </span>
        {project.year && <span className="display">, {project.year}</span>}
      </h3>
      <p className="caption mt-1 transition-transform duration-500 ease-gallery group-hover:translate-x-1">
        {showDiscipline && d && <span className="mr-3 text-geru">{d.shortName}</span>}
        {label}
        {project.gallery.length > 0 && <span className="ml-3 text-ink-soft/80">{project.gallery.length + 1} views</span>}
      </p>
    </Link>
  )
}
