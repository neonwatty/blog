import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

function pageHref(page: number): string {
  return page === 1 ? '/' : `/page/${page}/`
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-center gap-2 mt-12 mb-8" aria-label="Pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          style={{
            color: 'var(--color-text-primary)',
            backgroundColor: 'var(--color-background-secondary)',
            border: '1px solid var(--color-border-primary)',
          }}
        >
          Previous
        </Link>
      ) : (
        <span
          className="px-4 py-2 text-sm font-medium rounded-lg opacity-40 cursor-not-allowed"
          style={{
            color: 'var(--color-text-tertiary)',
            backgroundColor: 'var(--color-background-secondary)',
            border: '1px solid var(--color-border-primary)',
          }}
        >
          Previous
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={pageHref(page)}
            className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
              page === currentPage ? 'pointer-events-none' : ''
            }`}
            style={
              page === currentPage
                ? {
                    color: '#ffffff',
                    backgroundColor: '#4338ca',
                  }
                : {
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'var(--color-background-secondary)',
                    border: '1px solid var(--color-border-primary)',
                  }
            }
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          style={{
            color: 'var(--color-text-primary)',
            backgroundColor: 'var(--color-background-secondary)',
            border: '1px solid var(--color-border-primary)',
          }}
        >
          Next
        </Link>
      ) : (
        <span
          className="px-4 py-2 text-sm font-medium rounded-lg opacity-40 cursor-not-allowed"
          style={{
            color: 'var(--color-text-tertiary)',
            backgroundColor: 'var(--color-background-secondary)',
            border: '1px solid var(--color-border-primary)',
          }}
        >
          Next
        </span>
      )}
    </nav>
  )
}
