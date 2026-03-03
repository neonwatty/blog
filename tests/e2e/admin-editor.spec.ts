import { test, expect } from '@playwright/test'

test.describe('Admin editor', () => {
  const testSlug = 'liars-dice-apple-watch-app'

  test('edit page loads post content', async ({ page }) => {
    await page.goto(`/admin/edit/${testSlug}`)
    // Wait for editor to load (loading state disappears)
    await expect(page.getByText('Loading editor...')).toBeHidden({ timeout: 15000 })
    // The slug should appear as the page heading
    await expect(page.locator('h1').first()).toContainText(testSlug)
    // Editor should be visible (textarea in the editor)
    await expect(page.locator('textarea')).toBeVisible()
  })

  test('editor mode toggles work', async ({ page }) => {
    await page.goto(`/admin/edit/${testSlug}`)
    await expect(page.getByText('Loading editor...')).toBeHidden({ timeout: 15000 })

    // Default mode is split - both textarea and preview should be visible
    await expect(page.locator('textarea')).toBeVisible()

    // Click Edit button
    await page.getByRole('button', { name: 'Edit' }).click()
    await expect(page.locator('textarea')).toBeVisible()

    // Click Preview button
    await page.getByRole('button', { name: 'Preview' }).click()
    await expect(page.locator('textarea')).toBeHidden()

    // Click Split button to go back
    await page.getByRole('button', { name: 'Split' }).click()
    await expect(page.locator('textarea')).toBeVisible()
  })

  test('typing in textarea shows Unsaved changes badge', async ({ page }) => {
    await page.goto(`/admin/edit/${testSlug}`)
    await expect(page.getByText('Loading editor...')).toBeHidden({ timeout: 15000 })

    // Initially no unsaved changes badge
    await expect(page.getByText('Unsaved changes')).toBeHidden()

    // Type something in the textarea
    const textarea = page.locator('textarea')
    await textarea.click()
    await textarea.press('End')
    await page.keyboard.type(' additional text')

    // Unsaved changes badge should appear
    await expect(page.getByText('Unsaved changes')).toBeVisible()
  })

  test('View post link navigates to public URL', async ({ page }) => {
    await page.goto(`/admin/edit/${testSlug}`)
    await expect(page.getByText('Loading editor...')).toBeHidden({ timeout: 15000 })

    // Check "View post" link exists and points to public URL
    const viewPostLink = page.locator(`a[href="/posts/${testSlug}"]`, { hasText: 'View post' })
    await expect(viewPostLink).toBeVisible()
  })
})
