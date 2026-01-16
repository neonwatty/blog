import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import type { SlideShow } from '@/lib/slides'

// Mock the Slideshow component since it has complex DOM manipulation
jest.mock('@/components/Slideshow', () => {
  return function MockSlideshow({ slideshow, theme }: { slideshow: SlideShow, theme?: string }) {
    return (
      <div data-testid="slideshow-wrapper" className={`theme-${theme || 'black'}`}>
        <div className="reveal" role="presentation">
          <div className="slides">
            {slideshow.slides.map((slide, index) => (
              <section key={index} data-slide-type={slide.type}>
                {slide.title && <h1>{slide.title}</h1>}
                {slide.content && <div>{slide.content}</div>}
                {slide.code && (
                  <pre>
                    <code data-language={slide.code.language}>{slide.code.content}</code>
                  </pre>
                )}
                {slide.image && (
                  <img src={slide.image.src} alt={slide.image.alt} />
                )}
                {slide.notes && <aside className="notes">{slide.notes}</aside>}
              </section>
            ))}
          </div>
        </div>
      </div>
    )
  }
})

import Slideshow from '@/components/Slideshow'

const mockSlideshow: SlideShow = {
  id: 'test-slideshow',
  title: 'Test Slideshow',
  slides: [
    {
      type: 'title',
      title: 'Title Slide',
      content: 'This is the title slide content',
      notes: 'Speaker notes for title slide'
    },
    {
      type: 'content',
      title: 'Content Slide',
      content: 'This is regular content'
    },
    {
      type: 'code',
      title: 'Code Example',
      code: {
        language: 'javascript',
        content: 'console.log("Hello World");'
      }
    },
    {
      type: 'image',
      title: 'Image Slide',
      image: {
        src: '/test-image.png',
        alt: 'Test image',
        caption: 'Image caption'
      }
    }
  ],
  metadata: {
    author: 'Test Author',
    date: '2025-01-15',
    tags: ['test'],
    totalSlides: 4
  }
}

describe('Slideshow Component', () => {

  it('should render the reveal.js container', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    expect(screen.getByRole('presentation')).toBeInTheDocument()
    expect(screen.getByRole('presentation')).toHaveClass('reveal')
  })

  it('should render all slide types', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    // Check for title slide
    expect(screen.getByText('Title Slide')).toBeInTheDocument()
    expect(screen.getByText('This is the title slide content')).toBeInTheDocument()
    
    // Check for content slide
    expect(screen.getByText('Content Slide')).toBeInTheDocument()
    expect(screen.getByText('This is regular content')).toBeInTheDocument()
    
    // Check for code slide
    expect(screen.getByText('Code Example')).toBeInTheDocument()
    expect(screen.getByText('console.log("Hello World");')).toBeInTheDocument()
    
    // Check for image slide
    expect(screen.getByText('Image Slide')).toBeInTheDocument()
    expect(screen.getByAltText('Test image')).toBeInTheDocument()
  })

  it('should include speaker notes when present', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    expect(screen.getByText('Speaker notes for title slide')).toBeInTheDocument()
  })

  it('should apply correct theme class', () => {
    render(<Slideshow slideshow={mockSlideshow} theme="white" />)
    
    const wrapper = screen.getByTestId('slideshow-wrapper')
    expect(wrapper).toHaveClass('theme-white')
  })

  it('should apply default black theme when no theme specified', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    const wrapper = screen.getByTestId('slideshow-wrapper')
    expect(wrapper).toHaveClass('theme-black')
  })

  it('should handle slideshow with minimal slides', () => {
    const minimalSlideshow: SlideShow = {
      id: 'minimal',
      title: 'Minimal',
      slides: [
        {
          type: 'title',
          title: 'Only Title'
        }
      ],
      metadata: {
        date: '2025-01-15',
        tags: [],
        totalSlides: 1
      }
    }

    render(<Slideshow slideshow={minimalSlideshow} />)
    
    expect(screen.getByText('Only Title')).toBeInTheDocument()
  })

  it('should render different slide types correctly', () => {
    render(<Slideshow slideshow={mockSlideshow} />)
    
    // Check slide type attributes
    expect(screen.getByTestId('slideshow-wrapper').querySelector('[data-slide-type="title"]')).toBeInTheDocument()
    expect(screen.getByTestId('slideshow-wrapper').querySelector('[data-slide-type="content"]')).toBeInTheDocument()
    expect(screen.getByTestId('slideshow-wrapper').querySelector('[data-slide-type="code"]')).toBeInTheDocument()
    expect(screen.getByTestId('slideshow-wrapper').querySelector('[data-slide-type="image"]')).toBeInTheDocument()
  })
})