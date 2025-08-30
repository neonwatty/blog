import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400 transition-colors">
          <div className="mb-4 sm:mb-0">
            <p>© {currentYear} Your Name. Built with Next.js.</p>
          </div>
          <div className="flex space-x-6">
            <Link 
              href="/rss.xml" 
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              RSS
            </Link>
            <a 
              href="#" 
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a 
              href="#" 
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}