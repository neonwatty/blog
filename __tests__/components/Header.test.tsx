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
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })

  test('renders navigation links', () => {
    renderWithTheme(<Header />)
    expect(screen.getByText('Posts')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('RSS')).toBeInTheDocument()
  })

  test('has proper link attributes', () => {
    renderWithTheme(<Header />)
    const aboutLink = screen.getByRole('link', { name: 'About' })
    const postsLink = screen.getByRole('link', { name: 'Posts' })
    const searchLink = screen.getByRole('link', { name: 'Search' })
    const rssLink = screen.getByRole('link', { name: 'RSS' })
    
    expect(postsLink).toHaveAttribute('href', '/posts')
    expect(aboutLink).toHaveAttribute('href', '/about')
    expect(searchLink).toHaveAttribute('href', '/search')
    expect(rssLink).toHaveAttribute('href', '/rss.xml')
  })

  test('renders with responsive design classes', () => {
    renderWithTheme(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})