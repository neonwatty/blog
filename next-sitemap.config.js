/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
  generateRobotsTxt: true,
  exclude: ['/404', '/500'],
  generateIndexSitemap: false,
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
  transform: async (config, path) => {
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
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}