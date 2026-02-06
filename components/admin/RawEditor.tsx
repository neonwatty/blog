'use client'

interface RawEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function RawEditor({ value, onChange }: RawEditorProps) {
  return (
    <div className="flex flex-col h-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full min-h-[600px] p-6 bg-transparent text-[var(--color-text-primary)] font-mono text-sm leading-relaxed resize-none focus:outline-none"
        spellCheck={false}
        placeholder="---
title: Your Post Title
date: 2026-01-01
---

Start writing your post..."
      />
      <style jsx>{`
        textarea {
          tab-size: 2;
        }
        textarea::placeholder {
          color: var(--color-text-tertiary);
        }
      `}</style>
    </div>
  )
}
