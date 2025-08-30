const { chromium } = require('playwright');

async function checkTokenClasses() {
  console.log('🔍 Checking Token Classes...\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3003/posts/building-neural-networks-from-scratch');
    await page.waitForLoadState('networkidle');
    
    // Get actual HTML of first code block
    const codeBlockHTML = await page.evaluate(() => {
      const codeBlock = document.querySelector('.code-block-container .code-pre code');
      return codeBlock ? codeBlock.innerHTML.substring(0, 1000) : 'Not found';
    });
    
    console.log('📄 FIRST CODE BLOCK HTML:');
    console.log('==========================');
    console.log(codeBlockHTML);
    console.log('');
    
    // Get all unique class combinations
    const tokenClasses = await page.evaluate(() => {
      const tokens = Array.from(document.querySelectorAll('.code-block-container span[class*="token"]'));
      const classMap = {};
      
      tokens.slice(0, 20).forEach((token, i) => {
        const styles = getComputedStyle(token);
        const key = token.className;
        
        if (!classMap[key]) {
          classMap[key] = {
            color: styles.color,
            sample: token.textContent.substring(0, 10),
            count: 0
          };
        }
        classMap[key].count++;
      });
      
      return classMap;
    });
    
    console.log('🏷️  TOKEN CLASSES (First 20 tokens):');
    console.log('====================================');
    Object.entries(tokenClasses).forEach(([className, data]) => {
      console.log(`${className}:`);
      console.log(`   Color: ${data.color}`);
      console.log(`   Sample: "${data.sample}"`);
      console.log(`   Count: ${data.count}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Check failed:', error);
  } finally {
    await browser.close();
  }
}

checkTokenClasses().catch(console.error);