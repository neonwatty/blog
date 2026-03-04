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
