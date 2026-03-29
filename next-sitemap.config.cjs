/** @type {import('next-sitemap').IConfig} */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// Track seen URLs to prevent duplicates
const seenUrls = new Set()

// Build a lookup map of post slug → date for accurate lastmod values
const postDates = {}
try {
  const postsDirectory = path.join(process.cwd(), 'posts')
  if (fs.existsSync(postsDirectory)) {
    fs.readdirSync(postsDirectory)
      .filter((f) => f.endsWith('.md'))
      .forEach((fileName) => {
        const id = fileName.replace(/\.md$/, '')
        const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), 'utf8')
        const data = matter(fileContents).data
        if (!data.draft) {
          postDates[`/posts/${id}/`] = data.lastUpdated || data.date
        }
      })
  }
} catch (e) {
  console.warn('Failed to load post dates for sitemap:', e.message)
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://neonwatty.com',
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
    additionalSitemaps: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://neonwatty.com'}/sitemap.xml`],
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
    } else if (path.startsWith('/page/')) {
      priority = 0.3
      changefreq = 'weekly'
    } else if (path.startsWith('/tags/')) {
      priority = 0.6
      changefreq = 'weekly'
      // Slideshow feature temporarily disabled
      // } else if (path.startsWith('/slides/')) {
      //   priority = 0.6
      //   changefreq = 'monthly'
    } else if (path.startsWith('/projects') || path.startsWith('/about') || path.startsWith('/newsletter')) {
      priority = 0.7
      changefreq = 'weekly'
    } else if (path.includes('/newsletter/confirm') || path.includes('/newsletter/success')) {
      priority = 0.5
      changefreq = 'never'
    }

    // Use per-post date if available, otherwise fall back to build time
    // Handle both /posts/slug and /posts/slug/ formats
    const normalizedPath = path.endsWith('/') ? path : `${path}/`
    const postDate = postDates[normalizedPath] || postDates[path]
    const lastmod = postDate
      ? new Date(postDate).toISOString()
      : config.autoLastmod
        ? new Date().toISOString()
        : undefined

    return {
      loc: path,
      changefreq,
      priority,
      lastmod,
    }
  },
}
