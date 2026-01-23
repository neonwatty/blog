# iOS Workflows

> Auto-generated workflow documentation for Jeremy Watt's Blog
> Last updated: 2026-01-16
> Base URL: http://localhost:3000 (or production URL)
> Platform: Web app tested in Safari on iOS Simulator

## Quick Reference

| Workflow | Purpose | Steps |
|----------|---------|-------|
| Homepage Mobile Browsing | Mobile-first navigation and discovery | 6 |
| Mobile Menu Navigation | Hamburger menu interaction | 6 |
| Read Blog Post Mobile | Touch-friendly post reading | 6 |
| Browse Tags Mobile | Tag filtering on mobile | 5 |
| Theme Toggle Mobile | Dark mode switching on mobile | 4 |

---

## iOS Platform UX Conventions

Since this blog should work well on mobile Safari, verify these conventions:

### Expected Patterns
- Tap targets at least 44x44pt
- Smooth scroll behavior
- Touch-friendly navigation
- Readable typography without zooming
- Proper safe area handling (notched devices)

### Anti-Patterns to Flag
- Tiny tap targets (< 44pt)
- Hover-dependent interactions with no touch alternative
- Text too small to read without zooming
- Horizontal scroll on content areas
- Elements hidden behind the notch or home indicator

---

## Core Workflows

### Workflow: Homepage Mobile Browsing

> Tests the mobile landing page experience, scrolling, and post discovery.

**URL:** http://localhost:3000/

**Reference Examples:** Medium mobile, Substack mobile
**Expected iOS Conventions:**
- Full-width content with proper margins
- Scrollable content without horizontal overflow
- Touch-friendly interactive elements

1. Open the homepage in Safari
   - Open Safari and navigate to the site URL
   - Wait for the page to load completely
   - Verify the hero section displays correctly

2. Verify mobile layout
   - Verify content is full-width without horizontal scroll
   - Verify text is readable without zooming
   - Verify profile image and social links are visible

3. Scroll through blog posts
   - Swipe up to scroll through posts
   - Verify smooth scrolling behavior
   - Verify posts are grouped by year
   - Verify each post shows title, date, and tags

4. Test tap interactions
   - Tap on a blog post title
   - Verify navigation to the post page
   - Tap browser back button
   - Verify return to homepage

5. Test social links
   - Tap on a social media icon (GitHub, X, etc.)
   - Verify link opens correctly
   - Return to Safari

6. Verify iOS platform conventions
   - Verify all tap targets are at least 44x44pt
   - Verify no horizontal overflow
   - Verify content respects safe areas (notched devices)
   - Verify font sizes are readable (minimum 16px for body text)

---

### Workflow: Mobile Menu Navigation

> Tests the hamburger menu interaction and mobile navigation.

**URL:** http://localhost:3000/

1. Locate the mobile menu
   - Verify the hamburger menu icon (three lines) is visible in the header
   - Verify the menu button is at least 44x44pt

2. Open the mobile menu
   - Tap the hamburger menu button
   - Verify the menu panel slides out
   - Verify navigation links are visible: Posts, Projects, Slides, About
   - Verify backdrop darkens the page

3. Navigate using the menu
   - Tap "About" in the menu
   - Verify navigation to the About page
   - Verify the menu closes automatically

4. Test menu close interactions
   - Tap the hamburger menu to open
   - Tap the backdrop (outside the menu)
   - Verify the menu closes

5. Test menu accessibility
   - Open the menu
   - Verify all menu items are large enough to tap easily
   - Verify menu items have adequate spacing

6. Verify iOS platform conventions
   - Verify menu animation is smooth
   - Verify menu doesn't cover the entire screen unnecessarily
   - Verify tap targets in menu are at least 44x44pt
   - Verify menu works correctly in both portrait and landscape

---

### Workflow: Read Blog Post Mobile

> Tests the mobile blog post reading experience with touch interactions.

**URL:** http://localhost:3000/posts/[any-post-id]

**Reference Examples:** Medium app, Apple News
**Expected iOS Conventions:**
- Readable line length (45-75 characters)
- Proper text sizing without zoom
- Touch-friendly tag links
- Smooth scrolling through long content

