import fs from 'fs'
import path from 'path'
import { getAllSlideshows, getSlideshowById, slideshowExists } from '@/lib/slides'
import type { SlideShow } from '@/lib/slides'

// Mock fs module
jest.mock('fs')
const mockFs = fs as jest.Mocked<typeof fs>

// Mock path module
jest.mock('path')
const mockPath = path as jest.Mocked<typeof path>

describe('Slides Library', () => {
  const mockSlideshowsDir = '/mock/slideshows'
  const mockSlideshow: SlideShow = {
    id: 'test-slideshow',
    title: 'Test Slideshow',
    slides: [
      {
        type: 'title',
        title: 'Test Title',
        content: 'Test content',
        notes: 'Test notes'
      },
      {
        type: 'content',
        title: 'Content Slide',
        content: 'This is content'
      },
      {
        type: 'code',
        title: 'Code Example',
        code: {
          language: 'javascript',
          content: 'console.log("Hello World");'
        }
      },
      {
        type: 'image',
        title: 'Image Slide',
        image: {
          src: '/test-image.png',
          alt: 'Test image',
          caption: 'Test caption'
        }
      }
    ],
    metadata: {
      author: 'Test Author',
      date: '2025-01-15',
      tags: ['test', 'slideshow'],
      totalSlides: 4,
      generatedAt: '2025-01-15T10:00:00Z',
      sourcePost: 'test-post'
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock process.cwd()
    jest.spyOn(process, 'cwd').mockReturnValue('/mock')
    // Mock path.join
    mockPath.join.mockImplementation((...args) => args.join('/'))
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('getAllSlideshows', () => {
    it('should return empty array when slideshows directory does not exist', () => {
      mockFs.existsSync.mockReturnValue(false)
      
      const result = getAllSlideshows()
      
      expect(result).toEqual([])
      expect(mockFs.existsSync).toHaveBeenCalledWith(mockSlideshowsDir)
    })

    it('should return array of slideshows when directory exists', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['test-slideshow.json', 'another-slideshow.json'] as any)
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockSlideshow))
      
      const result = getAllSlideshows()
      
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(mockSlideshow)
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(2)
    })

    it('should sort slideshows by date (most recent first)', () => {
      const olderSlideshow = { ...mockSlideshow, metadata: { ...mockSlideshow.metadata, date: '2025-01-10' } }
      const newerSlideshow = { ...mockSlideshow, metadata: { ...mockSlideshow.metadata, date: '2025-01-20' } }
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['older.json', 'newer.json'] as any)
      mockFs.readFileSync
        .mockReturnValueOnce(JSON.stringify(olderSlideshow))
        .mockReturnValueOnce(JSON.stringify(newerSlideshow))
      
      const result = getAllSlideshows()
      
      expect(result[0].metadata.date).toBe('2025-01-20')
      expect(result[1].metadata.date).toBe('2025-01-10')
    })

    it('should handle and log JSON parse errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['valid.json', 'invalid.json'] as any)
      mockFs.readFileSync
        .mockReturnValueOnce(JSON.stringify(mockSlideshow))
        .mockReturnValueOnce('invalid json')
      
      const result = getAllSlideshows()
      
      expect(result).toHaveLength(1)
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error loading slideshow invalid.json:'),
        expect.any(Error)
      )
      
      consoleSpy.mockRestore()
    })

    it('should only process .json files', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['slideshow.json', 'readme.txt', 'config.yaml'] as any)
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockSlideshow))
      
      const result = getAllSlideshows()
      
      expect(result).toHaveLength(1)
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(1)
    })
  })

  describe('getSlideshowById', () => {
    it('should return slideshow when file exists', () => {
      const mockFilePath = `${mockSlideshowsDir}/test-slideshow.json`
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockSlideshow))
      
      const result = getSlideshowById('test-slideshow')
      
      expect(result).toEqual(mockSlideshow)
      expect(mockFs.existsSync).toHaveBeenCalledWith(mockFilePath)
      expect(mockFs.readFileSync).toHaveBeenCalledWith(mockFilePath, 'utf8')
    })

    it('should return null when file does not exist', () => {
      mockFs.existsSync.mockReturnValue(false)
      
      const result = getSlideshowById('nonexistent-slideshow')
      
      expect(result).toBeNull()
      expect(mockFs.readFileSync).not.toHaveBeenCalled()
    })

    it('should handle and log JSON parse errors', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('invalid json')
      
      const result = getSlideshowById('test-slideshow')
      
      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error loading slideshow test-slideshow:'),
        expect.any(Error)
      )
      
      consoleSpy.mockRestore()
    })
  })

  describe('slideshowExists', () => {
    it('should return true when slideshow file exists', () => {
      mockFs.existsSync.mockReturnValue(true)
      
      const result = slideshowExists('test-slideshow')
      
      expect(result).toBe(true)
      expect(mockFs.existsSync).toHaveBeenCalledWith(`${mockSlideshowsDir}/test-slideshow.json`)
    })

    it('should return false when slideshow file does not exist', () => {
      mockFs.existsSync.mockReturnValue(false)
      
      const result = slideshowExists('nonexistent-slideshow')
      
      expect(result).toBe(false)
    })
  })

  describe('SlideShow interface validation', () => {
    it('should support all slide types', () => {
      const slideshow: SlideShow = {
        id: 'test',
        title: 'Test Slideshow',
        slides: [
          { type: 'title', title: 'Title Slide', content: 'Content', notes: 'Notes' },
          { type: 'content', title: 'Content Slide', content: 'Some content' },
          { type: 'code', title: 'Code Slide', code: { language: 'js', content: 'code here' } },
          { type: 'image', title: 'Image Slide', image: { src: '/img.png', alt: 'Alt text' } }
        ],
        metadata: {
          date: '2025-01-15',
          tags: ['test'],
          totalSlides: 4
        }
      }
      
      expect(slideshow.slides[0].type).toBe('title')
      expect(slideshow.slides[1].type).toBe('content')
      expect(slideshow.slides[2].type).toBe('code')
      expect(slideshow.slides[3].type).toBe('image')
    })

    it('should support optional metadata fields', () => {
      const slideshow: SlideShow = {
        id: 'test',
        title: 'Test',
        slides: [],
        metadata: {
          author: 'Test Author',
          date: '2025-01-15',
          tags: ['test'],
          totalSlides: 0,
          generatedAt: '2025-01-15T10:00:00Z',
          sourcePost: 'original-post'
        }
      }
      
      expect(slideshow.metadata.author).toBe('Test Author')
      expect(slideshow.metadata.generatedAt).toBe('2025-01-15T10:00:00Z')
      expect(slideshow.metadata.sourcePost).toBe('original-post')
    })
  })
})