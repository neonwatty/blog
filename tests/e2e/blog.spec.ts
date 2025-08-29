import { test, expect } from '@playwright/test'

test.describe('Blog functionality', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/')
    
    // Check page title
    await expect(page).toHaveTitle(/Modern Blog/)
    
    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome to Modern Blog')
    
    // Check navigation is present
    await expect(page.getByRole('navigation').first()).toBeVisible()
    
    // Check footer is present
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/')
    
    // Test navigation links
    const navigation = page.getByRole('navigation')
    await expect(navigation.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(navigation.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(navigation.getByRole('link', { name: 'Tags' })).toBeVisible()
    await expect(navigation.getByRole('link', { name: 'RSS' })).toBeVisible()
  })

  test('blog posts are displayed', async ({ page }) => {
    await page.goto('/')
    
    // Check if blog posts are displayed
    const blogCards = page.locator('article')
    await expect(blogCards.first()).toBeVisible()
    
    // Check blog post content
    await expect(blogCards.first()).toContainText('Getting Started with Next.js')
  })

  test('search functionality works', async ({ page }) => {
    await page.goto('/')
    
    // Find and use search input
    const searchInput = page.getByRole('searchbox', { name: /search blog posts/i })
    await expect(searchInput).toBeVisible()
    
    // Type in search query
    await searchInput.fill('Next.js')
    
    // Wait for search results
    await expect(page.getByRole('listbox')).toBeVisible()
    
    // Check search results
    const searchResults = page.getByRole('option')
    await expect(searchResults.first()).toBeVisible()
    await expect(searchResults.first()).toContainText('Getting Started with Next.js')
  })

  test('search accessibility features work', async ({ page }) => {
    await page.goto('/')
    
    const searchInput = page.getByRole('searchbox')
    await searchInput.fill('Next')
    
    // Wait for results
    await expect(page.getByRole('listbox')).toBeVisible()
    
    // Test keyboard navigation
    await searchInput.press('ArrowDown')
    
    // Test escape to close
    await searchInput.press('Escape')
    await expect(page.getByRole('listbox')).not.toBeVisible()
  })

  test('blog post page loads with proper SEO', async ({ page }) => {
    await page.goto('/posts/getting-started-with-nextjs')
    
    // Check page title (uses seoTitle from front matter)
    await expect(page).toHaveTitle(/Complete Next\.js Tutorial/)
    
    // Check meta description (uses metaDescription from front matter)
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /Master Next\.js with this comprehensive guide/)
    
    // Check structured data
    const structuredData = page.locator('script[type="application/ld+json"]')
    await expect(structuredData).toBeAttached()
    
    // Check article content
    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Getting Started with Next.js')
    await expect(page.getByRole('article')).toBeVisible()
  })

  test('social sharing works', async ({ page }) => {
    await page.goto('/posts/getting-started-with-nextjs')
    
    // Check social sharing buttons are present
    await expect(page.getByText('Share:').first()).toBeVisible()
    
    // Test copy link functionality
    const copyButton = page.getByRole('button', { name: /copy link/i }).first()
    await expect(copyButton).toBeVisible()
    
    // Click copy button (note: actual clipboard testing is complex in Playwright)
    await copyButton.click()
    
    // Check for success state (checkmark icon changes color)
    await expect(page.locator('button[aria-label="Copy link"] svg').first()).toHaveClass(/text-green-500/)
  })

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check mobile navigation
    const mobileMenuButton = page.getByRole('button', { name: /open main menu/i })
    await expect(mobileMenuButton).toBeVisible()
    
    // Test mobile menu
    await mobileMenuButton.click()
    const navigation = page.getByRole('navigation').first()
    await expect(navigation.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(navigation.getByRole('link', { name: 'About' })).toBeVisible()
  })

  test('error handling works correctly', async ({ page }) => {
    // Test 404 page
    await page.goto('/posts/nonexistent-post')
    
    // Should show 404 or redirect to home
    const response = await page.goto('/posts/nonexistent-post')
    expect(response?.status()).toBe(404)
  })

  test('performance and accessibility standards', async ({ page }) => {
    await page.goto('/')
    
    // Check that images have alt text
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      await expect(img).toHaveAttribute('alt')
    }
    
    // Check for skip link
    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toBeAttached()
    
    // Check heading hierarchy (should have h1)
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
  })

  test('search with no results', async ({ page }) => {
    await page.goto('/')
    
    const searchInput = page.getByRole('searchbox')
    await searchInput.fill('nonexistent search term')
    
    // Should show no results message
    await expect(page.getByText(/no posts found/i)).toBeVisible()
  })

  test('related posts section', async ({ page }) => {
    await page.goto('/posts/getting-started-with-nextjs')
    
    // Check if related posts section exists
    const relatedSection = page.getByRole('heading', { name: /related posts/i })
    
    // Related posts might not exist if there are no posts with shared tags
    if (await relatedSection.isVisible()) {
      await expect(relatedSection).toBeVisible()
      
      // Check that related posts are clickable
      const relatedPosts = page.locator('article')
      if (await relatedPosts.count() > 0) {
        await expect(relatedPosts.first().getByRole('link')).toBeVisible()
      }
    }
  })
})