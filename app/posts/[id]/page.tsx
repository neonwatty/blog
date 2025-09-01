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

          </article>
        </main>

        <Footer />
      </div>
    </>
  )
}