---
title: 'The Vibe Coding Interview: How to Hire AI-Assisted Developers'
date: '2026-03-04'
excerpt: >-
  The old question was 'can you code?' The new question is 'can you build and
  ship?' A framework for evaluating engineers who use Claude Code, Cursor, and
  other AI-assisted coding tools.
tags:
  - Vibe Coding
  - AI
  - Hiring
  - Interview
  - Claude Code
  - Cursor
author: Jeremy Watt
featured: false
seoTitle: 'Vibe Coding Interview Questions: Framework for Hiring AI-Assisted Developers'
metaDescription: >-
  How to interview agentic engineers. Portfolio screening, take-home
  assignments, live coding sessions, and session history review for AI-assisted
  developers using Claude Code, Cursor, and Copilot.
relatedPosts:
  - tdd-is-dead
  - why-nobody-on-your-engineering-team-wants-to-use-claude-code
  - a-claude-code-incubator
ogImage: /images/posts/og/vibe-coding-interview-hire-ai-developers.png
---

The hiring playbook for developers is changing rapidly. 

If you're hiring AI-enabled developers in 2026, you need an agentic engineering interview framework that actually evaluates how people work today.

Here's a framework.

---

## The Agentic Engineering Interview Framework (TL;DR)

**The old question:** "Can you write code well?"

**The new question:** "Can you read and edit code well? Can you build safe and smart? Can you ship?"

<table class="post-table">
  <thead>
    <tr><th>Stage</th><th>What You're Evaluating</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Portfolio Review</strong></td><td>Do they have launched apps? Active GitHub? Evidence of shipping?</td></tr>
    <tr><td><strong>Take-Home Assignment</strong></td><td>Speed + quality. Full CI/CD. Tests that test something. Then review it together.</td></tr>
    <tr><td><strong>Live Coding Session</strong></td><td>Can they scope, build, and ship a feature in an hour using AI tools?</td></tr>
    <tr><td><strong>Session History Review</strong></td><td>Judgment, architecture decisions, evidence they direct (not just accept) AI output</td></tr>
  </tbody>
</table>

