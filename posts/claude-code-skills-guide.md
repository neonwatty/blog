---
title: 'Claude Code Skills Guide: Workflows, Examples, and Setup'
date: '2026-05-12'
excerpt: >-
  A practical Claude Code skills hub for reusable workflows: logo design,
  interviews, Socratic reviews, AskUserQuestion, SEO research, and repo setup.
tags:
  - Claude Code
  - Claude Code Skills
  - AI
  - Development
featured: false
author: Jeremy Watt
seoTitle: 'Claude Code Skills Guide: Reusable Workflows, Examples, and Setup'
metaDescription: >-
  Explore practical Claude Code skills for logo design, interviews, Socratic UI
  review, AskUserQuestion prompts, SEO keyword research, and repo setup.
relatedPosts:
  - askuserquestion-claude-code-skill
  - logo-designer-skill-claude-code
  - interview-skills-claude-code
  - socratic-interview-skills-claude-code
  - keyword-research-claude-code
  - how-to-set-up-your-repo-for-claude-code-and-codex
ogImage: /images/posts/og/how-to-set-up-your-repo-for-claude-code-and-codex.png
---

Claude Code skills are reusable workflow instructions. A good skill does not just tell the agent what output to produce. It tells the agent how to think through the work, when to ask questions, what evidence to gather, and when to stop.

This page is a practical hub for the Claude Code skill patterns I keep coming back to. It is organized by the outcome you want: design a logo, interview a user before coding, run a Socratic UI review, research keywords, or set up a repo so skills have guardrails.

## Start Here

- [Claude Code logo design skill for generating SVG logos](/posts/logo-designer-skill-claude-code/) — read a repo, generate multiple SVG concepts, refine the winner, and export app icons
- [Claude Code interview skills for better specs before coding](/posts/interview-skills-claude-code/) — use multi-round interviews to surface requirements, edge cases, and tradeoffs
- [Claude Code Socratic skills for iOS HIG testing](/posts/socratic-interview-skills-claude-code/) — turn platform guidelines into targeted review workflows
- [AskUserQuestion in Claude Code skills](/posts/askuserquestion-claude-code-skill/) — ask structured clarifying questions instead of guessing user intent
- [Claude Code SEO keyword research workflow](/posts/keyword-research-claude-code/) — use autocomplete and search data to find phrases people actually search for
- [Repo setup for Claude Code and Codex skills](/posts/how-to-set-up-your-repo-for-claude-code-and-codex/) — add the guardrails that make agent workflows safer

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

## Choosing a Claude Code Skill

Use the outcome to pick the right post:

| Outcome | Start here |
| --- | --- |
| Create a product logo | [Claude Code logo design skill](/posts/logo-designer-skill-claude-code/) |
| Clarify a vague feature or bug request | [Claude Code interview skills](/posts/interview-skills-claude-code/) |
| Ask structured questions inside a skill | [AskUserQuestion Claude Code skill](/posts/askuserquestion-claude-code-skill/) |
| Review an iOS UI against platform conventions | [Claude Code Socratic iOS HIG skill](/posts/socratic-interview-skills-claude-code/) |
| Research search demand before writing | [Claude Code keyword research workflow](/posts/keyword-research-claude-code/) |
| Prepare a repo for agents and skills | [Claude Code and Codex repo setup guide](/posts/how-to-set-up-your-repo-for-claude-code-and-codex/) |

## The Pattern

The skills that work best tend to share the same shape:

1. Gather real context.
2. Ask targeted questions when user intent matters.
3. Generate several options.
4. Compare the options against explicit criteria.
5. Refine the strongest direction.
6. Produce a concrete artifact.

That pattern shows up in feature planning, debugging, logo design, testing workflows, and SEO research. The domain changes. The process discipline is the useful part.
