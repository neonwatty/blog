'use client'

import { useState, useRef, useEffect } from 'react'

type CalloutType = 'info' | 'success' | 'warning' | 'error' | 'tip' | 'note'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
  icon?: React.ReactNode
  collapsible?: boolean
  defaultCollapsed?: boolean
  className?: string
  animate?: boolean
}

const calloutIcons: Record<CalloutType, React.ReactNode> = {
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  tip: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  note: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  ),
}

export default function Callout({
  type = 'info',
  title,
  children,
  icon,
  collapsible = false,
  defaultCollapsed = false,
  className = '',
  animate = true
}: CalloutProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const [isVisible, setIsVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const calloutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (animate && calloutRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(calloutRef.current)
      return () => observer.disconnect()
    } else {
      setIsVisible(true)
    }
  }, [animate])

  const toggleCollapsed = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed)
    }
  }

  const displayIcon = icon || calloutIcons[type]

  return (
    <div
      ref={calloutRef}
      className={`
        callout callout-${type}
        ${animate ? (isVisible ? 'callout-animate-in' : 'callout-animate-out') : ''}
        ${className}
      `}
    >
      <div 
        className={`callout-header ${collapsible ? 'cursor-pointer' : ''}`}
        onClick={toggleCollapsed}
      >
        <div className="callout-icon-wrapper">
          {displayIcon}
        </div>
        
        {title && (
          <h4 className="callout-title">
            {title}
          </h4>
        )}

        {collapsible && (
          <button className="callout-collapse-button ml-auto">
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isCollapsed ? 'rotate-0' : 'rotate-180'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      <div
        ref={contentRef}
        className={`callout-content ${
          collapsible && isCollapsed ? 'callout-content-collapsed' : 'callout-content-expanded'
        }`}
      >
        <div className="callout-content-inner">
          {children}
        </div>
      </div>
    </div>
  )
}