import fs from 'fs'
import path from 'path'
import { jest } from '@jest/globals'

// Import the functions we want to test
// Note: Using dynamic import since the script uses CommonJS
let generateSlideshowModule: any

beforeAll(async () => {
  // Mock the required modules before importing
  jest.doMock('fs')
  jest.doMock('path')
  jest.doMock('gray-matter')
  
  generateSlideshowModule = await import('../../scripts/generate-slideshow.cjs')
})

describe('Generate Slideshow Script', () => {
  const mockPost = {
    title: 'Test Blog Post',
    date: '2025-01-15',
    excerpt: 'This is a test excerpt',
    tags: ['test', 'blog'],
    author: 'Test Author',
    content: `This is the first paragraph with some content.

Here is a second paragraph with more content.

\`\`\`javascript
function hello() {
  console.log("Hello World");
}
\`\`\`

This is content after the code block.

![Test Image](/test-image.png)

Final paragraph with some concluding thoughts.`
  }

  describe('convertPostToSlideshow', () => {
    it('should create a slideshow with title slide', async () => {
      const slideshow = await generateSlideshowModule.convertPostToSlideshow(mockPost, 'test-post')
      
      expect(slideshow.id).toBe('test-post')
      expect(slideshow.title).toBe('Test Blog Post')
      expect(slideshow.slides[0].type).toBe('title')
      expect(slideshow.slides[0].title).toBe('Test Blog Post')
      expect(slideshow.slides[0].content).toBe('This is a test excerpt')
    })

    it('should include metadata with generation info', async () => {
      const slideshow = await generateSlideshowModule.convertPostToSlideshow(mockPost, 'test-post')
      
      expect(slideshow.metadata.author).toBe('Test Author')
      expect(slideshow.metadata.date).toBe('2025-01-15')
      expect(slideshow.metadata.tags).toEqual(['test', 'blog'])
      expect(slideshow.metadata.totalSlides).toBeGreaterThan(0)
      expect(slideshow.metadata.generatedAt).toBeDefined()
      expect(slideshow.metadata.sourcePost).toBe('test-post')
    })

    it('should create content slides from paragraphs', async () => {
      const slideshow = await generateSlideshowModule.convertPostToSlideshow(mockPost, 'test-post')
      const contentSlides = slideshow.slides.filter((slide: any) => slide.type === 'content')
      
      expect(contentSlides.length).toBeGreaterThan(0)
      expect(contentSlides[0].title).toContain('Slide')
      expect(contentSlides[0].content).toBeDefined()
    })

    it('should create code slides from code blocks', async () => {
      const slideshow = await generateSlideshowModule.convertPostToSlideshow(mockPost, 'test-post')
      const codeSlides = slideshow.slides.filter((slide: any) => slide.type === 'code')
      
      expect(codeSlides.length).toBe(1)
      expect(codeSlides[0].title).toBe('Code Example')
      expect(codeSlides[0].code.language).toBe('javascript')
      expect(codeSlides[0].code.content).toContain('function hello()')
    })

    it('should create image slides from markdown images', async () => {
      const slideshow = await generateSlideshowModule.convertPostToSlideshow(mockPost, 'test-post')
      const imageSlides = slideshow.slides.filter((slide: any) => slide.type === 'image')
      
      expect(imageSlides.length).toBe(1)
      expect(imageSlides[0].title).toBe('Test Image')
      expect(imageSlides[0].image.src).toBe('/test-image.png')
      expect(imageSlides[0].image.alt).toBe('Test Image')
    })

    it('should handle posts with no tags', async () => {
      const postWithoutTags = { ...mockPost, tags: undefined }
      const slideshow = await generateSlideshowModule.convertPostToSlideshow(postWithoutTags, 'test-post')
      
      expect(slideshow.metadata.tags).toEqual([])
    })

    it('should handle posts with no excerpt', async () => {
      const postWithoutExcerpt = { ...mockPost, excerpt: undefined }
      const slideshow = await generateSlideshowModule.convertPostToSlideshow(postWithoutExcerpt, 'test-post')
      
      expect(slideshow.slides[0].content).toBe('')
    })
  })

  describe('content parsing', () => {
    it('should split long content into multiple slides', async () => {
      const longContent = 'a'.repeat(500) + '\n\n' + 'b'.repeat(500)
      const postWithLongContent = { ...mockPost, content: longContent }
      const slideshow = await generateSlideshowModule.convertPostToSlideshow(postWithLongContent, 'test-post')
      
      const contentSlides = slideshow.slides.filter((slide: any) => slide.type === 'content')
      expect(contentSlides.length).toBeGreaterThan(1)
    })

    it('should handle empty paragraphs', async () => {
      const contentWithEmptyParagraphs = 'First paragraph\n\n\n\nSecond paragraph'
      const postWithEmptyParagraphs = { ...mockPost, content: contentWithEmptyParagraphs }
      const slideshow = await generateSlideshowModule.convertPostToSlideshow(postWithEmptyParagraphs, 'test-post')
      
      // Should still create slides, ignoring empty paragraphs
      expect(slideshow.slides.length).toBeGreaterThan(1) // Title + content slides
    })

    it('should handle code blocks with no language specified', async () => {
      const contentWithPlainCodeBlock = 'Some text\n\n```\nplain code\n```\n\nMore text'
      const postWithPlainCode = { ...mockPost, content: contentWithPlainCodeBlock }
      const slideshow = await generateSlideshowModule.convertPostToSlideshow(postWithPlainCode, 'test-post')
      
      const codeSlides = slideshow.slides.filter((slide: any) => slide.type === 'code')
      expect(codeSlides.length).toBe(1)
      expect(codeSlides[0].code.language).toBe('text')
    })

    it('should handle images without alt text', async () => {
      const contentWithNoAltImage = 'Some text\n\n![](/no-alt-image.png)\n\nMore text'
      const postWithNoAlt = { ...mockPost, content: contentWithNoAltImage }
      const slideshow = await generateSlideshowModule.convertPostToSlideshow(postWithNoAlt, 'test-post')
      
      const imageSlides = slideshow.slides.filter((slide: any) => slide.type === 'image')
      expect(imageSlides.length).toBe(1)
      expect(imageSlides[0].title).toBe('Image')
      expect(imageSlides[0].image.alt).toBe('')
    })
  })

  describe('CLI integration', () => {
    it('should export the main functions', () => {
      expect(generateSlideshowModule.generateSlideshow).toBeDefined()
      expect(generateSlideshowModule.convertPostToSlideshow).toBeDefined()
    })
  })
})

// Integration tests would require actual file system operations
describe('Generate Slideshow Integration', () => {
  // These tests would be more complex and might require:
  // - Temporary directories
  // - Actual markdown files
  // - File system cleanup
  // For now, we'll focus on unit tests of the core logic
  
  it.todo('should generate slideshow file from actual markdown post')
  it.todo('should handle missing post files gracefully')
  it.todo('should create slideshows directory if it does not exist')
  it.todo('should output success message with correct file path')
})