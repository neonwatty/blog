import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const POSTS_DIR = path.join(process.cwd(), 'posts')
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'posts', 'og')
const WIDTH = 1200
const HEIGHT = 630

// Load system fonts
const fontBold = fs.readFileSync('/System/Library/Fonts/Supplemental/Arial Bold.ttf')
const fontRegular = fs.readFileSync('/System/Library/Fonts/Supplemental/Arial.ttf')

function createOgMarkup(title, tags) {
  // Truncate title if too long
  const displayTitle = title.length > 80 ? title.slice(0, 77) + '...' : title
  const displayTags = tags.slice(0, 3).join('  ·  ')

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 70px',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)',
        fontFamily: 'Arial',
      },
      children: [
        // Top: site name
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#818cf8',
                  },
                },
              },
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '24px',
                    color: '#a5b4fc',
                    letterSpacing: '0.05em',
                  },
                  children: 'neonwatty.com',
                },
              },
            ],
          },
        },
        // Middle: title
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            },
            children: [
              {
                type: 'h1',
                props: {
                  style: {
                    fontSize: displayTitle.length > 60 ? '42px' : '52px',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.2,
                    margin: 0,
                    letterSpacing: '-0.02em',
                  },
                  children: displayTitle,
                },
              },
            ],
          },
        },
        // Bottom: tags + reading time
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            children: [
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '20px',
                    color: '#c7d2fe',
                  },
                  children: displayTags,
                },
              },
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '18px',
                    color: '#818cf8',
                  },
                  children: 'Jeremy Watt',
                },
              },
            ],
          },
        },
      ],
    },
  }
}

async function generateOgImage(slug, title, tags) {
  const markup = createOgMarkup(title, tags)

  const svg = await satori(markup, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: 'Arial', data: fontRegular, weight: 400, style: 'normal' },
      { name: 'Arial', data: fontBold, weight: 700, style: 'normal' },
    ],
  })

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
  })
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  const outputPath = path.join(OUTPUT_DIR, `${slug}.png`)
  fs.writeFileSync(outputPath, pngBuffer)
  return outputPath
}

async function main() {
  console.log('Generating OG images...')

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))
  let generated = 0
  let skipped = 0

  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
    const { data } = matter(content)

    // Skip drafts
    if (data.draft) {
      skipped++
      continue
    }

    // Skip posts that already have a non-OG-generated image
    const existingImage = data.image || ''
    if (existingImage && !existingImage.startsWith('/images/posts/og/')) {
      skipped++
      continue
    }

    try {
      await generateOgImage(slug, data.title, data.tags || [])
      generated++
      console.log(`  ✅ ${slug}`)
    } catch (err) {
      console.error(`  ❌ ${slug}: ${err.message}`)
    }
  }

  console.log(`\n🎉 Generated ${generated} OG images, skipped ${skipped}`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
