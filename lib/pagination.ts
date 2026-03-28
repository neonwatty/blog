import { PostData, getSortedPostsData } from './posts'

const POSTS_PER_PAGE = 10

export interface PaginatedPosts {
  posts: PostData[]
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function getPaginatedPosts(page: number): PaginatedPosts {
  const allPosts = getSortedPostsData()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  const start = (currentPage - 1) * POSTS_PER_PAGE
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE)

  return {
    posts,
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  }
}

export function getAllPageNumbers(): number[] {
  const allPosts = getSortedPostsData()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => i + 1)
}
