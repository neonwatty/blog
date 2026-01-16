# Browser Workflows

> Auto-generated workflow documentation for Jeremy Watt's Blog
> Last updated: 2026-01-16
> Base URL: http://localhost:3000 (or production URL)

## Quick Reference

| Workflow | Purpose | Steps |
|----------|---------|-------|
| Homepage Navigation | Core browsing and post discovery | 6 |
| Read Blog Post | Full post reading experience | 7 |
| Browse and Filter Tags | Tag discovery and filtering | 6 |
| View Projects | Project showcase exploration | 5 |
| Theme Toggle | Light/dark mode switching | 4 |
| 404 Error Handling | Error recovery flow | 4 |

---

## Core Workflows

### Workflow: Homepage Navigation

> Tests the main landing page experience, post discovery, and navigation to key sections.

**Reference Examples:** Dan Abramov's overreacted.io, Josh Comeau's blog
**Expected Web Conventions:**
- Clean, readable typography with clear hierarchy
- Posts organized chronologically or by year
- Hover states on all interactive elements
- Clear navigation to about, projects, and other sections

1. Navigate to the homepage
   - Open the browser and go to the site URL
   - Verify the page loads without errors
   - Verify the hero section displays with profile image and social links

2. Verify header navigation
   - Verify navigation links are visible: Posts, Projects, Slides, About
   - Verify theme toggle button is present
   - Hover over each nav link and verify underline animation appears

3. Browse blog posts by year
   - Verify posts are grouped by year with year headings
   - Verify each post shows title, date, reading time, and tags
   - Verify tag pills are clickable

4. Test post link interaction
   - Hover over a post title
   - Verify hover state appears
   - Click on a post title
   - Verify navigation to the post page

5. Test social links
   - Locate the social media links (GitHub, X, LinkedIn, Discord)
   - Verify each link has a hover state
   - Verify links open in new tabs

6. Verify web platform conventions
   - Verify all interactive elements have hover states
   - Verify browser back button works correctly after navigation
   - Verify URLs are shareable/deep-linkable
   - Verify layout is responsive (resize browser window)

---

### Workflow: Read Blog Post

> Tests the full blog post reading experience including navigation, content rendering, and tag interaction.

**Reference Examples:** Medium, Dev.to, CSS-Tricks
**Expected Web Conventions:**
- Clear breadcrumb navigation
- Readable typography with proper line length
- Syntax-highlighted code blocks
- Tag links for related content discovery

1. Navigate to a blog post
   - From the homepage, click on any blog post title
   - Verify the post page loads
   - Verify the URL reflects the post slug

2. Verify breadcrumb navigation
   - Verify breadcrumbs show: Home > Blog > [Post Title]
   - Click on "Home" in breadcrumbs
   - Verify navigation back to homepage
   - Use browser back button to return to post

3. Verify post metadata
   - Verify post title is displayed prominently
   - Verify date and reading time are shown
   - Verify tags are displayed and clickable

4. Read post content
   - Scroll through the post content
   - Verify text is readable with proper typography
   - Verify images load correctly (if present)
   - Verify code blocks have syntax highlighting (if present)

5. Test tag navigation
   - Click on a tag pill
   - Verify navigation to the tag filter page
   - Verify the tag filter shows related posts

6. Verify footer
   - Scroll to the bottom of the page
   - Verify footer with social links is visible
   - Verify Discord CTA is present

7. Verify web platform conventions
   - Verify all links have hover states
   - Verify the URL is shareable (copy and paste in new tab)
   - Verify keyboard navigation works (Tab through interactive elements)
   - Verify page is responsive at different viewport widths

---

### Workflow: Browse and Filter Tags

> Tests tag discovery, filtering, and navigation between tag views.

**Reference Examples:** Hashnode tags, Dev.to tags
**Expected Web Conventions:**
- Clear tag cloud or list with post counts
- Filter results showing relevant posts
- Easy navigation between tags

1. Navigate to the tags page
   - Click on "Posts" in the header navigation (or go to /tags directly)
   - Alternatively, click on any tag from a blog post
   - Verify the tags page loads

