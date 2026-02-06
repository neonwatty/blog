import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds (allows API routes in dev for admin)
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  trailingSlash: true,
  basePath: '',
  assetPrefix: '',
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif']
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  outputFileTracingRoot: process.cwd(), // Fix workspace root warning
  // Disable the Next.js development indicator (floating "N" button)
  // This prevents the FAB-style overlay that blocks content on mobile
  devIndicators: false,
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
})

export default withMDX(nextConfig)