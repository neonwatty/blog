import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'

  // Generate JSON-LD structured data for breadcrumbs
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': item.href ? `${siteUrl}${item.href}` : undefined
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      
      <nav className="flex items-center text-sm mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center flex-wrap">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="w-4 h-4 mx-1 text-gray-400 flex-shrink-0" aria-hidden="true" />
              )}
              {item.href && index < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-2 px-2 -mx-2 min-h-[44px] inline-flex items-center"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-gray-100 font-medium py-2 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}