1. Navigate to a blog post
   - From the homepage, tap on any blog post title
   - Verify the post page loads
   - Verify breadcrumbs are visible

2. Verify mobile typography
   - Verify body text is readable (minimum 16px)
   - Verify line length is comfortable (not too wide)
   - Verify headings have proper hierarchy
   - Verify code blocks are readable and scrollable horizontally

3. Scroll through content
   - Swipe up to scroll through the post
   - Verify smooth scrolling
   - Verify images scale properly
   - Verify no horizontal overflow on text content

4. Test breadcrumb navigation
   - Tap "Home" in the breadcrumbs
   - Verify navigation to homepage
   - Use Safari back button to return

5. Test tag interaction
   - Locate tags at the top of the post
   - Tap on a tag
   - Verify navigation to tag filter page

6. Verify iOS platform conventions
   - Verify tap targets (tags, links) are at least 44x44pt
   - Verify text can be selected for copy/paste
   - Verify no content is cut off by device notch
   - Verify code blocks can be scrolled horizontally with touch

---

### Workflow: Browse Tags Mobile

> Tests tag discovery and filtering on mobile devices.

**URL:** http://localhost:3000/tags

1. Navigate to tags page
   - Open the mobile menu
   - Tap on "Posts" or navigate directly to /tags
   - Verify the tags page loads

2. Browse popular tags
   - Verify "Popular Tags" section is visible
   - Verify tag cards are large enough to tap
   - Verify post counts are visible

3. Tap on a tag to filter
   - Tap on a popular tag card
   - Verify navigation to /tags/[tag]
   - Verify filtered posts are displayed
   - Verify breadcrumbs show the tag name

4. Browse all tags
   - Scroll to "All Tags" section (or navigate back)
   - Verify tag pills wrap properly on mobile
   - Tap on a different tag
   - Verify filter updates

5. Verify iOS platform conventions
   - Verify all tag tap targets are at least 44x44pt
   - Verify tags don't overflow horizontally
   - Verify spacing between tags allows easy tapping
   - Verify Safari back button navigates correctly

---

### Workflow: Theme Toggle Mobile

> Tests light/dark mode switching on mobile Safari.

**URL:** http://localhost:3000/

1. Locate the theme toggle
   - Verify the theme toggle button is visible in the header
   - Note the current theme (sun or moon icon)
   - Verify the button is at least 44x44pt

2. Toggle the theme
   - Tap the theme toggle button
   - Verify the theme switches (colors change)
   - Verify all page elements update

3. Verify theme across pages
   - Navigate to a different page (About, Projects)
   - Verify the theme persists
   - Navigate back to homepage
   - Verify theme is still applied

4. Verify iOS platform conventions
   - Verify toggle button is easy to tap
   - Verify theme colors have sufficient contrast
   - Verify text is readable in both light and dark modes
   - Verify no elements become invisible after theme change

---

## iOS UX Verification Checklist

For each workflow, verify these mobile-specific conventions:

### Touch Interactions
- [ ] All tap targets are at least 44x44pt
- [ ] Adequate spacing between tappable elements
- [ ] No hover-dependent interactions without touch fallback

### Layout
- [ ] No horizontal scroll on main content
- [ ] Content respects safe areas (notch, home indicator)
- [ ] Proper portrait and landscape support
- [ ] Text is readable without zooming (16px+ body text)

### Navigation
- [ ] Safari back/forward buttons work correctly
- [ ] Mobile menu is easily accessible
- [ ] Menu closes after navigation

### Performance
- [ ] Pages load quickly
- [ ] Smooth scrolling
- [ ] Images load without layout shift

### Accessibility
- [ ] Text has sufficient contrast
- [ ] Interactive elements are distinguishable
- [ ] Forms use appropriate keyboard types (if any)

---

## Device Testing Matrix

Test these workflows on multiple iOS Simulator device sizes:

| Device | Screen Size | Notes |
|--------|-------------|-------|
| iPhone SE (3rd gen) | 375 x 667 | Smallest current iPhone |
| iPhone 15 | 393 x 852 | Standard size |
| iPhone 15 Pro Max | 430 x 932 | Largest current iPhone |

### Orientation Testing
- [ ] Portrait mode (primary)
- [ ] Landscape mode (where applicable)
