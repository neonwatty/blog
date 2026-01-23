import Link from 'next/link'
import { ProjectUpdateData } from '@/lib/project-updates'
import { format } from 'date-fns'

interface ProjectUpdateCardProps {
  update: ProjectUpdateData
  animationDelay?: number
}

export default function ProjectUpdateCard({ update, animationDelay = 0 }: ProjectUpdateCardProps) {
  const formattedDate = format(new Date(update.date), 'MMMM d, yyyy')
  const delayClass = animationDelay > 0 ? `stagger-delay-${Math.min(animationDelay, 6)}` : ''

  return (
    <article className={`glass-card glass-card-hover rounded-xl overflow-hidden stagger-animation ${delayClass} group`}>
      <div className="p-5 sm:p-6 relative">
        <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-xl"></div>
        <div className="relative z-10">
          {/* Project Badge */}
          {update.projectTitle && (
            <div className="mb-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                {update.projectTitle}
              </span>
            </div>
          )}

          {/* Tags */}
          {update.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {update.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-white/30 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
            <Link
              href={`/project-updates/${update.id}`}
              className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-all duration-200 focus-ring block group-hover:translate-x-1"
            >
              {update.title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
            {update.excerpt}
          </p>

          {/* Meta information */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <time dateTime={update.date} className="flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"/>
                </svg>
                {formattedDate}
              </time>

              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                {update.readingTime}
              </span>
            </div>
          </div>

          {/* Read more link */}
          <div className="mt-4">
            <Link
              href={`/project-updates/${update.id}`}
              className="inline-flex items-center text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 font-medium text-sm transition-all duration-200 focus-ring group-hover:translate-x-2"
            >
              Read update
              <svg className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
