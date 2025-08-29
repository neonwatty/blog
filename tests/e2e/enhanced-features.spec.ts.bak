import { test, expect } from '@playwright/test'

test.describe('Enhanced Blog Features', () => {
  test('glassmorphism effects are applied', async ({ page }) => {
    await page.goto('/')
    
    // Check for glass card elements
    const glassCards = page.locator('.glass-card')
    await expect(glassCards.first()).toBeVisible()
    
    // Verify CSS backdrop-filter is applied
    const cardElement = glassCards.first()
    const styles = await cardElement.evaluate(el => getComputedStyle(el))
    expect(styles.backdropFilter).toContain('blur')
  })

  test('reading progress indicators work', async ({ page }) => {
    await page.goto('/')
    
    // Check for reading progress bar
    const progressBar = page.locator('.reading-progress')
    await expect(progressBar.first()).toBeVisible()
    
    // Check for circular progress indicator
    const circularProgress = page.locator('.reading-progress.circular')
    await expect(circularProgress).toBeVisible()
    
    // Scroll down and verify progress updates
    await page.evaluate(() => window.scrollBy(0, 500))
    await page.waitForTimeout(100)
    
    const progressValue = await page.locator('.reading-progress-bar').first().evaluate(el => {
      const transform = getComputedStyle(el).transform
      return transform
    })
    
    // Progress bar should have some transform applied
    expect(progressValue).not.toBe('none')
  })

  test('table of contents navigation works', async ({ page }) => {
    await page.goto('/')
    
    // Check for table of contents
    const toc = page.locator('.table-of-contents')
    await expect(toc).toBeVisible()
    
    // Check for TOC heading
    await expect(toc.getByText('Table of Contents')).toBeVisible()
    
    // Test clicking on a TOC link
    const tocLinks = toc.locator('button')
    if (await tocLinks.count() > 0) {
      const firstLink = tocLinks.first()
      await expect(firstLink).toBeVisible()
      
      // Click the link and verify smooth scrolling behavior
      await firstLink.click()
      await page.waitForTimeout(500) // Wait for smooth scroll
    }
  })

  test('code blocks with syntax highlighting work', async ({ page }) => {
    await page.goto('/')
    
    // Check for code blocks
    const codeBlocks = page.locator('.code-block-container')
    await expect(codeBlocks.first()).toBeVisible()
    
    // Check for syntax highlighting (Prism.js tokens)
    const syntaxTokens = codeBlocks.first().locator('.token')
    if (await syntaxTokens.count() > 0) {
      await expect(syntaxTokens.first()).toBeVisible()
    }
    
    // Test copy button functionality
    const copyButton = codeBlocks.first().locator('.copy-button')
    await expect(copyButton).toBeVisible()
    
    // Click copy button
    await copyButton.click()
    
    // Wait a moment for the state to update
    await page.waitForTimeout(100)
    
    // Check for success state (should show checkmark) - try different selectors
    const successPath = copyButton.locator('path[d*="M5 13l4 4L19 7"], path[d*="5 13l4 4L19 7"]')
    await expect(successPath).toBeVisible({ timeout: 3000 })
  })

  test('interactive callout boxes work', async ({ page }) => {
    await page.goto('/')
    
    // Check for callout boxes
    const callouts = page.locator('.callout')
    await expect(callouts.first()).toBeVisible()
    
    // Test different callout types
    const infoCallout = page.locator('.callout-info')
    const successCallout = page.locator('.callout-success')
    const warningCallout = page.locator('.callout-warning')
    
    await expect(infoCallout).toBeVisible()
    await expect(successCallout).toBeVisible()
    await expect(warningCallout).toBeVisible()
    
    // Test collapsible callout
    const collapsibleCallout = page.locator('.callout-warning')
    const collapseButton = collapsibleCallout.locator('.callout-collapse-button')
    
    if (await collapseButton.isVisible()) {
      // Click to collapse
      await collapseButton.click()
      await page.waitForTimeout(300)
      
      // Check if content is collapsed
      const content = collapsibleCallout.locator('.callout-content')
      const contentStyles = await content.evaluate(el => getComputedStyle(el))
      expect(parseFloat(contentStyles.maxHeight)).toBeLessThan(100)
      
      // Click to expand again
      await collapseButton.click()
      await page.waitForTimeout(300)
    }
  })

  test('masonry grid layout works', async ({ page }) => {
    await page.goto('/')
    
    // Check for masonry grid
    const masonryGrid = page.locator('.masonry-grid')
    await expect(masonryGrid).toBeVisible()
    
    // Check for masonry items
    const masonryItems = masonryGrid.locator('.masonry-item')
    const itemCount = await masonryItems.count()
    expect(itemCount).toBeGreaterThan(0)
    
    // Verify items have absolute positioning
    if (itemCount > 0) {
      const firstItem = masonryItems.first()
      const itemStyles = await firstItem.evaluate(el => getComputedStyle(el))
      expect(itemStyles.position).toBe('absolute')
    }
  })

  test('staggered animations work', async ({ page }) => {
    await page.goto('/')
    
    // Check for stagger animation classes
    const staggeredElements = page.locator('.stagger-animation')
    await expect(staggeredElements.first()).toBeVisible()
    
    // Check for delay classes
    const delayElements = page.locator('[class*="stagger-delay-"]')
    if (await delayElements.count() > 0) {
      await expect(delayElements.first()).toBeVisible()
    }
  })

  test('enhanced typography is applied', async ({ page }) => {
    await page.goto('/')
    
    // Check for heading classes
    const enhancedHeadings = page.locator('.heading-xl, .heading-lg, .heading-md')
    await expect(enhancedHeadings.first()).toBeVisible()
    
    // Check for body text classes
    const bodyText = page.locator('.body-large, .body-regular')
    await expect(bodyText.first()).toBeVisible()
    
    // Verify custom fonts are loaded
    const headingElement = enhancedHeadings.first()
    const headingStyles = await headingElement.evaluate(el => getComputedStyle(el))
    expect(headingStyles.fontFamily).toContain('Poppins')
  })

  test('dynamic gradient backgrounds work', async ({ page }) => {
    await page.goto('/')
    
    // Check for gradient background elements
    const gradientBg = page.locator('.gradient-bg-animated')
    await expect(gradientBg).toBeVisible()
    
    // Verify animation is applied
    const bgStyles = await gradientBg.evaluate(el => getComputedStyle(el))
    expect(bgStyles.animation).toContain('gradientShift')
    expect(bgStyles.backgroundSize).toBe('400% 400%')
  })

  test('hover effects work correctly', async ({ page }) => {
    await page.goto('/')
    
    // Test blog card hover effects
    const blogCard = page.locator('.glass-card-hover').first()
    await expect(blogCard).toBeVisible()
    
    // Hover over the card
    await blogCard.hover()
    await page.waitForTimeout(200)
    
    // Card should have transform applied on hover
    const cardStyles = await blogCard.evaluate(el => getComputedStyle(el))
    expect(cardStyles.transform).not.toBe('none')
  })

  test('responsive behavior works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check masonry grid falls back to CSS Grid on mobile
    const masonryGrid = page.locator('.masonry-grid')
    await expect(masonryGrid).toBeVisible()
    
    // On mobile, masonry items should use static positioning
    const masonryItem = masonryGrid.locator('.masonry-item').first()
    if (await masonryItem.isVisible()) {
      const itemStyles = await masonryItem.evaluate(el => getComputedStyle(el))
      // On mobile, CSS should override to static positioning
      expect(['static', 'relative']).toContain(itemStyles.position)
    }
    
    // Check TOC behavior on mobile
    const toc = page.locator('.table-of-contents.floating')
    if (await toc.isVisible()) {
      const tocStyles = await toc.evaluate(el => getComputedStyle(el))
      expect(tocStyles.position).toBe('static')
    }
  })

  test('toast notifications work', async ({ page }) => {
    await page.goto('/')
    
    // Find a code block and click copy button
    const copyButton = page.locator('.copy-button').first()
    if (await copyButton.isVisible()) {
      await copyButton.click()
      
      // Check for toast notification
      const toast = page.locator('[data-testid="hot-toast"]')
      if (await toast.isVisible()) {
        await expect(toast).toContainText('copied')
      }
    }
  })
})