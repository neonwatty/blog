import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/modern-nextjs-blog' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/modern-nextjs-blog' : '',
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif']
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  outputFileTracingRoot: process.cwd(), // Fix workspace root warning
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
})

export default withMDX(nextConfig)