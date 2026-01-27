'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProjectData } from '@/lib/projects'
import { format } from 'date-fns'
import { PlayIcon } from '@heroicons/react/24/solid'
import VideoModal from './VideoModal'

interface ProjectCardProps {
  project: ProjectData
  animationDelay?: number
}

export default function ProjectCard({ project, animationDelay = 0 }: ProjectCardProps) {
  const [showVideo, setShowVideo] = useState(false)
  const delayClass = animationDelay > 0 ? `stagger-delay-${Math.min(animationDelay, 6)}` : ''

  const getCtaText = () => {
    switch (project.type) {
      case 'github':
        return 'View Source'
      case 'chrome':
        return 'Get Extension'
      case 'npm':
        return 'View Package'
      default:
        return 'View Live'
    }
  }

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowVideo(true)
  }

  return (
    <>
      <article className={`glass-card glass-card-hover rounded-xl overflow-hidden stagger-animation ${delayClass} group h-full`}>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col h-full"
        >
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain transition-all duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Play button overlay */}
            {project.youtubeId && (
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center bg-black/40
                           opacity-70 md:opacity-0 md:group-hover:opacity-100
                           transition-opacity duration-300"
                aria-label="Play video demo"
              >
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14
                                bg-white/20 backdrop-blur-sm rounded-full
                                shadow-lg hover:bg-white/30 transition-colors">
                  <PlayIcon className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-lg ml-0.5" />
                </div>
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 relative flex-grow flex flex-col">
            <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-b-xl"></div>
            <div className="relative z-10 flex flex-col h-full">
              {/* Title */}
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 line-clamp-2 group-hover:translate-x-1 transition-all duration-200">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed flex-grow">
                {project.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200/20 dark:border-gray-700/30">
                {/* Date */}
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(project.lastUpdated), 'MMM yyyy')}
                </span>

                {/* CTA Button */}
                <span
                  className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium
                             bg-indigo-600/10 text-indigo-400
                             group-hover:bg-indigo-600 group-hover:text-white
                             transition-all duration-200"
                >
                  {getCtaText()}
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </a>
      </article>

      {/* Video Modal */}
      {project.youtubeId && (
        <VideoModal
          youtubeId={project.youtubeId}
          isOpen={showVideo}
          onClose={() => setShowVideo(false)}
          isVertical={project.youtubeIsShort}
        />
      )}
    </>
  )
}
