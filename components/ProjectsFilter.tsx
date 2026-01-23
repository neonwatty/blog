'use client'

import { useState } from 'react'
import ProjectCard from './ProjectCard'
import { ProjectData } from '@/lib/projects'

interface ProjectsFilterProps {
  projects: ProjectData[]
}

type FilterType = 'all' | 'live' | 'github' | 'chrome' | 'npm'

const filterOptions: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'live', label: 'Live Apps' },
  { value: 'github', label: 'GitHub' },
  { value: 'chrome', label: 'Extensions' },
  { value: 'npm', label: 'npm' },
]

export default function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.type === activeFilter)

  return (
    <>
      {/* Filter Chips */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
        {filterOptions.map((option) => {
          const isActive = activeFilter === option.value
          const count = option.value === 'all'
            ? projects.length
            : projects.filter(p => p.type === option.value).length

          if (option.value !== 'all' && count === 0) return null

          return (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`
                px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium
                transition-all duration-200 ease-out
                ${isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/10'
                }
              `}
            >
              {option.label}
              <span className={`ml-1.5 text-xs ${isActive ? 'text-indigo-200' : 'text-gray-500'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            animationDelay={index + 1}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No projects found for this filter.</p>
        </div>
      )}
    </>
  )
}
