import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectsFilter from '@/components/ProjectsFilter'
import StructuredData from '@/components/StructuredData'
import { getProjectsData } from '@/lib/projects'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neonwatty.com'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my recent side projects - AI tools, web apps, and open source contributions.',
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    title: "Projects | Jeremy Watt's Blog",
    description: 'Explore my recent side projects - AI tools, web apps, and open source contributions.',
    type: 'website',
    url: `${siteUrl}/projects`,
    images: [`${siteUrl}/images/og-image.jpg`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects',
    description: 'Explore my recent side projects - AI tools, web apps, and open source contributions.',
    images: [`${siteUrl}/images/og-image.jpg`],
    creator: '@neonwatty',
  },
}

export default function ProjectsPage() {
  const projects = getProjectsData()

  return (
    <>
      <StructuredData type="website" />

      <div className="min-h-screen flex flex-col transition-colors" style={{ backgroundColor: 'transparent' }}>
        <Header />

        <main id="main-content" className="flex-grow mb-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Hero Section */}
            <div className="mb-10 sm:mb-14 text-center">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Projects
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                I build things to scratch my own itch. Here's what's live.
              </p>
            </div>

            {/* Filter + Grid */}
            <ProjectsFilter projects={projects} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
