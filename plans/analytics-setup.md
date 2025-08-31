# Analytics Setup Plan

## Current State Analysis

Your blog already has **excellent analytics infrastructure** in place:

1. **Vercel Analytics** - Already installed and integrated (lines 105-106 in layout.tsx)
2. **Comprehensive Google Analytics setup** - Full tracking system in lib/analytics.ts with:
   - Page views and custom events
   - Reading progress tracking (25%, 50%, 75%, 100% scroll depth)
   - Time on page and engagement metrics
   - External link clicks
   - Tag clicks and search usage
   - Error tracking and performance monitoring
3. **GitHub Actions integration** - Deploy workflow already configured to use GA_TRACKING_ID secret

## Analytics Options

### Option 1: Google Analytics 4 (Recommended)
**Pros**: Most comprehensive, free, industry standard, excellent reporting
**Cons**: Google's data retention policies

### Option 2: Vercel Analytics (Already Active!)
**Pros**: Privacy-focused, zero configuration, integrates with Vercel deployment
**Cons**: Limited free tier, less detailed than GA4

### Option 3: Plausible Analytics
**Pros**: Privacy-focused, GDPR compliant, simple dashboard
**Cons**: Paid service, requires additional integration

### Option 4: Umami (Self-hosted)
**Pros**: Complete control, privacy-focused, open source
**Cons**: Requires server setup and maintenance

## Implementation Plan (Option 1: Google Analytics 4)

### 1. Create Google Analytics 4 Property
- Set up GA4 account and property for blog.neonwatty.com
- Get the measurement ID (format: G-XXXXXXXXXX)

### 2. Configure Environment Variables
- Add `NEXT_PUBLIC_GA_ID` to GitHub repository secrets
- Add `GOOGLE_VERIFICATION_CODE` for Search Console verification

### 3. Activate Tracking Code
- Add Google Analytics script to layout.tsx (currently missing)
- Your comprehensive tracking functions are already built and ready

### 4. Test Implementation
- Verify tracking in GA4 Real-time reports
- Test custom events (post views, scroll tracking, external links)

## Key Metrics You'll Get

- Page views and unique visitors
- Post engagement (time on page, scroll depth)
- External link clicks (GitHub, Twitter, LinkedIn, YouTube, Product Hunt)
- Tag navigation patterns
- Reading progress on blog posts
- Search usage (when search is re-enabled)
- Performance metrics and error tracking

## Implementation Notes

- All tracking code is already built in `lib/analytics.ts`
- Custom events include: `postView`, `tagClick`, `externalLinkClick`, `timeOnPage`
- Reading progress tracked at 25% intervals
- Error tracking and performance monitoring included
- Privacy-conscious implementation with opt-out capabilities

## Alternative: Stick with Vercel Analytics Only
- **Zero setup required** - already working
- View metrics in Vercel dashboard
- Add custom event tracking using Vercel's track() function

**Recommendation**: Start with Google Analytics 4 for comprehensive metrics, keep Vercel Analytics as backup.