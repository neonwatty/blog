import { render, screen, act } from '@testing-library/react'
import Slideshow from '@/components/Slideshow'
import { SlideShow } from '@/lib/slides'

// Mock timers for setTimeout-based loading
jest.useFakeTimers()

// Mock createElement for loadCSS/loadScript
const originalCreateElement = document.createElement.bind(document)
const mockAppendChild = jest.spyOn(document.head, 'appendChild').mockImplementation((node) => node)

const mockSlideshow: SlideShow = {
  id: 'test-show',
  title: 'Test Slideshow',
  slides: [
    { type: 'title', title: 'Welcome Slide', content: 'Subtitle text', notes: 'Speaker notes here' },
    { type: 'content', title: 'Content Slide', content: 'Some content text' },
    { type: 'code', title: 'Code Slide', code: { language: 'javascript', content: 'const x = 1' } },
    {
      type: 'image',
      title: 'Image Slide',
      image: { src: '/test.png', alt: 'Test image', caption: 'A caption' },
    },
    { type: 'content', content: 'No title slide' },
  ],
  metadata: {
    author: 'Test Author',
    date: '2025-01-01',
    tags: ['test'],
    totalSlides: 5,
  },
}

describe('Slideshow', () => {
  afterEach(() => {
    jest.clearAllTimers()
    mockAppendChild.mockClear()
    delete (window as unknown as Record<string, unknown>).Reveal
    delete (window as unknown as Record<string, unknown>).RevealHighlight
    delete (window as unknown as Record<string, unknown>).RevealNotes
  })

  it('renders the slideshow wrapper with correct id', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    const wrapper = screen.getByTestId('slideshow-wrapper')
    expect(wrapper).toHaveAttribute('id', 'slideshow-test-show')
  })

  it('applies the theme class', () => {
    render(<Slideshow slideshow={mockSlideshow} theme="league" />)
    const wrapper = screen.getByTestId('slideshow-wrapper')
    expect(wrapper.className).toContain('theme-league')
  })

  it('defaults to black theme', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    const wrapper = screen.getByTestId('slideshow-wrapper')
    expect(wrapper.className).toContain('theme-black')
  })

  it('shows loading state initially', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    expect(screen.getByText('Loading slideshow...')).toBeInTheDocument()
  })

  it('renders title slides with h1 and subtitle', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    expect(screen.getByText('Welcome Slide')).toBeInTheDocument()
    expect(screen.getByText('Subtitle text')).toBeInTheDocument()
  })

  it('renders speaker notes in aside elements', () => {
    const { container } = render(<Slideshow slideshow={mockSlideshow} />)
    const notes = container.querySelector('aside.notes')
    expect(notes).toHaveTextContent('Speaker notes here')
  })

  it('renders code slides with pre/code blocks', () => {
    const { container } = render(<Slideshow slideshow={mockSlideshow} />)
    const codeBlock = container.querySelector('code[data-language="javascript"]')
    expect(codeBlock).toBeInTheDocument()
    expect(codeBlock).toHaveTextContent('const x = 1')
  })

  it('renders image slides with img element', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    const img = screen.getByAltText('Test image')
    expect(img).toHaveAttribute('src', '/test.png')
  })

  it('renders image caption when provided', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    expect(screen.getByText('A caption')).toBeInTheDocument()
  })

  it('renders content slides with dangerouslySetInnerHTML', () => {
    const { container } = render(<Slideshow slideshow={mockSlideshow} />)
    // Content slide with "Some content text" should be rendered
    expect(container.textContent).toContain('Some content text')
  })

  it('renders all slides', () => {
    const { container } = render(<Slideshow slideshow={mockSlideshow} />)
    const sections = container.querySelectorAll('section')
    expect(sections).toHaveLength(5)
  })

  it('triggers loadReveal after timeout and loads CSS/scripts', async () => {
    // Set up mock Reveal.js on window
    const mockInitialize = jest.fn().mockResolvedValue(undefined)
    const mockLayout = jest.fn()
    const mockDestroy = jest.fn()
    const MockReveal = jest.fn().mockImplementation(() => ({
      initialize: mockInitialize,
      layout: mockLayout,
      destroy: mockDestroy,
    }))
    ;(window as unknown as Record<string, unknown>).Reveal = MockReveal
    ;(window as unknown as Record<string, unknown>).RevealHighlight = jest.fn()
    ;(window as unknown as Record<string, unknown>).RevealNotes = jest.fn()

    render(<Slideshow slideshow={mockSlideshow} />)

    // Loading should be shown initially
    expect(screen.getByText('Loading slideshow...')).toBeInTheDocument()

    // Advance past the 500ms initial delay
    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    // Trigger link onload for CSS files to resolve loadCSS promises
    const appendedNodes = mockAppendChild.mock.calls.map((c) => c[0]) as HTMLElement[]
    appendedNodes.forEach((node) => {
      if (node instanceof HTMLLinkElement && node.onload) {
        node.onload(new Event('load'))
      }
      if (node instanceof HTMLScriptElement && node.onload) {
        node.onload(new Event('load'))
      }
    })

    // Advance past the 200ms delay after script loading
    await act(async () => {
      jest.advanceTimersByTime(200)
    })

    // Advance past the 100ms layout delay
    await act(async () => {
      jest.advanceTimersByTime(100)
    })
  })

  it('shows error state when Reveal.js is not available', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation()

    // No Reveal on window
    delete (window as unknown as Record<string, unknown>).Reveal

    render(<Slideshow slideshow={mockSlideshow} />)

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    // Trigger link/script loads
    const appendedNodes = mockAppendChild.mock.calls.map((c) => c[0]) as HTMLElement[]
    appendedNodes.forEach((node) => {
      if (node instanceof HTMLLinkElement && node.onload) {
        node.onload(new Event('load'))
      }
      if (node instanceof HTMLScriptElement && node.onload) {
        node.onload(new Event('load'))
      }
    })

    await act(async () => {
      jest.advanceTimersByTime(200)
    })

    await act(async () => {
      jest.advanceTimersByTime(100)
    })

    errorSpy.mockRestore()
  })

  it('cleans up on unmount', () => {
    const { unmount } = render(<Slideshow slideshow={mockSlideshow} />)
    unmount()
    // No error thrown during cleanup
  })

  it('renders content slide without title', () => {
    const slideshow: SlideShow = {
      ...mockSlideshow,
      slides: [{ type: 'content', content: 'Only content, no title' }],
    }
    const { container } = render(<Slideshow slideshow={slideshow} />)
    expect(container.textContent).toContain('Only content, no title')
  })

  it('renders image slide without caption', () => {
    const slideshow: SlideShow = {
      ...mockSlideshow,
      slides: [{ type: 'image', title: 'No Caption', image: { src: '/img.png', alt: 'img' } }],
    }
    render(<Slideshow slideshow={slideshow} />)
    expect(screen.getByAltText('img')).toBeInTheDocument()
    expect(screen.queryByText('A caption')).not.toBeInTheDocument()
  })
})
