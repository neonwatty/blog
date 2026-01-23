---
title: "The Vibe Coding Interview: How to Hire AI-Assisted Developers"
date: "2026-01-16"
excerpt: "The old question was 'can you code?' The new question is 'can you build and ship?' A framework for evaluating engineers who use Claude Code, Cursor, and other AI-assisted coding tools."
tags: ["Vibe Coding", "AI", "Hiring", "Interview", "Claude Code", "Cursor"]
author: "Jeremy Watt"
featured: false
image: ""
seoTitle: "Vibe Coding Interview Questions: Framework for Hiring AI-Assisted Developers"
metaDescription: "How to interview engineers for vibe coding skills. Take-home assignment structure, session history review, and what to look for in AI-assisted developers using Claude Code, Cursor, and Copilot."
---

The hiring playbook for developers is changing. When your best candidates are shipping features 3x faster using Claude Code, Cursor, or Copilot, the old whiteboard algorithm grind starts to feel disconnected from reality.

If you're hiring AI developers in 2026, you need a vibe coding interview framework that actually evaluates how people work today.

Here's what's working.

---

## The Vibe Coding Interview Framework (TL;DR)

**The old question:** "Can you code?"

**The new question:** "Can you build? Can you ship?"

<table class="post-table">
  <thead>
    <tr><th>Stage</th><th>What You're Evaluating</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Portfolio Review</strong></td><td>Do they have launched apps? Active GitHub? Evidence of shipping?</td></tr>
    <tr><td><strong>Take-Home Assignment</strong></td><td>Speed + quality. Full CI/CD. Tests that test something.</td></tr>
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

## Start With the Portfolio

Before you even send a take-home, look at what they've already shipped.

**GitHub activity.** Not just green squares—actual projects. Do they have repos that are more than tutorial clones? Have they shipped anything end-to-end?

**Launched apps.** This is easier than ever to create and is a huge signal. A candidate with three deployed side projects (even small ones) has demonstrated they can take something from idea to production. That's the skill you're hiring for.

**What to look for:**
- Deployed, working applications (not just code in a repo)
- Evidence of iteration (v2, bug fixes, feature additions)
- CI/CD setup in their projects
- Real users, even if it's just "my friends use this"

In the vibe coding era, there's no excuse for an empty portfolio. The tools make building and shipping faster than ever. If someone says they're a great AI-assisted developer but has nothing deployed, that's a red flag.

## The Take-Home Coding Assignment

Give them something real. Not a LeetCode problem, not a toy todo app. A mini product with 2-3 features that takes 4-8 hours.

The bar isn't "can you code?" It's "can you ship?"

**Requirements:**
- Full CI/CD pipeline (tests, linting, type checking, build)
- Deployment preview (Vercel, Netlify, whatever)
- Working features that actually work

**What you don't require:** Documentation about their AI-assisted coding tools or workflow. The code speaks for itself. If they used Claude to scaffold the entire thing and it's well-architected with comprehensive tests—great. That's the skill you're hiring for.

## Vibe Coding Best Practices: What You're Evaluating

Whether candidates are using Cursor, Claude Code, Copilot, or Windsurf, here's what separates good AI-assisted developers from the rest:

**Speed AND quality.** The old tradeoff is dead. AI-assisted coding should deliver both. If someone takes 8 hours and ships buggy code, they're not using the tools well. If they ship fast but the tests are garbage, same problem.

**Architectural thinking.** When AI handles the boilerplate, what does the candidate focus on? Do they make good design decisions? Do they structure the codebase in a way that makes sense?

**Testing discipline.** This is huge. Anyone can tell Claude to "add tests." The question is: do the tests actually test anything? Do they cover edge cases? Error states? Or are they just checking that `1 + 1 = 2` to hit a coverage number?

**Evidence of review.** You want someone who treats AI output as a first draft, not gospel. Look for signs they pushed back, refactored, or improved what the AI gave them.

## Red Flags in AI-Assisted Coding

**Shallow tests.** Tests exist, they pass, but they're testing the happy path only. This screams "I told the AI to add tests and shipped whatever it wrote."

**Over-engineering.** Three layers of abstraction for a feature that needed one function. AI-assisted coding tools will happily build you an enterprise architecture for a weekend project if you let them. Good developers know when to say "this is too much."

**Inconsistent patterns.** Different parts of the codebase feel like they were written by different people (because they were—different AI sessions with no human coherence).

## Vibe Coding Interview Questions: The Follow-Up

Here's where the AI-assisted coding interview gets interesting. Ask candidates to bring their session history.

Claude Code keeps session logs. Cursor has history. Whatever tool they used—the transcript of their conversation with the AI is the artifact you want to review.

Walk through it together. Here are the vibe coding interview questions that actually reveal skill:

- "Tell me about this architecture decision here"
- "I see you asked about three different libraries—why'd you pick this one?"
- "Walk me through your testing approach"
- "This refactor is interesting—what prompted it?"
- "I notice you rejected the AI's suggestion here—why?"

The candidate can search their history to answer questions. That's fine. That's the workflow. You're not testing memorization, you're testing judgment.

What you're looking for: Do they understand what they built? Can they explain the tradeoffs? Did they make intentional decisions or just accept whatever the AI suggested?

## Tool-Specific Session Review Tips

Different AI-assisted coding tools surface history differently. Here's what to look for:

**Claude Code**
- Session transcripts in `~/.claude/` show the full back-and-forth
- Look for: Multi-turn refinement, rejected suggestions, architectural discussions
- Green flag: Long sessions with iteration. Red flag: Single prompt → ship.

**Cursor**
- Composer history shows multi-file changes and the prompts that generated them
- Look for: How they scope requests, whether they review diffs before accepting
- Green flag: Incremental, focused prompts. Red flag: "Build me an entire app" prompts.

**GitHub Copilot**
- Chat history (if using Copilot Chat) shows reasoning
- Harder to review since inline completions don't leave a trail
- Ask them to walk through their workflow verbally if no chat history exists

**Windsurf / Others**
- Similar to Cursor—look for the cascade of changes and how they directed it
- Ask about their review process: "How do you decide what to accept vs. reject?"

The goal isn't to judge *which* tool they use. It's to understand *how* they use it.

## On AI Independence

Should candidates be able to code without AI-assisted coding tools?

Somewhat. They should understand fundamentals—what a closure is, how async works, basic data structures. You don't want someone who's helpless if the API is down.

But an AI-first workflow is totally acceptable. If their natural mode is to pair with Claude Code or Cursor on everything, that's not a weakness. That's probably how your team works too.

The question isn't "can you code without AI?" It's "can you effectively direct AI to build what needs to be built?"

## The Mindset Shift

Traditional interviews optimize for "can this person solve problems alone under pressure?"

The vibe coding interview optimizes for "can this person build and ship quality software quickly using modern AI-assisted coding tools?"

Different question. Different evaluation. Different hires.
