'use client'

import { useEffect, useRef, useState } from 'react'
import { SlideShow, Slide } from '@/lib/slides'

// Import Reveal.js
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Reveal: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RevealHighlight: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RevealNotes: any
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

    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`)
        if (existing) {
          resolve()
          return
        }
        
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
        document.head.appendChild(script)
      })
    }

    const loadReveal = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Load CSS files first
        await Promise.all([
          loadCSS('/reveal.js/reveal.css'),
          loadCSS(`/reveal.js/theme/${theme}.css`),
          loadCSS('/reveal.js/plugin/highlight/monokai.css')
        ])
        
        // Load JavaScript files
        await loadScript('/reveal.js/reveal.js')
        await loadScript('/reveal.js/plugin/highlight/highlight.js')
        await loadScript('/reveal.js/plugin/notes/notes.js')
        
        // Small delay to ensure scripts are loaded
        await new Promise(resolve => setTimeout(resolve, 200))
        
        const Reveal = window.Reveal
        const RevealHighlight = window.RevealHighlight
        const RevealNotes = window.RevealNotes
        
        if (!deckRef.current || !Reveal) {
          throw new Error('Reveal.js or deck reference not available')
        }
        
        // Clean up any existing instance
        if (revealRef.current) {
          try {
            revealRef.current.destroy()
          } catch (e) {
            console.warn('Error destroying previous instance:', e)
          }
        }
        
        // Create new Reveal instance with responsive configuration
        revealRef.current = new Reveal(deckRef.current, {
          plugins: [RevealHighlight, RevealNotes].filter(Boolean),
          hash: false,
          history: false,
          controls: true,
          progress: true,
          center: true,
          transition: 'none',
          embedded: true,
          touch: true, // Enable touch for mobile
          mouseWheel: false,
          // Base dimensions - Reveal.js will scale to fit container
          width: 960,
          height: 700,
          // Enable responsive scaling
          minScale: 0.2,
          maxScale: 1.5,
          margin: 0.04, // Add small margin for mobile
          // Responsive view settings
          disableLayout: false,
        })
        
        await revealRef.current.initialize()
        
        // Additional delay and layout refresh to fix vertical text issue
        await new Promise(resolve => setTimeout(resolve, 100))
        if (revealRef.current && revealRef.current.layout) {
          revealRef.current.layout()
        }
        
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to load slideshow:', err)
        const error = err instanceof Error ? err : new Error('Unknown error occurred')
        setError(error.message)
        setIsLoading(false)
      }
    }

    // Re-enable reveal.js with minimal config
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
    <div data-testid="slideshow-wrapper" className={`theme-${theme} w-full`} id={`slideshow-${slideshow.id}`}>
      {/* Always render the reveal container for DOM reference */}
      <div
        className="reveal w-full max-w-[960px] mx-auto"
        ref={deckRef}
        style={{
          display: error || isLoading ? 'none' : 'block',
          textAlign: 'center',
          aspectRatio: '960 / 700',
          maxHeight: '100vh',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div className="slides">
          {slideshow.slides.map((slide, index) => (
            <SlideshowSlide key={index} slide={slide} />
          ))}
        </div>
      </div>

      {/* Show loading/error states as overlays */}
      {error && (
        <div className="flex items-center justify-center w-full max-w-[960px] mx-auto bg-red-100 text-red-800 px-4 py-8"
             style={{ aspectRatio: '960 / 700', maxHeight: '100vh' }}>
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Error Loading Slideshow</h2>
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        </div>
      )}

      {isLoading && !error && (
        <div className="flex items-center justify-center w-full max-w-[960px] mx-auto bg-gray-900 text-white px-4 py-8"
             style={{ aspectRatio: '960 / 700', maxHeight: '100vh' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-white mb-4 mx-auto"></div>
            <p className="text-sm sm:text-base">Loading slideshow...</p>
          </div>
        </div>
      )}
      
      {/* Debug info - remove this later */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black/80 text-white p-2 text-xs font-mono z-50">
          Loading: {isLoading ? 'true' : 'false'}<br/>
          Error: {error ? 'true' : 'false'}<br/>
          Theme: {theme}
        </div>
      )}
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
        <h1 style={{ 
          fontSize: '2.5em', 
          marginBottom: '0.5em',
          lineHeight: '1.2',
          textAlign: 'center',
          wordWrap: 'break-word',
          maxWidth: '90%',
          margin: '0 auto 0.5em auto',
          whiteSpace: 'normal',
          wordBreak: 'normal',
          display: 'block',
          width: 'auto'
        }}>
          {slide.title}
        </h1>
        {slide.content && (
          <p style={{ 
            fontSize: '1.2em', 
            color: '#ccc',
            lineHeight: '1.4',
            textAlign: 'center',
            maxWidth: '80%',
            margin: '0 auto'
          }}>
            {slide.content}
          </p>
        )}
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
        {slide.title && <h2 style={{ marginBottom: '1em', textAlign: 'center' }}>{slide.title}</h2>}
        {slide.image && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%'
          }}>
            {slide.image.caption && (
              <p style={{ 
                fontSize: '1em', 
                color: '#ccc', 
                marginBottom: '1.5em',
                textAlign: 'center',
                maxWidth: '80%'
              }}>
                {slide.image.caption}
              </p>
            )}
            <img 
              src={slide.image.src} 
              alt={slide.image.alt}
              style={{ 
                maxWidth: '80%', 
                maxHeight: '50vh', 
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto'
              }}
            />
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
  // First preserve existing HTML links (already formatted)
  let processedContent = content
  
  // Convert markdown-style links to HTML
  processedContent = processedContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: #6366F1; text-decoration: underline;">$1</a>')
  
  // Convert markdown-style lists to HTML
  processedContent = processedContent
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/g, '<ul style="text-align: left; margin: 1em 0;">$1</ul>')
    // Convert bold text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Convert italic text (but not if it's part of a bold marker)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    // Convert inline code
    .replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace;">$1</code>')
    
  // Convert paragraphs
  return processedContent
    .split('\n\n')
    .filter(para => para.trim())
    .map(para => `<p style="margin-bottom: 1em;">${para.trim()}</p>`)
    .join('')
}