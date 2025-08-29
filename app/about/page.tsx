import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Modern Blog and the author behind the content.',
}

export default function About() {
  return (
    <>
      <StructuredData type="website" />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main id="main-content" className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <h1>About Modern Blog</h1>
              
              <p className="lead">
                Welcome to Modern Blog, a cutting-edge platform built with Next.js that showcases 
                the latest in web development, design, and technology.
              </p>
              
              <h2>Our Mission</h2>
              
              <p>
                Our mission is to provide high-quality, accessible content that helps developers 
                and designers stay up-to-date with the rapidly evolving world of web technology. 
                We believe in sharing knowledge, best practices, and practical insights that can 
                be applied to real-world projects.
              </p>
              
              <h2>What You'll Find Here</h2>
              
              <ul>
                <li><strong>In-depth tutorials</strong> on modern web technologies</li>
                <li><strong>Best practices</strong> for development and design</li>
                <li><strong>Performance optimization</strong> techniques</li>
                <li><strong>Accessibility guidelines</strong> and implementation</li>
                <li><strong>SEO strategies</strong> for better search visibility</li>
              </ul>
              
              <h2>Built With Modern Technologies</h2>
              
              <p>
                This blog itself is a testament to modern web development practices. It's built with:
              </p>
              
              <ul>
                <li><strong>Next.js 15</strong> - The React framework for production</li>
                <li><strong>TypeScript</strong> - For type-safe development</li>
                <li><strong>Tailwind CSS</strong> - For utility-first styling</li>
                <li><strong>MDX</strong> - For enhanced markdown content</li>
                <li><strong>Vercel Analytics</strong> - For performance monitoring</li>
              </ul>
              
              <h2>Features</h2>
              
              <ul>
                <li>✅ Excellent SEO with structured data</li>
                <li>✅ Full accessibility compliance (WCAG 2.1)</li>
                <li>✅ Lightning-fast performance</li>
                <li>✅ Responsive design for all devices</li>
                <li>✅ Advanced search functionality</li>
                <li>✅ RSS feeds for easy subscription</li>
                <li>✅ Social sharing integration</li>
                <li>✅ Error tracking and monitoring</li>
              </ul>
              
              <h2>Get In Touch</h2>
              
              <p>
                Have questions, suggestions, or just want to say hello? Feel free to reach out 
                through our social media channels or by subscribing to our RSS feed for the 
                latest updates.
              </p>
              
              <p>
                Thank you for visiting Modern Blog. We hope you find our content valuable and 
                inspiring for your own development journey!
              </p>
            </article>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}