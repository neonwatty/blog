const { chromium } = require('playwright');

async function debugContent() {
  console.log('🐛 Debugging Content Rendering...\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3003/posts/building-neural-networks-from-scratch');
    await page.waitForLoadState('networkidle');
    
    // Get the full HTML of the content area
    const contentHTML = await page.evaluate(() => {
      const article = document.querySelector('article');
      return article ? article.innerHTML : 'No article found';
    });
    
    console.log('📄 ARTICLE HTML (first 1000 chars):');
    console.log('====================================');
    console.log(contentHTML.substring(0, 1000) + '...\n');
    
    // Check specifically for code-related elements
    const codeElements = await page.evaluate(() => {
      const elements = {
        pre: document.querySelectorAll('pre').length,
        code: document.querySelectorAll('code').length,
        codeBlocks: document.querySelectorAll('.code-block-container').length,
        prismElements: document.querySelectorAll('[class*="language-"]').length,
        dangerouslySetInnerHTML: document.querySelector('[dangerouslysetinnerhtml]') !== null,
        proseContent: document.querySelector('.prose-content') !== null
      };
      
      // Get sample of actual content
      const proseContentElement = document.querySelector('.prose-content');
      const sampleContent = proseContentElement ? 
        proseContentElement.innerHTML.substring(0, 500) : 'No prose content found';
        
      return { elements, sampleContent };
    });
    
    console.log('🔍 CODE ELEMENTS ANALYSIS:');
    console.log('=========================');
    console.log(`Pre elements: ${codeElements.elements.pre}`);
    console.log(`Code elements: ${codeElements.elements.code}`);
    console.log(`Code block containers: ${codeElements.elements.codeBlocks}`);
    console.log(`Prism elements: ${codeElements.elements.prismElements}`);
    console.log(`Has dangerouslySetInnerHTML: ${codeElements.elements.dangerouslySetInnerHTML}`);
    console.log(`Has prose-content class: ${codeElements.elements.proseContent}`);
    
    console.log('\n📝 SAMPLE CONTENT:');
    console.log('==================');
    console.log(codeElements.sampleContent);
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await browser.close();
  }
}

debugContent().catch(console.error);