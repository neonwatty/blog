import { render, screen } from '@testing-library/react'
import Newsletter from '@/components/Newsletter'

describe('Newsletter Component', () => {
  test('renders heading', () => {
    render(<Newsletter />)
    expect(screen.getByText('Subscribe for updates')).toBeInTheDocument()
  })

  test('renders subtitle', () => {
    render(<Newsletter />)
    expect(screen.getByText('Open Source releases, updates, and learnings')).toBeInTheDocument()
  })

  test('contains beehiiv iframe with correct src', () => {
    render(<Newsletter />)
    const iframe = document.querySelector('iframe.beehiiv-embed')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', 'https://subscribe-forms.beehiiv.com/f36aa878-a5f0-4ba2-bc2f-cd9b2c1894d8')
  })

  test('contains beehiiv script tag', () => {
    render(<Newsletter />)
    const script = document.querySelector('script[src="https://subscribe-forms.beehiiv.com/embed.js"]')
    expect(script).toBeInTheDocument()
  })

  test('iframe has correct data-test-id attribute', () => {
    render(<Newsletter />)
    const iframe = document.querySelector('[data-test-id="beehiiv-embed"]')
    expect(iframe).toBeInTheDocument()
  })

  test('iframe has correct attributes', () => {
    render(<Newsletter />)
    const iframe = document.querySelector('iframe.beehiiv-embed')
    expect(iframe).toHaveAttribute('frameBorder', '0')
    expect(iframe).toHaveAttribute('scrolling', 'no')
  })
})
