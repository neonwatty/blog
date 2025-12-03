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

  test('Discord links are present in hero', async ({ page }) => {
    await page.goto('/')

    // Check Discord icon is present in social links
    const discordLink = page.locator('a[href="https://discord.gg/7xsxU4ZG6A"]').first()
    await expect(discordLink).toBeVisible()
  })

  test('Discord community card appears in footer', async ({ page }) => {
    await page.goto('/')

    // Check Discord community section
    await expect(page.getByText('Join our Discord Community')).toBeVisible()
    await expect(page.getByText('Keep up to date with open source projects')).toBeVisible()
  })
})