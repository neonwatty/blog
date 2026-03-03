#!/usr/bin/env node

/**
 * Post scaffolding CLI
 *
 * Usage:
 *   npm run new:post -- "My Post Title"
 *   npm run new:post -- "My Post Title" --tags react,next --open
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function parseArgs(args) {
  const result = { title: '', tags: [], open: false }
  let i = 0

  // First non-flag arg is the title
  while (i < args.length && !args[i].startsWith('--')) {
    result.title += (result.title ? ' ' : '') + args[i]
    i++
  }

  // Parse flags
  while (i < args.length) {
    if (args[i] === '--tags' && i + 1 < args.length) {
      i++
      result.tags = args[i].split(',').map((t) => t.trim())
    } else if (args[i] === '--open') {
      result.open = true
    }
    i++
  }

  return result
}

function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args[0] === '--help') {
    console.log('Usage: npm run new:post -- "Post Title" [--tags tag1,tag2] [--open]')
    console.log('')
    console.log('Options:')
    console.log('  --tags    Comma-separated list of tags')
    console.log('  --open    Open the file in your default editor')
    process.exit(args[0] === '--help' ? 0 : 1)
  }

  const { title, tags, open } = parseArgs(args)

  if (!title) {
    console.error('Error: Post title is required')
    process.exit(1)
  }

  const slug = slugify(title)
  const date = new Date().toISOString().split('T')[0]
  const postsDir = path.join(process.cwd(), 'posts')

  // Ensure posts directory exists
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }

  const filePath = path.join(postsDir, `${slug}.md`)

  if (fs.existsSync(filePath)) {
    console.error(`Error: Post already exists at posts/${slug}.md`)
    process.exit(1)
  }

  const tagsLine = tags.length > 0 ? `[${tags.join(', ')}]` : '[]'

  const content = `---
title: "${title}"
date: "${date}"
excerpt: ""
tags: ${tagsLine}
featured: false
draft: true
author: "Jeremy Watt"
image: ""
---

`

  fs.writeFileSync(filePath, content)
  console.log(`Created posts/${slug}.md`)

  if (open) {
    try {
      execSync(`open "${filePath}"`)
    } catch {
      console.log(`Open the file manually: ${filePath}`)
    }
  }
}

main()
