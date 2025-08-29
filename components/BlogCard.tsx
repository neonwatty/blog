import Link from 'next/link'
import Image from 'next/image'
import { PostData } from '@/lib/posts'
import { format } from 'date-fns'

interface BlogCardProps {
  post: PostData
}

interface BlogCardWithAnimationProps extends BlogCardProps {
  animationDelay?: number
}

export default function BlogCard({ post, animationDelay = 0 }: BlogCardWithAnimationProps) {
  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy')
  const delayClass = animationDelay > 0 ? `stagger-delay-${Math.min(animationDelay, 6)}` : ''

  return (
    <article className={`glass-card glass-card-hover rounded-xl overflow-hidden stagger-animation ${delayClass} group`}>
      {post.image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      <div className="p-6 relative">
        {/* Glassmorphism overlay for better content visibility */}
        <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-b-xl"></div>
        <div className="relative z-10">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className="text-xs font-medium bg-white/30 dark:bg-white/10 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 hover:bg-white/40 dark:hover:bg-white/20 transition-all duration-200 hover:scale-105"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="heading-md text-gray-900 dark:text-white mb-3 line-clamp-2">
          <Link 
            href={`/posts/${post.id}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus-ring block group-hover:translate-x-1"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="body-regular text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta information */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <time dateTime={post.date} className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"/>
              </svg>
              {formattedDate}
            </time>
            
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {post.readingTime}
            </span>
          </div>

          {post.featured && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Featured
            </span>
          )}
        </div>

        {/* Read more link */}
        <div className="mt-4">
          <Link
            href={`/posts/${post.id}`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-all duration-200 focus-ring group-hover:translate-x-2"
          >
            Read more
            <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </Link>
        </div>
        </div>
      </div>
    </article>
  )
}