---
title: 'AskUserQuestion in Claude Code: Clarifying Questions for Skills'
date: '2026-05-12'
excerpt: >-
  AskUserQuestion is the Claude Code tool that turns vague requests into
  structured decisions. Use it inside skills to force clarification before an
  agent writes code.
tags:
  - Claude Code
  - Claude Code Skills
  - AskUserQuestion
  - Prompt Engineering
  - Development
featured: false
author: Jeremy Watt
seoTitle: 'AskUserQuestion in Claude Code: Clarifying Questions for Skills'
metaDescription: >-
  What AskUserQuestion does in Claude Code, when to use it, and how to build
  skills that ask structured clarifying questions before coding.
relatedPosts:
  - interview-skills-claude-code
  - claude-code-skills-guide
  - socratic-interview-skills-claude-code
  - logo-designer-skill-claude-code
ogImage: /images/posts/og/claude-code-workflow-testing-mcp.png
---

`AskUserQuestion` is the Claude Code tool I reach for when an agent needs a decision before it should continue. It lets a skill ask a structured question, present concrete choices, and wait for the user to pick one. That sounds small, but it changes the shape of agent work.

Without a clarification step, Claude Code tends to fill in missing requirements. Sometimes that is useful. Sometimes it means the agent quietly chooses the wrong product behavior, the wrong test strategy, or the wrong design direction. `AskUserQuestion` gives you a clean interruption point: ask, decide, then proceed.

I use it heavily in [Claude Code interview skills](/posts/interview-skills-claude-code/) and in the [Claude Code SVG logo design skill](/posts/logo-designer-skill-claude-code/). In both cases, the point is the same: force important decisions into the conversation before implementation starts.

## What AskUserQuestion Is For

Use `AskUserQuestion` when the next step depends on user intent and guessing would create rework.

Good uses:

- Picking a feature scope before planning implementation
- Choosing between UX directions
- Confirming reproduction details before debugging
- Selecting a logo style before generating variations
- Approving a test workflow before writing it to the repo
- Deciding between a small fix and a broader refactor

Bad uses:

- Asking questions the codebase can answer
- Asking for permission on every obvious step
- Turning a focused task into a survey
- Asking open-ended questions when two or three concrete choices would work

The best `AskUserQuestion` calls are not generic. They compress the decision the user actually needs to make.

## A Skill Pattern That Works

This is the core pattern I use in Claude Code skills:

```markdown
1. Read enough context to understand the situation.
2. Identify the decision that blocks progress.
3. Ask one structured question with 2-3 strong options.
4. Explain the tradeoff for each option.
5. Continue only after the user chooses.
```

The context step matters. If the skill asks before reading the repo, it asks lazy questions. If it reads first, it can ask something sharper:

```markdown
Use AskUserQuestion to choose the implementation scope.

Ask one question:
- "Should this be a narrow patch or a reusable component?"

Options:
- "Narrow patch" — fastest, touches only the current screen.
- "Reusable component" — more work now, useful if this pattern appears elsewhere.
- "Investigate first" — inspect similar screens before deciding.
```

That question is useful because it frames a real tradeoff. The user is not being asked to restate the task. They are being asked to make the decision the agent should not invent.

## Example: Feature Interview

For a feature planning skill, `AskUserQuestion` can prevent the agent from sprinting into implementation with a half-formed spec.

```markdown
Before writing code, run 5-10 rounds of targeted questions.

Each question should reveal one of:
- A hidden assumption
- An edge case
- A user role or permission boundary
- A data lifecycle decision
- A failure mode

Do not ask obvious styling or naming questions unless they block the feature.
```

The point is not to make the process slow. The point is to surface the questions that would otherwise appear halfway through the implementation.

## Example: Logo Design Skill

In the logo skill, `AskUserQuestion` keeps the design process concrete.

Instead of asking:

> What kind of logo do you want?

The skill can ask:

```markdown
Which direction should the first concept batch explore?

Options:
- "Literal product metaphor" — clearer at small sizes, less abstract.
- "Abstract brand mark" — more flexible, may need more refinement.
- "Lettermark" — compact and favicon-friendly, less descriptive.
```

That gives the user a meaningful decision. It also gives Claude Code enough direction to generate better SVG concepts.

## How to Keep Questions Useful

I follow a few rules:

- Ask one question at a time unless the choices are tightly related.
- Put the recommended option first only when there is a real recommendation.
- Make every option mutually exclusive.
- Include the consequence of each choice.
- Avoid "Other" as a written option if the UI already allows free-form input.
- Continue immediately after the answer.

The highest-value questions are usually about scope, risk, or intent. The lowest-value questions are usually about details the agent can infer.

## Where It Fits in a Claude Code Setup

`AskUserQuestion` is one piece of a broader agent setup. I usually combine it with:

- [Repo setup guardrails for Claude Code and Codex](/posts/how-to-set-up-your-repo-for-claude-code-and-codex/)
- [Reusable Claude Code skills](/posts/claude-code-skills-guide/)
- [Socratic skill workflows for UI testing](/posts/socratic-interview-skills-claude-code/)
- [Claude Code logo generation](/posts/logo-designer-skill-claude-code/)

The broader lesson is simple: if the agent should not decide something alone, encode that pause into the skill. `AskUserQuestion` is the tool that makes the pause explicit.