2. Explore popular tags
   - Verify "Popular Tags" section is displayed
   - Verify each tag shows a post count
   - Hover over a tag card and verify hover state (border color change)

3. Browse all tags
   - Scroll to "All Tags" section
   - Verify tags are displayed as pills
   - Verify hover effects on tag pills

4. Filter by a specific tag
   - Click on any tag (e.g., "claude-code" or "AI")
   - Verify navigation to /tags/[tag] page
   - Verify breadcrumbs show: Home > Tags > [Tag Name]
   - Verify only posts with that tag are displayed

5. Navigate between tags
   - From the filtered view, click on a different tag in a post card
   - Verify the filter updates to the new tag
   - Verify URL updates accordingly

6. Verify web platform conventions
   - Verify browser back button navigates correctly through tag history
   - Verify all tag links have hover states
   - Verify layout is responsive

---

### Workflow: View Projects

> Tests the projects showcase page with external links.

**Reference Examples:** GitHub profile READMEs, portfolio sites
**Expected Web Conventions:**
- Grid layout with project cards
- Clear project titles and descriptions
- Visible external link indicators

1. Navigate to the projects page
   - Click "Projects" in the header navigation
   - Verify the projects page loads
   - Verify page title "Projects" is displayed

2. Browse project cards
   - Verify projects are displayed in a grid layout
   - Verify each project shows: image, title, description, type icon
   - Verify staggered animation on page load

3. Test project card hover
   - Hover over a project card
   - Verify image scale animation
   - Verify hover state feedback

4. Test external links
   - Click on a project card
   - Verify link opens in a new tab
   - Verify the external site loads correctly

5. Verify web platform conventions
   - Verify all cards have hover states
   - Verify layout adapts to different viewport widths
   - Verify type icons (GitHub, Chrome, npm) are visible

---

## Feature Workflows

### Workflow: Theme Toggle

> Tests light/dark mode switching and persistence.

**Reference Examples:** Tailwind docs, Next.js docs
**Expected Web Conventions:**
- Clear toggle button with icon
- Smooth transition between themes
- System preference detection

1. Identify the theme toggle
   - Locate the theme toggle button in the header (sun/moon icon)
   - Note the current theme (light or dark)

2. Toggle the theme
   - Click the theme toggle button
   - Verify the theme switches (background, text colors change)
   - Verify smooth transition animation (300ms)

3. Verify theme persistence
   - Navigate to a different page
   - Verify the selected theme persists
   - Refresh the page
   - Verify the theme is still applied

4. Verify web platform conventions
   - Verify the toggle button has a hover state
   - Verify all page elements respect the theme
   - Verify code blocks update with theme-appropriate colors

---

## Edge Case Workflows

### Workflow: 404 Error Handling

> Tests the not found page and recovery options.

1. Trigger a 404 error
   - Navigate to a non-existent URL (e.g., /this-page-does-not-exist)
   - Verify the 404 page loads

2. Verify 404 page content
   - Verify large "404" heading is displayed
   - Verify helpful error message is shown
   - Verify recovery links are present

3. Test recovery options
   - Click the "Go to Homepage" link
   - Verify navigation to the homepage
   - Use browser back button
   - Click the "Browse Tags" link
   - Verify navigation to tags page

4. Verify web platform conventions
   - Verify recovery links have hover states
   - Verify the page maintains site styling (header, footer)

---

## UX Verification Checklist

For each workflow, verify these web platform conventions:

### Navigation
- [ ] Browser back/forward buttons work correctly
- [ ] URLs are shareable and deep-linkable
- [ ] Navigation doesn't break browser history

### Interaction
- [ ] All interactive elements have visible hover states
- [ ] Keyboard navigation (Tab) works for all interactive elements
- [ ] Focus indicators are visible when tabbing

### Visual
- [ ] Layout is responsive at 1200px, 768px, and 375px widths
- [ ] Typography is readable at all sizes
- [ ] Images load with proper aspect ratios

### Accessibility
- [ ] Links have descriptive text (not just "click here")
- [ ] Images have alt text
- [ ] Color is not the only indicator of state
