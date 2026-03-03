/** @jest-environment node */
import fs from 'fs'
import path from 'path'
import os from 'os'
import { execSync } from 'child_process'
import matter from 'gray-matter'
import { PostFrontmatterSchema } from '@/lib/schemas'

// Mock the remark pipeline (ESM modules that Jest cannot transform)
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({ toString: () => '<p>content</p>' }),
  })),
}))
jest.mock('remark-rehype', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('rehype-prism-plus', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('rehype-raw', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('rehype-stringify', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('reading-time', () => ({
  __esModule: true,
  default: jest.fn(() => ({ text: '1 min read', minutes: 1 })),
}))

let tmpDir: string

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-newpost-'))
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

describe('New post pipeline integration', () => {
  const scriptPath = path.join(process.cwd(), 'scripts', 'new-post.cjs')

  it('scaffolded post is parseable by getSortedPostsData', () => {
    execSync(`node "${scriptPath}" "Test Post Title" --tags react,next`, { cwd: tmpDir })

    const { getSortedPostsData } = loadPostsModule(tmpDir)
    const posts = getSortedPostsData()

    expect(posts).toHaveLength(1)
    expect(posts[0].title).toBe('Test Post Title')
    expect(posts[0].tags).toEqual(['react', 'next'])
    expect(posts[0].draft).toBe(true)
  })

  it('scaffolded post passes PostFrontmatterSchema validation', () => {
    execSync(`node "${scriptPath}" "Schema Valid Post" --tags typescript`, { cwd: tmpDir })

    const postsDir = path.join(tmpDir, 'posts')
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
    expect(files).toHaveLength(1)

    const content = fs.readFileSync(path.join(postsDir, files[0]), 'utf8')
    const { data } = matter(content)
    const result = PostFrontmatterSchema.safeParse(data)

    expect(result.success).toBe(true)
  })
})
