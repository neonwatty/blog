'use client'

import { useEffect, useCallback } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface VideoModalProps {
  youtubeId: string
  isOpen: boolean
  onClose: () => void
  isVertical?: boolean
}

export default function VideoModal({ youtubeId, isOpen, onClose, isVertical = false }: VideoModalProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, handleEscape])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/90" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
        aria-label="Close video"
      >
        <XMarkIcon className="w-8 h-8" />
      </button>

      {/* Video container - vertical for shorts, horizontal for regular videos */}
      <div
        className={`relative mx-4 ${
          isVertical
            ? 'w-full max-w-sm aspect-[9/16] max-h-[85vh]'
            : 'w-full max-w-4xl aspect-video'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-lg"
        />
      </div>
    </div>
  )
}
