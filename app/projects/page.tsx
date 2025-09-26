import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'
import StructuredData from '@/components/StructuredData'
import { getProjectsData } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my recent side projects - AI tools, web apps, and open source contributions.',
}

export default function ProjectsPage() {
  const projects = getProjectsData()

  return (
    <>
      <StructuredData type="website" />

      <div className="min-h-screen flex flex-col transition-colors" style={{ backgroundColor: 'transparent' }}>
        <Header />

        <main className="flex-grow mb-10">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}>
                Projects
              </h1>
              <p className="text-xl text-center max-w-2xl mx-auto"
                 style={{ color: 'var(--color-text-secondary)' }}>
                Recent side projects I've worked on - AI tools, web apps, and experiments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  animationDelay={index + 1}
                />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}