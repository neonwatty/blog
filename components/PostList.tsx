import Link from 'next/link'
import { format } from 'date-fns'
import DevEditButton from '@/components/DevEditButton'
import { PostData } from '@/lib/posts'

interface PostListProps {
  posts: PostData[]
}

export default function PostList({ posts }: PostListProps) {
  // Group posts by year
  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    },
    {} as Record<number, PostData[]>,
  )

  const sortedYears = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="space-y-8 sm:space-y-12 md:space-y-16">
      {sortedYears.map((year, yearIndex) => (
        <div
          key={year}
          className="animate-in slide-in-from-bottom-4 transition-all duration-500"
          style={{ animationDelay: `${yearIndex * 100}ms` }}
        >
          <div className="flex items-center mb-6 sm:mb-8 md:mb-10">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold transition-all duration-300"
              style={{
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.03em',
              }}
            >
              {year}
            </h2>
            <div
              className="flex-grow h-px ml-4 sm:ml-6 md:ml-8 transition-all duration-300"
              style={{ background: 'var(--gradient-hero)', boxShadow: 'var(--shadow-professional)' }}
            ></div>
          </div>

          <div className="space-y-4 sm:space-y-8 md:space-y-10">
            {postsByYear[year].map((post, postIndex) => (
              <Link key={post.id} href={`/posts/${post.id}`} className="block">
                <article
                  className="group transition-all duration-300 hover:transform hover:scale-[1.01] p-4 sm:p-0 rounded-xl sm:rounded-none bg-indigo-500/[0.08] sm:bg-transparent border border-indigo-500/20 sm:border-0 sm:border-b sm:border-b-gray-800 sm:pb-5 backdrop-blur-sm sm:backdrop-blur-none shadow-md shadow-indigo-500/10 sm:shadow-none"
                  style={{
                    animationDelay: `${yearIndex * 100 + postIndex * 50}ms`,
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6 md:space-x-8">
                    {/* Date column */}
                    <div className="flex-shrink-0 mb-2 sm:mb-0 sm:w-24 md:w-28">
                      <time
                        dateTime={post.date}
                        className="text-xs sm:text-sm font-semibold transition-all duration-300 block"
                        style={{
                          color: 'var(--color-text-tertiary)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {format(new Date(post.date), 'MMM d')}
                      </time>
                    </div>

                    {/* Content column */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-grow pr-2 sm:pr-4 md:pr-6">
                          <h3
                            className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 transition-all duration-300 group-hover:translate-x-1 flex items-center gap-2"
                            style={{
                              color: 'var(--color-text-primary)',
                              letterSpacing: '-0.02em',
                            }}
                          >
                            {post.title}
                            <DevEditButton href={`/admin/edit/${post.id}`} />
                          </h3>
                          <p
                            className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 transition-all duration-300"
                            style={{
                              color: 'var(--color-text-secondary)',
                              lineHeight: '1.7',
                            }}
                          >
                            {post.excerpt}
                          </p>

                          {/* Enhanced Meta info */}
                          <div
                            className="flex flex-wrap items-center text-xs sm:text-sm gap-2 sm:gap-4 md:gap-6 transition-all duration-300"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            <span className="font-medium">{post.readingTime}</span>
                            {post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {post.tags.slice(0, 2).map((tag) => (
                                  <span key={tag} className="tag-badge text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Thumbnail - hidden on very small screens */}
                        {post.image && (
                          <div className="hidden sm:block flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ml-2 sm:ml-4">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
