import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'
import { getProjectsData } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Thanks for Subscribing!',
  description: 'Check your email to confirm your subscription',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NewsletterSuccessPage() {
  const projects = getProjectsData()
  // Get top 4 newest projects
  const featuredProjects = projects.slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col transition-all duration-300"
         style={{ backgroundColor: 'transparent' }}>
      <Header />

      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300"
                   style={{
                     background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.1))',
                     border: '2px solid rgba(139, 92, 246, 0.3)',
                   }}>
                <svg className="w-10 h-10"
                     style={{ color: 'var(--color-accent)' }}
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24">
                  <path strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>
            </div>

            <h1 className="text-5xl font-extrabold mb-6 leading-tight transition-all duration-300"
                style={{
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.04em',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
              Check Your Email!
            </h1>

            <div className="w-24 h-px mb-8 mx-auto transition-all duration-300"
                 style={{ background: 'var(--gradient-subtle)' }}></div>

            <p className="text-xl leading-relaxed mb-8 max-w-2xl mx-auto"
               style={{ color: 'var(--color-text-secondary)' }}>
              Thanks for subscribing! I've sent you a confirmation email.
              Click the link inside to complete your subscription.
            </p>
          </div>

          {/* What You'll Get Section */}
          <div className="mb-16 p-8 rounded-2xl transition-all duration-300"
               style={{
                 background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.05))',
                 border: '1px solid rgba(139, 92, 246, 0.2)',
               }}>
            <h2 className="text-2xl font-bold mb-6 text-center transition-all duration-300"
                style={{ color: 'var(--color-text-primary)' }}>
              What you'll get
            </h2>

            <div className="space-y-4 max-w-xl mx-auto">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-1"
                     style={{ color: 'var(--color-accent)' }}
                     fill="currentColor"
                     viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                  <strong style={{ color: 'var(--color-text-primary)' }}>New releases</strong> — Be the first to know when I launch new tools and products
                </p>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-1"
                     style={{ color: 'var(--color-accent)' }}
                     fill="currentColor"
                     viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Product updates</strong> — Feature additions, improvements, and what's coming next
                </p>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-1"
                     style={{ color: 'var(--color-accent)' }}
                     fill="currentColor"
                     viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Build learnings</strong> — Real lessons from building and shipping open source tools
                </p>
              </div>
            </div>
          </div>

          {/* Featured Projects Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-3 text-center transition-all duration-300"
                style={{ color: 'var(--color-text-primary)' }}>
              Recent Projects
            </h2>
            <p className="text-center mb-8"
               style={{ color: 'var(--color-text-secondary)' }}>
              While you wait, check out what I've been building
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  animationDelay={index + 1}
                />
              ))}
            </div>
          </div>

          {/* Social CTAs Section */}
          <div className="text-center p-8 rounded-2xl transition-all duration-300"
               style={{
                 background: 'var(--gradient-elevated)',
                 border: '1px solid var(--color-border-primary)',
               }}>
            <h2 className="text-2xl font-bold mb-4 transition-all duration-300"
                style={{ color: 'var(--color-text-primary)' }}>
              Connect With Me
            </h2>
            <p className="mb-6"
               style={{ color: 'var(--color-text-secondary)' }}>
              Follow along on social media for real-time updates
            </p>

            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/neonwatty"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.1))',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  color: 'var(--color-text-primary)',
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>

              <a
                href="https://x.com/neonwatty"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.1))',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  color: 'var(--color-text-primary)',
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X (Twitter)
              </a>

              <a
                href="https://www.linkedin.com/in/jeremy-watt/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.1))',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  color: 'var(--color-text-primary)',
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
