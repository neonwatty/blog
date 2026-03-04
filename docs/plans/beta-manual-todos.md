# Beta Launch — Manual To-Dos

Items that require human action outside the codebase (service provider settings, deployment config, external tools, etc.).

---

## From Iteration 1 (2026-03-03)

- [ ] **Add privacy policy page** — required for GDPR/analytics compliance; create `/privacy` route with cookie usage details
- [ ] **Add terms of service page** — standard legal page for public-facing site
- [ ] **Set up error monitoring** — Sentry or similar service for production error tracking; currently no runtime error visibility
- [ ] **Set `GOOGLE_VERIFICATION_CODE` env var** — referenced in `app/layout.tsx` metadata but undefined in Vercel; add via Vercel dashboard
- [ ] **Configure Content-Security-Policy header** — add CSP to `vercel.json` headers array; currently only has X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- [ ] **Review PostHog autocapture settings** — autocapture is enabled; verify event volume is acceptable and not capturing sensitive interactions
