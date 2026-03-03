'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import matter from 'gray-matter'
import { useDebounce } from '@/hooks/useDebounce'

interface PreviewPaneProps {
  raw: string
}

export default function PreviewPane({ raw }: PreviewPaneProps) {
  const debouncedRaw = useDebounce(raw, 300)

  let frontmatter: Record<string, unknown> = {}
  let body = debouncedRaw

  try {
    const parsed = matter(debouncedRaw)
    frontmatter = parsed.data
    body = parsed.content
  } catch {
    // If parsing fails, just show the raw content
  }

  const title = frontmatter.title as string | undefined
  const rawDate = frontmatter.date
  const date = rawDate instanceof Date ? rawDate.toISOString().split('T')[0] : (rawDate as string | undefined)
  const tags = (frontmatter.tags as string[]) || []
  const draft = frontmatter.draft as boolean | undefined

  return (
    <div className="h-full overflow-auto p-6">
      {/* Frontmatter header */}
      {title && (
        <div className="mb-6 pb-4 border-b border-[var(--color-border-primary)]">
          <div className="flex items-center gap-2 mb-2">
            {draft && <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">Draft</span>}
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h1>
          {date && <p className="text-sm text-[var(--color-text-secondary)] mt-1">{date}</p>}
          {tags.length > 0 && (
            <div className="flex gap-1.5 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Markdown preview */}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
          {body}
        </ReactMarkdown>
      </div>
    </div>
  )
}
