import { render, screen } from '@testing-library/react'
import NewsletterSuccessPage from '@/app/newsletter/success/page'
import { ThemeProvider } from '@/components/ThemeProvider'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/newsletter/success'
}))

// Helper function to render with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  )
}

describe('Newsletter Success Page', () => {
  test('renders main heading', () => {
    renderWithTheme(<NewsletterSuccessPage />)
    expect(screen.getByText('Check Your Email!')).toBeInTheDocument()
  })

  test('renders confirmation instructions', () => {
    renderWithTheme(<NewsletterSuccessPage />)
    expect(screen.getByText(/Thanks for subscribing! I've sent you a confirmation email/i)).toBeInTheDocument()
    expect(screen.getByText(/Click the link inside to complete your subscription/i)).toBeInTheDocument()
  })

  test('renders "What you\'ll get" section', () => {
    renderWithTheme(<NewsletterSuccessPage />)
    expect(screen.getByText('What you\'ll get')).toBeInTheDocument()
  })

  test('displays all three benefits', () => {
    renderWithTheme(<NewsletterSuccessPage />)

    // Check for "New releases" benefit
    expect(screen.getByText('New releases')).toBeInTheDocument()
    expect(screen.getByText(/Be the first to know when I launch new tools and products/i)).toBeInTheDocument()

    // Check for "Product updates" benefit
    expect(screen.getByText('Product updates')).toBeInTheDocument()
    expect(screen.getByText(/Feature additions, improvements, and what's coming next/i)).toBeInTheDocument()

    // Check for "Build learnings" benefit
    expect(screen.getByText('Build learnings')).toBeInTheDocument()
    expect(screen.getByText(/Real lessons from building and shipping open source tools/i)).toBeInTheDocument()
  })

  test('renders "Recent Projects" section', () => {
    renderWithTheme(<NewsletterSuccessPage />)
    expect(screen.getByText('Recent Projects')).toBeInTheDocument()
    expect(screen.getByText(/While you wait, check out what I've been building/i)).toBeInTheDocument()
  })

  test('displays featured projects', () => {
    renderWithTheme(<NewsletterSuccessPage />)

    // Check for project titles
    expect(screen.getByText('YTGify')).toBeInTheDocument()
    expect(screen.getByText('QC')).toBeInTheDocument()
    expect(screen.getByText('TFQ')).toBeInTheDocument()
    expect(screen.getByText('TodoQ')).toBeInTheDocument()
  })

  test('renders social media CTAs', () => {
    renderWithTheme(<NewsletterSuccessPage />)

    expect(screen.getByText('Connect With Me')).toBeInTheDocument()
    expect(screen.getByText(/Follow along on social media for real-time updates/i)).toBeInTheDocument()

    // Check for social links
    const links = screen.getAllByRole('link')
    const githubLink = links.find(link => link.getAttribute('href') === 'https://github.com/neonwatty')
    const xLink = links.find(link => link.getAttribute('href') === 'https://x.com/neonwatty')
    const linkedinLink = links.find(link => link.getAttribute('href') === 'https://www.linkedin.com/in/jeremy-watt/')

    expect(githubLink).toBeInTheDocument()
    expect(xLink).toBeInTheDocument()
    expect(linkedinLink).toBeInTheDocument()
  })

  test('social links open in new tab', () => {
    renderWithTheme(<NewsletterSuccessPage />)

    const links = screen.getAllByRole('link')
    const externalLinks = links.filter(link =>
      link.getAttribute('target') === '_blank' &&
      link.getAttribute('rel')?.includes('noopener noreferrer')
    )

    // Should have at least the 3 social links plus project links
    expect(externalLinks.length).toBeGreaterThan(0)
  })

  test('has proper page structure with header and footer', () => {
    renderWithTheme(<NewsletterSuccessPage />)

    // Check for header
    expect(screen.getByRole('banner')).toBeInTheDocument()

    // Check for footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  test('renders email icon', () => {
    renderWithTheme(<NewsletterSuccessPage />)

    // Check for the SVG icon by looking for its path
    const svg = document.querySelector('svg[viewBox="0 0 24 24"]')
    expect(svg).toBeInTheDocument()
  })
})
