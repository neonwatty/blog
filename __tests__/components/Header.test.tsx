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

  test('renders navigation links', () => {
    renderWithTheme(<Header />)
    expect(screen.getByText('Posts')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Newsletter')).toBeInTheDocument()
    expect(screen.getByText('Slides')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  test('has proper link attributes', () => {
    renderWithTheme(<Header />)
    const aboutLink = screen.getByRole('link', { name: 'About' })
    const postsLink = screen.getByRole('link', { name: 'Posts' })
    const newsletterLink = screen.getByRole('link', { name: 'Newsletter' })

    expect(postsLink).toHaveAttribute('href', '/posts')
    expect(aboutLink).toHaveAttribute('href', '/about')
    expect(newsletterLink).toHaveAttribute('href', '/newsletter')
  })

  test('newsletter link appears in navigation', () => {
    renderWithTheme(<Header />)
    const newsletterLink = screen.getByRole('link', { name: 'Newsletter' })
    expect(newsletterLink).toBeInTheDocument()
    expect(newsletterLink).toHaveAttribute('href', '/newsletter')
  })

  test('renders with responsive design classes', () => {
    renderWithTheme(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})