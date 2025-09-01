# GitHub Pages Deployment Guide

## Changes Made for neonwatty.com

### Updated Files
1. **`.github/workflows/deploy.yml`** - Updated for custom domain
2. **`public/CNAME`** - Created for neonwatty.com domain
3. **`.env.local`** - Set to use neonwatty.com
4. **`.github/workflows/ci.yml`** - Updated build URLs

### Key Changes in GitHub Workflow

#### Before (GitHub Pages subdirectory)
```yaml
NEXT_PUBLIC_SITE_URL: ${{ github.event.repository.name == 'neonwatty.github.io' && 'https://neonwatty.github.io' || format('https://neonwatty.github.io/{0}', github.event.repository.name) }}
```

#### After (Custom domain)
```yaml
NEXT_PUBLIC_SITE_URL: https://neonwatty.com
```

## Deployment Setup

### 1. GitHub Repository Settings
- Go to repository **Settings** → **Pages**
- Source: **Deploy from a branch** or **GitHub Actions**
- If using custom domain: Set **Custom domain** to `neonwatty.com`
- Enable **Enforce HTTPS**

### 2. DNS Configuration (Required)
Configure your domain DNS to point to GitHub Pages:

**For apex domain (neonwatty.com):**
```
A    185.199.108.153
A    185.199.109.153  
A    185.199.110.153
A    185.199.111.153
```

**For www subdomain (optional):**
```
CNAME    www.neonwatty.com -> neonwatty.github.io
```

### 3. Environment Variables (Optional)
Set in **Repository Settings** → **Secrets and variables** → **Actions**:
- `GA_TRACKING_ID`: Your Google Analytics tracking ID

## Deployment Process

### Automatic Deployment
Pushes to `main` branch automatically trigger:
1. **Quality checks**: Linting, type checking, tests
2. **Build**: Next.js static export with SEO optimizations
3. **Deploy**: Upload to GitHub Pages

### Manual Deployment
Use **Actions** → **Deploy Blog to GitHub Pages** → **Run workflow**

## SEO Features Included
- ✅ XML Sitemap with priorities
- ✅ Robots.txt with correct domain
- ✅ Open Graph images for social sharing
- ✅ Structured data (JSON-LD) schemas
- ✅ PWA manifest with multiple icon sizes
- ✅ RSS feeds (XML, JSON, Atom)
- ✅ Breadcrumb navigation
- ✅ Meta tags optimized for neonwatty.com

## Testing
Both workflows have been tested with `act`:
```bash
act push -W .github/workflows/deploy.yml --dryrun
act push -W .github/workflows/ci.yml --dryrun
```

All tests pass successfully! 🎉

## Post-Deployment
1. Verify site loads at https://neonwatty.com
2. Test sitemap: https://neonwatty.com/sitemap.xml
3. Submit sitemap to Google Search Console
4. Test social media sharing with OG images