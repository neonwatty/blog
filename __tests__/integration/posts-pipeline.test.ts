/** @jest-environment node */
import fs from 'fs'
import path from 'path'
import os from 'os'

// Mock the remark pipeline (ESM modules that Jest cannot transform)
const mockProcess = jest.fn().mockResolvedValue({ toString: () => '<p><strong>bold text</strong></p>' })
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
jest.mock('reading-time', () => ({
  __esModule: true,
  default: jest.fn(() => ({ text: '3 min read', minutes: 3 })),
}))

function createPost(dir: string, filename: string, frontmatter: Record<string, unknown>, body = 'Test content.') {
  const fm = Object.entries(frontmatter)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n')
  fs.writeFileSync(path.join(dir, filename), `---\n${fm}\n---\n\n${body}`)
}

let tmpDir: string
let postsDir: string

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-integ-'))
  postsDir = path.join(tmpDir, 'posts')
  fs.mkdirSync(postsDir, { recursive: true })
})

afterEach(() => {
  jest.restoreAllMocks()
  fs.rmSync(tmpDir, { recursive: true, force: true })
})

function loadPostsModule(cwd: string) {
  let mod: typeof import('@/lib/posts')
  jest.spyOn(process, 'cwd').mockReturnValue(cwd)
  jest.isolateModules(() => {
    mod = require('@/lib/posts')
  })
  return mod!
}

describe('Posts pipeline integration', () => {
  it('parses valid posts and sorts by date descending', () => {
    createPost(postsDir, 'old.md', { title: 'Old', date: '2024-01-01', excerpt: 'old', tags: [] })
    createPost(postsDir, 'mid.md', { title: 'Mid', date: '2024-06-15', excerpt: 'mid', tags: [] })
    createPost(postsDir, 'new.md', { title: 'New', date: '2025-01-10', excerpt: 'new', tags: [] })

    const { getSortedPostsData } = loadPostsModule(tmpDir)
    const posts = getSortedPostsData()

    expect(posts).toHaveLength(3)
    expect(posts[0].title).toBe('New')
    expect(posts[1].title).toBe('Mid')
    expect(posts[2].title).toBe('Old')
  })

  it('silently skips posts with invalid frontmatter', () => {
    createPost(postsDir, 'valid.md', { title: 'Valid', date: '2024-01-01', excerpt: 'ok', tags: [] })
    // Missing required title field
    createPost(postsDir, 'bad.md', { date: '2024-01-01', excerpt: 'no title' })

    const { getSortedPostsData } = loadPostsModule(tmpDir)
    const posts = getSortedPostsData()

    expect(posts).toHaveLength(1)
    expect(posts[0].title).toBe('Valid')
  })

  it('includes draft posts when NODE_ENV=test', () => {
    createPost(postsDir, 'draft.md', {
      title: 'Draft Post',
      date: '2024-05-01',
      excerpt: 'wip',
      tags: [],
      draft: true,
    })

    const { getSortedPostsData } = loadPostsModule(tmpDir)
    const posts = getSortedPostsData()

    expect(posts).toHaveLength(1)
    expect(posts[0].draft).toBe(true)
  })

  it('filters draft posts when NODE_ENV=production', () => {
    createPost(postsDir, 'published.md', { title: 'Published', date: '2024-01-01', excerpt: 'ok', tags: [] })
    createPost(postsDir, 'draft.md', {
      title: 'Draft',
      date: '2024-02-01',
      excerpt: 'wip',
      tags: [],
      draft: true,
    })

    const originalEnv = process.env.NODE_ENV
    try {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', writable: true })
      const { getSortedPostsData } = loadPostsModule(tmpDir)
      const posts = getSortedPostsData()

      expect(posts).toHaveLength(1)
      expect(posts[0].title).toBe('Published')
    } finally {
      Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, writable: true })
    }
  })

  it('getPostData returns rendered HTML', async () => {
    createPost(
      postsDir,
      'html-test.md',
      {
        title: 'HTML Test',
        date: '2024-01-01',
        excerpt: 'test',
        tags: [],
      },
      '**bold text**',
    )

    const { getPostData } = loadPostsModule(tmpDir)
    const post = await getPostData('html-test')

    expect(post).not.toBeNull()
    expect(post!.content).toContain('<strong>bold text</strong>')
  })

  it('getPostsByTag filters correctly', () => {
    createPost(postsDir, 'react.md', { title: 'React Guide', date: '2024-01-01', excerpt: 'r', tags: ['react'] })
    createPost(postsDir, 'css.md', { title: 'CSS Guide', date: '2024-02-01', excerpt: 'c', tags: ['css'] })
    createPost(postsDir, 'both.md', {
      title: 'Both',
      date: '2024-03-01',
      excerpt: 'b',
      tags: ['react', 'css'],
    })

    const { getPostsByTag } = loadPostsModule(tmpDir)
    const reactPosts = getPostsByTag('react')

    expect(reactPosts).toHaveLength(2)
    expect(reactPosts.map((p) => p.title).sort()).toEqual(['Both', 'React Guide'])
  })

  it('ignores non-markdown files', () => {
    createPost(postsDir, 'real.md', { title: 'Real', date: '2024-01-01', excerpt: 'ok', tags: [] })
    fs.writeFileSync(path.join(postsDir, 'notes.txt'), 'not a post')
    fs.writeFileSync(path.join(postsDir, 'data.json'), '{}')

    const { getSortedPostsData } = loadPostsModule(tmpDir)
    const posts = getSortedPostsData()

    expect(posts).toHaveLength(1)
    expect(posts[0].id).toBe('real')
  })
})
