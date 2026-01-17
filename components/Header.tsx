'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const navigation = [
    { name: 'Posts', href: '/posts' },
    { name: 'Projects', href: '/projects' },
    // { name: 'Slides', href: '/slides' },  // Disabled - slideshow feature temporarily removed
    { name: 'About', href: '/about' },
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
          {/* Logo/home link */}
          <Link href="/" className="font-bold text-lg transition-all duration-300"
                style={{
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                }}>
            Jeremy Watt
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
                      }}>
                  {item.name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                      style={{ background: 'var(--color-border-primary)' }}></span>
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile: Only show theme toggle (navigation is in bottom tab bar) */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
