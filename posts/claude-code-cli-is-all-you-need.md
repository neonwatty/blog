---
title: "CLI is All You Need"
date: "2025-11-30"
excerpt: "You don't need custom slash commands or skills—just point Claude Code at your CLI tools and describe what you want"
tags: ["Claude Code", "CLI", "Productivity", "AI", "Developer Tools"]
featured: true
author: "Jeremy Watt"
seoTitle: "CLI is All You Need - Skip Custom Slash Commands with Claude Code"
metaDescription: "Why natural language + CLI tools beats building custom slash commands, skills, and complex tooling with Claude Code."
---

# The Temptation to Over-Engineer

Claude Code supports slash commands, skills, MCP servers, and custom tooling. When you find yourself doing something repeatedly, the natural instinct kicks in: build a reusable command.

You start imagining something like:

```
/create-blog-post --image=path/to/image.png --repo=github.com/user/blog --title="My Post" --tags="AI,CLI"
```

Arguments for every option. Validation. Error handling. Documentation. Before you know it, you're maintaining a tool instead of shipping work.

# The Simpler Reality

Here's the thing: CLI tools + natural language is all you need.

Claude Code already knows how to use `gh`, `git`, `npm`, `docker`, and dozens of other CLI tools. You don't need to wrap them in custom commands. Just describe what you want and point it at the resources.

# Real Example: Writing This Post

This very blog post was created without a single custom command. Here's what I told Claude Code:

> "Create a blog post for my blog at github.com/neonwatty/blog. Screenshots are on my Desktop. Upload images to the readme_gifs repo, write the post, and open a PR."

Claude Code:
- Cloned both repos
- Found and uploaded the images via `git`
- Wrote the markdown following existing post conventions
- Created a PR with `gh pr create`

No slash command. No skills. No MCP server. Just natural language and standard CLI tools.

# When CLI Beats Custom Commands

**Flexibility:** Natural language handles edge cases. "This time, also update the frontmatter date" just works.

**No maintenance:** CLI tools update themselves. Your custom slash command? That's on you.

**Composability:** Combine any tools on the fly. "Use `gh` to check the CI status, then `git` to push a fix" requires zero configuration.

**Context-aware:** Claude Code adapts to your project structure. It reads your existing posts and matches the format automatically.

# Conclusion

Stop building slash commands. Start describing what you want.
