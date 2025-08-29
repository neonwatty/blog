import { test, expect } from '@playwright/test'

test.describe('Basic functionality', () => {
  test('homepage loads and has title', async ({ page }) => {
    await page.goto('/')
    
    // Check page loads
    await expect(page).toHaveTitle(/Blog/)
  })

  test('blog post page loads', async ({ page }) => {
    await page.goto('/posts/getting-started-with-nextjs')
    
    // Check page loads and has content
    await expect(page.locator('h1')).toBeVisible()
  })

  test('about page loads', async ({ page }) => {
    await page.goto('/about')
    
    // Check page loads
    await expect(page.locator('h1')).toBeVisible()
  })
})