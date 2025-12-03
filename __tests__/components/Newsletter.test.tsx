import { render, screen } from '@testing-library/react'
import Newsletter from '@/components/Newsletter'

describe('Newsletter Component', () => {
  test('renders heading', () => {
    render(<Newsletter />)
    expect(screen.getByText('Join our Discord Community')).toBeInTheDocument()
  })

  test('renders subtitle', () => {
    render(<Newsletter />)
    expect(screen.getByText('Keep up to date with open source projects')).toBeInTheDocument()
  })

  test('contains Discord link with correct href', () => {
    render(<Newsletter />)
    const link = screen.getByRole('link', { name: /Join Discord/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://discord.gg/BC2Kn9Ne')
  })

  test('Discord link opens in new tab', () => {
    render(<Newsletter />)
    const link = screen.getByRole('link', { name: /Join Discord/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('contains Discord icon SVG', () => {
    render(<Newsletter />)
    const link = screen.getByRole('link', { name: /Join Discord/i })
    const svg = link.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  test('renders Join Discord text', () => {
    render(<Newsletter />)
    expect(screen.getByText('Join Discord')).toBeInTheDocument()
  })
})
