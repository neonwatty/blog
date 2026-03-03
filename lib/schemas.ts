import { z } from 'zod'

export const PostFrontmatterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  excerpt: z.string().default(''),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  image: z.string().optional(),
  author: z.string().default('Blog Author'),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  relatedPosts: z.array(z.string()).default([]),
  slideshow: z.boolean().default(false),
})

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>

export const ProjectUpdateFrontmatterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().default(''),
  link: z.string().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

/**
 * Validate frontmatter data against the post schema.
 * Returns parsed data on success, or null with a console warning on failure.
 */
export function validatePostFrontmatter(data: Record<string, unknown>, filename: string): PostFrontmatter | null {
  const result = PostFrontmatterSchema.safeParse(data)
  if (result.success) {
    return result.data
  }

  const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
  const errors = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n')

  if (isDev) {
    console.warn(`⚠️  Invalid frontmatter in ${filename}:\n${errors}`)
  }

  return null
}
