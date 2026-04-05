---
title: 'QA Skills: A Claude Code Plugin That Runs 6 AI Testing Agents Against Your App'
date: '2026-04-05'
excerpt: >-
  An open-source Claude Code plugin with 6 specialized QA agents, Playwright CLI
  automation, quantified scoring rubrics, and a full pipeline from workflow
  generation to E2E tests in CI.
tags:
  - Claude Code
  - AI QA Testing
  - Playwright
  - Agentic Testing
  - Claude Code Plugin
  - E2E Testing
  - Claude Code Skills
  - AI
featured: true
author: Jeremy Watt
seoTitle: 'QA Skills Claude Code Plugin — 6 AI Testing Agents with Quantified Scoring'
metaDescription: >-
  Open-source Claude Code plugin with 6 AI QA agents (smoke, UX, adversarial,
  security, mobile, performance), Playwright CLI automation, quantified binary
  scorecards, and full E2E test generation pipeline.
relatedPosts:
  - claude-code-workflow-testing-mcp
  - socratic-interview-skills-claude-code
  - playwright-profiles-claude-code-plugin
---

"Agentic testing" is everywhere right now. The idea is simple: instead of writing test scripts by hand, you dispatch AI agents that navigate your app, find bugs, and report back. Every major QA trends piece in 2026 names it as the #1 shift in software testing.

But when you look at what's actually available, it's mostly one of three things: a single-persona exploratory tester running through Playwright MCP, a custom internal pipeline that took a team months to build, or a generic test-case generator that doesn't touch a real browser.

I wanted something I could install in any project and run immediately — with specialized agents that catch different *classes* of bugs, real browser automation that works in CI, and quantified scoring so I can measure quality over time.

That's why I built [qa-skills](https://github.com/neonwatty/qa-skills), a Claude Code plugin.

## What It Does

qa-skills is a QA testing pipeline for Claude Code. Install it, point it at your app, and it gives you:

- **6 specialized QA agents** that autonomously navigate and inspect your app
- **Quantified scoring rubrics** — binary scorecards like 47/83 security checks passed
- **Interactive workflow generation** — walk through your app with Claude, co-author test steps
- **Playwright E2E test conversion** — turn workflow docs into self-contained test projects
- **GitHub Actions CI** — generated CI workflows that run on every preview deployment
- **A learnings system** that accumulates observations across sessions

14 skills, 6 agents, 2 commands. One `claude plugin add`.

## The 6 Agents

Most approaches to AI QA testing use a single agent — one persona that navigates your app and writes a report. The problem is that a smoke tester and a security auditor *look at the same page completely differently*. A single persona either tries to do everything (and does nothing well) or catches one class of bugs and misses others.

qa-skills dispatches 6 specialized agents, each with a distinct mindset:

| Agent | Mindset | What It Catches |
|-------|---------|-----------------|
| **smoke-tester** | Optimistic | Broken flows, 500s, dead links, navigation failures |
| **ux-auditor** | Obsessive | Inconsistent spacing, missing empty states, bad copy, accessibility gaps |
| **adversarial-breaker** | Hostile | Auth bypasses, double-submit bugs, state corruption, race conditions |
| **security-auditor** | Systematic | OWASP Top 10, security headers, session handling, secrets exposure |
| **mobile-ux-auditor** | Platform-aware | Touch targets, iOS HIG violations, Safari quirks, gesture support |
| **performance-profiler** | Quantitative | Core Web Vitals, bundle size, DOM health, resource loading |

These aren't pipeline stages doing different *jobs* sequentially. They're different *mindsets* running against the same app simultaneously. The adversarial-breaker tries to double-submit your checkout form while the smoke-tester walks the happy path. They find fundamentally different bugs because they look for different things.

Run them all with one command:

```bash
/run-qa all
```

Or target a specific persona:

```bash
/run-qa security
```

## Quantified Scoring

This is the feature I haven't seen anywhere else. Every agent that uses a rubric produces a binary scorecard — not prose, not "looks good," but an enumerated checklist with pass/fail per item.

The security auditor checks 83 items across 10 OWASP categories. The mobile UX auditor checks 56 items against iOS HIG and Material Design 3 standards. The UX auditor checks 33 items across 10 quality categories.

A report looks like:

```
Security Score: 61/83

## 1. Injection (8/10)
  ✓ SQL injection via form inputs
  ✓ XSS in user-generated content
  ✗ Command injection in search params
  ✗ Template injection in dynamic renders
  ...
```

This changes what you can do with QA results:

- **Before/after comparison** — you shipped a fix, did the score actually improve?
- **Cross-page benchmarking** — which routes are the weakest?
- **Regression detection** — the score dropped from 61 to 58, something broke
- **Team communication** — "we're at 47/83 on security" is clearer than "we found some issues"

## Playwright CLI, Not MCP

