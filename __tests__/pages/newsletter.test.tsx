import { render, screen } from '@testing-library/react'
import NewsletterPage from '@/app/newsletter/page'
import { ThemeProvider } from '@/components/ThemeProvider'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/newsletter'
}))

// Helper function to render with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  )
}

describe('Newsletter Page', () => {
  test('renders main heading', () => {
    renderWithTheme(<NewsletterPage />)
    expect(screen.getByText('Stay in the Loop')).toBeInTheDocument()
  })

  test('renders description text', () => {
    renderWithTheme(<NewsletterPage />)
    expect(screen.getByText(/Get updates on my latest open source projects/i)).toBeInTheDocument()
  })

  test('renders "What you\'ll get" section', () => {
    renderWithTheme(<NewsletterPage />)
    expect(screen.getByText('What you\'ll get')).toBeInTheDocument()
  })

  test('displays all three benefits', () => {
    renderWithTheme(<NewsletterPage />)

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

  test('includes Newsletter component', () => {
    renderWithTheme(<NewsletterPage />)
    expect(screen.getByText('Subscribe for updates')).toBeInTheDocument()
    expect(screen.getByText('Open Source releases, updates, and learnings')).toBeInTheDocument()
  })

  test('contains beehiiv iframe', () => {
    renderWithTheme(<NewsletterPage />)
    const iframe = document.querySelector('iframe.beehiiv-embed')
    expect(iframe).toBeInTheDocument()
  })

  test('has proper page structure with header and footer', () => {
    renderWithTheme(<NewsletterPage />)

    // Check for header
    expect(screen.getByRole('banner')).toBeInTheDocument()

    // Check for footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
