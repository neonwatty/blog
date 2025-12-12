import { chromium, devices } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Viewports to test
const viewports = [
  { name: 'mobile-320', width: 320, height: 568 },   // iPhone SE
  { name: 'mobile-375', width: 375, height: 667 },   // iPhone 8
  { name: 'mobile-414', width: 414, height: 896 },   // iPhone 11 Pro Max
  { name: 'tablet-768', width: 768, height: 1024 },  // iPad
  { name: 'desktop-1024', width: 1024, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

// Pages to capture
const pages = [
  { name: 'home', path: '/' },
  { name: 'posts', path: '/posts' },
  { name: 'projects', path: '/projects' },
  { name: 'about', path: '/about' },
];

async function captureScreenshots() {
  const outputDir = path.join(process.cwd(), 'screenshots');

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Starting visual testing...');
  console.log(`📁 Screenshots will be saved to: ${outputDir}`);
  console.log(`🌐 Testing against: ${BASE_URL}\n`);

  const browser = await chromium.launch();

  for (const viewport of viewports) {
    console.log(`\n📱 Testing viewport: ${viewport.name} (${viewport.width}x${viewport.height})`);

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2, // Retina quality
    });

    const page = await context.newPage();

    for (const pageConfig of pages) {
      const url = `${BASE_URL}${pageConfig.path}`;
      console.log(`  📸 Capturing: ${pageConfig.name}`);

      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

        // Wait for any animations to settle
        await page.waitForTimeout(500);

        // Full page screenshot
        const filename = `${viewport.name}_${pageConfig.name}.png`;
        await page.screenshot({
          path: path.join(outputDir, filename),
          fullPage: true,
        });

        // Also capture above-the-fold only
        const foldFilename = `${viewport.name}_${pageConfig.name}_fold.png`;
        await page.screenshot({
          path: path.join(outputDir, foldFilename),
          fullPage: false,
        });

      } catch (error) {
        console.error(`  ❌ Error capturing ${pageConfig.name}: ${error}`);
      }
    }

    await context.close();
  }

  // Also test with mobile menu open (for header testing)
  console.log('\n📱 Testing mobile menu open state...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2,
  });
  const mobilePage = await mobileContext.newPage();

  try {
    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(500);

    // Click hamburger menu if it exists
    const menuButton = mobilePage.locator('button[aria-label="Open menu"]');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await mobilePage.waitForTimeout(300);
      await mobilePage.screenshot({
        path: path.join(outputDir, 'mobile-375_menu-open.png'),
        fullPage: false,
      });
      console.log('  📸 Captured: mobile menu open');
    }
  } catch (error) {
    console.error(`  ❌ Error capturing mobile menu: ${error}`);
  }

  await mobileContext.close();
  await browser.close();

  console.log('\n✅ Visual testing complete!');
  console.log(`📁 Screenshots saved to: ${outputDir}`);

  // List all screenshots
  const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.png'));
  console.log(`\n📋 Generated ${files.length} screenshots:`);
  files.forEach(f => console.log(`   - ${f}`));
}

captureScreenshots().catch(console.error);
