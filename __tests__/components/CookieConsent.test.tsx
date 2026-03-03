import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CookieConsent from '@/components/CookieConsent'

describe('CookieConsent', () => {
  const mockOnAccept = jest.fn()
  const mockOnDecline = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  it('renders the cookie consent dialog', () => {
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(/cookies for analytics/i)).toBeInTheDocument()
  })

  it('renders accept and decline buttons', () => {
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />)

    expect(screen.getByText('Accept')).toBeInTheDocument()
    expect(screen.getByText('Decline')).toBeInTheDocument()
  })

  it('calls onAccept and sets localStorage when accept is clicked', () => {
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />)

    fireEvent.click(screen.getByText('Accept'))

    expect(mockOnAccept).toHaveBeenCalledTimes(1)
    expect(localStorage.getItem('cookie-consent')).toBe('accepted')
  })

  it('calls onDecline and sets localStorage when decline is clicked', () => {
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />)

    fireEvent.click(screen.getByText('Decline'))

    expect(mockOnDecline).toHaveBeenCalledTimes(1)
    expect(localStorage.getItem('cookie-consent')).toBe('declined')
  })

  it('has accessible dialog role and label', () => {
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-label', 'Cookie consent')
  })
})
