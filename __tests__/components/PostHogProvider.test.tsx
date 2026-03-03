import { render } from '@testing-library/react'
import PostHogProvider from '@/components/PostHogProvider'

const mockInit = jest.fn()
const mockReset = jest.fn()

jest.mock('posthog-js', () => ({
  __esModule: true,
  default: {
    init: (...args: unknown[]) => mockInit(...args),
    reset: () => mockReset(),
  },
}))

describe('PostHogProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    delete process.env.NEXT_PUBLIC_POSTHOG_KEY
    delete process.env.NEXT_PUBLIC_POSTHOG_HOST
  })

  it('renders nothing (returns null)', () => {
    const { container } = render(<PostHogProvider enabled={false} />)
    expect(container.innerHTML).toBe('')
  })

  it('does not initialize posthog when disabled', () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test'
    render(<PostHogProvider enabled={false} />)
    expect(mockInit).not.toHaveBeenCalled()
  })

  it('does not initialize posthog when key is missing', () => {
    render(<PostHogProvider enabled={true} />)
    expect(mockInit).not.toHaveBeenCalled()
  })

  it('initializes posthog when enabled with key', () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test123'
    process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://ph.example.com'
    render(<PostHogProvider enabled={true} />)
    expect(mockInit).toHaveBeenCalledWith(
      'phc_test123',
      expect.objectContaining({
        api_host: 'https://ph.example.com',
        autocapture: true,
      }),
    )
  })

  it('uses default host when POSTHOG_HOST not set', () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test'
    render(<PostHogProvider enabled={true} />)
    expect(mockInit).toHaveBeenCalledWith(
      'phc_test',
      expect.objectContaining({
        api_host: 'https://us.i.posthog.com',
      }),
    )
  })

  it('calls reset on unmount when enabled', () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test'
    const { unmount } = render(<PostHogProvider enabled={true} />)
    unmount()
    expect(mockReset).toHaveBeenCalled()
  })
})
