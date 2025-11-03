/** @type {import('next-sitemap').IConfig} */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// Track seen URLs to prevent duplicates
const seenUrls = new Set()

// Function to read posts directly from the posts directory
function getDynamicPaths() {
  const paths = []

  try {
    // Add all blog posts
    try {
      const postsDirectory = path.join(process.cwd(), 'posts')
      if (fs.existsSync(postsDirectory)) {
        const fileNames = fs.readdirSync(postsDirectory)
        const posts = fileNames
          .filter(fileName => fileName.endsWith('.md'))
          .map((fileName) => {
            const id = fileName.replace(/\.md$/, '')
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const matterResult = matter(fileContents)
            return {
              id,
              date: matterResult.data.date
            }
          })

        paths.push(...posts.map(post => ({
          loc: `/posts/${post.id}/`,
          lastmod: post.date,
        })))
        console.log(`✓ Added ${posts.length} blog posts to sitemap`)
      }
    } catch (e) {
      console.warn('Failed to load posts for sitemap:', e.message)
    }

    // Add all tag pages
    try {
      const postsDirectory = path.join(process.cwd(), 'posts')
      if (fs.existsSync(postsDirectory)) {
        const fileNames = fs.readdirSync(postsDirectory)
        const tagsSet = new Set()

        fileNames
          .filter(fileName => fileName.endsWith('.md'))
          .forEach((fileName) => {
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const matterResult = matter(fileContents)
            const tags = matterResult.data.tags || []
            tags.forEach(tag => tagsSet.add(tag))
          })

        const tags = Array.from(tagsSet)
        paths.push(...tags.map(tag => ({
          loc: `/tags/${encodeURIComponent(tag.toLowerCase())}/`,
        })))
        console.log(`✓ Added ${tags.length} tag pages to sitemap`)
      }
    } catch (e) {
      console.warn('Failed to load tags for sitemap:', e.message)
    }

    // Add all slideshows
    try {
      const slideshowsDir = path.join(process.cwd(), 'slideshows')
      if (fs.existsSync(slideshowsDir)) {
        const files = fs.readdirSync(slideshowsDir)
        const slideshows = files
          .filter(file => file.endsWith('.json'))
          .map(file => {
            const filePath = path.join(slideshowsDir, file)
            const fileContent = fs.readFileSync(filePath, 'utf8')
            const slideshow = JSON.parse(fileContent)
            return slideshow
          })

        paths.push(...slideshows.map(show => ({
          loc: `/slides/${show.id}/`,
          lastmod: show.metadata.date,
        })))
        console.log(`✓ Added ${slideshows.length} slideshows to sitemap`)
      }
    } catch (e) {
      console.warn('Failed to load slideshows for sitemap:', e.message)
    }
  } catch (error) {
    console.error('Error loading dynamic paths:', error)
  }

  return paths
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
  generateRobotsTxt: true,
  exclude: ['/404', '/500', '/icon.svg', '/manifest.json'],
  generateIndexSitemap: false,
  autoLastmod: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404', '/500', '/_next/', '/api/'],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/sitemap.xml`,
    ],
  },

  // Note: additionalPaths removed - Next.js already generates all these pages
  // via generateStaticParams, so next-sitemap auto-discovers them from the build output

  transform: async (config, path) => {
    // Prevent duplicate URLs in sitemap
    if (seenUrls.has(path)) {
      return null // Skip this URL, already in sitemap
    }
    seenUrls.add(path)

    // Custom priority and changefreq based on path
    let priority = 0.7
    let changefreq = 'weekly'

    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.startsWith('/posts/')) {
      priority = 0.8
      changefreq = 'monthly'
    } else if (path.startsWith('/tags/')) {
      priority = 0.6
      changefreq = 'weekly'
    } else if (path.startsWith('/slides/')) {
      priority = 0.6
      changefreq = 'monthly'
    } else if (path.startsWith('/projects') || path.startsWith('/about') || path.startsWith('/newsletter')) {
      priority = 0.7
      changefreq = 'weekly'
    } else if (path.includes('/newsletter/confirm') || path.includes('/newsletter/success')) {
      priority = 0.5
      changefreq = 'never'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}