---
title: "Claude Code Task Management Without The JSON Overhead"
date: "2025-09-03"
excerpt: "Why JSON task management wastes context and corrupts data in Claude Code sessions, and how todoq's CLI approach solves both problems with targeted commands that only load individual tasks."
tags: ["Claude Code", "Task Management", "Productivity"]
featured: true
author: "Jeremy Watt"
seoTitle: "Stop Wasting Context: todoq vs JSON Task Management in Claude Code"
metaDescription: "JSON task management wastes context and causes errors in Claude Code. Learn how todoq's CLI approach loads only specific tasks, preventing corruption and maximizing context efficiency."
---

Managing tasks through JSON files works fine for small projects, but quickly becomes context-inefficient and error-prone as task lists grow.

Two core problems here: every task operation loads the entire JSON into context, wasting your context window, and JSON updates are error-prone since Claude Code (and other agnetic IDEs) must locate exact positions in complex nested structures.  These issues cause Claude Code to misformat JSON, accidentally delete fields, or corrupt entire task lists.

I solve this using [todoq](https://github.com/neonwatty/todoq) - a CLI tool that manages tasks through targeted commands instead of JSON manipulation (it uses a simple queue stored in a sqlite db instead, accessible via CLI commands).  Each operation only touches the specific task being addressed, keeping context lean and operations reliable.

This approach makes task management precise, prevents JSON corruption, and keeps Claude focused on actual work instead of file formatting.

---

Here's a basic walkthrough of how I use `todoq` for task management.  I'll walk through the basic CLI commands 'by hand' - but I typically use Claude to break up a PRD and use `todoq` for me to generate tasks.  More to say on that after the quick walkthrough.

Say you're working on a feature implementation with multiple subtasks. 

Here are the basic `todoq` CLI commands to create and manage tasks without touching JSON.

```bash
# add a task to your queue
$ todoq add "Implement user authentication flow"
✓ Task added with ID: auth-1

# add subtasks with context
$ todoq add "Create login component" --parent auth-1 --priority high
✓ Task added with ID: login-2

$ todoq add "Add JWT token validation" --parent auth-1
✓ Task added with ID: jwt-3

# view your task queue
$ todoq list
Queue contains 3 task(s):
1. [auth-1] Implement user authentication flow (pending)
   ├─ [login-2] Create login component (pending) [high]
   └─ [jwt-3] Add JWT token validation (pending)
```

You can view tasks in plain list form, or as a tree using `--tree`.

There are similar CLI commands for updating a task's status, notes, fields, etc., like

```bash
# mark a task as in-progress
$ todoq update login-2 --status in-progress
✓ Task login-2 updated

# add implementation notes without touching JSON
$ todoq note login-2 "Using React hooks for form state management"
✓ Note added to task login-2

# mark as complete when done
$ todoq update login-2 --status complete
✓ Task login-2 marked complete

# view task details
$ todoq show login-2
[login-2] Create login component
Status: complete
Priority: high
Parent: auth-1
Notes:
- Using React hooks for form state management
```

You can also query and filter tasks efficiently:

```bash
# get only in-progress tasks
$ todoq list --status in-progress
1. [auth-1] Implement user authentication flow (in-progress)

# get next task to work on
$ todoq next
[jwt-3] Add JWT token validation (pending)

# bulk operations
$ todoq complete-all --parent auth-1
✓ 2 tasks marked complete
```
---

The key benefits of using `todoq` with an agentic IDE like Claude Code:

- **Context efficiency**: When Claude checks a task status or adds a note, only that specific task enters context - not the entire task JSON / tree.

- **Error prevention**: Commands either succeed or fail cleanly.  No malformed JSON, no accidentally deleted fields, no corrupted task lists.

So for example, once I have solid tasks queued up I have Claude sequentially work on them via the `todoq` CLI (e.g., `todoq next`).  Claude is very good at executing `todoq` CLI commands, which provide it with the precise context it needs for the task at hand.

---

## Generating tasks from PRDs

While the CLI commands above are useful for manual task management, I typically use Claude Code to break down PRDs (Product Requirement Documents) into `todoq` tasks using a custom slash command.

The [/generate-todoq-tasks](https://github.com/neonwatty/slash-commands/blob/main/commands/todoq/todoq-generate-tasks.md) command takes a PRD file and generates a complete hierarchical task breakdown with validation and safe import. It handles analysis, hierarchy design, and dependency mapping while keeping Claude focused on implementation rather than formatting.

The process pauses at several points for user review and approval of task layouts - it's important to keep one hand on the wheel when generating tasks.

The command follows this process:

1. **Environment Setup** - Validate todoq is initialized and analyze existing tasks
2. **PRD Analysis** - Extract requirements, user stories, and business rules (with user review)
3. **Task Generation** - Create hierarchical tasks with dependencies and priorities (with user preview)
4. **Integration Planning** - Determine how new tasks merge with existing ones
5. **Validation & Backup** - Schema validation and safety backups before import
6. **Safe Import** - Import tasks with verification and rollback options

**Key Features:**
- Multiple user review points for approval/modification
- Automatic backup creation before import
- Schema validation and error recovery
- Integration with existing task hierarchies
- Rollback capability if import fails

**Usage:**
```bash
/generate-todoq-tasks path/to/feature-prd.md ./project-dir
```

This approach handles the complexity of PRD analysis while keeping the human in the loop for critical decisions.

## Claude Code Integration

`todoq` integrates with Claude Code to work tasks in isolated [headless sessions](https://docs.anthropic.com/en/docs/claude-code/sdk/sdk-headless).  When configured as described in the repo's [README (see “Claude Code Integration”)](https://github.com/neonwatty/todoq?tab=readme-ov-file#claude-code-integration), `todoq` auto-detects your Claude setup so each session focuses on a single task without pulling the entire backlog into context.

Call on Claude Code to headlessly work on your next task using the `work-next` cli command.  This looks like:

```bash
# Have Claude work on the next task in an isolated session, headlessly
$ todoq work-next
```

The output looks like this:

```bash
$ todoq work-next

📋 Current task: 1.2 - Implement user authentication
Status: pending → in_progress

🤖 Claude is working on this task...
✓ Read src/auth/login.ts
✓ Updated authentication logic
✓ Added input validation
✓ Created unit tests
✓ All tests passing

✅ Task completed successfully!
Status: in_progress → completed
Next task: 1.3 - Add password reset functionality
```

The `work-next` command supports cli and config based settings.

The headless cli for Claude Code does not include automatic retries (e.g., when attempting to read a non-existant file), but this is built into `todoq` (with features like exponential backoff).

If you choose to use Claude Code / `work-next`, here's my recommended flow:

1. Generate/curate tasks (manually or via [`/generate-todoq-tasks`](https://github.com/neonwatty/todoq/blob/main/commands/todoq-generate-tasks.md)).
2. Pick the next task and start a Claude session per the README instructions.
3. Keep updates in `todoq` (`update`, `note`, `complete`) so only the active task enters context.

This keeps prompts, limits, and permissions consistent while letting Claude focus tightly on the current task. 
