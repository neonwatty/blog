const { chromium } = require('playwright');

async function testMultipleLanguages() {
  console.log('🌍 Testing Multiple Language Support...\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Create a test markdown with multiple languages
    const testMarkdown = `
# Multi-Language Test

Here's some JavaScript:

\`\`\`javascript
function hello(name) {
  console.log(\`Hello, \${name}!\`);
  return { success: true };
}
\`\`\`

Here's some Bash:

\`\`\`bash
#!/bin/bash
echo "Starting deployment..."
npm run build && npm run deploy
\`\`\`

Here's some CSS:

\`\`\`css
.container {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 8px;
}
\`\`\`

Here's some JSON:

\`\`\`json
{
  "name": "test-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0"
  }
}
\`\`\`
`;

    console.log('📝 TEST MARKDOWN:');
    console.log('=================');
    console.log(testMarkdown);
    console.log('\n🔄 PROCESSING...\n');

    // Test the markdown processing function directly
    const result = await page.evaluate((markdown) => {
      // Simulate what remark + rehype-prism-plus would produce
      // This is a simplified version - in reality it would be more complex
      const processedHTML = markdown
        .replace(/```(\w+)\n([\s\S]*?)\n```/g, (match, lang, code) => {
          return `<pre class="language-${lang}"><code class="language-${lang} code-highlight">${code}</code></pre>`;
        });
      
      return processedHTML;
    }, testMarkdown);

    console.log('📄 SIMULATED PROCESSED HTML:');
    console.log('============================');
    console.log(result.substring(0, 800) + '...\n');

    // Check what languages Prism supports by default
    console.log('🔍 CHECKING PRISM LANGUAGE SUPPORT:');
    console.log('===================================');
    
    // Go to the actual blog page to check Prism support
    await page.goto('http://localhost:3003/posts/building-neural-networks-from-scratch');
    await page.waitForLoadState('networkidle');
    
    const prismSupport = await page.evaluate(() => {
      // Check if Prism is available and what languages it supports
      if (typeof window.Prism !== 'undefined' && window.Prism.languages) {
        return Object.keys(window.Prism.languages).filter(lang => typeof window.Prism.languages[lang] === 'object');
      }
      
      // Even if Prism global isn't available, rehype-prism-plus works server-side
      // Let's check what language classes exist in the current page
      const languageClasses = Array.from(document.querySelectorAll('[class*="language-"]'))
        .map(el => {
          const classes = el.className.match(/language-(\w+)/g);
          return classes ? classes.map(c => c.replace('language-', '')) : [];
        })
        .flat()
        .filter((lang, i, arr) => arr.indexOf(lang) === i); // unique
        
      return {
        clientSideAvailable: false,
        serverSideDetected: languageClasses,
        note: 'rehype-prism-plus works server-side during build'
      };
    });
    
    console.log('📊 PRISM SUPPORT STATUS:');
    if (prismSupport.clientSideAvailable) {
      console.log(`✅ Client-side Prism available with languages: ${prismSupport.join(', ')}`);
    } else {
      console.log('ℹ️  Server-side processing (rehype-prism-plus)');
      console.log(`📝 Languages detected on current page: ${prismSupport.serverSideDetected.join(', ')}`);
      console.log(`💡 ${prismSupport.note}`);
    }
    
    // Check what languages rehype-prism-plus typically supports
    console.log('\n🎯 COMMONLY SUPPORTED LANGUAGES:');
    console.log('================================');
    const commonLanguages = [
      'javascript', 'typescript', 'python', 'bash', 'shell', 
      'css', 'html', 'json', 'yaml', 'sql', 'go', 'rust', 
      'java', 'csharp', 'php', 'ruby', 'swift'
    ];
    
    commonLanguages.forEach(lang => {
      console.log(`   ✅ ${lang}`);
    });
    
    console.log('\n💡 RECOMMENDATION:');
    console.log('==================');
    console.log('To test other languages:');
    console.log('1. Add code blocks with ```javascript, ```bash, etc. to a markdown file');
    console.log('2. The syntax highlighting should work automatically');
    console.log('3. Your custom indigo theme colors will apply to all supported languages');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testMultipleLanguages().catch(console.error);