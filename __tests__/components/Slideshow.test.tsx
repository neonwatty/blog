import { render, screen } from '@testing-library/react'
import Slideshow from '@/components/Slideshow'
import { SlideShow } from '@/lib/slides'

// Mock timers for setTimeout-based loading
jest.useFakeTimers()

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
})
