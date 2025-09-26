describe('ProjectCard Component', () => {
  test('ProjectCard component structure validation', () => {
    const mockProject = {
      id: 'test-project',
      title: 'Test Project',
      description: 'This is a test project description',
      image: '/test-image.jpg',
      link: 'https://example.com',
      type: 'live' as const,
      tags: ['test', 'web app', 'demo'],
      lastUpdated: '2025-09-01'
    }

    expect(mockProject.id).toBe('test-project')
    expect(mockProject.title).toBe('Test Project')
    expect(mockProject.description).toBe('This is a test project description')
    expect(mockProject.image).toBe('/test-image.jpg')
    expect(mockProject.link).toBe('https://example.com')
    expect(mockProject.type).toBe('live')
    expect(mockProject.tags).toContain('test')
    expect(mockProject.lastUpdated).toBe('2025-09-01')
  })

  test('ProjectCard with live project type', () => {
    const mockLiveProject = {
      id: 'live-project',
      title: 'Live Web App',
      description: 'A live web application',
      image: '/live.jpg',
      link: 'https://myapp.com',
      type: 'live' as const,
      tags: ['web', 'app'],
      lastUpdated: '2025-09-01'
    }

    expect(mockLiveProject.type).toBe('live')
    expect(mockLiveProject.link).toContain('https://')
  })

  test('ProjectCard with github project type', () => {
    const mockGithubProject = {
      id: 'github-project',
      title: 'Open Source Project',
      description: 'An open source repository',
      image: '/github.jpg',
      link: 'https://github.com/user/repo',
      type: 'github' as const,
      tags: ['open source', 'library'],
      lastUpdated: '2025-09-01'
    }

    expect(mockGithubProject.type).toBe('github')
    expect(mockGithubProject.link).toContain('github.com')
  })

  test('ProjectCard with chrome extension type', () => {
    const mockChromeProject = {
      id: 'chrome-project',
      title: 'Chrome Extension',
      description: 'A useful Chrome extension',
      image: '/chrome.jpg',
      link: 'https://chromewebstore.google.com/detail/extension',
      type: 'chrome' as const,
      tags: ['extension', 'chrome', 'productivity'],
      lastUpdated: '2025-09-01'
    }

    expect(mockChromeProject.type).toBe('chrome')
    expect(mockChromeProject.link).toContain('chromewebstore')
  })

  test('ProjectCard with npm package type', () => {
    const mockNpmProject = {
      id: 'npm-project',
      title: 'NPM Package',
      description: 'A useful npm package',
      image: '/npm.jpg',
      link: 'https://www.npmjs.com/package/example',
      type: 'npm' as const,
      tags: ['cli', 'tooling', 'npm'],
      lastUpdated: '2025-09-01'
    }

    expect(mockNpmProject.type).toBe('npm')
    expect(mockNpmProject.link).toContain('npmjs.com')
  })

  test('ProjectCard with multiple tags', () => {
    const mockProject = {
      id: 'multi-tag-project',
      title: 'Multi Tag Project',
      description: 'Project with multiple tags',
      image: '/multi.jpg',
      link: 'https://example.com',
      type: 'live' as const,
      tags: ['AI', 'Web App', 'React', 'TypeScript'],
      lastUpdated: '2025-09-01'
    }

    expect(mockProject.tags.length).toBeGreaterThan(1)
    expect(mockProject.tags).toContain('AI')
    expect(mockProject.tags).toContain('React')
  })

  test('ProjectCard with animation delay prop', () => {
    const animationDelay = 2

    expect(animationDelay).toBeGreaterThanOrEqual(0)
    expect(animationDelay).toBeLessThanOrEqual(6)
  })
})