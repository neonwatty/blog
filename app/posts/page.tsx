import { getSortedPostsData } from '@/lib/posts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { format } from 'date-fns'

export default function PostsPage() {
  const allPostsData = getSortedPostsData()
  
  // Group posts by year
  const postsByYear = allPostsData.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {} as Record<number, typeof allPostsData>)

  const sortedYears = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Posts</h1>
            <p className="text-lg text-gray-600">
              All blog posts, organized chronologically.
            </p>
          </div>

          {/* Posts grouped by year */}
          <div className="space-y-12">
            {sortedYears.map((year) => (
              <div key={year}>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">{year}</h2>
                <div className="space-y-8">
                  {postsByYear[year].map((post) => (
                    <article key={post.id} className="border-b border-gray-100 pb-8 last:border-b-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6">
                        {/* Date column */}
                        <div className="flex-shrink-0 mb-2 sm:mb-0 sm:w-24">
                          <time 
                            dateTime={post.date}
                            className="text-sm text-gray-500 font-medium"
                          >
                            {format(new Date(post.date), 'MMM d')}
                          </time>
                        </div>

                        {/* Content column */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-grow pr-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                <Link 
                                  href={`/posts/${post.id}`}
                                  className="hover:text-gray-600 transition-colors"
                                >
                                  {post.title}
                                </Link>
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                {post.excerpt}
                              </p>
                              
                              {/* Meta info */}
                              <div className="flex items-center text-xs text-gray-500 space-x-4">
                                <span>{post.readingTime}</span>
                                {post.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {post.tags.slice(0, 3).map((tag) => (
                                      <Link
                                        key={tag}
                                        href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                                        className="hover:text-gray-700"
                                      >
                                        #{tag}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Thumbnail - optional */}
                            {post.image && (
                              <div className="flex-shrink-0 w-16 h-16 ml-4">
                                <img
                                  src={post.image}
                                  alt={post.title}
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}