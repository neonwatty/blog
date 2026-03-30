---
title: How to Set Up Your Repo for Claude Code and Codex
date: '2026-03-09'
lastUpdated: '2026-03-10'
excerpt: >-
  Nine layers of guardrails that make AI coding agents safe, predictable, and
  actually useful — from CLAUDE.md to CI pipelines to specialized review agents.
tags:
  - Claude Code
  - Codex
  - AI
  - Developer Tools
  - CI-CD
featured: true
draft: false
author: Jeremy Watt
seoTitle: How to Set Up Your Repo for Claude Code and Codex | Beginner's Guide
metaDescription: >-
  A beginner's guide to setting up your repo for AI coding agents. Nine layers
  of guardrails — CLAUDE.md, linting, CI, hooks, plugins, skills, CLI tools, and
  MCP servers — that make Claude Code and Codex safe and productive.
relatedPosts:
  - claude-code-workflow-testing-mcp
  - the-ralph-loop-is-a-fixed-point-process
  - claude-code-ci-babysitter
ogImage: /images/posts/og/how-to-set-up-your-repo-for-claude-code-and-codex.png
---

The simplest setups that keep the right things on rails are usually the best. Boris Cherny, the creator of Claude Code, [posted his own setup to X](https://x.com/bcherny/status/2007179832300581177) and it went viral — largely because people were surprised how vanilla it was. He doesn't over-customize. Peter Steinberger, the creator of OpenClaw, wrote a now-classic post called [Just Talk To It](https://steipete.me/posts/just-talk-to-it) that makes a similar point — the tool works well out of the box; what matters is how you set up the repo infrastructure around it.

If you've been writing software for a while, agentic engineering is going to force you to zoom out. Linting, type checking, CI, commit discipline — maybe you always meant to set these up properly but never got around to it because you were deep in the code. Working with agents changes the level of abstraction. You're no longer just writing code; you're managing the behavior of something that writes code for you. The surprising part is how easy most of this is to set up, and how much it matters — for both the agent and for you.

Setting up a repo for AI agents means two things:

1. **Giving the agent the context and tooling it needs to succeed** — so it doesn't waste tokens searching for things you could just tell it
2. **Backing up every stochastic move with something deterministic** — linting, CI, hooks, commit gates that catch problems regardless of what the agent does

These aren't new ideas. Developers have always needed them. AI agents just make the case undeniable, because agents move fast and don't second-guess themselves. Once it's in place, it works for humans and agents alike.

## Table of Contents

- [Before You Start](#before-you-start)
- [Layer 1: CLAUDE.md / AGENTS.md — Give the Agent Context Upfront](#layer-1-claudemd--agentsmd--give-the-agent-context-upfront)
- [Layer 2: CLI Tools — Your Agent Already Has Access](#layer-2-cli-tools--your-agent-already-has-access)
- [Layer 3: Linting + Formatting with AI-Specific Rules](#layer-3-linting--formatting-with-ai-specific-rules)
- [Layer 4: CI Pipeline as a Gate](#layer-4-ci-pipeline-as-a-gate)
- [Layer 5: Commit and PR Discipline](#layer-5-commit-and-pr-discipline)
- [Layer 6: Agent Hooks — Deterministic Checks on Every Action](#layer-6-agent-hooks--deterministic-checks-on-every-action)
- [Layer 7: Plugins for Review and Automation](#layer-7-plugins-for-review-and-automation)
- [Layer 8: Skills as Process Guardrails](#layer-8-skills-as-process-guardrails)
- [Layer 9: MCP Servers](#layer-9-mcp-servers)
- [Start Building](#start-building)
- [Keep Experimenting](#keep-experimenting)

## Before You Start

**Naming:** Claude Code reads a `CLAUDE.md` file for project context. Codex, Copilot, and Cursor read `AGENTS.md`. The principles are identical — the filenames differ. This post covers both.

**Where agent config lives:** Claude Code uses a `.claude/` directory at your project root for hooks, agent definitions, skills, and settings. Codex uses `.agents/` (or `.codex/`) for similar purposes. Commit these directories to your repo — they're project configuration, not personal preferences.

**The easiest way to use this post:** give the URL to your agent of choice — Claude Code, Codex, whatever — and talk it over together. Let the agent help you implement each layer in your own repo as you go.

**Already have a repo?** If you're retrofitting an existing project, install the `claude-code-setup` plugin in Claude Code and run `/claude-automation-recommender`. It analyzes your codebase and suggests which hooks, skills, MCP servers, and plugins to add — specific to your project. It's the fastest way to get a tailored starting point.

-----

## Layer 1: CLAUDE.md / AGENTS.md — Give the Agent Context Upfront

Your agent shouldn't have to search through your codebase to figure out what stack you're using, what your conventions are, or how to run your tests. There's a faster, cheaper way. Every file the agent reads to orient itself costs tokens and fills the context window — and since context window *is* agent performance, you want to be efficient from the start.

Start by running `/init` in your project root. Both Claude Code and Codex support this command — Claude Code generates a `CLAUDE.md` file, Codex generates an `AGENTS.md` file. Either way, `/init` scans your codebase and scaffolds a starter context file with your project's structure, dependencies, and conventions already filled in.

The generated file is a starting point, not the finished product. Review it and trim aggressively — the model doesn't need boilerplate, it needs the things it would get wrong without being told. Make sure it includes:

- **One-line project description** — what this project is and does
- **Tech stack with versions** — so the agent never guesses or uses outdated APIs
- **Architecture rules** — e.g., "server components by default," "never mix Supabase client types"
- **Naming conventions** — file naming, variable naming, import patterns
- **Exact commands** — how to build, test, lint, and deploy

Keep it under 200 lines. Commit this file to the repo so the whole team benefits.

**One thing to verify before your agent starts working:** make sure `.env`, credentials, API keys, and any other secrets are in your `.gitignore`. An agent that accidentally commits secrets is a real risk — and one that's trivial to prevent.

**Talk to your agent:** After running `/init`, ask your agent to review the generated file — what's redundant, what's missing, what conventions it can't infer from the code alone. Let it help you refine.

-----

## Layer 2: CLI Tools — Your Agent Already Has Access

This layer is free — there's nothing to set up. The CLI tools you already use — `bash`, `gh`, `npm`, `git`, `curl`, `docker` — are fully available to Claude Code and Codex. The agent can run your test suite, check CI status with `gh`, create PRs, inspect your git history, install dependencies, and run arbitrary shell commands with the same tools you use every day. You don't need a special integration for most of what you already do in the terminal.

This is worth understanding early because many developers don't realize the agent has access to these tools. You can ask it to `gh pr list`, `npm outdated`, `git log --oneline -20`, or anything else you'd type yourself. The terminal is the agent's native environment.

While CLI access is available out of the box, you can control what the agent is allowed to do through each platform's settings file. In Claude Code, `.claude/settings.json` lets you define `allow`, `deny`, and `ask` rules for specific tools and commands — commit it to your repo so the whole team shares the same permissions. In Codex, `.codex/config.toml` controls sandbox mode and approval policy, and Starlark `.rules` files give you fine-grained command filtering. You don't need to configure these on day one, but they're there when you want tighter control.

**Talk to your agent:** Ask your agent what CLI tools it can already use — the answer will probably surprise you.

-----

## Layer 3: Linting + Formatting with AI-Specific Rules

Left to their own devices, agents build very long files — harder for humans to review, and expensive for the agent to re-read later, since every line loaded into context is a line not spent on reasoning. You want to keep files focused.

Set up ESLint + Prettier (or your stack's equivalent). The standard rules help, but the key AI-specific additions are:

- **`max-lines: 300`** per file — as an ESLint error, not a warning
- **`max-lines-per-function: 150`** — forces the agent to decompose instead of generating monoliths
- **`eslint-plugin-security`** — catches common security anti-patterns automatically

These rules force the agent to write modular, reviewable code. The agent hits the limit, breaks the file into smaller pieces, and your codebase stays manageable.

**Talk to your agent:** Ask your agent what linting rules make sense for your stack and what file size limits feel right for your project.

-----

## Layer 4: CI Pipeline as a Gate

With an agent, you're moving at a velocity that makes CI more important than ever. Nail it down early. As a single developer or small team, you may never have had the bandwidth to build out a full pipeline. With an agent, you can. Ask it to draft one and you'll have it in minutes.

Set up a CI pipeline that runs on every PR. A solid starting point is four jobs:

1. **Lint + typecheck** — catches style violations and type errors instantly. Include `npm audit` (or equivalent) here for dependency vulnerability scanning.
2. **Unit tests** — verifies the logic works
3. **E2E tests** — verifies the app actually runs
4. **Dead code detection** — tools like [Knip](https://knip.dev/) catch unused exports, files, and dependencies that accumulate fast when an agent is generating code

Nothing merges unless CI is green.

**Talk to your agent:** Ask your agent to draft a CI workflow for your stack. Have it explain each job and what it catches.

-----

## Layer 5: Commit and PR Discipline

Without guardrails, agents write commit messages like "update code" or "fix things." This makes your git history useless and makes it harder to review what actually changed.

The fix is to enforce structured commit messages. The most common approach is [conventional commits](https://www.conventionalcommits.org/) — every commit gets a type prefix like `feat:`, `fix:`, `refactor:`, `docs:`, or `test:`. You can enforce this with git hooks (e.g., Husky + commitlint in the JS ecosystem), or simply by instructing your agent in CLAUDE.md / AGENTS.md to always use conventional commit format. Either way, your git history becomes structured data instead of freeform text — useful for changelogs, release notes, and understanding what changed when.

The same discipline applies to PRs. Claude Code has a first-party [`commit-commands`](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/commit-commands) plugin available in the marketplace. It gives you:

- **`/commit`** — analyzes your changes, matches your repo's commit style, and creates the commit
- **`/commit-push-pr`** — the full cycle: creates a branch, commits, pushes, opens a PR with a summary and test plan, and gives you the PR URL

It requires the [GitHub CLI (`gh`)](https://cli.github.com/) to be installed and authenticated — which is worth doing regardless, since your agent can use `gh` for all kinds of GitHub operations (see Layer 2).

**Talk to your agent:** Ask your agent to set up commit message conventions for your project. In Claude Code, try `/commit-push-pr` on your next feature — it handles the whole loop.

-----

## Layer 6: Agent Hooks — Deterministic Checks on Every Action

Some files should never be touched by an agent — `.env`, lock files, auto-generated files. And formatting should happen automatically, not when you remember to ask.

Agent hooks are different from git hooks. Git hooks run at commit time. Agent hooks run on *every single tool use* — every file edit, every bash command — in real time. They're the most direct way to back up stochastic agent behavior with deterministic checks.

Claude Code has a mature [hook system](https://code.claude.com/docs/en/hooks) with PreToolUse hooks (block actions before they happen) and PostToolUse hooks (run cleanup after). Codex doesn't have a full equivalent yet, but you can achieve similar protection through AGENTS.md instructions and sandbox configuration.

Two hooks cover most needs in Claude Code:

- **PreToolUse** — blocks edits to sensitive files like `.env*` and `package-lock.json`. Exit code 2 means hard-block.
- **PostToolUse** — auto-formats every file the agent edits (`eslint --fix`, `prettier --write`).

**Talk to your agent:** Ask your agent what files in your repo should be protected, and have it write the hook script.

-----

## Layer 7: Plugins for Review and Automation

A general-purpose agent reviewing its own code is like grading your own homework. Specialized review plugins solve this by running focused, opinionated checks that the coding agent wasn't thinking about — security, style, dead code — with a fresh set of eyes.

You don't need to build these yourself. Both Claude Code and Codex have plugin/skill ecosystems with installable packages for common needs:

- **Security review** — audits your code for auth bypass, key exposure, injection vulnerabilities, and common OWASP issues
- **Code review** — multi-angle review with confidence-scored findings that only surfaces issues it's confident about
- **PR creation with CI monitoring** — creates a PR, watches CI, and auto-fixes failures until green
- **Automation recommender** — analyzes your codebase and suggests which hooks, skills, and MCP servers to add

In Claude Code, run [`/plugins`](https://code.claude.com/docs/en/plugins) to browse and install from the marketplace. In Codex, use [`$skill-installer`](https://developers.openai.com/codex/skills/) to install skills from the catalog or check them into `.codex/skills/` in your repo. Separation of concerns applies to AI just as much as it applies to code.

**Talk to your agent:** Ask your agent what plugins or skills are available and which ones address your biggest risks.

-----

## Layer 8: Skills as Process Guardrails

Even with good linting and CI, the agent can still skip straight to coding without understanding the problem, or try random fixes instead of investigating root causes. Skills enforce process at these moments.

Skills are reusable instruction bundles — markdown files that define a workflow the agent must follow step by step. They're different from plugins: plugins do a job for you; skills constrain how the agent works.

A good starting point is the [Superpowers](https://github.com/obra/superpowers) plugin (available in the Claude Code marketplace), which includes battle-tested skills for:

- **`/brainstorming`** — explores requirements and design before any code is written
- **`/systematic-debugging`** — root cause investigation before fixes; hard stop after 3 failed attempts
- **`/test-driven-development`** — no production code without a failing test first

In Codex, skills live in `.codex/skills/` and are invoked with `$skill-name`. The [Codex skills catalog](https://github.com/openai/skills) has similar workflow skills available.

**Talk to your agent:** Ask your agent what skills it supports and which ones would help your workflow.

-----

## Layer 9: MCP Servers

AI agents work from training data that may be months stale. They'll use deprecated APIs, outdated patterns, wrong syntax. MCP servers give the agent live, current context.

- **Documentation servers** — [Context7](https://context7.com/) gives the agent current docs for your dependencies, so it uses the right API instead of guessing from training data
- **Database servers** — [Supabase MCP](https://supabase.com/docs/guides/getting-started/mcp) lets the agent query your actual schema instead of inventing table structures
- **LSP integration** — lets the agent use go-to-definition and find-references instead of grep, giving it precise navigation through your codebase

**Talk to your agent:** Ask your agent what MCP servers exist for your dependencies.

-----

## Start Building

Nine layers sounds like a lot — but each one is simple to set up, and that's the point. Here's the full stack at a glance:

| Layer | What it does | What it prevents |
|-------|-------------|-----------------|
| **1. CLAUDE.md / AGENTS.md** | Gives the agent project context upfront | Wasted tokens re-discovering your stack |
| **2. CLI Tools** | Leverages tools the agent already has | Building integrations you don't need |
| **3. Linting + Formatting** | Enforces file size and code style | 500-line monolith files |
| **4. CI Pipeline** | Blocks broken code from merging | Regressions, type errors, dead code |
| **5. Commit + PR Discipline** | Structures git history and PRs | "update code" commit messages |
| **6. Agent Hooks** | Deterministic checks on every action | Edits to `.env`, unformatted code |
| **7. Plugins** | Specialized review from fresh eyes | Self-graded homework |
| **8. Skills** | Enforces process (TDD, debugging) | Skipping straight to code |
| **9. MCP Servers** | Gives the agent live, current data | Outdated APIs and invented schemas |

The feedback loop is the key: when CI fails on an agent's PR, the agent — or a PR-creator plugin — can read the failure, fix the code, and push again. The guardrails aren't just catching errors. They're enabling the agent to self-correct within safe boundaries.

Start with Layer 1 today. Add one layer at a time. Each one compounds with the others. And remember — your agent is the best collaborator for setting up its own guardrails. It knows what it needs. Talk to it.

These principles apply regardless of which agent you're using. The agent changes. The guardrails don't.

-----

## Keep Experimenting

The models and harnesses are evolving fast. Patterns that don't work this month — like the [Ralph Loop](/posts/the-ralph-loop-is-a-fixed-point-process) when it first appeared — can work the next, after a round of model improvements, harness updates, and use case refinement. The layers in this post are stable foundations, but the workflows you build on top of them will keep shifting.

Keep trying things, keep reevaluating what works, and don't write off a pattern permanently just because it failed once. Stay curious.
