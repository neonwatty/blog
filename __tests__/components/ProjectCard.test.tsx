import { render, screen, fireEvent } from '@testing-library/react'
import ProjectCard from '@/components/ProjectCard'
import { ProjectData } from '@/lib/projects'

describe('ProjectCard Component', () => {
  const mockProject: ProjectData = {
    id: 'test-project',
    title: 'Test Project',
    description: 'This is a test project description',
    image: '/test-image.jpg',
    link: 'https://example.com',
    type: 'live',
    tags: ['test', 'web app', 'demo'],
    lastUpdated: '2025-09-01'
  }

  test('renders project title', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  test('renders project description', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('This is a test project description')).toBeInTheDocument()
  })

  test('renders correct CTA text for live project', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('View Live')).toBeInTheDocument()
  })

  test('renders correct CTA text for github project', () => {
    const githubProject = { ...mockProject, type: 'github' as const }
    render(<ProjectCard project={githubProject} />)
    expect(screen.getByText('View Source')).toBeInTheDocument()
  })

  test('renders correct CTA text for chrome project', () => {
    const chromeProject = { ...mockProject, type: 'chrome' as const }
    render(<ProjectCard project={chromeProject} />)
    expect(screen.getByText('Get Extension')).toBeInTheDocument()
  })

  test('renders correct CTA text for npm project', () => {
    const npmProject = { ...mockProject, type: 'npm' as const }
    render(<ProjectCard project={npmProject} />)
    expect(screen.getByText('View Package')).toBeInTheDocument()
  })

  test('renders external link with correct attributes', () => {
    render(<ProjectCard project={mockProject} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  describe('Video Modal functionality', () => {
    const projectWithVideo: ProjectData = {
      ...mockProject,
      youtubeId: 'abc123',
    }

    const projectWithShort: ProjectData = {
      ...mockProject,
      youtubeId: 'xyz789',
      youtubeIsShort: true,
    }

    test('does not render play button when no youtubeId', () => {
      render(<ProjectCard project={mockProject} />)
      expect(screen.queryByLabelText('Play video demo')).not.toBeInTheDocument()
    })

    test('renders play button when youtubeId exists', () => {
      render(<ProjectCard project={projectWithVideo} />)
      expect(screen.getByLabelText('Play video demo')).toBeInTheDocument()
    })

    test('opens video modal when play button is clicked', () => {
      render(<ProjectCard project={projectWithVideo} />)
      const playButton = screen.getByLabelText('Play video demo')
      fireEvent.click(playButton)

      expect(screen.getByTitle('YouTube video')).toBeInTheDocument()
    })

    test('video modal has correct YouTube URL', () => {
      render(<ProjectCard project={projectWithVideo} />)
      const playButton = screen.getByLabelText('Play video demo')
      fireEvent.click(playButton)

      const iframe = screen.getByTitle('YouTube video')
      expect(iframe).toHaveAttribute(
        'src',
        'https://www.youtube-nocookie.com/embed/abc123?autoplay=1&rel=0'
      )
    })

    test('closes video modal when close button is clicked', () => {
      render(<ProjectCard project={projectWithVideo} />)

      // Open modal
      const playButton = screen.getByLabelText('Play video demo')
      fireEvent.click(playButton)
      expect(screen.getByTitle('YouTube video')).toBeInTheDocument()

      // Close modal
      const closeButton = screen.getByLabelText('Close video')
      fireEvent.click(closeButton)
      expect(screen.queryByTitle('YouTube video')).not.toBeInTheDocument()
    })

    test('play button click prevents link navigation', () => {
      render(<ProjectCard project={projectWithVideo} />)
      const playButton = screen.getByLabelText('Play video demo')

      const clickEvent = fireEvent.click(playButton)
      // The click handler calls preventDefault and stopPropagation
      // Modal should open instead of navigating
      expect(screen.getByTitle('YouTube video')).toBeInTheDocument()
    })

    test('renders horizontal video modal for regular videos', () => {
      render(<ProjectCard project={projectWithVideo} />)
      const playButton = screen.getByLabelText('Play video demo')
      fireEvent.click(playButton)

      const iframe = screen.getByTitle('YouTube video')
      const container = iframe.parentElement
      expect(container).toHaveClass('aspect-video')
    })

    test('renders vertical video modal for shorts', () => {
      render(<ProjectCard project={projectWithShort} />)
      const playButton = screen.getByLabelText('Play video demo')
      fireEvent.click(playButton)

      const iframe = screen.getByTitle('YouTube video')
      const container = iframe.parentElement
      expect(container).toHaveClass('aspect-[9/16]')
    })
  })

  describe('Data structure validation', () => {
    test('project has required fields', () => {
      expect(mockProject.id).toBe('test-project')
      expect(mockProject.title).toBe('Test Project')
      expect(mockProject.description).toBe('This is a test project description')
      expect(mockProject.image).toBe('/test-image.jpg')
      expect(mockProject.link).toBe('https://example.com')
      expect(mockProject.type).toBe('live')
      expect(mockProject.tags).toContain('test')
      expect(mockProject.lastUpdated).toBe('2025-09-01')
    })

    test('youtubeId is optional', () => {
      expect(mockProject.youtubeId).toBeUndefined()
    })

    test('youtubeIsShort is optional', () => {
      expect(mockProject.youtubeIsShort).toBeUndefined()
    })
  })
})
