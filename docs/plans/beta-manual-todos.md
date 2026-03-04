# Beta Launch — Manual To-Dos

Items that require human action outside the codebase (service provider settings, deployment config, external tools, etc.).

---

## From Iteration 1 (2026-03-03)

- [x] **Set up error monitoring** — Sentry project created (`blog` in mean-weasel-llc org), `@sentry/browser` integrated, DSN added to Vercel production env
- [x] **Reduce PostHog event volume** — disabled autocapture and pageleave; only pageviews captured now

### Dismissed (not needed for personal blog)

- ~Privacy policy / terms of service~ — no user accounts, no data collection, no forms; cookie consent banner covers analytics opt-in
- ~CSP header~ — inline scripts (`dangerouslySetInnerHTML` for UTM forwarding, image captions) would require `unsafe-inline`, negating CSP benefits
- ~`GOOGLE_VERIFICATION_CODE` env var~ — only needed if verifying Search Console via meta tag; can verify via DNS instead
