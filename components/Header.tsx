import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const navigation = [
    { name: 'Posts', href: '/posts' },
    { name: 'About', href: '/about' },
    { name: 'Search', href: '/search' },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <nav className="max-w-4xl mx-auto px-4 py-4" aria-label="Top">
        <div className="flex items-center justify-between">
          {/* Personal branding with avatar */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {/* Placeholder avatar - replace with actual image */}
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <Link href="/" className="block">
                <div className="font-semibold text-gray-900 text-lg">Your Name</div>
                <div className="text-sm text-gray-600">AI-powered tools from web roots</div>
              </Link>
            </div>
          </div>

          {/* Simple navigation */}
          <div className="flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/rss.xml"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
              title="RSS Feed"
            >
              RSS
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}