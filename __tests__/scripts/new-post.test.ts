/**
 * @jest-environment node
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

describe('scripts/new-post.cjs', () => {
  const postsDir = path.join(process.cwd(), 'posts')
  const createdFiles: string[] = []

  afterEach(() => {
    // Clean up any test files
    createdFiles.forEach((f) => {
      if (fs.existsSync(f)) fs.unlinkSync(f)
    })
    createdFiles.length = 0
  })

  function runScript(args: string): string {
    return execSync(`node scripts/new-post.cjs ${args}`, {
      encoding: 'utf8',
      cwd: process.cwd(),
    })
  }

  it('creates a post file with correct slug', () => {
    const output = runScript('"Test Post Title"')
    const filePath = path.join(postsDir, 'test-post-title.md')
    createdFiles.push(filePath)

    expect(output).toContain('Created posts/test-post-title.md')
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('generates correct frontmatter', () => {
    const filePath = path.join(postsDir, 'frontmatter-check.md')
    createdFiles.push(filePath)

    runScript('"Frontmatter Check"')
    const content = fs.readFileSync(filePath, 'utf8')

    expect(content).toContain('title: "Frontmatter Check"')
    expect(content).toContain('draft: true')
    expect(content).toContain('author: "Jeremy Watt"')
    expect(content).toContain('tags: []')
  })

  it('supports --tags flag', () => {
    const filePath = path.join(postsDir, 'tagged-post.md')
    createdFiles.push(filePath)

    runScript('"Tagged Post" --tags react,next')
    const content = fs.readFileSync(filePath, 'utf8')

    expect(content).toContain('tags: [react, next]')
  })

  it('fails on duplicate slug', () => {
    const filePath = path.join(postsDir, 'duplicate-test.md')
    createdFiles.push(filePath)

    runScript('"Duplicate Test"')

    expect(() => runScript('"Duplicate Test"')).toThrow()
  })

  it('exits with error when no title provided', () => {
    expect(() => runScript('')).toThrow()
  })

  it('shows help with --help flag', () => {
    const output = runScript('--help')
    expect(output).toContain('Usage:')
    expect(output).toContain('--tags')
    expect(output).toContain('--open')
  })
})
