import { test, expect } from '@playwright/test'

// Domains that block automated requests (return 403/405 for bots)
const BOT_BLOCKED_DOMAINS = [
  'x.com',
  'twitter.com',
  'linkedin.com',
]

function isBlockedDomain(url: string): boolean {
  return BOT_BLOCKED_DOMAINS.some(domain => url.includes(domain))
}

test.describe('External link validation', () => {
  test('all external links are valid', async ({ page, request }) => {
    await page.goto('/')

    // Collect all external links from the page
    const links = await page.locator('a[href^="http"]').all()
    const externalUrls = new Set<string>()

    for (const link of links) {
      const href = await link.getAttribute('href')
      if (href && !href.includes('localhost') && !href.includes('neonwatty.com')) {
        externalUrls.add(href)
      }
    }

    // Separate blocked domains from testable ones
    const testableUrls = [...externalUrls].filter(url => !isBlockedDomain(url))
    const skippedUrls = [...externalUrls].filter(url => isBlockedDomain(url))

    console.log(`Found ${externalUrls.size} external links`)
    console.log(`  Testing: ${testableUrls.length}`)
    console.log(`  Skipped (bot-blocked): ${skippedUrls.length}`)
    skippedUrls.forEach(url => console.log(`    - ${url}`))

    const results: { url: string; status: number | string }[] = []

    for (const url of testableUrls) {
      try {
        // Use HEAD request to avoid downloading full page content
        const response = await request.head(url, {
          timeout: 10000,
          ignoreHTTPSErrors: true,
        })
        results.push({ url, status: response.status() })
      } catch {
        // Some sites block HEAD requests, try GET
        try {
          const response = await request.get(url, {
            timeout: 10000,
            ignoreHTTPSErrors: true,
          })
          results.push({ url, status: response.status() })
        } catch {
          results.push({ url, status: 'error' })
        }
      }
    }

    // Log results for debugging
    console.log('Results:')
    for (const result of results) {
      console.log(`  ${result.status} - ${result.url}`)
    }

    // Check for broken links (exclude acceptable statuses)
    const brokenLinks = results.filter(r => {
      if (typeof r.status === 'string') return true // errors
      // Accept 200, 201, 301, 302, 303, 307, 308 (redirects are OK)
      return r.status >= 400
    })

    if (brokenLinks.length > 0) {
      console.error('Broken links found:')
      brokenLinks.forEach(link => console.error(`  ${link.status} - ${link.url}`))
    }

    expect(brokenLinks, `Found ${brokenLinks.length} broken external links`).toHaveLength(0)
  })
})
