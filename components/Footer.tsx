import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="transition-all duration-300"
            style={{
              background: 'var(--gradient-elevated)',
              borderTop: '1px solid var(--color-border-primary)',
              boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.02)'
            }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm transition-all duration-300">
          <div className="mb-6 sm:mb-0">
            <p className="font-medium transition-all duration-300"
               style={{ 
                 color: 'var(--color-text-secondary)',
                 letterSpacing: '-0.01em'
               }}>
              © {currentYear} Your Name. Built with Next.js.
            </p>
          </div>
          <div className="flex space-x-8">
            <Link 
              href="/rss.xml" 
              className="font-medium transition-all duration-300 relative group"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span className="transition-all duration-300"
>
                RSS
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: 'var(--color-border-primary)' }}></span>
            </Link>
            <a 
              href="#" 
              className="font-medium transition-all duration-300 relative group"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span className="transition-all duration-300"
>
                GitHub
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: 'var(--color-border-primary)' }}></span>
            </a>
            <a 
              href="#" 
              className="font-medium transition-all duration-300 relative group"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span className="transition-all duration-300"
>
                Twitter
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: 'var(--color-border-primary)' }}></span>
            </a>
          </div>
        </div>
        
        {/* Subtle decorative element */}
        <div className="mt-8 pt-8 flex justify-center"
             style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
          <div className="w-12 h-px transition-all duration-300"
               style={{ background: 'var(--gradient-subtle)' }}></div>
        </div>
      </div>
    </footer>
  )
}