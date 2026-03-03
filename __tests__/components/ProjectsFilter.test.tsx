import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProjectsFilter from '@/components/ProjectsFilter'
import { ProjectData } from '@/lib/projects'

// Mock ProjectCard to simplify testing
jest.mock('@/components/ProjectCard', () => {
  return {
    __esModule: true,
    default: ({ project }: { project: ProjectData }) => (
      <div data-testid={`project-${project.id}`}>{project.title}</div>
    ),
  }
})

const mockProjects: ProjectData[] = [
  {
    id: 'app-1',
    title: 'Live App',
    description: 'A live application',
    image: '/images/projects/app1.svg',
    link: 'https://example.com',
    type: 'live',
    tags: ['react'],
    lastUpdated: '2025-01-01',
  },
  {
    id: 'github-1',
    title: 'GitHub Project',
    description: 'A GitHub repo',
    image: '/images/projects/gh1.svg',
    link: 'https://github.com/test',
    type: 'github',
    tags: ['python'],
    lastUpdated: '2025-01-01',
  },
  {
    id: 'github-2',
    title: 'Another GitHub',
    description: 'Another repo',
    image: '/images/projects/gh2.svg',
    link: 'https://github.com/test2',
    type: 'github',
    tags: ['rust'],
    lastUpdated: '2025-01-01',
  },
]

describe('ProjectsFilter', () => {
  it('shows all projects by default', () => {
    render(<ProjectsFilter projects={mockProjects} />)

    expect(screen.getByTestId('project-app-1')).toBeInTheDocument()
    expect(screen.getByTestId('project-github-1')).toBeInTheDocument()
    expect(screen.getByTestId('project-github-2')).toBeInTheDocument()
  })

  it('renders filter buttons with counts', () => {
    render(<ProjectsFilter projects={mockProjects} />)

    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Live Apps')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('filters projects when a filter button is clicked', () => {
    render(<ProjectsFilter projects={mockProjects} />)

    fireEvent.click(screen.getByText('Live Apps'))

    expect(screen.getByTestId('project-app-1')).toBeInTheDocument()
    expect(screen.queryByTestId('project-github-1')).not.toBeInTheDocument()
  })

  it('shows all projects when All filter is clicked', () => {
    render(<ProjectsFilter projects={mockProjects} />)

    // First filter to live
    fireEvent.click(screen.getByText('Live Apps'))
    expect(screen.queryByTestId('project-github-1')).not.toBeInTheDocument()

    // Then click All
    fireEvent.click(screen.getByText('All'))
    expect(screen.getByTestId('project-github-1')).toBeInTheDocument()
  })

  it('hides filter options with zero count', () => {
    render(<ProjectsFilter projects={mockProjects} />)

    // npm and chrome types have no projects, so their buttons should not render
    expect(screen.queryByText('Extensions')).not.toBeInTheDocument()
    expect(screen.queryByText('npm')).not.toBeInTheDocument()
  })

  it('shows empty state when filter has no results', () => {
    render(<ProjectsFilter projects={[]} />)

    expect(screen.getByText('No projects found for this filter.')).toBeInTheDocument()
  })

  it('displays correct count in filter chips', () => {
    render(<ProjectsFilter projects={mockProjects} />)

    // "All" should show 3, "GitHub" should show 2, "Live Apps" should show 1
    const allButton = screen.getByText('All').closest('button')
    expect(allButton).toHaveTextContent('3')

    const githubButton = screen.getByText('GitHub').closest('button')
    expect(githubButton).toHaveTextContent('2')
  })
})
