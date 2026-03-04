# Security Audit Tracking

Automated OWASP-aligned security audit. 10 categories to cover.

---

## Iteration Log

### Iteration 1 (2026-03-03)

**Categories Audited:** Auth & Access Control (#1), Secret Management (#4)
**Findings:** 4 (2 MEDIUM, 2 LOW)
**Fixed:** 2
**Deferred:** 0

#### Fixed

- [x] Path traversal in admin posts API — slug parameter used directly in `path.join()` without sanitization (category: Auth & Access Control, severity: MEDIUM)
- [x] Path traversal in image upload API — slug from FormData used directly in directory path construction (category: Auth & Access Control, severity: MEDIUM)

#### Not Actionable (by design)

- No security headers in next.config — site uses `output: 'export'` (static), headers must be set at CDN/hosting level (category: Secret Management, severity: LOW)
- VERCEL_OIDC_TOKEN in .env.local — server-only, gitignored, not exposed to client (category: Secret Management, severity: LOW)

#### Categories Remaining

- [ ] 2. Input Validation (A03)
- [ ] 3. Authorization & Row-Level Security (A01)
- [ ] 5. Security Headers (A05)
- [ ] 6. Dependency Vulnerabilities (A06)
- [ ] 7. Rate Limiting (A04)
- [ ] 8. Error Handling (A09)
- [ ] 9. CSRF/Session (A07)
- [ ] 10. Data Exposure (A02)

### Iteration 2 (2026-03-03)

**Categories Audited:** Input Validation (#2), Error Handling (#8)
**Findings:** 0 (0 HIGH, 0 MEDIUM)
**Fixed:** 0
**Deferred:** 0

#### Analysis

- **Input Validation (#2):** All user inputs properly validated. Slug parameters use regex `isSafeSlug()`. Frontmatter validated with Zod `PostFrontmatterSchema`. Image uploads enforce ALLOWED_TYPES whitelist and 5MB MAX_SIZE. Filenames sanitized with regex replacement. Markdown rendered with `rehype-sanitize` in PreviewPane. No raw string interpolation in queries.
- **Error Handling (#8):** All API error responses return generic messages without stack traces or internal details. Try/catch blocks log errors server-side via `console.error` but return only `{ error: 'Failed to ...' }` to clients. Auth failures return generic 404 (not 401/403), preventing information leakage about endpoint existence.

#### Categories Remaining

- [ ] 3. Authorization & Row-Level Security (A01)
- [ ] 5. Security Headers (A05)
- [ ] 6. Dependency Vulnerabilities (A06)
- [ ] 7. Rate Limiting (A04)
- [ ] 9. CSRF/Session (A07)
- [ ] 10. Data Exposure (A02)

### Iteration 3 (2026-03-03)

**Categories Audited:** Security Headers (#5), Dependency Vulnerabilities (#6)
**Findings:** 3 (1 MEDIUM, 2 LOW)
**Fixed:** 2
**Deferred:** 1

#### Fixed

- [x] Missing security headers — added X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy to `vercel.json` (category: Security Headers, severity: MEDIUM)
- [x] `ajv` <6.14.0 ReDoS vulnerability — fixed via `npm audit fix` (category: Dependency Vulnerabilities, severity: LOW)

#### Deferred

- [ ] `minimatch` ReDoS in `semantic-release` → `@semantic-release/npm` → `npm` → `minimatch` — dev-only transitive dependency, fix requires breaking `semantic-release` downgrade, no production risk (category: Dependency Vulnerabilities, severity: LOW)

#### Categories Remaining

- [ ] 3. Authorization & Row-Level Security (A01)
- [ ] 7. Rate Limiting (A04)
- [ ] 9. CSRF/Session (A07)
- [ ] 10. Data Exposure (A02)

### Iteration 4 (2026-03-03)

**Categories Audited:** Authorization & Row-Level Security (#3), CSRF/Session (#9)
**Findings:** 0 (0 HIGH, 0 MEDIUM)
**Fixed:** 0
**Deferred:** 0

#### Analysis

- **Authorization & RLS (#3):** Not applicable — no database exists. Posts are markdown files on disk. No multi-tenant architecture. Admin APIs gated by `NODE_ENV` check; in production static export (`output: 'export'`) eliminates API routes entirely. Single-author blog with no RBAC requirements.
- **CSRF/Session (#9):** Not applicable — no HTTP cookies used for authentication. `CookieConsent` component uses `localStorage` (not cookies). No session tokens anywhere in the codebase. No `Set-Cookie` headers in API responses. Dev-only admin API calls use no credentials or CSRF tokens, acceptable since no auth cookies exist and APIs are local-only.

#### Categories Remaining

- [ ] 7. Rate Limiting (A04)
- [ ] 10. Data Exposure (A02)

### Iteration 5 (2026-03-03)

**Categories Audited:** Rate Limiting (#7), Data Exposure (#10)
**Findings:** 0 (0 HIGH, 0 MEDIUM)
**Fixed:** 0
**Deferred:** 0

#### Analysis

- **Rate Limiting (#7):** Not applicable — production uses static export (`output: 'export'`) served by Vercel CDN with inherent DDoS protection. No server-side API routes exist in production. Dev-only admin APIs are local-only and not exposed to public traffic.
- **Data Exposure (#10):** No sensitive data in logs — `console.error` calls log generic error objects without PII. No PII in URL parameters — only UTM params forwarded to newsletter iframes (standard analytics). `.env.local` is gitignored and never committed to git history. Analytics respect cookie consent — PostHog and GA only load after explicit opt-in. Session recording disabled. Privacy flags properly configured.

#### All Categories Complete

All 10 OWASP categories have been audited:
- [x] 1. Auth & Access Control (A01) — Iteration 1
- [x] 2. Input Validation (A03) — Iteration 2
- [x] 3. Authorization & Row-Level Security (A01) — Iteration 4
- [x] 4. Secret Management (A02) — Iteration 1
- [x] 5. Security Headers (A05) — Iteration 3
- [x] 6. Dependency Vulnerabilities (A06) — Iteration 3
- [x] 7. Rate Limiting (A04) — Iteration 5
- [x] 8. Error Handling (A09) — Iteration 2
- [x] 9. CSRF/Session (A07) — Iteration 4
- [x] 10. Data Exposure (A02) — Iteration 5

**Total findings across all iterations:** 7 (3 MEDIUM, 4 LOW)
**Fixed:** 4 (3 MEDIUM, 1 LOW)
**Deferred:** 1 (LOW — dev-only transitive dep)
**Not actionable (by design):** 2 (LOW)
