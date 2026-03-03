'use client'

import { useState } from 'react'
import RawEditor from '@/components/admin/RawEditor'
import PreviewPane from '@/components/admin/PreviewPane'

type ViewMode = 'edit' | 'preview' | 'split'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('split')

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-end px-3 py-1.5 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-tertiary)]">
        <div className="flex rounded-md overflow-hidden border border-[var(--color-border-primary)]">
          {(['edit', 'split', 'preview'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                viewMode === mode
                  ? 'bg-indigo-600 text-white'
                  : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {mode === 'edit' ? 'Edit' : mode === 'split' ? 'Split' : 'Preview'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 min-h-[600px]">
        {/* Editor pane */}
        {viewMode !== 'preview' && (
          <div className={viewMode === 'split' ? 'w-1/2 border-r border-[var(--color-border-primary)]' : 'w-full'}>
            <RawEditor value={value} onChange={onChange} />
          </div>
        )}

        {/* Preview pane */}
        {viewMode !== 'edit' && (
          <div className={viewMode === 'split' ? 'w-1/2' : 'w-full'}>
            <PreviewPane raw={value} />
          </div>
        )}
      </div>
    </div>
  )
}
