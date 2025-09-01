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
      images: post.image ? [`${siteUrl}${post.image}`] : [`${siteUrl}/images/default-og.jpg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [`${siteUrl}${post.image}`] : [`${siteUrl}/images/default-og.jpg`],
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
           style={{ background: 'var(--color-background-primary)' }}>
        <Header />
        
        <main className="flex-grow">
          <article className="max-w-4xl mx-auto px-4 py-20">
            {/* Breadcrumbs */}
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/posts' },
                { label: post.title }
              ]} 
            />
            
            {/* Article Header */}
            <header className="mb-16">
              {/* Title */}
              <h1 className="text-5xl font-extrabold mb-6 leading-tight transition-all duration-300"
                  style={{ 
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.04em',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                  }}>
                {post.title}
              </h1>

              {/* Divider */}
              <div className="w-24 h-px mb-8 transition-all duration-300"
                   style={{ background: 'var(--gradient-subtle)' }}></div>

              {/* Meta info */}
              <div className="flex items-center text-base mb-8 transition-all duration-300 space-x-8"
                   style={{ color: 'var(--color-text-secondary)' }}>
                <time dateTime={post.date} className="font-medium">
                  {formattedDate}
                </time>
                <span className="font-medium">{post.readingTime}</span>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3">
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
            <div className="prose prose-xl max-w-none mb-20 prose-content"
                 style={{ 
                   color: 'var(--color-text-secondary)',
                   lineHeight: '1.8'
                 }}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Slideshow CTA */}
            <div className="mt-12 p-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
              <div className="text-center">
                <div className="text-4xl mb-4">📽️</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  View as Slideshow
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Experience this post as an interactive presentation
                </p>
                <Link
                  href={`/slides/${post.id}`}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Open Slideshow
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

          </article>
        </main>

        <Footer />
      </div>
    </>
  )
}