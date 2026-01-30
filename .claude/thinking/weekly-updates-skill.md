# Idea: Weekly Updates Skill

> An interactive CLI skill that generates weekly project updates by analyzing GitHub PRs, capturing screenshots, and producing mobile-optimized reports.

## The Problem

Maintaining a portfolio blog with regular project updates requires manually:
- Tracking PRs across multiple repos and organizations
- Identifying which changes are "showcase-worthy"
- Taking screenshots of new features
- Writing up summaries with proper mobile-friendly formatting

This is tedious enough that it often doesn't happen consistently.

## The Solution

A Claude Code skill that automates the tedious parts while keeping the user in control of decisions:
1. Fetches all PRs from the last 7 days (neonwatty + meanweasel org)
2. Presents them interactively for selection
3. Infers URLs from PR content
4. Captures mobile screenshots via Claude-in-Chrome
5. Generates a mobile-optimized markdown report

## Target Users

The primary user is the repo owner who:
- Maintains multiple active projects
- Has 15+ feature PRs per week across many repos
- Uses Vercel with consistent deployment patterns
- Wants both external showcase and personal tracking
- Prefers interactive workflows over fully automated ones

## Competition & Differentiation

**Alternatives:**
- Manual process (current state)
- GitHub's built-in activity feed (no screenshots, not curated)
- Automated changelog generators (no visual component, no curation)

**Differentiation:**
- Interactive curation (user decides what's showcase-worthy)
- Visual capture via browser automation
- Mobile-first output optimized for blog embedding
- Integrated with Claude Code workflow

## Riskiest Assumptions

1. **URL inference will work reliably** - PRs don't always have obvious routes
2. **Claude-in-Chrome can handle variety** - Different sites, auth states, interactions
3. **Context limits** - Many repos/PRs might strain the conversation
4. **Weekly cadence is sustainable** - Interactive workflow needs to be efficient

## MVP Scope

The skill as built covers the core loop:
- Fetch PRs via `gh` CLI
- Interactive selection via `AskUserQuestion`
- URL inference with user confirmation
- Screenshot capture via Claude-in-Chrome MCP
- Markdown generation with mobile-optimized image handling
- Task tracking throughout

## Possible Directions

### Direction 1: Add Pre-filtering
- Filter PRs by `feat:` prefix before showing to user
- Reduces noise for high-volume weeks
- Tradeoff: might miss important non-feature work

### Direction 2: Template System
- Allow different report templates (blog post, changelog, social media)
- More flexibility for different output needs
- Tradeoff: added complexity

### Direction 3: Scheduled Reminders
- Hook into a cron/scheduler to prompt weekly
- Ensures consistent cadence
- Tradeoff: requires external setup

## Open Questions

- [ ] How to handle PRs that require authentication to view?
- [ ] Should there be a "quick mode" that skips some interactivity?
- [ ] How to handle repos with no web UI (CLI tools, libraries)?
- [ ] Image carousel implementation - does the blog already support this?

## Next Steps

1. Test the skill with a real weekly run
2. Iterate on URL inference based on actual PR patterns
3. Add carousel/grid component to blog if not already present
4. Consider adding pre-filtering as optional flag
