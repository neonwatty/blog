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
      
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
        <Header />
        
        <main className="flex-grow">
          <article className="max-w-4xl mx-auto px-4 py-16">
            {/* Article Header */}
            <header className="mb-12">
              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight transition-colors">
                {post.title}
              </h1>

              {/* Meta info */}
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-6 transition-colors">
                <time dateTime={post.date} className="mr-6">
                  {formattedDate}
                </time>
                <span className="mr-6">{post.readingTime}</span>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                        className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 transition-colors">
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 transition-colors">
                <div>
                  <p>
                    Every commit lands on{' '}
                    <a 
                      href="#" 
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                    {' '}for you to fork & remix.
                  </p>
                </div>
                <div>
                  <a 
                    href="#"
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Edit this post
                  </a>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 transition-colors">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 transition-colors">
                  Steal this post
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
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