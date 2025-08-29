'use client'

import { useState, useEffect } from 'react'

interface ReadingProgressProps {
  target?: string
  variant?: 'linear' | 'circular'
  position?: 'top' | 'bottom'
  size?: 'thin' | 'normal' | 'thick'
  className?: string
  showPercentage?: boolean
}

export default function ReadingProgress({ 
  target = 'main', 
  variant = 'linear',
  position = 'top',
  size = 'normal',
  className = '',
  showPercentage = false
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let isInitialized = false
    let retryTimeout: NodeJS.Timeout | null = null

    const updateProgress = () => {
      const element = document.querySelector(target) as HTMLElement
      if (!element) return

      const rect = element.getBoundingClientRect()
      const winHeight = window.innerHeight
      const height = element.offsetHeight
      const winTop = -rect.top
      
      const totalHeight = height - winHeight
      const currentProgress = Math.min(Math.max(winTop / totalHeight, 0), 1)
      
      setProgress(currentProgress * 100)
    }

    // Wait for DOM to be ready
    const initializeProgress = () => {
      const element = document.querySelector(target)
      if (element && !isInitialized) {
        isInitialized = true
        updateProgress()
        // Add scroll listener only after element is found
        window.addEventListener('scroll', updateProgress, { passive: true })
        window.addEventListener('resize', updateProgress, { passive: true })
      } else if (!element && !isInitialized) {
        // Retry after a short delay if element not found
        retryTimeout = setTimeout(initializeProgress, 100)
      }
    }

    // Start initialization
    initializeProgress()

    return () => {
      if (retryTimeout) {
        clearTimeout(retryTimeout)
      }
      if (isInitialized) {
        window.removeEventListener('scroll', updateProgress)
        window.removeEventListener('resize', updateProgress)
      }
    }
  }, [target])

  const getVariantClasses = () => {
    let classes = 'reading-progress'
    
    if (variant === 'circular') {
      classes += ' circular'
    } else {
      if (position === 'bottom') classes += ' bottom'
      if (size === 'thin') classes += ' thin'
      if (size === 'thick') classes += ' thick'
    }
    
    return classes
  }

  if (variant === 'circular') {
    return (
      <div 
        className={`${getVariantClasses()} ${className}`}
        style={{ '--progress': `${(progress * 3.6)}deg` } as React.CSSProperties}
      >
        <div className="reading-progress-bar">
          {showPercentage && (
            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary">
              {Math.round(progress)}%
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`${getVariantClasses()} ${className}`}>
      <div 
        className="reading-progress-bar"
        style={{ 
          transform: `scaleX(${progress / 100})`,
        }}
      />
      {showPercentage && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-medium text-primary bg-surface-primary px-2 py-1 rounded-full">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  )
}