import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { ThemeProvider } from '@/components/ThemeProvider'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/'
}))

// Mock the posts data
jest.mock('@/lib/posts', () => ({
  getSortedPostsData: () => []
}))

// Helper function to render with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  )
}

describe('Home Page', () => {
  test('renders hero heading', () => {
    renderWithTheme(<Home />)
    expect(screen.getByText(/Hi, I'm Jeremy/i)).toBeInTheDocument()
  })

  test('renders tagline', () => {
    renderWithTheme(<Home />)
    expect(screen.getByText('AI Engineer and certified HVAC technician')).toBeInTheDocument()
  })

  test('renders social links', () => {
    renderWithTheme(<Home />)
    expect(document.querySelector('a[href="https://github.com/neonwatty"]')).toBeInTheDocument()
    expect(document.querySelector('a[href="https://x.com/neonwatty"]')).toBeInTheDocument()
    expect(document.querySelector('a[href="https://www.linkedin.com/in/jeremy-watt/"]')).toBeInTheDocument()
  })

  test('renders newsletter button in hero', () => {
    renderWithTheme(<Home />)
    const newsletterLink = screen.getByRole('link', { name: /Subscribe/i })
    expect(newsletterLink).toBeInTheDocument()
  })

  test('newsletter button links to /newsletter', () => {
    renderWithTheme(<Home />)
    const newsletterLink = screen.getByRole('link', { name: /Subscribe/i })
    expect(newsletterLink).toHaveAttribute('href', '/newsletter')
  })

  test('newsletter button contains emoji', () => {
    renderWithTheme(<Home />)
    const buttonText = screen.getByRole('link', { name: /Subscribe/i }).textContent
    expect(buttonText).toContain('📬')
    expect(buttonText).toContain('Subscribe')
  })

  test('has header and footer', () => {
    renderWithTheme(<Home />)

    // Check for header
    expect(screen.getByRole('banner')).toBeInTheDocument()

    // Check for footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  test('newsletter appears in footer on homepage', () => {
    renderWithTheme(<Home />)
    // Should show newsletter in footer since we're not on /newsletter page
    expect(screen.getByText('Subscribe for updates')).toBeInTheDocument()
  })
})
