import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import { getPopularTags, getAllTags } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Explore all topics and tags covered in our blog posts.',
}

export default function TagsPage() {
  const popularTags = getPopularTags(20)
  const allTags = getAllTags()

  return (
    <>
      <StructuredData type="website" />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main id="main-content" className="flex-grow">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Browse by Tags
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover content organized by topics and technologies. Click on any tag 
                to explore related posts.
              </p>
            </div>

            {/* Popular Tags Section */}
            {popularTags.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Popular Tags
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {popularTags.map(({ tag, count }) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                      className="group block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {tag}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {count} post{count !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* All Tags Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                All Tags
              </h2>
              <div className="flex flex-wrap gap-3">
                {allTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              
              {allTags.length === 0 && (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tags yet</h3>
                  <p className="text-gray-600 dark:text-gray-300">Tags will appear here once blog posts are published.</p>
                </div>
              )}
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}