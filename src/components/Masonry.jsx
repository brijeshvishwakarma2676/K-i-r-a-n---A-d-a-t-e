import ProjectCard from './ProjectCard'

// Column layout that keeps each photograph at its own proportions instead of cropping to one shape.
export default function Masonry({ projects, showDiscipline = false }) {
  const many = projects.length > 4
  return (
    <div className={`gap-x-6 sm:columns-2 ${many ? 'lg:columns-3' : 'md:gap-x-10'}`}>
      {projects.map((p) => (
        <ProjectCard
          key={p.slug}
          project={p}
          ratio="natural"
          showDiscipline={showDiscipline}
          className="mb-14 break-inside-avoid md:mb-16"
          sizes={many ? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' : '(min-width: 640px) 50vw, 100vw'}
        />
      ))}
    </div>
  )
}
