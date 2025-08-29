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
    const response = await page.goto('/posts/getting-started-with-nextjs/')
    
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
})