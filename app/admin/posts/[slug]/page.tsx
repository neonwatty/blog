import { notFound } from 'next/navigation'
import { getPostData } from '@/lib/posts'
import { format } from 'date-fns'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface PreviewPageProps {
  params: Promise<{ slug: string }>
}

export default async function AdminPreviewPage({ params }: PreviewPageProps) {
  // Dev-only gate
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }

  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy')

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'transparent' }}>
      {/* Admin toolbar */}
      <div className="sticky top-0 z-50 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <span className="text-sm text-[var(--color-text-secondary)]">Preview</span>
            <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400 font-medium">
              Dev Only
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/posts/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              View live
            </Link>
            <Link
              href={`/admin/edit/${slug}`}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>

      <Header />

      <main className="flex-grow">
        <article className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Article Header */}
          <header className="mb-8 sm:mb-12 md:mb-16">
            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight transition-all duration-300"
              style={{
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.04em',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              }}
            >
              {post.title}
            </h1>

            {/* Divider */}
            <div
              className="w-16 sm:w-20 md:w-24 h-px mb-4 sm:mb-6 md:mb-8 transition-all duration-300"
              style={{ background: 'var(--gradient-subtle)' }}
            ></div>

            {/* Meta info */}
            <div
              className="flex flex-col sm:flex-row sm:items-center text-sm sm:text-base mb-4 sm:mb-6 md:mb-8 transition-all duration-300 gap-2 sm:gap-0 sm:space-x-8"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <time dateTime={post.date} className="font-medium">
                {formattedDate}
              </time>
              <span className="font-medium">{post.readingTime}</span>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-0">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-badge"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Article Content */}
          <div
            className="prose prose-base sm:prose-lg md:prose-xl max-w-none mb-10 sm:mb-16 md:mb-20 prose-content"
            style={{
              color: 'var(--color-text-secondary)',
              lineHeight: '1.75',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
