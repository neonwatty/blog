const { remark } = require('remark');
const remarkRehype = require('remark-rehype');
const rehypePrismPlus = require('rehype-prism-plus');
const rehypeStringify = require('rehype-stringify');

const sampleMarkdown = `
## Test

Here's some Python code:

\`\`\`python
def hello():
    print("Hello world!")
    return 42
\`\`\`

And some JavaScript:

\`\`\`javascript  
function hello() {
    console.log("Hello world!");
    return 42;
}
\`\`\`
`;

async function debugMarkdown() {
  console.log('🔍 Debugging Markdown Processing...\n');
  
  try {
    console.log('📝 ORIGINAL MARKDOWN:');
    console.log('====================');
    console.log(sampleMarkdown);
    
    console.log('\n🔄 PROCESSING WITH REMARK + REHYPE-PRISM-PLUS...\n');
    
    const processed = await remark()
      .use(remarkRehype)
      .use(rehypePrismPlus, {
        ignoreMissing: true,
        showLineNumbers: false
      })
      .use(rehypeStringify)
      .process(sampleMarkdown);
      
    const html = processed.toString();
    
    console.log('📄 PROCESSED HTML:');
    console.log('==================');
    console.log(html);
    
    // Check for language classes
    const pythonMatch = html.match(/language-python/);
    const jsMatch = html.match(/language-javascript/);
    const tokenMatch = html.match(/token/g);
    
    console.log('\n🔍 ANALYSIS:');
    console.log('===========');
    console.log(`Python language class found: ${pythonMatch ? 'YES' : 'NO'}`);
    console.log(`JavaScript language class found: ${jsMatch ? 'YES' : 'NO'}`);
    console.log(`Token classes found: ${tokenMatch ? tokenMatch.length : 0}`);
    
  } catch (error) {
    console.error('❌ Processing failed:', error);
  }
}

debugMarkdown().catch(console.error);