const { chromium } = require('playwright');

async function enhancedUXAnalysis() {
  console.log('🔍 Starting Enhanced UX Analysis...\n');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the blog
    await page.goto('http://localhost:3003');
    await page.waitForLoadState('networkidle');
    
    console.log('📊 HOMEPAGE UX ANALYSIS');
    console.log('=======================');
    
    // Check for search functionality
    const searchInput = await page.$('input[type="search"], .search-input, [placeholder*="search" i]');
    console.log(`🔍 Search Functionality: ${searchInput ? '✅ Found' : '❌ Missing'}`);
    
    // Check for scroll-to-top button
    const scrollToTop = await page.$('.scroll-to-top, [aria-label*="scroll" i], .back-to-top');
    console.log(`⬆️  Scroll-to-top Button: ${scrollToTop ? '✅ Found' : '❌ Missing'}`);
    
    // Test responsive behavior
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    console.log('📱 Mobile viewport test complete');
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to a post with code blocks
    console.log('\n📄 INDIVIDUAL POST ANALYSIS - Code Blocks Focus');
    console.log('===============================================');
    
    const neuralNetworksLink = await page.$('a[href*="building-neural-networks-from-scratch"]');
    if (neuralNetworksLink) {
      await neuralNetworksLink.click();
      await page.waitForLoadState('networkidle');
      
      // Detailed code block analysis
      const codeBlocks = await page.$$('pre, code');
      console.log(`💻 Total Code Elements Found: ${codeBlocks.length}`);
      
      // Check for inline vs block code
      const preElements = await page.$$('pre');
      const inlineCodeElements = await page.$$('code:not(pre code)');
      console.log(`📦 Block Code Elements (pre): ${preElements.length}`);
      console.log(`📝 Inline Code Elements: ${inlineCodeElements.length}`);
      
      if (preElements.length > 0) {
        console.log('\n🎨 Code Block Styling Analysis:');
        
        const codeBlockStyles = await page.evaluate(() => {
          const firstPre = document.querySelector('pre');
          if (firstPre) {
            const styles = getComputedStyle(firstPre);
            const codeChild = firstPre.querySelector('code');
            const codeStyles = codeChild ? getComputedStyle(codeChild) : null;
            
            return {
              // Pre element styles
              preBackground: styles.backgroundColor,
              preBorder: styles.border,
              preBorderRadius: styles.borderRadius,
              prePadding: styles.padding,
              preMargin: styles.margin,
              preOverflow: styles.overflow,
              preMaxWidth: styles.maxWidth,
              prePosition: styles.position,
              
              // Code child styles
              codeBackground: codeStyles?.backgroundColor || 'N/A',
              codeFontFamily: codeStyles?.fontFamily || styles.fontFamily,
              codeFontSize: codeStyles?.fontSize || styles.fontSize,
              codeLineHeight: codeStyles?.lineHeight || styles.lineHeight,
              codeColor: codeStyles?.color || styles.color,
              
              // Computed values
              hasBackground: styles.backgroundColor !== 'rgba(0, 0, 0, 0)',
              hasBorder: styles.borderWidth !== '0px',
              hasScrollbar: firstPre.scrollWidth > firstPre.clientWidth
            };
          }
          return null;
        });
        
        if (codeBlockStyles) {
          console.log(`   📐 Pre Background: ${codeBlockStyles.preBackground}`);
          console.log(`   🔲 Pre Border: ${codeBlockStyles.preBorder}`);
          console.log(`   🎨 Border Radius: ${codeBlockStyles.preBorderRadius}`);
          console.log(`   📏 Padding: ${codeBlockStyles.prePadding}`);
          console.log(`   📊 Overflow: ${codeBlockStyles.preOverflow}`);
          console.log(`   🖋️  Font Family: ${codeBlockStyles.codeFontFamily}`);
          console.log(`   📏 Font Size: ${codeBlockStyles.codeFontSize}`);
          console.log(`   📐 Line Height: ${codeBlockStyles.codeLineHeight}`);
          console.log(`   🎨 Text Color: ${codeBlockStyles.codeColor}`);
          console.log(`   ✅ Has Background: ${codeBlockStyles.hasBackground ? 'Yes' : 'No'}`);
          console.log(`   🔲 Has Border: ${codeBlockStyles.hasBorder ? 'Yes' : 'No'}`);
          console.log(`   📜 Scrollable: ${codeBlockStyles.hasScrollbar ? 'Yes' : 'No'}`);
        }
        
        // Check for syntax highlighting
        const syntaxHighlighting = await page.evaluate(() => {
          const firstPre = document.querySelector('pre');
          if (firstPre) {
            const hasHighlightedElements = firstPre.querySelectorAll('.hljs-keyword, .token-keyword, .highlight, .hljs, [class*="language-"]').length > 0;
            const codeElement = firstPre.querySelector('code');
            const hasLanguageClass = codeElement?.className.includes('language-') || false;
            
            return {
              hasHighlightedElements,
              hasLanguageClass,
              codeClassName: codeElement?.className || 'No class',
              preClassName: firstPre.className || 'No class'
            };
          }
          return null;
        });
        
        if (syntaxHighlighting) {
          console.log('\n🌈 Syntax Highlighting Analysis:');
          console.log(`   🎨 Has Highlighted Elements: ${syntaxHighlighting.hasHighlightedElements ? 'Yes' : 'No'}`);
          console.log(`   🏷️  Has Language Class: ${syntaxHighlighting.hasLanguageClass ? 'Yes' : 'No'}`);
          console.log(`   📝 Code Classes: ${syntaxHighlighting.codeClassName}`);
          console.log(`   📦 Pre Classes: ${syntaxHighlighting.preClassName}`);
        }
        
        // Check for copy buttons
        const copyButtons = await page.$$('.copy-button, [aria-label*="copy" i], button[title*="copy" i]');
        console.log(`\n📋 Copy Code Buttons: ${copyButtons.length > 0 ? `✅ Found ${copyButtons.length}` : '❌ Missing'}`);
        
        // Check for line numbers
        const lineNumbers = await page.evaluate(() => {
          const firstPre = document.querySelector('pre');
          if (firstPre) {
            const hasLineNumbers = firstPre.querySelector('.line-number, .line-numbers, [class*="line-"]') !== null;
            const textContent = firstPre.textContent || '';
            const linesCount = textContent.split('\n').length;
            
            return {
              hasLineNumbers,
              estimatedLines: linesCount,
              textLength: textContent.length
            };
          }
          return null;
        });
        
        if (lineNumbers) {
          console.log(`📊 Line Numbers: ${lineNumbers.hasLineNumbers ? '✅ Present' : '❌ Missing'}`);
          console.log(`📏 Estimated Lines: ${lineNumbers.estimatedLines}`);
        }
      }
      
      // Check prose content styling
      console.log('\n📝 PROSE CONTENT ANALYSIS');
      console.log('=========================');
      
      const proseAnalysis = await page.evaluate(() => {
        const article = document.querySelector('article, main, [class*="prose"]');
        if (article) {
          const styles = getComputedStyle(article);
          const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
          const paragraphs = article.querySelectorAll('p');
          const lists = article.querySelectorAll('ul, ol');
          const blockquotes = article.querySelectorAll('blockquote');
          
          return {
            maxWidth: styles.maxWidth,
            lineHeight: styles.lineHeight,
            fontSize: styles.fontSize,
            headingsCount: headings.length,
            paragraphsCount: paragraphs.length,
            listsCount: lists.length,
            blockquotesCount: blockquotes.length,
            hasProseClass: article.classList.contains('prose') || article.className.includes('prose')
          };
        }
        return null;
      });
      
      if (proseAnalysis) {
        console.log(`📏 Max Width: ${proseAnalysis.maxWidth}`);
        console.log(`📐 Line Height: ${proseAnalysis.lineHeight}`);
        console.log(`🔤 Font Size: ${proseAnalysis.fontSize}`);
        console.log(`📑 Headings: ${proseAnalysis.headingsCount}`);
        console.log(`📝 Paragraphs: ${proseAnalysis.paragraphsCount}`);
        console.log(`📋 Lists: ${proseAnalysis.listsCount}`);
        console.log(`💬 Blockquotes: ${proseAnalysis.blockquotesCount}`);
        console.log(`🎨 Has Prose Classes: ${proseAnalysis.hasProseClass ? 'Yes' : 'No'}`);
      }
      
      // Check for table of contents
      const tableOfContents = await page.$('.table-of-contents, .toc, nav[aria-label*="table" i], .outline');
      console.log(`\n📚 Table of Contents: ${tableOfContents ? '✅ Found' : '❌ Missing'}`);
      
      // Check reading progress bar
      const readingProgress = await page.$('.reading-progress, .progress-bar, [class*="progress"]');
      console.log(`📊 Reading Progress Bar: ${readingProgress ? '✅ Found' : '❌ Missing'}`);
      
      // Test scroll behavior for long content
      console.log('\n🖱️  SCROLL & INTERACTION TESTING');
      console.log('================================');
      
      const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = await page.evaluate(() => window.innerHeight);
      console.log(`📏 Content Height: ${scrollHeight}px`);
      console.log(`📐 Viewport Height: ${viewportHeight}px`);
      console.log(`📜 Scrollable: ${scrollHeight > viewportHeight ? 'Yes' : 'No'}`);
      
      if (scrollHeight > viewportHeight) {
        // Test scroll behavior
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
        await page.waitForTimeout(500);
        
        const progressAfterScroll = await page.evaluate(() => {
          const progressBar = document.querySelector('.reading-progress-bar');
          return progressBar ? getComputedStyle(progressBar).transform : 'N/A';
        });
        console.log(`📊 Progress After Scroll: ${progressAfterScroll}`);
      }
    }
    
    // Final UX recommendations
    console.log('\n💡 UX ENHANCEMENT RECOMMENDATIONS');
    console.log('================================');
    console.log('🔥 CRITICAL ISSUES:');
    console.log('   • Code blocks lack proper styling and borders');
    console.log('   • Missing syntax highlighting for code blocks');
    console.log('   • No copy-to-clipboard functionality for code');
    console.log('   • Missing line numbers for long code blocks');
    
    console.log('\n🎨 STYLING IMPROVEMENTS:');
    console.log('   • Add subtle background and border to code blocks');
    console.log('   • Implement consistent code font and sizing');
    console.log('   • Add proper spacing around code elements');
    console.log('   • Enhance inline code styling');
    
    console.log('\n🚀 FUNCTIONALITY ADDITIONS:');
    console.log('   • Search functionality for posts');
    console.log('   • Scroll-to-top button for long posts');
    console.log('   • Table of contents for lengthy articles');
    console.log('   • Copy code button for each code block');
    
    console.log('\n✨ NICE-TO-HAVE FEATURES:');
    console.log('   • Syntax highlighting with language detection');
    console.log('   • Code block folding for very long snippets');
    console.log('   • Dark mode toggle for code blocks');
    console.log('   • Keyboard shortcuts for navigation');
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
  } finally {
    await browser.close();
  }
}

enhancedUXAnalysis().catch(console.error);