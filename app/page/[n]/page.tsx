import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { getPaginatedPosts, getAllPageNumbers } from '@/lib/pagination'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostList from '@/components/PostList'
import Pagination from '@/components/Pagination'

interface PageProps {
  params: Promise<{ n: string }>
}

export async function generateStaticParams() {
  return getAllPageNumbers()
    .filter((n) => n > 1)
    .map((n) => ({ n: String(n) }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { n } = await params
  const page = parseInt(n, 10)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neonwatty.com'

  return {
    title: `Page ${page}`,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${siteUrl}/page/${page}`,
    },
  }
}

export default async function PaginatedPage({ params }: PageProps) {
  const { n } = await params
  const page = parseInt(n, 10)

  if (page === 1) {
    redirect('/')
  }

  const { posts, currentPage, totalPages } = getPaginatedPosts(page)

  return (
    <div className="min-h-screen flex flex-col transition-all duration-300" style={{ backgroundColor: 'transparent' }}>
      <Header />

      <main id="main-content" className="flex-grow">
        <section className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="flex items-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Page {currentPage}
            </h1>
            <div className="flex-grow h-px ml-4 sm:ml-6" style={{ background: 'var(--gradient-hero)' }}></div>
          </div>

          <PostList posts={posts} />
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
