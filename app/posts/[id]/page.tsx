import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPostData, getAllPostIds } from '@/lib/posts'
import { format } from 'date-fns'
import StructuredData from '@/components/StructuredData'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

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
                        className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'var(--gradient-subtle)',
                          border: '1px solid var(--color-border-subtle)',
                          color: 'var(--color-text-secondary)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
                          e.currentTarget.style.color = 'var(--color-accent-hover)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.color = 'var(--color-text-secondary)';
                        }}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-xl max-w-none mb-20"
                 style={{ 
                   color: 'var(--color-text-secondary)',
                   lineHeight: '1.8'
                 }}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Article Footer */}
            <footer className="mt-20 pt-12 transition-all duration-300"
                    style={{ borderTop: '1px solid var(--color-border-primary)' }}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-base mb-8 transition-all duration-300 space-y-4 md:space-y-0"
                   style={{ color: 'var(--color-text-secondary)' }}>
                <div>
                  <p className="font-medium">
                    Every commit lands on{' '}
                    <a 
                      href="#" 
                      className="transition-all duration-300 relative"
                      style={{ color: 'var(--color-text-primary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-accent-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-primary)';
                      }}
                    >
                      GitHub
                    </a>
                    {' '}for you to fork & remix.
                  </p>
                </div>
                <div>
                  <a 
                    href="#"
                    className="font-medium transition-all duration-300 relative group"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <span onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--color-accent-hover)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                          }}>
                      Edit this post
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                          style={{ background: 'var(--color-border-primary)' }}></span>
                  </a>
                </div>
              </div>
              
              <div className="mt-8 pt-8 transition-all duration-300"
                   style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                <p className="text-xs font-medium mb-3 transition-all duration-300"
                   style={{ 
                     color: 'var(--color-text-tertiary)',
                     letterSpacing: '0.05em',
                     textTransform: 'uppercase'
                   }}>
                  Steal this post
                </p>
                <p className="text-base transition-all duration-300"
                   style={{ color: 'var(--color-text-secondary)' }}>
                  This work is licensed under a Creative Commons License.
                </p>
              </div>
            </footer>
          </article>
        </main>

        <Footer />
      </div>
    </>
  )
}