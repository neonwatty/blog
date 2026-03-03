/**
 * @jest-environment node
 */
import fs from 'fs'

jest.mock('fs')

const mockedFs = jest.mocked(fs)

const mockSlideshow = {
  id: 'test-slideshow',
  title: 'Test Slideshow',
  slides: [
    { type: 'title', title: 'Welcome' },
    { type: 'content', content: 'Hello world' },
  ],
  metadata: {
    author: 'Test Author',
    date: '2025-02-01',
    tags: ['test'],
    totalSlides: 2,
  },
}

const mockSlideshow2 = {
  ...mockSlideshow,
  id: 'older-slideshow',
  title: 'Older Slideshow',
  metadata: { ...mockSlideshow.metadata, date: '2025-01-01' },
}

describe('lib/slides', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllSlideshows', () => {
    it('returns slideshows sorted by date descending', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['older.json', 'newer.json', 'readme.txt'] as unknown as ReturnType<
        typeof fs.readdirSync
      >)
      mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
        const p = String(filePath)
        if (p.includes('older')) return JSON.stringify(mockSlideshow2)
        if (p.includes('newer')) return JSON.stringify(mockSlideshow)
        return ''
      })

      const { getAllSlideshows } = require('@/lib/slides')
      const shows = getAllSlideshows()

      expect(shows).toHaveLength(2)
      expect(shows[0].metadata.date).toBe('2025-02-01') // newer first
      expect(shows[1].metadata.date).toBe('2025-01-01')
    })

    it('returns empty array when directory does not exist', () => {
      mockedFs.existsSync.mockReturnValue(false)

      const { getAllSlideshows } = require('@/lib/slides')
      expect(getAllSlideshows()).toEqual([])
    })

    it('skips non-JSON files', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['show.json', 'notes.md'] as unknown as ReturnType<typeof fs.readdirSync>)
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockSlideshow))

      const { getAllSlideshows } = require('@/lib/slides')
      expect(getAllSlideshows()).toHaveLength(1)
    })

    it('handles JSON parse errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['bad.json', 'good.json'] as unknown as ReturnType<typeof fs.readdirSync>)
      mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
        const p = String(filePath)
        if (p.includes('bad')) return 'invalid json{'
        return JSON.stringify(mockSlideshow)
      })

      const { getAllSlideshows } = require('@/lib/slides')
      const shows = getAllSlideshows()

      expect(shows).toHaveLength(1)
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error loading slideshow'), expect.anything())
      consoleSpy.mockRestore()
    })
  })

  describe('getSlideshowById', () => {
    it('returns slideshow data for existing file', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockSlideshow))

      const { getSlideshowById } = require('@/lib/slides')
      const show = getSlideshowById('test-slideshow')

      expect(show).not.toBeNull()
      expect(show.title).toBe('Test Slideshow')
      expect(show.slides).toHaveLength(2)
    })

    it('returns null for nonexistent file', () => {
      mockedFs.existsSync.mockReturnValue(false)

      const { getSlideshowById } = require('@/lib/slides')
      expect(getSlideshowById('nonexistent')).toBeNull()
    })

    it('returns null and logs error on parse failure', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readFileSync.mockReturnValue('not valid json')

      const { getSlideshowById } = require('@/lib/slides')
      expect(getSlideshowById('broken')).toBeNull()
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('slideshowExists', () => {
    it('returns true when file exists', () => {
      mockedFs.existsSync.mockReturnValue(true)

      const { slideshowExists } = require('@/lib/slides')
      expect(slideshowExists('test')).toBe(true)
    })

    it('returns false when file does not exist', () => {
      mockedFs.existsSync.mockReturnValue(false)

      const { slideshowExists } = require('@/lib/slides')
      expect(slideshowExists('missing')).toBe(false)
    })
  })
})
