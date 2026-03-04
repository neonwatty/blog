'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

interface PostHogProviderProps {
  enabled: boolean
}

export default function PostHogProvider({ enabled }: PostHogProviderProps) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

    if (!enabled || !key) return

    posthog.init(key, {
      api_host: host || 'https://us.i.posthog.com',
      autocapture: false,
      capture_pageview: true,
      capture_pageleave: false,
      disable_session_recording: true,
      person_profiles: 'identified_only',
    })

    return () => {
      posthog.reset()
    }
  }, [enabled])

  return null
}
