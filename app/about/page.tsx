import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'About',
  description: 'AI-powered tools from web roots to Swift frontiers.',
}

export default function About() {
  return (
    <>
      <StructuredData type="website" />
      
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
        <Header />
        
        <main className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h1>About</h1>
              
              <p>
                I create AI-powered tools from Swift roots to web frontiers. Every commit lands on GitHub for you to fork & remix.
              </p>
              
              <p>
                I'm passionate about building tools that help developers and creators work more efficiently. My background spans iOS development, machine learning, and modern web technologies.
              </p>
              
              <h2>What I do</h2>
              
              <p>
                Currently focused on exploring AI-assisted development workflows, building developer tools, and sharing insights about the intersection of traditional software development with modern AI capabilities.
              </p>
              
              <p>
                When I'm not coding, you can find me writing about development processes, contributing to open source projects, or experimenting with new technologies.
              </p>
              
              <h2>Get in touch</h2>
              
              <p>
                Feel free to reach out if you want to collaborate on projects, discuss development topics, or just say hello.
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}