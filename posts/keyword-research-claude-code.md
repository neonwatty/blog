---
title: "SEO Keyword Research with Claude Code"
date: "2025-12-02"
excerpt: "Use Claude Code with Google autocomplete for fast keyword research at an industrial scale - for blog SEO, product naming, or just understanding what people actually search for."
tags: ["Claude Code", "SEO", "CLI", "Productivity"]
featured: true
author: "Jeremy Watt"
seoTitle: "SEO Keyword Research with Claude Code and Google Autocomplete"
metaDescription: "How to use Claude Code with Google autocomplete suggestions for automated and scaled keyword research. Quick setup, real examples, and practical results."
---

Getting your keywords right is the whole enchilada when it comes to helping users find your stuff - your blog, product, whatever.  There are a ton of dedicated tools for this - like Ahrefs and SEMrush - but each has a learning curve, and using them to get your keywords right still requires a lot of manual work.

LLMs are a natural tool to turn to as an alternative keyword generator, but they aren't plugged into real search data.  So while they're super helpful for brainstorming, their recommendations still won't include fresh user search behavior by default.

However once you give them access to real search data tools, they become incredibly powerful for keyword research.  For example, google's search autocomplete suggestions are a goldmine of real user search behavior.  They show you what people are actually searching for, in pretty much real time.

But sitting around at the Google search bar and manually chunking in queries is pretty tedious.  On a given theme, there's also a multitude of ways people might phrase their searches - different word orders, synonyms, related concepts.  You won't be able to cover all the bases manually.

But hand the wheel over to an LLM - to perform the autocomplete tool calls, think about variations, and synthesize the results - and you can cover a shit load of ground very fast.

## CLI Tools are all you need

Claude Code / Codex / etc., are beasts when it comes to using CLI tools ([I wrote a short post about that here](/posts/claude-code-cli-is-all-you-need)).  So I whipped up a simple to use [autocomplete-cli](https://www.npmjs.com/package/@neonwatty/autocomplete-cli) that lets you use Google / YouTube / Bing autocomplete at the terminal.  You enter in text, returns (Google) autocomplete suggestions - the same ones you see when typing in the search bar.

# Let Claude Code perform industrial scale keyword research

Once installed, just briefly tell Claude Code / Codex how to use the autocomplete tool.  For example, you can either say something like this with your prompt or copy it to your CLAUDE.md / AGENTS.md file.

```
autocomplete-cli - keyword suggestions from Google, YouTube, Bing, Amazon, DuckDuckGo
    - Example: autocomplete google "topic"
    - Help: autocomplete --help
    - README: https://github.com/neonwatty/autocomplete-cli
```

Then just Claude Code what you're researching.  It'll run a variety of autocomplete queries and synthesize the results.

For example:

> "run a few of google autocomplete's on the topic of 'youtube gif', 'video to gif', and related keyword variations and show me the top results"

Claude Code then runs queries like:

```bash
$ autocomplete google "youtube gif" && echo "---" && 
  autocomplete google "video to gif" && echo "---" && 
  autocomplete google "youtube to gif" && echo "---" &&
  autocomplete google "convert video gif" && echo "---" && 
  autocomplete google "gif maker" && echo "---" && 
  autocomplete google "youtube clip to gif"
```

You can watch the output to confirm it's running the queries you want.  Once done, Claude Code will synthesize the results and suggest high-value keywords to target.  Like this:

```bash
⏺ Top Keywords by Theme:

  | Theme          | High-Intent Keywords                                                                        |
  |----------------|---------------------------------------------------------------------------------------------|
  | YouTube to GIF | youtube to gif, youtube to gif maker, youtube to gif converter, youtube to gif no watermark |
  | Video to GIF   | video to gif converter, video to gif maker, video to gif free, video to gif high quality    |
  | GIF Maker      | gif maker from video, gif maker from youtube, gif maker online free, gif maker for discord  |
  | Quality/Format | no watermark, high quality, for discord, free                                               |

  Key Insights:
  - "no watermark" appears frequently (reddit discussions suggest users want clean output)
  - "ezgif" and "imgur" are existing competitors mentioned
  - "for discord" is a specific use case with size/format requirements
  - "high quality" signals demand for better output than free tools provide
```

# Related Posts

- [CLI is All You Need](/posts/claude-code-cli-is-all-you-need) - Why natural language + CLI tools beats custom tooling
