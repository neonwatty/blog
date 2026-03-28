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

function createOgMarkup(title, excerpt, tags) {
  const displayTitle = title.length > 80 ? title.slice(0, 77) + '...' : title
  const displayExcerpt = excerpt.length > 120 ? excerpt.slice(0, 117) + '...' : excerpt
  const displayTags = tags.slice(0, 3).join('  ·  ')

  // Adaptive font size based on title length
  let titleSize = '56px'
  if (displayTitle.length > 60) titleSize = '44px'
  else if (displayTitle.length > 40) titleSize = '50px'

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 80px',
        background: '#0f0e17',
        fontFamily: 'Arial',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // Background accent: large faded circle top-right
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '-200px',
              right: '-200px',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #4338ca33 0%, transparent 70%)',
            },
          },
        },
        // Background accent: small faded circle bottom-left
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: '-100px',
              left: '-100px',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #6366f122 0%, transparent 70%)',
            },
          },
        },
        // Top bar: site name + tags
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '40px',
              left: '80px',
              right: '80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            children: [
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '18px',
                    color: '#818cf8',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  },
                  children: 'neonwatty.com',
                },
              },
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '16px',
                    color: '#6366f1',
                  },
                  children: displayTags,
                },
              },
            ],
          },
        },
        // Accent line above title
        {
          type: 'div',
          props: {
            style: {
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, #818cf8, #6366f1)',
              borderRadius: '2px',
              marginBottom: '24px',
            },
          },
        },
        // Title
        {
          type: 'h1',
          props: {
            style: {
              fontSize: titleSize,
              fontWeight: 700,
              color: '#fffffe',
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-0.03em',
            },
            children: displayTitle,
          },
        },
        // Excerpt
        {
          type: 'p',
          props: {
            style: {
              fontSize: '22px',
              color: '#a7a9be',
              lineHeight: 1.5,
              marginTop: '20px',
              margin: 0,
              paddingTop: '20px',
            },
            children: displayExcerpt,
          },
        },
        // Bottom bar: author
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: '40px',
              left: '80px',
              right: '80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            children: [
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '18px',
                    color: '#a7a9be',
                  },
                  children: 'Jeremy Watt',
                },
              },
              // Decorative dots
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    gap: '6px',
                  },
                  children: [1, 2, 3].map(() => ({
                    type: 'div',
                    props: {
                      style: {
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#4338ca',
                      },
                    },
                  })),
                },
              },
            ],
          },
        },
      ],
    },
  }
}

async function generateOgImage(slug, title, excerpt, tags) {
  const markup = createOgMarkup(title, excerpt, tags)

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
      await generateOgImage(slug, data.title, data.excerpt || '', data.tags || [])
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
