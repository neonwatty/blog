import { test, expect } from '@playwright/test'

test.describe('Admin dashboard', () => {
  test('admin page loads with Posts heading and post count', async ({ page }) => {
    await page.goto('/admin')
    // Wait for posts to load (loading state disappears)
    await expect(page.getByText('Loading posts...')).toBeHidden({ timeout: 10000 })
    // Check heading
    await expect(page.locator('h1')).toContainText('Posts')
    // Check post count is displayed (e.g., "X posts")
    await expect(page.getByText(/\d+ posts/)).toBeVisible()
  })

  test('post items show title, date, and excerpt', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.getByText('Loading posts...')).toBeHidden({ timeout: 10000 })
    // At least one post link should exist
    const firstPost = page.locator('a[href^="/admin/posts/"]').first()
    await expect(firstPost).toBeVisible()
    // Should have a title (h2), time element, and excerpt text
    await expect(firstPost.locator('h2')).toBeVisible()
    await expect(firstPost.locator('time')).toBeVisible()
    await expect(firstPost.locator('p')).toBeVisible()
  })

  test('clicking a post navigates to preview page', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.getByText('Loading posts...')).toBeHidden({ timeout: 10000 })
    // Click first post
    const firstPost = page.locator('a[href^="/admin/posts/"]').first()
    const href = await firstPost.getAttribute('href')
    await firstPost.click()
    // Should navigate to preview (Next.js may add trailing slash)
    await expect(page).toHaveURL(new RegExp(href!.replace(/\/$/, '') + '/?$'))
    // Preview page should have the post title
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('preview page has edit link', async ({ page }) => {
    // Navigate directly to a known post preview
    await page.goto('/admin/posts/liars-dice-apple-watch-app')
    // Should have Edit link
    const editLink = page.getByRole('link', { name: 'Edit' })
    await expect(editLink).toBeVisible()
    await expect(editLink).toHaveAttribute('href', /\/admin\/edit\/liars-dice-apple-watch-app/)
  })

  test('admin layout shows Dev Only badge and View Site link', async ({ page }) => {
    await page.goto('/admin')
    // Dev Only badge
    await expect(page.getByText('Dev Only')).toBeVisible()
    // View Site link
    const viewSiteLink = page.locator('a[href="/"]', { hasText: 'View Site' })
    await expect(viewSiteLink).toBeVisible()
  })
})
