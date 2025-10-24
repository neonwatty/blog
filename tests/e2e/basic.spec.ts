import { test, expect } from '@playwright/test'

test.describe('Basic functionality', () => {
  test('homepage loads successfully', async ({ page }) => {
    const response = await page.goto('/')
    
    // Check page loads with 200 status
    expect(response?.status()).toBe(200)
    
    // Check page has some heading content
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('blog post page loads successfully', async ({ page }) => {
    const response = await page.goto('/posts/liars-dice-apple-watch-app/')
    
    // Check page loads with 200 status
    expect(response?.status()).toBe(200)
    
    // Check page has content
    await expect(page.locator('body')).toBeVisible()
  })

  test('static export pages are accessible', async ({ page }) => {
    // Test that basic navigation works
    await page.goto('/')

    // Just verify the page loads
    await expect(page.locator('body')).toBeVisible()
  })

  test('newsletter success page loads successfully', async ({ page }) => {
    const response = await page.goto('/newsletter/success/')

    // Check page loads with 200 status
    expect(response?.status()).toBe(200)

    // Check main heading is visible
    await expect(page.getByText('Check Your Email!')).toBeVisible()

    // Check that projects are displayed
    await expect(page.getByText('Recent Projects')).toBeVisible()
  })

  test('newsletter confirm page loads successfully', async ({ page }) => {
    const response = await page.goto('/newsletter/confirm/')

    // Check page loads with 200 status
    expect(response?.status()).toBe(200)

    // Check main heading is visible
    await expect(page.getByText('You\'re All Set!')).toBeVisible()

    // Check that "View All Projects" link exists
    await expect(page.getByRole('link', { name: /View All Projects/i })).toBeVisible()
  })

  test('newsletter confirmation pages have social links', async ({ page }) => {
    await page.goto('/newsletter/confirm/')

    // Check social media links are present
    const githubLink = page.locator('a[href="https://github.com/neonwatty"]').first()
    const xLink = page.locator('a[href="https://x.com/neonwatty"]').first()
    const linkedinLink = page.locator('a[href="https://www.linkedin.com/in/jeremy-watt/"]').first()

    await expect(githubLink).toBeVisible()
    await expect(xLink).toBeVisible()
    await expect(linkedinLink).toBeVisible()
  })
})