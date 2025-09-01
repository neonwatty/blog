import { PostData } from './posts'

export interface Slide {
  type: 'title' | 'content' | 'image' | 'code'
  title?: string
  content?: string
  code?: {
    language: string
    content: string
  }
  image?: {
    src: string
    alt: string
    caption?: string
  }
  notes?: string
}

export interface SlideShow {
  id: string
  title: string
  slides: Slide[]
  metadata: {
    author?: string
    date: string
    tags: string[]
    totalSlides: number
  }
}

/**
 * Convert a blog post to a slideshow format
 */
export function convertPostToSlideshow(post: PostData): SlideShow {
  const slides: Slide[] = []
  
  // Title slide
  slides.push({
    type: 'title',
    title: post.title,
    content: post.excerpt,
    notes: `Published on ${post.date}. Tags: ${post.tags?.join(', ')}`
  })

  // Split content by headers and paragraphs
  const contentSections = parseContentIntoSlides(post.content)
  slides.push(...contentSections)

  return {
    id: post.id,
    title: post.title,
    slides,
    metadata: {
      author: post.author,
      date: post.date,
      tags: post.tags || [],
      totalSlides: slides.length
    }
  }
}

/**
 * Parse markdown content into slide sections
 */
function parseContentIntoSlides(content: string): Slide[] {
  const slides: Slide[] = []
  
  // First, let's split the content into logical sections
  // We'll use paragraphs as natural slide boundaries
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
 * Create a slide from accumulated content
 */
function createSlideFromBuffer(slide: Partial<Slide>, content: string[]): Slide {
  return {
    type: slide.type || 'content',
    title: slide.title,
    content: content.join('\n').trim(),
    ...slide
  }
}

/**
 * Get all available slideshows (from existing posts)
 */
export function getAllSlideshows(posts: PostData[]): SlideShow[] {
  return posts.map(convertPostToSlideshow)
}

/**
 * Get slideshow by ID
 */
export function getSlideshowById(id: string, posts: PostData[]): SlideShow | null {
  const post = posts.find(p => p.id === id)
  return post ? convertPostToSlideshow(post) : null
}