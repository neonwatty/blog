/**
 * @jest-environment node
 */
import fs from 'fs'
import path from 'path'

// Mock fs module before importing the module under test
jest.mock('fs')
jest.mock('reading-time', () => ({
  __esModule: true,
  default: jest.fn(() => ({ text: '3 min read', minutes: 3 })),
}))

// Mock the remark pipeline
const mockProcess = jest.fn().mockResolvedValue({ toString: () => '<p>Processed HTML</p>' })
const mockUse = jest.fn().mockReturnThis()
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: mockUse,
    process: mockProcess,
  })),
}))
jest.mock('remark-rehype', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('rehype-prism-plus', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('rehype-raw', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('rehype-stringify', () => ({ __esModule: true, default: jest.fn() }))

jest.mock('gray-matter', () => {
  return jest.fn((content: string) => {
    // Simple frontmatter parser for tests
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!match) return { data: {}, content }

    const frontmatter = match[1]
    const body = match[2]
    const data: Record<string, unknown> = {}

    frontmatter.split('\n').forEach((line: string) => {
      const [key, ...rest] = line.split(': ')
      const value = rest.join(': ').trim()
      if (key && value) {
        if (value.startsWith('[') && value.endsWith(']')) {
          data[key.trim()] = value
            .slice(1, -1)
            .split(',')
            .map((s: string) => s.trim().replace(/['"]/g, ''))
        } else if (value === 'true') {
          data[key.trim()] = true
        } else if (value === 'false') {
          data[key.trim()] = false
        } else {
          data[key.trim()] = value.replace(/['"]/g, '')
        }
      }
    })

    return { data, content: body }
  })
})

const mockedFs = jest.mocked(fs)

// Helper to create mock markdown content
function createMockPost(overrides: Record<string, unknown> = {}) {
  const defaults = {
    title: 'Test Post',
    date: '2025-01-15',
    excerpt: 'Test excerpt',
    tags: "['react', 'javascript']",
    featured: 'false',
    author: 'Test Author',
  }
  const merged = { ...defaults, ...overrides }
  const frontmatter = Object.entries(merged)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  return `---\n${frontmatter}\n---\nTest content here`
}

describe('lib/posts - real module tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getSortedPostsData', () => {
    it('returns posts sorted by date descending', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['post-a.md', 'post-b.md', 'not-md.txt'] as unknown as ReturnType<
        typeof fs.readdirSync
      >)
      mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
        const p = String(filePath)
        if (p.includes('post-a')) return createMockPost({ title: 'Post A', date: '2025-01-10' })
        if (p.includes('post-b')) return createMockPost({ title: 'Post B', date: '2025-01-15' })
        return ''
      })

      const { getSortedPostsData } = require('@/lib/posts')
      const posts = getSortedPostsData()

      expect(posts).toHaveLength(2)
      expect(posts[0].id).toBe('post-b') // newer first
      expect(posts[1].id).toBe('post-a')
    })

    it('filters out non-markdown files', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['post.md', 'readme.txt', 'data.json'] as unknown as ReturnType<
        typeof fs.readdirSync
      >)
      mockedFs.readFileSync.mockReturnValue(createMockPost())

      const { getSortedPostsData } = require('@/lib/posts')
      const posts = getSortedPostsData()

      expect(posts).toHaveLength(1)
      expect(posts[0].id).toBe('post')
    })

    it('returns empty array when posts directory does not exist', () => {
      mockedFs.existsSync.mockReturnValue(false)

      const { getSortedPostsData } = require('@/lib/posts')
      const posts = getSortedPostsData()

      expect(posts).toEqual([])
    })

    it('populates default values for optional fields', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['minimal.md'] as unknown as ReturnType<typeof fs.readdirSync>)
      mockedFs.readFileSync.mockReturnValue(createMockPost({ title: 'Minimal', excerpt: 'Minimal excerpt' }))

      const { getSortedPostsData } = require('@/lib/posts')
      const posts = getSortedPostsData()

      expect(posts[0].readingTime).toBe('3 min read')
      expect(posts[0].featured).toBe(false)
      expect(posts[0].author).toBe('Test Author')
      expect(posts[0].relatedPosts).toEqual([])
      expect(posts[0].slideshow).toBe(false)
    })

    it('sets seoTitle to title when not provided', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['post.md'] as unknown as ReturnType<typeof fs.readdirSync>)
      mockedFs.readFileSync.mockReturnValue(createMockPost({ title: 'My Title' }))

      const { getSortedPostsData } = require('@/lib/posts')
      const posts = getSortedPostsData()

      expect(posts[0].seoTitle).toBe('My Title')
    })
  })

  describe('getAllPostIds', () => {
    it('returns params objects for each markdown file', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['first-post.md', 'second-post.md'] as unknown as ReturnType<
        typeof fs.readdirSync
      >)

      const { getAllPostIds } = require('@/lib/posts')
      const ids = getAllPostIds()

      expect(ids).toEqual([{ params: { id: 'first-post' } }, { params: { id: 'second-post' } }])
    })

    it('returns empty array when directory does not exist', () => {
      mockedFs.existsSync.mockReturnValue(false)

      const { getAllPostIds } = require('@/lib/posts')
      const ids = getAllPostIds()

      expect(ids).toEqual([])
    })
  })

  describe('getPostData', () => {
    it('returns processed post data with HTML content', async () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readFileSync.mockReturnValue(
        createMockPost({ title: 'My Post', date: '2025-03-01', excerpt: 'An excerpt' }),
      )

      const { getPostData } = require('@/lib/posts')
      const post = await getPostData('my-post')

      expect(post).not.toBeNull()
      expect(post.id).toBe('my-post')
      expect(post.title).toBe('My Post')
      expect(post.content).toContain('Processed HTML')
    })

    it('returns null when file does not exist', async () => {
      mockedFs.existsSync.mockImplementation((p: fs.PathLike) => {
        const pathStr = String(p)
        // Directory exists, but specific file doesn't
        return !pathStr.endsWith('.md')
      })

      const { getPostData } = require('@/lib/posts')
      const post = await getPostData('nonexistent')

      expect(post).toBeNull()
    })

    it('returns null when directory does not exist', async () => {
      mockedFs.existsSync.mockReturnValue(false)

      const { getPostData } = require('@/lib/posts')
      const post = await getPostData('any-post')

      expect(post).toBeNull()
    })
  })

  describe('getPostsByTag', () => {
    it('filters posts by tag case-insensitively', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['post-a.md', 'post-b.md'] as unknown as ReturnType<typeof fs.readdirSync>)
      mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
        const p = String(filePath)
        if (p.includes('post-a')) return createMockPost({ tags: "['React', 'TypeScript']" })
        if (p.includes('post-b')) return createMockPost({ tags: "['CSS', 'JavaScript']" })
        return ''
      })

      const { getPostsByTag } = require('@/lib/posts')
      const results = getPostsByTag('react')

      expect(results).toHaveLength(1)
      expect(results[0].id).toBe('post-a')
    })

    it('returns empty array when no posts match tag', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['post.md'] as unknown as ReturnType<typeof fs.readdirSync>)
      mockedFs.readFileSync.mockReturnValue(createMockPost({ tags: "['react']" }))

      const { getPostsByTag } = require('@/lib/posts')
      const results = getPostsByTag('python')

      expect(results).toHaveLength(0)
    })
  })

  describe('getAllTags', () => {
    it('returns unique sorted tags from all posts', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['a.md', 'b.md'] as unknown as ReturnType<typeof fs.readdirSync>)
      mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
        const p = String(filePath)
        if (p.includes('/a.md')) return createMockPost({ tags: "['react', 'javascript']" })
        if (p.includes('/b.md')) return createMockPost({ tags: "['javascript', 'css']" })
        return ''
      })

      const { getAllTags } = require('@/lib/posts')
      const tags = getAllTags()

      expect(tags).toEqual(['css', 'javascript', 'react'])
    })
  })

  describe('getPopularTags', () => {
    it('returns tags sorted by count with limit', () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync.mockReturnValue(['a.md', 'b.md', 'c.md'] as unknown as ReturnType<typeof fs.readdirSync>)
      mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
        const p = String(filePath)
        if (p.includes('/a.md')) return createMockPost({ tags: "['react', 'js']" })
        if (p.includes('/b.md')) return createMockPost({ tags: "['react', 'css']" })
        if (p.includes('/c.md')) return createMockPost({ tags: "['react', 'js']" })
        return ''
      })

      const { getPopularTags } = require('@/lib/posts')
      const tags = getPopularTags(2)

      expect(tags).toHaveLength(2)
      expect(tags[0].tag).toBe('react')
      expect(tags[0].count).toBe(3)
    })
  })
})
