import { PostData } from '@/lib/posts'

interface StructuredDataProps {
  post?: PostData
  type?: 'website' | 'article' | 'blog'
}

export default function StructuredData({ post, type = 'website' }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'
  
  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: 'Jeremy Watt\'s Blog',
    description: 'A modern, performant blog built with Next.js',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    author: {
      '@type': 'Person',
      name: 'Blog Author'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jeremy Watt\'s Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`
      }
    }
  }

  const blogStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Jeremy Watt\'s Blog',
    description: 'A modern, performant blog built with Next.js',
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: 'Blog Author'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jeremy Watt\'s Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`
      }
    }
  }

  const articleStructuredData = post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `${siteUrl}${post.image}` : `${siteUrl}/images/og-image.jpg`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Blog Author'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jeremy Watt\'s Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/posts/${post.id}`
    },
    url: `${siteUrl}/posts/${post.id}`,
    wordCount: post.content.split(' ').length,
    timeRequired: post.readingTime,
    keywords: post.tags.join(', '),
    articleSection: 'Blog',
    inLanguage: 'en-US'
  } : null

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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}