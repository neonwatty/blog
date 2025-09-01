import { notFound } from 'next/navigation'
import { getSortedPostsData, getAllPostIds } from '@/lib/posts'
import { getSlideshowById } from '@/lib/slides'
import Slideshow from '@/components/Slideshow'
import Link from 'next/link'
import { Metadata } from 'next'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const posts = getSortedPostsData()
  const slideshow = getSlideshowById(slug, posts)

  if (!slideshow) {
    return {
      title: 'Slideshow Not Found',
    }
  }

  return {
    title: `${slideshow.title} - Slideshow`,
    description: `Interactive slideshow presentation of "${slideshow.title}"`,
    openGraph: {
      title: `${slideshow.title} - Slideshow`,
      description: `Interactive slideshow presentation of "${slideshow.title}"`,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  const postIds = getAllPostIds()
  
  return postIds.map((postId) => ({
    slug: postId.params.id,
  }))
}

export default async function SlideshowPage({ params }: Props) {
  const { slug } = await params
  const posts = getSortedPostsData()
  const slideshow = getSlideshowById(slug, posts)

  if (!slideshow) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="flex justify-between items-center">
          <Link
            href="/slides"
            className="text-white hover:text-gray-300 transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Slideshows</span>
          </Link>
          
          <div className="flex items-center space-x-4 text-white text-sm">
            <Link
              href={`/posts/${slideshow.id}`}
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Read Original Post
            </Link>
            <div className="text-gray-400">
              {slideshow.metadata.totalSlides} slides
            </div>
          </div>
        </div>
      </nav>

      {/* Slideshow Container */}
      <div className="h-screen">
        <Slideshow slideshow={slideshow} theme="black" />
      </div>

      {/* Instructions Footer */}
      <div className="absolute bottom-4 left-4 right-4 z-50">
        <div className="text-center text-white text-sm bg-black bg-opacity-50 rounded-lg p-3">
          <p>
            Use arrow keys or space to navigate • Press <kbd className="bg-gray-700 px-2 py-1 rounded">ESC</kbd> for overview • 
            Press <kbd className="bg-gray-700 px-2 py-1 rounded">S</kbd> for speaker notes
          </p>
        </div>
      </div>
    </div>
  )
}