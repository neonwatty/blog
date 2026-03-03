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
