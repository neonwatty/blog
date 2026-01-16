import { test, expect } from '@playwright/test'

/**
 * Mobile UX Tests
 *
 * These tests verify that interactive elements meet iOS Human Interface Guidelines
 * for minimum tap target sizes (44x44 points).
 *
 * Reference: https://developer.apple.com/design/human-interface-guidelines/accessibility
 */

const MINIMUM_TAP_TARGET = 44

// iPhone 16 viewport
const mobileViewport = {
  width: 393,
  height: 852,
}

test.describe('Mobile UX - Tap Targets', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(mobileViewport)
  })

  test('social icons have minimum 44px tap targets', async ({ page }) => {
    await page.goto('/')

    // Get all social link icons in the hero section
    const socialLinks = page.locator('a[aria-label]').filter({
      has: page.locator('svg'),
    })

    const count = await socialLinks.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const link = socialLinks.nth(i)
      const box = await link.boundingBox()

      if (box) {
        expect(box.width, `Social icon ${i} width should be >= ${MINIMUM_TAP_TARGET}px`).toBeGreaterThanOrEqual(MINIMUM_TAP_TARGET)
        expect(box.height, `Social icon ${i} height should be >= ${MINIMUM_TAP_TARGET}px`).toBeGreaterThanOrEqual(MINIMUM_TAP_TARGET)
      }
    }
  })

  test('tag badges have minimum 44px tap targets', async ({ page }) => {
    // Navigate to a blog post that has tags
    await page.goto('/posts/claude-code-workflow-testing-mcp')

    // Get all tag badges
    const tagBadges = page.locator('.tag-badge')

    const count = await tagBadges.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const badge = tagBadges.nth(i)
      const box = await badge.boundingBox()

      if (box) {
        expect(box.height, `Tag badge ${i} height should be >= ${MINIMUM_TAP_TARGET}px`).toBeGreaterThanOrEqual(MINIMUM_TAP_TARGET)
      }
    }
  })

  test('breadcrumb links have minimum 44px tap targets', async ({ page }) => {
    await page.goto('/posts/claude-code-workflow-testing-mcp')

    // Wait for content to load
    await page.waitForLoadState('domcontentloaded')

    // Get breadcrumb navigation links - look for links within any nav with Breadcrumb aria-label
    const breadcrumbNav = page.locator('nav[aria-label="Breadcrumb"]')
    await expect(breadcrumbNav).toBeVisible()

    const breadcrumbLinks = breadcrumbNav.locator('a')
    const count = await breadcrumbLinks.count()

    // There should be at least Home and Blog links
    expect(count).toBeGreaterThanOrEqual(1)

    for (let i = 0; i < count; i++) {
      const link = breadcrumbLinks.nth(i)
      const box = await link.boundingBox()

      if (box) {
        expect(box.height, `Breadcrumb link ${i} height should be >= ${MINIMUM_TAP_TARGET}px`).toBeGreaterThanOrEqual(MINIMUM_TAP_TARGET)
      }
    }
  })

  test('hamburger menu button has minimum 44px tap target', async ({ page }) => {
    await page.goto('/')

    // Get the mobile menu button
    const menuButton = page.locator('button[aria-label*="menu"]').first()
    await expect(menuButton).toBeVisible()

    const box = await menuButton.boundingBox()
    expect(box).toBeTruthy()

    if (box) {
      expect(box.width, 'Menu button width should be >= 44px').toBeGreaterThanOrEqual(MINIMUM_TAP_TARGET)
      expect(box.height, 'Menu button height should be >= 44px').toBeGreaterThanOrEqual(MINIMUM_TAP_TARGET)
    }
  })

  test('theme toggle button has minimum 44px tap target', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    // Get all theme toggle buttons and find the visible one
    const themeToggles = page.locator('button[aria-label*="Switch to"]')
    const count = await themeToggles.count()

    // Find the visible theme toggle (mobile viewport may hide desktop one)
    let visibleToggle = null
    for (let i = 0; i < count; i++) {
      const toggle = themeToggles.nth(i)
      if (await toggle.isVisible()) {
        visibleToggle = toggle
        break
      }
    }

    expect(visibleToggle, 'Should find a visible theme toggle').toBeTruthy()

    if (visibleToggle) {
      const box = await visibleToggle.boundingBox()
      expect(box).toBeTruthy()

      if (box) {
        expect(box.width, 'Theme toggle width should be >= 44px').toBeGreaterThanOrEqual(MINIMUM_TAP_TARGET)
        expect(box.height, 'Theme toggle height should be >= 44px').toBeGreaterThanOrEqual(MINIMUM_TAP_TARGET)
      }
    }
  })
})

test.describe('Mobile UX - Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(mobileViewport)
  })

  test('homepage has no horizontal overflow', async ({ page }) => {
    await page.goto('/')

    // Check that the body doesn't have horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })

    expect(hasHorizontalScroll, 'Page should not have horizontal overflow').toBe(false)
  })

  test('blog post page has no horizontal overflow', async ({ page }) => {
    await page.goto('/posts/claude-code-workflow-testing-mcp')

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })

    expect(hasHorizontalScroll, 'Page should not have horizontal overflow').toBe(false)
  })

  test('tag cards on tags page are touch-friendly', async ({ page }) => {
    await page.goto('/tags')

    // Get tag cards (the large clickable cards, not the small badges)
    const tagCards = page.locator('a').filter({
      hasText: /posts$/,
    })

    const count = await tagCards.count()

    if (count > 0) {
      const firstCard = tagCards.first()
      const box = await firstCard.boundingBox()

      if (box) {
        // Tag cards should be significantly larger than minimum tap target
        expect(box.height, 'Tag card should be comfortably tappable').toBeGreaterThanOrEqual(MINIMUM_TAP_TARGET)
      }
    }
  })
})

test.describe('Mobile UX - Typography', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(mobileViewport)
  })

  test('body text is at least 16px', async ({ page }) => {
    await page.goto('/posts/claude-code-workflow-testing-mcp')

    // Check the prose content area
    const proseContent = page.locator('.prose p').first()

    if (await proseContent.isVisible()) {
      const fontSize = await proseContent.evaluate((el) => {
        return parseFloat(window.getComputedStyle(el).fontSize)
      })

      expect(fontSize, 'Body text should be at least 16px for mobile readability').toBeGreaterThanOrEqual(16)
    }
  })
})
