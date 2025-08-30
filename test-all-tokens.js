const { chromium } = require('playwright');

async function testAllTokenTypes() {
  console.log('🌈 Testing All Token Types with Colors...\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3003/posts/building-neural-networks-from-scratch');
    await page.waitForLoadState('networkidle');
    
    // Find all unique token types
    const tokenAnalysis = await page.evaluate(() => {
      const allTokens = Array.from(document.querySelectorAll('.code-block-container .token'));
      const tokenTypes = {};
      
      allTokens.forEach(token => {
        const classes = token.className.split(' ').filter(c => c.startsWith('token'));
        const mainTokenClass = classes.find(c => c !== 'token') || 'token';
        
        if (!tokenTypes[mainTokenClass]) {
          const styles = getComputedStyle(token);
          tokenTypes[mainTokenClass] = {
            color: styles.color,
            count: 0,
            sample: token.textContent.substring(0, 15).trim() || '[empty]'
          };
        }
        tokenTypes[mainTokenClass].count++;
      });
      
      return tokenTypes;
    });
    
    console.log('🎨 TOKEN TYPES AND COLORS:');
    console.log('==========================');
    
    Object.entries(tokenAnalysis)
      .sort(([,a], [,b]) => b.count - a.count) // Sort by count descending
      .forEach(([tokenType, data]) => {
        const colorName = getColorName(data.color);
        console.log(`🏷️  .${tokenType}:`);
        console.log(`   Color: ${data.color} ${colorName}`);
        console.log(`   Count: ${data.count}`);
        console.log(`   Sample: "${data.sample}"`);
        console.log('');
      });
      
    console.log(`📊 Total unique token types: ${Object.keys(tokenAnalysis).length}`);
    console.log(`🔢 Total tokens: ${Object.values(tokenAnalysis).reduce((sum, data) => sum + data.count, 0)}`);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

function getColorName(rgbColor) {
  const colorMap = {
    'rgb(107, 114, 128)': '(text-tertiary - gray)',
    'rgb(55, 65, 81)': '(text-secondary - dark gray)', 
    'rgb(79, 70, 229)': '(accent-hover - indigo)',
    'rgb(99, 102, 241)': '(accent-primary - bright indigo)',
    'rgb(34, 197, 94)': '(green)',
    'rgb(139, 92, 246)': '(purple)',
    'rgb(245, 158, 11)': '(yellow/orange)',
    'rgb(239, 68, 68)': '(red)',
    'rgb(17, 24, 39)': '(text-primary - black)'
  };
  
  return colorMap[rgbColor] || '';
}

testAllTokenTypes().catch(console.error);