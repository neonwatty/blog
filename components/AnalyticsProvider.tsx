'use client'

import { useState, useEffect, useCallback } from 'react'
import Script from 'next/script'
import CookieConsent from './CookieConsent'
import PostHogProvider from './PostHogProvider'

type ConsentState = 'pending' | 'accepted' | 'declined'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>('pending')
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent')
    if (stored === 'accepted' || stored === 'declined') {
      setConsent(stored)
    }
  }, [])

  const handleAccept = useCallback(() => setConsent('accepted'), [])
  const handleDecline = useCallback(() => setConsent('declined'), [])

  const analyticsEnabled = consent === 'accepted'

  return (
    <>
      {analyticsEnabled && GA_TRACKING_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
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
      <PostHogProvider enabled={analyticsEnabled} />
      {children}
      {consent === 'pending' && (
        <CookieConsent onAccept={handleAccept} onDecline={handleDecline} />
      )}
    </>
  )
}
