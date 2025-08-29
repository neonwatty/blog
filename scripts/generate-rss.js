const fs = require('fs')
const path = require('path')

// We need to dynamically import the ESM module
async function importRSSModule() {
  const module = await import('../lib/rss.ts')
  return module.generateRSSFiles || module.default?.generateRSSFiles
}

async function generateFeeds() {
  try {
    console.log('Generating RSS feeds...')
    
    const generateRSSFiles = await importRSSModule()
    const feeds = await generateRSSFiles()
    const outputDir = path.join(process.cwd(), 'public')
    
    // Ensure public directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    // Write RSS feeds
    fs.writeFileSync(path.join(outputDir, 'rss.xml'), feeds.rss)
    console.log('✅ Generated RSS 2.0 feed: public/rss.xml')
    
    fs.writeFileSync(path.join(outputDir, 'rss.json'), feeds.json)
    console.log('✅ Generated JSON feed: public/rss.json')
    
    fs.writeFileSync(path.join(outputDir, 'atom.xml'), feeds.atom)
    console.log('✅ Generated Atom feed: public/atom.xml')
    
    console.log('🎉 All RSS feeds generated successfully!')
  } catch (error) {
    console.error('❌ Error generating RSS feeds:', error)
    process.exit(1)
  }
}

generateFeeds()