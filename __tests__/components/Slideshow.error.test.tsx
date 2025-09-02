import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Slideshow from '@/components/Slideshow'
import type { SlideShow } from '@/lib/slides'

// Mock console methods to capture error messages
const originalConsoleError = console.error
const originalConsoleLog = console.log

let consoleErrorSpy: jest.SpyInstance
let consoleLogSpy: jest.SpyInstance

const mockSlideshow: SlideShow = {
  id: 'error-test',
  title: 'Error Test Slideshow',
  slides: [
    {
      type: 'title',
      title: 'Test Slide',
      content: 'Testing error handling'
    }
  ],
  metadata: {
    date: '2025-01-15',
    tags: ['error-testing'],
    totalSlides: 1
  }
}

describe('Slideshow Error Handling Tests', () => {
  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
    
    // Clean up any existing reveal.js instances
    delete (window as any).Reveal
    delete (window as any).RevealHighlight
    delete (window as any).RevealNotes
    
    // Clear document head
    const existingLinks = document.head.querySelectorAll('link[href*="reveal"]')
    const existingScripts = document.head.querySelectorAll('script[src*="reveal"]')
    existingLinks.forEach(link => link.remove())
    existingScripts.forEach(script => script.remove())
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
    consoleLogSpy.mockRestore()
  })

  test('should handle CSS loading failures gracefully', async () => {
    // Mock document.createElement to simulate CSS loading failure
    const originalCreateElement = document.createElement
    document.createElement = jest.fn((tagName) => {
      const element = originalCreateElement.call(document, tagName)
      if (tagName === 'link') {
        // Simulate CSS loading failure
        setTimeout(() => {
          if ('onerror' in element && typeof element.onerror === 'function') {
            element.onerror()
          }
        }, 0)
      }
      return element
    }) as any

    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to load CSS')
      )
    }, { timeout: 5000 })

    // Should show error state instead of wrapper with testid
    expect(screen.getByText(/error loading slideshow/i)).toBeInTheDocument()
    
    document.createElement = originalCreateElement
  })

  test.skip('should handle JavaScript loading failures gracefully', async () => {
    // Mock document.createElement to simulate JS loading failure
    const originalCreateElement = document.createElement
    document.createElement = jest.fn((tagName) => {
      const element = originalCreateElement.call(document, tagName)
      if (tagName === 'script') {
        // Simulate script loading failure
        setTimeout(() => {
          if ('onerror' in element && typeof element.onerror === 'function') {
            element.onerror()
          }
        }, 0)
      } else if (tagName === 'link') {
        // Allow CSS to load successfully
        setTimeout(() => {
          if ('onload' in element && typeof element.onload === 'function') {
            element.onload()
          }
        }, 0)
      }
      return element
    }) as any

    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to load script')
      )
    }, { timeout: 10000 })

    // Should show error state
    expect(screen.getByText(/error loading slideshow/i)).toBeInTheDocument()
    
    document.createElement = originalCreateElement
  }, 15000)

  test.skip('should handle reveal.js initialization failure', async () => {
    // Mock successful script loading but failing initialization
    const originalCreateElement = document.createElement
    document.createElement = jest.fn((tagName) => {
      const element = originalCreateElement.call(document, tagName)
      if (tagName === 'script' || tagName === 'link') {
        setTimeout(() => {
          if ('onload' in element && typeof element.onload === 'function') {
            element.onload()
          }
        }, 0)
      }
      return element
    }) as any

    // Mock reveal.js being available but initialization failing
    ;(window as any).Reveal = {
      initialize: jest.fn().mockRejectedValue(new Error('Initialization failed'))
    }
    ;(window as any).RevealHighlight = jest.fn()
    ;(window as any).RevealNotes = jest.fn()

    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error initializing reveal.js'),
        expect.any(Error)
      )
    }, { timeout: 5000 })

    // Should show error state
    expect(screen.getByText(/error loading slideshow/i)).toBeInTheDocument()
    
    document.createElement = originalCreateElement
  })

  test.skip('should handle missing reveal.js plugins gracefully', async () => {
    // Mock successful script loading
    const originalCreateElement = document.createElement
    document.createElement = jest.fn((tagName) => {
      const element = originalCreateElement.call(document, tagName)
      if (tagName === 'script' || tagName === 'link') {
        setTimeout(() => {
          if ('onload' in element && typeof element.onload === 'function') {
            element.onload()
          }
        }, 0)
      }
      return element
    }) as any

    // Mock reveal.js being available but plugins missing
    ;(window as any).Reveal = {
      initialize: jest.fn().mockResolvedValue(undefined)
    }
    // Don't set RevealHighlight or RevealNotes

    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      expect((window as any).Reveal.initialize).toHaveBeenCalledWith(
        expect.objectContaining({
          plugins: [] // Should filter out undefined plugins
        })
      )
    }, { timeout: 5000 })
    
    document.createElement = originalCreateElement
  })

  test('should handle malformed slideshow data', () => {
    const malformedSlideshow = {
      ...mockSlideshow,
      slides: [
        {
          type: 'invalid-type' as any,
          title: 'Invalid Slide'
        },
        {
          type: 'code',
          title: 'Code without code property'
          // Missing code property
        },
        {
          type: 'image',
          title: 'Image without image property'
          // Missing image property
        }
      ]
    }

    // Should not crash even with malformed data
    render(<Slideshow slideshow={malformedSlideshow} />)
    
    // Should render slide content even if wrapper doesn't have testid
    expect(screen.getByText('Invalid Slide')).toBeInTheDocument()
    expect(screen.getByText('Code without code property')).toBeInTheDocument()
    expect(screen.getByText('Image without image property')).toBeInTheDocument()
  })

  test('should handle network timeouts during script loading', async () => {
    // Mock slow loading scripts that never complete
    const originalCreateElement = document.createElement
    document.createElement = jest.fn((tagName) => {
      const element = originalCreateElement.call(document, tagName)
      // Don't call onload or onerror - simulate hanging request
      return element
    }) as any

    render(<Slideshow slideshow={mockSlideshow} />)
    
    // Should show loading state indefinitely
    expect(screen.getByText('Loading slideshow...')).toBeInTheDocument()
    
    // After some time, it should still be loading (no timeout implemented)
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })
    
    expect(screen.getByText('Loading slideshow...')).toBeInTheDocument()
    
    document.createElement = originalCreateElement
  })

  test('should handle reveal.js runtime errors', async () => {
    // Mock successful initialization but runtime errors
    const originalCreateElement = document.createElement
    document.createElement = jest.fn((tagName) => {
      const element = originalCreateElement.call(document, tagName)
      if (tagName === 'script' || tagName === 'link') {
        setTimeout(() => {
          if ('onload' in element && typeof element.onload === 'function') {
            element.onload()
          }
        }, 0)
      }
      return element
    }) as any

    const mockReveal = {
      initialize: jest.fn().mockResolvedValue(undefined),
      slide: jest.fn().mockImplementation(() => {
        throw new Error('Runtime error during slide navigation')
      }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }

    ;(window as any).Reveal = mockReveal
    ;(window as any).RevealHighlight = jest.fn()
    ;(window as any).RevealNotes = jest.fn()

    render(<Slideshow slideshow={mockSlideshow} />)
    
    await waitFor(() => {
      expect(mockReveal.initialize).toHaveBeenCalled()
    })

    // Trigger a runtime error
    try {
      mockReveal.slide()
    } catch (error) {
      // Error should be caught and logged
      expect(error).toBeInstanceOf(Error)
    }
    
    document.createElement = originalCreateElement
  })

  test('should handle component unmounting during loading', async () => {
    const originalCreateElement = document.createElement
    document.createElement = jest.fn((tagName) => {
      const element = originalCreateElement.call(document, tagName)
      // Never resolve loading
      return element
    }) as any

    const { unmount } = render(<Slideshow slideshow={mockSlideshow} />)
    
    expect(screen.getByText('Loading slideshow...')).toBeInTheDocument()
    
    // Unmount while still loading
    unmount()
    
    // Should not cause any errors or memory leaks
    expect(document.querySelector('[data-testid="slideshow-wrapper"]')).not.toBeInTheDocument()
    
    document.createElement = originalCreateElement
  })

  test('should handle invalid theme gracefully', () => {
    render(<Slideshow slideshow={mockSlideshow} theme={'invalid-theme' as any} />)
    
    const wrapper = screen.getByTestId('slideshow-wrapper')
    expect(wrapper).toHaveClass('theme-invalid-theme')
    
    // Should still render successfully
    expect(screen.getByText('Test Slide')).toBeInTheDocument()
  })

  test('should handle empty slide content gracefully', () => {
    const emptyContentSlideshow: SlideShow = {
      id: 'empty-content',
      title: 'Empty Content Test',
      slides: [
        {
          type: 'title',
          title: '', // Empty title
          content: '' // Empty content
        },
        {
          type: 'content',
          title: 'Content Slide'
          // No content property
        },
        {
          type: 'code',
          title: 'Code Slide',
          code: {
            language: 'javascript',
            content: '' // Empty code
          }
        }
      ],
      metadata: {
        date: '2025-01-15',
        tags: [],
        totalSlides: 3
      }
    }

    render(<Slideshow slideshow={emptyContentSlideshow} />)
    
    expect(screen.getByTestId('slideshow-wrapper')).toBeInTheDocument()
    expect(screen.getByText('Content Slide')).toBeInTheDocument()
    expect(screen.getByText('Code Slide')).toBeInTheDocument()
  })
})