import { getSortedPostsData, searchPosts, getPostsByTag, getRelatedPosts, getAllTags } from '@/lib/posts'
import fs from 'fs'
import path from 'path'

// Mock fs module
jest.mock('fs')
jest.mock('path')

const mockFs = fs as jest.Mocked<typeof fs>
const mockPath = path as jest.Mocked<typeof path>

const mockPostContent1 = `---
title: "Test Post 1"
date: "2025-01-15"
excerpt: "This is test post 1"
tags: ["test", "javascript"]
featured: true
author: "Test Author"
---

# Test Post 1

This is the content of test post 1.`

const mockPostContent2 = `---
title: "Test Post 2"
date: "2025-01-10"
excerpt: "This is test post 2"
tags: ["test", "css"]
featured: false
author: "Test Author"
---

# Test Post 2

This is the content of test post 2.`

describe('Posts Library', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
    
    // Mock path.join to return a predictable path
    mockPath.join.mockImplementation((...args) => args.join('/'))
    
    // Mock process.cwd()
    jest.spyOn(process, 'cwd').mockReturnValue('/mock/path')
  })

  describe('getSortedPostsData', () => {
    test('returns empty array when posts directory does not exist', () => {
      mockFs.existsSync.mockReturnValue(false)
      
      const result = getSortedPostsData()
      
      expect(result).toEqual([])
    })

    test('returns sorted posts when directory exists', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['post1.md', 'post2.md'] as any)
      mockFs.readFileSync
        .mockReturnValueOnce(mockPostContent1)
        .mockReturnValueOnce(mockPostContent2)
      
      const result = getSortedPostsData()
      
      expect(result).toHaveLength(2)
      expect(result[0].title).toBe('Test Post 1') // More recent post first
      expect(result[1].title).toBe('Test Post 2')
      expect(result[0].featured).toBe(true)
      expect(result[1].featured).toBe(false)
    })

    test('filters out non-markdown files', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['post1.md', 'readme.txt', 'post2.md'] as any)
      mockFs.readFileSync
        .mockReturnValueOnce(mockPostContent1)
        .mockReturnValueOnce(mockPostContent2)
      
      const result = getSortedPostsData()
      
      expect(result).toHaveLength(2)
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(2)
    })
  })

  describe('searchPosts', () => {
    beforeEach(() => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['post1.md', 'post2.md'] as any)
      mockFs.readFileSync
        .mockReturnValueOnce(mockPostContent1)
        .mockReturnValueOnce(mockPostContent2)
    })

    test('finds posts by title', () => {
      const result = searchPosts('Test Post 1')
      
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Test Post 1')
    })

    test('finds posts by excerpt', () => {
      const result = searchPosts('test post 2')
      
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Test Post 2')
    })

    test('finds posts by tag', () => {
      const result = searchPosts('javascript')
      
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Test Post 1')
    })

    test('returns empty array for no matches', () => {
      const result = searchPosts('nonexistent')
      
      expect(result).toHaveLength(0)
    })

    test('is case insensitive', () => {
      const result = searchPosts('CSS')
      
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Test Post 2')
    })
  })

  describe('getPostsByTag', () => {
    beforeEach(() => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['post1.md', 'post2.md'] as any)
      mockFs.readFileSync
        .mockReturnValueOnce(mockPostContent1)
        .mockReturnValueOnce(mockPostContent2)
    })

    test('returns posts with specified tag', () => {
      const result = getPostsByTag('javascript')
      
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Test Post 1')
    })

    test('returns posts with common tag', () => {
      const result = getPostsByTag('test')
      
      expect(result).toHaveLength(2)
    })

    test('is case insensitive', () => {
      const result = getPostsByTag('CSS')
      
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Test Post 2')
    })
  })

  describe('getAllTags', () => {
    beforeEach(() => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['post1.md', 'post2.md'] as any)
      mockFs.readFileSync
        .mockReturnValueOnce(mockPostContent1)
        .mockReturnValueOnce(mockPostContent2)
    })

    test('returns all unique tags sorted', () => {
      const result = getAllTags()
      
      expect(result).toEqual(['css', 'javascript', 'test'])
    })
  })

  describe('getRelatedPosts', () => {
    beforeEach(() => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['post1.md', 'post2.md'] as any)
      mockFs.readFileSync
        .mockReturnValueOnce(mockPostContent1)
        .mockReturnValueOnce(mockPostContent2)
    })

    test('returns related posts based on shared tags', () => {
      const result = getRelatedPosts('test-post-1')
      
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('post2') // Shares 'test' tag
    })

    test('excludes the current post from results', () => {
      const result = getRelatedPosts('post1')
      
      expect(result.every(post => post.id !== 'post1')).toBe(true)
    })

    test('returns empty array for non-existent post', () => {
      const result = getRelatedPosts('nonexistent-post')
      
      expect(result).toEqual([])
    })
  })
})