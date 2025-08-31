import { Feed } from 'feed'
import { getSortedPostsData } from './posts'

export function generateRSSFeed() {
  const posts = getSortedPostsData()
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'
  
  const feed = new Feed({
    title: 'Jeremy Watt's Blog',
    description: 'A modern, performant blog built with Next.js',
    id: siteURL,
    link: siteURL,
    language: 'en',
    image: `${siteURL}/images/logo.png`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    updated: new Date(posts[0]?.date || new Date()),
    feedLinks: {
      rss2: `${siteURL}/rss.xml`,
      json: `${siteURL}/rss.json`,
      atom: `${siteURL}/atom.xml`
    },
    author: {
      name: 'Blog Author',
      email: 'author@example.com',
      link: siteURL
    }
  })

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteURL}/posts/${post.id}`,
      link: `${siteURL}/posts/${post.id}`,
      description: post.excerpt,
      content: post.content,
      author: [{ name: post.author || 'Blog Author' }],
      date: new Date(post.date),
      category: post.tags.map(tag => ({ name: tag })),
      image: post.image ? `${siteURL}${post.image}` : undefined
    })
  })

  return feed
}

export function generateRSSFiles() {
  const feed = generateRSSFeed()
  
  return {
    rss: feed.rss2(),
    json: feed.json1(),
    atom: feed.atom1()
  }
}