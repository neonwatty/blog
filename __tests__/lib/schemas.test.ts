/**
 * @jest-environment node
 */

import { PostFrontmatterSchema, ProjectUpdateFrontmatterSchema, validatePostFrontmatter } from '@/lib/schemas'

describe('lib/schemas', () => {
  describe('PostFrontmatterSchema', () => {
    it('parses valid frontmatter', () => {
      const result = PostFrontmatterSchema.safeParse({
        title: 'Test Post',
        date: '2025-01-15',
        excerpt: 'A test',
        tags: ['react'],
      })

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.title).toBe('Test Post')
        expect(result.data.draft).toBe(false)
        expect(result.data.author).toBe('Jeremy Watt')
      }
    })

    it('requires title', () => {
      const result = PostFrontmatterSchema.safeParse({
        date: '2025-01-15',
      })

      expect(result.success).toBe(false)
    })

    it('requires date', () => {
      const result = PostFrontmatterSchema.safeParse({
        title: 'Test',
      })

      expect(result.success).toBe(false)
    })

    it('applies defaults for optional fields', () => {
      const result = PostFrontmatterSchema.safeParse({
        title: 'Test',
        date: '2025-01-15',
      })

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.tags).toEqual([])
        expect(result.data.featured).toBe(false)
        expect(result.data.draft).toBe(false)
        expect(result.data.relatedPosts).toEqual([])
      }
    })

    it('allows empty string for canonicalUrl', () => {
      const result = PostFrontmatterSchema.safeParse({
        title: 'Test',
        date: '2025-01-15',
        canonicalUrl: '',
      })

      expect(result.success).toBe(true)
    })

    it('validates canonicalUrl format when provided', () => {
      const result = PostFrontmatterSchema.safeParse({
        title: 'Test',
        date: '2025-01-15',
        canonicalUrl: 'not-a-url',
      })

      expect(result.success).toBe(false)
    })
  })

  describe('ProjectUpdateFrontmatterSchema', () => {
    it('parses valid project update frontmatter', () => {
      const result = ProjectUpdateFrontmatterSchema.safeParse({
        title: 'Update v1.0',
        date: '2025-01-15',
        description: 'New release',
      })

      expect(result.success).toBe(true)
    })

    it('requires title and date', () => {
      const result = ProjectUpdateFrontmatterSchema.safeParse({
        description: 'Missing required fields',
      })

      expect(result.success).toBe(false)
    })
  })

  describe('validatePostFrontmatter', () => {
    it('returns parsed data for valid frontmatter', () => {
      const result = validatePostFrontmatter({ title: 'Test', date: '2025-01-15' }, 'test.md')

      expect(result).not.toBeNull()
      expect(result!.title).toBe('Test')
    })

    it('returns null for invalid frontmatter', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation()

      const result = validatePostFrontmatter({}, 'bad.md')

      expect(result).toBeNull()
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid frontmatter in bad.md'))

      warnSpy.mockRestore()
    })
  })
})
