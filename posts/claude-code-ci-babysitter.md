---
title: "Let Claude Code Babysit Your CI"
date: "2025-11-30"
excerpt: "How I stopped babysitting GitHub Actions and let Claude Code monitor, debug, and fix CI failures autonomously"
tags: ["Claude Code", "GitHub Actions", "CI/CD", "DevOps", "AI", "Automation"]
featured: true
author: "Jeremy Watt"
image: "https://github.com/neonwatty/readme_gifs/blob/main/how-it-works-succeed.png?raw=true"
seoTitle: "Let Claude Code Babysit Your CI - AI Powered GitHub Actions Debugging"
metaDescription: "Use Claude Code CLI with gh to autonomously monitor, debug, and fix GitHub Actions workflows while you step away."
---

# The Old Pain

GitHub Actions workflows run on different hardware, timing, and environments than your local machine. The traditional fix? Tools like [act](https://github.com/nektos/act) that simulate CI locally. But it never quite replicates GitHub perfectly, and debugging remote failures remains tedious.

# The New Way

Claude Code + the `gh` CLI changes everything. Instead of simulating CI, you can have Claude Code autonomously monitor your actual workflows—checking status every few minutes, detecting failures, reading logs, making fixes, and re-running. All while you step away.

# A Real Example

Here's a before and after from a recent PR on [bleep-that-shit](https://github.com/neonwatty/bleep-that-shit):

**Before (Run #139 - Failed):**

<img src="https://github.com/neonwatty/readme_gifs/blob/main/how-it-works-fail.png?raw=true" alt="Failed CI run showing all jobs red" width="100%" />

All jobs failed: Lint, Smoke Tests, and all 3 E2E test shards. Status: Failure in 1m 6s.

**After (Run #140 - Success):**

<img src="https://github.com/neonwatty/readme_gifs/blob/main/how-it-works-succeed.png?raw=true" alt="Successful CI run showing all jobs green" width="100%" />

All jobs green, 5 artifacts generated. Status: Success in 2m 24s.

# The gh CLI Commands

Here's what Claude Code uses under the hood:

```bash
# Check workflow status
gh run view <run-id>

# Watch workflow in real-time
gh run watch <run-id>

# Get detailed logs
gh run view <run-id> --log

# Re-run failed jobs after fix
gh run rerun <run-id> --failed
```

# The Autonomous Loop

The key insight: Claude Code can monitor workflows on a schedule using simple sleep loops:

```bash
while true; do
  gh run view <run-id>
  sleep 300  # Check every 5 minutes
done
```

When Claude Code detects a failure, it reads the logs, identifies the issue, makes the fix, pushes the changes, and re-runs the workflow—all through natural conversation. You set it up and walk away.

# Conclusion

Stop babysitting CI. Let Claude Code do it.
