/** @jest-environment node */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PostFrontmatterSchema } from '@/lib/schemas'

const postsDir = path.join(process.cwd(), 'posts')
const publicDir = path.join(process.cwd(), 'public')

function getPostFiles(): string[] {
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith('.md'))
    .sort()
}

function getPostSlugs(): Set<string> {
  return new Set(getPostFiles().map((file) => file.replace(/\.md$/, '')))
}

describe('real post content validation', () => {
  it('has valid frontmatter for every real post', () => {
    const failures: string[] = []

    for (const file of getPostFiles()) {
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const parsed = matter(raw)
      const result = PostFrontmatterSchema.safeParse(parsed.data)

      if (!result.success) {
        failures.push(
          `${file}: ${result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ')}`,
        )
      }
    }

    expect(failures).toEqual([])
  })

  it('only references existing related posts and internal post links', () => {
    const slugs = getPostSlugs()
    const failures: string[] = []
    const internalPostLinkPattern = /\]\(\/posts\/([^/#)]+)/g

    for (const file of getPostFiles()) {
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const parsed = matter(raw)
      const frontmatter = PostFrontmatterSchema.parse(parsed.data)

      for (const relatedSlug of frontmatter.relatedPosts) {
        if (!slugs.has(relatedSlug)) {
          failures.push(`${file}: missing relatedPosts slug "${relatedSlug}"`)
        }
      }

      for (const match of raw.matchAll(internalPostLinkPattern)) {
        const linkedSlug = match[1]
        if (!slugs.has(linkedSlug)) {
          failures.push(`${file}: missing internal post link "${linkedSlug}"`)
        }
      }
    }

    expect(failures).toEqual([])
  })

  it('references existing local OG images when set', () => {
    const failures: string[] = []

    for (const file of getPostFiles()) {
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const parsed = matter(raw)
      const frontmatter = PostFrontmatterSchema.parse(parsed.data)

      if (!frontmatter.ogImage || /^https?:\/\//.test(frontmatter.ogImage)) {
        continue
      }

      const imagePath = path.join(publicDir, frontmatter.ogImage.replace(/^\//, ''))
      if (!fs.existsSync(imagePath)) {
        failures.push(`${file}: missing ogImage "${frontmatter.ogImage}"`)
      }
    }

    expect(failures).toEqual([])
  })
})
