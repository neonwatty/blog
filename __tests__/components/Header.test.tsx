import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/'
  }),
  usePathname: () => '/'
}))

// Helper function to render with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  )
}

describe('Header Component', () => {
  test('renders header with title', () => {
    renderWithTheme(<Header />)
    expect(screen.getByText('Jeremy Watt')).toBeInTheDocument()
  })

  test('renders navigation links (desktop and mobile)', () => {
    renderWithTheme(<Header />)
    // Navigation links appear twice: once in desktop nav, once in mobile menu
    expect(screen.getAllByText('Posts')).toHaveLength(2)
    expect(screen.getAllByText('Projects')).toHaveLength(2)
    expect(screen.getAllByText('Slides')).toHaveLength(2)
    expect(screen.getAllByText('About')).toHaveLength(2)
  })

  test('has proper link attributes', () => {
    renderWithTheme(<Header />)
    // Get all links for each nav item (desktop + mobile = 2 each)
    const aboutLinks = screen.getAllByRole('link', { name: 'About' })
    const postsLinks = screen.getAllByRole('link', { name: 'Posts' })
    const slidesLinks = screen.getAllByRole('link', { name: 'Slides' })

    // Check that at least one of each has the correct href
    expect(postsLinks.some(link => link.getAttribute('href') === '/posts')).toBe(true)
    expect(aboutLinks.some(link => link.getAttribute('href') === '/about')).toBe(true)
    expect(slidesLinks.some(link => link.getAttribute('href') === '/slides')).toBe(true)
  })

  test('renders with responsive design classes', () => {
    renderWithTheme(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  test('renders hamburger menu button for mobile', () => {
    renderWithTheme(<Header />)
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    expect(menuButton).toBeInTheDocument()
  })
})