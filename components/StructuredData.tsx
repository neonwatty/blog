import { PostData } from '@/lib/posts'

interface StructuredDataProps {
  post?: PostData
  type?: 'website' | 'article' | 'blog'
}

export default function StructuredData({ post, type = 'website' }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neonwatty.com'

  const siteDescription =
    'Practical guides for building with Claude Code and AI developer tools — from CI automation and SEO workflows to skills, plugins, and solo product development.'

  const authorSchema = {
    '@type': 'Person' as const,
    name: 'Jeremy Watt',
    url: `${siteUrl}/about`,
    jobTitle: 'AI Engineer',
    sameAs: ['https://x.com/neonwatty', 'https://github.com/neonwatty'],
    knowsAbout: ['Claude Code', 'AI developer tools', 'machine learning', 'developer productivity'],
  }

  const publisherSchema = {
    '@type': 'Organization' as const,
    name: "Jeremy Watt's Blog",
    logo: {
      '@type': 'ImageObject' as const,
      url: `${siteUrl}/images/logo.png`,
    },
  }

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: "Jeremy Watt's Blog",
    description: siteDescription,
    url: siteUrl,
    author: authorSchema,
    publisher: publisherSchema,
  }

  const blogStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: "Jeremy Watt's Blog",
    description: siteDescription,
    url: siteUrl,
    author: authorSchema,
    publisher: publisherSchema,
  }

  const articleStructuredData = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.image ? `${siteUrl}${post.image}` : `${siteUrl}/images/og-image.jpg`,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          ...authorSchema,
          name: post.author || 'Jeremy Watt',
        },
        publisher: publisherSchema,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteUrl}/posts/${post.id}`,
        },
        url: `${siteUrl}/posts/${post.id}`,
        wordCount: post.content.split(' ').length,
        timeRequired: post.readingTime,
        keywords: post.tags.join(', '),
        articleSection: 'Blog',
        inLanguage: 'en-US',
      }
    : null

  const getStructuredData = () => {
    switch (type) {
      case 'article':
        return post ? articleStructuredData : websiteStructuredData
      case 'blog':
        return blogStructuredData
      default:
        return websiteStructuredData
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
