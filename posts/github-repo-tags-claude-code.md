---
title: "Claude Code for SEO: Choosing Optimal GitHub Repo Topics"
date: "2025-12-12"
excerpt: "Use Claude Code and gh CLI to choose optimal GitHub repo topics with real volume data. Data-driven tag selection in 30 seconds."
tags: ["Claude Code", "GitHub", "CLI", "Productivity"]
featured: false
author: "Jeremy Watt"
seoTitle: "Claude Code for SEO: Choosing Optimal GitHub Repo Topics"
metaDescription: "Use Claude Code for SEO: choose optimal GitHub repo topics using gh CLI and real volume data. Pick high-traffic vs niche tags strategically."
---

GitHub repository topics are the tags that appear below your repo description - labels like `python`, `machine-learning`, or `cli-tool` that categorize your project.  They're crucial levers for visibility on GitHub, and hence the wider web.  But choosing them - let alone choosing them well - can be a time consuming chore that most just don't do.  You might not know which topics have high volume, which might be better niche opportunities, etc.,

However using Github's `gh` CLI along with your favorite agentic CLI like Claude Code makes this exercise a breeze.

You can easily research, compare, and set optimal topics for your repo using real volume data.  No guesswork.  No sweat.

# Have Claude Code Analyze Your Repo

Start by having Claude Code understand what your project is about:

> "Analyze this repo and suggest relevant GitHub topics based on the codebase"

Claude Code will read your README, package.json (or requirements.txt), and scan key files to understand your tech stack and purpose:

```bash
$ gh repo view --json description,repositoryTopics
{"description":"Personal blog about AI, tools...","repositoryTopics":null}
```

It'll then suggest a list of candidate topics like `nextjs`, `typescript`, `blog`, `ai-tools`, `claude-code`, `tailwindcss`, etc.

But don't just accept the first suggestions - you can easily research their volumes too to pick the best mix.

# Research Topic Volumes

Before picking topics, research which ones actually have traction.  Ask Claude Code to pull volume data:

> "Compare the repo counts for these potential topics: nextjs, typescript, react, blog, ai-tools, claude-code, developer-tools"

Claude Code queries the GitHub API for each:

```bash
$ gh api -X GET "search/repositories?q=topic:nextjs" --jq '.total_count'
126981

$ gh api -X GET "search/repositories?q=topic:typescript" --jq '.total_count'
285369

$ gh api -X GET "search/repositories?q=topic:claude-code" --jq '.total_count'
2261

$ gh api -X GET "search/repositories?q=topic:ai-tools" --jq '.total_count'
1298
```

Then ask Claude Code to summarize and recommend:

> "Summarize those volumes and recommend which 5 topics I should use - mix high volume with niche opportunities"

Real numbers tell a clear story:

| Topic | Repo Count | Strategy |
|-------|------------|----------|
| `typescript` | 285k | High volume, high competition |
| `nextjs` | 127k | High volume, established ecosystem |
| `blog` | 37k | Medium volume, broad category |
| `claude-code` | 2.3k | Niche, growing fast, low competition |
| `ai-tools` | 1.3k | Niche, targeted audience |

**The play**: Mix 1-2 high-volume topics (broad reach) with 2-3 niche topics (you can actually rank).  You show up in popular searches AND dominate smaller niches where you're not buried on page 50.

# Apply Your Research

Once you've identified your target topics, have Claude Code set them:

**1. Check current topics:**

> "Check the current GitHub topics for this repo"

```bash
$ gh repo view --json repositoryTopics,description
{"description":"Personal blog about AI, tools...","repositoryTopics":null}
```

**2. Add your researched topics:**

> "Add our top 5 topics to the repo"

```bash
$ gh repo edit --add-topic nextjs,typescript,blog,ai-tools,claude-code
```

**3. Verify:**

```bash
$ gh repo view --json repositoryTopics
{"repositoryTopics":[{"name":"ai-tools"},{"name":"blog"},{"name":"claude-code"},{"name":"nextjs"},{"name":"typescript"}]}
```

Want to trim later? Easy:

> "Remove the tailwindcss, react, and mdx topics from this repo"

```bash
$ gh repo edit --remove-topic tailwindcss,react,mdx
```


# Related Posts

- [CLI is All You Need](/posts/claude-code-cli-is-all-you-need) - Why natural language + CLI tools beats custom tooling
- [SEO Keyword Research with Claude Code](/posts/keyword-research-claude-code) - Similar workflow for keyword research
