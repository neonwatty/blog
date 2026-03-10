# Design: How to Set Up Your Repo for Claude Code and Codex

## Metadata

- **Title:** How to Set Up Your Repo for Claude Code and Codex
- **Excerpt:** Eight layers of guardrails that make AI coding agents safe, predictable, and actually useful -- from CLAUDE.md to CI pipelines to specialized review agents.
- **SEO Title:** How to Set Up Your Repo for Claude Code and Codex | Beginner's Guide
- **Tags:** Claude Code, Codex, AI, Developer Tools, CI/CD
- **Audience:** Day 1 developers who just installed Claude Code or Codex
- **Structure:** Layer Cake (sequential build-up, each layer solves a specific problem)
- **Call to action:** Build your own layer by layer

## Writing notes

- **Running example:** Use JavaScript/TypeScript as the running example throughout (ESLint, Prettier, Vitest, Playwright). This matches the template repo and is the most common stack for the audience. Mention that equivalents exist for other stacks but don't try to cover them all.
- **Commit the config:** Mention early (opening or Layer 1) that all agent configuration -- CLAUDE.md, hooks, skills -- should be committed to the repo so the whole team benefits.
- **`.claude/` directory:** Introduce the `.claude/` directory before Layer 5 as the home for agent-specific configuration (hooks, agents, skills, settings). Codex equivalent is `.agents/`.

## Opening

Straightforward framing. Setting up a repo for AI agents means two things:

1. Giving the agent the context and tooling it needs to succeed
2. Backing up every stochastic move the agent makes with something deterministic

Linting, type checking, CI, commit hooks -- these aren't new ideas. Developers have always needed them. AI agents just make the case undeniable, because agents move fast and don't second-guess themselves. All of this is straightforward to set up, and once it's in place, it works for humans and agents alike.

Brief note: CLAUDE.md is Claude Code, AGENTS.md is Codex/Copilot/Cursor -- same principles, different filenames.

**"Give this URL to your agent" note:** Right after the intro, tell the reader the easiest way to digest this post is to give the URL to their agent (Claude Code, Codex, whatever) and talk it over together. Let the agent help implement each layer as they read.

## The 8 Layers

Each layer follows the pattern: problem it solves, what to do, then a nudge to talk to your agent about it for their specific repo.

### Layer 1: CLAUDE.md / AGENTS.md -- Give the agent context upfront

**Problem:** Your agent shouldn't have to search through your codebase to figure out what stack you're using, what your conventions are, or how to run tests. There's a faster, cheaper way. Every file the agent reads to orient itself costs tokens and fills the context window -- and since context window is agent performance, you want to be efficient from the start.

**What to do:** Create a CLAUDE.md (Claude Code) or AGENTS.md (Codex/Copilot) at your project root. Include: one-line project description, tech stack with versions, architecture rules, naming conventions, and the exact commands to build/test/lint. Keep it under 200 lines. Run `/init` to generate a starter, then trim aggressively.

**Talk to your agent:** Run `/init`, then ask your agent to trim it down and fill in gaps. Ask it what's missing based on your codebase.

### Layer 2: Linting + formatting with AI-specific rules

**Problem:** Left to their own devices, agents will build very long files. This makes it difficult for a human to review, and it's inefficient for the agent too -- whenever it needs to understand a function or module, loading a 500-line file eats context window that could be spent on actual reasoning. Since agent performance degrades as the context window fills, you want to keep files focused.

