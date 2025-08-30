const { chromium } = require('playwright');

async function debugSyntaxColors() {
  console.log('🎨 Debugging Syntax Highlighting Colors...\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3003/posts/building-neural-networks-from-scratch');
    await page.waitForLoadState('networkidle');
    
    // Check token colors specifically
    const tokenAnalysis = await page.evaluate(() => {
      const codeBlock = document.querySelector('.code-block-container');
      if (!codeBlock) return { found: false };
      
      const tokens = Array.from(codeBlock.querySelectorAll('.token')).slice(0, 10);
      const tokenData = tokens.map(token => {
        const styles = getComputedStyle(token);
        return {
          className: token.className,
          textContent: token.textContent.substring(0, 20),
          color: styles.color,
          backgroundColor: styles.backgroundColor,
          fontWeight: styles.fontWeight
        };
      });
      
      // Check if our custom CSS rules exist
      const allStyles = Array.from(document.styleSheets).flatMap(sheet => {
        try {
          return Array.from(sheet.cssRules || []).map(rule => rule.cssText);
        } catch (e) {
          return [];
        }
      });
      
      const prismRules = allStyles.filter(rule => 
        rule.includes('.code-block-container .token') ||
        rule.includes('.token.comment') ||
        rule.includes('.token.keyword') ||
        rule.includes('.token.string')
      );
      
      return {
        found: true,
        tokenCount: tokens.length,
        tokenData,
        customPrismRules: prismRules.length,
        sampleRules: prismRules.slice(0, 3)
      };
    });
    
    console.log('🔍 TOKEN COLOR ANALYSIS:');
    console.log('========================');
    
    if (tokenAnalysis.found) {
      console.log(`📊 Tokens found: ${tokenAnalysis.tokenCount}`);
      console.log(`🎨 Custom Prism rules: ${tokenAnalysis.customPrismRules}`);
      
      console.log('\n🏷️  TOKEN DETAILS:');
      tokenAnalysis.tokenData.forEach((token, i) => {
        console.log(`   ${i + 1}. ${token.className}`);
        console.log(`      Text: "${token.textContent}"`);
        console.log(`      Color: ${token.color}`);
        console.log(`      Background: ${token.backgroundColor}`);
        console.log(`      Font Weight: ${token.fontWeight}`);
        console.log('');
      });
      
      if (tokenAnalysis.sampleRules.length > 0) {
        console.log('📋 SAMPLE CSS RULES:');
        tokenAnalysis.sampleRules.forEach((rule, i) => {
          console.log(`   ${i + 1}. ${rule}`);
        });
      } else {
        console.log('❌ No custom Prism CSS rules found!');
      }
      
      // Check CSS variables
      const cssVars = await page.evaluate(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        return {
          accentPrimary: rootStyles.getPropertyValue('--color-accent-primary').trim(),
          textPrimary: rootStyles.getPropertyValue('--color-text-primary').trim(),
          textSecondary: rootStyles.getPropertyValue('--color-text-secondary').trim(),
          textTertiary: rootStyles.getPropertyValue('--color-text-tertiary').trim()
        };
      });
      
      console.log('\n🎨 CSS VARIABLES:');
      console.log('=================');
      Object.entries(cssVars).forEach(([key, value]) => {
        console.log(`   ${key}: ${value}`);
      });
      
    } else {
      console.log('❌ No code blocks found');
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await browser.close();
  }
}

debugSyntaxColors().catch(console.error);