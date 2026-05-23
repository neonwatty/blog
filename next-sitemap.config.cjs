/** @type {import('next-sitemap').IConfig} */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// Track seen URLs to prevent duplicates
const seenUrls = new Set()
const POSTS_PER_PAGE = 10

// Build source-driven route data so sitemap generation does not depend on a
// fresh .next build manifest being present.
const postDates = {}
const publishedPostPaths = new Set()
const postTags = new Set()
let publishedPostCount = 0

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
          publishedPostCount += 1
          const postPath = `/posts/${id}/`
          publishedPostPaths.add(postPath)
          postDates[postPath] = data.lastUpdated || data.date
          const tags = Array.isArray(data.tags) ? data.tags : []
          tags.forEach((tag) => postTags.add(tag))
        }
      })
  }
} catch (e) {
  console.warn('Failed to load post dates for sitemap:', e.message)
}

function getSourcePaths() {
  const paths = ['/', '/about/', '/posts/', '/project-updates/', '/projects/', '/tags/', '/treasure-maps/godaddy/']

  Object.keys(postDates).forEach((postPath) => paths.push(postPath))

  const totalPages = Math.ceil(publishedPostCount / POSTS_PER_PAGE)
  for (let page = 2; page <= totalPages; page += 1) {
    paths.push(`/page/${page}/`)
  }

  Array.from(postTags)
    .sort()
    .forEach((tag) => {
      paths.push(`/tags/${encodeURIComponent(tag.toLowerCase())}/`)
    })

  const projectUpdatesDirectory = path.join(process.cwd(), 'project-updates')
  if (fs.existsSync(projectUpdatesDirectory)) {
    fs.readdirSync(projectUpdatesDirectory)
      .filter((fileName) => fileName.endsWith('.md'))
      .sort()
      .forEach((fileName) => {
        paths.push(`/project-updates/${fileName.replace(/\.md$/, '')}/`)
      })
  }

  return paths
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://neonwatty.com',
  generateRobotsTxt: true,
  exclude: ['/404', '/500', '/icon.svg', '/manifest.json'],
  generateIndexSitemap: false,
  trailingSlash: true,
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

  additionalPaths: async (config) => {
    const entries = await Promise.all(getSourcePaths().map((sourcePath) => config.transform(config, sourcePath)))
    return entries.filter(Boolean)
  },

  transform: async (config, path) => {
    const normalizedPath = path.endsWith('/') ? path : `${path}/`
    if (
      normalizedPath.startsWith('/posts/') &&
      normalizedPath !== '/posts/' &&
      !publishedPostPaths.has(normalizedPath)
    ) {
      return null
    }

    // Prevent duplicate URLs in sitemap
    const seenPath = path === '/' ? path : path.replace(/\/$/, '')
    if (seenUrls.has(seenPath)) {
      return null // Skip this URL, already in sitemap
    }
    seenUrls.add(seenPath)

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
    } else if (path.startsWith('/projects') || path.startsWith('/about') || path.startsWith('/newsletter')) {
      priority = 0.7
      changefreq = 'weekly'
    } else if (path.includes('/newsletter/confirm') || path.includes('/newsletter/success')) {
      priority = 0.5
      changefreq = 'never'
    }

    // Use per-post date if available, otherwise fall back to build time
    // Handle both /posts/slug and /posts/slug/ formats
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
