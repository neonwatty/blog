import { render, screen } from '@testing-library/react'
import MobileTabBar from '@/components/MobileTabBar'
import { ThemeProvider } from '@/components/ThemeProvider'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/')
}))

import { usePathname } from 'next/navigation'

// Helper function to render with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  )
}

describe('MobileTabBar Component', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/')
  })

  test('renders mobile navigation', () => {
    renderWithTheme(<MobileTabBar />)
    const nav = screen.getByRole('navigation', { name: /mobile navigation/i })
    expect(nav).toBeInTheDocument()
  })

  test('renders all four navigation items', () => {
    renderWithTheme(<MobileTabBar />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Posts')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  test('has proper link attributes', () => {
    renderWithTheme(<MobileTabBar />)

    const homeLink = screen.getByRole('link', { name: /home/i })
    const postsLink = screen.getByRole('link', { name: /posts/i })
    const projectsLink = screen.getByRole('link', { name: /projects/i })
    const aboutLink = screen.getByRole('link', { name: /about/i })

    expect(homeLink.getAttribute('href')).toBe('/')
    expect(postsLink.getAttribute('href')).toBe('/posts')
    expect(projectsLink.getAttribute('href')).toBe('/projects')
    expect(aboutLink.getAttribute('href')).toBe('/about')
  })

  test('marks Home as active on homepage', () => {
    (usePathname as jest.Mock).mockReturnValue('/')
    renderWithTheme(<MobileTabBar />)

    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink.getAttribute('aria-current')).toBe('page')
  })

  test('marks Posts as active on posts page', () => {
    (usePathname as jest.Mock).mockReturnValue('/posts')
    renderWithTheme(<MobileTabBar />)

    const postsLink = screen.getByRole('link', { name: /posts/i })
    expect(postsLink.getAttribute('aria-current')).toBe('page')
  })

  test('marks Posts as active on individual post page', () => {
    (usePathname as jest.Mock).mockReturnValue('/posts/some-post-slug')
    renderWithTheme(<MobileTabBar />)

    const postsLink = screen.getByRole('link', { name: /posts/i })
    expect(postsLink.getAttribute('aria-current')).toBe('page')
  })

  test('marks Projects as active on projects page', () => {
    (usePathname as jest.Mock).mockReturnValue('/projects')
    renderWithTheme(<MobileTabBar />)

    const projectsLink = screen.getByRole('link', { name: /projects/i })
    expect(projectsLink.getAttribute('aria-current')).toBe('page')
  })

  test('marks About as active on about page', () => {
    (usePathname as jest.Mock).mockReturnValue('/about')
    renderWithTheme(<MobileTabBar />)

    const aboutLink = screen.getByRole('link', { name: /about/i })
    expect(aboutLink.getAttribute('aria-current')).toBe('page')
  })
})
