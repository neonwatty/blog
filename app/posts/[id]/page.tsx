import { notFound } from 'next/navigation'
import { getPostData, getAllPostIds } from '@/lib/posts'
import { format } from 'date-fns'
import StructuredData from '@/components/StructuredData'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{
    id: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params
  const post = await getPostData(id)
  
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'

  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author || 'Blog Author' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Blog Author'],
      tags: post.tags,
      images: post.image ? [`${siteUrl}${post.image}`] : [`${siteUrl}/images/og-image.jpg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [`${siteUrl}${post.image}`] : [`${siteUrl}/images/og-image.jpg`],
      creator: '@neonwatty',
    },
    alternates: {
      canonical: post.canonicalUrl || `${siteUrl}/posts/${post.id}`
    }
  }
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((path) => ({
    id: path.params.id
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params
  const post = await getPostData(id)
  
  if (!post) {
    notFound()
  }

  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy')

  return (
    <>
      <StructuredData post={post} type="article" />
      
      <div className="min-h-screen flex flex-col transition-all duration-300"
           style={{ backgroundColor: 'transparent' }}>
        <Header />
        
        <main className="flex-grow">
          <article className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
            {/* Breadcrumbs */}
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/posts' },
                { label: post.title }
              ]} 
            />
            
            {/* Article Header */}
            <header className="mb-8 sm:mb-12 md:mb-16">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight transition-all duration-300"
                  style={{
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.04em',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                  }}>
                {post.title}
              </h1>

              {/* Dev-only edit button */}
              {process.env.NODE_ENV === 'development' && (
                <Link
                  href={`/admin/edit/${id}`}
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors font-medium mb-4"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Edit
                </Link>
              )}

              {/* Divider */}
              <div className="w-16 sm:w-20 md:w-24 h-px mb-4 sm:mb-6 md:mb-8 transition-all duration-300"
                   style={{ background: 'var(--gradient-subtle)' }}></div>

              {/* Meta info */}
              <div className="flex flex-col sm:flex-row sm:items-center text-sm sm:text-base mb-4 sm:mb-6 md:mb-8 transition-all duration-300 gap-2 sm:gap-0 sm:space-x-8"
                   style={{ color: 'var(--color-text-secondary)' }}>
                <time dateTime={post.date} className="font-medium">
                  {formattedDate}
                </time>
                <span className="font-medium">{post.readingTime}</span>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-0">
                    {post.tags.map((tag) => (
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
            </header>

            {/* Article Content */}
            <div className="prose prose-base sm:prose-lg md:prose-xl max-w-none mb-10 sm:mb-16 md:mb-20 prose-content"
                 style={{
                   color: 'var(--color-text-secondary)',
                   lineHeight: '1.75'
                 }}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

          </article>
        </main>

        <Footer />
      </div>
    </>
  )
}