<style>
.post-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.95rem;
}
.post-table th, .post-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border-primary, #e5e7eb);
}
.post-table th {
  background: var(--color-bg-secondary, #f9fafb);
  font-weight: 600;
}
</style>

The bar has moved. Coding ability is table stakes. Building and shipping is the skill.

---

## Before You Talk: Read Their Work

The high water mark—which is becoming more and more common—is the portfolio. At the very least, it reflects someone's curiosity and interest in the tools of the times. It's becoming easier and easier to ship more complete products. That's what the best "vibe coders" should be doing in their free time.

**GitHub activity.** Not just green squares—actual projects. Do they have repos that are more than tutorial clones? Have they shipped anything end-to-end? Just as telling: look at their contributions to other people's code. Merged PRs into open source projects show they can navigate an unfamiliar codebase, follow existing conventions, and collaborate. Even thoughtful issues or discussions signal someone who engages with the ecosystem beyond their own work.

**Launched apps.** This is easier than ever and is a huge signal. A candidate with a deployed side project or two (even small ones) has demonstrated they can take something from idea to production. An app that's gone through rounds with actual users-even better.

**What to look for:**
- Deployed, working applications (not just code in a repo)
- Evidence of iteration (v2, bug fixes, feature additions)
- Automated best practices for keeping a project on rails: linting, knip, test coverage
- Setup and evidence of hooks and skills for their agentic platform of choice
- CI/CD pipelines
- Real users, even if it's just "my friends use this"

---

## What You're Evaluating

Whether candidates are using Cursor, Claude Code, Copilot, or Windsurf, here's what separates good AI-assisted developers from the rest. These criteria apply regardless of which interview format you choose.

**Architectural thinking.** When AI handles the boilerplate, what does the candidate focus on? Do they make good design decisions? Do they structure the codebase in a way that makes sense? Do they integrate best practices for engineering in general—which now matter even more when you're shipping PRs every day?

**Scoping.** Do they understand what they can achieve in a given timeframe? Trying to do too much at once and shipping a bunch of untested features is a sign of someone who doesn't know how to think clearly in an age where they can move from individual contributor to manager of a fleet of agents.

**Speed AND quality.** The old tradeoff is dead. AI-assisted coding should deliver both. If someone takes four hours and ships obviously buggy code, they're not using the tools well. If they ship fast but the tests are garbage, same problem.

**Testing discipline.** This is huge. Anyone can tell Claude to "add tests." The question is: do the tests actually test anything? Do they cover edge cases? Error states? Or are they just checking that `1 + 1 = 2` to hit a coverage number?

**Communication and prompting.** The best agentic engineers communicate clearly—with their tools, not just their teammates. In Claude Code, strong developers use plan mode to scope before writing a line of code, and AskUserQuestion to pull out edge cases they'd otherwise miss. In Cursor, they write focused, incremental prompts rather than vague "build me X" requests. The quality of someone's prompts is a direct reflection of how clearly they think.

**Evidence of review.** You want someone who treats AI output as a first draft, not gospel. Look for signs they pushed back, refactored, or improved what the AI gave them.

### Red Flags

**Shallow tests.** Tests exist, they pass, but they're testing the happy path only. This screams "I told the AI to add tests and shipped whatever it wrote." Just having unit tests—which were the easiest thing to generate even before AI—really isn't enough. Integration and end-to-end testing can be automated using Playwright, Claude in Chrome, and similar tools. Look for candidates who go beyond the basics.

**Over-engineering.** Three layers of abstraction for a feature that needed one function. AI tools will happily build you an enterprise architecture for a weekend project if you let them. Good developers know when to say "this is too much."

**Inconsistent patterns.** Different parts of the codebase feel like they were written by different people (because they were—different AI sessions with no human coherence).

**Vague prompting.** Session history full of "fix this," "make it work," or "add a feature for X" with no context, no constraints, no acceptance criteria. If someone can't communicate clearly with an LLM, they can't communicate clearly with their team either. The best engineers treat their AI tools like a junior developer who needs specific, well-scoped instructions.

---

## The Interview

There's no single right way to interview agentic engineers. The best format depends on your constraints—your tooling policy, time budget, and what you're optimizing for. Here are three approaches that work, each with different tradeoffs.

### Option A: The Take-Home Assignment

Give them something real. Not a LeetCode problem, not a toy todo app. A mini product with 2-3 features that takes 4-8 hours.

The bar isn't "can you code?" It's "can you ship?" You're looking for:

- Full CI/CD pipeline (tests, linting, type checking, build)
- Features that work, not just compile
- Documentation that you and your agents can learn from
- Bonus: integration with observability tools like Sentry

The real value comes when you **review the take-home together**. Walk through their code, their decisions, their test strategy. Even better: run their submission through your own AI agents before the review. Let your tools audit the code, flag patterns, and surface questions. Then bring those questions to the conversation.

**When to use this:** You have candidates who can dedicate 4-8 hours. You want a standardized, fair comparison across candidates. You want time to review with your own AI tools before the conversation.

### Option B: The Live 1-Hour Session

Build something together. Give the candidate a boilerplate app in whatever framework you use, and ask them to add a feature in 60 minutes.

What you can observe in this format depends heavily on one thing: **what tools the candidate is allowed to use.**

**If candidates use their own tools (Claude Code, Cursor, etc.):** This is the gold standard. You see the actual skill you're hiring for—how they direct agents, scope work, review output, catch mistakes, and iterate. You see their real workflow, not a performance. Pay attention to how they communicate with their tools: do they start in plan mode to scope the work? Do they ask clarifying questions before diving in? Do they break the problem down or try to do everything in one prompt?

**If candidates are constrained to an interview platform (CoderPad, HackerRank, etc.):** You're more limited. These platforms don't support Claude Code or Cursor yet, so you're evaluating a different skill—closer to the traditional coding interview. You can still learn about their fundamentals and communication, but you won't see how they actually work day-to-day.

> **Example setup:** A Next.js boilerplate with auth already wired up. Ask them to add a feature—say, a user settings page with profile editing and email preferences. In 60 minutes with their own tools, a strong candidate will ship working code with tests, proper form validation, and maybe even error handling with security (e.g., Sentry) planned or integrated. You'll see them scope the work, direct their AI, review the output, and make architectural decisions in real time.

**When to use this:** You want to see the candidate's real-time workflow. Best when you can let them use their own tools. Less effective when constrained to a platform.

### Option C: Session History Review

Ask candidates to bring the session history from a project they built using AI-enabled tools.

Claude Code keeps session logs. Cursor has history. Whatever tool they used—the transcript of their conversation with the AI is the artifact you want to review.

Walk through it together. Here are the questions that actually reveal skill:

- "Tell me about this architecture decision here"
- "I see you asked about three different libraries—why'd you pick this one?"
- "Walk me through your testing approach"
- "This refactor is interesting—what prompted it?"
- "I notice you rejected the AI's suggestion here—why?"

The candidate can search their history to answer questions. That's fine—that's the workflow. You're not testing memorization, you're testing judgment.

**Two ways to source the session history:**

**Personal project.** The candidate picks a project they're proud of. You see what they choose to build on their own time, how they approach something they care about. The downside: no controlled comparison across candidates, and you can't verify the context or constraints they were working under.

**Take-home assignment.** You give them the take-home (Option A), then review their session history from completing it. Same task across all candidates means fair comparison. You know the scope and constraints because you set them. The downside: it's more artificial, and you might miss seeing what they build when they're genuinely curious.

**When to use this:** You want deep insight into how someone actually works with AI. Works especially well as a complement to the take-home. Also a strong alternative when a live session isn't practical.

### Mixing and Matching

These formats aren't mutually exclusive. The strongest signal often comes from combining them. Take-home + session history review is a natural pairing: you get standardized output to compare, plus a window into how they actually built it. A live session after a take-home lets you probe decisions in real time. Pick the combination that fits your hiring timeline and candidate pool.

### A Note on Candidate Experience

This cuts both ways. Candidates are evaluating your engineering culture just as much as you're evaluating their skills. If your interview process still looks like whiteboard algorithms and trick questions, strong AI-native developers will self-select out. The interview format you choose signals what kind of engineering org you are. Letting candidates use their real tools, reviewing their real work, and having a real technical conversation—that's how you attract the people who are actually shipping.

---

## Tool-Specific Session Review Tips

Different AI-assisted coding tools surface history differently. Here's what to look for:

**Claude Code**
- Session transcripts in `~/.claude/` show the full back-and-forth
- Look for: Use of plan mode before implementation, AskUserQuestion for clarifying requirements, multi-turn refinement, rejected suggestions, architectural discussions
- Ask: "How did you decide to use plan mode here?" or "Walk me through how AskUserQuestion surfaced that edge case"
- Green flag: Structured workflow (plan → clarify → implement → review). Red flag: Single prompt → ship.

**Cursor**
- Composer history shows multi-file changes and the prompts that generated them
- Look for: How they scope requests, whether they review diffs before accepting
- Green flag: Incremental, focused prompts. Red flag: "Build me an entire app" prompts.

**Copilot, Windsurf, and Others**
- Chat history varies—Copilot Chat shows reasoning, but inline completions don't leave a trail. Windsurf and similar tools surface cascading changes and the prompts behind them.
- If no chat history exists, ask them to walk through their workflow verbally. Focus on: "How do you decide what to accept vs. reject?"

The goal isn't to judge *which* tool they use. It's to understand *how* they use it.
