---
title: "Pull Google Search Console Data with Claude Code"
date: "2025-12-20"
excerpt: "Use Claude Code to query your GSC data directly from the terminal. Find ranking opportunities, see what's working, skip the manual exports."
tags: ["Claude Code", "SEO", "MCP", "Productivity"]
featured: true
author: "Jeremy Watt"
seoTitle: "Pull Google Search Console Data with Claude Code"
metaDescription: "Query Google Search Console directly from Claude Code using the social-tools MCP server. Real examples, actual commands, no fluff."
---

Exporting CSVs from Google Search Console is tedious. You click around the UI, filter, export, open in a spreadsheet, repeat. It's slow and annoying.

With Claude Code + the [social-tools MCP server](https://www.npmjs.com/package/@neonwatty/social-tools), you can query GSC directly from the terminal. Ask questions in plain English, get answers immediately.

## Setup

Add social-tools to your Claude Code MCP config (`~/.claude/settings.json`):

```json
{
  "mcpServers": {
    "social-tools": {
      "command": "npx",
      "args": ["-y", "@neonwatty/social-tools"]
    }
  }
}
```

Then authenticate (opens browser for OAuth):

```bash
# In Claude Code, just say: "authenticate with google search console"
```

## Real Examples

Here's what I ran on my own site this morning.

**"Show me my top queries by impressions for the last 30 days"**

```
Query                            Clicks  Impressions  CTR    Position
---------------------------------------------------------------------
best seo tools for claude        0       104          0.0%   79.8
youtube to gif no watermark      2       67           3.0%   6.7
ytgify                           1       33           3.0%   5.4
todoq                            1       21           4.8%   5.0
claude ai logo                   0       20           0.0%   4.5
```

Immediately useful. I can see "youtube to gif no watermark" is getting impressions and I'm ranking 6.7 - worth optimizing. "best seo tools for claude" has 104 impressions but I'm at position 79 - that's a content gap.

**"Show me queries with the pages they're ranking for"**

```
Query                            Page                                               Clicks  Position
-----------------------------------------------------------------------------------------------------
youtube to gif no watermark      https://neonwatty.com/posts/ytgify-launch/         2       6.7
claude code in ci                https://neonwatty.com/posts/claude-code-ci-babysitter/  1   6.7
best claude seo tools            https://neonwatty.com/posts/keyword-research-claude-code/  0  89.7
```

Now I know which posts are ranking for what. The keyword research post is showing up for "best claude seo tools" but at position 89 - basically invisible.

## Why This Beats the GSC UI

- **No clicking around** - just ask what you want
- **Instant follow-ups** - "now filter to just queries with position 5-20"
- **Combine with other tools** - Claude Code can read your blog posts and cross-reference with GSC data
- **No CSV exports** - data stays in your terminal

## The Commands Under the Hood

Claude Code calls these MCP tools:

- `gsc_auth` - authenticate with Google
- `gsc_sites` - list your verified properties
- `gsc_query` - pull the actual data (dimensions, date ranges, filters, sorting)

You don't need to remember the syntax. Just describe what you want.

---

That's it. Install the MCP server, authenticate once, then query your search data with plain English. Beats clicking around the GSC UI every time.
