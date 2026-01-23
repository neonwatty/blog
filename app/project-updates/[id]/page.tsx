import { notFound } from 'next/navigation'
import { getProjectUpdateData, getAllProjectUpdateIds } from '@/lib/project-updates'
import { getProjectById } from '@/lib/projects'
import { format } from 'date-fns'
import StructuredData from '@/components/StructuredData'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { Metadata } from 'next'

interface ProjectUpdatePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ProjectUpdatePageProps): Promise<Metadata> {
  const { id } = await params
  const update = await getProjectUpdateData(id)

  if (!update) {
    return {
      title: 'Update Not Found'
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'

  return {
    title: `${update.title} | Project Updates`,
    description: update.excerpt,
    keywords: update.tags.join(', '),
    openGraph: {
      title: update.title,
      description: update.excerpt,
      type: 'article',
      publishedTime: update.date,
      tags: update.tags,
      images: [`${siteUrl}/images/og-image.jpg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: update.title,
      description: update.excerpt,
      images: [`${siteUrl}/images/og-image.jpg`],
      creator: '@neonwatty',
    },
    alternates: {
      canonical: `${siteUrl}/project-updates/${update.id}`
    }
  }
}

export async function generateStaticParams() {
  const paths = getAllProjectUpdateIds()
  return paths.map((path) => ({
    id: path.params.id
  }))
}

export default async function ProjectUpdatePage({ params }: ProjectUpdatePageProps) {
  const { id } = await params
  const update = await getProjectUpdateData(id)

  if (!update) {
    notFound()
  }

  const project = getProjectById(update.projectId)
  const formattedDate = format(new Date(update.date), 'MMMM d, yyyy')

  return (
    <>
      <StructuredData type="article" />

      <div className="min-h-screen flex flex-col transition-all duration-300"
           style={{ backgroundColor: 'transparent' }}>
        <Header />

        <main className="flex-grow">
          <article className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Project Updates', href: '/project-updates' },
                { label: update.title }
              ]}
            />

            {/* Article Header */}
            <header className="mb-8 sm:mb-12 md:mb-16">
              {/* Project Badge */}
              {update.projectTitle && (
                <div className="mb-4">
                  {project ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
                    >
                      {update.projectTitle}
                      <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      {update.projectTitle}
                    </span>
                  )}
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight transition-all duration-300"
                  style={{
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.04em',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                  }}>
                {update.title}
              </h1>

              {/* Divider */}
              <div className="w-16 sm:w-20 md:w-24 h-px mb-4 sm:mb-6 md:mb-8 transition-all duration-300"
                   style={{ background: 'var(--gradient-subtle)' }}></div>

              {/* Meta info */}
              <div className="flex flex-col sm:flex-row sm:items-center text-sm sm:text-base mb-4 sm:mb-6 md:mb-8 transition-all duration-300 gap-2 sm:gap-0 sm:space-x-8"
                   style={{ color: 'var(--color-text-secondary)' }}>
                <time dateTime={update.date} className="font-medium">
                  {formattedDate}
                </time>
                <span className="font-medium">{update.readingTime}</span>
                {update.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-0">
                    {update.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-base sm:prose-lg md:prose-xl max-w-none mb-10 sm:mb-16 md:mb-20 prose-content"
                 style={{
                   color: 'var(--color-text-secondary)',
                   lineHeight: '1.75'
                 }}>
              <div dangerouslySetInnerHTML={{ __html: update.content }} />
            </div>

            {/* Back link */}
            <div className="pt-8 border-t border-gray-200/20 dark:border-gray-700/30">
              <Link
                href="/project-updates"
                className="inline-flex items-center text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 font-medium transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
                </svg>
                All Project Updates
              </Link>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  )
}
