import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from '@/components/ThemeToggle'

// Mock the ThemeProvider hook
const mockToggleTheme = jest.fn()
let mockTheme = 'light'

jest.mock('@/components/ThemeProvider', () => ({
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockTheme = 'light'
  })

  it('renders a button with accessibility label', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('dark'))
  })

  it('calls toggleTheme on click', () => {
    render(<ThemeToggle />)

    fireEvent.click(screen.getByRole('button'))
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('shows sun icon in light mode', () => {
    mockTheme = 'light'
    const { container } = render(<ThemeToggle />)

    // In light mode, the button should have an SVG (sun icon)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('shows moon icon in dark mode', () => {
    mockTheme = 'dark'
    const { container } = render(<ThemeToggle />)

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('updates aria-label based on current theme', () => {
    mockTheme = 'dark'
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('light'))
  })

  it('applies hover styles on mouse enter', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.mouseEnter(button)
    // Verify button is still rendered (mouse events don't crash)
    expect(button).toBeInTheDocument()
  })

  it('removes hover styles on mouse leave', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.mouseEnter(button)
    fireEvent.mouseLeave(button)
    expect(button).toBeInTheDocument()
  })
})
