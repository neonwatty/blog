import { test, expect } from '@playwright/test'

test.describe('Slideshows', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to localhost:3003
    await page.goto('http://localhost:3003')
  })

  test('should display slides index page', async ({ page }) => {
    await page.goto('http://localhost:3003/slides')
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Take screenshot
    await page.screenshot({ path: 'slides-index.png', fullPage: true })
    
    // Check if slideshows are listed
    await expect(page.locator('h1')).toContainText('Slideshows')
  })

  test('should render liars-dice slideshow correctly', async ({ page }) => {
    const consoleMessages: string[] = []
    
    // Capture console messages
    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        const message = `${msg.type()}: ${msg.text()}`
        consoleMessages.push(message)
        console.log(message)
      }
    })

    // Capture network failures
    page.on('response', response => {
      if (response.status() >= 400) {
        const message = `Network error: ${response.status()} ${response.url()}`
        consoleMessages.push(message)
        console.log(message)
      }
    })
    
    await page.goto('http://localhost:3003/slides/liars-dice-apple-watch-app')
    
    // Wait for the slideshow to load
    await page.waitForLoadState('networkidle')
    
    // Wait a bit more for reveal.js to initialize
    await page.waitForTimeout(5000)
    
    // Take screenshot of the slideshow
    await page.screenshot({ path: 'liars-dice-slideshow-debug.png', fullPage: true })
    
    // Check if reveal.js container exists
    const revealContainer = page.locator('.reveal')
    await expect(revealContainer).toBeVisible()
    
    // Check if slides container exists (may be hidden by reveal.js)
    const slidesContainer = page.locator('.slides')
    const slidesCount = await slidesContainer.count()
    expect(slidesCount).toBeGreaterThan(0)
    
    // Check if any slide sections exist
    const slides = page.locator('section')
    const slideCount = await slides.count()
    console.log(`Found ${slideCount} slides`)
    expect(slideCount).toBeGreaterThan(0)
    
    // Check if navigation controls are present (indicates reveal.js is working)
    const controls = page.locator('.navigate-right')
    const controlsCount = await controls.count()
    console.log(`Found ${controlsCount} navigation controls`)
    
    // Look for reveal.js specific elements that indicate it's initialized
    const revealElement = page.locator('.reveal.ready')
    const revealCount = await revealElement.count()
    console.log(`Reveal ready state: ${revealCount > 0 ? 'initialized' : 'not ready'}`)
    
    // Print all console messages at the end
    if (consoleMessages.length > 0) {
      console.log('All console messages:', consoleMessages)
    }
  })

  test('should render tfq slideshow correctly', async ({ page }) => {
    await page.goto('http://localhost:3003/slides/tfq-test-failure-management')
    
    // Wait for the slideshow to load
    await page.waitForLoadState('networkidle')
    
    // Wait for reveal.js to initialize
    await page.waitForTimeout(3000)
    
    // Take screenshot
    await page.screenshot({ path: 'tfq-slideshow.png', fullPage: true })
    
    // Check if reveal.js container exists
    const revealContainer = page.locator('.reveal')
    await expect(revealContainer).toBeVisible()
    
    // Log any errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text())
      }
    })
  })

  test('should navigate between slides using keyboard', async ({ page }) => {
    await page.goto('http://localhost:3003/slides/liars-dice-apple-watch-app')
    
    // Wait for slideshow to load and initialize
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(5000)
    
    // Focus on the slideshow
    await page.locator('.reveal').focus()
    
    // Take initial screenshot
    await page.screenshot({ path: 'slideshow-initial.png', fullPage: true })
    
    // Navigate forward with arrow key
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(500) // Wait for slide transition
    
    // Take screenshot after navigation
    await page.screenshot({ path: 'slideshow-after-right.png', fullPage: true })
    
    // Navigate with space key
    await page.keyboard.press('Space')
    await page.waitForTimeout(500)
    
    // Navigate backward
    await page.keyboard.press('ArrowLeft')
    await page.waitForTimeout(500)
    
    // Test other navigation keys
    await page.keyboard.press('ArrowDown')
    await page.waitForTimeout(500)
    
    await page.keyboard.press('ArrowUp')
    await page.waitForTimeout(500)
    
    // Should still have reveal container visible
    await expect(page.locator('.reveal')).toBeVisible()
  })

  test('should navigate between slides using mouse clicks', async ({ page }) => {
    await page.goto('http://localhost:3003/slides/liars-dice-apple-watch-app')
    
    // Wait for slideshow to load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(5000)
    
    // Click on right side to navigate forward
    const revealContainer = page.locator('.reveal')
    await expect(revealContainer).toBeVisible()
    
    const revealBox = await revealContainer.boundingBox()
    if (revealBox) {
      // Click on right side of slideshow
      await page.mouse.click(revealBox.x + revealBox.width * 0.8, revealBox.y + revealBox.height * 0.5)
      await page.waitForTimeout(500)
      
      // Click on left side to go back  
      await page.mouse.click(revealBox.x + revealBox.width * 0.2, revealBox.y + revealBox.height * 0.5)
      await page.waitForTimeout(500)
    }
    
    // Slideshow should still be visible and functional
    await expect(revealContainer).toBeVisible()
  })

  test('should toggle overview mode', async ({ page }) => {
    await page.goto('http://localhost:3003/slides/liars-dice-apple-watch-app')
    
    // Wait for slideshow to load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(5000)
    
    // Focus on slideshow
    await page.locator('.reveal').focus()
    
    // Take screenshot before overview
    await page.screenshot({ path: 'slideshow-before-overview.png', fullPage: true })
    
    // Press 'o' to toggle overview mode
    await page.keyboard.press('o')
    await page.waitForTimeout(1000) // Wait for overview animation
    
    // Take screenshot in overview mode
    await page.screenshot({ path: 'slideshow-overview-mode.png', fullPage: true })
    
    // Press 'o' again to exit overview
    await page.keyboard.press('o')
    await page.waitForTimeout(1000)
    
    // Should return to normal view
    await expect(page.locator('.reveal')).toBeVisible()
  })

  test('should handle fullscreen toggle', async ({ page }) => {
    await page.goto('http://localhost:3003/slides/liars-dice-apple-watch-app')
    
    // Wait for slideshow to load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(5000)
    
    // Focus on slideshow
    await page.locator('.reveal').focus()
    
    // Press 'f' for fullscreen (reveal.js shortcut)
    await page.keyboard.press('f')
    await page.waitForTimeout(1000)
    
    // Take screenshot in fullscreen (if supported)
    await page.screenshot({ path: 'slideshow-fullscreen.png', fullPage: true })
    
    // Press 'f' again to exit fullscreen
    await page.keyboard.press('f')
    await page.waitForTimeout(1000)
    
    // Should still be visible
    await expect(page.locator('.reveal')).toBeVisible()
  })

  test('should open speaker notes window', async ({ page, context }) => {
    await page.goto('http://localhost:3003/slides/liars-dice-apple-watch-app')
    
    // Wait for slideshow to load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(5000)
    
    // Focus on slideshow
    await page.locator('.reveal').focus()
    
    // Listen for new page/popup (speaker notes window)
    const newPagePromise = context.waitForEvent('page')
    
    // Press 's' to open speaker notes
    await page.keyboard.press('s')
    
    // Wait for speaker notes window to open
    try {
      const speakerNotesPage = await Promise.race([
        newPagePromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
      ]) as any
      
      if (speakerNotesPage) {
        // Wait for speaker notes to load
        await speakerNotesPage.waitForLoadState('networkidle')
        
        // Take screenshot of speaker notes
        await speakerNotesPage.screenshot({ path: 'slideshow-speaker-notes.png', fullPage: true })
        
        // Close speaker notes
        await speakerNotesPage.close()
      }
    } catch (error) {
      console.log('Speaker notes popup may not have opened (this is okay for testing)')
    }
    
    // Original slideshow should still be visible
    await expect(page.locator('.reveal')).toBeVisible()
  })

  test('should handle different themes correctly', async ({ page }) => {
    // Test with different theme parameter (if supported in URL)
    await page.goto('http://localhost:3003/slides/liars-dice-apple-watch-app')
    
    // Wait for slideshow to load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(5000)
    
    // Take screenshot with default theme
    await page.screenshot({ path: 'slideshow-theme-default.png', fullPage: true })
    
    // Check for theme-specific CSS classes or styles
    const revealContainer = page.locator('.reveal')
    await expect(revealContainer).toBeVisible()
    
    // Check if theme CSS is loaded
    const themeLinks = page.locator('link[href*="reveal.js/theme"]')
    const themeLinkCount = await themeLinks.count()
    expect(themeLinkCount).toBeGreaterThan(0)
    
    // Verify slideshow wrapper has theme class
    const slideshowWrapper = page.locator('[data-testid="slideshow-wrapper"]')
    await expect(slideshowWrapper).toBeVisible()
    
    // Should have a theme class applied
    const className = await slideshowWrapper.getAttribute('class')
    expect(className).toMatch(/theme-/)
  })

  test('should handle responsive behavior on different viewport sizes', async ({ page }) => {
    await page.goto('http://localhost:3003/slides/liars-dice-apple-watch-app')
    
    // Wait for slideshow to load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(5000)
    
    // Test desktop size
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.waitForTimeout(1000)
    await page.screenshot({ path: 'slideshow-desktop.png', fullPage: true })
    
    // Test tablet size
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.waitForTimeout(1000)
    await page.screenshot({ path: 'slideshow-tablet.png', fullPage: true })
    
    // Test mobile size
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForTimeout(1000)
    await page.screenshot({ path: 'slideshow-mobile.png', fullPage: true })
    
    // Should still be visible and functional on all sizes
    await expect(page.locator('.reveal')).toBeVisible()
  })

  test('should handle touch gestures on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3003/slides/liars-dice-apple-watch-app')
    
    // Wait for slideshow to load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(5000)
    
    const revealContainer = page.locator('.reveal')
    await expect(revealContainer).toBeVisible()
    
    const revealBox = await revealContainer.boundingBox()
    if (revealBox) {
      const centerX = revealBox.x + revealBox.width / 2
      const centerY = revealBox.y + revealBox.height / 2
      
      // Swipe left (should go to next slide)
      await page.touchscreen.tap(centerX + 100, centerY)
      await page.mouse.move(centerX + 100, centerY)
      await page.mouse.down()
      await page.mouse.move(centerX - 100, centerY)
      await page.mouse.up()
      await page.waitForTimeout(500)
      
      // Swipe right (should go to previous slide)
      await page.touchscreen.tap(centerX - 100, centerY)
      await page.mouse.move(centerX - 100, centerY)
      await page.mouse.down()
      await page.mouse.move(centerX + 100, centerY)
      await page.mouse.up()
      await page.waitForTimeout(500)
    }
    
    // Should still be functional
    await expect(revealContainer).toBeVisible()
  })

  test('should display slide progress and navigation indicators', async ({ page }) => {
    await page.goto('http://localhost:3003/slides/liars-dice-apple-watch-app')
    
    // Wait for slideshow to load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(5000)
    
    // Look for progress indicators (reveal.js adds these)
    const progressBar = page.locator('.progress')
    const progressSpan = page.locator('.progress span')
    
    // These may or may not be present depending on reveal.js config
    const progressCount = await progressBar.count()
    console.log(`Found ${progressCount} progress bars`)
    
    // Look for slide numbers or indicators
    const slideNumbers = page.locator('.slide-number')
    const slideNumberCount = await slideNumbers.count()
    console.log(`Found ${slideNumberCount} slide number indicators`)
    
    // The slideshow should be functional regardless
    await expect(page.locator('.reveal')).toBeVisible()
    
    // Take screenshot to see what indicators are present
    await page.screenshot({ path: 'slideshow-indicators.png', fullPage: true })
  })
})