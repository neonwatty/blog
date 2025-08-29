import { getSortedPostsData } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchProvider from '@/components/SearchProvider'
import ReadingProgress from '@/components/ReadingProgress'
import TableOfContents from '@/components/TableOfContents'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'
import MasonryGrid from '@/components/MasonryGrid'

export default function Home() {
  const allPostsData = getSortedPostsData()
  const featuredPosts = allPostsData.filter(post => post.featured)
  const recentPosts = allPostsData.filter(post => !post.featured).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <ReadingProgress target="#main-content" size="normal" />
      <ReadingProgress variant="circular" showPercentage />
      <Header />
      
      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="gradient-bg-animated py-16 relative overflow-hidden">
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="heading-xl text-white mb-6 drop-shadow-lg">
                Welcome to Modern Blog
              </h1>
              <p className="body-large text-white/90 mb-8 drop-shadow-md">
                Discover insights, tutorials, and stories about web development, design, and technology.
              </p>
              
              {/* Search Component */}
              <div className="max-w-md mx-auto">
                <SearchProvider allPosts={allPostsData} />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16 gradient-bg-subtle relative overflow-hidden">
            {/* Overlay for better content visibility */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="container relative z-10">
              <h2 className="heading-lg text-white mb-8 text-center drop-shadow-lg">
                Featured Posts
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} animationDelay={index + 1} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Posts */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container">
            <h2 className="heading-lg text-gray-900 dark:text-white mb-8 text-center">
              Recent Posts (Masonry Layout)
            </h2>
            <MasonryGrid
              columns={{ mobile: 1, tablet: 2, desktop: 3 }}
              gap={32}
              animate={true}
            >
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </MasonryGrid>
          </div>
        </section>

        {/* Demo Content for Table of Contents */}
        <section className="py-16 bg-surface-primary">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <h2 id="about">About This Blog</h2>
                <p className="body-regular text-secondary mb-6">
                  This is a modern blog built with Next.js, featuring advanced UI components, 
                  glassmorphism effects, and smooth animations. The blog demonstrates various 
                  modern web development techniques and user experience enhancements.
                </p>

                <h3 id="features">Key Features</h3>
                <p className="body-regular text-secondary mb-6">
                  Our blog includes reading progress indicators, table of contents navigation,
                  advanced typography, and responsive design patterns.
                </p>

                <h4 id="visual-design">Visual Design</h4>
                <p className="body-regular text-secondary mb-6">
                  The design features glassmorphism effects, dynamic gradient backgrounds, 
                  and carefully crafted typography hierarchy using Google Fonts.
                </p>

                <h3 id="technical-details">Technical Implementation</h3>
                <p className="body-regular text-secondary mb-6">
                  Built with modern React patterns, TypeScript for type safety, and 
                  Tailwind CSS for styling. The color system uses CSS custom properties
                  for easy theming.
                </p>

                <h4 id="performance">Performance Optimizations</h4>
                <p className="body-regular text-secondary mb-6">
                  The blog is optimized for performance with Next.js static generation, 
                  image optimization, and efficient component rendering.
                </p>

                <h2 id="getting-started">Getting Started</h2>
                <p className="body-regular text-secondary mb-6">
                  To get started with this blog template, clone the repository and follow 
                  the setup instructions in the README file.
                </p>

                <h3 id="installation">Installation</h3>
                <p className="body-regular text-secondary mb-6">
                  Run npm install to install all dependencies, then npm run dev to start 
                  the development server.
                </p>

                <CodeBlock
                  code={`npm install
npm run dev`}
                  language="bash"
                  filename="terminal"
                  showLineNumbers={false}
                />

                <h4 id="configuration">Configuration</h4>
                <p className="body-regular text-secondary mb-6">
                  Configure your blog by updating the settings in the configuration files.
                </p>

                <CodeBlock
                  code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'],
  },
}

module.exports = nextConfig`}
                  language="javascript"
                  filename="next.config.js"
                />

                <h4 id="components">Component Usage</h4>
                <p className="body-regular text-secondary mb-6">
                  Here's an example of how to use the enhanced blog components:
                </p>

                <CodeBlock
                  code={`import React from 'react'
import { BlogCard, ReadingProgress, TableOfContents } from '@/components'

export default function BlogPost({ post }) {
  return (
    <div className="min-h-screen">
      <ReadingProgress target="#main-content" />
      
      <main id="main-content" className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <article className="lg:col-span-3 prose prose-lg">
            <h1 className="heading-xl">{post.title}</h1>
            {post.content}
          </article>
          
          <aside className="lg:col-span-1">
            <TableOfContents maxLevel={3} className="sticky top-20" />
          </aside>
        </div>
      </main>
    </div>
  )
}`}
                  language="tsx"
                  filename="components/BlogPost.tsx"
                />

                <h3 id="examples">Interactive Examples</h3>
                <p className="body-regular text-secondary mb-6">
                  Here are some examples of the interactive callout boxes with different types and animations:
                </p>

                <Callout type="info" title="Information" animate>
                  <p>This is an informational callout box. It's perfect for sharing helpful tips or additional context about your content.</p>
                </Callout>

                <Callout type="success" title="Success Message">
                  <p>Great job! This callout indicates a successful operation or positive outcome. Perfect for celebrating achievements or confirming completed actions.</p>
                </Callout>

                <Callout type="warning" title="Important Warning" collapsible>
                  <p>This is a warning callout that can be collapsed. Click the arrow to expand or collapse the content.</p>
                  <ul>
                    <li>Always backup your data before making changes</li>
                    <li>Test in a development environment first</li>
                    <li>Review code changes carefully</li>
                  </ul>
                </Callout>

                <Callout type="tip" title="Pro Tip" collapsible defaultCollapsed>
                  <p>This tip starts collapsed and contains advanced techniques:</p>
                  <p>Use <code>CSS custom properties</code> for theming, implement proper <code>accessibility</code> patterns, and optimize for performance with lazy loading.</p>
                </Callout>

                <Callout type="error" title="Error Handling">
                  <p>This callout highlights potential errors or issues. It's essential for documenting common problems and their solutions.</p>
                </Callout>

                <Callout type="note">
                  <p>This is a simple note callout without a title. Perfect for brief annotations or additional context that doesn't need a formal heading.</p>
                </Callout>
              </div>
              
              <div className="lg:col-span-1">
                <TableOfContents maxLevel={4} className="compact" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}