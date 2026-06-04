import { ProjectData, getProjectsData, getProjectById } from '@/lib/projects'

describe('Projects Library', () => {
  test('ProjectData interface is defined correctly', () => {
    const mockProject: ProjectData = {
      id: 'test-project',
      title: 'Test Project',
      description: 'Test description',
      image: '/test-image.jpg',
      link: 'https://example.com',
      type: 'live',
      tags: ['test', 'web app'],
      lastUpdated: '2025-09-01',
      displayOrder: 1,
    }

    expect(mockProject.id).toBe('test-project')
    expect(mockProject.title).toBe('Test Project')
    expect(mockProject.description).toBe('Test description')
    expect(mockProject.image).toBe('/test-image.jpg')
    expect(mockProject.link).toBe('https://example.com')
    expect(mockProject.type).toBe('live')
    expect(mockProject.tags).toContain('test')
    expect(mockProject.lastUpdated).toBe('2025-09-01')
    expect(mockProject.displayOrder).toBe(1)
  })

  test('ProjectData supports all project types', () => {
    const liveProject: ProjectData = {
      id: 'live-project',
      title: 'Live Project',
      description: 'A live web app',
      image: '/live.jpg',
      link: 'https://example.com',
      type: 'live',
      tags: ['web'],
      lastUpdated: '2025-09-01',
    }

    const githubProject: ProjectData = {
      id: 'github-project',
      title: 'GitHub Project',
      description: 'An open source project',
      image: '/github.jpg',
      link: 'https://github.com/user/repo',
      type: 'github',
      tags: ['open source'],
      lastUpdated: '2025-09-01',
    }

    const chromeProject: ProjectData = {
      id: 'chrome-project',
      title: 'Chrome Extension',
      description: 'A Chrome extension',
      image: '/chrome.jpg',
      link: 'https://chrome.google.com/webstore',
      type: 'chrome',
      tags: ['extension'],
      lastUpdated: '2025-09-01',
    }

    const npmProject: ProjectData = {
      id: 'npm-project',
      title: 'NPM Package',
      description: 'An npm package',
      image: '/npm.jpg',
      link: 'https://www.npmjs.com/package/example',
      type: 'npm',
      tags: ['cli'],
      lastUpdated: '2025-09-01',
    }

    expect(liveProject.type).toBe('live')
    expect(githubProject.type).toBe('github')
    expect(chromeProject.type).toBe('chrome')
    expect(npmProject.type).toBe('npm')
  })

  describe('getProjectsData function', () => {
    test('returns an array of projects', () => {
      const projects = getProjectsData()
      expect(Array.isArray(projects)).toBe(true)
      expect(projects.length).toBeGreaterThan(0)
    })

    test('all projects have required fields', () => {
      const projects = getProjectsData()
      projects.forEach((project) => {
        expect(project.id).toBeDefined()
        expect(project.title).toBeDefined()
        expect(project.description).toBeDefined()
        expect(project.image).toBeDefined()
        expect(project.link).toBeDefined()
        expect(project.type).toBeDefined()
        expect(Array.isArray(project.tags)).toBe(true)
      })
    })

    test('projects use the curated display order', () => {
      const projects = getProjectsData()
      expect(projects.map((project) => project.id)).toEqual([
        'bleep-that-sht',
        'bugdrop',
        'meme-search',
        'debtisfun',
        'seatify',
        'prbar',
        'prcard',
        'foil',
        'ytgify',
      ])
    })

    test('projects contain expected data', () => {
      const projects = getProjectsData()
      const projectIds = projects.map((p) => p.id)

      expect(projectIds).toContain('prbar')
      expect(projectIds).toContain('foil')
      expect(projectIds).toContain('debtisfun')
      expect(projectIds).toContain('prcard')
      expect(projectIds).toContain('bugdrop')
      expect(projectIds).toContain('ytgify')
      expect(projectIds).toContain('meme-search')
      expect(projectIds).toContain('bleep-that-sht')
      expect(projectIds).toContain('seatify')
      expect(projectIds).not.toContain('bullhorn')
      expect(projectIds).not.toContain('linkparty')
      expect(projectIds).not.toContain('qc')
      expect(projectIds).not.toContain('agent-conveyor')
      expect(projectIds).not.toContain('issuectl')
      expect(projectIds).not.toContain('smart-reminders')
      expect(projectIds).not.toContain('stay-caffeinated')
      expect(projectIds).not.toContain('polarize')
    })

    test('all projects have lastUpdated field', () => {
      const projects = getProjectsData()
      projects.forEach((project) => {
        expect(project.lastUpdated).toBeDefined()
        expect(typeof project.lastUpdated).toBe('string')
        expect(new Date(project.lastUpdated).toString()).not.toBe('Invalid Date')
      })
    })
  })

  describe('getProjectById function', () => {
    test('returns project when found', () => {
      const project = getProjectById('ytgify')
      expect(project).toBeDefined()
      expect(project?.id).toBe('ytgify')
      expect(project?.title).toBe('YTGify')
    })

    test('returns undefined when project not found', () => {
      const project = getProjectById('non-existent-project')
      expect(project).toBeUndefined()
    })

    test('finds all projects by id', () => {
      const projectIds = [
        'prbar',
        'foil',
        'debtisfun',
        'prcard',
        'bugdrop',
        'ytgify',
        'meme-search',
        'bleep-that-sht',
        'seatify',
      ]

      projectIds.forEach((id) => {
        const project = getProjectById(id)
        expect(project).toBeDefined()
        expect(project?.id).toBe(id)
      })
    })

    test('removed stale projects are not returned by id', () => {
      expect(getProjectById('bullhorn')).toBeUndefined()
      expect(getProjectById('linkparty')).toBeUndefined()
      expect(getProjectById('qc')).toBeUndefined()
      expect(getProjectById('agent-conveyor')).toBeUndefined()
      expect(getProjectById('issuectl')).toBeUndefined()
      expect(getProjectById('smart-reminders')).toBeUndefined()
      expect(getProjectById('stay-caffeinated')).toBeUndefined()
      expect(getProjectById('polarize')).toBeUndefined()
    })
  })
})
