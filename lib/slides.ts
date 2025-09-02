import fs from 'fs'
import path from 'path'

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
    generatedAt?: string
    sourcePost?: string
  }
}

/**
 * Get all available slideshows from static JSON files
 */
export function getAllSlideshows(): SlideShow[] {
  const slideshowsDir = path.join(process.cwd(), 'slideshows')
  
  if (!fs.existsSync(slideshowsDir)) {
    return []
  }
  
  const files = fs.readdirSync(slideshowsDir)
  const slideshows: SlideShow[] = []
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      try {
        const filePath = path.join(slideshowsDir, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const slideshow = JSON.parse(fileContent) as SlideShow
        slideshows.push(slideshow)
      } catch (error) {
        console.error(`Error loading slideshow ${file}:`, error)
      }
    }
  }
  
  // Sort by date (most recent first)
  return slideshows.sort((a, b) => 
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
}

/**
 * Get slideshow by ID from static JSON file
 */
export function getSlideshowById(id: string): SlideShow | null {
  const slideshowsDir = path.join(process.cwd(), 'slideshows')
  const filePath = path.join(slideshowsDir, `${id}.json`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent) as SlideShow
  } catch (error) {
    console.error(`Error loading slideshow ${id}:`, error)
    return null
  }
}

/**
 * Check if a slideshow exists for a given ID
 */
export function slideshowExists(id: string): boolean {
  const slideshowsDir = path.join(process.cwd(), 'slideshows')
  const filePath = path.join(slideshowsDir, `${id}.json`)
  return fs.existsSync(filePath)
}