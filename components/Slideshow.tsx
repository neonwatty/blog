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

        // Load Reveal.js from our static assets
        console.log('Loading Reveal.js from static assets...')
        
        // Create script elements for Reveal.js and plugins
        const loadScript = (src: string) => {
          return new Promise<void>((resolve, reject) => {
            const existing = document.querySelector(`script[src="${src}"]`)
            if (existing) {
              resolve()
              return
            }
            
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
              console.log(`Script loaded: ${src}`)
              resolve()
            }
            script.onerror = () => {
              console.error(`Failed to load script: ${src}`)
              reject(new Error(`Failed to load script: ${src}`))
            }
            document.head.appendChild(script)
          })
        }

        // Load Reveal.js and plugins sequentially
        await loadScript('/reveal.js/reveal.js')
        await loadScript('/reveal.js/plugin/highlight/highlight.js')
        await loadScript('/reveal.js/plugin/notes/notes.js')
        
        // Small delay to ensure scripts are fully loaded
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Check if Reveal is available on window
        const Reveal = (window as any).Reveal
        const RevealHighlight = (window as any).RevealHighlight
        const RevealNotes = (window as any).RevealNotes
        
        console.log('Reveal.js loaded:', typeof Reveal)
        console.log('Plugins available:', {
          highlight: typeof RevealHighlight,
          notes: typeof RevealNotes
        })

        console.log('Checking initialization conditions...')
        console.log('deckRef.current:', deckRef.current)
        console.log('Reveal available:', typeof Reveal)
        
        if (!deckRef.current) {
          throw new Error('Deck reference not available - component may not be mounted properly')
        }
        
        if (!Reveal) {
          throw new Error('Reveal.js not loaded from window object')
        }

        console.log('Initializing Reveal.js...')
        // Clean up any existing instance
        if (revealRef.current) {
          try {
            revealRef.current.destroy()
            console.log('Destroyed previous instance')
          } catch (e) {
            console.warn('Error destroying previous instance:', e)
          }
        }

        console.log('Creating new Reveal instance...')
        revealRef.current = new Reveal(deckRef.current, {
          plugins: [RevealHighlight, RevealNotes].filter(Boolean),
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

        console.log('Initializing Reveal instance...')
        await revealRef.current.initialize()
        console.log('Reveal.js initialized successfully')
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to initialize Reveal.js:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setIsLoading(false)
      }
    }

    // Add a longer delay to ensure component is fully mounted and DOM is ready
    const timer = setTimeout(loadReveal, 500)
    
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

  return (
    <>
      {/* Always render the reveal container for DOM reference */}
      <div className="reveal" ref={deckRef} style={{ display: error || isLoading ? 'none' : 'block' }}>
        <div className="slides">
          {slideshow.slides.map((slide, index) => (
            <SlideshowSlide key={index} slide={slide} />
          ))}
        </div>
      </div>

      {/* Show loading/error states as overlays */}
      {error && (
        <div className="flex items-center justify-center h-screen bg-red-100 text-red-800">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Error Loading Slideshow</h2>
            <p>{error}</p>
          </div>
        </div>
      )}

      {isLoading && !error && (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
            <p>Loading slideshow...</p>
          </div>
        </div>
      )}
    </>
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