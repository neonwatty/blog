---
title: 'Weekly Side-Vibes for the Week of May 3, 2026'
date: '2026-05-03T12:00:00'
excerpt: >-
  Dogfooding notes from a week of Mac menu bar apps, iOS workflows, BugDrop,
  issuectl, and small agent-powered developer tools.
tags:
  - Weekly Update
  - Mac Apps
  - Menu Bar Apps
  - iOS
  - Claude Code
  - Codex
  - Developer Tools
featured: false
draft: true
author: Jeremy Watt
image: /images/posts/weekly-vibes-2026-05-03/session-search-results.png
metaDescription: >-
  Weekly dogfooding update on Mac menu bar apps, iOS workflows, BugDrop,
  issuectl, and small agent-powered developer tools.
relatedPosts:
  - playwright-profiles-claude-code-plugin
  - how-to-set-up-your-repo-for-claude-code-and-codex
  - social-starter-pack-cli-tools
---

This week was mostly dogfooding: small Mac menu bar apps, iOS workflow experiments, and developer tools that remove little bits of friction from my day.

The common pattern: if I keep checking a dashboard, hunting through terminal history, or pasting the same rough issue description into five places, I eventually try to turn that workflow into a local tool.

## Session Search

[Session Search](https://github.com/neonwatty/session-search) is a macOS menu bar app for full-text search across Claude Code and Codex session history.

Motivation: the built-in session search in Claude Code and Codex does not index enough of the actual conversation to be optimally useful. I wanted a local index over the full transcript, plus the convenience of opening it from the menu bar.

It indexes local transcripts, shows matching snippets, and resumes the selected session in Terminal, iTerm2, or Ghostty.

![Session Search results](/images/posts/weekly-vibes-2026-05-03/session-search-results.png)

<video controls muted playsinline style="width: 100%; border-radius: 8px; margin: 1.5rem 0;">
  <source src="/images/posts/weekly-vibes-2026-05-03/session-search-demo.mp4" type="video/mp4" />
</video>

Links: [GitHub](https://github.com/neonwatty/session-search), [homepage](https://neonwatty.github.io/session-search/), latest release `v1.9.0`.

## CCSwitcher Codex

I forked [CCSwitcher](https://github.com/XueshiQiao/CCSwitcher) to add Codex usage alongside Claude Code usage.

Motivation: I use Claude Code and Codex at the same time often, and wanted the same at-a-glance menu bar view of account state, quota usage, local activity, and rough API-equivalent cost estimates for both.

I posted the Codex direction upstream in [XueshiQiao/CCSwitcher#12](https://github.com/XueshiQiao/CCSwitcher/issues/12).

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  <img src="/images/posts/weekly-vibes-2026-05-03/ccswitcher-codex-usage-1.png" alt="CCSwitcher Codex usage screenshot" style="width: 100%; border-radius: 8px;" />
  <img src="/images/posts/weekly-vibes-2026-05-03/ccswitcher-codex-usage-2.png" alt="CCSwitcher Codex account screenshot" style="width: 100%; border-radius: 8px;" />
</div>

Link: [CCSwitcher Codex fork](https://github.com/neonwatty/CCSwitcher-Codex).

## SpaceLabeler

[SpaceLabeler](https://github.com/neonwatty/space-labeler) is a tiny menu bar utility for naming and color-coding macOS Spaces.

Motivation: I want "Writing", "Builds", "Browser QA", etc. in my menu bar instead of trying to remember which numbered Space is which.

![SpaceLabeler landing page](/images/posts/weekly-vibes-2026-05-03/space-labeler-home.png)

Links: [GitHub](https://github.com/neonwatty/space-labeler), [homepage](https://neonwatty.github.io/space-labeler/).

## PR Menu Bar

PR Menu Bar is a menu bar prototype for tracking pull request activity over a configurable time window.

Motivation: I was curious to track my increasing development velocity as I learn how to harness agents to create apps faster and more efficiently. It also feels right for this to live in the menu bar instead of another GitHub tab.

It can use live GitHub data, falls back to sample data, and now has connection state, chart bins, hover tooltips, refresh behavior, and repo filtering.

<video controls muted playsinline style="width: 100%; border-radius: 8px; margin: 1.5rem 0;">
  <source src="/images/posts/weekly-vibes-2026-05-03/pr-menu.mp4" type="video/mp4" />
</video>

## BugDrop

[BugDrop](https://bugdrop.dev/) turns in-app feedback into GitHub Issues with screenshots and annotations.

Motivation: I am working on a variety of different projects and needed something that helps me dogfood them myself, while also letting alpha and beta users send useful feedback for quick iteration. I am also thinking about extending this kind of feedback loop to agent users.

<div style="max-width: 800px; margin: 1.5rem auto;">
  <iframe width="100%" height="450" src="https://www.youtube.com/embed/VkLvP1xmRzo" title="BugDrop Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius: 8px;"></iframe>
</div>

Recent work tightened real-world embedding: runtime theme APIs, auto-following OS theme, self-hosting docs, and smaller UI polish.

Links: [homepage](https://bugdrop.dev/), [GitHub](https://github.com/mean-weasel/bugdrop), [live demo](https://bugdrop-widget-test.vercel.app), [video demo](https://www.youtube.com/embed/VkLvP1xmRzo), latest release `v1.28.0`.

## issuectl and iOS

[issuectl](https://github.com/mean-weasel/issuectl) is a cross-repo GitHub issue command center with Claude Code and Codex launch integration.

Motivation: I wanted a faster path from rough product/dev thought to agent-ready issue. The main flow I have been dogfooding: paste in a rough description, let issuectl parse it into tasks and todo lists, choose Claude Code or Codex, and launch immediately with the issue context already wired up.

![issuectl parse to launch flow](/images/posts/weekly-vibes-2026-05-03/issuectl-parse-launch-flow.png)

I also built out the iOS path: browse repos, issues, PRs, and sessions; quick-create issues; comment/close issues; review or merge PRs; and launch sessions from mobile.

Latest release: `v0.46.0`.

## Fleet

[Fleet](https://github.com/neonwatty/fleet) distributes Claude Code sessions across a local Mac fleet.

Motivation: I have a variety of Mac minis and other Macs on my home network, and I distribute app development tasks across them. I needed a handy way to keep track of where Claude Code and Codex sessions were running, which apps were running, and which machine was healthy enough for the next task.

It auto-picks the healthiest machine, launches work over SSH, and sets up tunnels for dev server callbacks.

![Fleet menu bar app screenshot](/images/posts/weekly-vibes-2026-05-03/fleet-menubar.png)

![Fleet dashboard app screenshot](/images/posts/weekly-vibes-2026-05-03/fleet-dashboard.png)

Links: [GitHub](https://github.com/neonwatty/fleet), [homepage](https://neonwatty.github.io/fleet/), latest release `v0.4.1`.

## Other Experiments

[Playwright Profiles](https://github.com/neonwatty/playwright-profiles) reached `v1.4.0` with more hardened auth profile handling.

[Autopilot Loop](https://github.com/neonwatty/autopilot-loop) is a new Codex plugin/CLI experiment for repeated build, audit, fix, verify, and judge loops.

[Commentary Video](https://github.com/neonwatty/commentary-video) is a prototype for turning audio commentary into slideshow-style MP4 videos.

## The Vibe

Small local software is underrated.

Not every useful tool needs to become a SaaS. Sometimes the best thing is a menu bar app, a tiny iOS workflow, or a one-purpose command that saves one context switch twenty times a day.
