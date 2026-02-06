'use client'

import { useEffect, useState, useCallback, use } from 'react'
import dynamic from 'next/dynamic'

const RawEditor = dynamic(() => import('@/components/admin/RawEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center text-[var(--color-text-secondary)]">
      Loading editor...
    </div>
  ),
})

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function EditPostPage({ params }: PageProps) {
  const { slug } = use(params)
  const [content, setContent] = useState<string>('')
  const [originalContent, setOriginalContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')

  const hasChanges = content !== originalContent

  useEffect(() => {
    fetch(`/api/admin/posts/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load post')
        return res.json()
      })
      .then(data => {
        setContent(data.raw)
        setOriginalContent(data.raw)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [slug])

  // Warn about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasChanges])

  const handleSave = useCallback(async () => {
    setSaving(true)
    setSaveStatus('idle')

    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw: content }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save')
      }

      setOriginalContent(content)
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (err) {
      setSaveStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }, [content, slug])

  // Keyboard shortcut: Cmd/Ctrl + S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        if (hasChanges && !saving) {
          handleSave()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSave, hasChanges, saving])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-[var(--color-text-secondary)]">Loading post...</div>
      </div>
    )
  }

  if (error && !content) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-red-400">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <a
            href="/admin"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <h1 className="text-lg font-medium text-[var(--color-text-primary)] truncate max-w-md">
            {slug}
          </h1>
          {hasChanges && (
            <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400">
              Unsaved changes
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`/posts/${slug}`}
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            View post
          </a>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              hasChanges && !saving
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-[var(--color-surface-tertiary)] text-[var(--color-text-tertiary)] cursor-not-allowed'
            }`}
          >
            {saving ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save'}
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Editor */}
      <div className="rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] overflow-hidden">
        <RawEditor
          value={content}
          onChange={setContent}
        />
      </div>

      {/* Help text */}
      <p className="mt-4 text-xs text-[var(--color-text-tertiary)]">
        Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface-tertiary)] font-mono">Cmd+S</kbd> to save
      </p>
    </div>
  )
}