**What to do:** Set up ESLint + Prettier (or your stack's equivalent). The key AI-specific additions: `max-lines: 300` per file and `max-lines-per-function: 150` as ESLint errors. This forces the agent to decompose. Add `eslint-plugin-security` to catch common security anti-patterns automatically. If you've never worked at this level of abstraction before -- zooming out and managing agent behavior programmatically -- you might be surprised how easy it is to set up and how much it matters.

**Talk to your agent:** Ask your agent what linting rules make sense for your stack and what file size limits feel right for your project.

### Layer 3: CI pipeline as a gate

**Problem:** Without CI, the only thing standing between the agent's code and production is you reading every line. You will miss things.

**What to do:** Set up a CI pipeline that runs on every PR. Four jobs: lint + typecheck, unit tests, E2E tests, dead code detection (e.g., Knip for JS/TS). Add `npm audit` as part of the lint job for dependency vulnerability scanning. Pin your GitHub Action versions to commit SHAs (not tags) to prevent supply chain attacks. Nothing merges unless CI is green.

**Talk to your agent:** Ask your agent to draft a CI workflow for your stack. Have it explain each job and what it catches.

### Layer 4: Commit discipline

**Problem:** AI agents write commit messages like "update code" or "fix things". This makes your git history useless and breaks automated versioning.

**What to do:** Install Husky + commitlint to enforce conventional commits at commit time (`feat:`, `fix:`, `refactor:`, etc.). If automated versioning is your thing, add semantic-release or whatever release library you prefer. The point is that commit messages become structured data, not freeform text.

**Talk to your agent:** Ask your agent to set up commitlint for your project and walk you through the conventional commit types.

### Interlude: the `.claude/` and `.agents/` directories

Before the next three layers, a quick note on where agent configuration lives. Claude Code uses a `.claude/` directory at your project root for hooks, agent definitions, skills, and settings. Codex uses `.agents/` for similar purposes. Commit these directories to your repo -- they're project configuration, not personal preferences.

### Layer 5: Agent hooks -- deterministic checks on every agent action

**Problem:** Some files should never be touched by an agent -- `.env`, lock files, existing database migrations. And formatting should happen automatically, not when you remember to ask.

**What agent hooks are:** These are different from the git hooks in Layer 4 (Husky). Git hooks run at commit time. Agent hooks run on every single tool use -- every file edit, every bash command, every action the agent takes, in real time. They're the most direct way to back up stochastic agent behavior with deterministic checks.

**How they work:** You register hooks in `.claude/settings.json` by pointing to shell scripts. Each hook entry specifies when it runs (PreToolUse or PostToolUse) and the path to the script. The scripts themselves can live anywhere in your repo -- a common convention is the project root or a `scripts/` directory.

**What to do:** Two hooks. A PreToolUse hook (a shell script that runs before every file edit) that blocks edits to sensitive files -- exit code 2 means hard-block, the agent cannot proceed. A PostToolUse hook (runs after every file edit) that runs `eslint --fix` and `prettier --write` on the edited file. The agent's output is always formatted, and it physically cannot touch what it shouldn't.

Example: a `protect-files.sh` PreToolUse hook that blocks edits to `.env*` files, `package-lock.json`, and existing migration files in `supabase/migrations/`.

**Talk to your agent:** Ask your agent what files in your repo should be protected, and have it write the hook script.

### Layer 6: Plugins for review and automation

**Problem:** A general-purpose agent reviewing its own code is like grading your own homework.

**What to do:** You don't need to build these yourself. Anthropic publishes official plugins (installable via the `/install-plugin` command in Claude Code) for common needs. Notable examples:

- **Security review** -- audits your code for auth bypass, key exposure, injection vulnerabilities, and common OWASP issues
- **Code review** -- multi-angle review with confidence-scored findings (only surfaces issues it's confident about)
- **PR creation with CI monitoring** -- creates a PR, watches CI, and auto-fixes failures until green
- **Automation recommender** -- analyzes your codebase and suggests which hooks, skills, and MCP servers to add

The community also publishes plugins. These install into your `.claude/` directory and run as specialized agents with focused jobs and structured output. Separation of concerns applies to AI just as much as it applies to code.

**Talk to your agent:** Ask your agent what plugins are available for your tool and which ones address your biggest risks. In Claude Code, run `/install-plugin` to browse and install what's available.

### Layer 7: Skills as process guardrails

**Problem:** Even with good linting and CI, the agent can still skip straight to coding without understanding the problem, or try random fixes instead of investigating root causes.

**What skills are:** Skills are reusable instruction bundles (markdown files in `.claude/commands/` or `.agents/skills/`) that define a workflow the agent must follow. When invoked, the agent loads the skill and follows its process step by step. They're different from plugins (Layer 6) -- plugins are specialized agents that do a job for you; skills are processes that constrain how the main agent works.

**What to do:** Install or write skills that enforce discipline at key moments:

- **Brainstorming / feature interview** -- requires the agent to understand the problem, propose approaches, and get your approval before writing any code
- **Systematic debugging** -- demands root cause investigation before fixes; hard stop after 3 failed attempts
- **Test-driven development** -- no production code without a failing test first

These aren't suggestions -- they're hard gates. The agent cannot skip them. You invoke them with slash commands (e.g., `/brainstorm`, `/debug`) or they trigger automatically based on context.

**Talk to your agent:** Ask your agent what skills or workflows it supports and which ones would help your development process. In Claude Code, run `/install-plugin` to browse community skill sets.

### Layer 8: MCP servers and CLI tools

**Problem:** AI agents work from training data that may be months or years stale. They'll use deprecated APIs, outdated patterns, wrong syntax.

**What to do:** Connect MCP servers for live context. A documentation server (like Context7) gives the agent current docs for your dependencies. A database server (like Supabase MCP) lets the agent query your actual schema instead of guessing. LSP integration lets the agent use go-to-definition and find-references instead of grep.

The CLI tools you already use -- `bash`, `gh`, `npm`, `git` -- are fully available to Claude Code and Codex. The agent can run your test suite, check CI status, create PRs, and inspect your git history with the same tools you use. You don't need a special integration for most of what you already do in the terminal.

**Talk to your agent:** Ask your agent what MCP servers exist for your dependencies. Ask it what CLI tools it can already use.

## Recurring theme

Your agent is the best collaborator for setting up its own guardrails. It knows what it needs, and it can help you think through edge cases you wouldn't have considered.

## Closing

Recap the dual framing: you've set up your agent for success (context, tooling, live data) and you've backed up every stochastic move with something deterministic (linting, CI, hooks, commit gates). Note the feedback loop: when CI fails on an agent's PR, the agent (or a PR-creator plugin) can read the failure, fix the code, and push again -- the guardrails aren't just catching errors, they're enabling the agent to self-correct within safe boundaries. Start with Layer 1 today, add one layer at a time, and each one compounds with the others. These principles apply regardless of which agent you're using -- the agent changes, the guardrails don't.
