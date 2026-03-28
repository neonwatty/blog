import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'

interface RelatedPostsProps {
  slugs: string[]
}

export default function RelatedPosts({ slugs }: RelatedPostsProps) {
  if (!slugs || slugs.length === 0) return null

  const allPosts = getSortedPostsData()
  const related = slugs.map((slug) => allPosts.find((p) => p.id === slug)).filter(Boolean)

  if (related.length === 0) return null

  return (
    <aside className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--color-border-primary)' }}>
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-heading)' }}>
        Related Posts
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post!.id}
            href={`/posts/${post!.id}`}
            className="block p-4 rounded-lg border transition-colors hover:border-indigo-500/40"
            style={{
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-background-secondary)',
            }}
          >
            <h3 className="font-semibold text-sm leading-snug mb-1" style={{ color: 'var(--color-text-primary)' }}>
              {post!.title}
            </h3>
            <p className="text-xs line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
              {post!.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </aside>
  )
}
