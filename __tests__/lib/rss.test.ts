/**
 * @jest-environment node
 */

// Manual mock at __mocks__/feed.js is auto-loaded by jest.mock('feed')
jest.mock('feed')

jest.mock('@/lib/posts', () => ({
  getSortedPostsData: jest.fn(() => [
    {
      id: 'test-post',
      title: 'Test Post',
      date: '2025-01-15',
      excerpt: 'Test excerpt',
      content: '<p>Test content</p>',
      tags: ['react', 'testing'],
      readingTime: '3 min read',
      author: 'Test Author',
      image: '/images/test.jpg',
    },
    {
      id: 'post-no-image',
      title: 'No Image Post',
      date: '2025-01-10',
      excerpt: 'Another excerpt',
      content: '<p>More content</p>',
      tags: ['javascript'],
      readingTime: '2 min read',
    },
  ]),
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const feedMock = require('feed')
const mockAddItem = feedMock.__mockAddItem
const mockRss2 = feedMock.__mockRss2
const mockJson1 = feedMock.__mockJson1
const mockAtom1 = feedMock.__mockAtom1

describe('lib/rss', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.NEXT_PUBLIC_SITE_URL = 'https://test-blog.com'
  })

  describe('generateRSSFeed', () => {
    it('creates a Feed instance with correct options', () => {
      const { generateRSSFeed } = require('@/lib/rss')
      generateRSSFeed()

      expect(feedMock.Feed).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining('Blog'),
          id: 'https://test-blog.com',
          link: 'https://test-blog.com',
          language: 'en',
        }),
      )
    })

    it('adds all posts as feed items', () => {
      const { generateRSSFeed } = require('@/lib/rss')
      generateRSSFeed()

      expect(mockAddItem).toHaveBeenCalledTimes(2)
    })

    it('includes post data in feed items', () => {
      const { generateRSSFeed } = require('@/lib/rss')
      generateRSSFeed()

      expect(mockAddItem).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Post',
          description: 'Test excerpt',
          link: 'https://test-blog.com/posts/test-post',
        }),
      )
    })

    it('includes image URL for posts with images', () => {
      const { generateRSSFeed } = require('@/lib/rss')
      generateRSSFeed()

      expect(mockAddItem).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Post',
          image: 'https://test-blog.com/images/test.jpg',
        }),
      )
    })

    it('omits image for posts without images', () => {
      const { generateRSSFeed } = require('@/lib/rss')
      generateRSSFeed()

      expect(mockAddItem).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'No Image Post',
          image: undefined,
        }),
      )
    })

    it('maps tags to categories', () => {
      const { generateRSSFeed } = require('@/lib/rss')
      generateRSSFeed()

      expect(mockAddItem).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Post',
          category: [{ name: 'react' }, { name: 'testing' }],
        }),
      )
    })
  })

  describe('generateRSSFiles', () => {
    it('returns rss, json, and atom formats', () => {
      const { generateRSSFiles } = require('@/lib/rss')
      const files = generateRSSFiles()

      expect(files.rss).toBeDefined()
      expect(files.json).toBeDefined()
      expect(files.atom).toBeDefined()
    })

    it('calls rss2, json1, and atom1 on the feed', () => {
      const { generateRSSFiles } = require('@/lib/rss')
      generateRSSFiles()

      expect(mockRss2).toHaveBeenCalled()
      expect(mockJson1).toHaveBeenCalled()
      expect(mockAtom1).toHaveBeenCalled()
    })
  })
})
