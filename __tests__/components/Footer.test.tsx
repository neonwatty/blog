import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer Component', () => {
  test('renders footer content', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  test('displays copyright information', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear} Your Name`))).toBeInTheDocument()
  })

  test('contains RSS link', () => {
    render(<Footer />)
    const rssLink = screen.getByRole('link', { name: 'RSS' })
    expect(rssLink).toHaveAttribute('href', '/rss.xml')
  })

  test('contains GitHub link', () => {
    render(<Footer />)
    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    expect(githubLink).toHaveAttribute('href', '#')
  })

  test('contains Twitter link', () => {
    render(<Footer />)
    const twitterLink = screen.getByRole('link', { name: 'Twitter' })
    expect(twitterLink).toHaveAttribute('href', '#')
  })
})