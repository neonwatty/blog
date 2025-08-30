'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

// Global function to handle code copying
declare global {
  interface Window {
    copyCode: (button: HTMLButtonElement) => Promise<void>
  }
}

export default function CodeBlockClient() {
  useEffect(() => {
    // Define the global copyCode function
    window.copyCode = async (button: HTMLButtonElement) => {
      try {
        const encodedCode = button.getAttribute('data-code')
        if (!encodedCode) {
          throw new Error('No code data found')
        }

        const code = decodeURIComponent(encodedCode)
        await navigator.clipboard.writeText(code)
        
        // Visual feedback
        const originalHTML = button.innerHTML
        button.innerHTML = `
          <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        `
        
        setTimeout(() => {
          button.innerHTML = originalHTML
        }, 1500)

        toast.success('Code copied to clipboard!', {
          duration: 2000,
          style: {
            background: 'var(--color-background-primary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-primary)',
          },
        })
      } catch (err) {
        console.error('Failed to copy code:', err)
        toast.error('Failed to copy code', {
          duration: 2000,
          style: {
            background: 'var(--color-background-primary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-primary)',
          },
        })
      }
    }

    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).copyCode
      }
    }
  }, [])

  return null // This component doesn't render anything
}