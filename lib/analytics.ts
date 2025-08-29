declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: object) => void
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// Custom blog analytics
export const trackBlogEvent = {
  postView: (postId: string) => {
    trackEvent('view_post', 'blog', postId)
    
    // Also track reading progress
    if (typeof window !== 'undefined') {
      let maxScroll = 0
      const trackReadingProgress = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        )
        
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
          maxScroll = scrollPercent
          trackEvent('reading_progress', 'blog', postId, scrollPercent)
        }
      }
      
      window.addEventListener('scroll', trackReadingProgress, { passive: true })
      
      // Clean up listener after 10 minutes
      setTimeout(() => {
        window.removeEventListener('scroll', trackReadingProgress)
      }, 600000)
    }
  },
  
  searchUsed: (query: string) => trackEvent('search', 'blog', query),
  
  sharePost: (postId: string, platform: string) => 
    trackEvent('share', 'blog', `${postId}_${platform}`),
  
  tagClick: (tag: string) => trackEvent('tag_click', 'navigation', tag),
  
  newsletterSignup: () => trackEvent('signup', 'newsletter'),
  
  downloadResource: (resource: string) => trackEvent('download', 'resource', resource),
  
  externalLinkClick: (url: string) => trackEvent('external_link', 'navigation', url),
  
  commentPosted: (postId: string) => trackEvent('comment', 'engagement', postId),
  
  timeOnPage: (postId: string, timeInSeconds: number) => 
    trackEvent('time_on_page', 'engagement', postId, timeInSeconds)
}

// Performance tracking
export const trackPerformance = {
  pageLoad: (loadTime: number) => trackEvent('page_load_time', 'performance', undefined, loadTime),
  
  searchLatency: (latency: number) => trackEvent('search_latency', 'performance', undefined, latency),
  
  imageLoad: (imageSrc: string, loadTime: number) => 
    trackEvent('image_load_time', 'performance', imageSrc, loadTime)
}

// Error tracking
export const trackError = (error: Error, context?: string) => {
  if (typeof window !== 'undefined') {
    // Track in Google Analytics
    if (window.gtag && GA_TRACKING_ID) {
      window.gtag('event', 'exception', {
        description: `${context ? context + ': ' : ''}${error.message}`,
        fatal: false
      })
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Tracked Error:', { error, context })
    }
    
    // You can also send to external error tracking service like Sentry here
  }
}

// User engagement tracking
export const trackEngagement = {
  init: () => {
    if (typeof window === 'undefined') return
    
    // Track time on site
    const startTime = Date.now()
    
    const trackTimeOnSite = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      trackEvent('time_on_site', 'engagement', undefined, timeSpent)
    }
    
    // Track on page unload
    window.addEventListener('beforeunload', trackTimeOnSite)
    
    // Track scroll depth
    let maxScrollDepth = 0
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent
        
        // Track at 25%, 50%, 75%, and 100% scroll depths
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          trackEvent('scroll_depth', 'engagement', undefined, scrollPercent)
        }
      }
    }
    
    window.addEventListener('scroll', trackScrollDepth, { passive: true })
    
    // Track clicks on external links
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.href && !link.href.startsWith(window.location.origin)) {
        trackBlogEvent.externalLinkClick(link.href)
      }
    })
  }
}

// Initialize engagement tracking on page load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackEngagement.init)
  } else {
    trackEngagement.init()
  }
}