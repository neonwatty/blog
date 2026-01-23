import Link from 'next/link'
import { getAllSlideshows } from '@/lib/slides'
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Slideshows - Modern Blog',
  description: 'Interactive slide presentations of blog posts',
  openGraph: {
    title: 'Slideshows - Modern Blog',
    description: 'Interactive slide presentations of blog posts',
    type: 'website',
  },
}

export default function SlidesIndex() {
  const slideshows = getAllSlideshows()

  return (
    <div className="min-h-screen flex flex-col transition-all duration-300"
         style={{ backgroundColor: 'transparent' }}>
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Slideshows
          </h1>
        </div>

        {/* Slideshows Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {slideshows.map((slideshow) => (
            <div
              key={slideshow.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Slideshow Preview */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <div className="text-3xl font-bold mb-2">
                    {slideshow.metadata.totalSlides}
                  </div>
                  <div className="text-sm opacity-90">slides</div>
                </div>
              </div>

              {/* Slideshow Info */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                  {slideshow.title}
                </h2>
                
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {new Date(slideshow.metadata.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

                {/* Tags */}
                {slideshow.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {slideshow.metadata.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {slideshow.metadata.tags.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{slideshow.metadata.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    href={`/slides/${slideshow.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium"
                  >
                    View Slideshow
                  </Link>
                  <Link
                    href={`/posts/${slideshow.id}`}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-center py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium"
                  >
                    Read Post
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {slideshows.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📽️</div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
              No slideshows yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Generate slideshows manually from your blog posts using the CLI command:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 mb-6 text-left">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                npm run generate:slideshow &lt;post-id&gt;
              </code>
            </div>
            <Link
              href="/posts"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Blog Posts
            </Link>
          </div>
        )}
        </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}