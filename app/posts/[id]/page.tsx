import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPostData, getAllPostIds, getRelatedPosts } from '@/lib/posts'
import { format } from 'date-fns'
import StructuredData from '@/components/StructuredData'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogCard from '@/components/BlogCard'
import SocialShare from '@/components/SocialShare'
import ReadingProgress from '@/components/ReadingProgress'

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

  const relatedPosts = getRelatedPosts(post.id, 3)
  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy')

  return (
    <>
      <StructuredData post={post} type="article" />
      
      <div className="min-h-screen flex flex-col">
        <ReadingProgress target="#main-content" size="normal" />
        <ReadingProgress variant="circular" showPercentage />
        <Header />
        
        <main id="main-content" className="flex-grow">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Article Header */}
            <header className="mb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {post.title}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <time dateTime={post.date}>{formattedDate}</time>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{post.readingTime}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                  </svg>
                  <span>{post.author}</span>
                </div>
              </div>

              {/* Social sharing */}
              <SocialShare 
                title={post.title}
                url={`/posts/${post.id}`}
                postId={post.id}
              />
            </header>

            {/* Article Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Code copy functionality script */}
            <script 
              dangerouslySetInnerHTML={{
                __html: `
                  function copyCode(button) {
                    const codeElement = button.closest('.code-block-container').querySelector('code');
                    const codeText = decodeURIComponent(codeElement.dataset.code || codeElement.textContent);
                    
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(codeText).then(() => {
                        button.innerHTML = '<svg class="w-4 h-4 text-green-500 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
                        setTimeout(() => {
                          button.innerHTML = '<svg class="w-4 h-4 text-tertiary hover:text-primary transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>';
                        }, 2000);
                      });
                    } else {
                      // Fallback
                      const textArea = document.createElement('textarea');
                      textArea.value = codeText;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textArea);
                      button.innerHTML = '<svg class="w-4 h-4 text-green-500 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
                      setTimeout(() => {
                        button.innerHTML = '<svg class="w-4 h-4 text-tertiary hover:text-primary transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>';
                      }, 2000);
                    }
                  }
                  
                  // Initialize Prism highlighting for enhanced code blocks
                  if (typeof Prism !== 'undefined') {
                    document.querySelectorAll('.code-block-container code[class*="language-"]').forEach(el => {
                      Prism.highlightElement(el);
                    });
                  }
                `
              }}
            />

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <SocialShare 
                title={post.title}
                url={`/posts/${post.id}`}
                postId={post.id}
              />
            </footer>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="bg-gray-50 dark:bg-gray-800 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Related Posts
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  )
}