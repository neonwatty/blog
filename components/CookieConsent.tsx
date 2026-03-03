'use client'

import { useCallback } from 'react'

interface CookieConsentProps {
  onAccept: () => void
  onDecline: () => void
}

export default function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const handleAccept = useCallback(() => {
    localStorage.setItem('cookie-consent', 'accepted')
    onAccept()
  }, [onAccept])

  const handleDecline = useCallback(() => {
    localStorage.setItem('cookie-consent', 'declined')
    onDecline()
  }, [onDecline])

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '1rem',
        backgroundColor: 'var(--color-background-elevated)',
        borderTop: '1px solid var(--color-border-primary)',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '64rem',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            margin: 0,
            flex: '1 1 300px',
          }}
        >
          This site uses cookies for analytics (Google Analytics and PostHog) to
          help improve the experience. Vercel Analytics runs without cookies and
          is always active.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
          <button
            onClick={handleDecline}
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              borderRadius: '0.375rem',
              border: '1px solid var(--color-border-primary)',
              backgroundColor: 'transparent',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
            }}
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              borderRadius: '0.375rem',
              border: 'none',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
