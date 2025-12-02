---
title: "Claude Code GitHub Actions Example: Debug CI with Natural Language"
date: "2025-12-02"
excerpt: "A hands-on example showing how Claude Code uses gh CLI commands to debug and fix failing GitHub Actions workflows"
tags: ["Claude Code", "GitHub Actions", "CI/CD", "gh CLI", "Developer Tools"]
featured: true
author: "Jeremy Watt"
image: "https://github.com/neonwatty/readme_gifs/blob/main/how-it-works-succeed.png?raw=true"
seoTitle: "Claude Code GitHub Actions Example - Debug CI Workflows with AI"
metaDescription: "Step-by-step example of using Claude Code with gh CLI to debug GitHub Actions workflows. See the exact commands and workflow."
---

# Debugging CI Sucks

GitHub Actions fail. It happens. The usual fix for this debug CI pipeline problem? Tools like [act](https://github.com/nektos/act) to simulate CI locally. Or SSH into runners. Neither really works the same as actual GitHub, and you're stuck babysitting either way.

# Just Let Claude Code Do It

Skip the simulation. Have Claude Code use the GitHub CLI workflow commands - like `gh run watch` and `gh run view` - to check status, read logs, fix issues, and re-run. One prompt:

> "Check in on this PR's gh workflows every few minutes and debug; stop when they have completed successfully"

Done. Claude Code handles the rest.

# What Actually Happens

Here's what Claude Code ran while creating this very blog post:

```bash
# Check recent workflow runs
$ gh run list --limit 5
STATUS       TITLE                                   WORKFLOW         BRANCH                       EVENT         ID
in_progress  Add Claude Code GitHub Actions...       CI/CD Pipeline   feature/gh-actions-example   pull_request  19866740042
completed    Merge pull request #33...               Deploy Blog...   main                         push          19828469094

# Watch the workflow in real-time
$ gh run watch 19866740042
✓ Checkout code
✓ Setup Node.js
✓ Install dependencies
✓ Run linter
✓ Run type check
✓ Run unit tests
* Install Playwright browsers
* Run e2e tests
...

# If something fails, view the logs
$ gh run view 19866740042 --log-failed
```

Claude Code keeps checking until everything passes. If something breaks, it reads the logs, makes fixes, pushes, and re-runs.

# Related Posts

- [CLI is All You Need](/posts/claude-code-cli-is-all-you-need) - Why natural language + CLI tools beats custom tooling
- [Let Claude Code Babysit Your CI](/posts/claude-code-ci-babysitter) - Autonomous CI monitoring with Claude Code
