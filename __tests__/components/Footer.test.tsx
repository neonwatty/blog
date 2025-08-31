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
    expect(screen.getByText(new RegExp(`© ${currentYear} Jeremy Watt`))).toBeInTheDocument()
  })


  test('contains social media links', () => {
    render(<Footer />)
    expect(document.querySelector('a[href="https://github.com/neonwatty"]')).toBeInTheDocument()
    expect(document.querySelector('a[href="https://x.com/neonwatty"]')).toBeInTheDocument()
    expect(document.querySelector('a[href="https://www.linkedin.com/in/jeremy-watt/"]')).toBeInTheDocument()
  })
})