import { render, screen } from '@testing-library/react'
import { AnalyticsProvider } from '@/components/AnalyticsProvider'

// Mock child components
jest.mock('@/components/CookieConsent', () => ({
  __esModule: true,
  default: ({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) => (
    <div data-testid="cookie-consent">
      <button onClick={onAccept}>Accept</button>
      <button onClick={onDecline}>Decline</button>
    </div>
  ),
}))

jest.mock('@/components/PostHogProvider', () => ({
  __esModule: true,
  default: ({ enabled }: { enabled: boolean }) => <div data-testid="posthog-provider" data-enabled={String(enabled)} />,
}))

jest.mock('next/script', () => ({
  __esModule: true,
  default: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => (
    <div data-testid="next-script" data-src={props.src as string} data-id={props.id as string}>
      {children}
    </div>
  ),
}))

describe('AnalyticsProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    delete process.env.NEXT_PUBLIC_GA_ID
  })

  it('renders children', () => {
    render(
      <AnalyticsProvider>
        <div data-testid="child">Hello</div>
      </AnalyticsProvider>,
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('shows cookie consent when consent is pending', () => {
    render(
      <AnalyticsProvider>
        <div>Child</div>
      </AnalyticsProvider>,
    )
    expect(screen.getByTestId('cookie-consent')).toBeInTheDocument()
  })

  it('does not show GA scripts when consent is pending', () => {
    process.env.NEXT_PUBLIC_GA_ID = 'GA-TEST'
    render(
      <AnalyticsProvider>
        <div>Child</div>
      </AnalyticsProvider>,
    )
    expect(screen.queryByTestId('next-script')).not.toBeInTheDocument()
  })

  it('reads stored consent from localStorage', () => {
    localStorage.setItem('cookie-consent', 'declined')
    render(
      <AnalyticsProvider>
        <div>Child</div>
      </AnalyticsProvider>,
    )
    // Cookie consent banner should not show when already declined
    expect(screen.queryByTestId('cookie-consent')).not.toBeInTheDocument()
  })

  it('passes analytics disabled to PostHog when pending', () => {
    render(
      <AnalyticsProvider>
        <div>Child</div>
      </AnalyticsProvider>,
    )
    expect(screen.getByTestId('posthog-provider')).toHaveAttribute('data-enabled', 'false')
  })

  it('passes analytics enabled to PostHog when accepted', () => {
    localStorage.setItem('cookie-consent', 'accepted')
    render(
      <AnalyticsProvider>
        <div>Child</div>
      </AnalyticsProvider>,
    )
    expect(screen.getByTestId('posthog-provider')).toHaveAttribute('data-enabled', 'true')
  })
})
