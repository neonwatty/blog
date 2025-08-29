import Link from 'next/link'
import { getAllTags } from '@/lib/posts'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const tags = getAllTags().slice(0, 8) // Show first 8 tags

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-blue-400 mb-4 block">
              ModernBlog
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              A modern, performant blog built with Next.js, featuring excellent SEO, 
              accessibility, and user experience.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="/rss.xml" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="RSS Feed"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.429 2.776c9.064 0 16.392 7.328 16.392 16.392h-3.264c0-7.235-5.893-13.128-13.128-13.128v-3.264zm0 6.528c5.1 0 9.264 4.164 9.264 9.264h-3.264c0-3.317-2.683-6-6-6v-3.264zm2.449 6.528c1.35 0 2.449 1.098 2.449 2.449s-1.098 2.449-2.449 2.449-2.449-1.098-2.449-2.449 1.098-2.449 2.449-2.449z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/tags" className="text-gray-300 hover:text-white transition-colors">
                  All Tags
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                  className="text-xs bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} ModernBlog. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}