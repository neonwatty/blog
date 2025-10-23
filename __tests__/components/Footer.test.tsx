import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

// Mock Next.js navigation
const mockPathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname()
}))

describe('Footer Component', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/')
  })

  test('renders footer content', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  test('displays copyright information', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear} Jeremy Watt`))).toBeInTheDocument()
  })

  test('contains social media links', () => {
    render(<Footer />)
    expect(document.querySelector('a[href="https://github.com/neonwatty"]')).toBeInTheDocument()
    expect(document.querySelector('a[href="https://x.com/neonwatty"]')).toBeInTheDocument()
    expect(document.querySelector('a[href="https://www.linkedin.com/in/jeremy-watt/"]')).toBeInTheDocument()
  })

  test('shows newsletter on regular pages', () => {
    mockPathname.mockReturnValue('/')
    render(<Footer />)
    expect(screen.getByText('Subscribe for updates')).toBeInTheDocument()
    expect(screen.getByText('Open Source releases, updates, and learnings')).toBeInTheDocument()
  })

  test('hides newsletter on newsletter page', () => {
    mockPathname.mockReturnValue('/newsletter')
    render(<Footer />)
    expect(screen.queryByText('Subscribe for updates')).not.toBeInTheDocument()
    expect(screen.queryByText('Open Source releases, updates, and learnings')).not.toBeInTheDocument()
  })

  test('shows newsletter on posts page', () => {
    mockPathname.mockReturnValue('/posts')
    render(<Footer />)
    expect(screen.getByText('Subscribe for updates')).toBeInTheDocument()
  })

  test('shows newsletter on about page', () => {
    mockPathname.mockReturnValue('/about')
    render(<Footer />)
    expect(screen.getByText('Subscribe for updates')).toBeInTheDocument()
  })
})