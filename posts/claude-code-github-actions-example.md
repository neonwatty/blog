---
title: "Debug Github CI with Natural Language and Claude Code"
date: "2025-12-02"
excerpt: "Claude Code uses gh CLI commands to debug and fix failing GitHub Actions workflows"
tags: ["Claude Code", "GitHub Actions", "CI/CD", "gh CLI", "Developer Tools"]
featured: true
author: "Jeremy Watt"
image: "https://github.com/neonwatty/readme_gifs/blob/main/how-it-works-succeed.png?raw=true"
seoTitle: "Claude Code GitHub Actions Example: Debug CI Workflows with AI"
metaDescription: "Step-by-step Claude Code GitHub Actions example. Use gh CLI commands to automatically monitor, debug, and fix failing CI workflows with natural language."
---


I've already made [a post about this](/posts/claude-code-ci-babysitter), but using Claude Code as a github CI babysitter is so powerful I think the message bears repeating.

# Debugging CI Sucks

GitHub Actions workflows can be absolutely terrible to debug.   CI workflows that "work on my machine" can fail for mysterious reasons in github.

For years we used tools like [act](https://github.com/nektos/act) to simulate github CI locally.   While this kind of solution is helpful, its still far from ideal: there are virtually always differences between locally simulated CI workflows (even in Docker) and the same actions taken in a cloud runner.  And debugging the latter can quickly turn into a multi-hour babysitting session.

# Claude Code: your new gh CI workflow babysitter

Having Claude Code watch your CI workflows in github is a fucking huge time saver.  With simple prompting you can have CC or Codex sit around for you and poll for status on a workflow, read logs, fix issues, and re-run. 

There's subtlety here of course, but in general I've found this works very well.

For simpler repos - like this blog -  you can do this safely with a single prompt like:

> "Check in on this PR's gh workflows every few minutes and debug; stop when they have completed successfully"

Of course there's subtlety for more complex projects, and you'll always want to confirm your CI runs successfully on your locxal machine first. 

But nonetheless; once successfully have Claude Code / Codex manage and clean up a long running / cycling workflow, you'll never be the same again.

# An example of how Claude Code manages a gh workflow

I asked Claude Code to submit a PR with this blog post in it, and monitor the gh CI workflow associated with it.  Here's a snippet of what CC's work.

```
⏺ New workflow triggered. Let me watch it:

⏺ Bash(gh run watch 19866893549 --exit-status) timeout: 5m 0s
  ⎿  Refreshing run status every 3 seconds. Press Ctrl+C to quit.

     * feature/gh-actions-example-post CI/CD Pipeline neonwatty/blog#34 · 19866893549
     … +581 lines (ctrl+o to expand)

⏺ Workflow passed! All tests green. Let me confirm:


⏺ Bash(gh run list --limit 3)
  ⎿  completed  success Add Claude Code GitHub Actions example post     CI/CD Pipeline  feature/gc
     tions-example-post pull_request    19866893549     2m8s    2025-12-02T17:03:04Z                    in_progress                Add Claude Code GitHub Actions example post     CI/CD Pipeline  feature/gh-actions
     … +3 lines (ctrl+o to expand)

⏺ Done! Here's what was accomplished:
```

Claude Code keeps checking until everything passes.  If something breaks, it reads the logs, makes fixes, pushes, and re-runs.

# Related Posts

- [CLI is All You Need](/posts/claude-code-cli-is-all-you-need) - Why natural language + CLI tools beats custom tooling
- [Let Claude Code Babysit Your CI](/posts/claude-code-ci-babysitter) - Autonomous CI monitoring with Claude Code
