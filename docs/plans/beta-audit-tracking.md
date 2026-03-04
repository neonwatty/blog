# Beta Audit Tracking

Holistic beta-readiness audit across feature completeness, error handling, UX polish, ops readiness, and performance.

---

## Iteration Log

### Iteration 1 (2026-03-03)

**Dimensions Audited:** All 5 (Feature Completeness, Error Handling, UX Polish, Ops Readiness, Performance)
**Findings:** 17 code items (5 HIGH, 7 MEDIUM, 5 LOW)
**Fixed:** 10 (5 HIGH, 5 MEDIUM)
**Deferred:** 7 (2 MEDIUM, 5 LOW — next iteration or manual)

#### Fixed (CODE)

- [x] Missing skip-to-content link for keyboard navigation — added to root layout with `#main-content` targets on all public pages (dimension: UX Polish, severity: HIGH)
- [x] TreasureMap lightbox missing `role="dialog"`, `aria-modal`, `aria-label`, keyboard focus, close button semantics (dimension: UX Polish, severity: HIGH)
- [x] VideoModal missing `role="dialog"`, `aria-modal`, `aria-label` (dimension: UX Polish, severity: HIGH)
- [x] RawEditor upload errors silently logged to console — now displayed to user with dismissable error banner (dimension: Error Handling, severity: HIGH)
- [x] TreasureMap close "X" was a div — converted to semantic `<button>` with `aria-label` (dimension: UX Polish, severity: HIGH)
- [x] CookieConsent dialog missing `aria-modal="true"` (dimension: UX Polish, severity: MEDIUM)
- [x] Footer social icon links missing `aria-label` — added GitHub, X, LinkedIn, Discord labels (dimension: UX Polish, severity: MEDIUM)
- [x] ProjectsFilter buttons missing `aria-pressed` state (dimension: UX Polish, severity: MEDIUM)
- [x] `id="main-content"` skip target missing on posts, projects, about, project-updates pages (dimension: UX Polish, severity: MEDIUM)
- [x] RawEditor test updated to verify error is shown in UI instead of console (dimension: Error Handling, severity: MEDIUM)

#### Deferred (CODE — next iteration)

- [ ] Redundant data fetching on tags page — `getPopularTags()` and `getAllTags()` both call `getSortedPostsData()` (dimension: Performance, severity: MEDIUM)
- [ ] Non-optimized images on homepage — `<img>` tags instead of Next.js `<Image>` (dimension: Performance, severity: MEDIUM)
- [ ] No pagination on tag results page (dimension: Performance, severity: LOW)
- [ ] Reveal.js loading delay in Slideshow component (dimension: Performance, severity: LOW)
- [ ] Missing route-level error.tsx boundaries (dimension: Error Handling, severity: LOW)
- [ ] No timeout handling for Slideshow reveal.js load (dimension: Error Handling, severity: LOW)
- [ ] Heavy client-side bundle for admin components (dimension: Performance, severity: LOW)

#### Manual To-Dos (logged to beta-manual-todos.md)

- Add privacy policy and terms of service pages
- Set up error monitoring (Sentry or similar)
- Set GOOGLE_VERIFICATION_CODE env var in Vercel
- Configure CSP header in vercel.json
- Review PostHog event volume and autocapture settings
