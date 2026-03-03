'use client'

import { useRef, useCallback, useState, DragEvent, ClipboardEvent } from 'react'

interface RawEditorProps {
  value: string
  onChange: (value: string) => void
  slug?: string
}

export default function RawEditor({ value, onChange, slug }: RawEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const insertAtCursor = useCallback(
    (text: string) => {
      const textarea = textareaRef.current
      if (!textarea) {
        onChange(value + text)
        return
      }

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = value.slice(0, start) + text + value.slice(end)
      onChange(newValue)

      // Restore cursor position after the inserted text
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + text.length
        textarea.focus()
      })
    },
    [value, onChange],
  )

  const uploadFile = useCallback(
    async (file: File) => {
      if (!slug) return

      setUploading(true)
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('slug', slug)

        const res = await fetch('/api/admin/images', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const data = await res.json()
          console.error('Upload failed:', data.error)
          return
        }

        const data = await res.json()
        insertAtCursor(`\n![${file.name}](${data.path})\n`)
      } catch (err) {
        console.error('Upload error:', err)
      } finally {
        setUploading(false)
      }
    },
    [slug, insertAtCursor],
  )

  const handleDrop = useCallback(
    (e: DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault()
      setDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      const imageFile = files.find((f) => f.type.startsWith('image/'))
      if (imageFile) {
        uploadFile(imageFile)
      }
    },
    [uploadFile],
  )

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLTextAreaElement>) => {
      const items = Array.from(e.clipboardData.items)
      const imageItem = items.find((item) => item.type.startsWith('image/'))
      if (imageItem) {
        e.preventDefault()
        const file = imageItem.getAsFile()
        if (file) {
          uploadFile(file)
        }
      }
    },
    [uploadFile],
  )

  return (
    <div className="flex flex-col h-full relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onPaste={handlePaste}
        className={`w-full h-full min-h-[600px] p-6 bg-transparent text-[var(--color-text-primary)] font-mono text-sm leading-relaxed resize-none focus:outline-hidden ${
          dragOver ? 'ring-2 ring-indigo-500 ring-inset' : ''
        }`}
        spellCheck={false}
        placeholder="---
title: Your Post Title
date: 2026-01-01
---

Start writing your post..."
      />
      {uploading && (
        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded bg-indigo-600 text-white text-xs">
          Uploading image...
        </div>
      )}
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
