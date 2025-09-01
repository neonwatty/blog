'use client'

import { useEffect, useRef } from 'react'
import Head from 'next/head'
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

export default function Slideshow({ slideshow, theme = 'default' }: SlideshowProps) {
  const deckRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const revealRef = useRef<any>(null)

  useEffect(() => {
    const loadReveal = async () => {
      // Dynamically import Reveal.js to avoid SSR issues
      const Reveal = (await import('reveal.js')).default
      
      // Import plugins
      const Markdown = (await import('reveal.js/plugin/markdown/markdown.esm.js')).default
      const Highlight = (await import('reveal.js/plugin/highlight/highlight.esm.js')).default
      const Notes = (await import('reveal.js/plugin/notes/notes.esm.js')).default

      if (deckRef.current) {
        revealRef.current = new Reveal(deckRef.current, {
          plugins: [Markdown, Highlight, Notes],
          hash: true,
          controls: true,
          progress: true,
          center: true,
          transition: 'slide',
          backgroundTransition: 'fade'
        })

        await revealRef.current.initialize()
      }
    }

    loadReveal()

    // Cleanup on unmount
    return () => {
      if (revealRef.current) {
        revealRef.current.destroy()
      }
    }
  }, [theme])

  return (
    <>
      <Head>
        {/* Load Reveal.js CSS */}
        <link rel="stylesheet" href="/reveal.js/dist/reveal.css" />
        <link rel="stylesheet" href={`/reveal.js/dist/theme/${theme}.css`} />
        <link rel="stylesheet" href="/reveal.js/plugin/highlight/monokai.css" />
      </Head>

      <div className="reveal" ref={deckRef}>
        <div className="slides">
          {slideshow.slides.map((slide, index) => (
            <SlideshowSlide key={index} slide={slide} />
          ))}
        </div>
      </div>
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
        <h1>{slide.title}</h1>
        {slide.content && <p className="text-lg">{slide.content}</p>}
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
        {slide.title && <h2>{slide.title}</h2>}
        <pre>
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
        {slide.title && <h2>{slide.title}</h2>}
        {slide.image && (
          <div>
            <img 
              src={slide.image.src} 
              alt={slide.image.alt}
              className="max-w-full max-h-96 mx-auto"
            />
            {slide.image.caption && (
              <p className="text-sm text-gray-600 mt-2">{slide.image.caption}</p>
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
      {slide.title && <h2>{slide.title}</h2>}
      {slide.content && (
        <div 
          className="prose max-w-none"
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
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
    // Convert bold text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Convert italic text
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Convert line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/, '<p>$1</p>')
}