import type { Metadata } from 'next'
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/ThemeProvider'
import MobileTabBar from '@/components/MobileTabBar'
import { AnalyticsProvider } from '@/components/AnalyticsProvider'
import SentryProvider from '@/components/SentryProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: {
    default: "Jeremy Watt's Blog",
    template: "%s | Jeremy Watt's Blog",
  },
  description:
    'Practical guides for building with Claude Code and AI developer tools — from CI automation and SEO workflows to skills, plugins, and solo product development.',
  keywords: [
    'Claude Code',
    'AI developer tools',
    'AI engineering',
    'developer productivity',
    'CI/CD automation',
    'vibe coding',
  ],
  authors: [{ name: 'Jeremy Watt' }],
  creator: 'Jeremy Watt',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://neonwatty.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://neonwatty.com',
    siteName: "Jeremy Watt's Blog",
    title: "Jeremy Watt's Blog",
    description:
      'Practical guides for building with Claude Code and AI developer tools — from CI automation and SEO workflows to skills, plugins, and solo product development.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Jeremy Watt's Blog",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jeremy Watt's Blog",
    description:
      'Practical guides for building with Claude Code and AI developer tools — from CI automation and SEO workflows to skills, plugins, and solo product development.',
    images: ['/images/og-image.jpg'],
    creator: '@neonwatty',
    site: '@neonwatty',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="Jeremy Watt's Blog - RSS Feed" href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Jeremy Watt's Blog - Atom Feed" href="/atom.xml" />
        <link rel="alternate" type="application/json" title="Jeremy Watt's Blog - JSON Feed" href="/rss.json" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} font-sans grid-pattern`}
        suppressHydrationWarning
      >
        <SentryProvider />
        <ThemeProvider>
          <AnalyticsProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded focus:outline-none"
            >
              Skip to content
            </a>
            {children}
            <MobileTabBar />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'var(--color-surface-primary)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-border-primary)',
                },
              }}
            />
            <Analytics />
            <SpeedInsights />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              // Add captions to liars-dice images
              document.addEventListener('DOMContentLoaded', function() {
                const liarsDiceImages = document.querySelectorAll('img[src*="liars-dice"]');

                liarsDiceImages.forEach(img => {
                  if (img.alt) {
                    const caption = document.createElement('div');
                    caption.className = 'image-caption';
                    caption.textContent = img.alt;

                    // Insert the caption after the image's parent paragraph
                    const paragraph = img.closest('p');
                    if (paragraph && paragraph.parentNode) {
                      paragraph.parentNode.insertBefore(caption, paragraph.nextSibling);
                    }
                  }
                });
              });
            `,
              }}
            />

            {/* Beehiiv UTM Parameter Forwarding */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
              (function() {
                const params = new URLSearchParams(window.location.search);
                const utmParams = {};

                // Collect all UTM parameters
                for (const [key, value] of params.entries()) {
                  if (key.startsWith('utm_')) {
                    utmParams[key] = value;
                  }
                }

                // If we have UTM parameters, forward them to beehiiv iframes
                if (Object.keys(utmParams).length > 0) {
                  window.addEventListener('load', function() {
                    const beehiivIframes = document.querySelectorAll('iframe.beehiiv-embed');
                    beehiivIframes.forEach(function(iframe) {
                      const iframeSrc = new URL(iframe.src);
                      Object.keys(utmParams).forEach(function(key) {
                        iframeSrc.searchParams.set(key, utmParams[key]);
                      });
                      iframe.src = iframeSrc.toString();
                    });
                  });
                }
              })();
            `,
              }}
            />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
