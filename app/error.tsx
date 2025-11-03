'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error boundary caught:', error)
  }, [error])

  return (
    <html>
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Error - Something went wrong</title>
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-grow flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="mb-8">
                <h1 className="text-6xl font-bold text-red-600 dark:text-red-500 mb-4">
                  Oops!
                </h1>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Something went wrong
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  We encountered an unexpected error. Don't worry, our team has been notified.
                </p>

                {process.env.NODE_ENV === 'development' && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-left">
                    <p className="text-sm font-mono text-red-800 dark:text-red-300 break-all">
                      {error.message}
                    </p>
                    {error.digest && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                        Error ID: {error.digest}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={reset}
                  className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Try again
                </button>

                <Link
                  href="/"
                  className="inline-block w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Go back home
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  If this problem persists, please contact support.
                </p>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}
