import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Slideshow from '@/components/Slideshow'
import type { SlideShow } from '@/lib/slides'

// Real integration tests WITHOUT mocking the Slideshow component
// This tests the actual reveal.js integration

// Mock only the external dependencies
// Don't mock location as it may already be defined in the test environment

// Mock console methods to avoid noise in tests
const originalConsoleLog = console.log
const originalConsoleError = console.error

beforeAll(() => {
  console.log = jest.fn()
  console.error = jest.fn()
})

afterAll(() => {
  console.log = originalConsoleLog
  console.error = originalConsoleError
})

const mockSlideshow: SlideShow = {
  id: 'integration-test',
  title: 'Integration Test Slideshow',
  slides: [
    {
      type: 'title',
      title: 'Welcome to Integration Tests',
      content: 'Testing real reveal.js integration',
      notes: 'These are speaker notes for the title slide'
    },
    {
      type: 'content',
      title: 'Content Slide',
      content: 'This slide has regular content that should be rendered.'
    },
    {
      type: 'code',
      title: 'Code Example',
      code: {
        language: 'typescript',
        content: 'const test = () => {\n  return "Hello World";\n};'
      }
    },
    {
      type: 'image',
      title: 'Image Slide',
      image: {
        src: '/test-image.png',
        alt: 'Test integration image',
        caption: 'This is a test image for integration testing'
      }
    }
  ],
  metadata: {
    author: 'Integration Test Author',
    date: '2025-01-15',
    tags: ['integration', 'testing'],
    totalSlides: 4
  }
}

describe('Slideshow Real Integration Tests', () => {
  beforeEach(() => {
    // Clean up any existing reveal.js instances
    delete (window as any).Reveal
    delete (window as any).RevealHighlight
    delete (window as any).RevealNotes
    
    // Clear document head of any existing reveal.js links/scripts
    const existingLinks = document.head.querySelectorAll('link[href*="reveal"]')
    const existingScripts = document.head.querySelectorAll('script[src*="reveal"]')
    existingLinks.forEach(link => link.remove())
    existingScripts.forEach(script => script.remove())
  })

  afterEach(() => {
    // Cleanup after each test
    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach(el => el.remove())
  })

  test('should render slideshow container structure', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    // Check basic structure exists
    expect(screen.getByTestId('slideshow-wrapper')).toBeInTheDocument()
    
    // Check reveal.js container
    const revealContainer = document.querySelector('.reveal')
    expect(revealContainer).toBeInTheDocument()
    
    // Check slides container
    const slidesContainer = document.querySelector('.slides')
    expect(slidesContainer).toBeInTheDocument()
  })

  test('should render all slide content correctly', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    // Title slide content
    expect(screen.getByText('Welcome to Integration Tests')).toBeInTheDocument()
    expect(screen.getByText('Testing real reveal.js integration')).toBeInTheDocument()
    
    // Content slide
    expect(screen.getByText('Content Slide')).toBeInTheDocument()
    expect(screen.getByText('This slide has regular content that should be rendered.')).toBeInTheDocument()
    
    // Code slide
    expect(screen.getByText('Code Example')).toBeInTheDocument()
    expect(screen.getByText('const test = () => {')).toBeInTheDocument()
    
    // Image slide
    expect(screen.getByText('Image Slide')).toBeInTheDocument()
    expect(screen.getByAltText('Test integration image')).toBeInTheDocument()
  })

  test('should apply theme classes correctly', () => {
    const { rerender } = render(<Slideshow slideshow={mockSlideshow} theme="white" />)
    
    let wrapper = screen.getByTestId('slideshow-wrapper')
    expect(wrapper).toHaveClass('theme-white')
    
    // Test theme change
    rerender(<Slideshow slideshow={mockSlideshow} theme="black" />)
    wrapper = screen.getByTestId('slideshow-wrapper')
    expect(wrapper).toHaveClass('theme-black')
  })

  test('should load CSS files dynamically', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      // Check that reveal.js CSS is loaded
      const revealCSS = document.head.querySelector('link[href*="reveal.css"]')
      expect(revealCSS).toBeInTheDocument()
      
      // Check that theme CSS is loaded
      const themeCSS = document.head.querySelector('link[href*="black.css"]')
      expect(themeCSS).toBeInTheDocument()
    }, { timeout: 5000 })
  })

  test('should load JavaScript files dynamically', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      // Check that reveal.js is loaded
      const revealJS = document.head.querySelector('script[src*="reveal.js"]')
      expect(revealJS).toBeInTheDocument()
    }, { timeout: 5000 })
  })

  test('should handle loading states correctly', async () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    // Initially should show loading state
    expect(screen.getByText('Loading slideshow...')).toBeInTheDocument()
    
    // After loading, loading message should be gone
    await waitFor(() => {
      expect(screen.queryByText('Loading slideshow...')).not.toBeInTheDocument()
    }, { timeout: 10000 })
  })

  test('should handle slideshow with single slide', () => {
    const singleSlideshow: SlideShow = {
      id: 'single-slide',
      title: 'Single Slide',
      slides: [
        {
          type: 'title',
          title: 'Only Slide',
          content: 'This slideshow has only one slide'
        }
      ],
      metadata: {
        date: '2025-01-15',
        tags: [],
        totalSlides: 1
      }
    }

    render(<Slideshow slideshow={singleSlideshow} />)
    
    expect(screen.getByText('Only Slide')).toBeInTheDocument()
    expect(screen.getByText('This slideshow has only one slide')).toBeInTheDocument()
  })

  test('should handle slideshow with no slides gracefully', () => {
    const emptySlideshow: SlideShow = {
      id: 'empty',
      title: 'Empty Slideshow',
      slides: [],
      metadata: {
        date: '2025-01-15',
        tags: [],
        totalSlides: 0
      }
    }

    render(<Slideshow slideshow={emptySlideshow} />)
    
    // Should still render container but with no slide content
    expect(screen.getByTestId('slideshow-wrapper')).toBeInTheDocument()
    const slidesContainer = document.querySelector('.slides')
    expect(slidesContainer).toBeInTheDocument()
    expect(slidesContainer?.children).toHaveLength(0)
  })

  test('should render speaker notes correctly', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    // Check that speaker notes are rendered (they might be hidden by CSS)
    const notesElement = document.querySelector('.notes')
    expect(notesElement).toBeInTheDocument()
    expect(notesElement).toHaveTextContent('These are speaker notes for the title slide')
  })

  test('should render code blocks with language classes', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    const codeElement = document.querySelector('code[data-language="typescript"]')
    expect(codeElement).toBeInTheDocument()
    expect(codeElement).toHaveTextContent('const test = () => {')
  })

  test('should render image slides with proper attributes', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    const imgElement = screen.getByAltText('Test integration image')
    expect(imgElement).toHaveAttribute('src', '/test-image.png')
    
    // Check for caption
    expect(screen.getByText('This is a test image for integration testing')).toBeInTheDocument()
  })

  test('should create unique IDs for slideshow instances', () => {
    const { unmount } = render(<Slideshow slideshow={mockSlideshow} />)
    const firstWrapper = screen.getByTestId('slideshow-wrapper')
    const firstId = firstWrapper.id
    
    unmount()
    
    render(<Slideshow slideshow={mockSlideshow} />)
    const secondWrapper = screen.getByTestId('slideshow-wrapper')
    const secondId = secondWrapper.id
    
    // IDs should be different for different instances
    expect(firstId).not.toBe(secondId)
  })
})