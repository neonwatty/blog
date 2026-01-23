---
title: "BugDrop: Open Source Visual Feedback Widget for GitHub Issues"
date: "2026-01-18"
excerpt: "A free, open source alternative to BugHerd and Usersnap. Capture annotated screenshots and convert user feedback directly into GitHub Issues."
projectId: "bugdrop"
projectTitle: "BugDrop"
tags: ["GitHub", "Feedback", "Developer Tools", "Open Source", "Launch"]
---

[BugDrop](https://github.com/neonwatty/bugdrop) is a free, open source visual feedback widget that converts user feedback directly into GitHub Issues.

If you've used tools like BugHerd or Usersnap, BugDrop works similarly - but it's free, open source, and integrates directly with your GitHub workflow. Users click a bug button, capture and annotate screenshots, and submit them as issues in your repository. No more "can you describe what you saw?" back-and-forth.

<div style="max-width: 400px; margin: 2rem auto;">
  <iframe width="100%" height="700" src="https://www.youtube.com/embed/VkLvP1xmRzo" title="BugDrop Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"></iframe>
</div>

**Try it yourself:** [Live Demo](https://neonwatty.github.io/feedback-widget-test/) →

---

## How It Works

The website bug reporting flow is simple:

1. User clicks the bug button on your site
2. Widget captures a screenshot of the current page
3. User annotates the screenshot and adds a description
4. Issue gets created in your GitHub repo with the screenshot attached

The widget runs in a Shadow DOM for style isolation, uses Cloudflare Workers for authentication, and stores screenshots directly in a `.bugdrop/` folder in your repository. No third-party data storage.

## Features

- **Visual feedback with annotations** - users can draw on screenshots before submitting
- **Customizable widget** - light/dark/auto themes, configurable positioning
- **Works with public and private repos**
- **Privacy-focused** - no user data retained by the service
- **Minimal permissions** - GitHub App only needs Issues (R/W) and Contents (R/W)

---

[Install the GitHub App](https://github.com/apps/neonwatty-bugdrop/installations/new) →

[View on GitHub](https://github.com/neonwatty/bugdrop) →
