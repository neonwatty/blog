'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface MasonryGridProps {
  children: React.ReactNode[]
  columns?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: number
  className?: string
  animate?: boolean
}

export default function MasonryGrid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 20,
  className = '',
  animate = true
}: MasonryGridProps) {
  const [, setColumnHeights] = useState<number[]>([])
  const [itemPositions, setItemPositions] = useState<Array<{ x: number; y: number; opacity: number }>>([])
  const [containerHeight, setContainerHeight] = useState(0)
  const [currentColumns, setCurrentColumns] = useState(columns.desktop || 3)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Update columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width < 768) {
        setCurrentColumns(columns.mobile || 1)
      } else if (width < 1024) {
        setCurrentColumns(columns.tablet || 2)
      } else {
        setCurrentColumns(columns.desktop || 3)
      }
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [columns])

  // Calculate positions
  const calculatePositions = useCallback(() => {
    if (!containerRef.current || !itemRefs.current.length) return

    const containerWidth = containerRef.current.offsetWidth
    const columnWidth = (containerWidth - (gap * (currentColumns - 1))) / currentColumns
    
    // Initialize column heights
    const heights = new Array(currentColumns).fill(0)
    const positions: Array<{ x: number; y: number; opacity: number }> = []

    itemRefs.current.forEach((item, index) => {
      if (!item) return

      // Find the shortest column
      const shortestColumnIndex = heights.indexOf(Math.min(...heights))
      
      // Calculate position
      const x = shortestColumnIndex * (columnWidth + gap)
      const y = heights[shortestColumnIndex]
      
      // Get item height
      const itemHeight = item.offsetHeight

      // Store position
      positions[index] = { 
        x, 
        y, 
        opacity: animate && !isLoaded ? 0 : 1
      }

      // Update column height
      heights[shortestColumnIndex] += itemHeight + gap
    })

    setColumnHeights(heights)
    setItemPositions(positions)
    setContainerHeight(Math.max(...heights) - gap)
  }, [currentColumns, gap, animate, isLoaded])

  // Animate items in sequence
  useEffect(() => {
    if (animate && itemPositions.length > 0 && !isLoaded) {
      const animateItems = async () => {
        for (let i = 0; i < itemPositions.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 100))
          setItemPositions(prev => 
            prev.map((pos, index) => 
              index === i ? { ...pos, opacity: 1 } : pos
            )
          )
        }
        setIsLoaded(true)
      }
      animateItems()
    }
  }, [itemPositions.length, animate, isLoaded])

  // Recalculate on mount and when dependencies change
  useEffect(() => {
    const timer = setTimeout(calculatePositions, 100)
    return () => clearTimeout(timer)
  }, [calculatePositions])

  // Recalculate when images load
  useEffect(() => {
    const handleImageLoad = () => {
      setTimeout(calculatePositions, 10)
    }

    const images = containerRef.current?.querySelectorAll('img')
    images?.forEach(img => {
      if (img.complete) {
        handleImageLoad()
      } else {
        img.addEventListener('load', handleImageLoad, { once: true })
      }
    })

    return () => {
      images?.forEach(img => {
        img.removeEventListener('load', handleImageLoad)
      })
    }
  }, [calculatePositions])

  return (
    <div
      ref={containerRef}
      className={`masonry-grid ${className}`}
      style={{
        position: 'relative',
        height: containerHeight || 'auto',
        width: '100%'
      }}
    >
      {children.map((child, index) => (
        <div
          key={index}
          ref={(el: HTMLDivElement | null) => { itemRefs.current[index] = el }}
          className="masonry-item"
          style={{
            position: 'absolute',
            left: itemPositions[index]?.x || 0,
            top: itemPositions[index]?.y || 0,
            width: `calc((100% - ${gap * (currentColumns - 1)}px) / ${currentColumns})`,
            opacity: itemPositions[index]?.opacity || (animate ? 0 : 1),
            transform: animate && itemPositions[index]?.opacity === 0 
              ? 'translateY(20px) scale(0.9)' 
              : 'translateY(0) scale(1)',
            transition: animate 
              ? 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' 
              : 'none'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}