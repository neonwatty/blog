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
          <div className="mb-20">
            {/* Profile section with side-by-side layout */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 rounded-2xl transition-all duration-300"
                 style={{
                   background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(99, 102, 241, 0.1))',
                   border: '1px solid rgba(79, 70, 229, 0.2)',
                   boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.1), 0 4px 6px -2px rgba(79, 70, 229, 0.05)'
                 }}>
              
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img 
                  src="https://neonwatty.com/assets/images/image01.jpg?v=865be4d0"
                  alt="Jeremy Watt"
                  className="w-40 h-40 rounded-full object-cover border-4 border-white/20 shadow-xl transition-all duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex-grow text-center md:text-left">
                <div className="mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight"
                      style={{ color: 'var(--color-text-primary)' }}>
                    Hi, I'm Jeremy
                  </h1>
                  <div className="w-16 h-1 bg-violet-500 mx-auto md:mx-0 rounded-full"></div>
                </div>
                
                <p className="text-xl leading-relaxed mb-6 max-w-2xl"
                   style={{ color: 'var(--color-text-secondary)' }}>
                  I'm an AI Engineer, HVAC certified technician, and Religious Studies BA.
                </p>

                {/* Social links */}
                <div className="flex justify-center md:justify-start gap-4"
                     style={{ color: 'var(--color-text-tertiary)' }}>
                  <a href="https://github.com/neonwatty" target="_blank" rel="noopener noreferrer" 
                     className="hover:opacity-70 transition-opacity">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://x.com/neonwatty" target="_blank" rel="noopener noreferrer"
                     className="hover:opacity-70 transition-opacity">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/jeremy-watt/" target="_blank" rel="noopener noreferrer"
                     className="hover:opacity-70 transition-opacity">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
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