import { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import { getSortedProjectUpdates } from '@/lib/project-updates'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'

export const metadata: Metadata = {
  title: 'Project Updates',
  description: 'Follow along with progress updates on my side projects, tools, and experiments.',
  openGraph: {
    title: 'Project Updates | Jeremy Watt\'s Blog',
    description: 'Follow along with progress updates on my side projects, tools, and experiments.',
    type: 'website',
    url: `${siteUrl}/project-updates`,
    images: [`${siteUrl}/images/og-image.jpg`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Updates',
    description: 'Follow along with progress updates on my side projects, tools, and experiments.',
    images: [`${siteUrl}/images/og-image.jpg`],
    creator: '@neonwatty',
  },
}

export default function ProjectUpdatesPage() {
  const allUpdates = getSortedProjectUpdates()

  // Group updates by year
  const updatesByYear = allUpdates.reduce((acc, update) => {
    const year = new Date(update.date).getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(update)
    return acc
  }, {} as Record<number, typeof allUpdates>)

  const sortedYears = Object.keys(updatesByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <>
      <StructuredData type="website" />

      <div className="min-h-screen flex flex-col transition-colors" style={{ backgroundColor: 'transparent' }}>
        <Header />

        <main className="flex-grow">
          <section className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
            {/* Hero Section */}
            <div className="mb-10 sm:mb-14 md:mb-20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}>
                Project Updates
              </h1>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl"
                 style={{ color: 'var(--color-text-secondary)' }}>
                Progress updates, learnings, and milestones from my side projects.
              </p>
            </div>

            {/* Updates grouped by year */}
            {sortedYears.length > 0 ? (
              <div className="space-y-8 sm:space-y-12 md:space-y-16">
                {sortedYears.map((year, yearIndex) => (
                  <div key={year}
                       className="animate-in slide-in-from-bottom-4 transition-all duration-500"
                       style={{ animationDelay: `${yearIndex * 100}ms` }}>
                    <div className="flex items-center mb-6 sm:mb-8 md:mb-10">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold transition-all duration-300"
                          style={{
                            color: 'var(--color-text-primary)',
                            letterSpacing: '-0.03em'
                          }}>
                        {year}
                      </h2>
                      <div className="flex-grow h-px ml-4 sm:ml-6 md:ml-8 transition-all duration-300"
                           style={{ background: 'var(--gradient-hero)', boxShadow: 'var(--shadow-professional)' }}></div>
                    </div>

                    <div className="space-y-4 sm:space-y-8 md:space-y-10">
                      {updatesByYear[year].map((update, updateIndex) => {
                        return (
                          <Link key={update.id} href={`/project-updates/${update.id}`} className="block">
                            <article
                              className="group transition-all duration-300 hover:transform hover:scale-[1.01] p-4 sm:p-0 rounded-xl sm:rounded-none bg-indigo-500/[0.08] sm:bg-transparent border border-indigo-500/20 sm:border-0 sm:border-b sm:border-b-gray-800 sm:pb-5 backdrop-blur-sm sm:backdrop-blur-none shadow-md shadow-indigo-500/10 sm:shadow-none"
                              style={{
                                animationDelay: `${(yearIndex * 100) + (updateIndex * 50)}ms`
                              }}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6 md:space-x-8">
                                {/* Date column */}
                                <div className="flex-shrink-0 mb-2 sm:mb-0 sm:w-24 md:w-28">
                                  <time
                                    dateTime={update.date}
                                    className="text-xs sm:text-sm font-semibold transition-all duration-300 block"
                                    style={{
                                      color: 'var(--color-text-tertiary)',
                                      letterSpacing: '0.05em'
                                    }}
                                  >
                                    {format(new Date(update.date), 'MMM d')}
                                  </time>
                                </div>

                                {/* Content column */}
                                <div className="flex-grow min-w-0">
                                  <div className="flex-grow pr-2 sm:pr-4 md:pr-6">
                                    {/* Project Badge */}
                                    {update.projectTitle && (
                                      <div className="mb-2">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                                          {update.projectTitle}
                                        </span>
                                      </div>
                                    )}

                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 transition-all duration-300 group-hover:translate-x-1"
                                        style={{
                                          color: 'var(--color-text-primary)',
                                          letterSpacing: '-0.02em'
                                        }}>
                                      {update.title}
                                    </h3>
                                    <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 transition-all duration-300"
                                       style={{
                                         color: 'var(--color-text-secondary)',
                                         lineHeight: '1.7'
                                       }}>
                                      {update.excerpt}
                                    </p>

                                    {/* Meta info */}
                                    <div className="flex flex-wrap items-center text-xs sm:text-sm gap-2 sm:gap-4 md:gap-6 transition-all duration-300"
                                         style={{ color: 'var(--color-text-tertiary)' }}>
                                      <span className="font-medium">{update.readingTime}</span>
                                      {update.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                          {update.tags.slice(0, 2).map((tag) => (
                                            <span
                                              key={tag}
                                              className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400"
                                            >
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </article>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16 md:py-20">
                <p className="text-lg sm:text-xl mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  No project updates yet.
                </p>
                <p className="text-sm sm:text-base" style={{ color: 'var(--color-text-tertiary)' }}>
                  Check back soon for updates on my projects!
                </p>
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
