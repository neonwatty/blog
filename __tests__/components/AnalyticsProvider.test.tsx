import { render, screen } from '@testing-library/react'
import { AnalyticsProvider } from '@/components/AnalyticsProvider'

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

  it('loads GA scripts when GA_ID is set', () => {
    process.env.NEXT_PUBLIC_GA_ID = 'GA-TEST'
    render(
      <AnalyticsProvider>
        <div>Child</div>
      </AnalyticsProvider>,
    )
    expect(screen.getAllByTestId('next-script').length).toBeGreaterThan(0)
  })

  it('does not load GA scripts when GA_ID is not set', () => {
    render(
      <AnalyticsProvider>
        <div>Child</div>
      </AnalyticsProvider>,
    )
    expect(screen.queryByTestId('next-script')).not.toBeInTheDocument()
  })

  it('always enables PostHog', () => {
    render(
      <AnalyticsProvider>
        <div>Child</div>
      </AnalyticsProvider>,
    )
    expect(screen.getByTestId('posthog-provider')).toHaveAttribute('data-enabled', 'true')
  })
})
