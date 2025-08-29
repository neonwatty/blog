'use client'

import { useState, useEffect } from 'react'

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  className?: string
  maxLevel?: number
  activeClassName?: string
}

export default function TableOfContents({
  className = '',
  maxLevel = 3,
  activeClassName = 'text-brand font-medium'
}: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from the document
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const tocItems: TocItem[] = []

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.substring(1))
      if (level <= maxLevel) {
        // Create ID if it doesn't exist
        let id = heading.id
        if (!id) {
          id = heading.textContent?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || `heading-${index}`
          heading.id = id
        }

        tocItems.push({
          id,
          title: heading.textContent || '',
          level
        })
      }
    })

    setToc(tocItems)
  }, [maxLevel])

  useEffect(() => {
    // Track which heading is currently in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0
      }
    )

    toc.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [toc])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80 // Account for sticky header
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  if (toc.length === 0) {
    return null
  }

  return (
    <nav className={`table-of-contents ${className}`}>
      <h3 className="heading-md mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {toc.map(({ id, title, level }) => (
          <li key={id}>
            <button
              onClick={() => scrollToHeading(id)}
              className={`
                block text-left w-full px-3 py-2 rounded-lg text-sm transition-all duration-200
                hover:bg-surface-secondary hover:translate-x-1
                ${activeId === id ? activeClassName : 'text-secondary hover:text-primary'}
                ${level === 2 ? 'ml-4' : ''}
                ${level === 3 ? 'ml-8' : ''}
                ${level === 4 ? 'ml-12' : ''}
                ${level === 5 ? 'ml-16' : ''}
                ${level === 6 ? 'ml-20' : ''}
              `}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}