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

  test('contains Discord icon in social links', () => {
    render(<Footer />)
    const discordLinks = document.querySelectorAll('a[href="https://discord.gg/7xsxU4ZG6A"]')
    expect(discordLinks.length).toBeGreaterThanOrEqual(1)
  })

  test('shows Discord on regular pages', () => {
    mockPathname.mockReturnValue('/')
    render(<Footer />)
    expect(screen.getByText('Join our Discord Community')).toBeInTheDocument()
    expect(screen.getByText('Keep up to date with open source projects')).toBeInTheDocument()
  })

  test('shows Discord on posts page', () => {
    mockPathname.mockReturnValue('/posts')
    render(<Footer />)
    expect(screen.getByText('Join our Discord Community')).toBeInTheDocument()
  })

  test('shows Discord on about page', () => {
    mockPathname.mockReturnValue('/about')
    render(<Footer />)
    expect(screen.getByText('Join our Discord Community')).toBeInTheDocument()
  })

  test('contains Discord link', () => {
    render(<Footer />)
    const discordLink = screen.getByRole('link', { name: /Join Discord/i })
    expect(discordLink).toBeInTheDocument()
    expect(discordLink).toHaveAttribute('href', 'https://discord.gg/7xsxU4ZG6A')
  })
})
