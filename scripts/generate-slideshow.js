#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// Ensure slideshows directory exists
const slideshowsDir = path.join(process.cwd(), 'slideshows')
if (!fs.existsSync(slideshowsDir)) {
  fs.mkdirSync(slideshowsDir, { recursive: true })
}

/**
 * Parse markdown content into slide sections
 */
function parseContentIntoSlides(content) {
  const slides = []
  
  // Split the content into logical sections
  const paragraphs = content.split('\n\n').filter(p => p.trim())
  
  let slideContent = ''
  let slideCount = 0
  const maxContentLength = 300 // Characters per slide for readability
  
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim()
    
    // Skip empty paragraphs
    if (!paragraph) continue
    
    // Handle code blocks
    if (paragraph.startsWith('```')) {
      // If we have content, save it as a slide first
      if (slideContent.trim()) {
        slides.push({
          type: 'content',
          title: `Slide ${slideCount + 1}`,
          content: slideContent.trim()
        })
        slideContent = ''
        slideCount++
      }
      
      // Extract code block
      const lines = paragraph.split('\n')
      const language = lines[0].replace('```', '') || 'text'
      const codeContent = lines.slice(1, -1).join('\n') // Remove ``` lines
      
      slides.push({
        type: 'code',
        title: `Code Example`,
        code: {
          language,
          content: codeContent
        }
      })
      slideCount++
      continue
    }
    
    // Handle images
    const imageMatch = paragraph.match(/!\[([^\]]*)\]\(([^)]+)\)/)
    if (imageMatch) {
      // Save current content if any
      if (slideContent.trim()) {
        slides.push({
          type: 'content', 
          title: `Slide ${slideCount + 1}`,
          content: slideContent.trim()
        })
        slideContent = ''
        slideCount++
      }
      
      const [, alt, src] = imageMatch
      slides.push({
        type: 'image',
        title: alt || 'Image',
        image: {
          src,
          alt,
          caption: alt
        }
      })
      slideCount++
      continue
    }
    
    // Regular content - accumulate until we have enough for a slide
    const potentialContent = slideContent + (slideContent ? '\n\n' : '') + paragraph
    
    // If adding this paragraph would make the slide too long, finish current slide
    if (potentialContent.length > maxContentLength && slideContent.trim()) {
      slides.push({
        type: 'content',
        title: `Slide ${slideCount + 1}`, 
        content: slideContent.trim()
      })
      slideContent = paragraph
      slideCount++
    } else {
      slideContent = potentialContent
    }
  }
  
  // Handle any remaining content
  if (slideContent.trim()) {
    slides.push({
      type: 'content',
      title: `Slide ${slideCount + 1}`,
      content: slideContent.trim()
    })
  }
  
  return slides
}

/**
 * Convert a blog post to a slideshow format
 */
async function convertPostToSlideshow(postData, postId) {
  const slides = []
  
  // Title slide
  slides.push({
    type: 'title',
    title: postData.title,
    content: postData.excerpt || '',
    notes: `Published on ${postData.date}. Tags: ${(postData.tags || []).join(', ')}`
  })

  // Split content by headers and paragraphs
  const contentSections = parseContentIntoSlides(postData.content)
  slides.push(...contentSections)

  return {
    id: postId,
    title: postData.title,
    slides,
    metadata: {
      author: postData.author,
      date: postData.date,
      tags: postData.tags || [],
      totalSlides: slides.length,
      generatedAt: new Date().toISOString(),
      sourcePost: postId
    }
  }
}

/**
 * Generate slideshow from a blog post
 */
async function generateSlideshow(postId) {
  try {
    // Read the blog post
    const postsDir = path.join(process.cwd(), 'posts')
    const postPath = path.join(postsDir, `${postId}.md`)
    
    if (!fs.existsSync(postPath)) {
      console.error(`Error: Post '${postId}' not found at ${postPath}`)
      process.exit(1)
    }
    
    const fileContents = fs.readFileSync(postPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // For slideshow generation, we'll work with the raw markdown content
    // since the parsing logic handles markdown-specific patterns
    const postData = {
      ...data,
      content: content
    }
    
    // Convert to slideshow
    const slideshow = await convertPostToSlideshow(postData, postId)
    
    // Write to slideshows directory
    const slideshowPath = path.join(slideshowsDir, `${postId}.json`)
    fs.writeFileSync(slideshowPath, JSON.stringify(slideshow, null, 2))
    
    console.log(`✅ Slideshow generated successfully!`)
    console.log(`📁 Output: ${slideshowPath}`)
    console.log(`📊 Total slides: ${slideshow.slides.length}`)
    console.log(`🔗 View at: http://localhost:3000/slides/${postId}`)
    
  } catch (error) {
    console.error('Error generating slideshow:', error.message)
    process.exit(1)
  }
}

// CLI usage
if (require.main === module) {
  const postId = process.argv[2]
  
  if (!postId) {
    console.error('Usage: npm run generate:slideshow <post-id>')
    console.error('Example: npm run generate:slideshow liars-dice-apple-watch-app')
    process.exit(1)
  }
  
  generateSlideshow(postId)
}

module.exports = { generateSlideshow, convertPostToSlideshow }