'use client'

import { useEffect, useState } from 'react'

interface PostSummary {
  slug: string
  title: string
  date: string
  excerpt: string
  featured: boolean
}

export default function AdminPage() {
  const [posts, setPosts] = useState<PostSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-[var(--color-text-secondary)]">Loading posts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-red-400">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
          Posts
        </h1>
        <span className="text-sm text-[var(--color-text-secondary)]">
          {posts.length} posts
        </span>
      </div>

      <div className="space-y-2">
        {posts.map(post => (
          <a
            key={post.slug}
            href={`/admin/posts/${post.slug}`}
            className="block p-4 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] hover:border-[var(--color-border-secondary)] transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-medium text-[var(--color-text-primary)] group-hover:text-indigo-400 transition-colors truncate">
                    {post.title}
                  </h2>
                  {post.featured && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-medium shrink-0">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] truncate">
                  {post.excerpt}
                </p>
              </div>
              <time className="text-sm text-[var(--color-text-tertiary)] shrink-0">
                {post.date}
              </time>
            </div>
          </a>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-[var(--color-text-secondary)]">
          No posts found
        </div>
      )}
    </div>
  )
}
