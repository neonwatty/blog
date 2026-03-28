import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import JsonLd from '@/components/JsonLd'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neonwatty.com'

export const metadata: Metadata = {
  title: 'About Jeremy Watt',
  description:
    'AI Engineer writing about Claude Code, developer productivity, and building products with AI tools. Background in machine learning research and hands-on engineering.',
  alternates: {
    canonical: `${siteUrl}/about`,
  },
}

export default function About() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jeremy Watt',
    url: `${siteUrl}/about`,
    image: `${siteUrl}/images/jeremy-watt-headshot.jpg`,
    jobTitle: 'AI Engineer',
    description: 'AI Engineer writing about Claude Code, developer productivity, and building products with AI tools.',
    sameAs: ['https://x.com/neonwatty', 'https://github.com/neonwatty'],
    knowsAbout: ['Claude Code', 'AI developer tools', 'machine learning', 'developer productivity', 'CI/CD automation'],
  }

  return (
    <>
      <JsonLd data={personSchema} />
      <StructuredData type="website" />

      <div className="min-h-screen flex flex-col transition-colors" style={{ backgroundColor: 'transparent' }}>
        <Header />

        <main id="main-content" className="mb-10">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-indigo-500/[0.08] border border-indigo-500/20 shadow-md shadow-indigo-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10">
              <div className="mb-6 text-center">
                <img
                  src="/images/jeremy-watt-headshot.jpg"
                  alt="Jeremy Watt — AI Engineer"
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-indigo-500/30 shadow-xl mb-6"
                />
                <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  Hi, I&apos;m Jeremy!
                </h1>
              </div>

              <div className="space-y-6" style={{ color: 'var(--color-text-secondary)' }}>
                <p className="text-lg text-center">
                  AI Engineer. In previous lives I&apos;ve been a scholar of Religion, a PhD student in Machine
                  Learning, and an HVAC certified technician.
                </p>

                <div className="border-t border-indigo-500/10 pt-6 space-y-4 text-base">
                  <section>
                    <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                      What I write about
                    </h2>
                    <p>
                      This blog is mostly about building things with Claude Code and other AI developer tools. I write
                      practical, opinionated guides on topics like CI/CD automation, SEO workflows, Claude Code skills
                      and plugins, testing strategies, and what it&apos;s actually like to ship products as a solo
                      developer using AI tools.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                      Background
                    </h2>
                    <p>
                      I studied machine learning in graduate school, spent time as a researcher, and have built software
                      across a range of domains. Before tech, I studied Religion academically and worked as a certified
                      HVAC technician. The winding path means I tend to approach engineering problems from unusual
                      angles.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                      Find me elsewhere
                    </h2>
                    <div className="flex gap-4">
                      <a
                        href="https://x.com/neonwatty"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        X / Twitter
                      </a>
                      <a
                        href="https://github.com/neonwatty"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
