'use client'

import { useEffect, useRef, useState } from 'react'
import { SlideShow, Slide } from '@/lib/slides'

// Import Reveal.js
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Reveal: any
  }
}

interface SlideshowProps {
  slideshow: SlideShow
  theme?: 'default' | 'black' | 'white' | 'league' | 'sky'
}

export default function Slideshow({ slideshow, theme = 'black' }: SlideshowProps) {
  const deckRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const revealRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCSS = (href: string) => {
      return new Promise<void>((resolve, reject) => {
        // Check if CSS is already loaded
        const existing = document.querySelector(`link[href="${href}"]`)
        if (existing) {
          resolve()
          return
        }

        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        link.onload = () => {
          console.log(`CSS loaded: ${href}`)
          resolve()
        }
        link.onerror = () => {
          console.error(`Failed to load CSS: ${href}`)
          reject(new Error(`Failed to load CSS: ${href}`))
        }
        document.head.appendChild(link)
      })
    }

    const loadReveal = async () => {
      try {
        setIsLoading(true)
        setError(null)
        console.log('Starting slideshow initialization...')

        // Load CSS files
        console.log('Loading CSS files...')
        await Promise.all([
          loadCSS('/reveal.js/reveal.css'),
          loadCSS(`/reveal.js/theme/${theme}.css`),
          loadCSS('/reveal.js/plugin/highlight/monokai.css')
        ])
        console.log('CSS files loaded successfully')

        // Small delay to ensure CSS is applied
        await new Promise(resolve => setTimeout(resolve, 200))

        // Dynamically import Reveal.js to avoid SSR issues
        console.log('Loading Reveal.js...')
        const RevealModule = await import('reveal.js')
        const Reveal = RevealModule.default || RevealModule
        console.log('Reveal.js loaded:', typeof Reveal)
        
        // Import plugins
        console.log('Loading plugins...')
        const HighlightModule = await import('reveal.js/plugin/highlight/highlight.esm.js')
        const NotesModule = await import('reveal.js/plugin/notes/notes.esm.js')
        const Highlight = HighlightModule.default || HighlightModule
        const Notes = NotesModule.default || NotesModule
        console.log('Plugins loaded')

        if (deckRef.current && Reveal) {
          console.log('Initializing Reveal.js...')
          // Clean up any existing instance
          if (revealRef.current) {
            try {
              revealRef.current.destroy()
            } catch (e) {
              console.warn('Error destroying previous instance:', e)
            }
          }

          revealRef.current = new Reveal(deckRef.current, {
            plugins: [Highlight, Notes].filter(Boolean),
            hash: false,
            controls: true,
            progress: true,
            center: true,
            transition: 'slide',
            backgroundTransition: 'fade',
            width: '100%',
            height: '100%',
            margin: 0.04,
            minScale: 0.2,
            maxScale: 2.0,
            embedded: false
          })

          await revealRef.current.initialize()
          console.log('Reveal.js initialized successfully')
          setIsLoading(false)
        } else {
          throw new Error('Reveal.js not loaded or deck reference not available')
        }
      } catch (err) {
        console.error('Failed to initialize Reveal.js:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setIsLoading(false)
      }
    }

    // Add a small delay to ensure component is mounted
    const timer = setTimeout(loadReveal, 100)
    
    // Cleanup on unmount
    return () => {
      clearTimeout(timer)
      if (revealRef.current) {
        try {
          revealRef.current.destroy()
        } catch (err) {
          console.warn('Error destroying Reveal.js:', err)
        }
      }
    }
  }, [theme])

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100 text-red-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Slideshow</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
          <p>Loading slideshow...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="reveal" ref={deckRef}>
      <div className="slides">
        {slideshow.slides.map((slide, index) => (
          <SlideshowSlide key={index} slide={slide} />
        ))}
      </div>
    </div>
  )
}

interface SlideshowSlideProps {
  slide: Slide
}

function SlideshowSlide({ slide }: SlideshowSlideProps) {
  if (slide.type === 'title') {
    return (
      <section>
        <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em' }}>{slide.title}</h1>
        {slide.content && <p style={{ fontSize: '1.2em', color: '#ccc' }}>{slide.content}</p>}
        {slide.notes && (
          <aside className="notes">
            {slide.notes}
          </aside>
        )}
      </section>
    )
  }

  if (slide.type === 'code') {
    return (
      <section>
        {slide.title && <h2 style={{ marginBottom: '1em' }}>{slide.title}</h2>}
        <pre style={{ width: '100%', fontSize: '0.8em' }}>
          <code data-language={slide.code?.language || 'text'} className="hljs">
            {slide.code?.content}
          </code>
        </pre>
        {slide.notes && (
          <aside className="notes">
            {slide.notes}
          </aside>
        )}
      </section>
    )
  }

  if (slide.type === 'image') {
    return (
      <section>
        {slide.title && <h2 style={{ marginBottom: '1em' }}>{slide.title}</h2>}
        {slide.image && (
          <div>
            <img 
              src={slide.image.src} 
              alt={slide.image.alt}
              style={{ maxWidth: '80%', maxHeight: '60vh', objectFit: 'contain' }}
            />
            {slide.image.caption && (
              <p style={{ fontSize: '0.8em', color: '#ccc', marginTop: '1em' }}>{slide.image.caption}</p>
            )}
          </div>
        )}
        {slide.notes && (
          <aside className="notes">
            {slide.notes}
          </aside>
        )}
      </section>
    )
  }

  // Default content slide
  return (
    <section>
      {slide.title && <h2 style={{ marginBottom: '1em', fontSize: '1.8em' }}>{slide.title}</h2>}
      {slide.content && (
        <div 
          style={{ 
            fontSize: '1.1em', 
            lineHeight: '1.6',
            textAlign: 'left',
            maxWidth: '90%',
            margin: '0 auto'
          }}
          dangerouslySetInnerHTML={{ 
            __html: formatSlideContent(slide.content) 
          }}
        />
      )}
      {slide.notes && (
        <aside className="notes">
          {slide.notes}
        </aside>
      )}
    </section>
  )
}

/**
 * Format slide content for better presentation
 */
function formatSlideContent(content: string): string {
  return content
    // Convert markdown-style lists to HTML
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/g, '<ul style="text-align: left; margin: 1em 0;">$1</ul>')
    // Convert bold text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Convert italic text  
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Convert inline code
    .replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace;">$1</code>')
    // Convert paragraphs
    .split('\n\n')
    .filter(para => para.trim())
    .map(para => `<p style="margin-bottom: 1em;">${para.trim()}</p>`)
    .join('')
}