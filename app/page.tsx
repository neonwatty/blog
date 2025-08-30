import { getSortedPostsData } from '@/lib/posts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { format } from 'date-fns'

export default function Home() {
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
    <div className="min-h-screen flex flex-col transition-all duration-300"
         style={{ background: 'var(--color-background-primary)' }}>
      <Header />
      
      <main className="flex-grow">
        {/* Enhanced hero section */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-20">
            <h1 className="text-5xl font-extrabold mb-6 transition-all duration-300"
                style={{ 
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.04em',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
              Archive of all blog posts
            </h1>
            <div className="w-24 h-px mx-auto mb-8 transition-all duration-300"
                 style={{ background: 'var(--gradient-professional)', boxShadow: 'var(--shadow-professional)' }}></div>
            <p className="text-xl font-medium transition-all duration-300"
               style={{ 
                 color: 'var(--color-text-secondary)',
                 letterSpacing: '-0.01em'
               }}>
              iOS, Swift, web development, and open source insights.
            </p>
          </div>

          {/* Posts grouped by year */}
          <div className="space-y-16">
            {sortedYears.map((year, yearIndex) => (
              <div key={year} 
                   className="animate-in slide-in-from-bottom-4 transition-all duration-500"
                   style={{ animationDelay: `${yearIndex * 100}ms` }}>
                <div className="flex items-center mb-10">
                  <h2 className="text-4xl font-bold transition-all duration-300"
                      style={{ 
                        color: 'var(--color-text-primary)',
                        letterSpacing: '-0.03em'
                      }}>
                    {year}
                  </h2>
                  <div className="flex-grow h-px ml-8 transition-all duration-300"
                       style={{ background: 'var(--gradient-hero)', boxShadow: 'var(--shadow-professional)' }}></div>
                </div>
                
                <div className="space-y-10">
                  {postsByYear[year].map((post, postIndex) => (
                    <article key={post.id} 
                             className="group transition-all duration-300 hover:transform hover:scale-[1.01]"
                             style={{
                               borderBottom: `1px solid var(--color-border-subtle)`,
                               paddingBottom: '2rem',
                               animationDelay: `${(yearIndex * 100) + (postIndex * 50)}ms`
                             }}>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-8">
                        {/* Date column */}
                        <div className="flex-shrink-0 mb-3 sm:mb-0 sm:w-28">
                          <time 
                            dateTime={post.date}
                            className="text-sm font-semibold transition-all duration-300 block"
                            style={{ 
                              color: 'var(--color-text-tertiary)',
                              letterSpacing: '0.05em'
                            }}
                          >
                            {format(new Date(post.date), 'MMM d')}
                          </time>
                        </div>

                        {/* Content column */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-grow pr-6">
                              <h3 className="text-xl font-bold mb-3 transition-all duration-300 group-hover:translate-x-1">
                                <Link 
                                  href={`/posts/${post.id}`}
                                  className="relative transition-all duration-300"
                                  style={{ 
                                    color: 'var(--color-text-primary)',
                                    letterSpacing: '-0.02em'
                                  }}
                                >
                                  {post.title}
                                </Link>
                              </h3>
                              <p className="text-base leading-relaxed mb-4 transition-all duration-300"
                                 style={{ 
                                   color: 'var(--color-text-secondary)',
                                   lineHeight: '1.7'
                                 }}>
                                {post.excerpt}
                              </p>
                              
                              {/* Enhanced Meta info */}
                              <div className="flex items-center text-sm space-x-6 transition-all duration-300"
                                   style={{ color: 'var(--color-text-tertiary)' }}>
                                <span className="font-medium">{post.readingTime}</span>
                                {post.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {post.tags.slice(0, 3).map((tag) => (
                                      <Link
                                        key={tag}
                                        href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                                        className="tag-badge focus-indigo"
                                      >
                                        {tag}
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