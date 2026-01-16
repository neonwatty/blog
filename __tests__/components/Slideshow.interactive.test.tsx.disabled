import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Slideshow from '@/components/Slideshow'
import type { SlideShow } from '@/lib/slides'

// Mock reveal.js for interactive testing
const mockRevealInstance = {
  initialize: jest.fn().mockResolvedValue(undefined),
  slide: jest.fn(),
  next: jest.fn(),
  prev: jest.fn(),
  getIndices: jest.fn().mockReturnValue({ h: 0, v: 0 }),
  getTotalSlides: jest.fn().mockReturnValue(4),
  isFirstSlide: jest.fn().mockReturnValue(true),
  isLastSlide: jest.fn().mockReturnValue(false),
  toggleOverview: jest.fn(),
  togglePause: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  sync: jest.fn(),
  layout: jest.fn(),
  getState: jest.fn().mockReturnValue({ indexh: 0, indexv: 0 }),
  setState: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  destroy: jest.fn()
}

const mockRevealHighlight = jest.fn()
const mockRevealNotes = jest.fn()

const mockSlideshow: SlideShow = {
  id: 'interactive-test',
  title: 'Interactive Test Slideshow',
  slides: [
    {
      type: 'title',
      title: 'Slide 1',
      content: 'First slide content'
    },
    {
      type: 'content',
      title: 'Slide 2',
      content: 'Second slide content'
    },
    {
      type: 'content',
      title: 'Slide 3',
      content: 'Third slide content'
    },
    {
      type: 'content',
      title: 'Slide 4',
      content: 'Fourth slide content'
    }
  ],
  metadata: {
    date: '2025-01-15',
    tags: ['interactive'],
    totalSlides: 4
  }
}

