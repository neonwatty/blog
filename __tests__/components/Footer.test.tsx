import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

// Mock the posts library to avoid ES module issues
jest.mock('@/lib/posts', () => ({
  getAllTags: () => ['React', 'Next.js', 'JavaScript', 'CSS', 'Web Development', 'TypeScript']
}))

describe('Footer Component', () => {
  test('renders footer content', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  test('displays copyright information', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear} ModernBlog`))).toBeInTheDocument()
  })

  test('displays ModernBlog brand name', () => {
    render(<Footer />)
    expect(screen.getByText('ModernBlog')).toBeInTheDocument()
  })

  test('contains navigation links', () => {
    render(<Footer />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('All Tags')).toBeInTheDocument()
  })

  test('displays popular tags section', () => {
    render(<Footer />)
    expect(screen.getByText('Popular Tags')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  test('contains RSS link', () => {
    render(<Footer />)
    const rssLink = screen.getByLabelText('RSS Feed')
    expect(rssLink).toHaveAttribute('href', '/rss.xml')
  })
})