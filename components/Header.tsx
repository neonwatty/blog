'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Posts', href: '/posts' },
    { name: 'Projects', href: '/projects' },
    // { name: 'Slides', href: '/slides' },  // Disabled - slideshow feature temporarily removed
    { name: 'About', href: '/about' },
  ]

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

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

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg transition-all duration-300"
              style={{
                background: 'var(--gradient-subtle)',
                border: '1px solid var(--color-border-secondary)',
              }}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-center items-center">
                <span
                  className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}
                  style={{ background: 'var(--color-text-primary)' }}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                  style={{ background: 'var(--color-text-primary)' }}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}
                  style={{ background: 'var(--color-text-primary)' }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ top: '73px' }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute right-0 top-0 h-auto w-64 max-w-[80vw] transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{
            background: 'var(--color-background-primary)',
            borderLeft: '1px solid var(--color-border-primary)',
            borderBottom: '1px solid var(--color-border-primary)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          }}
        >
          <nav className="p-4">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-white/10"
                    style={{
                      color: 'var(--color-text-secondary)',
                      minHeight: '48px',
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
