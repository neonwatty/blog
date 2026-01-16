---
title: "Claude Code Skills Tutorial: AskUserQuestion for Better Prompts"
date: "2026-01-15"
excerpt: "Claude's default mode is eager compliance. These interview skills flip the script—using AskUserQuestion to force systematic questioning before any code gets written."
tags: ["Claude Code", "AI", "Skills", "Prompt Engineering", "Development"]
author: "Jeremy Watt"
featured: false
image: "/images/posts/socratic-ios/01-ios-tab-bar-events.png"
seoTitle: "Claude Code Skills Examples: Using AskUserQuestion for Multi-Round Interviews"
metaDescription: "Learn how to build Claude Code skills that interview users before implementing features. Best practices for AskUserQuestion tool, prompt engineering, and workflow automation."
---

Whenever you're working on something new—a feature, a complex process, a workflow—you start with a single idea. But as soon as you start pulling the thread, everything gets complicated. Edge cases emerge. Requirements you hadn't considered surface. The simple thing becomes not-so-simple.

If you dive straight into development without fully pulling that thread, you end up building something brittle, incomplete, less robust than it seemed when you first had the idea.

Claude's `AskUserQuestion` tool, used repetitively, helps dredge all that stuff out of the ether before you write any code. (This post was inspired by [a tweet from Thariq](https://x.com/trq212/status/2005315275026260309) about using the tool for spec-based development.)

That tweet sparked an idea: what if you baked this questioning pattern into reusable skills? Instead of remembering to ask Claude to interview you, the skill does it automatically.

## The Interview Skills

I've built several skills in [claude-skills](https://github.com/neonwatty/claude-skills) that use this pattern. Each forces Claude into questioning mode before implementation mode:

<table class="post-table">
  <thead>
    <tr><th>Skill</th><th>Purpose</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>feature-interview</strong></td><td>Multi-round Q&A before implementing features</td></tr>
    <tr><td><strong>bug-interview</strong></td><td>Systematic diagnosis before fixing bugs</td></tr>
    <tr><td><strong>think-through</strong></td><td>Socratic exploration of technical ideas</td></tr>
    <tr><td><strong>ios-workflow-generator</strong></td><td>Creates iOS workflow specs via Q&A</td></tr>
    <tr><td><strong>browser-workflow-generator</strong></td><td>Creates browser workflow specs via Q&A</td></tr>
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
  background: var(--color-background-secondary, #f9fafb);
  font-weight: 600;
}
.post-table tr:last-child td {
  border-bottom: none;
}
</style>

## Feature Interview

The [feature-interview](https://github.com/neonwatty/claude-skills/blob/main/skills/feature-interview/SKILL.md) skill runs 5-10 rounds of questioning before writing any implementation plan:

```markdown
Use AskUserQuestion repeatedly to explore the feature.
**Do not ask obvious questions.** Ask questions that:

- Reveal hidden assumptions
- Expose edge cases the user hasn't considered
- Uncover tradeoffs they'll need to make
```

The key instruction: **do not ask obvious questions**. Claude shouldn't ask "what color should the button be?" It should ask questions that reveal hidden assumptions and force you to make decisions you'd been avoiding.

## Real Example: Think-Through Skill

I ran the [think-through](https://github.com/neonwatty/claude-skills/blob/main/skills/think-through/SKILL.md) skill on an idea for a party video sharing app—before writing any code, just to vet the idea. Here's what Claude asked:

**Round 1 - Usage scenario:**
> "When you imagine people actually using this, what's the scenario? Are they physically together (like at an actual party) using it on a TV, or remote friends on a video call, or async where people add to a queue throughout the day and watch later?"

**Round 2 - The actual pain point:**
> "What's happening right now when you and your friends want to share videos at a party? Is someone constantly grabbing the Chromecast remote, passing a phone around, or arguing about whose turn it is? What's the actual pain point you've felt?"

**Round 3 - Target audience:**
> "Who's at these parties? Are we talking college students pregaming, millennials at a house party, families at Thanksgiving showing memes, friend groups at someone's apartment? The vibe matters for how this would actually work."

The session continued for 10 rounds total—covering beachhead market, competitive landscape, technical complexity, scope constraints, queue mechanics, core value proposition, and business model. By the end, I'd thought through scenarios I never would have considered upfront—and decided to shelve the idea until I had better answers.

## Bug Interview

The [bug-interview](https://github.com/neonwatty/claude-skills/blob/main/skills/bug-interview/SKILL.md) skill does the same thing for debugging. Instead of diving straight into the code, Claude interviews you about the bug:

```markdown
Ask probing questions about:
- Exact reproduction steps
- Environment details (browser, OS, network conditions)
- When it started happening
- What changed recently
- Patterns (does it happen every time? Only for certain users?)
```

This prevents the classic mistake: Claude sees an error, makes an assumption about the cause, and "fixes" something unrelated to the actual bug.

## Workflow Generators

The workflow generator skills ([ios-workflow-generator](https://github.com/neonwatty/claude-skills/blob/main/skills/ios-workflow-generator/SKILL.md), [browser-workflow-generator](https://github.com/neonwatty/claude-skills/blob/main/skills/browser-workflow-generator/SKILL.md)) apply the same pattern to testing workflows.

Instead of Claude deciding what workflows to test, it explores your codebase, proposes workflows, and asks you to verify:

```markdown
### Phase 6: Review with User (REQUIRED)

**This step is mandatory. Do not write the final file without user approval.**

Use `AskUserQuestion` to ask:
- "Do these workflows cover all the key user journeys?"
- Options: Approve / Add more workflows / Modify existing / Start over

**Only after explicit approval**, write to `/workflows/ios-workflows.md`
```

The approval gate is crucial. Claude proposes, you refine, it asks follow-up questions, you refine again—until you've actually thought through what needs testing.

## The Pattern

All these skills share the same structure:

1. **Explore first** - Read the codebase, understand context
2. **Question repeatedly** - Use `AskUserQuestion` in multiple rounds
3. **Ask non-obvious questions** - Surface things the user hasn't considered
4. **Gate on approval** - Don't proceed without explicit confirmation
5. **Then implement** - Only after thorough exploration

The insight: Claude is excellent at systematic work when given explicit criteria. The problem is when Claude fills in the criteria itself. These skills force the criteria to come from you, through questioning.

---

**Repository:** [github.com/neonwatty/claude-skills](https://github.com/neonwatty/claude-skills)

**Related posts:**
- [Claude Code Skills for iOS Human Interface Guidelines Testing](/posts/socratic-interview-skills-claude-code)
- [Claude Code Workflow Testing with MCP](/posts/claude-code-workflow-testing-mcp)
