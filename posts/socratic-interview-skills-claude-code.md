---
title: "Claude Code Skills for iOS Human Interface Guidelines Testing"
date: "2026-01-15"
excerpt: "Claude's default mode is eager compliance—give it vague instructions and it'll happily make assumptions. These workflow skills force systematic iOS HIG verification, catching platform convention violations you'd never think to check."
tags: ["Claude Code", "AI", "iOS", "Skills", "Human Interface Guidelines"]
author: "Jeremy Watt"
featured: true
image: "/images/posts/socratic-ios/01-ios-tab-bar-events.png"
seoTitle: "Claude Code Skills Tutorial: iOS Human Interface Guidelines (HIG) Workflow Testing"
metaDescription: "Learn how to build Claude Code skills that test iOS apps against Human Interface Guidelines. Catch HIG violations like hamburger menus, FABs, and web-style dropdowns automatically."
---

Whenever you're working on something new—a feature, a complex process, a workflow—you start with a single idea. But as soon as you start pulling the thread, everything gets complicated. Edge cases emerge. Requirements you hadn't considered surface. The simple thing becomes not-so-simple.

If you dive straight into development without fully pulling that thread, you end up building something brittle, incomplete, less robust than it seemed when you first had the idea.

Claude's `AskUserQuestion` tool, used repetitively, helps dredge all that stuff out of the ether before you write any code. (This post was inspired by [a tweet from Thariq](https://x.com/trq212/status/2005315275026260309) about using the tool for spec-based development.)

Here's an example: a skill that uses `AskUserQuestion` to systematically interrogate your app against platform conventions—and catches issues you'd never think to check for.

## The Problem

Ask Claude to review your iOS app and it sees what it sees. Without explicit guidance, it might catch obvious issues while missing deeper pattern violations:

- Hamburger menu instead of tab bar navigation
- Centered modals instead of bottom sheets
- HTML `<select>` dropdowns instead of iOS action sheets
- Visible edit/delete buttons instead of swipe-to-reveal
- Floating action buttons (Material Design on iOS)

These aren't bugs. They're platform convention violations—invisible unless you know to look for them.

## Step 1: Generate Workflows with AskUserQuestion

