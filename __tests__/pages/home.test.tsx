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

  test('renders Discord icon in hero social links', () => {
    renderWithTheme(<Home />)
    const discordLink = document.querySelector('a[href="https://discord.gg/8EUxqR93"]')
    expect(discordLink).toBeInTheDocument()
  })

  test('Discord icon links to Discord server', () => {
    renderWithTheme(<Home />)
    const discordLink = document.querySelector('a[href="https://discord.gg/8EUxqR93"]')
    expect(discordLink).toHaveAttribute('href', 'https://discord.gg/8EUxqR93')
    expect(discordLink).toHaveAttribute('target', '_blank')
  })

  test('Discord icon contains SVG', () => {
    renderWithTheme(<Home />)
    const discordLink = document.querySelector('a[href="https://discord.gg/8EUxqR93"]')
    const svg = discordLink?.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  test('has header and footer', () => {
    renderWithTheme(<Home />)

    // Check for header
    expect(screen.getByRole('banner')).toBeInTheDocument()

    // Check for footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  test('Discord appears in footer on homepage', () => {
    renderWithTheme(<Home />)
    // Should show Discord in footer
    expect(screen.getByText('Join our Discord Community')).toBeInTheDocument()
  })
})
