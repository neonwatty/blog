import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogCard from '@/components/BlogCard'
import StructuredData from '@/components/StructuredData'
import { getPostsByTag, getAllTags } from '@/lib/posts'

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

// Generate metadata for the tag page
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)
  
  if (posts.length === 0) {
    return {
      title: 'Tag Not Found'
    }
  }

  const tagName = posts[0]?.tags.find(t => 
    t.toLowerCase() === decodedTag.toLowerCase()
  ) || decodedTag

  return {
    title: `${tagName} Posts`,
    description: `Explore all blog posts tagged with "${tagName}". Discover ${posts.length} article${posts.length !== 1 ? 's' : ''} covering this topic.`,
    keywords: [tagName, 'blog', 'posts', 'articles'],
  }
}

// Generate static paths for all tags
export async function generateStaticParams() {
  const tags = getAllTags()
  
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.toLowerCase())
  }))
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)
  
  if (posts.length === 0) {
    notFound()
  }

  // Find the properly capitalized tag name from the posts
  const tagName = posts[0]?.tags.find(t => 
    t.toLowerCase() === decodedTag.toLowerCase()
  ) || decodedTag

  return (
    <>
      <StructuredData type="blog" />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main id="main-content" className="flex-grow">
          {/* Page Header */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mb-4">
                  Tag
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                  {tagName}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {posts.length} article{posts.length !== 1 ? 's' : ''} tagged with "{tagName}"
                </p>
              </div>
            </div>
          </section>

          {/* Posts Grid */}
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  )
}