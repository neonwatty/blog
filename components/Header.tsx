import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const navigation = [
    { name: 'Posts', href: '/posts' },
    { name: 'About', href: '/about' },
    { name: 'Search', href: '/search' },
  ]

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md transition-all duration-300" 
            style={{
              background: 'var(--gradient-elevated)',
              borderBottom: '1px solid var(--color-border-primary)',
              boxShadow: 'var(--shadow-subtle)'
            }}>
      <nav className="max-w-4xl mx-auto px-4 py-4" aria-label="Top">
        <div className="flex items-center justify-between">
          {/* Personal branding with avatar */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105"
                 style={{
                   background: 'var(--gradient-subtle)',
                   border: '2px solid var(--color-border-secondary)',
                   boxShadow: 'var(--shadow-subtle)'
                 }}>
              <svg className="w-8 h-8 transition-colors duration-300" 
                   style={{ color: 'var(--color-text-tertiary)' }}
                   fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <Link href="/" className="block group">
                <div className="font-bold text-lg transition-all duration-300 group-hover:letter-spacing-wide"
                     style={{ 
                       color: 'var(--color-text-primary)',
                       letterSpacing: '-0.02em',
                       textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                     }}>
                  Your Name
                </div>
                <div className="text-sm font-medium transition-all duration-300"
                     style={{ 
                       color: 'var(--color-text-secondary)',
                       letterSpacing: '-0.01em'
                     }}>
                  AI-powered tools from web roots
                </div>
              </Link>
            </div>
          </div>

          {/* Simple navigation */}
          <div className="flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-all duration-300 relative group"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <span className="group-hover:text-opacity-100 transition-all duration-300"
                      style={{ 
                        color: 'var(--color-text-secondary)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-accent-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                      }}>
                  {item.name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                      style={{ background: 'var(--color-border-primary)' }}></span>
              </Link>
            ))}
            <Link
              href="/rss.xml"
              className="text-sm font-medium transition-all duration-300 relative group"
              title="RSS Feed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span className="group-hover:text-opacity-100 transition-all duration-300"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }}>
                RSS
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: 'var(--color-border-primary)' }}></span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}