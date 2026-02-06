import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Dev-only gate
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { slug } = await params
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data: frontmatter, content } = matter(fileContents)

  return NextResponse.json({
    slug,
    frontmatter,
    content,
    raw: fileContents,
  })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Dev-only gate
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { slug } = await params
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  try {
    const body = await request.json()
    const { raw } = body

    if (!raw || typeof raw !== 'string') {
      return NextResponse.json({ error: 'Invalid content' }, { status: 400 })
    }

    // Validate that the content has valid frontmatter
    try {
      matter(raw)
    } catch {
      return NextResponse.json({ error: 'Invalid frontmatter' }, { status: 400 })
    }

    fs.writeFileSync(fullPath, raw, 'utf8')

    return NextResponse.json({ success: true, slug })
  } catch (error) {
    console.error('Error saving post:', error)
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 })
  }
}
