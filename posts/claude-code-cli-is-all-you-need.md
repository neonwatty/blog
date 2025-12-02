---
title: "CLI is All You Need: Skip Custom Slash Commands with Claude Code"
date: "2025-11-30"
excerpt: "You don't need custom slash commands or skills—just point Claude Code at your CLI tools and describe what you want"
tags: ["Claude Code", "CLI", "Productivity", "AI", "Developer Tools"]
featured: true
author: "Jeremy Watt"
image: "https://github.com/neonwatty/readme_gifs/blob/main/create-blogpost.png?raw=true"
seoTitle: "CLI is All You Need - Skip Custom Slash Commands with Claude Code"
metaDescription: "Why natural language + CLI tools beats building custom slash commands, skills, and complex tooling with Claude Code."
---

# The Temptation to Over-Engineer

Claude Code - an AI coding assistant that excels at natural language programming - supports slash commands, skills, MCP servers, and custom tooling. When you find yourself doing something repeatedly, the natural instinct kicks in: build a reusable command.

You should absolutely resist this urge.

Because you start imagining slash commands like this:

```
/create-blog-post --image=path/to/image.png --repo=github.com/user/blog --title="My Post" --tags="AI,CLI"
```


And before you know it, you're building and maintaining a tool instead of shipping work.

# Keep it simple stupid

Skip creating more tools: modern agents like Claude Code and Codex are extremely good at using CLI tools.  So "just talk to it" and describe in detail what you want.  Citing the appropriate tools (like the `gh` CLI).

Again, Claude Code and company already knows how to use `gh`, `git`, `npm`, `docker`, and dozens of other CLI tools.  You don't need to wrap them in custom commands.  Just describe what you want and point it at the resources - check out any gh CLI tutorial and you'll see Claude Code can handle it.

# Real Example: Writing This Post

This blog post was created without a single custom Claude Code Slash Command / Skill / whatever.  Just an idea, some notes, and a discussion with Claude Code created the content, the PR, workflow debugging, etc., 

Here's how I kicked off the conversation with Claude Code about this article (we had several back and forths to refine):

> "Help me create a succinct article for my blog (located at neonwatty.com) whose github repo is located at xxx.  The subject: stop over-complicating Claude Code with over-engineered Slash Commands / Skills / sub-Agents / etc.,  Claude Code, Codex, etc., are extremely solid with CLI tools - they're all you need.  Don't waste time building / maintaining agentic tooling when you can just "talk to it", describe what you want done (citing appropriate CLI tools / things you need done), and just ship."

That's it. One natural language prompt to kick things off containing:
- The blog URL and repo location
- The topic and angle
- Where to find any images

Claude Code - with its access to tools like `gh` - can figure out the boring stuff on its own:
- Cloned the blog repo and explored its structure
- Found and uploaded images to the readme_gifs repo via `git` (where I store images for various projects)
- Used my `autocomplete google` for SEO keyword research
- Wrote the markdown following existing post conventions
- Created a PR with `gh pr create`

<img src="https://github.com/neonwatty/readme_gifs/blob/main/create-blogpost.png?raw=true" alt="Claude Code creating a PR with gh CLI" width="100%" />

# Related Posts

- [Claude Code GitHub Actions Example](/posts/claude-code-github-actions-example) - A hands-on example of debugging CI failures with `gh` commands
- [Let Claude Code Babysit Your CI](/posts/claude-code-ci-babysitter) - Autonomous CI monitoring with Claude Code
