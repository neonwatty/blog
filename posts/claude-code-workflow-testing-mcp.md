---
title: "Claude Code Browser Testing and iOS Automation with MCP Workflows"
date: "2025-01-08"
excerpt: "Four Claude Code skills that generate and execute user workflow tests using Claude-in-Chrome and iOS Simulator MCPs. Catch bugs and edge cases while you're still building."
tags: ["Claude Code", "Testing", "MCP", "iOS", "Browser Automation", "AI"]
featured: true
author: "Jeremy Watt"
seoTitle: "Claude Code Browser Testing & iOS Test Automation with MCP Workflows"
metaDescription: "Use Claude Code for automated browser testing and iOS simulator automation. Generate user workflows from your codebase, execute them with MCP, catch bugs early."
---

MCP connections to browsers (via [Claude-in-Chrome](https://github.com/anthropics/claude-in-chrome), currently in beta) and iOS Simulators have gotten exponentially better in the last few months.  So much so that Claude Code can now power through user workflow tests for both browser / mobile - and really close the loop in terms of being able to verify the fundamentals of your app, edge cases you didn't find / think of, etc.,.  I've been manually driving Claude Code through user workflows bespoke-ly using these MCP connections for a while, so much so that made sense to save them as skills and make them re-usable across projects.

## The Skills

To make these re-usable across projects you want to be able to generate workflows first.  These are generated via the following two skills, each of which uses the `AskUserQuestion` tool recursively to help Claude squeeze out all the ideas from your brain as it can.

**Generators** — explore your codebase and create workflow files:
- `browser-workflow-generator` — discovers routes, components, and interactions in web apps, outputs `/workflows/browser-workflows.md`
- `ios-workflow-generator` — discovers screens, views, and interactions in iOS apps, outputs `/workflows/ios-workflows.md`

The output of these skills are simple numbered workflow lists - saved in markdown files in the `/workflows` directory of whatever repo they're generated in.

Using the next pair of skills, each workflow from these saved numbered lists is run through by Claude with bugs, feature ideas, etc., recorded in separate markdown files for review.

**Executors** — run those workflows using MCP:
- `browser-workflow-executor` — executes browser workflows step-by-step using Claude-in-Chrome MCP
- `ios-workflow-executor` — executes iOS workflows step-by-step using iOS Simulator MCP

## How It Works

**Step 1: Generate workflows**

Say "generate browser workflows" (or iOS). Claude explores your codebase—routes, components, state—and proposes user journeys. It asks for approval before writing anything.

Output goes to `/workflows/browser-workflows.md`:

```markdown
## Workflow: Create New Item

> Tests the complete flow of creating a new item from scratch.

1. Enter the application
   - Navigate to https://app.example.com
   - Click "Get Started" button
   - Verify canvas loads

2. Add item details
   - Click "Add Item" button
   - Type "Test Item" in name field
   - Verify item appears in list
```

**Step 2: Execute workflows**

Say "run browser workflows". Claude executes each step using Claude-in-Chrome MCP. For iOS, it uses iOS Simulator MCP.

Each step gets:
- A screenshot
- Pass/fail status
- Notes on issues, UX problems, console errors

Results go to `.claude/plans/browser-workflow-report.md`.

## Why This Helps a ton During Development

This isn't about replacing your test suite.  It's about catching stuff while you're building:

- **Edge cases you forgot** — Claude explores systematically and finds flows you didn't think to test
- **UI bugs** — it's actually clicking around, catching layout issues, slow responses, broken buttons
- **Regressions** — re-run workflows after changes to see what broke
- **Documentation** — workflow files double as user journey docs

The MCP integrations mean Claude sees exactly what users see. No mocking.

## Quick Start

```bash
# Generate workflows for your browser app
> generate browser workflows

# Review the output, approve when ready
# Then execute them
> run browser workflows

# Same for iOS
> generate ios workflows
> run ios workflows
```

---

That's it. Generate workflows from your codebase, execute them on real browsers and simulators, catch issues early.
