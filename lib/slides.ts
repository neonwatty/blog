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
  const lines = content.split('\n')
  let currentSlide: Partial<Slide> = {}
  let currentContent: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Handle headers (create new slides)
    if (line.match(/^##\s+(.+)/)) {
      // Save previous slide
      if (currentSlide.title || currentContent.length > 0) {
        slides.push(createSlideFromBuffer(currentSlide, currentContent))
      }
      
      // Start new slide
      currentSlide = {
        type: 'content',
        title: line.replace(/^##\s+/, '')
      }
      currentContent = []
    }
    // Handle code blocks
    else if (line.match(/^```(\w+)?/)) {
      const language = line.match(/^```(\w+)?/)?.[1] || 'text'
      const codeLines: string[] = []
      i++ // Skip opening ```
      
      while (i < lines.length && !lines[i].match(/^```$/)) {
        codeLines.push(lines[i])
        i++
      }
      
      // Create code slide
      if (currentSlide.title || currentContent.length > 0) {
        slides.push(createSlideFromBuffer(currentSlide, currentContent))
      }
      
      slides.push({
        type: 'code',
        title: currentSlide.title || 'Code',
        code: {
          language,
          content: codeLines.join('\n')
        }
      })
      
      currentSlide = {}
      currentContent = []
    }
    // Handle images
    else if (line.match(/!\[([^\]]*)\]\(([^)]+)\)/)) {
      const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/)
      if (match) {
        const [, alt, src] = match
        
        slides.push({
          type: 'image',
          title: currentSlide.title,
          image: {
            src,
            alt,
            caption: alt
          }
        })
        
        currentSlide = {}
        currentContent = []
      }
    }
    // Regular content
    else if (line.trim()) {
      currentContent.push(line)
    }
    // Empty lines - potential slide breaks
    else if (currentContent.length > 0) {
      currentContent.push('')
    }
  }

  // Handle remaining content
  if (currentSlide.title || currentContent.length > 0) {
    slides.push(createSlideFromBuffer(currentSlide, currentContent))
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