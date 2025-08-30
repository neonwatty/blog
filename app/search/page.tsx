import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search through blog posts.',
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Search</h1>
          
          <div className="mb-8">
            <input
              type="search"
              placeholder="Search posts..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          
          <p className="text-gray-600">
            Enter keywords to search through all blog posts.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}