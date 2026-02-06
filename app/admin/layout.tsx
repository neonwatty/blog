import { notFound } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Dev-only gate: block access in production
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface-primary)]">
      <header className="border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-xl font-semibold text-[var(--color-text-primary)]">
              Admin
            </Link>
            <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400 font-medium">
              Dev Only
            </span>
          </div>
          <Link
            href="/"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            View Site
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
