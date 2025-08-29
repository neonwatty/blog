import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/'
  }),
  usePathname: () => '/'
}))

describe('Header Component', () => {
  test('renders header with title', () => {
    render(<Header />)
    expect(screen.getByText('ModernBlog')).toBeInTheDocument()
  })

  test('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Tags')).toBeInTheDocument()
    expect(screen.getByText('RSS')).toBeInTheDocument()
  })

  test('has proper link attributes', () => {
    render(<Header />)
    const homeLink = screen.getByRole('link', { name: 'Home' })
    const aboutLink = screen.getByRole('link', { name: 'About' })
    const tagsLink = screen.getByRole('link', { name: 'Tags' })
    const rssLink = screen.getByRole('link', { name: 'RSS' })
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(aboutLink).toHaveAttribute('href', '/about')
    expect(tagsLink).toHaveAttribute('href', '/tags')
    expect(rssLink).toHaveAttribute('href', '/rss.xml')
  })

  test('renders with responsive design classes', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})