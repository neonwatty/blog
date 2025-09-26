import Image from 'next/image'
import { ProjectData } from '@/lib/projects'
import { format } from 'date-fns'

interface ProjectCardProps {
  project: ProjectData
  animationDelay?: number
}

export default function ProjectCard({ project, animationDelay = 0 }: ProjectCardProps) {
  const delayClass = animationDelay > 0 ? `stagger-delay-${Math.min(animationDelay, 6)}` : ''

  const getIcon = () => {
    switch (project.type) {
      case 'github':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        )
      case 'chrome':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.5a9.5 9.5 0 11-9.5 9.5A9.5 9.5 0 0112 2.5zm0 3.75a5.75 5.75 0 100 11.5 5.75 5.75 0 000-11.5zm0 2a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5z"/>
          </svg>
        )
      case 'npm':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/>
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )
    }
  }

  return (
    <article className={`glass-card glass-card-hover rounded-xl overflow-hidden stagger-animation ${delayClass} group`}>
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain transition-all duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-6 relative">
          <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-b-xl"></div>
          <div className="relative z-10">
            <h2 className="heading-md text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:translate-x-1 transition-all duration-200">
              {project.title}
            </h2>

            <p className="body-regular text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {project.description}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Updated {format(new Date(project.lastUpdated), 'MMM yyyy')}
            </p>

            <div className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-all duration-200 group-hover:translate-x-2">
              <span className="mr-2">
                {project.type === 'github' ? 'View on GitHub' :
                 project.type === 'chrome' ? 'Get Extension' :
                 project.type === 'npm' ? 'View on npm' : 'Visit Project'}
              </span>
              {getIcon()}
            </div>
          </div>
        </div>
      </a>
    </article>
  )
}