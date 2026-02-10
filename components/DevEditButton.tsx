'use client'

import Link from 'next/link'

export default function DevEditButton({ href }: { href: string }) {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <Link
      href={href}
      onClick={(e) => { e.stopPropagation() }}
      className="inline-flex items-center justify-center w-6 h-6 rounded text-amber-400 hover:bg-amber-500/20 transition-colors flex-shrink-0"
      title="Edit post"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    </Link>
  )
}
