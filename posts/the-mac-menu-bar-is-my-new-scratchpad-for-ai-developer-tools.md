---
title: 'The Mac Menu Bar Is My New Scratchpad for AI Developer Tools'
date: '2026-05-23T12:00:00'
excerpt: >-
  A short tour of five macOS menu bar apps I built to scratch my own itch, and
  why AI agents, XcodeBuildMCP, XC testing, and remote Mac runners make this
  kind of tiny native tooling much easier to ship.
tags:
  - Mac Apps
  - Menu Bar Apps
  - SwiftUI
  - Claude Code
  - Codex
  - MCP
  - XcodeBuildMCP
  - Developer Tools
featured: false
draft: true
author: Jeremy Watt
seoTitle: 'macOS Menu Bar Apps with AI Agents and XcodeBuildMCP'
metaDescription: >-
  A tour of five SwiftUI macOS menu bar apps built with AI agents,
  XcodeBuildMCP, XC testing, and remote Mac runners to scratch real developer
  itches.
image: /images/posts/weekly-vibes-2026-05-03/session-search-results.png
relatedPosts:
  - weekly-side-vibes-2026-05-03
  - how-to-set-up-your-repo-for-claude-code-and-codex
  - claude-code-workflow-testing-mcp
---

I have been building a bunch of small Mac menu bar apps lately.

Not because I decided to become a Mac app company. More because the menu bar is the right surface for a certain kind of personal developer tool: something you glance at, summon quickly, use for five seconds, and then forget about until the next time it saves you a context switch.

The surprising part is how straightforward this has become.

With [XcodeBuildMCP](https://github.com/getsentry/XcodeBuildMCP), XC testing, better Claude Code and Codex workflows, and remote Mac runners, building tiny native Mac utilities is now a very reasonable way to scratch your own itch. The loop is short: describe the friction, let the agent scaffold the SwiftUI app, build it through Xcode, run tests, fix the papercuts, and dogfood it immediately.

That is especially true for macOS menu bar apps. SwiftUI's `MenuBarExtra` gives you the basic shape. XcodeBuildMCP gives agents a reliable way to build, test, run, and inspect native Apple projects. Remote Mac runners give you somewhere else to do the work when your main machine is busy.

The result is a weirdly pleasant new workflow: notice a repeated annoyance, turn it into a small app, and keep the finished tool close to where your attention already lives.

Here are the recent ones.

## Session Search

[Session Search](https://github.com/neonwatty/session-search) is indexed full-text search across Claude Code and Codex sessions.

The itch: I often remember a command, bug, decision, or phrase from a prior agent session, but not the session title. Built-in resume pickers are useful, but they do not make the whole transcript feel searchable enough.

So Session Search indexes local session transcripts and gives me a menu bar search box with snippets and one-click resume.

![Session Search results](/images/posts/weekly-vibes-2026-05-03/session-search-results.png)

<video controls muted playsinline style="width: 100%; border-radius: 8px; margin: 1.5rem 0;">
  <source src="/images/posts/weekly-vibes-2026-05-03/session-search-demo.mp4" type="video/mp4" />
</video>

Links: [GitHub](https://github.com/neonwatty/session-search), [demo page](https://neonwatty.github.io/session-search/).

## CCSwitcher Codex

[CCSwitcher Codex](https://github.com/neonwatty/CCSwitcher-Codex) shows Claude Code and Codex usage across accounts.

The itch: when I am bouncing between Claude Code and Codex, I want a quick sense of active accounts, quota windows, local activity, and rough API-equivalent cost without opening dashboards or spelunking through CLI files.

This is exactly the kind of ambient status that belongs in the menu bar.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  <img src="/images/posts/weekly-vibes-2026-05-03/ccswitcher-codex-usage-1.png" alt="CCSwitcher Codex usage dashboard" style="width: 100%; border-radius: 8px;" />
  <img src="/images/posts/weekly-vibes-2026-05-03/ccswitcher-codex-usage-2.png" alt="CCSwitcher Codex account dashboard" style="width: 100%; border-radius: 8px;" />
</div>

Links: [GitHub](https://github.com/neonwatty/CCSwitcher-Codex), [demo page](https://neonwatty.github.io/CCSwitcher-Codex/).

## SpaceLabeler

[SpaceLabeler](https://github.com/neonwatty/space-labeler) lets me name and color-code Mac Spaces.

The itch: I run a lot of desktops. Writing, browser QA, builds, agents, dashboards, random experiments. Numbered Spaces are not enough. I want the current context visible in the menu bar so my desktop layout stays legible.

Tiny tool. Real relief.

![SpaceLabeler landing page](/images/posts/weekly-vibes-2026-05-03/space-labeler-home.png)

Links: [GitHub](https://github.com/neonwatty/space-labeler), [demo page](https://neonwatty.github.io/space-labeler/).

## PR Menu Bar

[PR Menu Bar](https://github.com/neonwatty/prbar) tracks merged pull request activity.

The itch: as agent-assisted development gets faster, I want a quick read on velocity. Not a big analytics dashboard. Just a local, glanceable pulse: what merged, when, and where.

It can run on sample data or live GitHub data, and the menu bar shape keeps it light.

<video controls muted playsinline style="width: 100%; border-radius: 8px; margin: 1.5rem 0;">
  <source src="/images/posts/weekly-vibes-2026-05-03/pr-menu.mp4" type="video/mp4" />
</video>

Links: [demo page](https://neonwatty.github.io/prbar/), [GitHub](https://github.com/neonwatty/prbar).

## Fleet

[Fleet](https://github.com/neonwatty/fleet) dispatches Claude Code sessions across local Macs.

The itch: I have multiple Macs on the network and want to use them as a small local agent cluster. Fleet picks a healthy machine, launches work over SSH, sets up dev server tunnels, and gives me status from a CLI and menu bar app.

This one is less "tiny widget" and more "personal infrastructure," but the principle is the same: make the workflow visible and reachable from wherever I already am.

![Fleet menu bar app screenshot](/images/posts/weekly-vibes-2026-05-03/fleet-menubar.png)

![Fleet dashboard app screenshot](/images/posts/weekly-vibes-2026-05-03/fleet-dashboard.png)

Links: [GitHub](https://github.com/neonwatty/fleet), [demo page](https://neonwatty.github.io/fleet/).

## The pattern

The menu bar is good for tools that answer one of these questions:

- Where am I?
- What is running?
- What needs attention?
- What did I do recently?
- Where should the next task go?

That maps surprisingly well to agentic development. Once you have multiple coding agents, multiple accounts, multiple machines, multiple PRs, and multiple local sessions, the bottleneck shifts from "can the code be written?" to "can I keep the system understandable?"

Small Mac apps help with that.

They do not need to be venture-scale products. They can just be native little pieces of personal leverage: indexed memory, usage visibility, workspace labels, PR pulse, and local fleet control.

That is what feels new to me. AI coding agents do not just make it easier to build big apps. They make it easier to build the tiny tools you always wanted but never had enough spare attention to make.

The menu bar is a great place to put those tools.
