import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Posts',
  robots: {
    index: false,
    follow: true,
  },
}

export default function PostsPage() {
  redirect('/')
}