The first skill—[ios-workflow-generator](https://github.com/neonwatty/claude-skills/blob/main/skills/ios-workflow-generator/SKILL.md)—uses `AskUserQuestion` repeatedly to pull the thread on what workflows you actually need to test. It explores your codebase, identifies user journeys, then asks you to verify before writing anything:

```markdown
### Phase 6: Review with User (REQUIRED)

**This step is mandatory. Do not write the final file without user approval.**

Use `AskUserQuestion` to ask:
- "Do these workflows cover all the key user journeys?"
- Options: Approve / Add more workflows / Modify existing / Start over

**Only after explicit approval**, write to `/workflows/ios-workflows.md`
```

This is where the `AskUserQuestion` pattern pays off. Claude proposes workflows based on your codebase, you refine them, it asks follow-up questions, you refine again—until you've actually thought through what needs testing.

## Real Example: Seatify Workflows

I ran the generator on [Seatify](https://github.com/neonwatty/seatify)—a seating chart app I'm building to help wedding planners, corporate event planners, and others more easily optimize and share seating arrangements.

After a few rounds of Q&A, it produced 10 workflows covering the full user experience. Here are the first three:

```markdown
### Workflow: First-Time Onboarding

> Tests the complete flow of a new user arriving at Seatify
> and creating their first event.

1. Open Safari and navigate to app
   - Wait for landing page to fully load
   - Verify primary CTA button is at least 44pt tall

2. Verify landing page iOS conventions
   - Verify navigation uses iOS-appropriate patterns (no hamburger)
   - Verify all buttons have adequate touch targets

3. Initiate event creation
   - Tap the primary "Create Event" button
   - Verify modal appears with smooth iOS-style animation

4. Fill in event details
   - Tap date picker field
   - Verify iOS-style date picker appears (not web dropdown)
...
```

```markdown
### Workflow: Canvas Manipulation

> Tests the core seating canvas functionality—the heart of Seatify.

1. Test pan/scroll interaction
   - Swipe up on the canvas area
   - Verify canvas scrolls smoothly

2. Add a table to canvas
   - Tap "Add Table" control
   - Verify table appears on canvas

3. Drag table to new position
   - Long press on the table element
   - Drag to a different location
   - Verify drag feedback is smooth (not laggy)
...
```

```markdown
### Workflow: Guest Seating Assignment

> Tests assigning guests to tables via drag-and-drop.

1. Open guest list panel
   - Tap guest list toggle
   - Verify panel slides in

2. Drag guest to table
   - Drag selected guest toward a table
   - Release guest over table
   - Verify guest is assigned
...
```

Each workflow includes explicit iOS convention checks—not just "does it work" but "does it feel native."

## Step 2: Execute Workflows

Once you have workflows, the [ios-workflow-executor](https://github.com/neonwatty/claude-skills/blob/main/skills/ios-workflow-executor/SKILL.md) runs them against your app. It includes built-in checklists and anti-pattern tables:

<table class="post-table">
  <thead>
    <tr><th>Anti-Pattern</th><th>iOS Convention</th></tr>
  </thead>
  <tbody>
    <tr><td>Hamburger menu (☰)</td><td>Tab bar at bottom</td></tr>
    <tr><td>Floating Action Button</td><td>Navigation bar buttons</td></tr>
    <tr><td>Web-style dropdowns</td><td>iOS Picker wheels</td></tr>
    <tr><td>Checkboxes</td><td>iOS Toggle switches</td></tr>
  </tbody>
</table>

## What the Executor Found

<table class="post-table">
  <thead>
    <tr><th>Issue</th><th>iOS Requirement</th><th>Current State</th></tr>
  </thead>
  <tbody>
    <tr><td>Hamburger menu</td><td>Tab bar for primary nav</td><td>☰ icon in header</td></tr>
    <tr><td>HTML select dropdowns</td><td>iOS-style pickers</td><td>&lt;select&gt; with chevron</td></tr>
    <tr><td>Visible action buttons</td><td>Swipe-to-reveal</td><td>Edit/Delete always visible</td></tr>
    <tr><td>Centered modals</td><td>Bottom sheets</td><td>Web-style centered dialogs</td></tr>
    <tr><td>Floating action button</td><td>No FABs on iOS</td><td>FAB on canvas</td></tr>
  </tbody>
</table>

Here are three of the fixes:

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
.fix-card {
  background: var(--color-background-secondary, #f9fafb);
  border: 1px solid var(--color-border-primary, #e5e7eb);
  border-radius: 12px;
  padding: 1.25rem;
  margin: 1.25rem 0;
}
.fix-card h4 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: var(--color-text-primary, #111);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.fix-card h4::before {
  content: "→";
  color: var(--color-accent-primary, #6366f1);
}
.fix-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
@media (max-width: 600px) {
  .fix-grid { grid-template-columns: 1fr; }
}
.fix-grid figure {
  margin: 0;
  text-align: center;
}
.fix-grid img {
  width: 100%;
  max-width: 280px;
  height: auto;
  border-radius: 8px;
  border: 1px solid var(--color-border-secondary, #e5e7eb);
}
.fix-label {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}
.fix-label.before {
  background: #fef2f2;
  color: #dc2626;
}
.fix-label.after {
  background: #dcfce7;
  color: #16a34a;
}
</style>

<div class="fix-card">
  <h4>Hamburger Menu → iOS Tab Bar</h4>
  <div class="fix-grid">
    <figure>
      <span class="fix-label before">Before</span>
      <img src="/images/posts/socratic-ios/02-hamburger-menu.png" alt="Hamburger menu">
    </figure>
    <figure>
      <span class="fix-label after">After</span>
      <img src="/images/posts/socratic-ios/01-ios-tab-bar-events.png" alt="iOS tab bar">
    </figure>
  </div>
</div>

<div class="fix-card">
  <h4>HTML Select → iOS Action Sheet</h4>
  <div class="fix-grid">
    <figure>
      <span class="fix-label before">Before</span>
      <img src="/images/posts/socratic-ios/05-web-dropdown-expanded.png" alt="HTML select">
    </figure>
    <figure>
      <span class="fix-label after">After</span>
      <img src="/images/posts/socratic-ios/06-ios-action-sheet.png" alt="iOS action sheet">
    </figure>
  </div>
</div>

<div class="fix-card">
  <h4>Visible Buttons → Swipe-to-Reveal</h4>
  <div class="fix-grid">
    <figure>
      <span class="fix-label before">Before</span>
      <img src="/images/posts/socratic-ios/03-visible-action-buttons.png" alt="Visible buttons">
    </figure>
    <figure>
      <span class="fix-label after">After</span>
      <img src="/images/posts/socratic-ios/05-ios-swipe-actions.png" alt="Swipe actions">
    </figure>
  </div>
</div>

---

The core insight: Claude is excellent at systematic verification when given explicit criteria. The problem with "review my iOS app" is Claude fills in the criteria itself.

Workflow documents make criteria explicit. Anti-pattern tables catch cross-platform pollution. User approval gates prevent Claude from running ahead.

Stop letting Claude improvise your UX reviews. Give it a checklist.

---

**Repository:** [github.com/neonwatty/claude-skills](https://github.com/neonwatty/claude-skills)

**Related posts:**
- [Claude Code Skills Tutorial: AskUserQuestion for Better Prompts](/posts/interview-skills-claude-code)
- [Claude Code Workflow Testing with MCP](/posts/claude-code-workflow-testing-mcp)
