const { chromium } = require('playwright');

async function checkPythonSyntax() {
  console.log('🐍 Checking Python Syntax Highlighting...\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3003/posts/building-neural-networks-from-scratch');
    await page.waitForLoadState('networkidle');
    
    // Check for language detection and syntax highlighting
    const codeBlockAnalysis = await page.evaluate(() => {
      const codeBlocks = document.querySelectorAll('.code-block-container');
      const results = [];
      
      codeBlocks.forEach((block, index) => {
        const codeElement = block.querySelector('code');
        const languageBadge = block.querySelector('.language-badge');
        const preElement = block.querySelector('pre');
        
        // Check for Prism classes
        const hasPrismClasses = codeElement ? 
          Array.from(codeElement.classList).some(cls => cls.startsWith('language-')) : false;
        
        // Check for syntax highlighting tokens
        const syntaxTokens = codeElement ? 
          codeElement.querySelectorAll('.token, [class*="token-"]').length : 0;
        
        // Get code content sample
        const codeContent = codeElement ? codeElement.textContent.substring(0, 100) : 'No code found';
        
        // Check if it looks like Python
        const looksLikePython = /^(import|def|class|if|for|while|\w+\s*=|#)/m.test(codeContent);
        
        results.push({
          index: index + 1,
          languageBadge: languageBadge ? languageBadge.textContent : 'None',
          hasPrismClasses,
          prismClasses: codeElement ? Array.from(codeElement.classList).join(' ') : 'None',
          syntaxTokens,
          looksLikePython,
          codePreview: codeContent.substring(0, 50) + (codeContent.length > 50 ? '...' : '')
        });
      });
      
      return {
        totalBlocks: codeBlocks.length,
        results
      };
    });
    
    console.log(`📊 FOUND ${codeBlockAnalysis.totalBlocks} CODE BLOCKS:\n`);
    
    codeBlockAnalysis.results.forEach(block => {
      console.log(`🔢 Block ${block.index}:`);
      console.log(`   📛 Language Badge: ${block.languageBadge}`);
      console.log(`   🎨 Has Prism Classes: ${block.hasPrismClasses}`);
      console.log(`   🏷️  Prism Classes: ${block.prismClasses}`);
      console.log(`   🌈 Syntax Tokens: ${block.syntaxTokens}`);
      console.log(`   🐍 Looks Like Python: ${block.looksLikePython}`);
      console.log(`   📝 Code Preview: ${block.codePreview}`);
      console.log('');
    });
    
    // Check for Prism library loading
    const prismStatus = await page.evaluate(() => {
      return {
        prismGlobal: typeof window.Prism !== 'undefined',
        prismHighlight: typeof window.Prism?.highlight === 'function',
        prismLanguages: window.Prism?.languages ? Object.keys(window.Prism.languages).slice(0, 10) : []
      };
    });
    
    console.log('🔍 PRISM LIBRARY STATUS:');
    console.log('========================');
    console.log(`   📚 Prism Global Available: ${prismStatus.prismGlobal}`);
    console.log(`   🎨 Prism Highlight Function: ${prismStatus.prismHighlight}`);
    console.log(`   🌐 Available Languages: ${prismStatus.prismLanguages.join(', ')}`);
    
    // Test one specific Python block if found
    const pythonTest = codeBlockAnalysis.results.find(block => 
      block.looksLikePython && block.languageBadge === 'PYTHON'
    );
    
    if (pythonTest) {
      console.log('\n🧪 TESTING SPECIFIC PYTHON BLOCK:');
      console.log('==================================');
      
      const detailedTest = await page.evaluate((blockIndex) => {
        const codeBlock = document.querySelectorAll('.code-block-container')[blockIndex - 1];
        const codeElement = codeBlock.querySelector('code');
        
        if (codeElement) {
          // Get all the token elements
          const tokens = Array.from(codeElement.querySelectorAll('*')).map(el => ({
            tagName: el.tagName,
            className: el.className,
            textContent: el.textContent.substring(0, 20)
          }));
          
          return {
            innerHTML: codeElement.innerHTML.substring(0, 500),
            tokens: tokens.slice(0, 10), // First 10 tokens
            computedStyle: {
              color: getComputedStyle(codeElement).color,
              fontFamily: getComputedStyle(codeElement).fontFamily
            }
          };
        }
        return null;
      }, pythonTest.index);
      
      if (detailedTest) {
        console.log(`   📄 HTML Sample: ${detailedTest.innerHTML.substring(0, 200)}...`);
        console.log(`   🎯 Tokens Found: ${detailedTest.tokens.length}`);
        console.log(`   🎨 Text Color: ${detailedTest.computedStyle.color}`);
        console.log(`   🔤 Font Family: ${detailedTest.computedStyle.fontFamily}`);
        
        if (detailedTest.tokens.length > 0) {
          console.log('   🏷️  Sample Tokens:');
          detailedTest.tokens.forEach((token, i) => {
            console.log(`      ${i + 1}. <${token.tagName}> .${token.className} "${token.textContent}"`);
          });
        }
      }
    } else {
      console.log('\n⚠️  No Python blocks found with proper language detection');
    }
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
  } finally {
    await browser.close();
  }
}

checkPythonSyntax().catch(console.error);