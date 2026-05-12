import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export is only enabled by the production build script.
  // Plain `next build` keeps API routes available for local admin validation.
  ...(process.env.STATIC_EXPORT === 'true' ? { output: 'export' } : {}),
  trailingSlash: true,
  basePath: '',
  assetPrefix: '',
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
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
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
