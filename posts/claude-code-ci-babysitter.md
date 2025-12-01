---
title: "Let Claude Code Babysit Your CI"
date: "2025-11-30"
excerpt: "How I stopped babysitting GitHub Actions and let Claude Code monitor, debug, and fix CI failures autonomously"
tags: ["Claude Code", "GitHub Actions", "CI/CD", "DevOps", "AI", "Automation"]
featured: true
author: "Jeremy Watt"
image: "https://github.com/neonwatty/readme_gifs/blob/main/how-it-works-succeed.png?raw=true"
seoTitle: "Let Claude Code Babysit Your CI - AI Powered GitHub Actions Debugging"
metaDescription: "Use Claude Code CLI with gh to autonomously monitor, debug, and fix GitHub Actions workflows—a massive productivity booster."
---

# Manually Monitoring GitHub CI is a Pain

GitHub Actions workflows run on different hardware, timing, and environments than your local machine. The traditional fix? Tools like [act](https://github.com/nektos/act) that simulate CI locally. But it never quite replicates GitHub perfectly, and debugging remote failures remains a tedious, time-consuming process that requires you to intermittently check in and fix GitHub workflow-specific bugs.

# Use Claude Code to Monitor Your GitHub CI Workflows

Claude Code + the `gh` CLI changes everything. Instead of simulating CI, you can have Claude Code autonomously monitor your actual workflows—checking status every few minutes, detecting failures, reading logs, making fixes, and re-running. It's a massive productivity booster.

# The gh CLI Commands

With `gh` installed, Claude Code will automatically invoke [GitHub CLI commands](https://cli.github.com/manual/gh_run) when prompted—whether it's [viewing workflow status](https://cli.github.com/manual/gh_run_view), [watching runs in real-time](https://cli.github.com/manual/gh_run_watch), [getting detailed logs](https://cli.github.com/manual/gh_run_view), or [re-running failed jobs](https://cli.github.com/manual/gh_run_rerun).

Beyond monitoring workflows, you can also use `gh` to [create pull requests](https://cli.github.com/manual/gh_pr_create), [merge PRs](https://cli.github.com/manual/gh_pr_merge), [manage issues](https://cli.github.com/manual/gh_issue), and perform other repository operations—all through natural conversation with Claude Code.

# The Prompt

Just tell Claude Code what you want in plain English:

> "Check in on this PR's gh workflows every few minutes and debug; stop when they have completed successfully"

Claude Code detects failures, reads logs, identifies the issue, makes the fix, pushes the changes, and re-runs the workflow—all through natural conversation.

# A Real Example

Here's a before and after from a recent PR on [bleep-that-shit](https://github.com/neonwatty/bleep-that-shit):

**Before (Run #139 - Failed):**

<img src="https://github.com/neonwatty/readme_gifs/blob/main/how-it-works-fail.png?raw=true" alt="Failed CI run showing all jobs red" width="100%" />

All jobs failed: Lint, Smoke Tests, and all 3 E2E test shards. Status: Failure in 1m 6s.

**After (Run #140 - Success):**

<img src="https://github.com/neonwatty/readme_gifs/blob/main/how-it-works-succeed.png?raw=true" alt="Successful CI run showing all jobs green" width="100%" />

All jobs green, 5 artifacts generated. Status: Success in 2m 24s.

# Conclusion

Stop babysitting CI. Let Claude Code do it.
