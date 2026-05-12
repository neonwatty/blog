---
title: Claude Code Skills Guide
date: '2026-05-12'
excerpt: >-
  A practical index of Claude Code skill workflows: questioning, logo design,
  UI review, SEO research, and repo guardrails.
tags:
  - Claude Code
  - Claude Code Skills
  - AI
  - Development
featured: false
author: Jeremy Watt
seoTitle: 'Claude Code Skills Guide: Practical Workflows and Examples'
metaDescription: >-
  A guide to practical Claude Code skills and workflows, including
  AskUserQuestion interviews, SVG logo design, repo setup, UI review, and SEO
  keyword research.
relatedPosts:
  - askuserquestion-claude-code-skill
  - logo-designer-skill-claude-code
  - interview-skills-claude-code
  - how-to-set-up-your-repo-for-claude-code-and-codex
ogImage: /images/posts/og/how-to-set-up-your-repo-for-claude-code-and-codex.png
---

Claude Code skills are reusable workflow instructions. A good skill does not just tell the agent what output to produce. It tells the agent how to think through the work, when to ask questions, what evidence to gather, and when to stop.

This page is a practical index of the Claude Code skill patterns I keep coming back to. It is organized by the kind of failure the skill prevents, because that is the useful way to think about skills: they are not decorations around a prompt, they are process guardrails.

## Start Here

- [AskUserQuestion Claude Code Skill](/posts/askuserquestion-claude-code-skill/) — how to use structured questions before an agent commits to a direction
- [Claude Code Logo Generator: SVG Logo Design Skill](/posts/logo-designer-skill-claude-code/) — a full design workflow encoded as a reusable skill
- [Claude Code Skills Tutorial: AskUserQuestion for Better Prompts](/posts/interview-skills-claude-code/) — broader interview skill patterns for features, bugs, and workflows
- [Claude Code Skills for iOS Human Interface Guidelines Testing](/posts/socratic-interview-skills-claude-code/) — using skill-driven questioning for UI review

## Skill Types

| Skill type | Use it when | Example |
| --- | --- | --- |
| Interview skill | The user has a rough idea but not a complete spec | Feature planning, bug diagnosis, product decisions |
| Generation skill | The agent needs to produce multiple candidate artifacts | Logos, storyboards, UI concepts |
| Review skill | The agent needs to compare work against standards | iOS HIG checks, accessibility review, code review |
| Research skill | The agent needs external data before acting | Keyword research, Search Console analysis |
| Guardrail skill | The agent needs a repeatable safety process | TDD, systematic debugging, release checks |

The same skill can combine several of these. The logo skill, for example, is both an interview skill and a generation skill: it asks structured questions before it generates SVG concepts.

## What Belongs in a Good Skill

A useful skill usually includes:

- **Trigger criteria** — when the skill should run
- **Context gathering rules** — which files, docs, or tools to inspect first
- **Decision points** — where to use `AskUserQuestion` instead of guessing
- **Output criteria** — what a finished artifact must include
- **Stop conditions** — when to pause, ask, or refuse to continue

The stop conditions are underrated. Agents are good at continuing. Skills are where you encode when continuing would be the wrong move.

## Repo and Agent Setup

Skills work best when the repo around them has guardrails. Start with [How to Set Up Your Repo for Claude Code and Codex](/posts/how-to-set-up-your-repo-for-claude-code-and-codex/) if you are adding agents to an existing project.

That setup post covers the boring pieces that make skills safer:

- `CLAUDE.md` / `AGENTS.md`
- CLI tools
- linting and formatting
- CI
- hooks
- plugins
- MCP servers

## SEO and Research Workflows

Claude Code is also useful for search and content workflows when it has access to real data.

- [SEO Keyword Research with Claude Code](/posts/keyword-research-claude-code/) — use autocomplete data to find search demand
- [Pull Google Search Console Data with Claude Code](/posts/best-claude-code-seo-tools/) — query GSC data directly instead of clicking through exports

## The Pattern

The skills that work best tend to share the same shape:

1. Gather real context.
2. Ask targeted questions when user intent matters.
3. Generate several options.
4. Compare the options against explicit criteria.
5. Refine the strongest direction.
6. Produce a concrete artifact.

That pattern shows up in feature planning, debugging, logo design, testing workflows, and SEO research. The domain changes. The process discipline is the useful part.
