const { getPostData } = require('./lib/posts');

async function debugRealHTML() {
  console.log('🔍 Debugging Real HTML Output...\n');
  
  try {
    console.log('📖 Loading post data...');
    const post = await getPostData('building-neural-networks-from-scratch');
    
    if (post) {
      console.log('✅ Post loaded successfully');
      console.log(`📄 Title: ${post.title}`);
      console.log(`📏 Content length: ${post.content.length} characters\n`);
      
      // Look for the first few code blocks
      const codeBlockMatches = [...post.content.matchAll(/<div class="code-block-container">[\s\S]*?<\/div>/g)];
      console.log(`🔍 Found ${codeBlockMatches.length} code-block-container elements\n`);
      
      if (codeBlockMatches.length > 0) {
        console.log('📋 FIRST CODE BLOCK HTML:');
        console.log('=========================');
        const firstBlock = codeBlockMatches[0][0];
        console.log(firstBlock.substring(0, 800) + (firstBlock.length > 800 ? '...' : ''));
        
        // Check for language badges
        const languageBadgeMatch = firstBlock.match(/<span class="language-badge">([^<]*)<\/span>/);
        console.log(`\n🏷️  Language badge found: ${languageBadgeMatch ? languageBadgeMatch[1] : 'NONE'}`);
        
        // Check for language classes
        const languageClassMatch = firstBlock.match(/class="language-(\w+)"/);
        console.log(`🎯 Language class found: ${languageClassMatch ? languageClassMatch[1] : 'NONE'}`);
        
        // Check for tokens
        const tokenMatches = [...firstBlock.matchAll(/class="[^"]*token[^"]*"/g)];
        console.log(`🌈 Token classes found: ${tokenMatches.length}`);
        
        if (tokenMatches.length > 0) {
          console.log('   Sample tokens:', tokenMatches.slice(0, 5).map(m => m[0]).join(', '));
        }
      }
      
      // Also check what the raw markdown processing produces
      console.log('\n🔍 CHECKING RAW REMARK OUTPUT...');
      console.log('================================');
      
      // Let's look at what HTML structures exist before our enhancement
      const preMatches = [...post.content.matchAll(/<pre[^>]*>[\s\S]*?<\/pre>/g)];
      console.log(`📦 Total <pre> elements in final HTML: ${preMatches.length}`);
      
      // Look for any direct language classes
      const directLanguageMatches = [...post.content.matchAll(/class="[^"]*language-(\w+)[^"]*"/g)];
      console.log(`🎯 Direct language- classes found: ${directLanguageMatches.length}`);
      if (directLanguageMatches.length > 0) {
        const languages = [...new Set(directLanguageMatches.map(m => m[1]))];
        console.log(`   Languages detected: ${languages.join(', ')}`);
      }
      
    } else {
      console.log('❌ Post not found');
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

debugRealHTML().catch(console.error);