# Jeremy Watt's Blog

A production-ready, high-performance blog built with Next.js 15, featuring excellent SEO, accessibility, and user experience.

## ✨ Features

- **🚀 Next.js 15** - Latest React framework with App Router
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **🔍 Advanced SEO** - Structured data, meta tags, and sitemap
- **♿ Accessibility** - WCAG 2.1 compliant with full keyboard navigation
- **🔎 Search Functionality** - Fast, accessible search with keyboard navigation
- **📊 Analytics Integration** - Built-in analytics and performance monitoring
- **🧪 Testing Suite** - Unit tests with Jest and E2E tests with Playwright
- **🎨 Modern UI** - Clean, professional design with dark mode support
- **📄 Static Export** - Generates static files for optimal performance
- **🔒 Security** - Security headers and best practices
- **📡 RSS Feeds** - Multiple feed formats (RSS 2.0, JSON, Atom)
- **🏷️ Tagging System** - Organized content with tag-based navigation
- **📤 Social Sharing** - Native and platform-specific sharing options

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Content**: Markdown with frontmatter
- **Analytics**: Vercel Analytics & Speed Insights
- **Testing**: Jest (unit) + Playwright (E2E)
- **Deployment**: GitHub Pages via GitHub Actions
- **Icons**: Heroicons + Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd modern-blog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run dev:clean    # Clean .next and start dev server

# Building
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript checks

# Testing
npm run test         # Run unit tests
npm run test:ci      # Run tests in CI mode with coverage
npm run test:e2e     # Run E2E tests
npm run test:e2e:ui  # Run E2E tests with UI

# Content Generation
npm run generate:rss     # Generate RSS feeds
npm run generate:sitemap # Generate sitemap

# Analysis
npm run analyze      # Analyze bundle size
```

## 📝 Content Management

### Adding Blog Posts

1. Create a new `.md` file in the `posts/` directory
2. Add frontmatter with required fields:

```markdown
---
title: "Your Blog Post Title"
date: "2025-01-15"
excerpt: "A brief description of your post"
tags: ["Next.js", "React", "TypeScript"]
featured: false
author: "Your Name"
image: "/images/post-image.jpg" # Optional
seoTitle: "Custom SEO Title" # Optional
metaDescription: "Custom meta description" # Optional
---

# Your Blog Post Content

Write your content here using standard Markdown syntax.
```

### Required Frontmatter Fields

- `title`: Post title
- `date`: Publication date (YYYY-MM-DD format)
- `excerpt`: Brief description for previews
- `tags`: Array of relevant tags
- `author`: Author name

### Optional Frontmatter Fields

- `featured`: Set to `true` for featured posts
- `image`: Featured image path
- `seoTitle`: Custom SEO title (defaults to title)
- `metaDescription`: Custom meta description (defaults to excerpt)
- `canonicalUrl`: Custom canonical URL
- `relatedPosts`: Array of related post IDs

## 🎨 Customization

### Styling

The blog uses Tailwind CSS with a custom configuration. Key files:

- `tailwind.config.js` - Tailwind configuration
- `app/globals.css` - Global styles and CSS variables
- `components/` - Reusable styled components

### Site Configuration

Update these files to customize your blog:

- `app/layout.tsx` - Site metadata and global settings
- `components/Header.tsx` - Navigation and site title  
- `components/Footer.tsx` - Footer content and links
- `next.config.mjs` - Next.js configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your-google-analytics-id
GOOGLE_VERIFICATION_CODE=your-google-verification-code
```

## 🔍 SEO Features

- **Structured Data**: JSON-LD for articles and website
- **Meta Tags**: Open Graph and Twitter Card support
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine directives
- **RSS Feeds**: Multiple feed formats
- **Performance**: Optimized Core Web Vitals

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliant**
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and landmarks  
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Meets accessibility standards
- **Semantic HTML**: Proper heading hierarchy and structure

## 🧪 Testing

### Unit Tests

Located in `__tests__/` directory. Run with:

```bash
npm run test
npm run test:ci # With coverage
```

### E2E Tests  

Located in `tests/e2e/` directory. Run with:

```bash
npm run test:e2e
npm run test:e2e:ui # With Playwright UI
```

### Test Coverage

The project maintains high test coverage with thresholds:
- Branches: 70%
- Functions: 70% 
- Lines: 70%
- Statements: 70%

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Enable GitHub Pages in your repository settings
2. Set source to "GitHub Actions"
3. Push to main branch - deployment happens automatically
4. Update `NEXT_PUBLIC_SITE_URL` in the workflow file

### Manual Deployment

```bash
npm run build
# Copy the 'out' folder to your static hosting provider
```

### Environment Variables for Production

Set these in your deployment environment:

- `NEXT_PUBLIC_SITE_URL`: Your site's URL
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID (optional)

## 📊 Performance

The blog is optimized for performance:

- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: Next.js Image component with WebP support
- **Code Splitting**: Automatic code splitting and lazy loading
- **Bundle Analysis**: Built-in bundle analyzer
- **Core Web Vitals**: Monitored with Vercel Speed Insights

## 🔒 Security

Security best practices implemented:

- **Security Headers**: CSP, HSTS, and other protective headers
- **Input Sanitization**: Safe markdown processing
- **Dependencies**: Regular security audits and updates
- **Environment Variables**: Secure handling of sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with a detailed description
3. Include steps to reproduce the problem

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vercel for hosting and analytics solutions
- The open-source community for inspiration and tools

---

Built with ❤️ using modern web technologies