This is a deliberate architectural choice that matters more than it sounds.

Most Claude Code QA approaches use Playwright MCP — an MCP server that exposes browser actions as tools. It works, but it has real limitations:

- **Single session**: Playwright MCP runs one browser at a time. You can't dispatch multiple agents in parallel.
- **Sidecar dependency**: Requires an MCP server process running alongside Claude Code.
- **CI fragility**: MCP connections can drop in headless CI environments.

qa-skills uses Playwright via the CLI instead. Each agent launches its own browser instance through `npx playwright`. This means:

- **Parallel agents** — all 6 agents can run simultaneously, each in its own browser
- **No MCP dependency** — just Playwright installed as a dev dependency
- **CI-native** — headless Playwright in CI is battle-tested across millions of projects
- **Headed mode** — for interactive walkthroughs, agents open a real visible browser

## The Full Pipeline

Most tools stop at "find bugs and report." qa-skills covers the full lifecycle:

### 1. Generate Workflows

Walk through your app interactively with Claude. The workflow generators open a real browser, present you with screenshots at each step, and ask what to verify and which edge cases to test. You co-author the test plan — Claude handles the mechanics, you provide the domain knowledge.

```bash
/desktop-workflow-generator
```

Output: structured markdown in `/workflows/desktop-workflows.md` with numbered steps, verifications, and edge cases for every flow.

### 2. Convert to Playwright E2E Tests

Feed the workflow docs to a converter and get a self-contained Playwright test project:

```
e2e/desktop/
├── playwright.config.ts
├── package.json
├── tests/
│   ├── auth.setup.ts
│   └── workflows.spec.ts
└── .github/workflows/e2e.yml
```

The generated tests include auth setup with `storageState`, Vercel deployment protection bypass headers, and a GitHub Actions workflow that triggers on preview deployments.

### 3. Run QA Agents

Dispatch agents against your running app. They navigate autonomously, check every route, and produce scored reports.

### 4. Accumulate Learnings

Every agent records observations to `.qa-learnings/ledger.md` after each session. Over time, these accumulate into a dataset of field observations. Run `/review-learnings` to synthesize them into prioritized improvements, or `/submit-learnings` to open a GitHub issue upstream on the plugin repo itself.

## Authentication Built In

This is a gap across every competitor I've looked at. Real apps require login. OAuth flows, 2FA, role-based access — none of the existing AI QA approaches handle this.

qa-skills has a profile system:

```bash
/setup-profiles
```

This opens a headed browser for each user role (admin, member, guest — whatever your app needs). You log in manually, handling OAuth redirects and 2FA yourself. The plugin saves the session state to `.playwright/profiles/` and every subsequent agent run loads it automatically.

The workflow converters generate `auth.setup.ts` files that restore these sessions in CI using environment variables from GitHub Secrets.

## Mobile + Platform Standards

The mobile UX auditor doesn't just resize the viewport. It checks against specific platform standards:

- **iOS Human Interface Guidelines** — navigation patterns, safe areas, control sizing
- **Material Design 3** — component specs, spacing, elevation
- **Touch targets** — 44pt minimum per WCAG/Apple guidelines
- **Safari-specific quirks** — viewport units, rubber banding, keyboard behavior

The mobile workflow generator runs at 393x852 (iPhone 15 Pro) and includes anti-pattern detection tables that flag common mobile UX mistakes.

## How It Compares

I surveyed everything I could find in the Claude Code QA space:

| | qa-skills | Single-persona tools | Custom pipelines |
|---|---|---|---|
| **Reusable** | Plugin — one install | Blog guides | Internal only |
| **Agents** | 6 mindset-based | 1 generic | 2-8 pipeline stages |
| **Scoring** | Binary scorecards | Qualitative | Qualitative |
| **Browser** | Playwright CLI | Playwright MCP | Varies |
| **Auth** | Multi-user profiles | None | None |
| **Test generation** | Full E2E projects | None | Partial |
| **Mobile** | HIG + MD3 rubrics | Viewport resize | None |
| **Security** | 83 OWASP checks | None | Partial |
| **Performance** | Web Vitals | None | None |

## Quick Start

```bash
# Install the plugin
claude plugin add neonwatty/qa-skills

# Set up auth profiles for your app
/setup-profiles

# Generate workflow documentation
/desktop-workflow-generator

# Run all QA agents
/run-qa all

# Convert workflows to Playwright E2E tests
/desktop-workflow-to-playwright
```

The plugin works with any web app. Route discovery is optimized for Next.js (App Router + Pages Router) with support for React Router, Remix, SvelteKit, and generic frameworks.

## Source

qa-skills is open source under MIT: [github.com/neonwatty/qa-skills](https://github.com/neonwatty/qa-skills)

14 skills. 6 agents. Quantified scoring. One plugin install.