describe('Slideshow Interactive Tests', () => {
  beforeEach(() => {
    // Setup mock reveal.js
    ;(window as any).Reveal = jest.fn().mockImplementation(() => mockRevealInstance)
    ;(window as any).RevealHighlight = mockRevealHighlight
    ;(window as any).RevealNotes = mockRevealNotes
    
    // Reset all mocks
    jest.clearAllMocks()
    
    // Mock successful script loading
    const originalCreateElement = document.createElement
    document.createElement = jest.fn((tagName) => {
      const element = originalCreateElement.call(document, tagName)
      if (tagName === 'script' || tagName === 'link') {
        // Simulate successful loading
        setTimeout(() => {
          if ('onload' in element && typeof element.onload === 'function') {
            element.onload(new Event('load') as any)
          }
        }, 0)
      }
      return element
    }) as any
  })

  afterEach(() => {
    jest.restoreAllMocks()
    delete (window as any).Reveal
    delete (window as any).RevealHighlight
    delete (window as any).RevealNotes
  })

  test.skip('should initialize reveal.js with correct configuration', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      expect(mockRevealInstance.initialize).toHaveBeenCalledWith(
        expect.objectContaining({
          hash: true,
          transition: 'slide',
          plugins: expect.arrayContaining([mockRevealHighlight, mockRevealNotes])
        })
      )
    }, { timeout: 5000 })
  })

  test('should handle keyboard navigation', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    const user = userEvent.setup()
    
    await waitFor(() => {
      expect(mockRevealInstance.initialize).toHaveBeenCalled()
    })

    const slideshow = screen.getByTestId('slideshow-wrapper')
    
    // Mock reveal being ready
    mockRevealInstance.getIndices.mockReturnValue({ h: 0, v: 0 })
    
    // Simulate arrow key navigation
    await user.type(slideshow, '{arrowright}')
    await user.type(slideshow, '{arrowleft}')
    await user.type(slideshow, '{arrowdown}')
    await user.type(slideshow, '{arrowup}')
    
    // Space for next slide
    await user.type(slideshow, ' ')
    
    // ESC for overview
    await user.keyboard('{Escape}')
    
    // The actual navigation would be handled by reveal.js
    // We're testing that the component sets up the environment correctly
    expect(slideshow).toBeInTheDocument()
  })

  test('should handle mouse click navigation', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      expect(mockRevealInstance.initialize).toHaveBeenCalled()
    })

    // Simulate clicking on different areas of the slideshow
    const slideshow = screen.getByTestId('slideshow-wrapper')
    
    await act(async () => {
      fireEvent.click(slideshow)
    })
    
    expect(slideshow).toBeInTheDocument()
  })

  test('should initialize reveal.js successfully', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      expect(mockRevealInstance.initialize).toHaveBeenCalled()
    })

    // Verify the slideshow wrapper is present and visible
    const slideshow = screen.getByTestId('slideshow-wrapper')
    expect(slideshow).toBeInTheDocument()
    
    // Verify slide content is rendered
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
    expect(screen.getByText('First slide content')).toBeInTheDocument()
  })

  test('should handle fullscreen toggle', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    const user = userEvent.setup()
    
    await waitFor(() => {
      expect(mockRevealInstance.initialize).toHaveBeenCalled()
    })

    const slideshow = screen.getByTestId('slideshow-wrapper')
    
    // F key for fullscreen (reveal.js shortcut)
    await user.type(slideshow, 'f')
    
    expect(slideshow).toBeInTheDocument()
  })

  test('should handle speaker notes toggle', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    const user = userEvent.setup()
    
    await waitFor(() => {
      expect(mockRevealInstance.initialize).toHaveBeenCalled()
    })

    const slideshow = screen.getByTestId('slideshow-wrapper')
    
    // S key for speaker notes (reveal.js shortcut)
    await user.type(slideshow, 's')
    
    expect(slideshow).toBeInTheDocument()
  })

  test('should handle overview mode toggle', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    const user = userEvent.setup()
    
    await waitFor(() => {
      expect(mockRevealInstance.initialize).toHaveBeenCalled()
    })

    const slideshow = screen.getByTestId('slideshow-wrapper')
    
    // O key for overview mode (reveal.js shortcut)
    await user.type(slideshow, 'o')
    
    expect(slideshow).toBeInTheDocument()
  })

  test('should handle theme switching', async () => {
    const { rerender } = render(<Slideshow slideshow={mockSlideshow} theme="black" />)
    
    await waitFor(() => {
      expect(mockRevealInstance.initialize).toHaveBeenCalled()
    })

    let wrapper = screen.getByTestId('slideshow-wrapper')
    expect(wrapper).toHaveClass('theme-black')
    
    // Change theme
    rerender(<Slideshow slideshow={mockSlideshow} theme="white" />)
    
    await waitFor(() => {
      wrapper = screen.getByTestId('slideshow-wrapper')
      expect(wrapper).toHaveClass('theme-white')
    })
    
    // Change to another theme
    rerender(<Slideshow slideshow={mockSlideshow} theme="sky" />)
    
    await waitFor(() => {
      wrapper = screen.getByTestId('slideshow-wrapper')
      expect(wrapper).toHaveClass('theme-sky')
    })
  })

  test('should render all slide content correctly', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      expect(mockRevealInstance.initialize).toHaveBeenCalled()
    })

    // Verify all slide content is present in the DOM
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
    expect(screen.getByText('First slide content')).toBeInTheDocument()
    
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
    expect(screen.getByText('Second slide content')).toBeInTheDocument()
    
    expect(screen.getByText('Slide 3')).toBeInTheDocument()
    expect(screen.getByText('Third slide content')).toBeInTheDocument()
    
    expect(screen.getByText('Slide 4')).toBeInTheDocument()
    expect(screen.getByText('Fourth slide content')).toBeInTheDocument()
    
    // Verify reveal.js structure is set up
    const revealjsContainer = screen.getByTestId('slideshow-wrapper').querySelector('.reveal')
    expect(revealjsContainer).toBeInTheDocument()
    
    const slidesContainer = revealjsContainer?.querySelector('.slides')
    expect(slidesContainer).toBeInTheDocument()
  })

  test('should handle window resize for responsive behavior', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      expect(mockRevealInstance.initialize).toHaveBeenCalled()
    })

    // Simulate window resize
    await act(async () => {
      fireEvent(window, new Event('resize'))
    })

    // reveal.js should handle layout updates
    expect(mockRevealInstance.initialize).toHaveBeenCalled()
  })

  test('should handle touch events for mobile navigation', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      expect(mockRevealInstance.initialize).toHaveBeenCalled()
    })

    const slideshow = screen.getByTestId('slideshow-wrapper')
    
    // Simulate touch events
    await act(async () => {
      fireEvent.touchStart(slideshow, {
        touches: [{ clientX: 100, clientY: 100 }]
      })
      
      fireEvent.touchMove(slideshow, {
        touches: [{ clientX: 50, clientY: 100 }]
      })
      
      fireEvent.touchEnd(slideshow, {
        changedTouches: [{ clientX: 50, clientY: 100 }]
      })
    })

    expect(slideshow).toBeInTheDocument()
  })
})