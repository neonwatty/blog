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
})