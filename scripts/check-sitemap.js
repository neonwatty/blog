const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://neonwatty.com'
const postsDirectory = path.join(process.cwd(), 'posts')
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')

function getPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}

function getSitemapPostSlugs() {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8')
  const postUrlPattern = new RegExp(`<loc>${SITE_URL}/posts/([^/]+)/</loc>`, 'g')
  const slugs = []
  let match

  while ((match = postUrlPattern.exec(sitemapContent)) !== null) {
    slugs.push(decodeURIComponent(match[1]))
  }

  return slugs
}

function checkSitemap() {
  // Check if sitemap exists
  if (!fs.existsSync(sitemapPath)) {
    console.error('Sitemap not found at public/sitemap.xml')
    console.error("Run 'npm run generate:sitemap' to create it.")
    process.exit(1)
  }

  const postSlugs = getPostSlugs()
  const sitemapSlugs = getSitemapPostSlugs()

  const postSet = new Set(postSlugs)
  const sitemapSet = new Set(sitemapSlugs)

  // Find missing posts (in /posts/ but not in sitemap)
  const missingFromSitemap = postSlugs.filter(slug => !sitemapSet.has(slug))

  // Find stale entries (in sitemap but not in /posts/)
  const staleInSitemap = sitemapSlugs.filter(slug => !postSet.has(slug))

  if (missingFromSitemap.length === 0 && staleInSitemap.length === 0) {
    console.log(`Sitemap is up to date (${postSlugs.length} posts)`)
    process.exit(0)
  }

  console.error('Sitemap validation failed\n')

  if (missingFromSitemap.length > 0) {
    console.error('Missing from sitemap:')
    missingFromSitemap.forEach(slug => console.error(`  - ${slug}`))
    console.error('')
  }

  if (staleInSitemap.length > 0) {
    console.error('Stale entries in sitemap:')
    staleInSitemap.forEach(slug => console.error(`  - ${slug}`))
    console.error('')
  }

  console.error("Run 'npm run generate:sitemap' to fix.")
  process.exit(1)
}

checkSitemap()
