const { chromium } = require('playwright');

async function testCodeRender() {
  console.log('🧪 Testing Code Block Rendering...\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3003/posts/building-neural-networks-from-scratch');
    await page.waitForLoadState('networkidle');
    
    // Get the innerHTML of the content area
    const proseContent = await page.evaluate(() => {
      const proseDiv = document.querySelector('.prose-content');
      if (proseDiv) {
        return {
          found: true,
          innerHTML: proseDiv.innerHTML.substring(0, 2000),
          codeBlocks: proseDiv.querySelectorAll('.code-block-container').length,
          preElements: proseDiv.querySelectorAll('pre').length,
          codeElements: proseDiv.querySelectorAll('code').length
        };
      }
      return { found: false };
    });
    
    console.log('📋 PROSE CONTENT ANALYSIS:');
    console.log('===========================');
    if (proseContent.found) {
      console.log(`✅ Prose content div found`);
      console.log(`📦 Code block containers: ${proseContent.codeBlocks}`);
      console.log(`🔲 Pre elements: ${proseContent.preElements}`);
      console.log(`💻 Code elements: ${proseContent.codeElements}`);
      
      console.log('\n📄 SAMPLE HTML CONTENT:');
      console.log('========================');
      console.log(proseContent.innerHTML.substring(0, 1000) + '...');
      
      if (proseContent.codeBlocks > 0) {
        // Test copy functionality
        console.log('\n🔧 TESTING COPY FUNCTIONALITY:');
        console.log('===============================');
        
        const copyTest = await page.evaluate(async () => {
          const copyButton = document.querySelector('.copy-button');
          if (copyButton) {
            // Check if copyCode function exists
            if (typeof window.copyCode === 'function') {
              return { buttonFound: true, functionExists: true };
            } else {
              return { buttonFound: true, functionExists: false };
            }
          }
          return { buttonFound: false };
        });
        
        console.log(`🔘 Copy button found: ${copyTest.buttonFound}`);
        console.log(`⚡ copyCode function exists: ${copyTest.functionExists}`);
        
        if (copyTest.buttonFound && copyTest.functionExists) {
          console.log('✅ Copy functionality should work');
        } else {
          console.log('❌ Copy functionality may not work');
        }
      }
      
      // Test reading progress
      console.log('\n📊 TESTING READING PROGRESS:');
      console.log('=============================');
      
      const progressTest = await page.evaluate(() => {
        const progressContainer = document.querySelector('.reading-progress');
        const progressBar = document.querySelector('.reading-progress-bar');
        
        if (progressContainer && progressBar) {
          const containerStyles = getComputedStyle(progressContainer);
          const barStyles = getComputedStyle(progressBar);
          
          return {
            found: true,
            containerPosition: containerStyles.position,
            containerTop: containerStyles.top,
            containerZIndex: containerStyles.zIndex,
            barTransform: barStyles.transform,
            barBackground: barStyles.background,
            barWidth: barStyles.width
          };
        }
        return { found: false };
      });
      
      if (progressTest.found) {
        console.log('✅ Reading progress elements found');
        console.log(`📐 Container position: ${progressTest.containerPosition}`);
        console.log(`⬆️  Container top: ${progressTest.containerTop}`);
        console.log(`🎯 Container z-index: ${progressTest.containerZIndex}`);
        console.log(`🔄 Bar transform: ${progressTest.barTransform}`);
        console.log(`🎨 Bar background: ${progressTest.barBackground}`);
        console.log(`📏 Bar width: ${progressTest.barWidth}`);
        
        // Test scrolling
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
        await page.waitForTimeout(500);
        
        const afterScrollTest = await page.evaluate(() => {
          const progressBar = document.querySelector('.reading-progress-bar');
          return progressBar ? getComputedStyle(progressBar).transform : 'Not found';
        });
        
        console.log(`📊 After scroll transform: ${afterScrollTest}`);
      } else {
        console.log('❌ Reading progress elements not found');
      }
    } else {
      console.log('❌ Prose content div not found');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testCodeRender().catch(console.error);