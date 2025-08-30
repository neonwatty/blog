import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search through blog posts.',
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">Search</h1>
          
          <div className="mb-8">
            <input
              type="search"
              placeholder="Search posts..."
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors"
            />
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 transition-colors">
            Enter keywords to search through all blog posts.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}