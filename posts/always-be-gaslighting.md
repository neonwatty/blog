---
title: 'Always Be Gaslighting'
date: '2026-06-02'
excerpt: 'A meme about AI coding agent verification: treat “done” as a claim, not proof.'
tags:
  - AI Coding Agents
  - AI Agent Verification
  - AI Code Review
  - Prompting
  - Memes
author: Jeremy Watt
image: /images/posts/always-be-gaslighting/abg-always-be-gaslighting.gif
seoTitle: 'AI Coding Agent Verification: Always Be Gaslighting'
metaDescription: 'A short meme post on AI coding agent verification: why AI code review should treat “done” as a claim and demand proof, tests, traces, and receipts.'
---

<img src="/images/posts/always-be-gaslighting/abg-always-be-gaslighting.gif" alt="Always Be Gaslighting meme GIF" style="width: 100%; border-radius: 8px;" />

The most dangerous moment in AI-assisted coding is not when the agent is confused. It is when the AI coding agent sounds confident.

That is when you get the soft little con:

> done

> tests passed

> looks good

Maybe. Or maybe the agent has just created a beautiful paragraph about a reality it has not actually verified.

So I made a tiny meme out of the Glengarry cadence:

**ABG: Always Be Gaslighting.**

Not because agents are malicious. Because language models are very good at turning uncertainty into clean prose. They can summarize the shape of completion before completion has earned the right to exist.

The antidote, whether you call it AI agent verification, AI code review, or acceptance grounding, is boring and ruthless: evidence.

For meaningful work, I want the agent to assume the implementation is still wrong until it can prove otherwise. Find the failure mode that would embarrass the PR after merge. Verify it with a command, test, trace, screenshot, audit record, direct inspection, or some other artifact that survives optimism.

That is the gist of my [Agent Acceptance Grounding Prompts](https://gist.github.com/neonwatty/6f38f5d1f33894b7562642c90873ebb5): do not accept “done” as a fact. Treat it as a claim. Make the agent bring receipts.

The meme version is shorter:

**Always Be Gaslighting. Always demand proof.**
