'use client'

import { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Admin ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 max-w-2xl">
            <h2 className="text-lg font-semibold text-red-400 mb-2">Something went wrong</h2>
            <p className="text-red-300 mb-4">
              {this.state.error?.message || 'An unexpected error occurred in the admin panel.'}
            </p>
            <div className="flex gap-3">
              <a
                href="/admin"
                className="inline-block px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
              >
                Back to post list
              </a>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="inline-block px-4 py-2 rounded-lg bg-[var(--color-surface-tertiary)] hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] font-medium transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
