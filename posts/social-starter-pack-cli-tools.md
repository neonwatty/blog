---
title: "Share Your Random Thoughts with the World Without Leaving Claude Code"
date: "2025-12-14"
excerpt: "CLI tools for posting to Twitter, LinkedIn, Reddit, and more—designed to work with Claude Code so you can capture and share ideas without context switching."
tags: ["Claude Code", "CLI", "Social Media", "Productivity", "Developer Tools"]
featured: true
author: "Jeremy Watt"
image: "/images/social-starter-pack/social-posting-demo.png"
seoTitle: "Share Random Thoughts Without Leaving Claude Code - Social Media CLI Tools"
metaDescription: "CLI tools for posting to Twitter, LinkedIn, Reddit, and YouTube without leaving the terminal. Designed for Claude Code and AI coding assistants."
---

I had a problem: random thoughts I wanted to share, but opening Twitter or LinkedIn meant losing 20 minutes to the feed. Context switching from terminal to browser to social app broke my flow, and half the time I forgot what I wanted to post.

So I built a set of CLI tools to post directly from the terminal—and designed them to work with Claude Code so I don't look like a complete idiot when I hit publish.

## What This Is (and Isn't)

This is **not** a replacement for browsing and engaging on social platforms. That would be too antisocial even for me.

It's for those moments when you have a thought, want to capture and share it quickly, and get back to what you were doing. Write, polish with Claude Code, post, done.

## The Tools

**Research:**
- `autocomplete` — Keyword suggestions from Google, YouTube, Bing, Amazon, DuckDuckGo
- `reddit` — Search Reddit for pain points and real-world language

**Distribution:**
- `twitter` — Post tweets, threads, and media to X/Twitter
- `linkedin` — Post updates and media to LinkedIn
- `youtube` — Upload and manage YouTube Shorts

**Support:**
- `gforms` — Create and manage Google Forms

## Example Workflows

### 1. Random Thought to Social Post

You have a thought. You want to share it without sounding half-baked.

```bash
# You start with your rough thought:
> "claude code + gh cli has been huge for me. polish this for twitter"

# Claude Code polishes it, you approve, then:
twitter post "Claude Code + gh CLI. PRs, issues, releases—all from the terminal. Mass productivity unlock."
```

Or for LinkedIn:
```bash
linkedin post "Finally stopped context switching between terminal and browser. Claude Code + gh CLI = mass productivity unlock."
```

![Social posting from terminal](/images/social-starter-pack/social-posting-demo.png)

### 2. Keyword Research for a Blog Post

You're writing an article and want to know what people actually search for.

```bash
# Find Google autocomplete suggestions
autocomplete google "developer productivity" --expand

# Try YouTube to see what video titles work
autocomplete youtube "coding workflow" --expand
```

This helps you match your headline and content to real search behavior.

![Autocomplete keyword research](/images/social-starter-pack/autocomplete-demo.png)

### 3. Reddit Research: How Do People Talk About This?

You want to understand how real people describe a problem—their words, not marketing speak.

```bash
# Search Reddit for discussions
reddit search -s "programming+webdev" -k "frustrated with,struggling" --time month
```

Great for finding authentic language to use in your content, or just validating that a topic resonates.

![Reddit search for pain points](/images/social-starter-pack/reddit-search-demo.png)

## The MCP Server: Natural Language Control

The `mcp-server` package connects all these tools to Claude Code. Once installed, you can use natural language to:

- Research keywords and Reddit discussions
- Draft and edit posts
- Post to Twitter, LinkedIn, Reddit
- Upload to YouTube

Install with:
```bash
make install-mcp
# Restart Claude Code
```

## Getting Started

```bash
git clone https://github.com/neonwatty/social-starter-pack.git
cd social-starter-pack
make install
make check
```

Each tool has its own auth setup (Twitter API keys, LinkedIn OAuth, etc.)—see the [docs](https://github.com/neonwatty/social-starter-pack/tree/main/docs) for details.

## Why CLI?

GUIs are great for browsing. But for quick capture-and-post workflows, the terminal wins:

- No context switching
- Scriptable and repeatable
- Works perfectly with AI coding assistants
- No algorithmic feed pulling you in

If you're the kind of person who lives in the terminal and occasionally has thoughts worth sharing, this might be for you.

---

[GitHub Repo](https://github.com/neonwatty/social-starter-pack) — Stars welcome, contributions even more so.

## Related Posts

- [CLI is All You Need](/posts/claude-code-cli-is-all-you-need) - Why natural language + CLI tools beats building custom slash commands
- [Keyword Research with Claude Code](/posts/keyword-research-claude-code) - Using autocomplete tools for SEO research
