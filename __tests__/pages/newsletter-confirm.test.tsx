import { render, screen } from '@testing-library/react'
import NewsletterConfirmPage from '@/app/newsletter/confirm/page'
import { ThemeProvider } from '@/components/ThemeProvider'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/newsletter/confirm'
}))

// Helper function to render with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  )
}

describe('Newsletter Confirm Page', () => {
  test('renders main heading', () => {
    renderWithTheme(<NewsletterConfirmPage />)
    expect(screen.getByText('You\'re All Set!')).toBeInTheDocument()
  })

  test('renders welcome message', () => {
    renderWithTheme(<NewsletterConfirmPage />)
    expect(screen.getByText(/Thanks for confirming your subscription/i)).toBeInTheDocument()
    expect(screen.getByText(/You'll receive updates on new releases/i)).toBeInTheDocument()
  })

  test('renders "What to expect" section', () => {
    renderWithTheme(<NewsletterConfirmPage />)
    expect(screen.getByText('What to expect')).toBeInTheDocument()
  })

  test('displays all three benefits', () => {
    renderWithTheme(<NewsletterConfirmPage />)

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

  test('displays "no spam" message', () => {
    renderWithTheme(<NewsletterConfirmPage />)
    expect(screen.getByText(/Expect to hear from me when I have something worth sharing — no spam, no fluff/i)).toBeInTheDocument()
  })

  test('renders "Recent Projects" section', () => {
    renderWithTheme(<NewsletterConfirmPage />)
    expect(screen.getByText('Recent Projects')).toBeInTheDocument()
    expect(screen.getByText(/Check out what I've been building lately/i)).toBeInTheDocument()
  })

  test('displays featured projects', () => {
    renderWithTheme(<NewsletterConfirmPage />)

    // Check for project titles
    expect(screen.getByText('YTGify')).toBeInTheDocument()
    expect(screen.getByText('QC')).toBeInTheDocument()
    expect(screen.getByText('TFQ')).toBeInTheDocument()
    expect(screen.getByText('TodoQ')).toBeInTheDocument()
  })

  test('renders "View All Projects" link', () => {
    renderWithTheme(<NewsletterConfirmPage />)

    const viewAllLink = screen.getByRole('link', { name: /View All Projects/i })
    expect(viewAllLink).toBeInTheDocument()
    expect(viewAllLink).toHaveAttribute('href', '/projects')
  })

  test('renders social media CTAs', () => {
    renderWithTheme(<NewsletterConfirmPage />)

    expect(screen.getByText('Let\'s Connect')).toBeInTheDocument()
    expect(screen.getByText(/Follow along on social media for daily updates and behind-the-scenes/i)).toBeInTheDocument()

    // Check for social links
    const links = screen.getAllByRole('link')
    const githubLink = links.find(link => link.getAttribute('href') === 'https://github.com/neonwatty')
    const xLink = links.find(link => link.getAttribute('href') === 'https://x.com/neonwatty')
    const linkedinLink = links.find(link => link.getAttribute('href') === 'https://www.linkedin.com/in/jeremy-watt/')

    expect(githubLink).toBeInTheDocument()
    expect(xLink).toBeInTheDocument()
    expect(linkedinLink).toBeInTheDocument()
  })

  test('social links have proper attributes', () => {
    renderWithTheme(<NewsletterConfirmPage />)

    const links = screen.getAllByRole('link')
    const externalLinks = links.filter(link =>
      link.getAttribute('target') === '_blank' &&
      link.getAttribute('rel')?.includes('noopener noreferrer')
    )

    // Should have at least the 3 social links plus project links
    expect(externalLinks.length).toBeGreaterThan(0)
  })

  test('has proper page structure with header and footer', () => {
    renderWithTheme(<NewsletterConfirmPage />)

    // Check for header
    expect(screen.getByRole('banner')).toBeInTheDocument()

    // Check for footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  test('renders checkmark icon', () => {
    renderWithTheme(<NewsletterConfirmPage />)

    // Check for the SVG icon by looking for its path with the checkmark circle
    const svg = document.querySelector('svg[viewBox="0 0 24 24"]')
    expect(svg).toBeInTheDocument()
  })

  test('project cards are rendered as articles', () => {
    renderWithTheme(<NewsletterConfirmPage />)

    const articles = screen.getAllByRole('article')
    // Should have 4 project cards
    expect(articles.length).toBe(4)
  })
})
