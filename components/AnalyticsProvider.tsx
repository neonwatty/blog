'use client'

import Script from 'next/script'
import PostHogProvider from './PostHogProvider'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

  return (
    <>
      {GA_TRACKING_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
      <PostHogProvider enabled={true} />
      {children}
    </>
  )
}
