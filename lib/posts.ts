import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'

// Ensure we only use fs on server side
const isServer = typeof window === 'undefined'
const postsDirectory = isServer ? path.join(process.cwd(), 'posts') : ''

// Function to enhance HTML code blocks with custom styling
function enhanceCodeBlocks(html: string): string {
  // Replace <pre><code class="language-x">...</code></pre> with custom markup
  return html.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (match, language, code) => {
      const decodedCode = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .trim()
      
      return `<div class="code-block-container">
        <div class="code-block-header">
          <div class="flex items-center gap-2">
            <div class="flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium text-tertiary bg-surface-secondary px-2 py-1 rounded-full">${language.toUpperCase()}</span>
            <button class="copy-button" title="Copy code to clipboard" onclick="copyCode(this)">
              <svg class="w-4 h-4 text-tertiary hover:text-primary transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="code-block-content">
          <pre class="code-pre"><code class="language-${language}" data-code="${encodeURIComponent(decodedCode)}">${code}</code></pre>
        </div>
      </div>`
    }
  ).replace(
    // Also handle code blocks without language
    /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
    (match, code) => {
      const decodedCode = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .trim()
      
      return `<div class="code-block-container">
        <div class="code-block-header">
          <div class="flex items-center gap-2">
            <div class="flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium text-tertiary bg-surface-secondary px-2 py-1 rounded-full">CODE</span>
            <button class="copy-button" title="Copy code to clipboard" onclick="copyCode(this)">
              <svg class="w-4 h-4 text-tertiary hover:text-primary transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="code-block-content">
          <pre class="code-pre"><code data-code="${encodeURIComponent(decodedCode)}">${code}</code></pre>
        </div>
      </div>`
    }
  )
}

export interface PostData {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  readingTime: string
  featured?: boolean
  image?: string
  author?: string
  seoTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  relatedPosts?: string[]
}

export interface PostMeta {
  totalPosts: number
  totalTags: string[]
  recentPosts: PostData[]
  popularTags: { tag: string; count: number }[]
}

// Enhanced post retrieval with SEO data
export function getSortedPostsData(): PostData[] {
  // Return empty array on client side or if posts directory doesn't exist
  if (!isServer || !fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      const readingTimeStats = readingTime(matterResult.content)

      return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt,
        content: matterResult.content,
        tags: matterResult.data.tags || [],
        readingTime: readingTimeStats.text,
        featured: matterResult.data.featured || false,
        image: matterResult.data.image,
        author: matterResult.data.author || 'Blog Author',
        seoTitle: matterResult.data.seoTitle || matterResult.data.title,
        metaDescription: matterResult.data.metaDescription || matterResult.data.excerpt,
        canonicalUrl: matterResult.data.canonicalUrl,
        relatedPosts: matterResult.data.relatedPosts || []
      }
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Get all post IDs for static generation
export function getAllPostIds() {
  if (!isServer || !fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
}

// Get post data by ID
export async function getPostData(id: string): Promise<PostData | null> {
  if (!isServer || !fs.existsSync(postsDirectory)) {
    return null
  }

  const fullPath = path.join(postsDirectory, `${id}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  
  // Process markdown content to HTML
  const processedContent = await remark().use(html).process(matterResult.content)
  let contentHtml = processedContent.toString()
  
  // Post-process to enhance code blocks
  contentHtml = enhanceCodeBlocks(contentHtml)
  const readingTimeStats = readingTime(matterResult.content)

  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    excerpt: matterResult.data.excerpt,
    content: contentHtml,
    tags: matterResult.data.tags || [],
    readingTime: readingTimeStats.text,
    featured: matterResult.data.featured || false,
    image: matterResult.data.image,
    author: matterResult.data.author || 'Blog Author',
    seoTitle: matterResult.data.seoTitle || matterResult.data.title,
    metaDescription: matterResult.data.metaDescription || matterResult.data.excerpt,
    canonicalUrl: matterResult.data.canonicalUrl,
    relatedPosts: matterResult.data.relatedPosts || []
  }
}

// Search functionality
export function searchPosts(query: string): PostData[] {
  const allPosts = getSortedPostsData()
  const lowercaseQuery = query.toLowerCase()
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// Get posts by tag
export function getPostsByTag(tag: string): PostData[] {
  const allPosts = getSortedPostsData()
  return allPosts.filter(post => 
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  )
}

// Get related posts
export function getRelatedPosts(currentPostId: string, limit = 3): PostData[] {
  const allPosts = getSortedPostsData()
  const currentPost = allPosts.find(post => post.id === currentPostId)
  
  if (!currentPost) return []
  
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPostId)
    .filter(post => post.tags.some(tag => currentPost.tags.includes(tag)))
    .slice(0, limit)
    
  return relatedPosts
}

// Get all unique tags
export function getAllTags(): string[] {
  const allPosts = getSortedPostsData()
  const tagsSet = new Set<string>()
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag))
  })
  
  return Array.from(tagsSet).sort()
}

// Get popular tags with counts
export function getPopularTags(limit = 10): { tag: string; count: number }[] {
  const allPosts = getSortedPostsData()
  const tagCounts: { [key: string]: number } = {}
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

// Get blog metadata
export function getBlogMeta(): PostMeta {
  const allPosts = getSortedPostsData()
  
  return {
    totalPosts: allPosts.length,
    totalTags: getAllTags(),
    recentPosts: allPosts.slice(0, 5),
    popularTags: getPopularTags(10)
  }
}